//you can now use ES6 goodies here
AppLaunchpad.setConfig({
  navigation: {
    contextSwitcher: false,
    nodes: () => [
      {
        pathSegment: 'home',
        label: 'Home',
        icon: 'home',
        viewUrl: '/views/home.html',
        children: [
          {
            pathSegment: 'sample1',
            label: 'First',
            icon: 'nutrition-activity',
            viewUrl: '/views/sample1.html'
          },
          {
            pathSegment: 'sample2',
            label: 'Second',
            icon: 'paper-plane',
            viewUrl: '/views/sample2.html'
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
            label: 'JavaScript',
            externalLink: {
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
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
      title: 'AppLaunchpad JavaScript',
      logo: '/logo.png',
      favicon: '/favicon.ico'
    },
    responsiveNavigation: 'simpleMobileOnly',
    appLoadingIndicator: {
      hideAutomatically: true
    }
  }
});
