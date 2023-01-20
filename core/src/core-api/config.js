import { AsyncHelpers, EventListenerHelpers, GenericHelpers, StateHelpers } from '../utilities/helpers';
import { AppLaunchpadAuth, AppLaunchpadElements } from '.';
import { AuthLayerSvc, LifecycleHooks } from '../services';
import { NodeDataManagementStorage } from '../services/node-data-management.js';
/**
 * @name Configuration
 */
class AppLaunchpadConfig {
  /**
   * @private
   * @memberof Configuration
   */
  constructor() {
    this.configReadyCallback = function() {};
    this.initialized = false;
    this.USER_SETTINGS_KEY = 'applaunchpad.preferences.userSettings';
  }

  /**
   * @private
   * @memberof Configuration
   */
  setConfigCallbacks(configReadyCallback) {
    this.configReadyCallback = configReadyCallback;
  }

  /**
   * Sets the configuration for AppLaunchpad initially. Can also be called at a later point in time again to update the configuration.
   * @memberof Configuration
   * @param {Object} configInput the AppLaunchpad Core configuration object
   * @example
   * AppLaunchpad.setConfig({
   *   navigation: {
   *     nodes: () => [
   *       {
   *         pathSegment: 'home',
   *         label: 'Home',
   *         children: [
   *           {
   *             pathSegment: 'hello',
   *             label: 'Hello AppLaunchpad!',
   *             viewUrl: '/assets/basicexternal.html'
   *           }
   *         ]
   *       }
   *     ]
   *   },
   *   routing: {
   *     useHashRouting: true
   *   }
   * })
   */
  async setConfig(configInput) {
    this.config = configInput;
    window.AppLaunchpad._store.update(() => {
      return { config: configInput };
    });
    this._configModificationTimestamp = new Date();
    if (!this.initialized) {
      this.initialized = true;
      this.configReadyCallback().then(async () => {
        LifecycleHooks.applaunchpadAfterInit();
        await this.executeConfigFnAsync('lifecycleHooks.applaunchpadAfterInit');
      });
    }
  }

  /**
   * Returns the current active configuration
   * @returns {Object} configuration object
   * @memberof Configuration
   * @example
   * AppLaunchpad.getConfig()
   */
  getConfig() {
    return this.config;
  }

  /**
   * Tells AppLaunchpad that the configuration has been changed. AppLaunchpad will update the application or parts of it based on the specified scope.
   * @param {...string} scope one or more scope selectors specifying what parts of the configuration were changed. If no scope selector is provided, the whole configuration is considered changed.
   * <p>
   * The supported scope selectors are:
   * <p>
   * <ul>
   *   <li><code>navigation</code>: the navigation part of the configuration was changed. This includes navigation nodes, the context switcher, the product switcher and the profile menu.</li>
   *   <li><code>navigation.nodes</code>: navigation nodes were changed.</li>
   *   <li><code>navigation.contextSwitcher</code>: context switcher related data were changed.</li>
   *   <li><code>navigation.productSwitcher</code>: product switcher related data were changed.</li>
   *   <li><code>navigation.profile</code>: profile menu was changed.</li>
   *   <li><code>settings</code>: settings were changed.</li>
   *   <li><code>settings.header</code>: header settings (title, icon) were changed.</li>
   *   <li><code>settings.footer</code>: left navigation footer settings were changed.</li>
   * </ul>
   * @memberof Configuration
   */
  configChanged(...scope) {
    const optimizedScope = StateHelpers.optimizeScope(scope);
    if (optimizedScope.length > 0) {
      optimizedScope.forEach(s => {
        window.AppLaunchpad._store.fire(s, { current: window.AppLaunchpad._store });
      });
    } else {
      window.AppLaunchpad._store.update(config => config);
    }
  }

