<!-- meta
{
  "node": {
    "label": "Core/Client communication",
    "category": {
      "label": "Advanced",
      "collapsible": true
    },
    "metaData": {
      "categoryPosition": 7,
      "position": 1
    }
  }
}
meta -->

# Communication

<!-- add-attribute:class:success -->
>**TIP:** For learning and testing purposes, use the [AppLaunchpad Fiddle](https://fiddle.applaunchpad-project.io) page where you can configure a sample AppLaunchpad application.

## Overview

The AppLaunchpad configuration file can include a section called `communication:`. In it, you can define custom messages to be exchanged between AppLaunchpad Core and AppLaunchpad Client, as well as configure additional communication options.  

## Custom messages 

AppLaunchpad Core and AppLaunchpad Client can exchange custom messages in both directions.

### AppLaunchpad Client to AppLaunchpad Core

For AppLaunchpad Client to send messages to AppLaunchpad Core, use the [sendCustomMessage](applaunchpad-client-api.md#sendCustomMessage) method from Client API.

For AppLaunchpad Core to process custom messages, define a configuration similar to the following at the root level of your AppLaunchpad configuration object:

```javascript
{
  ...
  communication: {
    customMessagesListeners: {
      'my-custom-message.update-top-nav': () => {
        AppLaunchpad.navigation().updateTopNavigation();
      }
    }
  }
  ...
}
```
where the `my-custom-message.update-top-nav` key is the message ID, and the value is the listener function for the custom message. The listener receives the following input parameters:
- **customMessage** the [message](applaunchpad-client-api.md#sendCustomMessage) sent by AppLaunchpad Client.
- **microfrontend** a micro frontend object as specified [here](applaunchpad-core-api.md#getMicrofrontends).
- **navigation node** a [navigation node object](navigation-parameters-reference.md#Node-parameters).

### AppLaunchpad Core to AppLaunchpad Client

For AppLaunchpad Core to send messages, use the [customMessages](applaunchpad-core-api.md#customMessages) section from Core API. You can send a custom message to all rendered micro frontends, or to a specific one. For the latter, use the Core API [elements](applaunchpad-core-api.md#elements) methods to retrieve micro frontends and select the one you want to send the custom message to.

For AppLaunchpad Client to process the message, add and remove message listeners as described [here](applaunchpad-client-api.md#addCustomMessageListener).

## Ignore events from inactive iframes

In the `communication:` section of the AppLaunchpad config, you can add the `skipEventsWhenInactive` parameter in order to ignore events normally sent from AppLaunchpad Client to AppLaunchpad Core when an iframe/micro frontend is not currently selected or active. 

For example, you can ignore any of these events (or others, as needed):
- [applaunchpad.navigation.open](https://github.com/davidwl/applaunchpad/blob/master/client/src/linkManager.js#L82) - skipping this event will prevent the inactive iframe from opening
- [applaunchpad.navigate.ok](https://github.com/davidwl/applaunchpad/blob/master/client/src/lifecycleManager.js#L124) - skipping this event will prevent navigation 
- [applaunchpad.ux.confirmationModal.show](https://github.com/davidwl/applaunchpad/blob/master/client/src/uxManager.js#L102) -  skipping this event will prevent the showing of a [confirmation modal](applaunchpad-client-api.md#showconfirmationmodal) 
- [applaunchpad.ux.alert.show](https://github.com/davidwl/applaunchpad/blob/master/client/src/uxManager.js#L172) - skipping this event will prevent the showing of an [alert](applaunchpad-client-api.md#showalert) 

### skipEventsWhenInactive
- **type**: array of strings
- **description**: a list of strings specifying the names of events which you want to ignore. When specified, the events will be ignored when an iframe is inactive. 
- **default**: undefined
- **example**:

```javascript
{
  ...
  communication: {
    skipEventsWhenInactive: ["applaunchpad.navigation.open", "applaunchpad.ux.alert.show"]
  }
  ...
}
```
