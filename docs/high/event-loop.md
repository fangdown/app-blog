## 事件循环机制
### 骨架
1. 宏任务 
setTimeout/setInterval,全局环境、浏览器操作、IO文件读取、UI渲染
2. 微任务 
promise、process.nextTick、Object.observer、MutationObserver

### 循环机制
1. 进入script代码块，首先进入一个大的宏任务中
2. 执行上下文栈，代码顺序执行
3. 先执行同步任务，遇到异步任务
4. 异步任务分2种，宏任务和微任务
5. 同步任务执行完成之后，再去异步队列中看看是否有完成的，先看微任务里的任务，如果有完成的就执行，如果微任务里的都执行完了，再执行宏任务中的任务

> promise 是立即执行的， resolve是微任务，它完成之后再从队列中弹出
> async返回的是一个promise，也是立即执行

![](https://upload-images.jianshu.io/upload_images/10054724-e9263015ee65d929.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700)