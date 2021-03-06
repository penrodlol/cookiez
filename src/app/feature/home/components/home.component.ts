import { Component, OnInit } from '@angular/core';
import { NxMessageToastService } from '@aposin/ng-aquila/message';
import { NxDialogService } from '@aposin/ng-aquila/modal';
import { take } from 'rxjs/operators';
import { EnvironmentsAndTypesVar } from 'src/app/graphql/environments-and-types/var/environments-and-types.var';
import { Cookie } from 'src/app/graphql/model/cookie.model';
import { CookiesPaginationVar } from '../../../graphql/cookies/var/cookies-pagination.var';
import { EditCookieModalComponent } from './edit-cookie-modal/edit-cookie-modal.component';
import { NgFormsManager as FormManger } from '@ngneat/forms-manager';
import { CookieFilterForm } from './table-filter/table-filter.component';

export interface IHeader { name: string; size: number; }

@Component({
  selector: 'cookiez-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly headers: ReadonlyArray<IHeader> = [
     { name: '', size: 8 },
     { name: 'Environment', size: 26 },
     { name: 'Type', size: 26 },
     { name: 'Snippet', size: 40 },
  ];

  pagination$ = this.cookiesPaginationVar.current$;
  dirty$ = this.manager.dirtyChanges('cookieFilter');

  constructor(
    private toast: NxMessageToastService,
    private dialog: NxDialogService,
    private manager: FormManger<CookieFilterForm>,
    private cookiesPaginationVar: CookiesPaginationVar,
    private environmentsAndTypesVar: EnvironmentsAndTypesVar,
  ) { }

  ngOnInit(): void {
    this.cookiesPaginationVar.init();
    this.environmentsAndTypesVar.init();
  }

  nextPage = () => this.cookiesPaginationVar.fetch({ next: true });
  prevPage = () => this.cookiesPaginationVar.fetch({ previous: true });
  goToPage = (specific: number) => this.cookiesPaginationVar.fetch({ specific });

  copiedToClipboard = () => this.toast.open('Copied to Clipboard!', {
    context: 'success',
    duration: 1000,
  })

  onEdit(cookie: Cookie): void {
    this.dialog
      .open(EditCookieModalComponent, {
        showCloseIcon: true,
        data: cookie,
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe(isSaved => {
        if (isSaved === 'true') {
          this.toast.open('Cookie Updated!', {
            context: 'success',
            duration: 1000,
          });
        }
      });
  }

  onDelete(id: string): void {
    this.cookiesPaginationVar.deleteOne({ id });
  }
}
