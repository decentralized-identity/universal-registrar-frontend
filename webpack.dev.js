const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'env.backendUrl': JSON.stringify('http://localhost:9080/')
    })
  ],
  devServer: {
    static: './src'
  }
});
