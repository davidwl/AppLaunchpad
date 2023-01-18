
# AppLaunchpad

## Description

AppLaunchpad is a micro frontend JavaScript framework that enables you to create an administrative user interface driven by local and distributed views. AppLaunchpad allows a web application to communicate with the micro frontends which the application contains. To make sure the communication runs smoothly, you can easily configure the settings such as routing, navigation, authorization, and user experience elements.

AppLaunchpad consists of AppLaunchpad Core application and AppLaunchpad Client libraries. They establish secure communication between the core application and the micro frontend using postMessage API.

Read the [Getting started guide](https://docs.nocodeer.io/docs/getting-started) to learn more about micro frontends and the structure of AppLaunchpad.

## Requirements

AppLaunchpad can run on any operating system and there are no specific requirements for installing it.

## Usage

### Examples

View the [application examples](core/examples) to explore AppLaunchpad's features.

Go to the [AppLaunchpad Fiddle](https://fiddle.applaunchpad-project.io) site to see AppLaunchpad in action and configure a sample application.

### Documentation

For details, see [AppLaunchpad documentation](https://docs.AppLaunchpad-project.io).

## Browser support

If you want to support Internet Explorer 11 in your application, install the `@applaunchpad/core-ie11` package and update your AppLaunchpad imports as follows:
### AppLaunchpad Core
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel='stylesheet' href='/applaunchpad-core/applaunchpad-ie11.css'>
    <!-- <link rel='stylesheet' href='/applaunchpad-core/applaunchpad.css'> -->
  </head>
  <body>
    <script type="module" src="/applaunchpad-core/applaunchpad.js"></script>
    <script nomodule src="/applaunchpad-core/applaunchpad-ie11.js"></script>
    <!-- <script src="/applaunchpad-core/applaunchpad.js"></script> -->
  </body>
</html>
```

### AppLaunchpad Client
Install the `@applaunchpad/client-ie11` package and update your AppLaunchpad imports as follows:
```javascript
import {
  linkManager,
  uxManager
} from '@applaunchpad/client-ie11';
```

> **NOTE**: The example applications are not fully compatible with IE11.

## Development

### Development guidelines for micro frontend developers

For security reasons, follow these guidelines when developing a micro frontend:

- Make the micro frontend accessible only through HTTPS.
- Add Content Security Policies (CSPs).
- Make the Access-Control-Allow-Origin HTTP header as restrictive as possible.
- Maintain an allowlist with trusted domains and compare it with the origin of the AppLaunchpad Core application. The origin will be passed when you call the init listener in your micro frontend. Stop further processing if the origin does not match.


> **NOTE**: AppLaunchpad follows these [sandbox rules for iframes](https://github.com/davidwu/applaunchpad/blob/af1deebb392dcec6490f72576e32eb5853a894bc/core/src/utilities/helpers/iframe-helpers.js#L140).


### Code formatting for contributors

All projects in the repository use [Prettier](https://prettier.io) to format source code. Run the `npm install` command in the root folder to install it along with [husky](https://github.com/typicode/husky), the Git hooks manager. Both tools ensure proper codebase formatting before committing it.

### Unit tests

To ensure that existing features still work as expected after your changes, run unit tests using the `npm run test` command in the [core](/core) folder.

### E2E tests

To ensure that existing features still work as expected after your changes, you need to run UI tests from the [Angular example application](https://github.com/davidwu/applaunchpad/tree/master/test/e2e-test-application). Before running the tests, you need to start our two test applications: 

- Start the [Angular example application](https://github.com/davidwu/applaunchpad/tree/master/test/e2e-test-application) by using the `npm start` command in the application folder.
- Start the [js test application](https://github.com/davidwu/applaunchpad/tree/master/test/e2e-js-test-application) by using the `npm run dev` command in the application folder.

Once the applications are ready:

- Run `npm run e2e:open` in the test/e2e-test-application folder to start tests in the interactive mode.
- Run `npm run e2e:run` in the test/e2e-test-application folder to start tests in the headless browser.

### Backward compatibility tests

Use these tests to ensure that applications written for previous versions of applaunchpad still work after AppLaunchpad gets updated with npm. Before running the tests, bundle AppLaunchpad by running `lerna run bundle` in the main repository folder.

Install [jq](https://stedolan.github.io/jq/) using the `brew install jq` command. It is required for the script to work, however, you can omit it if the command you are using to run your tests is tagged `latest`.

- Run `npm run test:compatibility` in the main repository folder to start regression testing. The system will prompt you to select the previous version.
- Run `npm run test:compatibility -- --tag latest` in the main repository folder to start regression testing with the last version preselected.
- On the CI, run `npm run test:compatibility -- --install --tag latest` in the main repository folder to install dependencies, bundle AppLaunchpad and run the tests with the last version preselected.

## Contributing

Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file in this repository for instructions on how to contribute to AppLaunchpad.

## Licensing

Please see our [LICENSE](LICENSE) for copyright and license information. Detailed information including third-party components and their licensing/copyright information is available via the [REUSE tool](https://api.reuse.software/info/github.com/SAP/AppLaunchpad). 