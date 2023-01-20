<!-- meta
{
  "node": {
    "label": "OpenID Connect Plugin",
    "category": {
      "label": "Authorization",
      "collapsible": true
    },
    "metaData": {
      "categoryPosition": 4,
      "position": 3
    }
  }
}
meta -->

# OpenID Connect - Authorization Plugin for AppLaunchpad Core

## Overview

This [authorization plugin](https://github.com/davidwl/applaunchpad/tree/master/plugins/auth/public/auth-oidc) contains a library that allows your application to extend the [AppLaunchpad framework](https://github.com/davidwl/applaunchpad/tree/master/core) with an OpenID Connect authorization provider.
Further configuration details can be found in the [main documentation](https://docs.applaunchpad-project.io/docs/authorization-configuration#openid-connect-configuration). We support Authorization Code with PKCE and Implicit Grant flow.

## Installation

Install the plugin in your project using npm:
```bash
npm install @applaunchpad-project/plugin-auth-oidc
```

Import the plugin in places where you want to use it, depending on the environment of your choice:
```javascript
var OpenIdConnect = require('@applaunchpad-project/plugin-auth-oidc');
```
or
```javascript
import OpenIdConnect from '@applaunchpad-project/plugin-auth-oidc';
```

Then, integrate it as an authorization provider in your AppLaunchpad configuration file:
```javascript
AppLaunchpad.setConfig({
  auth: {
    use: 'myProviderConfig',
    myProviderConfig: {
      idpProvider: OpenIdConnect,
      authority: 'http://authority.server',
      logoutUrl: 'http://authority.server/connect/endsession',
      scope: 'openid profile email',

      // for PKCE flow
      client_id: 'authorisation-code-pkce-mock-client', // example oidc-mockserver client id
      response_type: "code", // for PKCE
      response_mode: "fragment", // change between `query` and `fragment`

      // for implicit grant flow
      // client_id: 'implicit-mock-client', // example oidc-mockserver client id

      // ... further configuration data comes here
    }
  }
})
```

If you want to use the silent token renewal feature, the `silent-callback.html` needs to be copied to a folder in your AppLaunchpad Core installation,
which is the return path for the IdP provider, configured through the `redirect_uri` setting. The default location of `redirect_uri` is `/assets/auth-oidc/silent-callback.html`.

Next, you must install `oidc-client` in your project as a dev dependency:

```javascript
npm i -save-dev oidc-client
```

Then, you need to copy certain auxiliary plugin files and the callback file, as they are needed for the initial setup. 

Respectively from `oidc-client` library you need:
- `oidc-client.min.js` which normally resides in `node_modules/oidc-client/dist`

and from our library `@applaunchpad-project/plugin-auth-oidc` you need:
- `plugin.js`
- `silent-callback.html`
- `plugin-ie11.js` (for IE11 only)
which all reside under `node_modules/@applaunchpad-project/plugin-auth-oidc/plugin.js`.

The above mentioned files should be copied to `assets/auth-oidc` as the default location.

Below we give some alternatives on how to easily copy these files in your project. However, you may choose your own way of copying these files depending on your environment.

For applications involving a webpack configuration, one way to copy files is using packages such as [copy-webpack-plugin](https://www.npmjs.com/package/copy-webpack-plugin) and then including the following in your webpack configuration file:



```javascript
const CopyWebpackPlugin = require('copy-webpack-plugin');

{
  plugins: [
    new CopyWebpackPlugin([
     {
         from: 'node_modules/@applaunchpad-project/plugin-auth-oidc/plugin.js',
         to: 'assets/auth-oidc'
     },
     {
         from: 'node_modules/@applaunchpad-project/plugin-auth-oidc/plugin-ie11.js',
         to: 'assets/auth-oidc'
     },
     {
         from: 'node_modules/@applaunchpad-project/plugin-auth-oidc/silent-callback.html',
         to: 'assets/auth-oidc'
     },
     {
         from: 'node_modules/oidc-client/dist/oidc-client.min.js',
         to: 'assets/auth-oidc'
     }
    ])
  ]
}
```

If your application does not use webpack or you installed AppLaunchpad without a framework, you can use an alternative way of copying the `silent-callback.html` file. You can use any copy plugin to copy the file and then modify the `package.json` script to copy the file when building. One package that could be helpful is [copyfiles](https://www.npmjs.com/package/copyfiles). Below is an example:

```javascript
"buildConfig": "webpack --entry ./src/applaunchpad-config/applaunchpad-config.es6.js --output-path ./public/assets --output-filename applaunchpad-config.js --mode production",
"build": "npm run buildConfig && npm run copyCallbackOIdc",
"copyCallbackOidc": "copyfiles -f node_modules/@applaunchpad-project/plugin-auth-oidc/silent-callback.html node_modules/@applaunchpad-project/plugin-auth-oidc/plugin.js node_modules/@applaunchpad-project/plugin-auth-oidc/plugin-ie11.js node_modules/oidc-client/dist/oidc-client.min.js public/assets/auth-oidc"
```

Running `npm run build` should then suffice to bundle the config and also copy the callback file.
