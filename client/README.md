# AppLaunchpad Client

## Overview

This project contains a library that allows your application to use all features of the [AppLaunchpad framework](../core).

## Installation

Install the client in your project using npm:
```bash
npm install @applaunchpad-project/client
```

Import the client in places where you want to use it, depending on the environment of your choice:
```javascript
var AppLaunchpadClient = require('@applaunchpad-project/client');
```
or
```javascript
import AppLaunchpadClient from '@applaunchpad-project/client';
```
or, if you are not using any bundler, AppLaunchpad is also available as a global object:
```javascript
window.AppLaunchpadClient
```
You can see the AppLaunchpad Client in action by running the [Angular example application](/test/e2e-test-application).

## Usage

This section contains additional instructions and guidelines you can use to work with AppLaunchpad Client.


### Generate documentation
Validate and generate documentation using npm:

```bash
npm install
npm run docu
```
