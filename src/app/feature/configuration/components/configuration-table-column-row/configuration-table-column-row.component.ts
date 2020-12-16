import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Environment } from 'src/app/graphql/model/environment.model';
import { Type } from 'src/app/graphql/model/type.model';

@Component({
  selector: 'cookiez-configuration-table-column-row',
  templateUrl: './configuration-table-column-row.component.html',
  styleUrls: ['./configuration-table-column-row.component.scss']
})
export class ConfigurationTableColumnRowComponent implements OnInit {
  @Input() entity: Environment | Type;

  editing = false;
  form: FormGroup;

  constructor(
    private builder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      name: this.entity.name
    });
  }

  onEditToggle(): void {
    this.editing = !this.editing;
    this.name.reset(this.entity.name);
  }

  private get name(): AbstractControl {
    return this.form.get('name');
  }

}
