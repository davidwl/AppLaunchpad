AppLaunchpad.setConfig({
  navigation: {
    nodes: [
      {
        pathSegment: 'home',
        hideFromNav: true,
        hideSideNav: true,
        loadingIndicator: {
          enabled: false
        },
        viewUrl: '/microfrontend.html'
      }
    ]
  },
  settings: {
    responsiveNavigation: 'Fiori3',
    header: {
      title: 'AppLaunchpad Simple Dev'
    }
  }
});