  /**
   * @private
   * @memberof Configuration
   */
  setErrorMessage(errorMsg) {
    var errorTextNode = document.createTextNode(errorMsg);
    var fd_ui = document.createElement('div');
    fd_ui.setAttribute('class', 'fd-ui');
    fd_ui.setAttribute('style', 'text-align: center;');

    var errorDiv = document.createElement('div');
    errorDiv.setAttribute('class', 'fd-message-strip fd-message-strip--error');
    errorDiv.setAttribute('style', 'max-width: 800px; display: inline-block; margin-top: 40px;');
    errorDiv.appendChild(errorTextNode);

    fd_ui.appendChild(errorDiv);
    AppLaunchpadElements.getAppLaunchpadContainer().appendChild(fd_ui);
  }

  /**
   * Gets value of the given property on AppLaunchpad config object. Target can be a value or a synchronous function.
   * @memberof Configuration
   * @param {string} property the object traversal path
   * @example
   * AppLaunchpad.getConfigValue('auth.use')
   * AppLaunchpad.getConfigValue('settings.sideNavFooterText')
   */
  getConfigValue(property) {
    return GenericHelpers.getConfigValueFromObject(this.getConfig(), property);
  }

  /**
   * Gets boolean value of the given property on AppLaunchpad config object.
   * Function return true if the property value is equal true or 'true'. Otherwise the function returns false.
   * @memberof Configuration
   * @param {string} property the object traversal path
   * @example
   * AppLaunchpad.getConfigBooleanValue('settings.hideNavigation')
   */
  getConfigBooleanValue(property) {
    const configuredValue = GenericHelpers.getConfigValueFromObject(this.getConfig(), property);
    if (configuredValue === true || configuredValue === 'true') {
      return true;
    }
    return false;
  }

  /**
   * Gets value of the given property on the AppLaunchpad config object.
   * If the value is a Function it is called (with the given parameters) and the result of that call is the value.
   * If the value is not a Promise it is wrapped to a Promise so that the returned value is definitely a Promise.
   * @memberof Configuration
   * @param {string} property the object traversal path
   * @param {*} parameters optional parameters that are used if the target is a function
   * @example
   * AppLaunchpad.getConfigValueAsync('navigation.nodes')
   * AppLaunchpad.getConfigValueAsync('navigation.profile.items')
   * AppLaunchpad.getConfigValueAsync('navigation.contextSwitcher.options')
   */
  getConfigValueAsync(property, ...parameters) {
    return AsyncHelpers.getConfigValueFromObjectAsync(this.getConfig(), property, parameters);
  }

  /**
   * Executes the function of the given property on the AppLaunchpad config object.
   * Fails if property is not a function.
   *
   * If the value is a Function it is called (with the given parameters) and the result of that call is the value.
   * If the value is not a Promise it is wrapped to a Promise so that the returned value is definitely a Promise.
   * @private
   * @memberof Configuration
   */
  async executeConfigFnAsync(property, throwError = false, ...parameters) {
    const fn = this.getConfigValue(property);
    if (GenericHelpers.isFunction(fn)) {
      try {
        return await AsyncHelpers.applyFunctionPromisified(fn, parameters);
      } catch (error) {
        if (throwError) {
          return Promise.reject(error);
        }
      }
    }

    // Promise.reject(property + ' is not a function.');
    return Promise.resolve(undefined);
  }

  /**
   * Detects if authorization is enabled via configuration.
   * @memberof Configuration
   * @returns {boolean} returns true if authorization is enabled. Otherwise returns false.
   * @deprecated now located in AppLaunchpad.auth() instead of AppLaunchpad
   */
  isAuthorizationEnabled() {
    return AppLaunchpadAuth.isAuthorizationEnabled();
  }

