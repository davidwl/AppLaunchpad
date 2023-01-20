const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { afterEach } from 'mocha';

import { LifecycleHooks } from '../../src/services/lifecycle-hooks';
import { AppLaunchpadConfig, AppLaunchpadUX } from '../../src/core-api';

describe('LifecycleHooks', function() {
  this.retries(2);
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    sinon.stub(AppLaunchpadConfig, 'getConfigBooleanValue');
    sinon.spy(AppLaunchpadUX, 'hideAppLoadingIndicator');
  });
  afterEach(() => {
    sinon.restore();
    clock.restore();
  });

  describe('applaunchpadAfterInit', () => {
    it('hideAutomatically set to true', () => {
      // given
      AppLaunchpadConfig.getConfigBooleanValue.returns(true);

      // when
      LifecycleHooks.applaunchpadAfterInit();
      clock.tick(1e3);

      // then
      sinon.assert.called(AppLaunchpadUX.hideAppLoadingIndicator);
    });

    it('hideAutomatically set to false', () => {
      // given
      AppLaunchpadConfig.getConfigBooleanValue.returns(false);

      // when
      LifecycleHooks.applaunchpadAfterInit();
      clock.tick(1e3);

      // then
      sinon.assert.notCalled(AppLaunchpadUX.hideAppLoadingIndicator);
    });
  });
});
