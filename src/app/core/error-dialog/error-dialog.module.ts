import { Component, Inject, NgModule, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NxModalModule, NX_MODAL_DATA } from '@aposin/ng-aquila/modal';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { GraphQLError } from 'graphql';
import { ServerError, ServerParseError } from '@apollo/client/core';

@Component({
  selector: 'cookiez-error-dialog',
  template: `
    <div
      class="error-dialog"
      nxModalContent
      [style.padding]=0>
      <div
        class="error-dialog__header"
        fxLayout="row"
        fxLayoutGap="20px"
        fxLayoutAlign="start center">
        <nx-icon name="exclamation-circle"></nx-icon>
        <h1>Error</h1>
      </div>
      <p
        class="error-dialog__body"
        nxCopytext>
        {{data.message}}
      </p>
    </div>
    <div
      nxModalActions
      fxLayout="row"
      fxLayoutAlign="center center">
      <button
        class="nx-margin-bottom-0"
        fxFlex="50"
        nxModalClose="Dismiss"
        nxButton="small-medium emphasis"
        type="button">
        Dismiss
      </button>
    </div>
  `,
  styles: [`
    .nx-modal__container { padding-top: 0 !important; }
    .nx-modal__actions { border-color: var(--ui-03) !important; }

    .error-dialog__header {
      padding: 20px;
      background-color: var(--danger);
    }

    .error-dialog__header nx-icon {
      color: var(--ui-01) !important;
      font-size: 50px !important;
    }

    .error-dialog__header h1 {
      color: var(--ui-01);
      font-size: 35px;
    }

    .error-dialog__body {
      padding: 20px;
      line-height: 30px;
      font-size: var(--font-l);
    }
  `],
  encapsulation: ViewEncapsulation.None,
})
export class ErrorDialogComponent {
  constructor(
    @Inject(NX_MODAL_DATA) public data:
      GraphQLError |
      Error |
      ServerError |
      ServerParseError,
  ) { }
}

@NgModule({
  declarations: [
    ErrorDialogComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NxModalModule,
    NxButtonModule,
    NxIconModule,
  ],
  exports: [
    ErrorDialogComponent
  ],
})
export class ErrorDialogModule { }
