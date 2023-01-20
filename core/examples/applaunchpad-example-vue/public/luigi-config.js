AppLaunchpad.setConfig({
  navigation: {
    nodes: () => [
      {
        pathSegment: 'home',
        label: 'Home',
        icon: 'home',
        viewUrl: '/sampleapp.html#/home',
        children: [
          {
            pathSegment: 'sample1',
            label: 'First',
            icon: 'nutrition-activity',
            viewUrl: '/sampleapp.html#/sample1'
          },
          {
            pathSegment: 'sample2',
            label: 'Second',
            icon: 'paper-plane',
            viewUrl: '/sampleapp.html#/sample2'
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
            label: 'Vue.js',
            externalLink: {
              url: 'https://vuejs.org/'
            }
          }
        ]
      }
    ]
  },
  settings: {
    header: {
      title: 'AppLaunchpad Vue App',
      logo: '/logo.png'
    },
    responsiveNavigation: 'simpleMobileOnly'
  }
});
