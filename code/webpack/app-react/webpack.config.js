const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",
  mode: "development",
  // devtool: false,
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-react",
              {
                runtime: "automatic",
              },
            ],
            "@babel/preset-typescript",
          ],
        },
      },
      {
        test: /\.jsx$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-react",
                {
                  runtime: "automatic",
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          // 根据运行环境判断使用那个 loader
          process.env.NODE_ENV === "development"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",

            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          process.env.NODE_ENV === "development"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                // 添加 autoprefixer 插件
                plugins: [require("autoprefixer")],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    open: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin({
      templateContent: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack App</title>
  </head>
  <body>
    <div id="app" />
  </body>
</html>
    `,
    }),
  ],
};
