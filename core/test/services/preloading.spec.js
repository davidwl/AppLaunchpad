const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { afterEach } from 'mocha';

import { Iframe } from '../../src/services/iframe';
import { IframeHelpers, GenericHelpers } from '../../src/utilities/helpers';
import { ViewGroupPreloading, ViewUrlDecorator } from '../../src/services';
import { AppLaunchpadConfig } from '../../src/core-api';

describe('Iframe', () => {
  let component;
  let preloadingAllowed;
  let clock;
  let container;
  let iframes;
  let viewGroupSettings;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    let lastObj = {};
    component = {
      set: obj => {
        Object.assign(lastObj, obj);
      },
      get: () => lastObj,
      prepareInternalData: () => {}
    };
    preloadingAllowed = false;
    sinon.stub(GenericHelpers);
    GenericHelpers.getRandomId.returns('abc');
    sinon.stub(AppLaunchpadConfig, 'getConfigValue').callsFake(key => {
      if (key === 'navigation.preloadViewGroups') {
        return preloadingAllowed ? undefined : false;
      }
    });

    sinon.stub(ViewUrlDecorator);
    ViewUrlDecorator.applyDecorators.callsFake(url => url);

    iframes = [
      {
        src: 'http://applaunchpad.url.de',
        vg: 'tets1',
        applaunchpad: {
          viewUrl: 'http://applaunchpad.url.de'
        },
        style: { display: 'block' }
      }
    ];
    container = {
      appendChild: child => {
        iframes.push(child);
      }
    };
    viewGroupSettings = {
      ham: {
        preloadUrl: 'ham.html'
      },
      cheese: {
        preloadUrl: 'cheese.html'
      },
      ananas: {
        preloadUrl: 'ananas.html'
      }
    };
    sinon.stub(Iframe, 'getAllViewGroupSettings').callsFake(() => {
      return viewGroupSettings;
    });
    sinon.stub(IframeHelpers, 'getIframeContainer').callsFake(() => {
      return container;
    });
    sinon.stub(IframeHelpers, 'getMainIframes').callsFake(() => {
      return [...iframes];
    });
  });

  afterEach(() => {
    clock.restore();
    if (document.createElement.restore) {
      document.createElement.restore();
    }
    sinon.restore();
  });

  describe('preload view groups', () => {
    it('preloading disabled', () => {
      ViewGroupPreloading.preloadViewGroups(2);

      assert.equal(iframes.length, 1);
      assert.equal(iframes[0].src, 'http://applaunchpad.url.de');
      assert.equal(iframes[0].applaunchpad.viewUrl, 'http://applaunchpad.url.de');
      assert.equal(iframes[0].applaunchpad.preloading, undefined);
      assert.equal(iframes[0].style.display, 'block');
      assert.equal(iframes[0].vg, 'tets1');
    });

    it('preloading with no view group settings', () => {
      preloadingAllowed = true;
      viewGroupSettings = [];
      ViewGroupPreloading.preloadViewGroups(2);

      assert.equal(iframes.length, 1);
      assert.equal(iframes[0].src, 'http://applaunchpad.url.de');
      assert.equal(iframes[0].applaunchpad.viewUrl, 'http://applaunchpad.url.de');
      assert.equal(iframes[0].applaunchpad.preloading, undefined);
      assert.equal(iframes[0].style.display, 'block');
      assert.equal(iframes[0].vg, 'tets1');
    });

    it('initial preloading', () => {
      preloadingAllowed = true;

      ViewGroupPreloading.preloadViewGroups(2);

      assert.equal(iframes.length, 3);
      assert.equal(iframes[0].src, 'http://applaunchpad.url.de');
      assert.equal(iframes[0].applaunchpad.viewUrl, 'http://applaunchpad.url.de');
      assert.equal(iframes[0].applaunchpad.preloading, undefined);
      assert.equal(iframes[0].style.display, 'block');
      assert.equal(iframes[0].vg, 'tets1');
      assert.equal(iframes[1].src, 'ham.html');
      assert.equal(iframes[1].applaunchpad.viewUrl, 'ham.html');
      assert.equal(iframes[1].applaunchpad.preloading, true);
      assert.equal(iframes[1].style.display, 'none');
      assert.equal(iframes[1].vg, 'ham');
      assert.equal(iframes[2].src, 'cheese.html');
      assert.equal(iframes[2].applaunchpad.viewUrl, 'cheese.html');
      assert.equal(iframes[2].applaunchpad.preloading, true);
      assert.equal(iframes[2].style.display, 'none');
      assert.equal(iframes[2].vg, 'cheese');
    });

    it('preloading with partially already existing frames', () => {
      preloadingAllowed = true;

      iframes.push({
        vg: 'ham',
        src: 'ham2.html',
        applaunchpad: {
          viewUrl: 'ham2.html'
        }
      });
      iframes.push({
        vg: 'cheese',
        src: 'cheese2.html',
        applaunchpad: {
          viewUrl: 'cheese2.html'
        }
      });

      ViewGroupPreloading.preloadViewGroups(2);

      assert.equal(iframes.length, 4);
      assert.equal(iframes[0].src, 'http://applaunchpad.url.de');
      assert.equal(iframes[0].applaunchpad.viewUrl, 'http://applaunchpad.url.de');
      assert.equal(iframes[0].applaunchpad.preloading, undefined);
      assert.equal(iframes[0].style.display, 'block');
      assert.equal(iframes[0].vg, 'tets1');
      assert.equal(iframes[1].vg, 'ham');
      assert.equal(iframes[1].applaunchpad.viewUrl, 'ham2.html');
      assert.equal(iframes[1].src, 'ham2.html');
      assert.equal(iframes[1].applaunchpad.preloading, undefined);
      assert.equal(iframes[2].src, 'cheese2.html');
      assert.equal(iframes[2].applaunchpad.viewUrl, 'cheese2.html');
      assert.equal(iframes[2].applaunchpad.preloading, undefined);
      assert.equal(iframes[2].vg, 'cheese');
      assert.equal(iframes[3].src, 'ananas.html');
      assert.equal(iframes[3].applaunchpad.viewUrl, 'ananas.html');
      assert.equal(iframes[3].applaunchpad.preloading, true);
      assert.equal(iframes[3].style.display, 'none');
      assert.equal(iframes[3].vg, 'ananas');
    });

    it('preloading with an iframe in preloading state ', () => {
      preloadingAllowed = true;

      iframes.push({
        vg: 'sandwich',
        src: 'sandwich.html',
        applaunchpad: {
          viewUrl: 'sandwich.html',
          preloading: true,
          createdAt: new Date().getTime() - 500
        }
      });

      ViewGroupPreloading.preloadViewGroups(2);

      assert.equal(iframes.length, 2);
      assert.equal(iframes[0].src, 'http://applaunchpad.url.de');
      assert.equal(iframes[0].applaunchpad.viewUrl, 'http://applaunchpad.url.de');
      assert.equal(iframes[0].applaunchpad.preloading, undefined);
      assert.equal(iframes[0].style.display, 'block');
      assert.equal(iframes[0].vg, 'tets1');
      assert.equal(iframes[1].vg, 'sandwich');
      assert.equal(iframes[1].applaunchpad.viewUrl, 'sandwich.html');
      assert.equal(iframes[1].src, 'sandwich.html');
      assert.equal(iframes[1].applaunchpad.preloading, true);
    });

    it('preloading with an iframe in preloading state but old', () => {
      preloadingAllowed = true;

      iframes.push({
        vg: 'sandwich',
        src: 'sandwich.html',
        applaunchpad: {
          viewUrl: 'sandwich.html',
          preloading: true,
          createdAt: new Date().getTime() - 35000
        }
      });

      ViewGroupPreloading.preloadViewGroups(4);
      assert.equal(iframes[0].src, 'http://applaunchpad.url.de');
      assert.equal(iframes[0].applaunchpad.viewUrl, 'http://applaunchpad.url.de');
      assert.equal(iframes[0].applaunchpad.preloading, undefined);
      assert.equal(iframes[0].style.display, 'block');
      assert.equal(iframes[0].vg, 'tets1');
      assert.equal(iframes[1].vg, 'sandwich');
      assert.equal(iframes[1].applaunchpad.viewUrl, 'sandwich.html');
      assert.equal(iframes[1].src, 'sandwich.html');
      assert.equal(iframes[1].applaunchpad.preloading, true);
      assert.equal(iframes[2].src, 'ham.html');
      assert.equal(iframes[2].applaunchpad.viewUrl, 'ham.html');
      assert.equal(iframes[2].applaunchpad.preloading, true);
      assert.equal(iframes[2].style.display, 'none');
      assert.equal(iframes[2].vg, 'ham');
      assert.equal(iframes[3].src, 'cheese.html');
      assert.equal(iframes[3].applaunchpad.viewUrl, 'cheese.html');
      assert.equal(iframes[3].applaunchpad.preloading, true);
      assert.equal(iframes[3].style.display, 'none');
      assert.equal(iframes[3].vg, 'cheese');
    });

    it('preload, set shouldPreload to true if it was false', () => {
      assert.equal(ViewGroupPreloading.shouldPreload, false);
      ViewGroupPreloading.preload();
      assert.equal(ViewGroupPreloading.shouldPreload, true);
    });

    it('preload, call preloadViewGroups and extend iframes', () => {
      ViewGroupPreloading.preloadBatchSize = 4;
      ViewGroupPreloading.shouldPreload = true;

      assert.equal(iframes.length, 1);

      preloadingAllowed = true;
      ViewGroupPreloading.preload();
      clock.tick(1);

      assert.equal(iframes.length, 4);
    });

    it('loaded', () => {
      const iframe = {
        src: 'http://applaunchpad.url.de',
        vg: 'tets1',
        applaunchpad: {
          viewUrl: 'http://applaunchpad.url.de',
          preloading: true,
          createdAt: new Date().getTime() - 600
        },
        style: { display: 'block' }
      };

      ViewGroupPreloading.viewGroupLoaded(iframe);

      assert.equal(ViewGroupPreloading.preloadBatchSize, 2);
      assert.equal(iframe.applaunchpad.preloading, true);

      clock.tick(1100);

      assert.equal(iframe.applaunchpad.preloading, false);
    });

    it('preloadIframeOnBackground()', () => {
      const iframeContainer = {
        appendChild: sinon.stub()
      };
      sinon.stub(IframeHelpers, 'createIframe').returns({
        style: {
          display: 'test'
        },
        applaunchpad: {
          preloading: false
        }
      });
      ViewGroupPreloading.preloadIframeOnBackground({ preloadUrl: 'test' }, 'name', iframeContainer);
      sinon.assert.calledOnce(IframeHelpers.createIframe);
      sinon.assert.calledOnce(iframeContainer.appendChild);
    });
  });
});
