# ClientSupportAngular

This library provides several features to run your Angular application inside the AppLaunchpad micro frontend framework.  
If you want to know more about AppLaunchpad, please have a look at the [AppLaunchpad homepage](https://applaunchpad-project.io/).

## How to use the library
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

## Features
These are the main features provided by the library:
* [AppLaunchpadContextService](#AppLaunchpadContextService)
* [AppLaunchpadAutoRoutingService](#AppLaunchpadAutoRoutingService) 

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
This service cannot be used directly, but it will provide useful features on how to synchronize your angular application with AppLaunchpad navigation.  
It can happen that in your microfrontend, user can navigate through different components/pages.  
With this feature we provide an easy way of synchronizing angular route with AppLaunchpad navigation; in angular route configuration, you can now add in data these attributes:

 ```javascript
{path: 'applaunchpad-client-support-preload',component: Sample1Component,data: { fromVirtualTreeRoot: true }}
{path: 'applaunchpad-client-support-preload',component: Sample2Component,data: { applaunchpadRoute: '/home/sample2' }}
 ```

with `data: { fromVirtualTreeRoot: true }`, once we load Sample1Component, we will call AppLaunchpad Client:
 ```javascript
  applaunchpadClient.linkManager().fromVirtualTreeRoot().withoutSync().navigate({route url});
 ```
with `data: { applaunchpadRoute: '/home/sample2' }`, uses applaunchpadClient API in this way:
 ```javascript
  applaunchpadClient.linkManager().withoutSync().navigate(data.applaunchpadRoute);
 ```
More information about linkManager can be found [here](https://docs.applaunchpad-project.io/docs/applaunchpad-client-api/?section=linkmanager).


## AppLaunchpadRouteStrategy
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

We also provide an example of how to extend **AppLaunchpadRouteStrategy** in class **AppLaunchpadReuseRouteStrategy**.  
In this class, we added the possibility to "reuse" a component and not initialize it every time you load it (it could be useful to keep component state.)  

**AppLaunchpadReuseRouteStrategy** can be configured in the following way:
 ```javascript
{path: 'applaunchpad-client-support-preload',component: Sample1Component,data: { reuse: true }}
 ```

If you want to use **AppLaunchpadReuseRouteStrategy** (it is not enabled by default), you need to configure in your application:
 ```javascript
 {
      provide: RouteReuseStrategy,
      useClass: AppLaunchpadReuseRouteStrategy
 }
 ```

### AutoRouting for modals

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
