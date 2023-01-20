# AppLaunchpad Testing Utilities

The AppLaunchpad Testing Utilities are a set of auxiliary functions used to enhance the user experience while testing AppLaunchpad-based micro frontends. The functions abstract away AppLaunchpad-specific logic from the tester so that it is easier for them to mock and assert AppLaunchpad functionality. 

## AppLaunchpadMockUtil 
This class contains certain utility helper functions needed when writing [protractor](https://www.npmjs.com/package/protractor) based e2e tests. You can simply import this module into you project and then use an instance of it to test microfrontend functionality. 

### How to use the library

### Prerequisites
_In order to use this utility library you need to import AppLaunchpadMockModule into your Angular applications entry point. See more [here](https://docs.applaunchpad-project.io/docs/framework-support-libraries/?section=applaunchpadcontextservice)_


1. Import the library in the `package.json`:
```javascript
npm install @applaunchpad-project/testing-utilities -s
```

2. Once the library is imported and saved in your Angular project, you can now import the module `AppLaunchpadMockUtil` into your test:
```javascript
import { AppLaunchpadMockUtil } from "@applaunchpad-project/testing-utilities";
```

#### Example

```javascript
import { browser } from 'protractor'; // <-- target e2e testing library
import { AppLaunchpadMockUtil } from "@applaunchpad-project/testing-utilities";

describe('Another test', () => {
  let applaunchpadMockUtil: AppLaunchpadMockUtil;

  beforeAll(async () => {
    applaunchpadMockUtil = new AppLaunchpadMockUtil(browser);
  });

  it('should load the page if correct applaunchpad context provided', async () => {
    await applaunchpadMockUtil.mockContext({
      someData: '1',
      someOtherData: 'randomInfo',
    });
  }
}
```

#### Functions provided
- **mockContext**: Mocks the context by sending AppLaunchpad context messages with the desired mocked context as parameter. 
- **mockPathExists**: This method serves as a mock for the AppLaunchpad Client `pathExists()` function. It is used in e2e tests when component being tested utilizes a call to `AppLaunchpadClient.linkManager().pathExists()`
- **modalOpenedWithTitle**: Checks on the printed DOM AppLaunchpad message responses for a modal with given title being opened. In such a case, a message would be printed containing a `modal.title`. Returns `false` if such element was not found.
- **getMSG**: Return list of messages, representing message elements added in the DOM for testing. 
- **parseAppLaunchpadMockedMessages**: Parses the elements added by AppLaunchpadMockModule into the DOM and assigns them to the local messages variable
