## 实现柯里化

```js
  // 普通函数
  function add(x, y, z){
    return x+ y + z
  }
  // 柯里化后
  function add(x, y, z){
    return function(x){
      return function(y){
        return function(z){
          return x+y+z
        }
      }
    }
  }
```

### 通用版
```js
function curry(fn){
  //第一个参数是基础执行方法，slice切除
  var args=Array.prototype.slice.call(arguments,1);
  //直接返回匿名函数
  return function(){
      //slice新参数以便能调用concat
      var innerArgs=Array.prototype.slice.call(arguments);
      //将配置的参数和新传入的参数合并
      var finalArgs=args.concat(innerArgs);
      return fn.apply(null,finalArgs);
  };
}
```
## 实现柯里化