## call-apply-bind

### 实现call
```js
  Function.prototype.call = function(obj){
    var obj = obj || window;
    obj.fn = this;
    var args = [];
    var result;
    for(var i = 0; i<arguments.length; i++){
      args.push('arguments['+i+']');
    }
    result = eval('obj.fn('+args+')');
    delete obj.fn;
    return result;
  }
```
### 实现apply
```js
  Function.prototype.apply = function(obj, arr){
    var obj = obj || window;    
    obj.fn = this;
    var result;
    if(!arr){
      result = obj.fn();
    }
    var args = [];
    for(var i = 0; i < arr.length; i++){
      args.push('arr['+i+']');
    }
    result = eval('obj.fn('+args+')');
    delete obj.fn;    
    return result;
  }
```
### 实现bind
* 返回一个函数
```js
  Function.prototype.bind = function(obj){
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var self = this;
    var fNOP = function () {};
    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
        // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
        // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
  }
```