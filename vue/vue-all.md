## vue知识汇总
1. <a href="#life">聊聊vue的生命周期（new Vue()做了什么）</a>
2. <a href="#defineprototype">聊聊vue的数据双向绑定</a>
3. <a href="nextTick">nextTick原理是什么</a>
4. <a href="message">vue组件通信方式有哪些</a>
5. <a href="vdom">聊聊vue中的virtualdom</a>
6. <a href="transition">vue-transition动画原理</a>
7. <a href="keepalive">keep-alive的原理</a>
8. <a href="computed&watch">computed 和 watch区别</a>
9.  <a href="arr&obj">vue数组/对象更新 视图不更新的原因？</a>
10. <a href="if&for">v-if和v-for谁的优先级更高</a>
11. <a href="scoped">组件样式不生效的原因</a>
12. <a href="vex">谈谈vuex的理解</a>
13. <a href="vdomQuick">Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法。</a>
14. <a href="vuexAsync">为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？</a>
15. <a href="if&show">v-if 和 v-show 指令有什么相同和不同</a>
16. <a href="class">动态绑定class的方法</a>
17. <a href="datastram">怎样理解单向数据流</a>
18. <a href="vmodel">自定义组件的语法糖 v-model 是怎样实现的</a>
19. <a href="routerHook">vue-router 有哪几种导航钩子</a>
20. <a href="render">理解Vue中的Render渲染函数</a>
21. <a href="slot"> slot插槽</a>
22. <a href="func"> 组件中data为什么是函数</a>


- <p id='life'>聊聊vue的生命周期</p>
  生命周期函数就是组件在初始化或者数据更新时会触发的钩子函数。 在初始化时，会调用以下代码，生命周期就是通过 callHook 调用的
```js
Vue.prototype._init = function (options) {
   //  建立父子组件关系，在当前实例上添加一些属性和生命周期标识。如：$children、$refs、_isMounted等。
  initLifecycle(vm)
  // 用来存放除@hook:生命周期钩子名称="绑定的函数"事件的对象。如：$on、$emit等。
  initEvents(vm) 
  // 用于初始化$slots、$attrs、$listeners
  initRender(vm) 
  // 拿不到 props data
  callHook(vm, 'beforeCreate') 
  // 初始化inject，一般用于更深层次的组件通信，相当于加强版子组件的props。用于组件库开发较多
  initInjections(vm)  
  // 是很多选项初始化的汇总，包括：props、methods、data、computed 和 watch 等。
  initState(vm) 
  //初始化provide
  initProvide(vm) 
  callHook(vm, 'created')
  // ...
  // 挂载实例
  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}
```
可以发现在以上代码中，beforeCreate 调用的时候，是获取不到 props 或者 data 中的数据的，因为这些数据的初始化都在 initState 中。 接下来会执行挂载函数

- <p id="defineprototype">聊聊vue的数据双向绑定</p>

