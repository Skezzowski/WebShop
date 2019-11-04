import { Component, Output, EventEmitter } from '@angular/core';

import { first } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent {
  @Output() login = new EventEmitter<void>();

  constructor(private auth: AuthService) { }

  onLogin() {
    this.auth.googleLogin().pipe(first())
      .subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.login.emit();
        }
      });
  }

}
