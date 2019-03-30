## Vue生命周期
生命周期函数就是组件在初始化或者数据更新时会触发的钩子函数。
在初始化时，会调用以下代码，生命周期就是通过 callHook 调用的
```js

Vue.prototype._init = function (options) {
  initLifecycle(vm) //  建立父子组件关系，在当前实例上添加一些属性和生命周期标识。如：$children、$refs、_isMounted等。
  initEvents(vm) // 用来存放除@hook:生命周期钩子名称="绑定的函数"事件的对象。如：$on、$emit等。
  initRender(vm) // 用于初始化$slots、$attrs、$listeners
  callHook(vm, 'beforeCreate') // 拿不到 props data
  initInjections(vm)  // 初始化inject，一般用于更深层次的组件通信，相当于加强版子组件的props。用于组件库开发较多
  initState(vm) // 是很多选项初始化的汇总，包括：props、methods、data、computed 和 watch 等。
  initProvide(vm) //初始化provide
  callHook(vm, 'created')
  ...
  // 挂载实例
  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}
```
可以发现在以上代码中，beforeCreate 调用的时候，是获取不到 props 或者
data 中的数据的，因为这些数据的初始化都在 initState 中。
接下来会执行挂载函数
```js
export function mountComponent {
  callHook(vm, 'beforeMount')
  // ...
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
}
```
beforeMount 就是在挂载前执行的，然后开始创建 VDOM 并替换成真实 DOM，最后
执行 mounted 钩子。这里会有个判断逻辑，如果是外部 new Vue({}) 的话，不会存在
$vnode ，所以直接执行 mounted 钩子了。如果有子组件的话，会递归挂载子组件，只
有当所有子组件全部挂载完毕，才会执行根组件的挂载钩子。
接下来是数据更新时会调用的钩子函数
```js
function flushSchedulerQueue() {
  // ...
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) {
      watcher.before() // 调用 beforeUpdate
    }
    id = watcher.id
    has[id] = null
    watcher.run()
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' +
          (watcher.user ? `in watcher with expression "${watcher.expression}"` : `in a component render function.`),
          watcher.vm)
        break
      }
    }
  }
  callUpdatedHooks(updatedQueue)
}
function callUpdatedHooks(queue) {
  let i = queue.length
  while (i--) {
    const watcher = queue[i]
    const vm = watcher.vm
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated')
    }
  }
}
```

上图还有两个生命周期没有说，分别为 activated 和 deactivated ，这两个钩子
函数是 keep-alive 组件独有的。用 keep-alive 包裹的组件在切换时不会进行销毁，
而是缓存到内存中并执行 deactivated 钩子函数，命中缓存渲染后会执行 actived 钩
子函数。
最后就是销毁组件的钩子函数了
```js
Vue.prototype.$destroy = function () {
  // ...
  callHook(vm, 'beforeDestroy')
  vm._isBeingDestroyed = true
  // remove self from parent
  const parent = vm.$parent
  if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
    remove(parent.$children, vm)
  }
  // teardown watchers
  if (vm._watcher) {
    vm._watcher.teardown()
  }
  let i = vm._watchers.length
  while (i--) {
    vm._watchers[i].teardown()
  }
  // remove reference from data ob
  // frozen object may not have observer.
  if (vm._data.__ob__) {
    vm._data.__ob__.vmCount--
  }
  // call the last hook...
  vm._isDestroyed = true
  // invoke destroy hooks on current rendered tree
  vm.__patch__(vm._vnode, null)
  // fire destroyed hook
  callHook(vm, 'destroyed')
  // turn off all instance listeners.
  vm.$off()
  // remove __vue__ reference
  if (vm.$el) {
    vm.$el.__vue__ = null
  }
  // release circular reference (##6759)
  if (vm.$vnode) {
    vm.$vnode.parent = null
  }
}
```
// v2.6.10 最新版
var LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated',
    'errorCaptured',
    // v2.6+ 
    'serverPrefetch'
];

在执行销毁操作前会调用 beforeDestroy 钩子函数，然后进行一系列的销毁操作，
如果有子组件的话，也会递归销毁子组件，所有子组件都销毁完毕后才会执行根组件的
destroyed 钩子函数。