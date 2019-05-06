## 源码-plugins 介绍
> 介绍几个常用的plugin

1. clean-webpack-plugin 清理插件

```js
const CleanWebpackPlugin = require('clean-webpack-plugin')


pulgins:[
  new CleanWebpackPlugin('./dist') //目录
]
```

2. copy-webpack-plugin 拷贝插件
```js

const CopyWebpackPlugin = require('copy-webpack-plugin')

plugins: [
  new CopyWebpackPlugin([
    {from: './public', to: './'}
  ])
]
```
3. BannerPlugin 版权信息
```js
plugins: [
  new webpack.BannerPlugin('make by fangdown')
]
