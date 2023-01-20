let uxManager, linkManager;

describe('AppLaunchpad Mock Engine', () => {
  before(() => {
    cy.visit('http://localhost:8181/');
  });
  /**
   * Testing AppLaunchpad Client UX Manager features
   */
  describe('Test AppLaunchpad Client UX Manager functionality', () => {
    it('Check AppLaunchpadClient.uxManager().alert', () => {
      cy.get('[id^=uxbutton1]').click();

      cy.get('[id^="applaunchpad-debug-vis-cnt"]')
        .children()
        .contains('"msg":"applaunchpad.ux.alert.show"');
    });

    it('Check AppLaunchpadClient.uxManager().confirmModal', () => {
      cy.get('[id^=uxbutton2]').click();

      //TODO: Check on applaunchpad client side why an error message is returned
      cy.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
      });

      cy.get('[id^="applaunchpad-debug-vis-cnt"]')
        .children()
        .contains('"msg":"applaunchpad.ux.confirmationModal.show"');
    });

    it('Check AppLaunchpadClient.uxManager().loadIndicator', () => {
      cy.get('[id^=uxbutton3]').click();

      cy.get('[id^="applaunchpad-debug-vis-cnt"]')
        .children()
        .contains('"msg":"applaunchpad.show-loading-indicator"');
    });

    it('Check AppLaunchpadClient.uxManager().setCurrentLocale', () => {
      cy.get('[id^=uxbutton4]').click();

      cy.get('[id^="applaunchpad-debug-vis-cnt"]')
        .children()
        .contains('"msg":"applaunchpad.current-locale-changed"');
    });
  });

  /**
   * Testing AppLaunchpad Client Link Manager features
   */
  describe('Test AppLaunchpad Client Link Manager functionality', () => {
    it('Check AppLaunchpadClient.linkManager().openAsModal', () => {
      cy.get('[id^=button1]').click();

      cy.get('[id^="applaunchpad-debug-vis-cnt"]')
        .children()
        .contains('"msg":"applaunchpad.navigate.ok"');
    });

    it('Check AppLaunchpadClient.linkManager().split', () => {
      cy.get('[id^=button2]').click();

      cy.get('[id^="applaunchpad-debug-vis-cnt"]').contains('"msg":"applaunchpad.navigate.ok"');
    });

    it('Check AppLaunchpadClient.linkManager().drawer', () => {
      cy.get('[id^=button3]').click();

      cy.get('[id^="applaunchpad-debug-vis-cnt"]').contains('"msg":"applaunchpad.navigate.ok"');
    });

    it('Check AppLaunchpadClient.linkManager().pathExists', () => {
      cy.get('[id^=button4]').click();

      cy.get('[id^="applaunchpad-debug-vis-cnt"]').contains('"msg":"applaunchpad.navigation.pathExists.answer"');
    });
  });
});
