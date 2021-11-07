const webpack = require("webpack");
const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "examples/src"),
  mode: "development",
  entry: {
    app: "./app.js",
  },
  output: {
    filename: "bundle.js",
    publicPath: "/",
  },
  devServer: {
    static: path.resolve(__dirname, "examples/src"),
    allowedHosts: "all",
    port: 8000,
    host: "0.0.0.0",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    alias: {
      "react-photo-gallery": path.resolve(__dirname, "src/Gallery"),
    },
  },
};
