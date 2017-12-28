var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var parentDir = path.join(__dirname, './');

module.exports = {
  entry: ['babel-polyfill', path.join(parentDir, 'index.js')],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'stage-0', 'react'],
        },
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  output: {
    path: parentDir + '/dist',
    filename: 'bundle.js',
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  devServer: {
    contentBase: parentDir,
    historyApiFallback: true,
  },
};
