import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// This is used for simpler testing inside dev console
import * as AppLaunchpadClient from '@applaunchpad-project/client';
window['AppLaunchpadClient'] = AppLaunchpadClient;

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
