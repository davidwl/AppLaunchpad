<!-- meta
{
  "node": {
    "label": "Getting started",
    "category": {
      "label": "Basics",
      "collapsible": true
    },
    "metaData": {
      "categoryPosition": 1,
      "position": 0
    }
  }
}
meta -->

# Getting started

This document contains the following sections:
* [Overview](#overview)
* [Quick setup](#quick-setup)
* [Examples](#examples)
* [How to obtain support](#how-to-obtain-support)

## Overview

AppLaunchpad is an open source JavaScript framework for **micro frontends**. Micro frontend architecture breaks down big frontend monoliths into smaller and simpler chunks which can be developed by independent teams.

The AppLaunchpad framework provides configuration options, API functions, and out-of-the-box features which make migrating to a micro frontend architecture easier. AppLaunchpad provides a consistent user navigation for all your micro frontends, ensuring a better user experience. 

Most importantly, AppLaunchpad is **technology-agnostic**, which means you can use virtually any toolkit (including, but not limited to: Angular, React, Vue, or UI5) to create your frontend. 

### Benefits

Some benefits of a micro frontend architecture include:

* Future-proof and scalable 
* Multiple technologies can co-exist in the same app
* Can be managed by independent teams
* Fast deployment of new features and bugfixes
* Smaller, more manageable codebase
* Reduced maintenance cost

### Main features

<img src="https://github.com/davidwl/applaunchpad/blob/master/docs/assets/applaunchpad-overview-diagram.jpg?raw=true" alt="Graphic showing main AppLaunchpad components" width="600"/>

AppLaunchpad consists of two main parts:

**AppLaunchpad Core** - refers to the "main app", in which your micro frontends (a.k.a. views) will be embedded. It offers some of the following configurable features:
* [Navigation](navigation-configuration.md) - consistent user navigation created using specific AppLaunchpad [parameters](navigation-parameters-reference.md).
* [Authorization](authorization-configuration.md) - integration with an authentication provider, allowing users to log in.
* [Localization](i18n.md) - displaying an application in multiple languages.
* [General settings](general-settings.md) - other settings that can be configured in AppLaunchpad, such as HTML attributes, third-party cookie configuration and more.
* [API](applaunchpad-core-api.md) - functions to help with almost every part of your app: navigation, authorization, adding a [search box](applaunchpad-core-api.md#globalsearch), configuring a light/dark [theme](applaunchpad-core-api.md#theming) and others.

**AppLaunchpad Client** - refers to AppLaunchpad options related to micro frontends:
* [API](applaunchpad-client-api.md)  - diverse API functions which can be used on the micro frontend side.
* [Communication](communication.md)  - sending messages between the micro frontend and the main application (AppLaunchpad Core module).

## Quick setup

If you want to begin developing your own app with AppLaunchpad, start here:

### AppLaunchpad Core

Follow these steps to create a global user interface and host a **full web application** in AppLaunchpad:

1. Set up a AppLaunchpad Core application on one of the following frameworks:
  * [No framework](application-setup.md#application-setup-without-a-framework)
  * [Angular](application-setup.md#application-setup-for-angular)
  * [SAPUI5/OpenUI5](application-setup.md#application-setup-for-sapui5openui5)
  * [VUE.JS](application-setup.md#application-setup-for-vuejs)
  * [React](application-setup.md#application-setup-for-react)

2. Configure the application according to your needs. For example, you can begin by configuring the [basic navigation](navigation-configuration.md) of your application.

### AppLaunchpad Client

Follow these steps to add AppLaunchpad Client features to your existing **micro frontends**:

1. [Install AppLaunchpad Client](applaunchpad-client-setup.md).
2. Use the functions and parameters provided by the AppLaunchpad Client API. You can find them in the [AppLaunchpad Client API documentation](applaunchpad-client-api.md).


## Examples

Here you can find some AppLaunchpad example applications and scenarios, starting from simple to more complex:

<!-- accordion:start -->

 ### HTML file

This is a simple example of a AppLaunchpad application inside a single HTML file. It is not intended for any real-life use.

You can run it by copying and pasting this code in a text editor, then saving it as an HTML file:

```html
<!DOCTYPE html>
<html lang="en">

<head>
	  <title>Hello AppLaunchpad</title>
	  <link rel='stylesheet' href='https://unpkg.com/@applaunchpad-project/core/applaunchpad.css'>
      <meta charset="utf-8">
</head>

<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <script src="https://unpkg.com/@applaunchpad-project/core/applaunchpad.js"></script>
	<script>
        AppLaunchpad.setConfig({
            navigation: {
                nodes: [{
                    pathSegment: 'home',
                    hideFromNav: true,
                    children: [{
                        pathSegment: 'hello',
                        label: 'Hello AppLaunchpad',
                        viewUrl: 'https://fiddle.applaunchpad-project.io/examples/microfrontends/multipurpose.html',
                        isolateView: true,
                        context: {
                            title: 'Hello AppLaunchpad!',
                            content: " ",
                            imgUrl: "https://fiddle.applaunchpad-project.io/img/logos/AppLaunchpad-logo_rgb.svg",
                            imgWidth: "300",
                            imgTopMargin: true
                        }
                    },{
                        pathSegment: 'hello2',
                        label: 'Hello Maryna',
                        viewUrl: 'https://fiddle.applaunchpad-project.io/examples/microfrontends/multipurpose.html',
                        isolateView: true,
                        context: {
                            title: 'Hello Maryna!',
                            content: " ",
                            imgUrl: "https://fiddle.applaunchpad-project.io/img/logos/AppLaunchpad-logo_rgb.svg",
                            imgWidth: "300",
                            imgTopMargin: true
                        }
                    }]
                }]
            },
            routing: {
                useHashRouting: true
            },
            settings: {
                responsiveNavigation: 'semiCollapsible',
                header: {
                    title: 'Hello AppLaunchpad',
                    logo: 'https://fiddle.applaunchpad-project.io/img/applaunchpad.png'
                }
            }
        });
    </script>
</body>

</html>
```

### AppLaunchpad Fiddle

The [AppLaunchpad Fiddle](https://fiddle.applaunchpad-project.io/) website is a sandbox playground where you can test AppLaunchpad. Simply click on **Modify Config** at the bottom right of the page to make changes to the AppLaunchpad application.

### "Hello World" examples

In the **Examples** section of our documentation, you can find links to several "Hello World" example applications which can help you explore AppLaunchpad's functions:
* [Angular](https://github.com/davidwl/applaunchpad/tree/master/core/examples/applaunchpad-example-angular)
* [React](https://github.com/davidwl/applaunchpad/tree/master/core/examples/applaunchpad-example-react)
* [Vue](https://github.com/davidwl/applaunchpad/tree/master/core/examples/applaunchpad-example-vue)
* [OpenUI5](https://github.com/davidwl/applaunchpad/tree/master/core/examples/applaunchpad-example-openui5)
* [Svelte](https://github.com/davidwl/applaunchpad/tree/master/core/examples/applaunchpad-example-svelte)
* [Plain JavaScript](https://github.com/davidwl/applaunchpad/tree/master/core/examples/applaunchpad-example-js)
* [NextJS](https://github.com/davidwl/applaunchpad/tree/master/core/examples/applaunchpad-example-next)

You can install them by following the instructions in the `README` file of each example.

### AppLaunchpad shopping app (tutorial)

Our [tutorial](https://developers.sap.com/group.applaunchpad-app.html) on how to create a React and UI5 web-shopping application is intended for beginners, but it still delves deeper into AppLaunchpad's functions. It covers topics such as:
- how to create a AppLaunchpad app from scratch
- how to use the AppLaunchpad Core and Client APIs
- how to create a micro frontend
- how to add localization to your app and display it in multiple languages

Alternatively, the tutorial app can be installed directly by following the `README` file of [this GitHub repository](https://github.com/SAP-samples/applaunchpad-micro-frontend-application).

### e2e example

This example application was created for testing purposes and it includes all possible AppLaunchpad features in one place. It is useful if you want to explore our framework in more detail or [contribute](https://github.com/davidwl/applaunchpad/blob/master/CONTRIBUTING.md) to the AppLaunchpad project.

You can find the e2e test application and instructions on how to install it [here](https://github.com/davidwl/applaunchpad/tree/master/test/e2e-test-application#applaunchpad-sample-and-e2e-test-application-written-in-angular).

### Advanced scenarios

In the [expert scenarios](advanced-scenarios.md) section of the documentation, you can find implementations of more complex AppLaunchpad use cases, such as using feature toggles or authenticating with Google Cloud Identity.

<!-- accordion:end -->

## How to obtain support

* [GitHub Discussions](https://github.com/davidwl/applaunchpad/discussions) - ask (or answer) questions related to AppLaunchpad, search for previously answered questions, and rate the answers for helpfulness.

* [Slack Channel](https://applaunchpad-project.slack.com) - get AppLaunchpad updates, contact the AppLaunchpad team on Slack, and explore previous discussions.

* [GitHub contribution](https://github.com/davidwl/applaunchpad) - if you have a specific improvement idea or want to contribute to AppLaunchpad, you can create an [issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues) and [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests). Please follow our [contribution guidelines](https://github.com/davidwl/applaunchpad/blob/master/CONTRIBUTING.md) when doing so.