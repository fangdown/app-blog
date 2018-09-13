## 编写loader
> loader 就是一个node模块，它输出了一个函数。当某种资源需要用这个loader转换时，这个函数会被调用，并且这个函数可以通过提供给塔的this上下文访问Loader API。  

### 示例 reverse-txt-loader
```js
module.exports = function (src){
  var result = src.split('').reverse().join('');
  return `module.exports = ${result}`
}
// 使用

{
  test: /\.txt/,
  use: [
    {
      './path/reverse-txt-loader'
    }
  ]
}
```