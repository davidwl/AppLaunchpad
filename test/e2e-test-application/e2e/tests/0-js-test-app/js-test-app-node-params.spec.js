import defaultAppLaunchpadConfig from '../../configs/default';
import { cloneDeep } from 'lodash';

describe('JS-TEST-APP 3', () => {
  const localRetries = {
    retries: {
      runMode: 4,
      openMode: 4
    }
  };
  describe('AppLaunchpadClient add and delete node and search params', () => {
    let newConfig;
    beforeEach(() => {
      newConfig = cloneDeep(defaultAppLaunchpadConfig);
      newConfig.routing.useHashRouting = true;
      const node = {
        pathSegment: 'mynode',
        label: 'MyNode',
        viewUrl: '/examples/microfrontends/applaunchpad-client-test.html',
        clientPermissions: {
          urlParameters: {
            applaunchpad: {
              read: true,
              write: true
            },
            q: {
              read: true,
              write: true
            }
          }
        }
      };
      newConfig.navigation.nodes[0].children.push(node);
    });

    it('Add and delete search params hash routing enabled', () => {
      cy.visitTestApp('/home/mynode', newConfig);
      cy.getIframeBody().then($body => {
        cy.wrap($body)
          .find('[data-testid="lui-add-search-params"]')
          .invoke('show');
        cy.wrap($body)
          .contains('add search params')
          .click();
      });
      cy.expectPathToBe('/home/mynode?applaunchpad=rocks&q=test');
      cy.getIframeBody().then($body => {
        cy.wrap($body)
          .find('[data-testid="lui-delete-search-params"]')
          .invoke('show');
        cy.wrap($body)
          .contains('delete search params')
          .click();
      });
      cy.expectPathToBe('/home/mynode?applaunchpad=rocks');
    });
    it('Add and delete node params hash routing enabled', () => {
      cy.visitTestApp('/home/mynode', newConfig);
      cy.getIframeBody().then($body => {
        cy.wrap($body)
          .find('[data-testid="lui-add-node-params"]')
          .invoke('show');
        cy.wrap($body)
          .contains('add node params')
          .click();
      });
      cy.expectPathToBe('/home/mynode?%7Eq=test&%7Eapplaunchpad=rocks');
      cy.getIframeBody().then($body => {
        cy.wrap($body)
          .find('[data-testid="lui-delete-node-params"]')
          .invoke('show');
        cy.wrap($body)
          .contains('delete node params')
          .click();
      });
      cy.expectPathToBe('/home/mynode?%7Eapplaunchpad=rocks');
    });
  });

  describe('AppLaunchpadClient add and delete node and search paramstest', () => {
    let newConfig;
    beforeEach(() => {
      newConfig = cloneDeep(defaultAppLaunchpadConfig);
      newConfig.routing.useHashRouting = false;
      const node = {
        pathSegment: 'mynode',
        label: 'MyNode',
        viewUrl: '/examples/microfrontends/applaunchpad-client-test.html',
        loadingIndicator: {
          enabled: false
        },
        clientPermissions: {
          urlParameters: {
            applaunchpad: {
              read: true,
              write: true
            },
            q: {
              read: true,
              write: true
            }
          }
        }
      };

      newConfig.navigation.nodes[0].children.push(node);
    });

    it('Add and delete search params path routing enabled', localRetries, () => {
      cy.vistTestAppPathRouting('');
      cy.window().then(win => {
        win.AppLaunchpad.setConfig(newConfig);
      });
      cy.get('.fd-side-nav__main-navigation')
        .contains('MyNode')
        .click();

      cy.getIframeBodyWithRetries()
        .find('[data-testid="lui-add-search-params"]')
        .invoke('show');

      cy.getIframeBodyWithRetries()
        .contains('add search params')
        .click();

      cy.location().should(location => {
        expect(location.pathname + location.search).to.eq('/home/mynode?applaunchpad=rocks&q=test');
      });

      cy.getIframeBodyWithRetries()
        .find('[data-testid="lui-delete-search-params"]')
        .invoke('show');

      cy.getIframeBodyWithRetries()
        .contains('delete search params')
        .click();

      cy.location().should(location => {
        expect(location.pathname + location.search).to.eq('/home/mynode?applaunchpad=rocks');
      });
    });
  });

  describe('Custom text in the footer', () => {
    it('checks if the text in footer exist, defined by settings', () => {
      cy.window().then(win => {
        //define Footer text as part of the global config
        const config = win.AppLaunchpad.getConfig();
        config.settings.sideNavFooterText = 'AppLaunchpad Footer';
        win.AppLaunchpad.configChanged();

        cy.get('[data-testid="lui-side-nav__footer--text"]').should('exist');
        cy.get('[data-testid="lui-side-nav__footer--text"]').contains('AppLaunchpad Footer');
      });
    });

    it('checks if getNavFooterContainer() working', () => {
      cy.window().then(win => {
        //define Footer text as part of the global config
        const config = win.AppLaunchpad.getConfig();
        config.settings.sideNavFooterText = 'AppLaunchpad Footer';
        win.AppLaunchpad.configChanged();

        //Checks if the DOM element required by getNavFooterContainer() exist
        cy.get('[data-testid="lui-side-nav__footer"]').should('exist');

        const FooterContainer = win.AppLaunchpad.elements().getNavFooterContainer();

        //Checks if AppLaunchpad.elements().getNavFooterContainer() reads the appropriate DOM element.
        cy.get(FooterContainer).contains('AppLaunchpad Footer');
      });
    });
  });
});
