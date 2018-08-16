## nextTick原理分析
nextTick 可以让我们在下次 DOM 更新循环结束之后执行延迟回调，用于获得更新
后的 DOM。
在 Vue 2.4 之前都是使用的 microtasks，但是 microtasks 的优先级过高，在某
些情况下可能会出现比事件冒泡更快的情况，但如果都使用 macrotasks 又可能会出现
渲染的性能问题。所以在新版本中，会默认使用 microtasks，但在特殊情况下会使用
macrotasks，比如 v-on。
对于实现 macrotasks ，会先判断是否能使用 setImmediate ，不能的话降级为
MessageChannel ，以上都不行的话就使用 setTimeout
```js

if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else if (
  typeof MessageChannel !== 'undefined' &&
  (isNative(MessageChannel) ||
    // PhantomJS
    MessageChannel.toString() === '[object MessageChannelConstructor]')
) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage(1)
  }
} else {
  /* istanbul ignore next */
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
// nextTick 同时也支持 Promise 的使用，会判断是否实现了 Promise
export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve
  // 将回调函数整合进一个数组中
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    if (useMacroTask) {
      macroTimerFunc()
    } else {
      microTimerFunc()
    }
  }
  // 判断是否可以使用 Promise
  // 可以的话给 _resolve 赋值
  // 这样回调函数就能以 promise 的方式调用
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```
### 示例

```js
showsou(){
  this.showit = true //修改 v-show
  document.getElementById("keywords").focus()  //在第一个 tick 里，获取不到输入框，自然也获取不到焦点
}

showsou(){
  this.showit = true
  this.$nextTick(function () {
    // DOM 更新了
    document.getElementById("keywords").focus()
  })
}
``` 
[](https://segmentfault.com/img/bV17xC?w=423&h=512)