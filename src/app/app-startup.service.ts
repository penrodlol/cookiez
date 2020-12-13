import { Injectable } from '@angular/core';
import { IconRegistryService } from '@icon-registry/icon-registry.service';
import { AppState } from './app.state';

@Injectable({ providedIn: 'root' })
export class AppStartupService {

  constructor(
    private iconRegistry: IconRegistryService,
    private appState: AppState,
  ) { }

  init(): Promise<boolean> {
    return new Promise(async resolve => {
      await this.iconRegistry.register();
      await this.appState.init();
      resolve(true);
    });
  }
}
