import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    private buider: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.buider.group({
      environment: null,
      type: null,
      snippet: null,
    });
  }

}
