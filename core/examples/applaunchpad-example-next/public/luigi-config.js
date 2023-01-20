AppLaunchpad.setConfig({
  navigation: {
    contextSwitcher: false,
    nodes: () => [
      {
        pathSegment: 'home',
        label: 'Home',
        icon: 'home',
        viewUrl: '/home',
        children: [
          {
            pathSegment: 'sample1',
            label: 'First',
            icon: 'nutrition-activity',
            viewUrl: '/sample1'
          },
          {
            pathSegment: 'sample2',
            label: 'Second',
            icon: 'paper-plane',
            viewUrl: '/sample2'
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
            label: 'Next.js',
            externalLink: {
              url: 'https://nextjs.org/'
            }
          }
        ]
      }
    ]
  },
  routing: {
    useHashRouting: true
  },
  settings: {
    header: {
      title: 'AppLaunchpad Nextjs',
      favicon: '/favicon.ico'
    },
    responsiveNavigation: 'simpleMobileOnly',
    appLoadingIndicator: {
      hideAutomatically: true
    }
  }
});
