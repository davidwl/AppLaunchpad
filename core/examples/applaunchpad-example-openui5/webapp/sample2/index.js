sap.ui.define(['sap/ui/core/mvc/XMLView'], function(XMLView) {
  'use strict';

  XMLView.create({ viewName: 'applaunchpad.demo.sample2.Sample2' }).then(function(
    oView
  ) {
    oView.placeAt('content');
  });
});
