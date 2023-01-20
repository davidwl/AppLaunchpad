import App from './App.svelte';
import { AppLaunchpadConfig, AppLaunchpadI18N, AppLaunchpadElements } from './core-api';
import { writable, readable } from 'svelte/store';
import { AuthLayerSvc } from './services';
/* istanbul ignore file */

const createConfigStore = () => {
  const { subscribe, update, reset } = writable({});
  const scopeSubscribers = {};
  return {
    subscribe,
    update,
    reset,
    subscribeToScope: (fn, scope) => {
      let subscribers = scopeSubscribers[scope];
      if (!subscribers) {
        subscribers = new Set();
        scopeSubscribers[scope] = subscribers;
      }
      subscribers.add(fn);
    },
    fire: (scope, data) => {
      let subscribers = scopeSubscribers[scope];
      if (subscribers) {
        [...subscribers].forEach(fn => {
          fn(data);
        });
      }
    }
  };
};

export const store = createConfigStore();
export const getTranslation = readable((key, interpolations, locale) => {
  return AppLaunchpadI18N.getTranslation(key, interpolations, locale);
});

AppLaunchpad._store = store;

const configReadyCallback = () => {
  return new Promise(resolve => {
    AppLaunchpadI18N._init();

    AuthLayerSvc.init().then(() => {
      // setTimeout needed so that applaunchpad container is rendered when we retrieve it
      setTimeout(() => {
        let app;

        if (AppLaunchpadElements.isCustomAppLaunchpadContainer()) {
          document.getElementsByTagName('html')[0].classList.add('applaunchpad-app-in-custom-container');
        }

        app = new App({
          target: AppLaunchpadElements.getAppLaunchpadContainer(),
          props: {
            store,
            getTranslation
          }
        });

        AppLaunchpad.showAlert = settings => {
          return app.$$.ctx.showAlert(settings);
        };

        AppLaunchpad.showConfirmationModal = settings => {
          return app.$$.ctx.showModal(settings);
        };

        AppLaunchpad.closeSearchField = () => {
          return app.$$.ctx.closeSearchField();
        };
        AppLaunchpad.openSearchField = () => {
          return app.$$.ctx.openSearchField();
        };

        AppLaunchpad.getGlobalSearchString = () => {
          return app.$$.ctx.getGlobalSearchString();
        };

        AppLaunchpad.setGlobalSearchString = searchString => {
          app.$$.ctx.setGlobalSearchString(searchString);
        };

        AppLaunchpad.showSearchResult = arr => {
          return app.$$.ctx.showSearchResult(arr);
        };

        AppLaunchpad.closeSearchResult = () => {
          app.$$.ctx.closeSearchResult();
        };

        AppLaunchpad.clearSearchField = () => {
          app.$$.ctx.clearSearchField();
        };

        AppLaunchpad.splitView = {
          splitViewHandle: {
            close: () => app.$$.ctx.closeSplitView(),
            collapse: () => app.$$.ctx.collapseSplitView(),
            expand: () => app.$$.ctx.expandSplitView(),
            isCollapsed: () => app.$$.ctx.isSplitViewCollapsed(),
            isExpanded: () => app.$$.ctx.isSplitViewExpanded(),
            exists: () => app.$$.ctx.existsSplitView()
          }
        };

        AppLaunchpad.pathExists = path => {
          return app.$$.ctx.pathExists(path);
        };

        AppLaunchpad.hasBack = () => {
          return app.$$.ctx.hasBack();
        };

        AppLaunchpad.openUserSettings = () => {
          app.$$.ctx.openUserSettings();
        };

        AppLaunchpad.closeUserSettings = () => {
          app.$$.ctx.closeUserSettings();
        };

        resolve();
      });
    });
  });
};

AppLaunchpadConfig.setConfigCallbacks(configReadyCallback);
