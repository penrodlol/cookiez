import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NxMessageToastService } from '@aposin/ng-aquila/message';
import { CookiesPaginationVar } from 'src/app/graphql/var/cookies-pagination.var';
import { IEnvironmentsAndTypesVar } from '../../graphql/var/environments-and-types.var';

@Component({
  selector: 'cookiez-configuration-cookie-form',
  templateUrl: './configuration-cookie-form.component.html',
  styleUrls: ['./configuration-cookie-form.component.scss']
})
export class ConfigurationCookieFormComponent implements OnInit {
  @Input() configuration: IEnvironmentsAndTypesVar;

  form: FormGroup;

  constructor(
    private cookiesPaginationVar: CookiesPaginationVar,
    private buider: FormBuilder,
    private toast: NxMessageToastService,
  ) { }

  ngOnInit(): void {
    this.form = this.buider.group({
      environment: null,
      type: null,
      snippet: null,
    });
  }

  onCreate(): void {
    this.cookiesPaginationVar.addOne(this.form.value);
    this.form.reset();
    this.toast.open('Cookie Created!', {
      context: 'success',
      duration: 1000,
    });
  }

}
