import { Component } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'cookiez-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  readonly spinnerState$ = this.spinnerService.spinnerState$;

  constructor(
    private spinnerService: SpinnerService,
  ) { }
}
