---
title: AppLaunchpad v1.23.0
seoMetaDescription: Release notes for AppLaunchpad v1.23.0
author:
  - Aleksandra Simeonova
layout: blog
---

You can read about the new features in AppLaunchpad v1.23.0 in the release notes below.

<!-- Excerpt -->
#### Disable keyboard accessibility for user settings dialog

When the user settings dialog is opened, it is no longer possible to navigate to other UI elements outside it using the keyboard. For more information see the [pull request](https://github.com/davidwl/applaunchpad/pull/2752).

#### getCurrentRoute function

We added a new `getCurrentRoute` function which belongs to the [LinkManager](https://docs.applaunchpad-project.io/docs/applaunchpad-client-api/?section=linkmanager) in AppLaunchpad Client. It can be used to get the AppLaunchpad route associated with the current micro frontend. The function returns a promise which resolves to a string value specifying the current AppLaunchpad route. You can find more information [here](https://github.com/davidwl/applaunchpad/issues/2724).

#### Scalable keyboard accessibility for Language Dropdown

This release brings improvements to the language dropdown within the user settings dialog. For example, it is now possible to navigate through the list of languages using the `up` and `down` arrow keys, while `Enter` selects the item.  You can find more information [here](https://github.com/davidwl/applaunchpad/issues/2565).

#### Updated AppLaunchpad version in Core examples
The [AppLaunchpad Core examples](https://github.com/davidwl/applaunchpad/tree/master/core/examples) were updated to the latest version of AppLaunchpad. The examples are now using Fundamental Styles v0.23.0, which you can learn more about [here](https://applaunchpad-project.io/blog/2022-05-20-release-notes#update-to-fundamental-styles-v0230).

#### Bugfixes

For a full list of bugfixes in this release, see our [changelog](https://github.com/davidwl/applaunchpad/blob/master/CHANGELOG.md).

