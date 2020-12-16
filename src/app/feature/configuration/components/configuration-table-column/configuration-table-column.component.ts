import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Environment } from 'src/app/graphql/model/environment.model';
import { Type } from 'src/app/graphql/model/type.model';

@Component({
  selector: 'cookiez-configuration-table-column',
  templateUrl: './configuration-table-column.component.html',
  styleUrls: ['./configuration-table-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationTableColumnComponent implements OnInit {
  @Input() header: string;
  @Input() configuration: Environment[] | Type[];

  constructor() { }

  ngOnInit(): void { }

}
