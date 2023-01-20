const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const expect = chai.expect;
const spy = sinon.spy;

import { AppLaunchpadConfig } from '../../src/core-api';
import { AsyncHelpers, GenericHelpers } from './../../src/utilities/helpers';

describe('Config', () => {
  describe('getConfigBooleanValue', () => {
    it('should return correct boolean value', async () => {
      //given
      AppLaunchpadConfig.config = {
        truthyAttribute: 'true',
        truthAttribute: true,
        falseAttribute: false
      };

      // then
      assert.equal(AppLaunchpadConfig.getConfigBooleanValue('truthyAttribute'), true);
      assert.equal(AppLaunchpadConfig.getConfigBooleanValue('truthAttribute'), true);
      assert.equal(AppLaunchpadConfig.getConfigBooleanValue('falseAttribute'), false);
    });

    it('should fallback to false in case if invalid value', async () => {
      // given
      AppLaunchpadConfig.config = {
        foo: 'bar'
      };

      // then
      assert.equal(AppLaunchpadConfig.getConfigBooleanValue('foo'), false);
    });

    it('should fallback to false in case if undefined value', async () => {
      // given
      AppLaunchpadConfig.config = {};

      // then
      assert.equal(AppLaunchpadConfig.getConfigBooleanValue('whatever'), false);
      assert.equal(AppLaunchpadConfig.getConfigBooleanValue('whateverparent.whateverchild'), false);
    });
  });

  describe('executeConfigFnAsync', () => {
    it('returns correct value', async () => {
      //given
      AppLaunchpadConfig.config = {
        truthyFn: (param1, param2) => 'value' + param1 + param2,
        truthyFnAsync: (param1, param2) => Promise.resolve('value' + param1 + param2)
      };

      const resultTruthyFn = await AppLaunchpadConfig.executeConfigFnAsync('truthyFn', false, 'foo', 'bar');
      assert.equal(resultTruthyFn, 'valuefoobar');

      const resultTruthyFnAsync = await AppLaunchpadConfig.executeConfigFnAsync('truthyFnAsync', false, 'foo', 'bar');
      assert.equal(resultTruthyFnAsync, 'valuefoobar');
    });

    it('returns undefined on non-existing fn', async () => {
      //given
      AppLaunchpadConfig.config = {};

      const resultUndefined = await AppLaunchpadConfig.executeConfigFnAsync('not.existing.value');
      assert.isUndefined(resultUndefined, 'async fn result is not undefined');
    });

    it('returns undefined on error/rejected promise', async () => {
      //given
      AppLaunchpadConfig.config = {
        rejectFnAsync: (param1, param2) => Promise.reject(new Error('rejected')),
        errFnAsync: (param1, param2) => {
          throw new Error({
            name: 'someError',
            message: 'something went wrong'
          });
        }
      };

      const resultRejectFnAsync = await AppLaunchpadConfig.executeConfigFnAsync('rejectFnAsync');
      assert.isUndefined(resultRejectFnAsync, 'rejection did not return');

      const resultErrFnAsync = await AppLaunchpadConfig.executeConfigFnAsync('errFnAsync');
      assert.isUndefined(resultErrFnAsync, 'error did not return');
    });

    it('throws an error if throwError flag is set', async () => {
      sinon.stub(AsyncHelpers, 'applyFunctionPromisified').returns(Promise.reject(new Error('rejected')));
      //given
      AppLaunchpadConfig.config = {
        rejectFnAsync: (param1, param2) => {}
      };

      // second parameter throws an error and we want it to throw an error on failure
      // catching it here to be able to evaluate the error message
      let res;
      try {
        res = await AppLaunchpadConfig.executeConfigFnAsync('rejectFnAsync', true);
      } catch (error) {
        res = error;
      }
      assert.equal(res.message, 'rejected', 'return error does not equal');
    });
  });

  describe('User settings', () => {
    before(() => {
      global['localStorage'] = {
        getItem: sinon.stub(),
        setItem: sinon.stub()
      };
    });
    afterEach(() => {
      sinon.restore();
      sinon.reset();
    });
    const key = 'myStorageKey';
    const userSettingsObj = {
      userSettings: {
        userSettingGroups: {}
      }
    };
    const myConfig = {
      storeUserSettings: () => {
        console.log('write');
      },
      readUserSettings: () => {
        console.log('read');
      }
    };

    it('write user settings to local storage', async () => {
      sinon.stub(AppLaunchpadConfig, 'configChanged');
      await AppLaunchpadConfig.storeUserSettings(userSettingsObj, userSettingsObj);
      sinon.assert.called(global.localStorage.setItem);
    });
    it('write user settings to custom storage', async () => {
      sinon.stub(AppLaunchpadConfig, 'configChanged');
      console.log = sinon.spy();
      sinon.stub(AppLaunchpadConfig, 'getConfigValueAsync').returns(myConfig);
      sinon.stub(GenericHelpers, 'isFunction').returns(true);
      await AppLaunchpadConfig.storeUserSettings(userSettingsObj, userSettingsObj);
      sinon.assert.calledOnce(console.log);
    });
    it('read user settings from local storage', async () => {
      sinon.stub(JSON, 'parse').returns(JSON.stringify(userSettingsObj));
      await AppLaunchpadConfig.readUserSettings();
      sinon.assert.called(global.localStorage.getItem);
    });
    it('read user settings from custom storage', async () => {
      console.log = sinon.spy();
      sinon.stub(AppLaunchpadConfig, 'getConfigValueAsync').returns(myConfig);
      sinon.stub(GenericHelpers, 'isFunction').returns(true);
      await AppLaunchpadConfig.readUserSettings();
      sinon.assert.calledOnce(console.log);
    });
  });

  describe('clearNavigationCache', () => {
    it('should clean navigation titleResolver cache', () => {
      AppLaunchpadConfig.config = {
        navigation: {
          nodes: {
            titleResolver: {
              url: 'http://localhost',
              _cache: {
                key: 'cacheKey',
                value: 'cacheValue'
              }
            }
          }
        }
      };
      AppLaunchpadConfig.clearNavigationCache();

      const actual = AppLaunchpadConfig.getConfigValue('navigation.titleResolver._cache');
      const expected = undefined;
      assert.equal(actual, expected);
    });
  });
});
