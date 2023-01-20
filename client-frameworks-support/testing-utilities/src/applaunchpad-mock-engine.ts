/*
 * This class mocks AppLaunchpad Core related functionality.
 *
 * Micro Frontends that use AppLaunchpad Client would usually communicate with AppLaunchpad Core
 * back and forth. When testing AppLaunchpad Client based components, AppLaunchpad Core might
 * not be present which leads into limitations on integration/e2e testing for standalone
 * microfrontends.
 *
 * This module adds a hook to the window postMessage API by adding an event listener to the
 * global message event of the window object and mocking the callback.
 * In the normal workflow this message would picked up by AppLaunchpad Core which then sends the response back.
 */

export class AppLaunchpadMockEngine {
  // Add a hook to the post message api to mock the AppLaunchpadCore response to the Client
  public static initPostMessageHook() {
    return async (): Promise<void> => {
      // Check if AppLaunchpad Client is running standalone
      if (window.parent === window) {
        console.debug('Detected standalone mode');

        // Check and skip if AppLaunchpad environment is already mocked
        if ((window as any).applaunchpadMockEnvironment) {
          return;
        }

        // mock target origin
        if ((window as any).AppLaunchpadClient) {
          (window as any).AppLaunchpadClient.setTargetOrigin('*');
        }

        (window as any).applaunchpadMockEnvironment = {
          msgListener: function(e: any) {
            if (e.data.msg && (e.data.msg.startsWith('applaunchpad.') || e.data.msg === 'storage')) {
              console.debug('AppLaunchpad msg', e.data);

              if (e.data.msg === 'applaunchpad.get-context') {
                window.postMessage(
                  {
                    msg: 'applaunchpad.init',
                    emulated: true,
                    internal: {
                      viewStackSize: 1
                    },
                    context: e.data.context
                  },
                  '*'
                );
              }

              // vizualise retrieved event data
              AppLaunchpadMockEngine.visualize(JSON.stringify(e.data));

              // Check and run mocked callback if it exists
              const mockListener = (window as any).applaunchpadMockEnvironment.mockListeners[e.data.msg];
              if (mockListener) {
                mockListener(e);
              }
            }
          },
          mockListeners: {
            'applaunchpad.navigation.pathExists': (event: any) => {
              const mockData = window.sessionStorage.getItem('applaunchpadMockData');
              let mockDataParsed = mockData ? JSON.parse(mockData) : undefined;
              const inputPath = event.data.data.link;
              const pathExists = mockDataParsed && mockDataParsed.pathExists && mockDataParsed.pathExists[inputPath];

              const response = {
                msg: 'applaunchpad.navigation.pathExists.answer',
                data: {
                  correlationId: event.data.data.id,
                  pathExists: pathExists ? pathExists : false
                },
                emulated: true
              };
              window.postMessage(response, '*');
            },
            //ux
            'applaunchpad.ux.confirmationModal.show': (event: any) => {
              const response = {
                msg: 'applaunchpad.ux.confirmationModal.hide',
                data: event.data,
                emulated: true
              };
              window.postMessage(response, '*');
            },
            'applaunchpad.ux.alert.show': (event: any) => {
              const response = {
                msg: 'applaunchpad.ux.alert.hide',
                data: event.data,
                emulated: true
              };
              window.postMessage(response, '*');
            },
            'applaunchpad.ux.set-current-locale': (event: any) => {
              const response = {
                msg: 'applaunchpad.current-locale-changed',
                currentLocale: event.data.data.currentLocale,
                emulated: true
              };
              window.postMessage(response, '*');
            },
            // linkManager
            'applaunchpad.navigation.open': (event: any) => {
              const response = {
                msg: 'applaunchpad.navigate.ok',
                data: event.data,
                emulated: true
              };
              window.postMessage(response, '*');
            },
            'applaunchpad.navigation.splitview.close': (event: any) => {
              const response = {
                msg: 'applaunchpad.navigate.ok',
                data: event.data,
                emulated: true
              };
              window.postMessage(response, '*');
            },
            'applaunchpad.navigation.splitview.collapse': (event: any) => {
              const response = {
                msg: 'applaunchpad.navigate.ok',
                data: event.data,
                emulated: true
              };
              window.postMessage(response, '*');
            },
            'applaunchpad.navigation.splitview.expand': (event: any) => {
              const response = {
                msg: 'applaunchpad.navigate.ok',
                data: event.data,
                emulated: true
              };
              window.postMessage(response, '*');
            },
            // storage
            storage: () => {}
          }
        };

        // Listen to the global 'message' event of the window object
        window.addEventListener('message', (window as any).applaunchpadMockEnvironment.msgListener);
      }
    };
  }

  /*
   * This method takes a data object of type 'any' and vizualizes a simple container
   * which holds data that is useful for e2e testing.
   */
  public static visualize(data: string): void {
    let applaunchpadVisualizationContainer: Element | null = document.querySelector('#applaunchpad-debug-vis-cnt');
    // Construct element structure if not already constructed
    if (!applaunchpadVisualizationContainer) {
      applaunchpadVisualizationContainer = document.createElement('div');
      applaunchpadVisualizationContainer.setAttribute('id', 'applaunchpad-debug-vis-cnt');
      // Hide the added DOM element to avoid interferring/overlapping with other elements during testing.
      applaunchpadVisualizationContainer.setAttribute('style', 'display:none');
      document.body.appendChild(applaunchpadVisualizationContainer);
    }
    const line: HTMLDivElement = document.createElement('div');
    line.textContent = data;
    applaunchpadVisualizationContainer.appendChild(line);
  }
}
