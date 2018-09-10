## webpack 业务-公共组件-基础组件
[参考](https://www.cnblogs.com/wmhuang/p/8967639.html)



### 删掉没有使用的node-modules
1. 修改.babelrc
2. 修改package.json
```js
// .babelrc
{
  "presets": [["env", { "modules": false }], "react", "stage-0"]
}
// package.json

{
  "name": "optimizing-js",
  "version": "1.0.0",
  "sideEffects": false
}
//  希望打入包进去的文件，
  "sideEffects": [
    "*.css", "*.scss", "*.sass"
  ]
```

### 代码分割-分离第三方库
```js
...
optimization: {
  splitChunks: {
    cacheGroups: {
      venders: {
        test: /node_modules/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  }
}
...
```
### 代码分割-提取复用的业务

```js
optimization: {
  splitChunks: {
    cacheGroups: {
      venders: {
        test: /node_modules/,
        name: 'vendors',
        chunks: 'all'
      },
      default: {
        minSize: 0,
        minChunks: 2, //最少被引用的次数
        reuseExistingChunk: true,
        name: 'utils'
      }
    }
  }
},

```
### 代码分割-分离非首页使用且复用程度小的第三方库
不在首页展示的，属于第三方库的文件，默认是会打包进vendor里的，由于使用次数少，且非首页，打包进去会增加公共文件的体积。性价比不高。所以采用这种方法处理。
```js
venders: {
  test: /node_modules\/(?!(lodash)\/)/, // 去除 lodash，剩余的第三方库打成一个包，命名为 vendors-common
  name: 'vendors-common',
  chunks: 'all'
},
lodash: {
  test: /node_modules\/lodash\//, // lodash 库单独打包，并命名为 vender-lodash
  name: 'vender-lodash'
},
default: {
  minSize: 0,
  minChunks: 2,
  reuseExistingChunk: true,
  name: 'utils'
}
```
### 代码分割-动态导入
页面加载时，才会在head里加入该模块对应的js
```js

<Route path="/about" render={() => import(/* webpackChunkName: "about" */ '@containers/About/About').then(module => module.default)}/>

```
### 缓存- runtimeChunk
解决文件内容未修改，打包后文件名hash被修改的问题
```js
optimization: {
  runtimeChunk: {
    name: 'manifest'
  },
  splitChunks: {...}
}
```
### 缓存 - HashedModuleIdsPlugin
增加、删除一些模块，可能会导致不相关文件的 hash 发生变化，这是因为 webpack 打包时，按照导入模块的顺序，module.id 自增，会导致某些模块的 module.id 发生变化，进而导致文件的 hash 变化。
解决方式： 使用 webpack 内置的 HashedModuleIdsPlugin，该插件基于导入模块的相对路径生成相应的 module.id，这样如果内容没有变化加上 module.id 也没变化，则生成的 hash 也就不会变化了。
```js
// webpack.prod.conf.js
const webpack = require('webpack');
...
plugins: [new webpack.HashedModuleIdsPlugin(), new BundleAnalyzerPlugin()]

```