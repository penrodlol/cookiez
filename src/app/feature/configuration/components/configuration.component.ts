import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { map, pluck } from 'rxjs/operators';
import { EnvironmentsAndTypesVar } from '../graphql/var/environments-and-types.var';

@Component({
  selector: 'cookiez-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  providers: [EnvironmentsAndTypesVar],
  encapsulation: ViewEncapsulation.None,
})
export class ConfigurationComponent implements OnInit {
  environments$ = this.environmentsAndTypesVar.current$.pipe(pluck('environments'), map(envs => [...envs, ...envs, ...envs]));
  types$ = this.environmentsAndTypesVar.current$.pipe(pluck('types'));

  constructor(
    private environmentsAndTypesVar: EnvironmentsAndTypesVar,
  ) { }

  ngOnInit(): void { this.environmentsAndTypesVar.init(); }

}
