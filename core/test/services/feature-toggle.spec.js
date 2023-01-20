import { AppLaunchpadFeatureToggles } from '../../src/core-api';
const chai = require('chai');
const assert = chai.assert;

describe('Feature Toggle', () => {
  it('Set and unset feature toggle to list', async () => {
    assert.equal(AppLaunchpadFeatureToggles.getActiveFeatureToggleList(), 0);
    AppLaunchpadFeatureToggles.setFeatureToggle('test');
    AppLaunchpadFeatureToggles.setFeatureToggle(12345);
    AppLaunchpadFeatureToggles.unsetFeatureToggle('foo');
    assert.equal(AppLaunchpadFeatureToggles.getActiveFeatureToggleList(), 'test');
    AppLaunchpadFeatureToggles.unsetFeatureToggle('test');

    assert.equal(AppLaunchpadFeatureToggles.getActiveFeatureToggleList(), 0);
    AppLaunchpadFeatureToggles.setFeatureToggle('!bar');
    AppLaunchpadFeatureToggles.setFeatureToggle('test2');
    AppLaunchpadFeatureToggles.setFeatureToggle('test');

    assert.deepEqual(AppLaunchpadFeatureToggles.getActiveFeatureToggleList(), ['test2', 'test']);

    AppLaunchpadFeatureToggles.setFeatureToggle('bar');
    assert.deepEqual(AppLaunchpadFeatureToggles.getActiveFeatureToggleList(), ['test2', 'test', 'bar']);

    AppLaunchpadFeatureToggles.unsetFeatureToggle('test');
    assert.deepEqual(AppLaunchpadFeatureToggles.getActiveFeatureToggleList(), ['test2', 'bar']);

    assert.equal(AppLaunchpadFeatureToggles.isDuplicatedOrDisabled('bar'), true);
    assert.equal(AppLaunchpadFeatureToggles.isDuplicatedOrDisabled('foo'), false);
  });

  it('check feature toggle is valid with a string', () => {
    const actual = AppLaunchpadFeatureToggles.isValid('foo');
    const expect = true;

    assert.equal(actual, expect);
  });
  it('check feature toggle is valid with a number', () => {
    const actual = AppLaunchpadFeatureToggles.isValid(123);
    const expect = false;

    assert.equal(actual, expect);
  });
});
