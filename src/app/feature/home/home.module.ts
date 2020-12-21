import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { NxTableModule } from '@aposin/ng-aquila/table';
import { NxPaginationModule } from '@aposin/ng-aquila/pagination';
import { NxTooltipModule } from '@aposin/ng-aquila/tooltip';
import { NxMessageModule } from '@aposin/ng-aquila/message';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';

import { LineTruncationLibModule } from 'ngx-line-truncation';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { HomeComponent } from './components/home.component';
import { ConfirmationPopoverTemplateModule } from 'src/app/shared/confirmation-popover-template/confirmation-popover-template.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ClipboardModule,
    ConfirmationPopoverTemplateModule,
    NxTableModule,
    NxPaginationModule,
    NxTooltipModule,
    NxMessageModule,
    NxButtonModule,
    NxIconModule,
    NxPopoverModule,
    LineTruncationLibModule,
    PerfectScrollbarModule,
    RouterModule.forChild(routes),
  ]
})
export class HomeModule { }
