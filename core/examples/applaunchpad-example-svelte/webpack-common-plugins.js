const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  copyWebpackPlugin: new CopyWebpackPlugin({
    patterns: [
      {
        from: 'src/favicon.ico',
        to: '.'
      },
      {
        from: 'src/logo.png',
        to: '.'
      },
      {
        from: 'src/applaunchpad-config.js',
        to: '.'
      },
      {
        from: 'src/index.html',
        to: '.'
      },
      {
        from: 'src/mf.html',
        to: '.'
      },
      {
        from: 'src/styles.css',
        to: '.'
      },
      {
        from: 'node_modules/@applaunchpad-project/core',
        to: 'applaunchpad-core'
      },
      {
        from: 'node_modules/@applaunchpad-project/client',
        to: 'applaunchpad-client'
      }
    ]
  })
};
