import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgFormsManager as FormManger } from '@ngneat/forms-manager';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CookiesPaginationVar } from 'src/app/graphql/cookies/var/cookies-pagination.var';
import { EnvironmentsAndTypesVar, IEnvironmentsAndTypesVar } from 'src/app/graphql/environments-and-types/var/environments-and-types.var';
import { Cookie } from 'src/app/graphql/model/cookie.model';

export interface CookieFilterForm {
  cookieFilter: Pick<Cookie, 'environment' | 'type' | 'snippet'>;
}

@Component({
  selector: 'cookiez-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit {
  readonly configuration$ = combineLatest([
    this.cookiesPaginationVar.current$,
    this.environmentsAndTypesVar.current$ as Observable<IEnvironmentsAndTypesVar>,
  ])
  .pipe(
    tap(([{ collection }, { environments, types }]) => {
      (collection?.length === 0 || (environments.length === 0 || types.length === 0)) && this.form.pristine ?
        this.form.disable() :
        this.form.enable();
    }),
    map(vars => vars[1]),
  );

  form: FormGroup;

  constructor(
    private builder: FormBuilder,
    private manager: FormManger<CookieFilterForm>,
    private cookiesPaginationVar: CookiesPaginationVar,
    private environmentsAndTypesVar: EnvironmentsAndTypesVar,
  ) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      environment: null,
      type: null,
      snippet: null,
    });

    this.manager.upsert('cookieFilter', this.form, {
      debounceTime: 50,
    });
  }

  onSearch(): void {
    this.cookiesPaginationVar.fetch({ specific: 1 }, this.form.value);
  }

  onClear(): void {
    this.form.reset();
    this.cookiesPaginationVar.fetch({ specific: 1 });
  }

}
