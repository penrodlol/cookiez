import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { CookiesPaginationVar } from 'src/app/graphql/cookies/var/cookies-pagination.var';
import { EnvironmentsAndTypesVar, IEnvironmentsAndTypesVar } from 'src/app/graphql/environments-and-types/var/environments-and-types.var';

@Component({
  selector: 'cookiez-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit {
  environments$: Observable<IEnvironmentsAndTypesVar> = this.environmentsAndTypesVar
    .current$
    .pipe(pluck('environments'));

  types$: Observable<IEnvironmentsAndTypesVar> = this.environmentsAndTypesVar
    .current$
    .pipe(pluck('types'));

  form: FormGroup;

  constructor(
    private builder: FormBuilder,
    private cookiesPaginationVar: CookiesPaginationVar,
    private environmentsAndTypesVar: EnvironmentsAndTypesVar,
  ) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      environment: null,
      type: null,
      snippet: null,
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
