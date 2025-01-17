import { afterEach } from 'mocha';
import { AppLaunchpadRouting, AppLaunchpadConfig } from '../../src/core-api';
import { RoutingHelpers } from '../../src/utilities/helpers';

const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');

describe('AppLaunchpad routing', function() {
  const globalLocationRef = global.location;

  beforeEach(() => {
    window.history.pushState = sinon.spy();
    window.history.replaceState = sinon.spy();
    sinon.stub(AppLaunchpadConfig, 'configChanged');
  });
  afterEach(() => {
    global.location = globalLocationRef;
    sinon.restore();
  });
  describe('SearchParams path routing', () => {
    it('get searchparams', () => {
      global.location = 'http://some.url.de?test=tets&applaunchpad=rocks';
      assert.deepEqual(AppLaunchpadRouting.getSearchParams(), { test: 'tets', applaunchpad: 'rocks' });
    });
    it('get searchparams', () => {
      global.location = 'http://some.url.de/something?test=tets&applaunchpad=rocks';
      assert.deepEqual(AppLaunchpadRouting.getSearchParams(), { test: 'tets', applaunchpad: 'rocks' });
    });
    it('get searchparams when no query parameter', () => {
      global.location = 'http://some.url.de';
      assert.deepEqual(AppLaunchpadRouting.getSearchParams(), {});
    });
    it('set searchparams', () => {
      window.state = {};
      global.location = 'http://some.url.de';
      AppLaunchpadRouting.addSearchParams({ foo: 'bar' }, true);
      sinon.assert.calledWithExactly(window.history.pushState, window.state, '', 'http://some.url.de/?foo=bar');
    });
    it('set searchparams without keeping browser history', () => {
      window.state = {};
      global.location = 'http://some.url.de';
      AppLaunchpadRouting.addSearchParams({ foo: 'bar' }, false);
      sinon.assert.calledWithExactly(window.history.replaceState, window.state, '', 'http://some.url.de/?foo=bar');
    });
    it('add search params to searchparams', () => {
      window.state = {};
      global.location = 'http://some.url.de?test=tets';
      AppLaunchpadRouting.addSearchParams({ foo: 'bar' }, true);
      sinon.assert.calledWithExactly(
        window.history.pushState,
        window.state,
        '',
        'http://some.url.de/?test=tets&foo=bar'
      );
    });
    it('call addSearchParams with wrong argument', () => {
      console.log = sinon.spy();
      global.location = 'http://some.url.de';
      AppLaunchpadRouting.addSearchParams('bar', true);
      sinon.assert.calledWith(console.log, 'Params argument must be an object');
    });
    it('delete search params from url with keepBrowserHistory is true', () => {
      window.state = {};
      global.location = 'http://some.url.de?applaunchpad=rocks&mario=red';
      AppLaunchpadRouting.addSearchParams({ mario: undefined }, true);
      sinon.assert.calledWithExactly(
        window.history.pushState,
        window.state,
        '',
        'http://some.url.de/?applaunchpad=rocks'
      );
    });
    it('delete search params from url with keepBrowserHistory is false', () => {
      window.state = {};
      global.location = 'http://some.url.de?applaunchpad=rocks&mario=red';
      AppLaunchpadRouting.addSearchParams({ mario: undefined }, false);
      sinon.assert.calledWithExactly(
        window.history.replaceState,
        window.state,
        '',
        'http://some.url.de/?applaunchpad=rocks'
      );
    });
  });
  describe('SearchParams hash routing', () => {
    beforeEach(() => {
      sinon
        .stub(AppLaunchpadConfig, 'getConfigValue')
        .withArgs('routing.useHashRouting')
        .returns(true);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('get searchparams hash routing', () => {
      global.location = 'http://some.url.de/#/?test=tets&applaunchpad=rocks';
      assert.deepEqual(AppLaunchpadRouting.getSearchParams(), { test: 'tets', applaunchpad: 'rocks' });
    });
    it('get searchparams', () => {
      global.location = 'http://some.url.de/#/something?test=tets&applaunchpad=rocks';
      assert.deepEqual(AppLaunchpadRouting.getSearchParams(), { test: 'tets', applaunchpad: 'rocks' });
    });
    it('get searchparams hash routing', () => {
      global.location = 'http://some.url.de/#/';
      assert.deepEqual(AppLaunchpadRouting.getSearchParams(), {});
    });
    it('add searchparams hash routing', () => {
      window.state = {};
      global.location = 'http://some.url.de/#/';
      AppLaunchpadRouting.addSearchParams({ foo: 'bar' }, true);
      sinon.assert.calledWithExactly(window.history.pushState, window.state, '', 'http://some.url.de/#/?foo=bar');
    });
    it('add search params to hash routing', () => {
      window.state = {};
      global.location = 'http://some.url.de/#/?test=tets';
      AppLaunchpadRouting.addSearchParams({ foo: 'bar' }, true);
      sinon.assert.calledWithExactly(
        window.history.pushState,
        window.state,
        '',
        'http://some.url.de/#/?test=tets&foo=bar'
      );
    });
    it('add search params to hash routing with special characters', () => {
      window.state = {};
      global.location = 'http://some.url.de/#/?test=tets';
      AppLaunchpadRouting.addSearchParams({ foo: '%bar#foo@bar&foo' }, true);
      sinon.assert.calledWithExactly(
        window.history.pushState,
        window.state,
        '',
        'http://some.url.de/#/?test=tets&foo=%25bar%23foo%40bar%26foo'
      );
    });
    it('add search params to hash routing', () => {
      window.state = {};
      global.location = 'http://some.url.de/#/?~applaunchpad=rocks';
      AppLaunchpadRouting.addSearchParams({ foo: 'bar' }, true);
      sinon.assert.calledWithExactly(
        window.history.pushState,
        window.state,
        '',
        'http://some.url.de/#/?%7Eapplaunchpad=rocks&foo=bar'
      );
    });
    it('call addSearchParams with wrong argument hash routing', () => {
      console.log = sinon.spy();
      global.location = 'http://some.url.de/#/';
      AppLaunchpadRouting.addSearchParams('bar', true);
      sinon.assert.calledWith(console.log, 'Params argument must be an object');
    });
    it('delete search params from url', () => {
      window.state = {};
      global.location = 'http://some.url.de/#/?applaunchpad=rocks&mario=red';
      AppLaunchpadRouting.addSearchParams({ mario: undefined }, true);
      sinon.assert.calledWithExactly(
        window.history.pushState,
        window.state,
        '',
        'http://some.url.de/#/?applaunchpad=rocks'
      );
    });
  });

  describe('modifySearchParams', () => {
    beforeEach(() => {
      sinon
        .stub(AppLaunchpadConfig, 'getConfigValue')
        .withArgs('routing.useHashRouting')
        .returns(false);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('modifySearchParams', () => {
      const searchParams = new URLSearchParams('mario=rocks');
      RoutingHelpers.modifySearchParams({ test: 'tets', applaunchpad: 'rocks', mario: undefined }, searchParams);
      assert.equal(searchParams.toString(), 'test=tets&applaunchpad=rocks');
    });
    it('modifySearchParams with paramPrefix', () => {
      const searchParams = new URLSearchParams('~mario=rocks');
      RoutingHelpers.modifySearchParams({ test: 'tets', applaunchpad: 'rocks' }, searchParams, '~');
      assert.equal(searchParams.toString(), '%7Emario=rocks&%7Etest=tets&%7Eapplaunchpad=rocks');
    });
    it('modifySearchParams with space', () => {
      const searchParams = new URLSearchParams('~mario=rocks');
      RoutingHelpers.modifySearchParams({ test: 'test abc' }, searchParams, '~');
      assert.equal(searchParams.toString(), '%7Emario=rocks&%7Etest=test+abc');
    });
    it('modifySearchParams with a plus sign', () => {
      const searchParams = new URLSearchParams('~mario=rocks');
      RoutingHelpers.modifySearchParams({ test: 'test+abc' }, searchParams, '~');
      assert.equal(searchParams.toString(), '%7Emario=rocks&%7Etest=test%2Babc');
    });
  });

  describe('addNodeParams', () => {
    it('add node Params', () => {
      window.state = {};
      global.location = 'http://some.url.de';
      AppLaunchpadRouting.addNodeParams({ foo: 'bar' }, true);
      sinon.assert.calledWithExactly(window.history.pushState, window.state, '', 'http://some.url.de/?%7Efoo=bar');
    });
    it('add node Params without keeping browser history', () => {
      window.state = {};
      global.location = 'http://some.url.de';
      AppLaunchpadRouting.addNodeParams({ foo: 'bar' }, false);
      sinon.assert.calledWithExactly(window.history.replaceState, window.state, '', 'http://some.url.de/?%7Efoo=bar');
    });
    it('add more node param to existing node params', () => {
      window.state = {};
      global.location = 'http://some.url.de?~test=tets';
      AppLaunchpadRouting.addNodeParams({ foo: 'bar' }, true);
      sinon.assert.calledWithExactly(
        window.history.pushState,
        window.state,
        '',
        'http://some.url.de/?%7Etest=tets&%7Efoo=bar'
      );
    });
    it('call addNodeParams with wrong argument', () => {
      console.log = sinon.spy();
      global.location = 'http://some.url.de';
      AppLaunchpadRouting.addNodeParams('bar', true);
      sinon.assert.calledWith(console.log, 'Params argument must be an object');
    });
    it('remove node param if value of params object is undefined', () => {
      window.state = {};
      global.location = 'http://some.url.de';
      AppLaunchpadRouting.addNodeParams({ test: undefined }, false);
      sinon.assert.calledWithExactly(window.history.replaceState, window.state, '', 'http://some.url.de/');
      AppLaunchpadRouting.addNodeParams({ foo: 'bar' }, false);
      sinon.assert.calledWithExactly(window.history.replaceState, window.state, '', 'http://some.url.de/?%7Efoo=bar');
      AppLaunchpadRouting.addNodeParams({ foo: undefined }, false);
      sinon.assert.calledWithExactly(window.history.replaceState, window.state, '', 'http://some.url.de/');
    });
  });

  describe('Anchor without hash routing', () => {
    it('Set and get anchor', () => {
      const anchor = '#myanchor';
      AppLaunchpadRouting.setAnchor(anchor);
      assert.equal(window.location.hash, anchor);

      const expected = AppLaunchpadRouting.getAnchor();
      assert.equal(`#${expected}`, anchor);
    });

    it('get anchor when no anchor set', () => {
      global.location = 'http://some.url.de';

      const actual = AppLaunchpadRouting.getAnchor();
      const expected = '';
      assert.equal(actual, expected);
    });

    it('set anchor', () => {
      global.location = 'http://some.url.de';
      const anchor = 'myanchor';
      AppLaunchpadRouting.setAnchor(anchor);
      const expected = 'http://some.url.de#myanchor';
      assert.equal(global.location + window.location.hash, expected);
    });
  });

  describe('Anchor with hash routing', () => {
    beforeEach(() => {
      sinon
        .stub(AppLaunchpadConfig, 'getConfigValue')
        .withArgs('routing.useHashRouting')
        .returns(true);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('get anchor', () => {
      global.location = 'http://some.url.de/#/applaunchpad#myanchor';
      const actual = AppLaunchpadRouting.getAnchor();
      const expected = 'myanchor';
      assert.equal(actual, expected);
    });
    it('set anchor', () => {
      global.location = 'http://some.url.de/#/applaunchpad';
      const anchor = 'myanchor';
      AppLaunchpadRouting.setAnchor(anchor);
      const actual = `${global.location}#${anchor}`;
      const expected = 'http://some.url.de/#/applaunchpad#myanchor';
      assert.equal(actual, expected);
    });
  });
});
