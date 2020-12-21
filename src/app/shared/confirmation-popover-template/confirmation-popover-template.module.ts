import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxIconModule } from '@aposin/ng-aquila/icon';

@Component({
  selector: 'cookiez-confirmation-popover-template',
  template: `
    <div
      fxLayout="column"
      fxLayoutGap="10px">
      <h3>Are you sure you?</h3>
      <section
        fxLayout="row"
        fxLayoutGap="20px">
        <button
          fxFlex="50"
          nxButton="secondary small"
          type="button"
          (click)="cancel.emit()">
          No
        </button>
        <button
          fxFlex="50"
          nxButton="primary small"
          type="button"
          (click)="confirm.emit()">
          Yes
        </button>
      </section>
    </div>
  `,
})
export class ConfirmationPopoverTemplateComponent {
  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();
}

@NgModule({
  declarations: [
    ConfirmationPopoverTemplateComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NxButtonModule,
    NxIconModule,
  ],
  exports: [
    ConfirmationPopoverTemplateComponent,
  ]
})
export class ConfirmationPopoverTemplateModule { }
