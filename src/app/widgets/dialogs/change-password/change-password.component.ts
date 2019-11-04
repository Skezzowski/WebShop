import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { UserService } from 'src/app/core/services';
import { ValidatorService } from 'src/app/core/util/validators';
import { ChangePasswordPair } from 'src/app/core/models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent implements OnInit {

  changePassFrm: FormGroup;
  passwordError: Boolean = false;
  tooltipText: String = 'Must contain: \n-1 number \n-1 lovercase character \n-1 uppercase character \n-8 characters';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.changePassFrm = this.fb.group({
      current: [
        null,
        Validators.required
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/[A-Z]/),
          Validators.pattern(/[a-z]/),
          Validators.pattern(/\d/),
          Validators.minLength(8)
        ])
      ],
      confirmPassword: [
        null,
        Validators.required
      ]
    },
      {
        validator: ValidatorService.passwordMatchValidator
      }
    );
  }

  onSave(formValue) {
    const passwords: ChangePasswordPair = {
      current: formValue.current,
      new: formValue.password
    };
    this.userService.updatePassword(passwords)
      .pipe(first())
      .subscribe(result => {
        if (result) {
          this.dialogRef.close();
        } else {
          this.passwordError = true;
          this.changePassFrm.get('current').setErrors({ WrongPassword: true });
        }
      });
  }

  onCancel() {
    this.dialogRef.close();
  }

  get current() { return this.changePassFrm.get('current'); }

  get password() { return this.changePassFrm.get('password'); }

  get confirmPassword() { return this.changePassFrm.get('confirmPassword'); }

}
