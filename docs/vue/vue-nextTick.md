## nextTick原理分析
Vue中的nextTick涉及到Vue中DOM的异步更新，感觉很有意思，特意了解了一下。其中关于nextTick的源码涉及到不少知识，很多不太理解，暂且根据自己的一些感悟介绍下nextTick。
### 示例
先来一个示例了解下关于Vue中的DOM更新以及nextTick的作用。

```html
//模板
<div class="app">
  <div ref="msgDiv">{{msg}}</div>
  <div v-if="msg1">Message got outside $nextTick: {{msg1}}</div>
  <div v-if="msg2">Message got inside $nextTick: {{msg2}}</div>
  <div v-if="msg3">Message got outside $nextTick: {{msg3}}</div>
  <button @click="changeMsg">
    Change the Message
  </button>
</div>
```
```js
new Vue({
  el: '.app',
  data: {
    msg: 'Hello Vue.',
    msg1: '',
    msg2: '',
    msg3: ''
  },
  methods: {
    changeMsg() {
      this.msg = "Hello world."
      this.msg1 = this.$refs.msgDiv.innerHTML
      this.$nextTick(() => {
        this.msg2 = this.$refs.msgDiv.innerHTML
      })
      this.msg3 = this.$refs.msgDiv.innerHTML
    }
  }
})
// 点击后Message got outside $nextTick: Hello Vue.
// 点击后Message got outside $nextTick: Hello world.
// 点击后Message got outside $nextTick: Hello Vue.
// msg1和msg3显示的内容还是变换之前的，而msg2显示的内容是变换之后的。其根本原因是因为Vue中DOM更新是异步的（详细解释在后面）。
```
### 应用场景
下面了解下nextTick的主要应用的场景及原因：

1. 在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中。

　　因为在created()钩子函数执行的时候 DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。与之对应的就是mounted()钩子函数，因为该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题 。

2. 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进Vue.nextTick()的回调函数中。

　　具体原因在Vue的官方文档中详细解释：

　　Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部尝试对异步队列使用原生的 Promise.then 和MessageChannel，如果执行环境不支持，会采用 setTimeout(fn, 0)代替。

　　例如，当你设置vm.someData = 'new value'，该组件不会立即重新渲染。当刷新队列时，组件会在事件循环队列清空时的下一个“tick”更新。多数情况我们不需要关心这个过程，但是如果你想在 DOM 状态更新后做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员沿着“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们确实要这么做。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。
### nextTick源码浅析
作用：Vue.nextTick用于延迟执行一段代码，它接受2个参数（回调函数和执行回调函数的上下文环境），如果没有提供回调函数，那么将返回promise对象。
源码：

```js
export const nextTick = (function () {
  const callbacks = []
  let pending = false
  let timerFunc

  function nextTickHandler() {
    pending = false;
    /*
     之所以要slice复制一份出来是因为有的cb执行过程中又会往callbacks中加入内容，比如$nextTick的回调函数里又有$nextTick，
     那么这些应该放入到下一个轮次的nextTick去执行，所以拷贝一份，遍历完成即可，防止一直循环下去。
     */
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
      copies[i]()
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  /*
  nextTick行为利用了microtask队列, 先使用 Promise.resolve().then(nextTickHandler)来将异步回调
  放入到microtask中，Promise 和 MutationObserver都可以使用，但是 MutationObserver 在IOS9.3以上的
  WebView中有bug，因此如果满足第一项的话就可以执行，如果没有原生Promise就用 MutationObserver。
  */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve()
    var logError = err => { console.error(err) }
    timerFunc = () => {
      p.then(nextTickHandler).catch(logError)
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) setTimeout(noop)
    }
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    /*
     创建一个MutationObserver，observe监听到DOM改动之后执行的回调 nextTickHandler 
     */
    var counter = 1
    var observer = new MutationObserver(nextTickHandler)
    var textNode = document.createTextNode(String(counter));
    // 使用MutationObserver的接口，监听文本节点的字符内容
    observer.observe(textNode, {
      characterData: true
    });
    /*
     每次执行timerFunc函数都会让文本节点的内容在0/1之间切换，切换之后将新赋值到那个我们MutationObserver监听的文本节点上去。
     */
    timerFunc = () => {
      counter = (counter + 1) % 2
      textNode.data = String(counter)
    }
  } else {
    // fallback to setTimeout
    /*
     如果上面的两种都不支持的话，我们就使用setTimeout来执行
     */
    timerFunc = () => {
      setTimeout(nextTickHandler, 0)
    }
  }

  return function queueNextTick(cb?: Function, ctx?: Object) {
    let _resolve
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
    });
    /* 如果pending为true，表明本轮事件循环中已经执行过 timerFunc(nextTickHandler, 0) */
    if (!pending) {
      pending = true
      timerFunc()
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        _resolve = resolve
      })
    }
  }
})()
``` 
首先，先了解nextTick中定义的三个重要变量。

