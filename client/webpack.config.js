const path = require('path');
const { readFileSync } = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const babelSettings = JSON.parse(readFileSync('.babelrc'));

module.exports = {
  entry: {
    applaunchpadClient: './src/applaunchpad-client.js'
  },

  output: {
    filename: 'applaunchpad-client.js',
    libraryExport: 'default',
    library: 'AppLaunchpadClient',
    libraryTarget: 'umd',
    path: path.join(path.resolve(__dirname), 'public')
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
    new CopyWebpackPlugin([
      {
        from: 'applaunchpad-client.d.ts',
        to: '.'
      },
      {
        from: 'applaunchpad-element.d.ts',
        to: '.'
      },
      {
        from: 'src/applaunchpad-element.js',
        to: '.'
      }
    ])
  ],
  devtool: 'source-map'
};