> 核心的 API 是通过 Object.defineProperty() 来劫持各个属性的setter / getter，在数据变动时发布消息给订阅者，触发相应的监听回调
```js
//##################step6-订阅-观察者模式#######################
		/**
		构造函数
		属性是subs
		原型链上有2个方法 添加和提示
		*/
		function Dep(){
			this.subs = [];
		}
		Dep.prototype = {
			addSub: function(sub){
				this.subs.push(sub);
			},
			notify: function(){
				this.subs.forEach(function(sub){
					sub.update();
				console.log('sub', sub);
				})
			}
		}
		function Wathcher(vm, node, name){
			Dep.target = this;
			this.name = name;
			this.node = node;
			this.vm = vm;	
			this.update();
			Dep.target = null;
		}
		Wathcher.prototype = {
			update: function(){
				this.get();
				this.node.nodeValue = this.value;
			},
			get: function(){
				console.log('get---name', this.name)
				this.value = this.vm[this.name];
			}
		}
		function observe(obj, vm){
			Object.keys(obj).forEach(function(key){ // 循环对象得到key数组，循环执行
				defineReactive(vm, key, obj[key]); // 将属性挂载到vm上而不是data里
			})
		}
		function defineReactive(obj, key, val){ // obj 是vm， 和observe里的obj不一样
			var dep = new Dep(); // 类似于公众号官方， 每一个属性都是一个公众号
			Object.defineProperty(obj, key, {
				get: function (){
					if(Dep.target){
						dep.addSub(Dep.target) // watcher 实例
					}
					return val; // 很重要，不然vm中的该属性没有值
				},
				set: function(newVal){
					if(val === newVal) {return;}
					val = newVal;
					console.log('dep', dep);
					dep.notify();
				}
			});
		}
		function compile(node, vm){
			// console.log('vm-compile', vm);
			var reg = /\{\{(.*)\}\}/; // 括号里为分组
			if(node.nodeType === 1){
				var attr = node.attributes;
				for(var i = 0; i< attr.length; i++){
					if(attr[i].nodeName="v-model"){
						var name = attr[i].nodeValue;
						node.addEventListener('input', function(e){
							vm[name] = e.target.value;
						})
						node.value = vm[name]; // 可输入表单类型 值是value
						node.removeAttribute('v-model')
					}
				}
			}
			if(node.nodeType === 3){
				if(reg.test(node.nodeValue)){
					var name = RegExp.$1; // 第一个分组值
					name = name.trim();
					// node.nodeValue = vm[name]; // 文本类型 值为nodeValue
					new Wathcher(vm, node, name);
				}
			}
		}
		function nodeToFragment(node, vm){
			var flag = document.createDocumentFragment();
			var child;
			while(child = node.firstChild){
				// 经过compile之后 node不包含 v-model 及 {{}}
				compile(child, vm);
				flag.appendChild(child);
			}
			return flag;
		}
		function Vue(options){
			this.data = options.data;
			var id = options.el;
			var data = this.data;
			observe(data, this); // 监听data中的每个属性
			var dom = nodeToFragment(document.getElementById(id), this);
			document.getElementById(id).appendChild(dom);
		}
		var vm = new Vue({
			el: 'app',
			data: {
				text: 'hello defineProperty'
			}
		});
```

