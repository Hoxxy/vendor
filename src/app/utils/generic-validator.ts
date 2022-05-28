import { AbstractControl, FormGroup } from '@angular/forms';

// Generic validator for Reactive forms
// Implemented as a class, not a service, so it can retain state for multiple forms.
// NOTE: This validator does NOT support validation of controls or groups within a FormArray.
export class GenericValidator {

  // Provide the set of valid validation messages
  // Stucture:
  // controlName1: {
  //     validationRuleName1: 'Validation Message.',
  //     validationRuleName2: 'Validation Message.'
  // },
  // controlName2: {
  //     validationRuleName1: 'Validation Message.',
  //     validationRuleName2: 'Validation Message.'
  // }
  constructor(private validationMessages: { [key: string]: { [key: string]: string } }) { }

  processMessages(container: FormGroup): { [key: string]: string } {
    const messages: any = {};
    for (const controlKey in container.controls) {

      if (container.controls.hasOwnProperty(controlKey)) {
        const c = container.controls[controlKey];

        // If it is a FormGroup, process its child controls.
        if (c instanceof FormGroup) {
          const childMessages = this.processMessages2(c, controlKey);
          Object.assign(messages, childMessages);
        }
        else {
          // Only validate if there are validation messages for the control
          if (this.validationMessages[controlKey]) {
            messages[controlKey] = '';
            if ((c.dirty || c.touched) && c.errors) {
              console.log('imamo error za', controlKey)
              Object.keys(c.errors).map(messageKey => {
                console.log('messageKey', messageKey);
                if (this.validationMessages[controlKey][messageKey]) {
                  messages[controlKey] += this.validationMessages[controlKey][messageKey] + ' ';
                  console.log('error', this.validationMessages[controlKey][messageKey])
                }
              });
            }
          }
        }
      }
    }
    return messages;
  }

  processMessages2(container: FormGroup, key: string): { [key: string]: string } {
    const messages: any = {};

    if (key) {
      if (this.validationMessages[key]) {
        messages[key] = '';
        if ((container.dirty || container.touched) && container.errors) {
          Object.keys(container.errors).map(messageKey => {
            if (this.validationMessages[key][messageKey]) {
              messages[key] += this.validationMessages[key][messageKey] + ' ';
            }
          });
        }
      }
    }
    for (const controlKey in container.controls) {
      console.log('controlKey', controlKey)

      if (container.controls.hasOwnProperty(controlKey)) {
        const c = container.controls[controlKey];
        console.log('1 | c', c)

        // If it is a FormGroup, process its child controls.
        if (c instanceof FormGroup) {
          console.log('ovde smo')
          const childMessages = this.processMessages(c);
          Object.assign(messages, childMessages);
        }
        else {
          // Only validate if there are validation messages for the control
          console.log('2')
          if (this.validationMessages[controlKey]) {
            console.log('3')
            messages[controlKey] = '';
            if ((c.dirty || c.touched) && c.errors) {
              console.log('4')
              Object.keys(c.errors).map(messageKey => {
                if (this.validationMessages[controlKey][messageKey]) {
                  messages[controlKey] += this.validationMessages[controlKey][messageKey] + ' ';
                }
              });
            }
          }
        }
      }
    }

    return messages;
  }

  passwordMatcher = (c: AbstractControl): { [key: string]: boolean } | null => {
    // Argument "c" will be of type FormGroup (passwordGroup). For this reason,
    // we manually set errors for the FormControl (passwordConfirm), because otherwise
    // mat-error wouldn't display an error because the FormControl itself would be valid.

    const passwordControl = c.get('password');
    const passwordConfirmControl = c.get('passwordConfirm');

    if (passwordControl?.pristine || passwordConfirmControl?.pristine) {
      passwordConfirmControl?.setErrors(null);
      return null;
    }

    if (passwordControl?.value == passwordConfirmControl?.value) {
      passwordConfirmControl?.setErrors(null);
      return null;
    }

    passwordConfirmControl?.setErrors({match: true});
    return { match: true };
  }
}
