const path = require('path');
const buildPath = path.join(__dirname, './public/build');
const srcPath = path.join(__dirname, './src');
const nodeModulesPath = path.join(__dirname, './node_modules');

module.exports = {
  entry: {
    js: srcPath + '/app.jsx',
  },
  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      srcPath,
      nodeModulesPath
    ]
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
    ignored: nodeModulesPath 
  }
}
