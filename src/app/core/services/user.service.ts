import { Injectable } from '@angular/core';

import { Observable, combineLatest } from 'rxjs';

import { FirebaseService } from './firebase.service';
import { User, DeliveryDetails, ProductTile } from '../models';
import { FileService } from './file.service';
import { map } from 'rxjs/operators';
import { ChangePasswordPair } from '../models/change-password.model';

@Injectable()
export class UserService {

    constructor(private firebase: FirebaseService, private fileService: FileService) { }

    get user(): Observable<User> {
        return this.firebase.user;
    }

    getUserOrders(currentUser: Observable<User>): Observable<ProductTile[]> {
        return combineLatest(
            this.firebase.orders,
            currentUser
        ).pipe(
            map(([rawOrders, user]) => {
                return rawOrders[user.id];
            })
        );
    }

    updateDeliveryDetails(deliveryDetails: DeliveryDetails): Observable<void> {
        return this.firebase.setDeliveryDetails(deliveryDetails);
    }

    updateProfilePicture(img: File) {
        return this.fileService.updateProfilePicture(img);
    }

    updatePassword(passwordData: ChangePasswordPair): Observable<Boolean> {
        return this.firebase.changePassword(passwordData);
    }

}