- callbacks：用来存储所有需要执行的回调函数
- pending：用来标志是否正在执行回调函数
- timerFunc：用来触发执行回调函数
```js
var callbacks = [];   // 缓存函数的数组
var pending = false;  // 是否正在执行
var timerFunc;  // 保存着要执行的函数

```
接下来，了解nextTickHandler()函数。
```js
function nextTickHandler () {
  pending = false;
  //  拷贝出函数数组副本
  var copies = callbacks.slice(0);
  //  把函数数组清空
  callbacks.length = 0;
  // 依次执行函数
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}
```
这个函数就是$nextTick内实际调用的函数。

　　接下来，是vue分了三种情况来延迟调用以上这个函数，因为$nextTick目的就是把传进来的函数延迟到dom更新后再使用，所以这里依次优雅降序的使用js的方法来做到这一点。

1. 先判断是否原生支持promise，如果支持，则利用promise来触发执行回调函数；
```js
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  var logError = function (err) { console.error(err); };
  timerFunc = function () {
    p.then(nextTickHandler).catch(logError);
    if (isIOS) { setTimeout(noop); }
  };
}
```
如果浏览器支持Promise，那么就用Promise.then的方式来延迟函数调用，Promise.then方法可以将函数延迟到当前函数调用栈最末端，也就是函数调用栈最后调用该函数。从而做到延迟。
2. 否则，如果支持MutationObserver，则实例化一个观察者对象，观察文本节点发生变化时，触发执行所有回调函数。
```js
else if (typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {

  var counter = 1;
  var observer = new MutationObserver(nextTickHandler);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
}
```
MutationObserver是h5新加的一个功能，其功能是监听dom节点的变动，在所有dom变动完成后，执行回调函数。

具体有以下几点变动的监听

childList：子元素的变动
attributes：属性的变动
characterData：节点内容或节点文本的变动
subtree：所有下属节点（包括子节点和子节点的子节点）的变动
　　可以看出，以上代码是创建了一个文本节点，来改变文本节点的内容来触发的变动，因为我们在数据模型更新后，将会引起dom节点重新渲染，所以，我们加了这样一个变动监听，用一个文本节点的变动触发监听，等所有dom渲染完后，执行函数，达到我们延迟的效果。

3. 如果都不支持，则利用setTimeout设置延时为0
```js
else {
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }
```
利用setTimeout的延迟原理，setTimeout(func, 0)会将func函数延迟到下一次函数调用栈的开始，也就是当前函数执行完毕后再执行该函数，因此完成了延迟功能。

　　最后是queueNextTick函数。因为nextTick是一个即时函数，所以queueNextTick函数是返回的函数，接受用户传入的参数，用来往callbacks里存入回调函数。
```js
return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) { cb.call(ctx); }
      if (_resolve) { _resolve(ctx); }
    });
    // 如果没有函数队列在执行才执行
    if (!pending) {
      pending = true;
      timerFunc();
    }
    // promise化
    if (!cb && typeof Promise !== 'undefined') {
      console.log('进来了')
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }
```
这个return的函数就是我们实际使用的闭包函数，每一次添加函数，都会想callbacks这个函数数组入栈。然后监听当前是否正在执行，如果没有，执行函数。这个很好理解。下面一个if是promise化。
```js

this.$nextTick(function () {

})
// promise化
this.$nextTick().then(function () {

}.bind(this))

```
　以上代码中第二种写法我们不常见把，直接调用$nextTick函数然后用promise格式去书写代码，不过这个then里面需要手动绑定this，vue内部没有给做处理。

　　这就是一个this.$nextTick的实现，其中利用了优雅降序的巧妙手法，使代码尽可能优化。而且还提供了promise的写法，虽然我们不经常用，但是有总比没有好。

> 总结一下思路： 
> 自执行函数nextTick ---> 定义nextTickHandler---> 分promise,mutationObeserver定义timerFunc ---> 执行timerFunc
[参考文章](https://www.cnblogs.com/goloving/p/9404643.html)