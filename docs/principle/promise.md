 ## 手动实现promise
[示例](../demo/promise/promise.html)
 
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
1. 初步构建-状态
   ```js
   function Promise(fn){
      let _ = this;
      _.value = undefined;
      _.reason = undefined;
      _.state = 'pending';
      function resolve(value){
        _.value = value;
        _.state = 'fulfilled';
      }
      function reject(reason){
        _.reason = reason;
        _.state = 'rejected'
      }
      fn(resolve, reject)
   }
    //e.g
    let Iagree=new Promise((resolve,reject)=>{
        resolve("我开心就同意了");//
    })
    let Idisagree=new Promise((resolve,reject)=>{
        reject("我不开心就拒绝了");
    })
   ```
2. 添加then函数
   ```js
    Promise.prototype.then = function(onFulfilled, onRejected){
      let _ = this;
      if(_.state === 'pending'){}
      if(_.state === 'fulfilled'){
        onFulfilled(_.value)
      }
      if(_.state === 'rejected'){
        onRejected(_.reason)
      }
    }
    let Iagree = new Promise((resolve, reject) => {
      resolve('我开心就同意了')
    })
    Iagree.then((data) => {
      console.log(data)
    })
   ```
3. 实现异步执行
```js
  function Promise(fn){
    let _ = this;
    _.value = undefined;
    _.reason = undefined;
    _.state = 'pending';
    _.resolveCallbacks = [];
    _.rejectCallbacks = [];
    function resolve(value){
      _.value = value;
      _.state = 'fulfilled';
      _.resolveCallbacks.forEach((cb) => cb());
    }
    function reject(reason){
      _.reason = reason;
      _.state = 'rejected'
       _.rejectCallbacks.forEach((cb) => cb());
    }
    fn(resolve, reject)
  }
  Promise.prototype.then = function(onFulfilled, onRejected){
      let _ = this;
      if(_.state === 'pending'){
        _.resolveCallbacks.push(()=>{
          onFulfilled(_.value)
        })
        _.rejectCallbacks.push(()=>{
          onRejected(_.value)
        })
      }
      if(_.state === 'fulfilled'){

        onFulfilled(_.value)
      }
      if(_.state === 'rejected'){
        onRejected(_.reason)
      }
    }
    // eg
    let Iagree=new Promise((resolve,reject)=>{
      setTimeout(()=>{
          resolve("我开心就同意了");
      },1000)
    })
    Iagree.then((data)=>{
        console.log(Iagree.state)
    },(e)=>{
        console.log(e)
    })
    Iagree.then((data)=>{
        console.log(Iagree.state+1)
    },(e)=>{
        console.log(e)
    })

```
4. 链式调用
```js
  Iagree.then((data)=>{
      ...
  }).then((data)=>{
      ...
  }).then((data)=>{
      ...
  })
  // 判断x是否是promise，如果是则继续遍历
  function resolvePromise(promise,x,resolve,reject){
    //如果x可能是一个promise
    if(x!==null&&(typeof x==="object"||typeof x==="function")){ 
        let then=x.then;
        //如果x是一个promise，因为promise都要有then函数的
        if(typeof then === "function"){
            //y表示x这个promise的值
            then.call(x,y=>{
                //继续遍历，直至返回值不是promise
                resolvePromise(promise,y,resolve,reject)
            },err=>{
                reject(err)
            })
        }else{
            //如果x是个普通对象，直接运行
            resolve(x)
            }
    }else{
        //如果x不是一个promise，也就是x是一个常量，直接运行
        resolve(x)
    }
}
Promise.prototype.then=function(onFulfilled, onRejected){
    let _=this;
    let promise2;
    //将当前promise的值传递到下一次then的调用中
    function resolveFunction(promise,resolve,reject){
        let x=onFulfilled(_.value)
        resolvePromise(promise,x,resolve,reject)
    }
    function rejectFunction(promise,resolve,reject){
        let x=onRejected(_.reason)
        resolvePromise(promise,x,resolve,reject)
    }
    promise2=new Promise((resolve,reject)=>{
        if(_.state=="pending"){
            //把回调方法塞进队列中
            _.resolveCallbacks.push(()=>{
                resolveFunction(promise2,resolve,reject)
            })
            _.rejectCallbacks.push(()=>{
                rejectFunction(promise2,resolve,reject)
            })
        }
        if(_.state=="fulfilled"){
            resolveFunction(promise2,resolve,reject)
        }
        if(_.state=="rejected"){
            rejectFunction(promise2,resolve,reject)
        }
    })
    return promise2
}


//e.g
let Iagree=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("我开心就同意了");
    },1000)
})

//为了防止多次then，所以回调方法需要丢入队列中，防止方法被覆盖。
Iagree.then((data)=>{
    console.log(data)
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("看心情干活");
        },1000)
    })
}).then((data)=>{
    console.log("前方返回一个promise："+data)
    return data+"，我是一个常量"
}).then((data)=>{
    console.log("常量返回："+data)
}).then((data)=>{
    console.log("前方无法返回："+data)
})
```
> 如果想要这样写，那么上一步的then必须返回一个promise对象才可以，不然哪里变出一个then方法。因此我们需要在then中new一个新的promise，用于下一个链式调用的then。
```js


````

  - promise = this,这样我们不用担心某个时刻this指向突然改变
  - 调用then方法，将回调放入promise._resolves队列
  - 创建Promise对象同时，调用其fn，并传入resolve方法，当fn的异步操作执行完成后，就执行resolve，页就是执行promise._resolves队列中的回调
  - resolve方法接受一个参数，即异步操作返回的结果，方便传值
  - then方法中的return this 实现了链式调用

1. [PROMISE的原理](https://juejin.im/post/5b66f2935188251afc259f45)
