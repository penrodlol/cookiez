import { Component } from '@angular/core';
import { NxDialogService } from '@aposin/ng-aquila/modal';
import { ConfigurationComponent } from '../../configuration/components/configuration.component';

@Component({
  selector: 'cookiez-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  private readonly CONFIGURATION_MODAL_WIDTH = '95vw';

  actions: ReadonlyArray<{icon: string, label: string, route: string}> = [
    { icon: 'home', label: 'Home', route: 'home' },
  ];

  constructor(
    public dialog: NxDialogService,
  ) { }

  onConfiguration(): void {
    this.dialog.open(ConfigurationComponent, {
      showCloseIcon: true,
      maxWidth: this.CONFIGURATION_MODAL_WIDTH,
      minWidth: this.CONFIGURATION_MODAL_WIDTH,
    });
  }

}
