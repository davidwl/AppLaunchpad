class Communication {
  customMessagesListeners = {
    'my-custom-message.update-top-nav': () => {
      AppLaunchpad.navigation().updateTopNavigation();
    },
    'my-custom-message.test-example': (customMessage, mfObject, mfNodeObj) => {
      console.info(
        `Core has received custom message: ${JSON.stringify(customMessage)} from microfrontend ${JSON.stringify(
          mfObject
        )}. Node information: ${JSON.stringify(mfNodeObj)}`
      );

      AppLaunchpad.showAlert({
        text: `Custom message received: ${JSON.stringify(customMessage)}`,
        type: 'success',
        closeAfter: 3000
      });

      setTimeout(() => {
        const newCustomMessage = {
          id: 'applaunchpad.my-custom-message-for-client',
          description: 'here goes the message description'
        };
        AppLaunchpad.customMessages().send(mfObject.id, newCustomMessage);
      }, 2000);
    },
    'my-micro-frontend-is-ready': () => {
      AppLaunchpad.ux().hideAppLoadingIndicator();
    },
    'my-custom-message.update-user-settings': (customMessage, mfObject, mfNodeObj) => {
      AppLaunchpad.storeUserSettings({ custom2: { theme: customMessage.theme } });
    }
  };
}

export const communication = new Communication();
