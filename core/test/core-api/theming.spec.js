const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const sinon = require('sinon');

import { AppLaunchpadConfig, AppLaunchpadTheming } from '../../src/core-api';

describe('Core API - Theming', function() {
  this.retries(1);
  const getMockTheming = () => {
    return {
      themes: [
        { id: 'light', name: 'Light Theme' },
        { id: 'dark', name: 'Dark Theme' }
      ],
      defaultTheme: 'light'
    };
  };
  beforeEach(() => {
    sinon.stub(AppLaunchpadConfig);
    AppLaunchpadConfig.getConfigValue.returns(getMockTheming());
    AppLaunchpadConfig.getConfigValueAsync.returns(getMockTheming().themes);
  });
  afterEach(() => {
    sinon.reset();
    sinon.restore();
  });

  describe('getAvailableThemes', () => {
    it('has themes', async () => {
      const res = await AppLaunchpadTheming.getAvailableThemes();
      assert.deepEqual(res, getMockTheming().themes);
    });
    it('no theming defined', async () => {
      AppLaunchpadConfig.getConfigValueAsync.returns(undefined);
      const res = await AppLaunchpadTheming.getAvailableThemes();
      assert.isUndefined(res);
    });
  });
  it('setCurrentTheme', () => {
    const mockTheme = { id: 'light', name: 'Light Theme' };
    assert.isUndefined(AppLaunchpadTheming.currentTheme);

    AppLaunchpadTheming.setCurrentTheme(mockTheme);

    assert.deepEqual(AppLaunchpadTheming.currentTheme, mockTheme);
  });
  describe('getThemeObject', () => {
    it('theme not found', async () => {
      const res = await AppLaunchpadTheming.getThemeObject('notexistingtheme');
      assert.isUndefined(res);
    });
    it('no theming defined', async () => {
      AppLaunchpadConfig.getConfigValueAsync.returns(undefined);

      const res = await AppLaunchpadTheming.getThemeObject('dark');
      assert.isUndefined(res);
    });
    it('get theme object', async () => {
      const res = await AppLaunchpadTheming.getThemeObject('dark');
      assert.deepEqual(res, { id: 'dark', name: 'Dark Theme' });
    });
  });
});
