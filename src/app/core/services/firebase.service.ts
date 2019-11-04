import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import * as firebase from 'firebase';

import { ReplaySubject, Observable, from, throwError, of, combineLatest } from 'rxjs';
import { map, delayWhen, filter, catchError, switchMap, first } from 'rxjs/operators';

import { User, Login, DeliveryDetails, ChangePasswordPair, ProductTile, CartItem } from '../models';

@Injectable()
export class FirebaseService implements OnDestroy {

    private _user$ = new ReplaySubject<User>(1);
    private _products$ = new ReplaySubject<Object>(1);

    constructor(
        private firebaseAuth: AngularFireAuth,
        private firebaseDatabase: AngularFireDatabase,
        private firebaseStorage: AngularFireStorage
    ) {
        firebaseAuth.authState.pipe(switchMap(user => user ? this.getUserById(user.uid) : of(undefined))).subscribe(this._user$);
        firebaseDatabase.object('/products').valueChanges().subscribe(this._products$);
    }

    get user(): Observable<User> {
        return this._user$.asObservable();
    }

    get users(): Observable<Object> {
        return this.firebaseDatabase.object('/users').valueChanges();
    }

    get orders(): Observable<Object> {
        return this.firebaseDatabase.object('/orders').valueChanges();
    }

    get products$(): Observable<{}> {
        return this._products$;
    }

    get categories$(): Observable<{}[]> {
        return this.firebaseDatabase.list('/categories').valueChanges();
    }

    productById(id: string) {
        return this.products$.pipe(map(products => {
            const categories = Object.keys(products);
            for (const category of categories) {
                if (products[category][id]) {
                    return products[category][id];
                }
            }
            return null;
        }));
    }

    get cart$() {
        return this.user.pipe(
            map(user => {
                if (user) {
                    return user.id;
                }
            }),
            switchMap(uid => from(this.firebaseDatabase.list(`/users/${uid}/cart`).valueChanges()))
        );
    }

    instertProductToCart(product: CartItem, index: number) {
        return this.user.pipe(
            map(user => user.id),
            first(),
            switchMap(uid => from(this.firebaseDatabase.object(`/users/${uid}/cart/${index}`).set(product)))
        );
    }

    updateCart(cart: CartItem[]) {
        return this.user.pipe(
            map(user => user.id),
            first(),
            switchMap(uid => from(this.firebaseDatabase.object(`/users/${uid}/cart`).set(cart)))
        );
    }

    setItemAmountInCart(index: number, amount: number) {
        return this.user.pipe(
            map(user => user.id),
            first(),
            switchMap(uid => from(this.firebaseDatabase.object(`/users/${uid}/cart/${index}/amount`).set(amount)))
        );
    }

