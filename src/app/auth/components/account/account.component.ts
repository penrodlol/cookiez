import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'cookiez-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  user$ = this.auth.user$;

  constructor(
    private auth: AuthService,
  ) { }

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout();
  }

}
