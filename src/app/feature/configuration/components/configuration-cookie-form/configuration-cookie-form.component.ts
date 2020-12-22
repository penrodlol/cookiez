import { Component } from '@angular/core';
import { NxMessageToastService } from '@aposin/ng-aquila/message';
import { NgFormsManager as FormManger } from '@ngneat/forms-manager';
import { CookiesPaginationVar } from 'src/app/graphql/cookies/var/cookies-pagination.var';
import { CookieForm } from 'src/app/shared/cookie-form/cookie-form.component';

@Component({
  selector: 'cookiez-configuration-cookie-form',
  templateUrl: './configuration-cookie-form.component.html',
  styleUrls: ['./configuration-cookie-form.component.scss']
})
export class ConfigurationCookieFormComponent {
  dirty$ = this.manager.dirtyChanges('cookie');
  valid$ = this.manager.validityChanges('cookie');

  constructor(
    private cookiesPaginationVar: CookiesPaginationVar,
    private manager: FormManger<CookieForm>,
    private toast: NxMessageToastService,
  ) { }

  onCreate(): void {
    this.cookiesPaginationVar.addOne(
      this.manager.getControl('cookie').value
    );

    this.manager.setValue('cookie', {
      environment: null,
      type: null,
      snippet: null,
    });
    this.manager.markAsUntouched('cookie');
    this.manager.markAsPristine('cookie');

    this.toast.open('Cookie Created!', {
      context: 'success',
      duration: 1000,
    });
  }
}
