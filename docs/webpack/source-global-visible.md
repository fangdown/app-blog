## 源码-全局变量

### 全局jquery
```js
import $ from 'jquery'

console.log('$', $) // jQuery(selector, context) {}
console.log('window.$', window.$) // undefined

```
> 这个时候并没有暴露给window，因为是匿名函数

### 暴露方法
1. expose
```js 
import $ from 'expose-loader?$!jquery'

console.log('$', $) // jQuery(selector, context) {}
console.log('window.$', window.$) // jQuery(selector, context) {}
```

或者
```js
module:{
  rules: [
    {
      test: require.resolve('jquery'),
      use: 'expose?$!jquery'
    }
  ]
}
```
2. ProvidePlugin 每个模块注入$
```js
 new webpack.ProvidePlugin({
  $: 'jquery'
})
```

3. 在src中引入外链,工程中引入，不打包
```js
// 排除打包
extenals:{
  jquery: '$'
}
```