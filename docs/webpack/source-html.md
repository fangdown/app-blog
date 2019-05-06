## 源码-html插件

### webpack-dev-server
1. 支持dev开发
```
npm install webpack-dev-server -D
```
在script中使用
```
scripts:{
  "dev": "wepback-dev-server"
}
```
使用：
```js
 devServer:{
    port: 3001,
    progress: true,
    contentBase: './dist',
    compress: true
  },
```
2. 插入html
```
npm i html-webpack-dev-server -D

```
使用：
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
// ..
plugins: [
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename: 'index.html',
      minify:{
        removeAttributeQuotes: true, // 去html中的引号
        collapseWhitespace: true // 压缩成一行
      },
    })
  ]

```

