//you can now use ES6 goodies here
AppLaunchpad.setConfig({
  navigation: {
    contextSwitcher: false,
    nodes: () => [
      {
        pathSegment: 'home',
        label: 'Home',
        icon: 'home',
        viewUrl: 'openui5.html#/home',
        children: [
          {
            pathSegment: 'sample1',
            label: 'First',
            icon: 'nutrition-activity',
            viewUrl: 'sample1/sample1.html'
          },
          {
            pathSegment: 'sample2',
            label: 'Second',
            icon: 'paper-plane',
            viewUrl: 'sample2/sample2.html'
          },
          {
            category: { label: 'Links', icon: 'cloud' },
            label: 'AppLaunchpad Project',
            externalLink: {
              url: 'https://applaunchpad-project.io/'
            }
          },
          {
            category: 'Links',
            label: 'OpenUI5',
            externalLink: {
              url: 'https://openui5.hana.ondemand.com/'
            }
          }
        ]
      }
    ]
  },
  routing: {
    /**
     * Development:
     * For path routing, set to false
     * For hash routing, set to true
     */
    useHashRouting: true
  },
  settings: {
    header: {
      title: 'AppLaunchpad OpenUI5',
      logo: '/logo.png',
      favicon: '/favicon.ico'
    },
    responsiveNavigation: 'simpleMobileOnly',
    appLoadingIndicator: {
      hideAutomatically: true
    }
  }
});
