## webpack 优化

### 一、noParse
```js
module:{
  noParse:/jquery/, // 不解析jquery的依赖库
  rules:[]
}
```

### 二、exclude include 定向解析
```js
module:{
  rules:[
    {
      test: /\.js$/,
      exclude: /node_modules/,
      include: path.resolve('src'),
      use:{
        loader: 'babel-loader'
      }
    }
  ]
}
```

### 三、ignorePlugin 忽略插件
webpack内置忽略插件
```js

const  webpack = require('webpack')

module.exports = {
  // ...
  plugins: [
    // 加载moment的时候，不加载moment require的locale，减少打包体积，语音包我们不需要
    new webpack.IgnorePlugin(/\.\/locale/, /moment/)
  ]
}

```
如果要语言包
```js
// 引用时单独引用
import 'moment/locale/zh-cn'
```

### 四、dllPlugin
> 将不会修改的公共模块打包成一个独立的js
> 先执行dll生成公共文件， 后期再执行正常的流程
1. webpack.dll.config.js
```js
const path = require('path')
const webpack = require('webpack')
module.exports = {
  mode: 'production',
  entry: {
    test: './src/test.js'
  },
  output: {
    filename: '_dll_[name].js',
    pathname: path.resolve(__dirname, 'dist'),
    library: '_dll_[name]',
    libraryTarget: 'var', // commonjs var this
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dist', 'manifest.json')
    })
  ]
}

```

2. webpack.config.js
```js
module.exports = {
  plugins:[
    // 将公共js插入到html中
    new webpack.DllReferencePlugin({
      manifest:path.resolve(__dirname, 'dist', 'manifest.json')
    })
  ]
}
```
### 五、happypack  多线程打包
使用happypack， 工程比较大的时候使用
```js
const  Happypack = require('happypack')

module.exports = {
  // ..
  module: {
    rules: [
      {
        test: /\.js/,
        use: 'Happypack/loader?id=js' // 定义id
      }
    ]
  },
  plugins: [
    // 使用多个的话，则new 多个
    new Happypack({
      id: 'js',
      use: [
        {
          loader: 'babel-loader'
        }
      ]
    })
  ]
}
```

### 六、 内置优化
1. tree-shakeing
> 作用为去除无用代码
es6模块会把结果放到default上  
用import可以直接引用，但是用require的话需要增加default 如a.default.sum
```js
// a.js
export const sum = (x, y) => {
  return x+y
}
export const minus = (x, y) => {
  return x-y
}
// app.js
import a from './a.js'
a.sum // 可以使用
// 打包时不会加载minux方法

const a = require('./a.js')
a.sum // 会报错， 
a.default.sum  // 正确
// 打包时会加载minux方法
```
2. 作用域提升
```js
let a = 1
let b = 2
let c = 3
let d = a+b+c 
console.log(d)
```
打包的时候，会减去abc这些的定义，简化代码

3. splitChunks 分离公共模块
```js
  module.exports = {
    optimzation: {
      splitChunks:{
        cacheGroups: { // 缓存组
          common: {
            chunks: 'initial', // 初始位置
            minSize: 0, // 引用大小
            minChunks: 2 // 引用次数
          }，
          vendor:{
            priority: 1, // 权重
            test: /node_modules/, // 匹配规则
            chunks: 'initial', // 初始位置
            minSize: 0, // 引用大小
            minChunks: 2 // 引用次数
          }
        }
      }
    }
  }

```

### 七、懒加载
```js
let btn = document.createElement('button')
btn.innerHtml = '点我'
btn.addEventListener('click', function(){
  // 需要支持，默认不支持这样的写法，import需要写在顶层
  // 返回promise
 import('./source.js').then(data => {
   console.log(data.default)
 }) 
})
document.body.apppendChild(btn)
```

### 八、热更新
```js

module.exports ={
  plugins: [
    new webpack.NameModulesPlugin(), // 打印更新的模块路径
    new webpack.HotModuleReplacementPlugin() // 热更新插件
  ]
}

