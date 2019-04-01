## 防抖
>思路： 全局定义一个计时器， 返回一个函数， 如果有计时器就清除， 再重新第一个计时器.
> 注意点： this， apply
> 触发事件： scoll、resize、mouseover、mousedown等
```js
  function debounce(func, wait){
    var timeout;
    return function(){
      if(timeout){
        clearTimeout(timeout);
      }
      var that = this;
      var args = arguments;
      timeout = setTimeout(function(){
        func.apply(that, args)
      }, wait)
    }
  }
```