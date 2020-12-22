import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NxModalModule } from '@aposin/ng-aquila/modal';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';
import { NxMessageModule } from '@aposin/ng-aquila/message';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AutoFocusDirectiveModule } from '../../shared/auto-focus/auto-focus.directive';
import { ConfigurationComponent } from './components/configuration.component';
import { ConfigurationTableColumnComponent } from './components/configuration-table-column/configuration-table-column.component';
import { ConfigurationTableColumnRowComponent } from './components/configuration-table-column-row/configuration-table-column-row.component';
import { ConfigurationCookieFormComponent } from './components/configuration-cookie-form/configuration-cookie-form.component';
import { ConfirmationPopoverTemplateModule } from 'src/app/shared/confirmation-popover-template/confirmation-popover-template.module';
import { CookieFormModule } from 'src/app/shared/cookie-form/cookie-form.module';

@NgModule({
  declarations: [
    ConfigurationComponent,
    ConfigurationTableColumnComponent,
    ConfigurationTableColumnRowComponent,
    ConfigurationCookieFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AutoFocusDirectiveModule,
    ConfirmationPopoverTemplateModule,
    CookieFormModule,
    NxModalModule,
    NxButtonModule,
    NxIconModule,
    NxFormfieldModule,
    NxDropdownModule,
    NxInputModule,
    NxPopoverModule,
    NxMessageModule,
    PerfectScrollbarModule,
  ],
  exports: [
    ConfigurationComponent,
  ],
})
export class ConfigurationModule { }
