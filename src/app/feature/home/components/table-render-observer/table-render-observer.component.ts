import { Component, ContentChild, ElementRef } from '@angular/core';
import { SpinnerService } from 'src/app/core/spinner/services/spinner.service';

@Component({
  selector: 'cookiez-table-render-observer',
  template: `
    <div
      [style.height.%]=100
      [cdkObserveContentDisabled]="disableRenderObserver"
      (cdkObserveContent)="onRender()">
      <ng-content></ng-content>
    </div>
  `,
})
export class TableRenderObserverComponent {
  @ContentChild('cookies') cookies: ElementRef;
  disableRenderObserver = false;

  constructor(
    private spinnerService: SpinnerService,
  ) { }

  onRender(): void {
    if (this.cookies.nativeElement.childElementCount > 0) {
      this.spinnerService.hide();
      this.disableRenderObserver = true;
    }
  }
}
