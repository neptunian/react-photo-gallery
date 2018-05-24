const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'examples/src'),
  mode: 'development',
  entry: {
    app: './app.js',
  },
  output: {
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'examples/src'),
    disableHostCheck: true,
    port: 8000,
    host: "0.0.0.0"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['react', 'es2015', 'stage-0'] },
        }],
      },
    ],
  },
  resolve: {
    alias: {
      'react-photo-gallery': path.resolve(__dirname, 'src/Gallery'),
    }
  },
};
