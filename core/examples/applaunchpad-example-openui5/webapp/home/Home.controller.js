sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/UIComponent',
    'applaunchpad/demo/libs/applaunchpad-client/applaunchpad-client'
  ],
  function(Controller, UIComponent) {
    'use strict';

    return Controller.extend('applaunchpad.demo.home.Home', {
      getRouter: function() {
        return UIComponent.getRouterFor(this);
      },

      onInit: function() {
        AppLaunchpadClient.addInitListener(initialContext => {
          this.getView()
            .byId('applaunchpad-initialized')
            .setText('AppLaunchpad Client Initialized!');
          console.log('AppLaunchpad Client Initialized!');
        });

        AppLaunchpadClient.addContextUpdateListener(updatedContext => {
          console.log('AppLaunchpad Client Updated!');
        });
      }
    });
  }
);
