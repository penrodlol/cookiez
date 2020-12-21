import { Component, OnInit } from '@angular/core';
import { NxMessageToastService } from '@aposin/ng-aquila/message';
import { CookiesPaginationVar } from '../../../graphql/var/cookies-pagination.var';

export interface IHeader { name: string; size: number; }

@Component({
  selector: 'cookiez-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly headers: ReadonlyArray<IHeader> = [
     { name: 'Environment', size: 25 },
     { name: 'Type', size: 30 },
     { name: 'Snippet', size: 40 },
  ];

  pagination$ = this.cookiesPaginationVar.current$;

  constructor(
    private toast: NxMessageToastService,
    private cookiesPaginationVar: CookiesPaginationVar,
  ) { }

  ngOnInit(): void { this.cookiesPaginationVar.init(); }

  nextPage = () => this.cookiesPaginationVar.fetch({ next: true });
  prevPage = () => this.cookiesPaginationVar.fetch({ previous: true });
  goToPage = (specific: number) => this.cookiesPaginationVar.fetch({ specific });

  copiedToClipboard = () => this.toast.open('Copied to Clipboard!', {
    context: 'success',
    duration: 1000,
  })

}
