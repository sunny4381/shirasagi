const path = require("path");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob");

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === "production";

// PostCSS Plugins
const postcssPresetEnv = require("postcss-preset-env");
const autoprefixer = require("autoprefixer");
const cssDeclarationSorter = require("css-declaration-sorter");

const entries = {};
glob.sync("app/javascript/packs/*.js").forEach(filePath => {
  const name = path.basename(filePath, path.extname(filePath));
  entries[name] = path.resolve(__dirname, filePath);
});

module.exports = {
  mode: isProd ? "production" : "development",
  devtool: "source-map",
  entry: entries,
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "initial"
    }
  },
  output: {
    path: path.resolve(__dirname, "public/packs"),
    publicPath: isProd ? "/packs/" : "//localhost:8081/packs/",
    filename: isProd ? "[name]-[hash].js" : "[name].js"
  },
  resolve: {
    extensions: [".js"]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    publicPath: "/packs/",
    host: "localhost",
    port: 8081,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: loader => [
                postcssPresetEnv(),
                autoprefixer(),
                cssDeclarationSorter({ order: "smacss" })
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: loader => [
                postcssPresetEnv(),
                autoprefixer(),
                cssDeclarationSorter({ order: "smacss" })
              ]
            }
          }
        ]
      },
      {
        test: /locales/,
        loader: '@alienfast/i18next-loader',
        options: {
          relativePathAsNamespace: true
        },
        // options here
        //query: { overrides: [ '../node_modules/lib/locales' ] }
      }
    ]
  },
  plugins: [
    new WebpackAssetsManifest({ publicPath: true, writeToDisk: true }),
    new MiniCssExtractPlugin({
      filename: isProd ? "[name]-[hash].css" : "[name].css"
    })
  ]
};
