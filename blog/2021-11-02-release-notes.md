---
title: AppLaunchpad v1.18.0
seoMetaDescription: Release notes for AppLaunchpad v1.18.0
author:
  - Aleksandra Simeonova
layout: blog
---

You can read about the new features in AppLaunchpad v1.18.0 in the release notes below.

<!-- Excerpt -->

#### customAlertHandler function

The new **customAlertHandler** function allows you to disable the default AppLaunchpad alerts and configure your own. It receives `settings` and `openFromClient` as parameters. For example:

```javascript
AppLaunchpad.setConfig({
  ...,
  settings: {
    customAlertHandler: ()=>{
     return new Promise((resolve, reject) => {
       //custom alert implementation
     });
    }
  }
})
```

You can find more information [here](https://github.com/davidwl/applaunchpad/pull/2304) or in the [general settings](https://docs.applaunchpad-project.io/docs/general-settings) documentation.


#### TooltipText parameter

We implemented a new `TooltipText` parameter which allows you to set a custom tooltip which will be shown when you hover over the nodes in the navigation. The parameter needs to be added to the `navigation:` section of the AppLaunchpad configuration file. Additionally, there is a `defaults.tooltipText` [parameter](https://docs.applaunchpad-project.io/docs/navigation-parameters-reference/?section=defaultstooltiptext) which allows you to set (or disable) the tooltip for all nodes. For more information, read the [documentation](https://docs.applaunchpad-project.io/docs/navigation-parameters-reference/?section=tooltiptext).


#### updateModalSettings method

The new AppLaunchpad Client method `updateModalSettings` allows you to change the size and title of a modal. This means that if the open micro frontend changes route internally, it can be reflected in the modal header. You can find more information in the [AppLaunchpad Client API](https://docs.applaunchpad-project.io/docs/applaunchpad-client-api/?section=updatemodalsettings).

#### Core API templating for compound children and external link nodes

We enabled Core API templating for compound children and external link nodes, meaning it's possible to use `{i18n.currentLocale}` with a viewUrl. You can find more information [here](https://github.com/davidwl/applaunchpad/pull/2288).

#### Bugfixes

For a full list of bugfixes in this release, see our [changelog](https://github.com/davidwl/applaunchpad/blob/master/CHANGELOG.md).

