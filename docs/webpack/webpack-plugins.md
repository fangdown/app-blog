## webpack 插件比较
### dev环境
1. new webpack.HotModuleReplacementPlugin() 热替换
2. new webpack.NamedModulesPlugin() 显示模块相对路径
3. new HtmlWebpackPlugin() 插入html
4. new FriendlyErrorsPlugin() 编译提示插件
### prod环境
1. new UglifyJsPlugin() 压缩代码插件
2. new webpack.optimize.ModuleConcatenationPlugin() 作用域提升，提高代码浏览器运行速度
3. new webpack.HashedModuleIdsPlugin() 根据模块路径生成四位hash值作为模块ID
4. new CopyWebpackPlugin() 复制静态资源到打包目录下
5. new HtmlWebpackPlugin() 插入html
6. new ExtractTextPlugin() 抽离css