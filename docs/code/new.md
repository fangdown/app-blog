## 实现new 操作符

```js
  function NewFunc(func){
    if(typeof func !== 'function') throw TypeError('这不是一个函数')
    let res = {}
    res._proto_ = func.prototype
    let ret = func.apply(res, Array.prototype.slice.call(arguments, 1))
    // 对象或函数 返回执行结果
    if((['object', 'function'].indexOf(typeof ret) > -1) && ret !==null ){
      return ret
    }
    // 否则返回挂在了函数原型对象的新对象
    return res
  }
  // 测试
  function add(x,y){
    return x + y
  }
  function add2(x, y){
    return {
      a: x,
      b: y
    }
  }
  function add3(x, y){
    return function(){
      return x+y
    }
  }
  var a = NewFunc(add, 1, 2) 
  var b = NewFunc(add2, 1, 2) 
  var c = NewFunc(add3, 1, 2) 
  console.log('a', a) // {_proto_: {…}}
  console.log('b', b) // {a: 1, b: 2}
  console.log('c', c) // function(){}
```