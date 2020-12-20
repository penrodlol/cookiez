import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Environment } from 'src/app/graphql/model/environment.model';
import { Type } from 'src/app/graphql/model/type.model';
import { EnvironmentsAndTypesVar } from '../../graphql/var/environments-and-types.var';

@Component({
  selector: 'cookiez-configuration-table-column-row',
  templateUrl: './configuration-table-column-row.component.html',
  styleUrls: ['./configuration-table-column-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationTableColumnRowComponent implements OnInit {
  @Input() entity: Environment | Type;

  editing = false;
  form: FormGroup;
  localNameState: string;

  constructor(
    private builder: FormBuilder,
    private environmentsAndTypesVar: EnvironmentsAndTypesVar,
  ) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      name: this.entity.name
    });
    this.localNameState = this.name.value;
  }

  onEditToggle(): void {
    this.editing = !this.editing;
    this.name.reset(this.localNameState);
  }

  onSave(): void {
    this.environmentsAndTypesVar
      .updateOne(this.entity.__typename, {
          id: this.entity.id,
          name: this.name.value,
        });
    this.localNameState = this.name.value;
    this.editing = false;
  }

  onDelete(): void {

  }

  get name(): AbstractControl {
    return this.form.get('name');
  }

}
