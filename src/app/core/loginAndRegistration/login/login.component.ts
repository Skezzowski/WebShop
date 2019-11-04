import { Component, Output, EventEmitter, Input } from '@angular/core';

import { Login } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../loginAndRegistrationBase.scss']
})
export class LoginComponent {

  @Input() loginError: boolean;
  @Output() login = new EventEmitter<Login>();
  emailError = false;
  passError = false;

  constructor() { }

  onLogin(data) {
    this.login.emit({
      email: data.value.email,
      password: data.value.pass
    });
  }

  showEmailError() {
    this.emailError = true;
  }

  hideEmailError() {
    this.emailError = false;
  }

  showPassError() {
    this.passError = true;
  }

  hidePassError() {
    this.passError = false;
  }

}
