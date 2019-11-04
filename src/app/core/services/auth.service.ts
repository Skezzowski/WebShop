import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { FirebaseService } from './firebase.service';
import { Login } from '../models';

@Injectable()
export class AuthService {

    constructor(private firebase: FirebaseService) {
    }

    googleLogin(): Observable<boolean> {
        return this.firebase.googleLogin();
    }

    emailPassLogin(data: Login): Observable<boolean> {
        return this.firebase.emailPassLogin(data).pipe(
            catchError(error => {
                return throwError('Failed to login!');
            }),
            map(_ => true)
        );
    }

    register(data: Login): Observable<boolean> {
        return this.firebase.register(data).pipe(
            catchError(error => {
                return throwError(error.code);
            }),
            map(_ => true)
        );
    }

    logOut(): Observable<void> {
        return this.firebase.logOut().pipe();
    }

}
