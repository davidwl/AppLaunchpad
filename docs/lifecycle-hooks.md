<!-- meta
{
  "node": {
    "label": "Lifecycle hooks",
    "category": {
      "label": "AppLaunchpad Core",
      "collapsible": true
    },
    "metaData": {
      "categoryPosition": 2,
      "position": 3
    }
  }
}
meta -->

# Lifecycle hooks

You can use any of the AppLaunchpad lifecycle hooks by adding additional setup to the root of the AppLaunchpad configuration object. Here is an example:

```javascript
{
  ...
  lifecycleHooks: {
    applaunchpadAfterInit: () => {
      // initializing with a different language
      myGeoLocationService.getLanguage().then(lang => {
        AppLaunchpad.i18n().setCurrentLocale(lang);
      })
    }
  }
  ...
}
```

### applaunchpadAfterInit()

This method will be called after [AppLaunchpad.setConfig({})](applaunchpad-core-api.md#setconfig) is executed.

