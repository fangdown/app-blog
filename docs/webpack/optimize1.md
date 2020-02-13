## webpack优化
### uglifyjs-webpack-plugin - 多核压缩
```js
module.exports = {
  optimization:{
    minimizer:[
      new UglifyJsPlugin({
        parallel: true
        parallel: os.cpus().length
      })
    ]
  }
}
```
### 监控你的面板 speed-measure-webpack-plugin

### 开启通知面板

### 开启打包进度

### 上线阶段
1. es6不需要编译
   set map es9
   https://cdn.polyfill.io/v2/polyfill.min.js?feature=Map,Set

2. 前端缓存小负载
   manifestplugin
3. webpackplugin -loading
4. 请求的数量
5. 分析打包结果