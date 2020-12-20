import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EnvironmentsAndTypesVar } from '../graphql/var/environments-and-types.var';

@Component({
  selector: 'cookiez-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  providers: [EnvironmentsAndTypesVar],
  encapsulation: ViewEncapsulation.None,
})
export class ConfigurationComponent implements OnInit {
  environmentsAndTypes$ = this.environmentsAndTypesVar.current$;

  constructor(
    private environmentsAndTypesVar: EnvironmentsAndTypesVar,
  ) { }

  ngOnInit(): void { this.environmentsAndTypesVar.init(); }

}
