const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const isProduction = /^prod/.test(process.env.NODE_ENV);
const mode = isProduction ? "production" : "development";

module.exports = [
  // Backend configuration.
  {
    entry: path.join(__dirname, "src", "backend", "index.ts"),
    mode,
    target: "node",
    externals: [nodeExternals()],
    output: {
      path: path.join(__dirname, "dist"),
      filename: "index.js",
    },
    optimization: {
      minimize: isProduction,
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: "ts-loader",
          options: {
            configFile: path.join(__dirname, "tsconfig.backend.json"),
          },
        },
      ],
    },
  },

  // Frontend configuration.
  {
    entry: path.join(__dirname, "src", "frontend", "index.tsx"),
    mode,
    output: {
      path: path.resolve(__dirname, "public", "static"),
      filename: "bundle.js",
      chunkFilename: "[name].[contenthash:8].chunk.js",
      publicPath: "/",
      globalObject: "this",
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: { ecma: 8 },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: { safari10: true },
            keep_classnames: isProduction,
            keep_fnames: isProduction,
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "ts-loader",
          options: {
            configFile: path.resolve(__dirname, "tsconfig.frontend.json"),
          },
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
  },
];
