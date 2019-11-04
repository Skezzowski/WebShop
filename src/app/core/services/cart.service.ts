import { Injectable } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs';
import { map, switchMap, first } from 'rxjs/operators';

import { FirebaseService } from './firebase.service';
import { DataConverterService } from './util';
import { ProductTile, CartItem } from '../models';

@Injectable()
export class CartService {
    private _cart$ = new ReplaySubject<Object>(1);

    constructor(private firebase: FirebaseService, private converter: DataConverterService) {
        this.firebase.cart$.subscribe(this._cart$);
    }

    get cart(): Observable<CartItem[]> {
        return <Observable<CartItem[]>>this._cart$.asObservable();
    }

    addToCart(newItem: ProductTile): Observable<void> {
        const cartItem: CartItem = this.converter.convertProductTileToCartItem(newItem);
        return this.cart.pipe(
            first(),
            map(items => {
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    if (item.name === cartItem.name && item.price === cartItem.price && item.img === cartItem.img) {
                        cartItem.amount = ++item.amount;
                        return i;
                    }
                }
                return items.length ? items.length : 0;
            }),
            switchMap(index => this.firebase.instertProductToCart(cartItem, index)),
        );

    }

    deleteItem(index): Observable<void> {
        return this.cart.pipe(
            first(),
            map(items => {
                if (items.length === 1) {
                    return null;
                } else {
                    items.splice(index, 1);
                    return items;
                }
            }),
            switchMap(items => this.firebase.updateCart(items))
        );
    }

    updateItemAmount(index: number, amount: number): Observable<void> {
        return amount ? this.firebase.setItemAmountInCart(index, amount) : this.deleteItem(index);
    }
}
