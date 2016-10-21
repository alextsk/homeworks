'use strict';
const NODE_ENV  = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
module.exports = {
    entry: {
      travel:'./travel/index.js',
      carousel:'./carousel/index.js'
    },
    output: {
      filename: "./[name]/build.js"
  },
  watch: NODE_ENV === 'development',

  devtool: (NODE_ENV === 'development') ? 'cheap-inline-module-source-map' : null,

  plugins : [
     new webpack.DefinePlugin({
       NODE_ENV: JSON.stringify(NODE_ENV)
     })
  ],
  module: {
    loaders: [{
      test:   /\.js$/,
      loader: 'babel?optional[]=runtime'
    }]
  }

};

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  )
}