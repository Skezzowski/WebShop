import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, takeUntil } from 'rxjs/operators';
import { empty, Subject } from 'rxjs';

import { AuthService } from '../core/services';
import { Login } from '../core/models';

@Component({
  selector: 'app-register-login-page',
  templateUrl: './register-login-page.component.html',
  styleUrls: ['./register-login-page.component.scss']
})
export class RegisterLoginPageComponent implements OnDestroy {

  unsubcribe$ = new Subject<void>();
  loginError: boolean;
  emailUsedError: boolean;
  regError: boolean;

  constructor(private auth: AuthService, private router: Router) {
  }

  emailPassLogin(data: Login) {
    this.auth.emailPassLogin(data).pipe(
      takeUntil(this.unsubcribe$),
      catchError(_ => {
        this.loginError = true;
        return empty();
      }),
    )
      .subscribe(_ => {
        this.router.navigateByUrl('mainpage');
      });
  }

  registration(data: Login) {
    this.auth.register(data).pipe(
      takeUntil(this.unsubcribe$),
      catchError(code => {
        if (code === 'auth/email-already-in-use') {
          this.emailUsedError = true;
        } else {
          this.regError = true;
        }
        return empty();
      }),
    )
      .subscribe(_ => {
        this.router.navigateByUrl('mainpage');
      });
  }

  googleLogin() {
    this.router.navigateByUrl('mainpage');
  }

  ngOnDestroy() {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

}
