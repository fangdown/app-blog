## 模块化
![](https://segmentfault.com/img/bVkONe)

### 什么是模块
> 实现特定功能的文件

### 为什么要模块化
> 模块开发需要遵循一定的规范，否则就乱套了

### 规范
使用define定义模块，使用require调用模块
现在的规范有AMD/CMD/CommonJs

### CommonJs规范

一个单独的文件就是一个模块，每一个模块都是一个单独的作用域，也就是说模块内部定义的变量，无法被其他模块读取，除非定义为global对象的属性。
输出模块变量的最好方法是使用module.exports对象。默认是空对象{}
```js
// 例1
// plus.js
function plus(a, b){
  return a + b
}
module.exports = plus // 直接返回一个函数
module.exports.plus = plus // 返回一个对象

// 调用
var plus = require(./plus)
plus(1, 2)
var plus = require(./plus)
plus.plus(1, 2)
// webpack中是不是有很多这样的呢，熟悉吗
```
> exports 和module.exports的区别
> exports是module.exports的引用，算是简写吧
> 如果该写了exports=xxx，则和module.exports 没有关系了，不建议这样写

```js
// plus.js
function plus(a, b){
  return a + b
}
exports.plus = plus
// 等同于
module.exports.plus = plus

// eq
// index.js
var something = require('./requireMe')
something()
// requireMe.js
exports.someting = function(){
  console.log('i am function')
}
// TypeError: something is not a function
// 修正index.js
// something.something()
// 或修正requireMe
module.exports = function(){
  console.log('i am function')
}
```

### AMD规范
> require.js使用的场景
>（1）实现js文件的异步加载，避免网页失去响应；
>（2）管理模块之间的依赖性，便于代码的编写和维护
```js
/**
 * @param id 模块名，非必须
 * @param dependencies 依赖模块，默认为['require', 'exports', 'module']
 * @param factory 工厂方法。模块初始化要执行的函数和对象，如果是函数，应该只被执行一次，如果为对象，此对象应该为模块的输出值
 **/
define(id? dependencies? factory)
```
- 实例
```js
// math.js
define(['jquery'], function($){ // 引入jQuery模块
  return {
    add: function(x, y){
      return x + y
    }
  }
})
require(['math'], function(math){
  var sum = math.add(5, 1)
})

```
- 没有依赖
```js
define(function(){
  return {
    add: function(x, y){
      return x + y
    }
  }
})
```
### CMD规范
```js
define(factory);

define(function(require, exports, module) {

  // 模块代码

});
```
- 实例
```js
// math.js
define(function(require, exports, module){
  function add(x, y){
    return x + y
  }
  exports.add = add
})
// main.js
define(function(require, exports, module){
  var sum = require('./math.js').add(5, 1)
})
```

- AMD:API根据使用范围有区别，但使用同一个api接口
- CMD:每个API的职责单一