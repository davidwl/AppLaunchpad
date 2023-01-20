import { AppLaunchpadUX, AppLaunchpadConfig } from './../core-api';

class AppLaunchpadLifecycleHooks {
  applaunchpadAfterInit() {
    const shouldHideAppLoadingIndicator = AppLaunchpadConfig.getConfigBooleanValue(
      'settings.appLoadingIndicator.hideAutomatically'
    );
    if (shouldHideAppLoadingIndicator) {
      // Settimeout needed, otherwise app loading indicator might not present yet and when displayed will not be hidden
      setTimeout(() => {
        AppLaunchpadUX.hideAppLoadingIndicator();
      }, 0);
    }
  }
}

export const LifecycleHooks = new AppLaunchpadLifecycleHooks();
