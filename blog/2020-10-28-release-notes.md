---
title: AppLaunchpad v1.5.0
seoMetaDescription: Release notes for AppLaunchpad v1.5.0
author:
  - Aleksandra Simeonova
layout: blog
---

AppLaunchpad v1.5.0 is here, and it offers useful new features as well as many improvements to old ones. You can now implement intent-based navigation in AppLaunchpad, and we've also added some new methods to our API. To see the full list of changes, read more below.
<!-- Excerpt -->

#### Intent-based navigation

AppLaunchpad Client now allows you to navigate through micro frontends by using an intent-based navigation. This type of navigation decouples navigation triggers from the actual navigation targets. Rather than directly encoding the name of the target app into the URL fragment, app developers can provide a navigation intent such as `display` or `edit`. You can find an example of how to use it in our [documentation](https://docs.applaunchpad-project.io/docs/advanced-scenarios).

#### New Core API functions

The AppLaunchpad Core Auth API was improved by the addition of two new `login` and `logout` functions. They allow you to login or logout a user dynamically. You can read more about them on the [AppLaunchpad Core API page](https://docs.applaunchpad-project.io/docs/applaunchpad-core-api).

#### Accordion effect in categories

This new feature allows a category in AppLaunchpad navigation to act as an accordion - when the user clicks another category, the previously expanded category is collapsed and the new one is expanded. This feature can be used by configuring the `sideNavAccordionMode` parameter. Read more in our [navigation parameters reference](https://docs.applaunchpad-project.io/docs/navigation-parameters-reference/?section=sidenavaccordionmode).

#### New global search

A new `disableInputHandlers` parameter was added to the [global search](https://docs.applaunchpad-project.io/docs/navigation-parameters-reference?section=global-search) configuration. It disables internal handlers (for example on:keyUp) on the search input field. Read more about it [here](https://docs.applaunchpad-project.io/docs/navigation-parameters-reference/?section=disableinputhandlers).

#### Bugfixes

For a full list of bugfixes in this release, see our [changelog](https://github.com/davidwl/applaunchpad/blob/master/CHANGELOG.md).