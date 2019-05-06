## 源码-多页面

### 入口配置
```js
  entry: {
    index: './src/index.js',
    other: './src/other.js'
  }

```

### 出口配置
```js
output: {
  filename: '[name].[hash:8].js',
  path: path.resolve(__dirname, 'dist')
}
```

### plugins
```js

plugins: {
  new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html',
    chunks: ['home']
  })
  new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'other.html',
    chunks: ['other']
  })
}