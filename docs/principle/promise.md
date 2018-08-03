 ## 手动实现promise
 ```js
//  达到效果
function fn1(resolve, reject){
  setTimeout(function(){
    console.log('步骤一：执行');
    resolve('1')
  },100)
}
function fn2(resolve, reject){
  setTimeout(function(){
    console.log('步骤二：执行');
    resolve('2')
  },100)
}
new Promise(fn1)
.then(function(val){
  console.log(val)
  return new Promise(fn2)
}).then(function(val){
  console.log(val)
  return 33
}).then(function (val){
  console.log(val)
})
 ```
1. 初步构建
   ```js
   function Promise(fn){
      var callback;
      this.then = function(done){
        callback = done;
      }
      function resolve(){
        callback()
      }
      fn(resolve);
   }
  //  流程 fn执行 resolve执行 callback执行，then中的done执行
   ```
2. 加入链式
   ```js
   function Promise(fn){
      var promise = this,
         value = null;
         promise._resolves = [];
      this.then = function(onFulfilled){
        promise._resolves.push(onFulfilled);
        return this
      }
      function resolve(value){
        promise._resolves.forEach(function(callback){
          callback(value)
        })
      }
   }
   ```
  - promise = this,这样我们不用担心某个时刻this指向突然改变
  - 调用then方法，将回调放入promise._resolves队列
  - 创建Promise对象同时，调用其fn，并传入resolve方法，当fn的异步操作执行完成后，就执行resolve，页就是执行promise._resolves队列中的回调
  - resolve方法接受一个参数，即异步操作返回的结果，方便传值
  - then方法中的return this 实现了链式调用

3. [手把手教你实现一个完整的 Promise](https://www.cnblogs.com/huansky/p/6064402.html)
