var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, './');

module.exports = {
  entry: [path.join(parentDir, 'index.js')],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
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
