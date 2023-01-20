import { BaseRouteReuseStrategy } from '@angular/router';
import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { AppLaunchpadActivatedRouteSnapshotHelper } from './applaunchpad-activated-route-snapshot-helper';

export class AppLaunchpadRouteStrategy extends BaseRouteReuseStrategy {
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    AppLaunchpadActivatedRouteSnapshotHelper.setCurrent(route);
    return super.retrieve(route);
  }
}
