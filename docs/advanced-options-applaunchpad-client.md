<!-- meta
{
  "node": {
    "label": "Advanced configuration options",
    "category": {
      "label": "AppLaunchpad Client",
      "collapsible": true
    },
    "metaData": {
      "categoryPosition": 5,
      "position": 2
    }
  }
}
meta -->

# Advanced configuration options

## Disable AppLaunchpad Core browser history handling

By default, AppLaunchpad Client navigation does not manipulate the browser history. AppLaunchpad Core handles the browser history by design. If there is a need to disable the history handling by AppLaunchpad Core, you can add an attribute to the `head`-tag in the `index.html` of the AppLaunchpad Client micro frontend. For example:

```html
<!DOCTYPE html>
<html>
  <head disable-applaunchpad-history-handling="true"> </head>
  <body></body>
</html>
```

## Disable AppLaunchpad Core runtime error handling

By default, AppLaunchpad Client listens to runtime errors and sends the [error event](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent) properties to AppLaunchpad Core. 
If a navigation node has configured a property called [runTimeErrorHandler](navigation-parameters-reference.md#node-parameters), you have the possibility to handle errors on the AppLaunchpad Core level. For example: 
```html
<!DOCTYPE html>
<html>
  <head disable-applaunchpad-runtime-error-handling="true"> </head>
  <body></body>
</html>
```