    removeFromCart(index) {
        return this.user.pipe(
            map(user => user.id),
            first(),
            switchMap(uid => from(this.firebaseDatabase.object(`/users/${uid}/cart/${index}`).set(null)))
        );
    }
    // ha valaki felíratkozik erre, akkor felugrik egy bejelentkező abalk
    googleLogin(): Observable<boolean> {
        return from(this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider))
            .pipe(
                delayWhen(() => this.user.pipe(filter(user => !!user))),
                map(_ => true));
    }

    logOut(): Observable<void> {
        return from(this.firebaseAuth.auth.signOut()).pipe(catchError(err => throwError('Server error')));
    }

    register(data: Login) {
        return from(this.firebaseAuth.auth.createUserWithEmailAndPassword(data.email, data.password));
    }

    emailPassLogin(data: Login) {
        return from(this.firebaseAuth.auth.signInWithEmailAndPassword(data.email, data.password));
    }

    deleteUser(userId: string): Observable<void> {
        return from(this.firebaseDatabase.object(`/users/${userId}`).set(null));
    }

    setPermission(userId: string, permission: boolean): Observable<void> {
        return from(this.firebaseDatabase.object(`/users/${userId}/admin`).set(permission));
    }

    uploadProductToStorage(id: string, rawProduct: any): Observable<void> {
        return from(this.firebaseStorage.ref(`productPictures/${id + rawProduct.category}`).put(rawProduct.img)).pipe(
            switchMap(snapshot => from(snapshot.ref.getDownloadURL())),
            switchMap(imgUrl => {
                rawProduct.img = imgUrl;
                return from(this.firebaseDatabase.object(`/products/${rawProduct.category}/${id}`).set(rawProduct));
            })
        );
    }

    uploadProfilePicture(file: File): Observable<void> {
        return this.user.pipe(
            map(user => user.id),
            switchMap(id => combineLatest(of(id), from(this.firebaseStorage.ref(`${id}/profile-picture`).put(file)))),
            switchMap(([id, snapShot]) => combineLatest(of(id), from(snapShot.ref.getDownloadURL()))),
            switchMap(([id, imgUrl]) => from(this.firebaseDatabase.object(`users/${id}/img`).set(imgUrl))),
        );
    }

    setDeliveryDetails(deliveryDetails: DeliveryDetails): Observable<void> {
        return this.user.pipe(
            map(user => user.id),
            switchMap(id => from(this.firebaseDatabase.object(`/users/${id}/deliveryDetails`).set(deliveryDetails)))
        );
    }

    changePassword(passwordData: ChangePasswordPair): Observable<Boolean> {
        return this.user.pipe(
            switchMap(user => from(this.firebaseAuth.auth.currentUser.reauthenticateAndRetrieveDataWithCredential(
                firebase.auth.EmailAuthProvider.credential(
                    user.email,
                    passwordData.current
                )))
            ),
            switchMap(_ => from(this.firebaseAuth.auth.currentUser.updatePassword(passwordData.new))),
            map(() => true),
            catchError(_ => of(false))
        );
    }

    updatePrice(product: ProductTile): Observable<void> {
        return from(this.firebaseDatabase.object(`/products/${product.category}/${product.id}/price`).set(product.price));
    }

    /*  megszűnik a Subject, ezáltal nem marad több felíratkozó az adatfolyamon,
        így az is megszűnik és felszabadul a memória
        ez akkor fut le, amikor bezáródik az alkalmazás
        mivel a service-ek addig élnek.
     */
    ngOnDestroy() {
        this._user$.complete();
        this._products$.complete();
    }

    private getUserById(id: string): Observable<User> {
        return <Observable<User>>this.firebaseDatabase.object(`/users/${id}`).valueChanges();
    }


    // --------------------------------------------------------------------------------
    // EXAMPLES

    /**
   * Példa függvény. Lekér az utvonal változó által megtarátozott elérési ponton
   * található adatokat tömbös formában. Ez azt jelenti, hogy a fában látható kulcsok
   * elvesznek a tömb indexek lesznek helyette.
   */
    private getValamiTomb(utvonal: any): Observable<{}[]> {
        return this.firebaseDatabase.list(`/${utvonal}`).valueChanges();
    }

    /**
     * Példa függvény. Lekér az utvonal változó által megtarátozott elérési ponton
     * található adatokat objektum formában. Ez azt jelenti, hogy a fában látható kulcsok
     * megmaradnak, viszont nem lehet tömbként kezelni.
     * Objektumokon történő iterálás: lásd forin (google is your friend)
     */
    private getValamiObject(utvonal: any): Observable<{}> {
        return this.firebaseDatabase.object(`/${utvonal}`).valueChanges();
    }

    /**
     * a fában a userId/utonal pontra beszúrja az adatot (vagy felülírja ha már ott van),
     * nem ad vissza semmit ha sikerült és errort ad ha nem.
     */
    private insertValami(userId: string, utvonal: number, adat: any): Observable<void> {
        return from(this.firebaseDatabase.object(`/${userId}/${utvonal}`).set(adat));
    }

}
