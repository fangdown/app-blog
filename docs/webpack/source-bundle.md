## 源码-bundle解析

### 生成的bundle结构
```js
// 匿名自执行函数
// 传入的参数为构建对象，key为文件路径，value为一个函数
(function(modules){
  // do something
})({
  './src/index.js': (function(module, exports) {
      eval("\r\nconsole.log('webpack4学习')\n\n//# sourceURL=webpack:///./src/index.js?");
    })
})

```
### 数据流程
1. 匿名函数执行，传入模块对象参数
2. 执行__webpack_require__方法，参数为传入的key
3. 返回执行的结果
```js
// 精简代码
 (function(modules) { // webpackBootstrap
 	// The module cache
 	var installedModules = {};
 	function __webpack_require__(moduleId) {
 		// Check if module is in cache 检查是否有缓存
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		// Create a new module (and put it into the cache)
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};
 		// Execute the module function  执行函数
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
 		// Flag the module as loaded
 		module.l = true;
 		// Return the exports of the module 返回结果
 		return module.exports; 
 	}
 	// Load entry module and return exports
 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
 })
/**********传入对象 key是路径， 值是函数***************************/
 ({
   "./src/index.js":(function(module, exports) {
      eval("\r\nconsole.log('webpack4学习')\n\n//# sourceURL=webpack:///./src/index.js?");
    })
  });
 ```
### 多个依赖
假设index.js 引入了a模块，那么是什么样子的呢
区别：
1. 入参不同，对象中多了一个属性a.js
2. index.js调用了__webpack_require__方法去执行a.js,并得到结果
```js
{
 "./src/a.js": (function(module, exports) {
    eval("module.exports = {\r\n  name: 'fang'\r\n}\n\n//# sourceURL=webpack:///./src/a.js?");
    }),
 "./src/index.js":(function(module, exports, __webpack_require__) {
    eval("const a = __webpack_require__(/*! ./a.js */ \"./src/a.js\")\r\nconsole.log('webpack4学习')\r\nconsole.log(a.name)\n\n//# sourceURL=webpack:///./src/index.js?");
    })
}
```