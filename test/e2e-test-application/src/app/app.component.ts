import { AppLaunchpadAutoNavigationService } from './services/applaunchpad-auto-navigation.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {
  addInitListener,
  addContextUpdateListener,
  sendCustomMessage,
  addInactiveListener
} from '@applaunchpad-project/client';
import { AppLaunchpadContextService, IAppLaunchpadContextTypes } from './services/applaunchpad-context.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public title = 'app';

  constructor(
    private applaunchpadService: AppLaunchpadContextService,
    private applaunchpadAutoNav: AppLaunchpadAutoNavigationService
  ) {}

  ngOnInit() {
    addInitListener(context => {
      this.onAppLaunchpadContext('init', context);
      this.applaunchpadAutoNav.init();
    });
    addContextUpdateListener(context => {
      this.onAppLaunchpadContext('update', context);
      console.log('Context changed:', context);
    });

    addInactiveListener(() => {
      console.debug('inactiveListener: micro frontend is now in the background');
    });
  }

  private onAppLaunchpadContext(contextType: IAppLaunchpadContextTypes, context: any): void {
    this.applaunchpadService.setContext({ contextType, context });
    if (contextType === 'init') {
      sendCustomMessage({ id: 'my-micro-frontend-is-ready' });
    }
  }
}
