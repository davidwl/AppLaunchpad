<!-- meta
{
  "node": {
    "label": "Framework support libraries",
    "category": {
      "label": "AppLaunchpad Client",
      "collapsible": true
    },
    "metaData": {
      "categoryPosition": 5,
      "position": 1
    }
  }
}
meta -->

# AppLaunchpad Client framework support libraries

On this page, you can find more information about AppLaunchpad Client support libraries for web application frameworks.

## Angular support Library

The [ClientSupportAngular](https://github.com/davidwl/applaunchpad/tree/master/client-frameworks-support/client-support-angular/projects/client-support-angular) library provides several features to run your Angular application inside the AppLaunchpad micro frontend framework.


### How to use the library

1. Import the library in the `package.json`:
```javascript
npm install @applaunchpad-project/client-support-angular -s
```

2. Once the library is imported and saved in your Angular project, you need to import the module `AppLaunchpadAngularSupportModule`:

```javascript
imports: [
  ........
  ,AppLaunchpadAngularSupportModule
],
```

### Features

These are the main features provided by the library:
* [AppLaunchpadContextService](#AppLaunchpadContextService)
* [AppLaunchpadAutoRoutingService](#AppLaunchpadAutoRoutingService)
  * Preload component - an empty Angular component that can be used to build a preload route. See also [preloadUrl](https://docs.applaunchpad-project.io/docs/navigation-parameters-reference/?section=viewgroupsettings).
  * [Angular routing example](#angular-routing-example) 
  * [AppLaunchpadRouteStrategy](#AppLaunchpadRouteStrategy)
  * [AutoRouting for modals](#autorouting-for-modals)
* [AppLaunchpadMockModule](#AppLaunchpadMockModule) - an Angular module that listens to AppLaunchpad Client calls and messages and sends a mocked response back. See also [AppLaunchpadMockUtil](https://docs.applaunchpad-project.io/docs/framework-support-libraries/?section=applaunchpad-testing-utilities). 


### AppLaunchpadContextService

You can inject this service inside your Angular items in order to:
* Get the current (latest) Context that we received from AppLaunchpad Core
* Provide an Observable<Context> where through subscribing, you can get any Context change

**AppLaunchpadContextService** is an abstract class. Its implementation is in the **AppLaunchpadContextServiceImpl** class.
If you need to change or extend the implementation, you can easily create a new class extending **AppLaunchpadContextServiceImpl**:

In this class, we added the possibility to "reuse" a component and not initialize it every time you load it (it could be useful to keep component state.)

```javascript
export class YourContextService extends  AppLaunchpadContextServiceImpl {
    ....
}

```
Inside your module, redefine the provider:
 ```javascript
providers: [
    {
        provide: AppLaunchpadContextService,
        useClass: YourContextService
    }
]
 ```

### AppLaunchpadAutoRoutingService

This service cannot be used directly, but it will provide useful features on how to synchronize your Angular application with AppLaunchpad navigation.
It can happen that in your micro frontend, user can navigate through different components/pages.
With this feature, we provide an easy way of synchronizing Angular route with AppLaunchpad navigation. In the Angular route configuration, you can now add in data these attributes:

### Angular routing example

 ```javascript
{path: 'applaunchpad-client-support-preload',component: Sample1Component,data: { fromVirtualTreeRoot: true }}
{path: 'applaunchpad-client-support-preload',component: Sample2Component,data: { applaunchpadRoute: '/home/sample2' }}
{path: 'applaunchpad-client-support-preload',component: Sample2Component,data: { applaunchpadRoute: '/home/sample2', fromContext: true}}
{path: 'applaunchpad-client-support-preload',component: Sample2Component,data: { applaunchpadRoute: '/home/sample2', fromContext: 'localContext'}}
 ```

With `data: { fromVirtualTreeRoot: true }`, once we load Sample1Component, we will call AppLaunchpad Client:

 ```javascript
  applaunchpadClient.linkManager().fromVirtualTreeRoot().withoutSync().navigate({route url});
 ```

With `data: { applaunchpadRoute: '/home/sample2' }`, uses applaunchpadClient API in this way:
 ```javascript
  applaunchpadClient.linkManager().withoutSync().navigate(data.applaunchpadRoute);
 ```

With `data: { applaunchpadRoute: '/home/sample2', fromContext: true }`, uses applaunchpadClient API in this way:
 ```javascript
  applaunchpadClient.linkManager().fromClosestContext().withoutSync().navigate(data.applaunchpadRoute);
 ```

With `data: { applaunchpadRoute: '/home/sample2', fromContext: 'localContext' }`, uses applaunchpadClient API in this way:
 ```javascript
  applaunchpadClient.linkManager().fromContext('localContext').withoutSync().navigate(data.applaunchpadRoute);
 ```

More information about linkManager can be found [here](https://docs.applaunchpad-project.io/docs/applaunchpad-client-api/?section=linkmanager).


#### AppLaunchpadRouteStrategy

To use **AppLaunchpadAutoRoutingService**, this library defines a new **RouteReuseStrategy** named **AppLaunchpadRouteStrategy**.
If you need to define your own **RouteReuseStrategy**, you can extend **AppLaunchpadRouteStrategy** by overriding it in this way:

 ```javascript
export class YourRouteStrategy extends AppLaunchpadRouteStrategy {

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        super.retrieve(route);
        // Your code
    }

}
 ```
and define the provider:
 ```javascript
 {
      provide: RouteReuseStrategy,
      useClass: YourRouteStrategy
 }
 ```

#### AutoRouting for modals

Similarly to other components, modals which have a [modalPathParam](https://docs.applaunchpad-project.io/docs/navigation-parameters-reference/?section=modalpathparam) can trigger a change in the URL when navigation occurs. In the Angular router of your AppLaunchpad app, you can enable auto-routing for modals using these parameters: 
- `updateModalDataPath` - if set to `true`, the URL will be updated automatically every time the user navigates within a modal. 
- `addHistoryEntry` - if set to `true`, changes in the modal will also add a history element in the history of the tab.

For example: 
```javascript
{
    path: 'applaunchpad-client-support-preload',
    component: AppLaunchpadPreloadComponent,
    data: { updateModalDataPath: true, addHistoryEntry: true }
  }
```

### AppLaunchpadMockModule

In the normal AppLaunchpad workflow, messages coming from AppLaunchpad Client to AppLaunchpad Core are processed on the Core and a proper response is sent back. However, in many systems where testing of micro frontends standalone is a necessity, the absence of AppLaunchpad Core to send back needed responses to Client micro frontends becomes a case of high coupling. To remove this coupling, we introduce **AppLaunchpadMockModule** for **Angular** applications. This module is attached to the start of your application where it intercepts all the Client calls and sends a mocked Core response back. This enables users to test their micro frontends standalone without depending on the Core. 
To use **AppLaunchpadMockModule**, simply add it to the list of imports of your applications entry point. A good practice is to include it in the main testing module of your application as given in the example below:

 ```javascript
import {AppLaunchpadMockModule} from '@applaunchpad-project/client-support-angular';

/**
 * This module is used to run the application for e2e tests.
 */
@NgModule({
  imports: [
    AppModule,
    AppLaunchpadMockModule,
  ],
  bootstrap: [AppComponent]
})
export class AppTestingModule {}

 ```

To make mocking of AppLaunchpad Core easier, you can use a range of utility functions and assertions. Our lightweight [AppLaunchpad Testing Utilities](https://docs.applaunchpad-project.io/docs/framework-support-libraries/?section=applaunchpad-testing-utilities) library provides the necessary basic utility functions needed for your application. 



## AppLaunchpad Testing Utilities

The AppLaunchpad Testing Utilities are a set of auxiliary functions used to enhance the user experience while testing AppLaunchpad-based micro frontends. The functions abstract away AppLaunchpad-specific logic from the tester so that it is easier for them to mock and assert AppLaunchpad functionality. 

### AppLaunchpadMockUtil 
This class contains certain utility helper functions needed when writing [protractor](https://www.npmjs.com/package/protractor) based e2e tests. You can simply import this module into you project and then use an instance of it to test microfrontend functionality. 

### How to use the library

**Prerequisites:**
_In order to use this utility library you need to import AppLaunchpadMockModule into your Angular applications entry point. See more [here](https://docs.applaunchpad-project.io/docs/framework-support-libraries/?section=applaunchpadcontextservice)_


1. Import the library in the `package.json`:
```javascript
npm install @applaunchpad-project/testing-utilities -s
```

2. Once the library is imported and saved in your Angular project, you can now import the module `AppLaunchpadMockUtil` into your test:
```javascript
import { AppLaunchpadMockUtil } from "@applaunchpad-project/testing-utilities";
```

#### Example

```javascript
import { browser } from 'protractor'; // <-- target e2e testing library
import { AppLaunchpadMockUtil } from "@applaunchpad-project/testing-utilities";

describe('Another test', () => {
  let applaunchpadMockUtil: AppLaunchpadMockUtil;

  beforeAll(async () => {
    applaunchpadMockUtil = new AppLaunchpadMockUtil(browser);
  });

  it('should load the page if correct applaunchpad context provided', async () => {
    await applaunchpadMockUtil.mockContext({
      someData: '1',
      someOtherData: 'randomInfo',
    });
  }
}
```

#### Functions provided
- **mockContext**: Mocks the context by sending AppLaunchpad context messages with the desired mocked context as parameter. 
- **mockPathExists**: This method serves as a mock for the AppLaunchpad Client `pathExists()` function. It is used in e2e tests when component being tested utilizes a call to `AppLaunchpadClient.linkManager().pathExists()`
- **modalOpenedWithTitle**: Checks on the printed DOM AppLaunchpad message responses for a modal with given title being opened. In such a case, a message would be printed containing a `modal.title`. Returns `false` if such element was not found.
- **getMSG**: Returns list of messages, representing message elements added in the DOM for testing. 
- **parseAppLaunchpadMockedMessages**: Parses the elements added by AppLaunchpadMockModule into the DOM and assigns them to the local messages variable
