const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const htmlMinifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
};

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/ts/main.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  devtool: "source-map",
  devServer: {
    clientLogLevel: "silent",
    port: 8000,
    hot: true,
  },
  resolve: {
    extensions: [".js", ".ts", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src/ts"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/templates/index.html",
      minify: isProduction && htmlMinifyOptions,
    }),
  ],
};
