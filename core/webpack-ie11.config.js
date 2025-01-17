const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const commonRules = require('./webpack-common-rules');
const exec = require('child_process').exec;
const fundamentalStyles = require('./fundamentalStyleClasses');

const applaunchpadfiles = [
  ...fundamentalStyles,
  './node_modules/@babel/polyfill/dist/polyfill.js',
  './node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
  './src/main.js'
];

const env = process.env.NODE_ENV;

class PatchAppLaunchpadPlugin {
  constructor() {}
  static execHandler(err, stdout, stderr) {
    if (stdout) {
      console.log(stdout);
      process.stdout.write(stdout);
    }

    if (stderr) {
      console.error(stderr);
      process.stderr.write(stderr);
    }

    if (err) {
      throw err;
    }
  }
  apply(compiler) {
    if (compiler.hooks) {
      compiler.hooks.afterEmit.tap('AppLaunchpad Patch', () =>
        exec(
          'babel public-ie11/applaunchpad-ie11.js --out-file public-ie11/applaunchpad-ie11.js --presets=@babel/preset-env --root . --root-mode upward' +
            (process.env.MINIFY === 'false' ? '' : ' --minified'),
          PatchAppLaunchpadPlugin.execHandler
        )
      );
    }
  }
}

module.exports = {
  devtool: 'false',
  entry: {
    'applaunchpad-ie11': applaunchpadfiles
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    mainFields: ['svelte', 'browser', 'module', 'main'],
    extensions: ['.mjs', '.js', '.svelte', '.html']
  },
  output: {
    path: __dirname + '/public-ie11',
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },
  module: {
    rules: [
      commonRules.svelte,
      commonRules.css,
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'postcss-loader'
          }
        ]
      },
      commonRules.urls
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public-ie11'], {
      exclude: ['package.json', 'README.md'],
      verbose: true
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new PatchAppLaunchpadPlugin()
  ],
  stats: {
    warnings: false
  }
};
