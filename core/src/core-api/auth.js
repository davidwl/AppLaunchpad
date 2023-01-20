import { AppLaunchpadConfig } from './';
import { AuthStoreSvc, AuthLayerSvc } from '../services';
/* istanbul ignore file */
/**
 * Authorization helpers
 * @name Authorization
 */
class AppLaunchpadAuth {
  /**
   * @private
   * @memberof Authorization
   */
  constructor() {}

  /**
   * Detects if authorization is enabled via configuration.
   * Read more about [custom authorization providers](authorization-configuration.md).
   * @memberof Authorization
   * @returns {boolean} - `true` if authorization is enabled. Otherwise returns `false`.
   * @example
   * AppLaunchpad.auth().isAuthorizationEnabled();
   */
  isAuthorizationEnabled() {
    return !!AppLaunchpadConfig.getConfigValue('auth.use');
  }

  /**
   * Login the user dynamically.
   * This will run the same functionality as though the user clicked the login button.
   * @memberof Authorization
   * @since 1.5.0
   * @example
   * AppLaunchpad.auth().login();
   */
  login() {
    if (this.isAuthorizationEnabled()) {
      AuthLayerSvc.startAuthorization();
    }
  }

  /**
   * Logout the user dynamically.
   * This will run the same functionality as though the user clicked the logout button.
   * @memberof Authorization
   * @since 1.5.0
   * @example
   * AppLaunchpad.auth().logout();
   */
  logout() {
    if (this.isAuthorizationEnabled()) {
      AuthLayerSvc.logout();
    }
  }

  /**
   * @private
   * @memberof Authorization
   * @param {string} eventName
   * @param {Object} providerInstanceSettings
   * @param {AuthData} data
   * @param {string} redirectUrl
   */
  async handleAuthEvent(eventName, providerInstanceSettings, data, redirectUrl) {
    const result = await AppLaunchpadConfig.executeConfigFnAsync(
      'auth.events.' + eventName,
      false,
      providerInstanceSettings,
      data
    );
    let redirect = result === undefined || !!result;
    if (redirect && redirectUrl) {
      window.location.href = redirectUrl;
      return;
    }
    return redirect;
  }
  /**
   * Authorization Storage helpers, to be used in your custom authorization provider.
   * Read more about custom authorization providers [here](authorization-configuration.md#implement-a-custom-authorization-provider).
   * @name AuthorizationStore
   */

  /**
   * Authorization object that is stored in auth store and used within AppLaunchpad. It is then available in [AppLaunchpadClient.addInitListener](applaunchpad-client-api.md#addInitListener) and can also be used in the Core configuration.
   * @typedef {Object} AuthData
   * @property {string} accessToken - access token value
   * @property {string} accessTokenExpirationDate - timestamp value
   * @property {string} scope - scope, can be empty if it is not required
   * @property {string} idToken - id token, used for renewing authentication
   */
  get store() {
    if (!AppLaunchpadConfig.initialized) {
      console.warn(
        'AppLaunchpad Core is not initialized yet. Consider moving your code to the applaunchpadAfterInit lifecycle hook. ' +
          'Documentation: https://docs.applaunchpad-project.io/docs/lifecycle-hooks'
      );
    }
    return {
      /**
       * Retrieves the key name that is used to store the auth data.
       * @memberof AuthorizationStore
       * @returns {string} - name of the store key
       * @example AppLaunchpad.auth().store.getStorageKey()
       */
      getStorageKey: () => AuthStoreSvc.getStorageKey(),
      /**
       * Retrieves the storage type that is used to store the auth data. To set it, use the `storage` property of the `auth` AppLaunchpad configuration object. Find out more [here](https://docs.applaunchpad-project.io/docs/authorization-configuration?section=general-authorization-options).
       * @memberof AuthorizationStore
       * @returns {('localStorage'|'sessionStorage'|'none')} - storage type
       * @example AppLaunchpad.auth().store.getStorageType()
       */
      getStorageType: () => AuthStoreSvc.getStorageType(),
      /**
       * Retrieves the current auth object.
       * @memberof AuthorizationStore
       * @returns {AuthData} - the current auth data object
       * @example AppLaunchpad.auth().store.getAuthData()
       */
      getAuthData: () => AuthStoreSvc.getAuthData(),
      /**
       * Sets authorization data
       * @memberof AuthorizationStore
       * @param {AuthData} data - new auth data object
       * @example AppLaunchpad.auth().store.setAuthData(data)
       */
      setAuthData: data => AuthStoreSvc.setAuthData(data),
      /**
       * Clears authorization data from store
       * @memberof AuthorizationStore
       * @example AppLaunchpad.auth().store.removeAuthData()
       */
      removeAuthData: () => AuthStoreSvc.removeAuthData(),
      /**
       * Defines a new authorization session. Must be triggered after initial `setAuthData()` in order to trigger **onAuthSuccessful** event after login.
       * @memberof AuthorizationStore
       * @example AppLaunchpad.auth().store.setNewlyAuthorized()
       */
      setNewlyAuthorized: () => AuthStoreSvc.setNewlyAuthorized()
    };
  }
}

export const auth = new AppLaunchpadAuth();
