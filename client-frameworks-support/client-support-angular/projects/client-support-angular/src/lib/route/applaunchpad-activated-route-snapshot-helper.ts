import { ActivatedRouteSnapshot } from '@angular/router';

export class AppLaunchpadActivatedRouteSnapshotHelper {
  // tslint:disable-next-line:variable-name
  private static _current: ActivatedRouteSnapshot = (null as unknown) as ActivatedRouteSnapshot;

  static getCurrent(): ActivatedRouteSnapshot {
    return AppLaunchpadActivatedRouteSnapshotHelper._current;
  }

  static setCurrent(current: ActivatedRouteSnapshot): void {
    AppLaunchpadActivatedRouteSnapshotHelper._current = current;
  }
}
