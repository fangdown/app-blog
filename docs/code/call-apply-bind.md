## 实现call-apply-bind

### 实现call
```js
  Function.prototype.call2 = function(obj){
    if(typeof this !== 'function'){
      throw new TypeError('error')
    }
    obj = obj || window
    // 假设obj本身有一个fn属性，这里为的就是避免覆盖原有的
    const { fn } = obj
    console.log('fn', fn)
    obj.fn = this
    const args = [...arguments].slice(1)
    const result = obj.fn(...args)
    obj.fn = fn
    return result
  }
  // 以下是测试代码
  function test(arg1, arg2) {
    console.log(arg1, arg2)
    console.log(this.a, this.b)
  }

  test.call2({
    a: 'a',
    b: 'b'
  }, 1, 2)
```
### 实现apply
```js
  Function.prototype.apply = function(obj,arr){
    if(typeof this !== 'funciton'){
      throw new TypeError('error')
    }
    obj = obj || window
    const { fn } = obj
    obj.fn = this
    let result 
    if(Array.isArray(arr)){
      result = obj.fn(...arr)
    } else {
      result = obj.fn()
    }
    return result
  }
```
### 实现bind
* 返回一个函数
```js
  Function.prototype.bind2 = function(obj){
    if(typeof this !== 'function'){
      throw new TypeError('error')
    }
    const that = this
    const args  = [...arguments].slice(1)
    return function F(){
      // 如果被new创建实例，不会被改变上下文！
      if(this instanceof F){
        return new that(...args, ...arguments)
      }
      return that.apply(obj, args.concat(...arguments))
    }
  }
  function test(arg1, arg2) {
  console.log(arg1, arg2)
  console.log(this.a, this.b)
}

const test2 = test.bind2({
  a: 'a',
  b: 'b'
}, 1) // 参数 1

test2(2) // 参数 2
```