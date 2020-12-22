import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Cookie } from 'src/app/graphql/model/cookie.model';

@Directive({
  selector: '[cookiezCookieFormValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CookieFormValidatorDirective,
    multi: true,
  }],
})
export class CookieFormValidatorDirective implements Validator {
  @Input() original: Cookie;

  validate(control: AbstractControl): ValidationErrors {

    return this.original && (
      this.original.environment === control.get('environment').value &&
      this.original.type === control.get('type').value &&
      this.original.snippet === control.get('snippet').value
    ) ? { matchesOriginal: true } : null;
  }
}
