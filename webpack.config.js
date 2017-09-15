const path = require('path');
const buildPath = path.join(__dirname, './public/build');
const srcPath = path.join(__dirname, './src');

module.exports = {
  entry: {
    js: srcPath + '/app.jsx',
  },
  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders : [
      {
        test: /\.jsx?/,
        include: srcPath,
        loader: 'babel-loader'
      }
    ]
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: './node_modules'
  }
}
