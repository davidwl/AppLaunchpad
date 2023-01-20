<!-- meta
{
  "node": {
    "label": "UI features",
    "category": {
      "label": "AppLaunchpad Core",
      "collapsible": true
    },
    "metaData": {
      "categoryPosition": 2,
      "position": 2
    }
  }
}
meta -->


# AppLaunchpad UX features

- [Rendering of AppLaunchpad application in the DOM](#rendering-of-applaunchpad-application-in-the-dom)
- [Responsive application setup](#responsive-application-setup)
- [App loading indicator](#app-loading-indicator)
- [Collapsed left side navigation](#collapsed-left-side-navigation)

## Rendering of AppLaunchpad application in the DOM

By default, AppLaunchpad content, including the top navigation, left navigation, and the content iframe area, are rendered in the `body` tag of your AppLaunchpad Core application. As a result, AppLaunchpad content takes the whole space of your browser window.

However, you can render AppLaunchpad content in any other HTML container. It can be useful if you want to add a header or a footer on top of the AppLaunchpad content. To use this feature, add the `applaunchpad-app-root` custom HTML attribute to the HTML tag in which you want to render the AppLaunchpad content.

<!-- add-attribute:class:warning -->
>**NOTE:** If you render the AppLaunchpad content in a custom container, the container is positioned relatively when you apply your own CSS. Also, set the height of the AppLaunchpad custom container either in **px** or **vh**.

<!-- keywords: render in div, load in custom container, add own header or footer -->

## Responsive application setup

You can quickly adjust the AppLaunchpad application to improve user experience on mobile devices, such as smartphones or tablets. Here are some examples:

* Add the following line to your `index.html` file for the AppLaunchpad application to render well on a mobile device:

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1">
```

* Define and apply [**responsiveNavigation**](general-settings.md#responsivenavigation) settings to make the left navigation responsive.

* Define and apply [**profileType**](general-settings.md#profiletype) **'simple'**  or **'Fiori3'** to change the Profile Menu layout and design.

* Define a custom width for the left side navigation. To do so, simply add the code below to the top of your `index.html`. The default width is 15rem.

```html
:root{
  --applaunchpad__left-sidenav--width: yourCustomWidth;
}
```
* Define a custom width for the App Title on desktop and mobile simultaneously. To do so, simply add the code below to the top of your `index.html`. The default width is `--applaunchpad__app-title--width: 60vw;` and `--applaunchpad__multi-app-dropdown--width: 50vw;`

```html
:root{
  --applaunchpad__app-title--width: yourCustomSingleAppTitleWidth;
  --applaunchpad__multi-app-dropdown--width: yourCustomMultiAppDropdownWidth;
}
```

* Set the [**header.responsiveShellbarPaddings**](general-settings.md#headerresponsiveshellbarpaddings) parameter to `true` to make the Shellbar responsive for different screen sizes. 

* Define a custom height for the top navigation/Shellbar by providing a single CSS variable. To do so, simply add the code below to the top of your `index.html`. The default height is `--applaunchpad__shellbar--height: 2.75rem`:

```html
    :root {
      --applaunchpad__shellbar--height: yourCustomShellbarwidth;
    }
```

## App loading indicator

To show a loading indicator before AppLaunchpad Core or your first micro frontend is ready, add a container with the `applaunchpad-app-loading-indicator` attribute to your `index.html` body or inside your `applaunchpad-app-root` container.

```html
<div applaunchpad-app-loading-indicator>
  <div class="fd-busy-indicator--m" aria-hidden="false" aria-label="Loading">
    <div class="fd-busy-indicator--circle-0"></div>
    <div class="fd-busy-indicator--circle-1"></div>
    <div class="fd-busy-indicator--circle-2"></div>
  </div>
</div>
```

To automatically remove the loading indicator after AppLaunchpad initialization phase you can set [settings.appLoadingIndicator.hideAutomatically](navigation-parameters-reference.md#loadingindicatorhideautomatically) to `true`.

To keep the loading indicator until the first micro frontend is usable, follow these steps:

1. Set the app loading indicator parameter **hideAutomatically** to `false`

```javascript
{
  ...
  settings: {
    appLoadingIndicator: {
      hideAutomatically: false
    }
  }
  ...
}
```
2. To remove the loading indicator, call [AppLaunchpad.ux().hideAppLoadingIndicator()](./applaunchpad-core-api.md#hideAppLoadingIndicator) in AppLaunchpad Core once your initial micro frontend has finished loading. You can, for example, use the [custom messages](./communication.md#custom-messages) feature to allow the AppLaunchpad Client micro frontend to communicate with the Core when this function should be executed.

## Collapsed left side navigation

If you use **responsiveNavigation = 'semiCollapsible'**  or **'Fiori3'** mode in your settings, you can adjust collapsed state of the left side navigation by using the **collapseLeftSideNav** function.

* To close the left side navigation, execute **AppLaunchpad.ux().collapseLeftSideNav(true)** in AppLaunchpad Core once your initial micro frontend has finished loading. It will set the collapsed state to `true` in **Local Storage**. Which closes the left side navgation, by showing only icons.

* Set the value to `false` if you want to open left side navigation.
