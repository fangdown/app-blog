const HtmlWebpackPlugin = require("html-webpack-plugin");
// 生成html文件
class MyHtmlWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      "MyHtmlWebpackPlugin",
      (compilation, callback) => {
        const html =
          '<html><head><title>My App</title></head><body><div id="app"></div></body></html>';
        compilation.assets["index.html"] = {
          source: () => html,
          size: () => html.length,
        };
        callback();
      }
    );
  }
}

module.exports = MyHtmlWebpackPlugin;
