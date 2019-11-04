import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ValidatorService {

    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
      return (control: AbstractControl): {} => {
        if (!control.value) {
          return null;
        }
        return regex.test(control.value) ? null : error;
      };
    }

    static passwordMatchValidator(control: AbstractControl) {
      const password = control.get('password').value;
      const confirmPassword = control.get('confirmPassword').value;
      if (password !== confirmPassword) {
          control.get('confirmPassword').setErrors({ NoPasswordMatch: true });
      }
  }
}
