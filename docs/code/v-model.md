## 实现v-model
> 理解了语法糖就理解了v-model的含义 v-bind,v-on的组合
```js
<div>
  <test v-model="name"></test>
</div>
  // 语法糖 上面的等于下面
  // <test :value="name" @input="name = arguments[0]"></test>
```
```js
// 注册组件
<template>
  <input 
    v-on:input="$emit('input', $event.target.value)"
    v-bind:value="value"
    />
</template>
<script>
  export default {
    props: ['value'],
    return data {}
  }
</script>
```