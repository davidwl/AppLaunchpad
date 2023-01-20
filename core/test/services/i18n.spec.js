import { GenericHelpers } from '../../src/utilities/helpers';
import { config } from '../../src/core-api/config';

const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');

import { AppLaunchpadI18N } from '../../src/core-api';
import { AppLaunchpadConfig } from '../../src/core-api';

describe('I18N', function() {
  this.retries(2);

  beforeEach(() => {
    global['sessionStorage'] = {
      getItem: sinon.stub(),
      setItem: sinon.stub()
    };
    sinon.stub(config, 'configChanged');
  });
  afterEach(() => {
    sinon.restore();
  });

  describe('current locale', () => {
    it('should return default locale', () => {
      const locale = AppLaunchpadI18N.getCurrentLocale();
      assert.equal(locale, 'en');
    });

    it('should return previously set locale', () => {
      global.sessionStorage.getItem.returns('mock-locale');
      const locale = AppLaunchpadI18N.getCurrentLocale();
      assert.equal(locale, 'mock-locale');
    });

    it('sets locale', () => {
      sinon.stub(AppLaunchpadI18N, '_notifyLocaleChange');
      AppLaunchpadI18N.setCurrentLocale('de');
      sinon.assert.calledWithExactly(global.sessionStorage.setItem, 'applaunchpad.currentLocale', 'de');
      sinon.assert.calledWithExactly(AppLaunchpadI18N._notifyLocaleChange, 'de');
    });

    it('should not set empty locale', () => {
      sinon.stub(AppLaunchpadI18N, '_notifyLocaleChange');
      AppLaunchpadI18N.setCurrentLocale('');
      sinon.assert.notCalled(global.sessionStorage.setItem);
      sinon.assert.notCalled(AppLaunchpadI18N._notifyLocaleChange);
    });
  });

  describe('current locale listeners', () => {
    it('does not add listener when it is not a function', () => {
      sinon.stub(GenericHelpers, 'isFunction').returns(false);
      const listenerId = AppLaunchpadI18N.addCurrentLocaleChangeListener('mock-listener');
      sinon.assert.calledWithExactly(GenericHelpers.isFunction, 'mock-listener');
      assert.equal(Object.getOwnPropertyNames(AppLaunchpadI18N.listeners).length, 0);
      assert.equal(listenerId, undefined);
    });

    it('add listener when it is a function', () => {
      sinon.stub(GenericHelpers, 'isFunction').returns(true);
      sinon.stub(GenericHelpers, 'getRandomId').returns(123);
      const mockListener = () => 'mock-method';
      const listenerId = AppLaunchpadI18N.addCurrentLocaleChangeListener(mockListener);
      sinon.assert.calledWithExactly(GenericHelpers.isFunction, mockListener);
      sinon.assert.calledWithExactly(GenericHelpers.getRandomId);
      assert.equal(AppLaunchpadI18N.listeners[123], mockListener);
      assert.equal(listenerId, 123);
    });

    it('remove a listener', () => {
      AppLaunchpadI18N.listeners[123] = () => {};
      AppLaunchpadI18N.removeCurrentLocaleChangeListener(123);
      assert.equal(AppLaunchpadI18N.listeners[123], undefined);
    });

    it('does not remove a listener when called with a wrong id', () => {
      const listener = () => {};
      AppLaunchpadI18N.listeners[123] = listener;
      AppLaunchpadI18N.removeCurrentLocaleChangeListener(456);
      assert.equal(AppLaunchpadI18N.listeners[123], listener);
    });

    it('should be notified by locale change', () => {
      AppLaunchpadI18N.listeners = {
        id1: sinon.stub(),
        id2: sinon.stub(),
        id3: sinon.stub()
      };
      AppLaunchpadI18N._notifyLocaleChange('pl');
      sinon.assert.calledWithExactly(AppLaunchpadI18N.listeners.id1, 'pl');
      sinon.assert.calledWithExactly(AppLaunchpadI18N.listeners.id2, 'pl');
      sinon.assert.calledWithExactly(AppLaunchpadI18N.listeners.id3, 'pl');
      sinon.assert.called(config.configChanged);
    });
  });

  describe('custom translation', () => {
    let mockConfig;
    //custom config
    let applaunchpad = {
      en: {
        tets: 'tests'
      },
      de: {
        project: 'applaunchpad'
      },
      applaunchpad: {
        it: {
          da: 'Toni'
        }
      }
    };
    const getMockConfig = () => ({
      getTranslation: (key, interpolations, locale) => {
        if (applaunchpad[locale]) {
          return applaunchpad[locale][key];
        }
      }
    });
    beforeEach(() => {
      mockConfig = getMockConfig();
    });

    it('_initCustomImplementation: get custom translation from config', () => {
      sinon.stub(AppLaunchpadConfig, 'getConfigValue').returns(mockConfig);
      AppLaunchpadI18N._initCustomImplementation();
      assert.equal(AppLaunchpadI18N.translationImpl, mockConfig);
    });

    it('findTranslation test', () => {
      sinon.stub(Object, 'hasOwnProperty').returns(true);
      const translationTable = {
        applaunchpad: {
          applaunchpadModal: {
            header: 'AppLaunchpad status modal',
            body: {
              error: 'AppLaunchpad is sad!',
              success: 'AppLaunchpad is happy!'
            }
          },
          button: {
            dismiss: 'no',
            confirm: 'yes'
          }
        }
      };
      AppLaunchpadI18N.translationTable = translationTable;
      assert.equal(
        AppLaunchpadI18N.findTranslation(
          'applaunchpad.applaunchpadModal.body.success',
          AppLaunchpadI18N.translationTable
        ),
        'AppLaunchpad is happy!'
      );
      assert.equal(
        AppLaunchpadI18N.findTranslation('applaunchpad.button.confirm', AppLaunchpadI18N.translationTable),
        'yes'
      );
    });

    it('custom translation test', () => {
      AppLaunchpadI18N.translationImpl = mockConfig;
      assert.equal(AppLaunchpadI18N.getTranslation('tets', null, 'en'), 'tests');
      assert.equal(AppLaunchpadI18N.getTranslation('project', null, 'de'), 'applaunchpad');

      AppLaunchpadI18N.translationImpl = null;
      AppLaunchpadI18N.translationTable = applaunchpad;
      assert.equal(AppLaunchpadI18N.getTranslation('tets'), 'tets');
      assert.equal(AppLaunchpadI18N.getTranslation('applaunchpad.it.da'), 'Toni');
      // //not matching key
      assert.equal(AppLaunchpadI18N.getTranslation('applaunchpad.de.project'), 'applaunchpad.de.project');
    });
  });
});
