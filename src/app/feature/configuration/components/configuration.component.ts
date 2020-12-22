import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { EnvironmentsAndTypesVar, IEnvironmentsAndTypesVar } from '../../../graphql/environments-and-types/var/environments-and-types.var';

@Component({
  selector: 'cookiez-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConfigurationComponent {
  environments$: Observable<IEnvironmentsAndTypesVar> = this.environmentsAndTypesVar
    .current$
    .pipe(pluck('environments'));

  types$: Observable<IEnvironmentsAndTypesVar> = this.environmentsAndTypesVar
    .current$
    .pipe(pluck('types'));

  constructor(private environmentsAndTypesVar: EnvironmentsAndTypesVar) { }

}
