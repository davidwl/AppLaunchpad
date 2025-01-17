const path = require('path');
const { readFileSync } = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const babelSettings = JSON.parse(readFileSync('.babelrc-ie11'));

module.exports = {
  entry: {
    applaunchpadClient: './src/applaunchpad-client.js'
  },

  output: {
    filename: 'applaunchpad-client-ie11.js',
    libraryExport: 'default',
    library: 'AppLaunchpadClient',
    libraryTarget: 'umd',
    path: path.join(path.resolve(__dirname), 'public-ie11')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelSettings
        }
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin(
      [
        {
          from: 'applaunchpad-client.d.ts',
          to: 'applaunchpad-client-ie11.d.ts'
        }
      ],
      {
        verbose: true
      }
    )
  ]
};
