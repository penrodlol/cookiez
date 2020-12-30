import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentsAndTypesVar, IEnvironmentsAndTypesVar } from '../../../graphql/environments-and-types/var/environments-and-types.var';

@Component({
  selector: 'cookiez-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConfigurationComponent {
  readonly configuration$: Observable<IEnvironmentsAndTypesVar> = this.environmentsAndTypesVar.current$;

  constructor(private environmentsAndTypesVar: EnvironmentsAndTypesVar) { }

}
