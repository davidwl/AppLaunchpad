# AppLaunchpad Documentation

If you are new to AppLaunchpad, read the [Getting started guide](getting-started.md) to learn more about its structure and key features.

## AppLaunchpad Core

AppLaunchpad Core enables you to create web applications with an easily configurable and consistent user interface.

[Installation](application-setup.md) shows you the first steps to prepare your application for development.

### Configuration

<!-- add-attribute:class:success -->
> **TIP:** [AppLaunchpad Fiddle](https://fiddle.applaunchpad-project.io) allows you to configure a very simple application and get a feel for the process.

To configure your AppLaunchpad application, simply edit the files in the `applaunchpad-config` folder of your project. AppLaunchpad configuration is divided into several sections, which are outlined in the guides below:

* [Navigation (basic)](navigation-configuration.md) - configure basic top and side navigation, links, and categories.
* [Navigation (advanced)](navigation-advanced.md) - create a dynamic path, reuse micro frontends with the same origin, and configure additional navigation elements. 
* [Full parameter reference](navigation-parameters-reference.md) - find all the parameters which you can use to configure AppLaunchpad navigation in one place.
* [Authorization](authorization-configuration.md) - configure login and security features for your application.
* [Authorization events](authorization-events.md) - define event configuration used to react to AppLaunchpad authorization events.
* [General settings](general-settings.md) - fully customize a micro frontend, define a header, make your application responsive, and more.
* [Lifecycle hooks](lifecycle-hooks.md) - execute custom logic on any of the AppLaunchpad lifecycle steps.

The following guides outline AppLaunchpad Core API features and additional UI options that exist outside the configuration files:

* [Core API](applaunchpad-core-api.md) - API features that help you enrich and use AppLaunchpad Core.
* [AppLaunchpad UI features](applaunchpad-ux-features.md) - customization options for some of the AppLaunchpad UI components.

## AppLaunchpad Client

AppLaunchpad Client enables you to connect micro frontends to an already existing AppLaunchpad Core application.

[Installation](applaunchpad-client-setup.md) shows you how to install the AppLaunchpad Client.

Read the AppLaunchpad Client API documentation to learn more about the functions and parameters you can use to communicate with the core application:

* [Lifecycle](applaunchpad-client-api.md#lifecycle) - manage the lifecycle of listeners, navigation nodes, and event data.
* [Link Manager](applaunchpad-client-api.md#linkmanager) - navigate to a specific route.
* [UX Manager](applaunchpad-client-api.md#uxmanager) - manage appearance options such as the behavior of backdrop or loading indicators.

## Advanced

[Communication](communication.md) describes how to send custom messages between AppLaunchpad Core and Client.

## Examples

Check the AppLaunchpad [application examples](../core/examples) for an in-depth look at AppLaunchpad capabilities.

## Development

Read the [development and code formatting guidelines](https://github.com/davidwl/applaunchpad#development) if you are interested in contributing.
