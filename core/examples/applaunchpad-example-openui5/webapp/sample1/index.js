sap.ui.define(['sap/ui/core/mvc/XMLView'], function(XMLView) {
  'use strict';

  XMLView.create({ viewName: 'applaunchpad.demo.sample1.Sample1' }).then(function(
    oView
  ) {
    oView.placeAt('content');
  });
});
