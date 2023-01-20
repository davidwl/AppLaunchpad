<!-- meta
{
  "node": {
    "label": "Installation",
    "category": {
      "label": "AppLaunchpad Client",
      "collapsible": true
    },
    "metaData": {
      "categoryPosition": 5,
      "position": 0
    }
  }
}
meta -->

# AppLaunchpad Client Installation

AppLaunchpad Client contains a library that allows your application to use all features of the AppLaunchpad framework.

## Installation

Install the client in your project using npm:
```bash
npm install @applaunchpad-project/client
```

## Configuration

Import the client in places where you want to use it, depending on the environment of your choice:

### No framework/Svelte
Add this line to the imports section of the `src/main.js` file:
```javascript
import AppLaunchpadClient from '@applaunchpad-project/client';
```

### Angular
Add this line to the imports section of the `src/app/app.component.ts` file:
```javascript
import AppLaunchpadClient from '@applaunchpad-project/client';
```

### SAPUI5/OpenUI5
Add this to the `webapp/home/Home.controller.js` file: 
```js 
sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/UIComponent',
    'applaunchpad/demo/libs/applaunchpad-client/applaunchpad-client'
  ],
```

### Vue
Add this line to the imports section of the `src/main.js` file:
```js
import AppLaunchpadClient from '@applaunchpad-project/client';
```

### React
Add this line to the imports section of the `src/App.js` file:

```javascript
import AppLaunchpadClient from '@applaunchpad-project/client';
```
### Next.JS

<!-- add-attribute:class:success -->
> **TIP:** You can find an Next.JS example using AppLaunchpad Client [here](https://github.com/davidwl/applaunchpad/blob/master/core/examples/applaunchpad-example-next/pages/sample1.js).

1. Add this line to the imports section of the `src/App.js` file:

```javascript
import AppLaunchpadClient from '@applaunchpad-project/client';
```

2. Add the `useEffect` function: 
```javascript
import { useEffect } from 'react'
 
 export default function Home() {
  // recommended by https://nextjs.org/docs/migrating/from-create-react-app#safely-accessing-web-apis
  useEffect(() => {
    var applaunchpadClient = require('@applaunchpad-project/client');
    console.log("Load AppLaunchpadClient in useEffect: " + applaunchpadClient);
  }, [])
```

### Other

If you are not using any bundler, AppLaunchpad is also available as a global object:
```javascript
window.AppLaunchpadClient
```

<!-- add-attribute:class:success -->
> **TIP:** You can see AppLaunchpad Client in action by running the [Angular example application](/test/e2e-test-application).

## Usage

This section contains additional instructions and guidelines you can use to work with AppLaunchpad Client.

### AppLaunchpad Client API

In the [AppLaunchpad Client API](/docs/applaunchpad-client-api.md), you will find functions that will allow you to configure your micro frontend in the context of the main AppLaunchpad Core app.

For example, if you want to use the function `addInitListener` in order to display a AppLaunchpad [alert](/docs/applaunchpad-client-api.md#showalert) in the micro frontend, it can look like this: 

```js
useEffect(() => {
    const AppLaunchpadClient = require('@applaunchpad-project/client');
    AppLaunchpadClient.addInitListener(function(context) {
        AppLaunchpadClient.showAlert({text: 'Hello'});
    });
  }, []);
  ```

