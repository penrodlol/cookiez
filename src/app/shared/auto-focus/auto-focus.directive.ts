import { AfterViewInit, Directive, ElementRef, NgModule } from '@angular/core';

@Directive({ selector: '[cookiezAutoFocus]' })
export class AutoFocusDirective implements AfterViewInit {
  constructor(private input: ElementRef<HTMLInputElement>) { }

  ngAfterViewInit(): void { this.input.nativeElement.focus(); }
}

@NgModule({
  declarations: [AutoFocusDirective],
  exports: [AutoFocusDirective],
})
export class AutoFocusDirectiveModule { }
