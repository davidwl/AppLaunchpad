import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { AppLaunchpadPreloadComponent } from './component/applaunchpad.preload.component';
import { AppLaunchpadContextService } from './service/applaunchpad-context-service';
import { AppLaunchpadContextServiceImpl } from './service/applaunchpad-context.service.impl';
import { AppLaunchpadAutoRoutingService } from './service/applaunchpad-auto-routing.service';
import { AppLaunchpadRouteStrategy } from './route/applaunchpad-route-strategy';

export const staticRoutes: Routes = [
  /** here an example if you want to specify that this component is a virtualTree element in AppLaunchpad Core navigation*/
  {
    path: 'applaunchpad-client-support-preload',
    component: AppLaunchpadPreloadComponent,
    data: { fromVirtualTreeRoot: true }
  },
  /** here an example if you want to specify that this component it is a applaunchpad component and u want to change the navigation in AppLaunchpad core*/
  {
    path: 'applaunchpad-client-support-preload',
    component: AppLaunchpadPreloadComponent,
    data: { applaunchpadRoute: '/home/reload' }
  },
  /** here an example if you want to reuse the component and not recreating every time you navigate to it (a singleton Component) It requires in your module to redefine  */
  {
    path: 'applaunchpad-client-support-preload=component',
    component: AppLaunchpadPreloadComponent,
    data: { reuse: true }
  },
  /** here an example if you want to update modalPathParam on internal navigation  */
  {
    path: 'applaunchpad-client-support-preload',
    component: AppLaunchpadPreloadComponent,
    data: { updateModalPathParam: true }
  }
];

@NgModule({
  declarations: [AppLaunchpadPreloadComponent],
  imports: [RouterModule.forChild(staticRoutes)],
  providers: [
    {
      provide: AppLaunchpadContextService,
      useClass: AppLaunchpadContextServiceImpl
    },
    {
      provide: RouteReuseStrategy,
      useClass: AppLaunchpadRouteStrategy
    }
  ],
  exports: [AppLaunchpadPreloadComponent]
})
export class AppLaunchpadAngularSupportModule {
  constructor(navigation: AppLaunchpadAutoRoutingService, context: AppLaunchpadContextService) {}
}
