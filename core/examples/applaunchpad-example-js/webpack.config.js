const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'applaunchpad-config.js'
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'node_modules/@applaunchpad-project/core', to: './applaunchpad-core' },
        { from: 'node_modules/@applaunchpad-project/client', to: './applaunchpad-client' },
        {
          from: './node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_fiori_3/css_variables.css',
          to: './fundamental-styles'
        },
        {
          from: 'node_modules/fundamental-styles/dist/fundamental-styles.css',
          to: './fundamental-styles'
        },
        {
          from: 'node_modules/@sap-theming/theming-base-content/content/Base/baseLib/baseTheme/fonts',
          to: './fonts'
        }
      ]
    })
  ],
  // TODO: Remove optimization section altogether after https://github.com/davidwl/applaunchpad/issues/2965 resolved
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        exclude: /\.svelte\.map\.js$/
      })
    ]
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
