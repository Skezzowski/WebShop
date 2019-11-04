import { Injectable } from '@angular/core';

import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataConverterService } from './util/data-converter.service';
import { FirebaseService } from './firebase.service';

import { UserRow } from '../models';

@Injectable()
export class AdminService {

    constructor(private firebaseService: FirebaseService, private converter: DataConverterService) { }

    get users$(): Observable<UserRow[]> {
        return combineLatest(
            this.firebaseService.users,
            this.firebaseService.orders,
            this.firebaseService.user
        ).pipe(
            map(([rawUsers, rawOrders, currentUser]) => {
                const userIds = Object.keys(rawUsers);
                const userRows: UserRow[] = [];
                for (const userId of userIds) {
                    if (userId === currentUser.id) {
                        continue;
                    }
                    const userOrders = rawOrders[userId];
                    if (userOrders) {
                        const orderIds = Object.keys(userOrders);
                        const lastOrderId = orderIds[orderIds.length - 1];
                        const lastOrder = userOrders[lastOrderId];
                        userRows.push(this.converter.convertRawUserToUserRow(userId, rawUsers[userId], lastOrder, orderIds.length));
                    } else {
                        userRows.push(this.converter.convertRawUserToUserRow(userId, rawUsers[userId], undefined, 0));
                    }
                }
                return userRows;
            })
        );

    }

    deleteUser(id: string): any {
        return this.firebaseService.deleteUser(id);
    }

    setPermission(id: string, admin: boolean): any {
        return this.firebaseService.setPermission(id, admin);
    }

}
