## 手写promise
> 一个函数里包含两个函数，执行成功或者失败函数把值存入，更改状态，在原型对象上then方法中，包含了2个函数，更加状态分别执行这2个函数

```js
  function myPromise (constructor) {
  let self = this
  self.status = 'pending'
  self.value = undefined
  self.reason = undefined
  function resolve (value) {
    if (self.status === 'pending') {
      self.value = value
      self.status = 'resolved'
    }
  }
  function reject (reason) {
    if (self.status === 'pending') {
      self.reason = reason
      self.status = 'rejected'
    }
  }
  try {
    constructor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}
// 链式调用
myPromise.prototype.then = function (onFullfilled, onRejected) {
  let self = this
  switch (self.status) {
    case 'resolved':
      onFullfilled(self.value)
      break;
    case 'rejected':
      onRejected(self.reason)
      break;
    default:
  }
}
// 测试
var p = new myPromise((resolve, reject) => {
  resolve(1)
  // reject('error')
})
p.then((res) => {
  console.log('res', res)
}, (reason) => {
  console.log('reason', reason)
})
```
