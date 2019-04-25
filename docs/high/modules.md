## 模块化
![](https://segmentfault.com/img/bVkONe)

### 什么是模块
> 实现特定功能的文件

### 为什么要模块化
> 模块开发需要遵循一定的规范，否则就乱套了

### 规范
使用define定义模块，使用require调用模块
现在的规范有AMD/CMD/CommonJs

### es6模块和node模块区别
> require: node 和 es6 都支持的引入  
> export / import : 只有es6 支持的导出引入   
> module.exports / exports: 只有 node 支持的导出  
1. import 导入需前置，放在代码顶部，且是提前加载
2. require 导入可以在需要的时候导入
3. es6模块最终经过babel转化成commonjs规范
### CommonJs规范
一个单独的文件就是一个模块，每一个模块都是一个单独的作用域，也就是说模块内部定义的变量，无法被其他模块读取，除非定义为global对象的属性。
输出模块变量的最好方法是使用module.exports对象。默认是空对象{}
```js
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
// index.js
var something = require('./requireMe')
something()
exports.someting = function(){
  console.log('i am function')
}
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

### es6 import和require用法和区别

加载方式 | 规范| 命令| 特点
-| -| -|-|
运行时加载 | CommonJS/AMD | require | 社区方案，提供了服务器/浏览器的模块加载方案。非语言层面的标准。只能在运行时确定模块的依赖关系及输入/输出的变量，无法进行静态优化。
编译时加载 | ESMAScript6+	 | import	 | 语言规格层面支持模块功能。支持编译时静态分析，便于JS引入宏和类型检验。动态绑定。
[参考](https://blog.csdn.net/DimaLLJ/article/details/78384875 )