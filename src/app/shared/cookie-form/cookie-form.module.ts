import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxInputModule } from '@aposin/ng-aquila/input';

import { CookieFormComponent } from './cookie-form.component';

@NgModule({
  declarations: [
    CookieFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NxFormfieldModule,
    NxInputModule,
    NxDropdownModule,
  ],
  exports: [
    CookieFormComponent,
  ],
})
export class CookieFormModule { }
