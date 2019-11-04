import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Login } from '../../models';
import { ValidatorService } from '../../util/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../loginAndRegistrationBase.scss']
})

export class RegisterComponent {

  @Input() regError: boolean;
  @Input() emailUsedError: boolean;
  @Output() register = new EventEmitter<Login>();

  public frmSignup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.frmSignup = this.createSignupForm();
  }

  private createSignupForm(): FormGroup {
    return this.fb.group(
      {
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        password: [
          null,
          Validators.compose([
            Validators.required,
            ValidatorService.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            ValidatorService.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            ValidatorService.patternValidator(/\d/, {
              hasNumber: true
            }),
            Validators.minLength(8)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        validator: ValidatorService.passwordMatchValidator
      }
    );
  }

  onRegister() {
    this.register.emit({
      email: this.frmSignup.get('email').value,
      password: this.frmSignup.get('password').value
    });
  }
}
