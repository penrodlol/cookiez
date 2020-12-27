import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'cookiez-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  user$ = this.auth.user$;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private auth: AuthService,
  ) { }

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    const returnTo = this.document.location.origin;
    this.auth.logout({ returnTo });
  }

}
