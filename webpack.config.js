global.Promise         = require('bluebird');

const webpack            = require('webpack');
const path               = require('path');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const cacheConfig = require('./sw-precache-config');

const publicPath         = '/public/assets/';
const cssName            = process.env.NODE_ENV === 'production' ? 'styles.css' : 'styles.css';
const jsName             = process.env.NODE_ENV === 'production' ? '[name].js' : '[name].js';

const isProd = plugin => process.env.NODE_ENV === 'production' ? plugin : undefined;

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  new ExtractTextPlugin(cssName),
  new SWPrecacheWebpackPlugin(cacheConfig),
  isProd(new CleanWebpackPlugin([ 'public/assets/' ], {
    root: __dirname,
    verbose: true,
    dry: false
  })),
  isProd(new webpack.optimize.DedupePlugin()),
  isProd(new webpack.optimize.OccurrenceOrderPlugin())
];

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  debug: process.env.NODE_ENV !== 'production',
  resolve: {
    root:               path.join(__dirname, 'src'),
    modulesDirectories: [ 'node_modules' ],
    extensions:         ['', '.js', '.jsx'],
    alias: {
      Api: path.resolve(__dirname, 'src/api/'),
      Common: path.resolve(__dirname, 'src/modules/Common')
    }
  },
  plugins,
  output: {
    path: `${__dirname}/public/assets/`,
    filename: jsName,
    publicPath
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
      { test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
      { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
      { test: /\.svg/, loader: 'url-loader?limit=26000&mimetype=image/svg+xml' },
      { test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1' },
      {
        test: /\.js?$/,
        loader: process.env.NODE_ENV !== 'production'
                  ? 'react-hot!babel!eslint-loader'
                  : 'babel', exclude: [/node_modules/, /public/]
      }
    ]
  },
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : null,
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    port: 8050,
    publicPath: '/public/assets/',
    watchContentBase: true
  }
};
