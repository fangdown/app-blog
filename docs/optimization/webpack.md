## webpack 优化

### 优化项目
- 对于 Webpack4，打包项目使用 production 模式，这样会自动开启代码压缩
- 使用 ES6 模块来开启 tree shaking，这个技术可以移除没有使用的代码
- 优化图片，对于小图可以使用 base64 的方式写入文件中
- 按照路由拆分代码，实现按需加载
- 给打包出来的文件名添加哈希，实现浏览器缓存文件

### 优化打包速度
- 减少文件搜索范围
  - 比如通过别名
  - loader 的 test，include & exclude
- Webpack4 默认压缩并行
- Happypack 并发调用
- babel 也可以缓存编译
