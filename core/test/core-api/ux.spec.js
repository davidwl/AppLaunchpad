const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const sinon = require('sinon');
import { afterEach } from 'mocha';

import { AppLaunchpadUX } from '../../src/core-api';

describe('Core API - UX', function() {
  this.retries(2);
  let clock;

  const buildMockElement = () => {
    return {
      classList: {
        add: sinon.spy()
      },
      parentNode: {
        removeChild: sinon.spy()
      }
    };
  };

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    sinon.stub(document, 'querySelector');
    sinon.spy(AppLaunchpadUX, 'hideAppLoadingIndicator');
  });
  afterEach(() => {
    sinon.restore();
    clock.restore();
  });

  describe('hideAppLoadingIndicator', () => {
    it('without indicator', () => {
      document.querySelector.returns(null);

      expect(() => {
        AppLaunchpadUX.hideAppLoadingIndicator();
        clock.tick(1e3);
      }).not.to.throw();
    });

    it('with app loading indicator', () => {
      // given
      const mockIndicatorElem = buildMockElement();
      document.querySelector.returns(mockIndicatorElem);

      // when
      AppLaunchpadUX.hideAppLoadingIndicator();
      clock.tick(1e3);

      // then
      sinon.assert.calledWithExactly(mockIndicatorElem.classList.add, 'hidden');
      sinon.assert.calledWithExactly(mockIndicatorElem.parentNode.removeChild, mockIndicatorElem);
    });
  });

  describe('removeBackdrop', () => {
    it('post message sent properly', () => {
      window.top.postMessage = sinon.spy();
      AppLaunchpadUX.removeBackdrop();
      sinon.assert.calledWithExactly(window.top.postMessage, { msg: 'applaunchpad.remove-backdrop' }, '*');
    });
  });
});
