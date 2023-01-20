---
title: AppLaunchpad v1.4.0
seoMetaDescription: Release notes for AppLaunchpad v1.4.0
author:
  - Aleksandra Simeonova
layout: blog
---

AppLaunchpad v1.4.0 includes new features such as support for theming and feature toggles. You can find more information in the release notes below.
<!-- Excerpt -->

#### Theming API

AppLaunchpad now supports theming, which can help you provide a better user experience. For example, you can enable a light and dark theme for your app. For more details on how to use theming, go to the AppLaunchpad Core API [theming section](https://docs.applaunchpad-project.io/docs/applaunchpad-core-api/?section=theming).

#### Feature toggles

As of v1.4.0, AppLaunchpad also offers support for feature toggles. [Feature toggles](https://martinfowler.com/articles/feature-toggles.html) are a technique that can make development teams more efficient. AppLaunchpad allows you to add feature toggles through the Core API or through URL parameters. The full documentation can be found [here](https://docs.applaunchpad-project.io/docs/advanced-scenarios).

#### AppLaunchpad example with NextJS

Have you ever wondered if you can use AppLaunchpad with NextJS? The answer is "yes", and in this release we included a new example AppLaunchpad application that is running on top of NextJS. You can install the example and try it yourself by following the steps [here](https://github.com/davidwl/applaunchpad/tree/master/core/examples/applaunchpad-example-next).

#### Fundamental Styles update

With AppLaunchpad v1.4.0, the new v0.11.0 of Fundamental Library Styles were included. As a result, there were breaking changes to the AppLaunchpad Alerts. The classes `fd-overlay fd-overlay--message-strip` were removed from Fundamental Library Styles and we added a new class `applaunchpad-alert--overlay` to keep the same look and feel as in the past. You can see all breaking changes of Fundamental Library Styles [here](https://github.com/SAP/fundamental-styles/wiki/Breaking-Changes#0110).

#### Core and Client API additions

Two new functions were added to the AppLaunchpad Core API, [setDocumentTitle](https://docs.applaunchpad-project.io/docs/applaunchpad-core-api/?section=setdocumenttitle) and [getDocumentTitle](https://docs.applaunchpad-project.io/docs/applaunchpad-core-api/?section=getdocumenttitle). They allow you to set and get a document title without configuring the AppLaunchpad header.

The AppLaunchpad Client API also includes a new function, [closeCurrentModal](https://docs.applaunchpad-project.io/docs/applaunchpad-client-api/?section=closecurrentmodal), which fires a `applaunchpad.close-modal` event.

#### Bugfixes

For a full list of bugfixes in this release, see our [changelog](https://github.com/davidwl/applaunchpad/blob/master/CHANGELOG.md).