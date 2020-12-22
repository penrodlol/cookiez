import { Component, Inject, OnInit } from '@angular/core';
import { NX_MODAL_DATA } from '@aposin/ng-aquila/modal';
import { Cookie } from 'src/app/graphql/model/cookie.model';
import { NgFormsManager as FormManger } from '@ngneat/forms-manager';
import { CookieForm } from 'src/app/shared/cookie-form/cookie-form.component';
import { EnvironmentsAndTypesVar } from 'src/app/graphql/environments-and-types/var/environments-and-types.var';

@Component({
  selector: 'cookiez-edit-cookie-modal',
  templateUrl: './edit-cookie-modal.component.html',
  styleUrls: ['./edit-cookie-modal.component.scss']
})
export class EditCookieModalComponent implements OnInit {
  valid$ = this.manager.validityChanges('cookie');

  constructor(
    @Inject(NX_MODAL_DATA) public data: Cookie,
    private manager: FormManger<CookieForm>,
    private environmentsAndTypesVar: EnvironmentsAndTypesVar,
  ) { }

  ngOnInit(): void { this.environmentsAndTypesVar.init(); }

  onSaveProgress(): void {

  }

}
