## webpack性能调优
> 主流工具webpack 打包压缩
### 性能优化-网络-webpack优化

###. 提升构建速度
1. babel-loader
- 使用babel-loader
- 开启缓存将转译结果缓存至文件系统loader: 'babel-loader?cacheDirectory=true'
- 用 include 或 exclude 来帮我们避免不必要的转译

2. 第三方库
用 DllPlugin 处理文件，这个依赖库不会跟着你的业务代码一起被重新打包，只有当依赖自身发生版本变化时才会重新打包。
- 基于 dll 专属的配置文件，打包 dll 库
- 基于 webpack.config.js 文件，打包业务代码

3. Happypack——将 loader 由单进程转为多进程
- loader: 'happypack/loader?id=happyBabel'

4. 删除冗余代码
- Tree-Shaking
- UglifyJsPlugin
- optimization.minimize

5. 按需加载
- 一次不加载完所有的文件内容，只加载此刻需要用到的那部分（会提前做拆分）
- 当需要更多内容时，再对用到的内容进行即时加载
> 核心代码：require.ensure(dependencies, callback, chunkName)

按需加载有两种模式；一种是 require.ensure；另一种是 ecmascript 定义的动态 import

6. gzip压缩
原理：gzip使用deflate技术压缩，比deflate压缩量大一点，deflate压缩成本小一点