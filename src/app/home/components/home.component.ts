import { Component, OnInit } from '@angular/core';
import { NxMessageToastService } from '@aposin/ng-aquila/message';
import { AppState } from 'src/app/app.state';

export interface IHeader { name: string; size: number; }

@Component({
  selector: 'cookiez-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly headers: ReadonlyArray<IHeader> = [
     { name: 'Environment', size: 25 },
     { name: 'Type', size: 30 },
     { name: 'Snippet', size: 40 },
  ];

  readonly state$ = this.appState.state$;

  constructor(
    private toastService: NxMessageToastService,
    private appState: AppState,
  ) { }

  ngOnInit(): void { this.appState.fetch({ initial: true }); }

  nextPage = () => this.appState.fetch({ nextPage: true });
  prevPage = () => this.appState.fetch({ nextPage: false });
  goToPage = (specificPage: number) => this.appState.fetch({ specificPage });

  copiedToClipboard = () => this.toastService.open('Copied to Clipboard!', {
    context: 'success',
    duration: 1000,
  })

}
