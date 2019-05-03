## 源码-环境变量

1. 使用内置插件完成， 注意值是字符串
```js
plugins: [
  new webpack.DefinePlugin({
    DEV: Json.stringify('dev'),
    FLAG: 'true'
  })
]
```

2. 拆分文件
- webpack.base.js
- webpack.dev.js
- webpack.prod.js

使用webpack-merge合并文件

```js
const {smart} = require('webpack-merge')
const base = require('./webpack.base.js')
module.exports = smart(base, {
  mode: 'production',
})