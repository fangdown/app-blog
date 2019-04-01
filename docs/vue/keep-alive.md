## keep-alive原理

### 特性
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

### 生命钩子
keep-alive 提供了两个生命钩子，分别是 activated 与 deactivated。

因为 keep-alive 会将组件保存在内存中，并不会销毁以及重新创建，所以不会重新调用组件的 created 等方法，需要用 activated 与 deactivated 这两个生命钩子来得知当前组件是否处于活动状态。

### 原理

created 钩子会创建一个 cache 对象，用来作为缓存容器，保存 vnode 节点。
遍历 cache 中的所有项，如果不符合 filter 指定的规则的话，则会执行 pruneCacheEntry。pruneCacheEntry 则会调用组件实例的$destroy 方法来将组件销毁。

Vue.js 内部将 DOM 节点抽象成了一个个的VNode 节点，keep-alive 组件的缓存也是基于 VNode 节点的而不是直接存储 DOM 结构。它将满足条件（ pruneCache 与 pruneCache ）的组件在 cache 对象中缓存起来，在需要重新渲染的时候再将 vnode 节点从 cache 对象中取出并渲染。