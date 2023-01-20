<!-- meta
{
  "node": {
    "label": "Versions",
    "category": {
      "label": "Basics",
      "collapsible": true
    },
    "metaData": {
      "categoryPosition": 1,
      "position": 4
    }
  }
}
meta -->

# Versions

Read about the versions of AppLaunchpad in this document.

- [Changelog](#changelog)
- [AppLaunchpad 1.x upgrades](#applaunchpad-1x-upgrades)
- [Docs for earlier versions](#docs-for-earlier-versions)

## Changelog

Our [changelog](https://bit.ly/2W47Ewv) contains information on all the updates and features which were added to AppLaunchpad starting from its initial release.

## AppLaunchpad 1.x upgrades

AppLaunchpad versions 1.0 and above differ from earlier versions in some important ways. AppLaunchpad npm packages (previously under `kyma-project`) are under a new npm org. The new packages are:
- @applaunchpad-project/client
- @applaunchpad-project/client-ie11
- @applaunchpad-project/core
- @applaunchpad-project/core-ie11
- @applaunchpad-project/plugin-auth-oauth2
- @applaunchpad-project/plugin-auth-oidc

You can read more about the other changes below:

<!-- accordion:start -->

### Authorization Providers

We have excluded the default authorization providers from AppLaunchpad Core and published them as separate modules.
The property `customIdpProvider` has been renamed to `idpProvider`, since you now always need to define a provider.
Additionally, you need to copy callback assets to your Core application.

To install the plugins, follow these installation guides:

- [OAuth2 Implicit Grant](https://github.com/davidwl/applaunchpad/tree/master/plugins/auth/public/auth-oauth2)
- [OpenID Connect (OIDC)](https://github.com/davidwl/applaunchpad/tree/master/plugins/auth/public/auth-oidc)

<!-- add-attribute:class:warning -->
> **NOTE:** If you already had a custom provider defined, you only need to rename the provider key to `idpProvider`.

### Internet Explorer 11 (IE11)

IE11-related content is now in a separate package.

If you want to support IE11, install the client in your project using npm:
```bash
npm install @applaunchpad-project/client-ie11
npm install @applaunchpad-project/core-ie11
```

Import the client in places where you want to use it, depending on the environment of your choice:
```javascript
var AppLaunchpadClient = require('@applaunchpad-project/client-ie11');
var AppLaunchpadCore = require('@applaunchpad-project/core-ie11');
```
or
```javascript
import AppLaunchpadClient from '@applaunchpad-project/client-ie11';
import AppLaunchpadCore from '@applaunchpad-project/core-ie11';
```
or, if you are not using any bundler, AppLaunchpad is still available as a global object:
```javascript
window.AppLaunchpadClient
window.AppLaunchpad
```

### Fundamental Library Styles

Following an upgrade from SAP Fundamentals to Fundamental Library Styles, there were changes in the HTML structure. Some classes were renamed or removed completely. You can find the full list of Fundamental Library Styles changes [here](https://github.com/SAP/fundamental-styles/wiki/Breaking-Changes).

Within AppLaunchpad, we renamed the `lui-tendant-menu__control` class to `lui-ctx-switch-menu`.

With AppLaunchpad version v1.3.0, the new v0.10.0 of Fundamental Library Styles were included. As a result, there were breaking changes to the AppLaunchpad side navigation. You can see the updated layout [here](https://sap.github.io/fundamental-styles/components/side-navigation.html).

With AppLaunchpad v1.4.0, the new v0.11.0 of Fundamental Library Styles were included. As a result, there were breaking changes to the AppLaunchpad Alerts. The classes `fd-overlay fd-overlay--message-strip` were removed from Fundamental Library Styles and we added a new class `applaunchpad-alert--overlay` to keep the same look and feel as in the past. You can see all breaking changes of Fundamental Library Styles [here](https://github.com/SAP/fundamental-styles/wiki/Breaking-Changes#0110).

With AppLaunchpad v1.9.0, the new v0.14.0 of Fundamental Library Styles were included. Its previous v0.12.0 led to having breaking changes in the AppLaunchpad left side navigation and the shellbar. All icons were moved out from pseudo-classes into a dedicated tag `<i class="sap-icon sap-icon--{modifier}"></i>` under the button. You can see all breaking changes of Fundamental Library Styles v0.12.0 [here](https://github.com/SAP/fundamental-styles/releases?after=v0.12.1-rc.7).

With AppLaunchpad v1.13.0, the new v0.17.0 of Fundamental Library Styles were included. It led to having breaking changes in the AppLaunchpad Dialog/Modal layout and Shellbar Counter. New HTML attributes were added to those components to increase accesibility. You can see the new layout of these components here: [Dialog](https://sap.github.io/fundamental-styles/?path=/docs/components-dialog--default-dialog) and [Shellbar Counter](https://sap.github.io/fundamental-styles/?path=/docs/components-shellbar--primary)

In order to use TNT icons or businessSuiteInAppSymbols icons suite, it is recommended to add ```@font-face``` from [Fundamental Styles](https://sap.github.io/fundamental-styles/?path=/docs/introduction-overview--page#project-configuration) project configuration, to your custom styles.
<!-- accordion:end -->


## Docs for earlier versions

The current documentation page describes the latest AppLaunchpad version. The documentation for earlier AppLaunchpad versions is provided as Markdown files in our GitHub repository.


<!-- oldVersionsDropdown -->