## new
* new是关键字，所以不能用Function.prototype.new 来实现
```js
  function createNew(Foo){
    var obj = {}
    var constructor = [].shift.call(arguments, 1);
    obj.__proto__ = constructor.prototype;
    var ret = constructor.apply(obj, arguments);
    typeof ret === 'object' ? return ret || obj : return obj;
  }
  // var a = new Foo();
  var a = createNew(Foo)

```
