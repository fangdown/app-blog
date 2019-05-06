## 源码-cssloader

### 加载说明
```js
// css-loader ，编译css样式
// style-loader 把样式插入到style中
rules: [
      {
        test: /\.css$/,
        loader: ['style-loader','css-loader']
      }
    ]
```
> loader 顺序，从右到左

### 抽离成一个外部css
1. 使用mini-css-extract-plugin

```js 
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
plugins: [
    // ...
    new MiniCssExtractPlugin({
      filename: 'index.css'
    })
  ],
  // 
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader'
    ]
  }
  ```

  ### 压缩css
1. 使用optimize-css-assets-webpack-plugin插件
2. 在优化项optimization使用
3. 注意:使用了该项之后， 原有的js压缩会无效，需要使用uglifyjs进行压缩
```js
 // 优化项
  optimization:{
    minimizer: [
      new OptimizeCss(), //压缩css
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  plugins:[

  ]
```
