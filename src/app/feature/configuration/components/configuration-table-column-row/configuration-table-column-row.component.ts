import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Environment } from 'src/app/graphql/model/environment.model';
import { Type } from 'src/app/graphql/model/type.model';
import { EnvironmentsAndTypesVar } from '../../graphql/var/environments-and-types.var';
import { matchingNamesValidator } from '../../validators';

@Component({
  selector: 'cookiez-configuration-table-column-row',
  templateUrl: './configuration-table-column-row.component.html',
  styleUrls: ['./configuration-table-column-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationTableColumnRowComponent implements OnInit {
  @Input() entity: Environment | Type;
  @Output() added = new EventEmitter();

  editing = false;
  form: FormGroup;

  constructor(
    private builder: FormBuilder,
    private environmentsAndTypesVar: EnvironmentsAndTypesVar,
  ) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      name: this.builder.control(
        this.entity.name,
        matchingNamesValidator(this.entity.name),
      )
    });
  }

  onEditToggle(): void {
    if (!this.entity.id) { this.added.emit(); }

    this.editing = !this.editing;
    this.name.reset(this.entity.name);
  }

  onSave(): void {
    if (this.entity.id) {
      this.environmentsAndTypesVar
        .updateOne(this.entity.__typename, {
          id: this.entity.id,
          name: this.name.value,
        });
      this.editing = false;
    } else {
      this.environmentsAndTypesVar
        .addOne(
          this.entity.__typename,
          this.name.value
        );
      this.added.emit();
    }
  }

  onDelete(): void {

  }

  get name(): AbstractControl {
    return this.form.get('name');
  }

}
