import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { NxTableModule } from '@aposin/ng-aquila/table';
import { NxPaginationModule } from '@aposin/ng-aquila/pagination';
import { NxTooltipModule } from '@aposin/ng-aquila/tooltip';
import { NxMessageModule } from '@aposin/ng-aquila/message';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';
import { NxModalModule } from '@aposin/ng-aquila/modal';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';

import { LineTruncationLibModule } from 'ngx-line-truncation';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { HomeComponent } from './components/home.component';
import { ConfirmationPopoverTemplateModule } from 'src/app/shared/confirmation-popover-template/confirmation-popover-template.module';
import { CookieFormModule } from 'src/app/shared/cookie-form/cookie-form.module';
import { EditCookieModalComponent } from './components/edit-cookie-modal/edit-cookie-modal.component';
import { TableFilterComponent } from './components/table-filter/table-filter.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    EditCookieModalComponent,
    TableFilterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ClipboardModule,
    ConfirmationPopoverTemplateModule,
    CookieFormModule,
    NxTableModule,
    NxPaginationModule,
    NxTooltipModule,
    NxMessageModule,
    NxButtonModule,
    NxIconModule,
    NxPopoverModule,
    NxModalModule,
    NxFormfieldModule,
    NxInputModule,
    NxDropdownModule,
    LineTruncationLibModule,
    PerfectScrollbarModule,
    RouterModule.forChild(routes),
  ]
})
export class HomeModule { }
