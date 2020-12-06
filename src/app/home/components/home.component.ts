import { Component } from '@angular/core';
import { NxMessageToastService } from '@aposin/ng-aquila/message';
import { StubService } from 'src/app/stub/stub.service';

export interface IHeader { name: string; size: number; }

@Component({
  selector: 'cookiez-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
   readonly headers: ReadonlyArray<IHeader> = [
      { name: 'Environment', size: 25 },
      { name: 'Type', size: 30 },
      { name: 'Snippet', size: 40 },
   ];

   readonly data$ = this.stubService.data$;
   readonly page$ = this.stubService.page$;
   readonly total$ = this.stubService.total$;

  constructor(
    private stubService: StubService,
    private toastService: NxMessageToastService,
  ) { }

  nextPage = () => this.stubService.update({ nextPage: true });
  prevPage = () => this.stubService.update({ nextPage: false });
  goToPage = (specificPage: number) => this.stubService.update({ specificPage });

  copiedToClipboard = () => this.toastService.open('Copied to Clipboard!', {
    context: 'success',
    duration: 1000,
  })

}
