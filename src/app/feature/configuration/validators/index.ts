import { AbstractControl, ValidatorFn } from '@angular/forms';

export function matchingNamesValidator(original: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const isMatching = original === control.value;
    return isMatching ? { matchingNames: { value: control.value } } : null;
  };
}
