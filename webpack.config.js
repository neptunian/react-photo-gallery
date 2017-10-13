const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'examples/src'),
  entry: {
    app: './app.js',
  },
  output: {
    path: path.resolve(__dirname, 'examples/dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'examples/src'),
    port: 8000,
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
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          }
        ]
      },
    ],
  },
  resolve: {
    alias: {
      'react-photo-gallery': path.resolve(__dirname, 'src/index'),
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
      minChunk: 2,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: false,
      template: path.resolve(__dirname, 'examples/src/index.html')
    }),
  ]
};