-<p id="nextTick">nextTick原理是什么</p>
利用事件循环机制，通过promise、MutationObserver、settimeout等选择一种方式将要执行的回调函数在DOM更新之后执行
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
- <p id="message">vue组件通信方式有哪些</p>
```
1. props
2. $attrs/$listeners
3. 依赖注入provide inject
4. ref、parent、children
5. emit on off
6. eventbus
7. vuex
```

  [参考](https://juejin.im/post/5c776ee4f265da2da53edfad)

- <p id="vdom">聊聊vue中的virtualdom</p>
1. 创建虚拟DOM  
2. 渲染虚拟DOM 
3. 调用render方法将虚拟DOM转化成真实DOM
4. DOM-diff比较两个虚拟DOM的区别，也就是在比较两个对象的区别。
5. 比较规则
- 新的DOM节点不存在{type: 'REMOVE', index}
- 文本的变化{type: 'TEXT', text: 1}
- 当节点类型相同时，去看一下属性是否相同，产生一个属性的补丁包{type: 'ATTR', attr: {class: 'list-group'}}
- 节点类型不相同，直接采用替换模式{type: 'REPLACE', newNode}
6. patch补丁更新
- 属性ATTR
for in去遍历attrs对象，当前的key值如果存在，就直接设置属性setAttr； 如果不存在对应的key值那就直接删除这个key键的属性
- 文字TEXT
直接将补丁的text赋值给node节点的textContent即可
- 替换REPLACE
新节点替换老节点，需要先判断新节点是不是Element的实例，是的话调用render方法渲染新节点；
不是的话就表明新节点是个文本节点，直接创建一个文本节点就OK了。
之后再通过调用父级parentNode的replaceChild方法替换为新的节点
- 删除REMOVE
直接调用父级的removeChild方法删除该节点
```js
  import { createElement, render, renderDom } from './element';
// +++ 引入diff和patch方法
import diff from './diff';
import patch from './patch';
// +++

let virtualDom = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['周杰伦']),
    createElement('li', {class: 'item'}, ['林俊杰']),
    createElement('li', {class: 'item'}, ['王力宏'])    
]);

let el = render(virtualDom);
renderDom(el, window.root);

// +++
// 创建另一个新的虚拟DOM
let virtualDom2 = createElement('ul', {class: 'list-group'}, [
    createElement('li', {class: 'item active'}, ['七里香']),
    createElement('li', {class: 'item'}, ['一千年以后']),
    createElement('li', {class: 'item'}, ['需要人陪'])    
]);
// diff一下两个不同的虚拟DOM
let patches = diff(virtualDom, virtualDom2);
console.log(patches);
// 将变化打补丁，更新到el
patch(el, patches);
  ```
- <p id="transition">vue-transition动画原理</p>
1. 插入dom时，添加ade-enter、fade-enter-active样式，生效
2. fade-enter-active，fade-leave-active在动画消失后移除
3. 利用requestAnimationFrame在下一帧删除fade-enter样式
```html
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```
- <p id="keepalive">keep-alive的原理</p>
keep-alive 是 Vue.js 的一个内置组件。它能够不活动的组件实例保存在内存中，而不是直接将其销毁，它是一个抽象组件，不会被渲染到真实 DOM 中，也不会出现在父组件链中。

它提供了 include 与 exclude 两个属性，允许组件有条件地进行缓存。
```js
<keep-alive exclude="a">
  <component></component>
</keep-alive>

<keep-alive include="a">
  <component></component>
</keep-alive>
```
1. keep-alive 提供了两个生命钩子，分别是 activated 与 deactivated。  
因为 keep-alive 会将组件保存在内存中，并不会销毁以及重新创建，所以不会重新调用组件的 created 等方法，需要用 activated 与 deactivated 这两个生命钩子来得知当前组件是否处于活动状态。

2. created 钩子会创建一个 cache 对象，用来作为缓存容器，保存 vnode 节点。 遍历 cache 中的所有项，如果不符合 filter 指定的规则的话，则会执行 pruneCacheEntry。pruneCacheEntry 则会调用组件实例的$destroy 方法来将组件销毁。

3. Vue.js 内部将 DOM 节点抽象成了一个个的VNode 节点，keep-alive 组件的缓存也是基于 VNode 节点的而不是直接存储 DOM 结构。它将满足条件（ pruneCache 与 pruneCache ）的组件在 cache 对象中缓存起来，在需要重新渲染的时候再将 vnode 节点从 cache 对象中取出并渲染。

- <p id="computed&watch">computed 和 watch、methods区别</p>
1. 计算属性是自动监听依赖值的变化，从而动态返回内容，监听是一个过程，在监听的值变化时，可以触发一个回调，并做一些事情。
所以区别来源于用法，只是需要动态值，那就用计算属性；需要知道值的改变后执行业务逻辑，才用 watch，用反或混用虽然可行，但都是不正确的用法。
2. methods是一个方法，它可以接受参数，而computed不能，computed是可以缓存的，methods不会。
3. 当有一些数据需要随着另外一些数据变化时，建议使用computed。 当有一个通用的响应数据变化的时候，要执行一些业务逻辑或异步操作的时候建议使用watcher
- <p id="arr&obj">vue数组/对象更新 视图不更新的原因？</p>
> vue检测不到数组或对象的变化，因为它的引用地址未发生变化
+ 原因
  1. 数组和对象是引用型数据，直接修改里面的某个值，其引用地址并没有发生变化
+ 解决方法
  1. this.$set(你要改变的数组/对象，你要改变的位置/key，你要改成什么value)
  2. 使用原生方法push()/pop()/shift()/unshift()等
  3. 使用filter或map返回新数组替代

- <p id="if&for">v-if和v-for谁的优先级更高</p>
> v-if优先级更高， 所以不要同级使用避免重复计算
- <p id="scoped">组件样式不生效的原因</p>
> scope 不能给动态生成的样式生效，解决方法是去掉scoped

- <p id="vex">谈谈vuex的理解</p>
- <p id="vdomQuick">Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法。</p>
>
- <p id="vuexAsync">为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？</p>
  
- <p id="if&show">v-if 和 v-show 指令有什么相同和不同</p>
```
1. v-show和v-if的区别： v-show是css切换，v-if是完整的销毁和重新创建。
2. 使用 频繁切换时用v-show，运行时较少改变时用v-if
3. v-if=‘false’ v-if是条件渲染，当false的时候不会渲染
```
- <p id="class">动态绑定class的方法</p>
```
1. 对象方法 v-bind:class="{'orange': isRipe, 'green': isNotRipe}"
2. 数组方法  v-bind:class="[class1, class2]"
3. 行内 v-bind:style="{color: color, fontSize: fontSize+'px' }"
```
- <p id="datastram">怎样理解单向数据流</p>
> 这个概念出现在组件通信。父组件是通过 prop 把数据传递到子组件的，但是这个 prop 只能由父组件修改，子组件不能修改，否则会报错。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。
一般来说，对于子组件想要更改父组件状态的场景，可以有两种方案：
在子组件的 data 中拷贝一份 prop，data 是可以修改的，但 prop 不能

- <p id="vmodel">自定义组件的语法糖 v-model 是怎样实现的</p>
1. v-model 在模板编译的时候转换代码
2. v-model 本质是 :value 和 v-on，但是略微有点区别。在输入控件下，有两个事件监听，输入中文时只有当输出中文才触发数据赋值
3. v-model 和:bind 同时使用，前者优先级更高，如果 :value 会出现冲突
4. v-model 因为语法糖的原因，还可以用于父子通信
5. 
- <p id="routerHook">vue-router 有哪几种导航钩子</p>
```
<router-link to='home'> router-link标签会渲染为<a>标签，咋填template中的跳转都是这种；
另一种是编程是导航 也就是通过js跳转 比如 router.push('/home')
```

- <p id="render">理解Vue中的Render渲染函数</p>
> VUE一般使用template来创建HTML，然后在有的时候，我们需要使用javascript来创建html，这时候我们需要使用render函数。
render函数return一个createElement组件中的子元素存储在组件实列中 $slots.default 中。
return createElement('h1', this.title); createElement返回的是包含的信息会告诉VUE页面上需要渲染什么样的节点及其子节点。我们称这样的节点为虚拟DOM，可以简写为VNode
- <p id="slot"> slot插槽</p>
1. 单个插槽  
当子组件模板只有一个没有属性的插槽时，父组件传入的整个内容片段将插入到插槽所在的 DOM 位置，并替换掉插槽标签本身。
最初在  标签中的任何内容都被视为备用内容。备用内容在子组件的作用域内编译，并且只有在宿主元素为空，且没有要插入的内容时才显示备用内容。
2. 命名插槽  
solt元素可以用一个特殊的特性name来进一步配置如何分发内容。多个插槽可以有不同的名字。
这样可以将父组件模板中 slot 位置，和子组件 slot 元素产生关联，便于插槽内容对应传递
3. 作用域插槽scoped slots  
可以访问组件内部数据的可复用插槽(reusable slot)
在父级中，具有特殊特性 slot-scope 的<template> 元素必须存在，表示它是作用域插槽的模板。slot-scope 的值将被用作一个临时变量名，此变量接收从子组件传递过来的 prop 对象。

- <p id="func">组件中data为什么是函数</p>
> 因为组件是用来复用的，JS 里对象是引用关系，这样作用域没有隔离，而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。