  /**
   * Unloads the current AppLaunchpad instance, which can be initialized later again by using `AppLaunchpad.setConfig({...})`
   * @memberof Configuration
   * @since 1.2.2
   * @example
   * AppLaunchpad.unload()
   */
  unload() {
    this.initialized = false;
    AuthLayerSvc.unload();
    EventListenerHelpers.removeAllEventListeners();
    const container = AppLaunchpadElements.getAppLaunchpadContainer();
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }
  }

  /**
   * Reads the user settings object.
   * You can choose a custom storage to read the user settings by implementing the `userSetting.readUserSettings` function in the settings section of the AppLaunchpad configuration.
   * By default, the user settings will be read from the **localStorage**
   * @memberof Configuration
   * @returns {promise} a promise when a custom `readUserSettings` function in the settings.userSettings section of the AppLaunchpad configuration is implemented. It resolves a stored user settings object. If the promise is rejected the user settings dialog will also closed if the error object has a `closeDialog` property, e.g `reject({ closeDialog: true, message: 'some error' })`. In addition a custom error message can be logged to the browser console.
   * @example
   * AppLaunchpad.readUserSettings();
   * @since 1.7.1
   */
  async readUserSettings() {
    const userSettingsConfig = await this.getConfigValueAsync('userSettings');
    const userSettings = userSettingsConfig
      ? userSettingsConfig
      : await this.getConfigValueAsync('settings.userSettings');
    if (userSettings && GenericHelpers.isFunction(userSettings.readUserSettings)) {
      return userSettings.readUserSettings();
    }
    const localStorageValue = localStorage.getItem(this.USER_SETTINGS_KEY);

    return localStorageValue && JSON.parse(localStorageValue);
  }

  /**
   * Stores the user settings object.
   * You can choose a custom storage to write the user settings by implementing the `userSetting.storeUserSettings` function in the settings section of the AppLaunchpad configuration
   * By default, the user settings will be written from the **localStorage**
   * @memberof Configuration
   * @returns {promise} a promise when a custom `storeUserSettings` function in the settings.userSettings section of the AppLaunchpad configuration is implemented. If it is resolved the user settings dialog will be closed. If the promise is rejected the user settings dialog will also closed if the error object has a `closeDialog` property, e.g `reject({ closeDialog: true, message: 'some error' })`. In addition a custom error message can be logged to the browser console.
   * @param {Object} userSettingsObj to store in the storage.
   * @param {Object} previousUserSettingsObj the previous object from storage.
   * @example
   * AppLaunchpad.storeUserSettings(userSettingsobject, previousUserSettingsObj);
   * @since 1.7.1
   */
  async storeUserSettings(userSettingsObj, previousUserSettingsObj) {
    const userSettingsConfig = await this.getConfigValueAsync('userSettings');
    const userSettings = userSettingsConfig
      ? userSettingsConfig
      : await this.getConfigValueAsync('settings.userSettings');
    if (userSettings && GenericHelpers.isFunction(userSettings.storeUserSettings)) {
      return userSettings.storeUserSettings(userSettingsObj, previousUserSettingsObj);
    } else {
      localStorage.setItem(this.USER_SETTINGS_KEY, JSON.stringify(userSettingsObj));
    }
    this.configChanged();
  }

  /**
   * Reset the current AppLaunchpad instance and initialize AppLaunchpad with the latest AppLaunchpad config.
   * @memberof Configuration
   * @example
   * AppLaunchpad.reset();
   * @since 1.14.0
   */
  reset() {
    const cfg = this.getConfig();
    this.unload();
    this.setConfig(cfg);
  }

  /**
   * Clear navigation node related caches.
   * @memberof Configuration
   * @example
   * AppLaunchpad.clearNavigationCache();
   * @since 1.19.0
   */
  clearNavigationCache() {
    NodeDataManagementStorage.deleteCache();

    const clearTitleResolverCache = nodes => {
      if (nodes && nodes.forEach) {
        nodes.forEach(node => {
          if (node.titleResolver && node.titleResolver._cache) {
            node.titleResolver._cache = undefined;
          }
          if (node.children) {
            clearTitleResolverCache(node.children);
          }
        });
      }
    };

    clearTitleResolverCache(this.getConfig().navigation.nodes);
  }
}

export const config = new AppLaunchpadConfig();
