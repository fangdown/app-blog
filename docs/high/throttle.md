##节流
>与防抖不同的是，节流是延迟多少秒执行一次，防抖是不动了之后延迟多少秒再执行一次
实现起来有2种思路
- 时间戳
- 定时器

### 时间戳
```js
 // 时间戳 缺点最后一次存在不执行的情况
  function throttle1(func, wait){
    var previous = 0;
    var args;
    var context;
    return function(){
      var now = +new Date(); //+转数字
      var remaining = wait - (now - previous) 
      if(remaining < 0){
        args = arguments;
        context = this;
        func.apply(context,args);
        previous = now;
      }
    }
  }
  // 定时器 
  // 缺点是刚开始要延迟n秒再执行
  function throttle2(func, wait){
    var timeout;
    var args;
    var context;
    return function(){
      if(!timeout){
        args = arguments;
        context = this;
        timeout = setTimeout(function(){
          func.apply(context, args)
          timeout = null;
        }, wait);
      }
    }
  }
  // 结合优化
  function throttle3(func, wait){
    var timeout, args, context;
    var previous = 0;
    return  function(){
      var now = +new Date();
      context = this;
      args = arguments;
      var remaining = wait - (now - previous);
      if(remaiing < 0){ // 先判断时间戳
        if(timeout){
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        func.apply(context, args)
      } else if(!timeout){ // 再判断定时器
        timeout = setTimeout(function(){
          func.apply(context, args);
          timeout = null;
          previous = +new Date();
        }, remaining);
      }
    }
  }
```