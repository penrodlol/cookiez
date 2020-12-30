import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EnvironmentsAndTypesVar, IEnvironmentsAndTypesVar } from 'src/app/graphql/environments-and-types/var/environments-and-types.var';
import { Cookie } from 'src/app/graphql/model/cookie.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgFormsManager as FormManger } from '@ngneat/forms-manager';

export interface CookieForm {
  cookie: Pick<Cookie, 'environment' | 'type' | 'snippet'>;
}

@Component({
  selector: 'cookiez-cookie-form',
  templateUrl: './cookie-form.component.html',
  styleUrls: ['./cookie-form.component.scss'],
})
export class CookieFormComponent implements OnInit, OnDestroy {
  @Input() cookie: Cookie | null;

  readonly configuration$: Observable<IEnvironmentsAndTypesVar> = this.environmentsAndTypesVar
    .current$
    .pipe(tap(({ environments, types }) => {
      environments.length === 0 || types.length === 0 ?
        this.form.disable() :
        this.form.enable();
    }));

  form: FormGroup;

  constructor(
    private builder: FormBuilder,
    private manager: FormManger<CookieForm>,
    private environmentsAndTypesVar: EnvironmentsAndTypesVar,
  ) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      environment: this.cookie?.environment,
      type: this.cookie?.type,
      snippet: this.cookie?.snippet,
    });

    this.manager.upsert('cookie', this.form, {
      debounceTime: 50,
    });
  }

  ngOnDestroy(): void {
    this.manager.destroy('cookie');
  }
}
