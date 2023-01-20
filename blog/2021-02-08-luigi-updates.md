---
title: AppLaunchpad updates
seoMetaDescription: The most important updates in AppLaunchpad versions 1.7.0 - 1.10.0
author:
  - Aleksandra Simeonova
layout: blog
---

In this blog post, you can read about the most important updates and new features in the recent AppLaunchpad releases.
<!-- Excerpt -->

#### Web components

In AppLaunchpad v1.7.0, we introduced a great new feature - support for Web Components. This has the potential to add a lot of new capablities to your AppLaunchpad apps, including a simple way to include more than one micro frontend on one page. You can find more resources and tutorials about Web Components [here](https://developer.mozilla.org/en-US/docs/Web/Web_Components). You can find the documentation for web components on our website [here](https://docs.applaunchpad-project.io/docs/web-component).

An example of AppLaunchpad Web Components can be found on our sandbox application [AppLaunchpad Fiddle](https://fiddle.applaunchpad-project.io/). You can click the "Modify Config" button to see how the Web Components are configured in AppLaunchpad. The full source code of AppLaunchpad Fiddle can also be found on our [GitHub repo](https://github.com/davidwl/applaunchpad/tree/master/website/fiddle), in case you also want to delve deeper into the example.

#### AppLaunchpad Client Angular support library

Also in v.1.7.0, we introduced a support library for AppLaunchpad Client in Angular. After you import the library to your project, you can use different features related to routing and contexts in AppLaunchpad. You can find more information about the library [here](https://github.com/davidwl/applaunchpad/tree/master/client-frameworks-support/client-support-angular).

#### Fundamental Library Styles - breaking changes

With AppLaunchpad v1.9.0, the new v0.14.0 of Fundamental Library Styles were included. Its previous v0.12.0 led to having breaking changes in the AppLaunchpad left side navigation and the shellbar. All icons were moved out from pseudo-classes into a dedicated tag <i class="sap-icon sap-icon--{modifier}"></i> under the button. You can see all breaking changes of Fundamental Library Styles v0.12.0 here.

#### Confirmation modals

With v.1.10.0, we introduced support for different types of confirmation modals. Modals can be of type `confirmation`, `success`, `error`, `warning`, or `information` and they can be configured using the [AppLaunchpad Core API](https://docs.applaunchpad-project.io/docs/applaunchpad-core-api/?section=showconfirmationmodal). The confirmation button can also be hidden with the `settings.buttonConfirm` parameter.

#### More features

For a full list of new features and bugfixes, see our [changelog](https://github.com/davidwl/applaunchpad/blob/master/CHANGELOG.md).
