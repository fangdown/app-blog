## vue通信方式

### prop通信
```js
// father.vue
  <son class="input"
         type="text"
         placeholder="请输入内容"
         :dataProps="dataProps"
         @focus="onFocus"
         ref="son"></son>
// son.vue
  export default {
    props: ['dataProps']
  }
```
### emit, on 通信
```js
// father.vue
  <son class="input"
         type="text"
         placeholder="请输入内容"
         :dataProps="dataProps"
         @focus="onFocus"
         @test="test"
         ref="son"></son>
  methods:{
    test(data){

    }
  }
// son.vue
  methods:{
    say(){
      this.$emit('test', data)
    }
  }
  
```
### $children, $parent,$refs通信
```js
  this.$refs.son.say()
  this.$parent.test()
```
### $attrs, $listeners通信
```js
// 
<div>
    <input v-bind="$attrs"
           v-on="$listeners" />
    <sunzi></sunzi>
  </div>
```

### provide, inject通信
```js
// father.vue
  provide: function () {
    return {
      name: 'father'
    }
  },
  // sunzi
  export default {
    inject: ['name']
  }
```
### event-bus
```js
  Vue.prototype.$bus = new Vue();
    this.$bus.$on('busClick', (data) => {
        this.dataProps.title = data;
    });

   this.$bus.$emit('busClick', 'bus 触发了');
```
### vuex
```js
// 
this.$store.commit('add', data)
// mutation
mutation = {
  add(state, n){

  }
}
``` 
<button @click="$store.dispatch('addAction')">+</button>
<button @click="$store.dispatch('reduceAction')">-</button>
```
``` js
mutations: {
   add(state) {
        state.count += 1
    },
    reduce(state) {
        state.count -= 1
    },
},
actions: {
    addAction(context) {
        context.commit('add')
    },
    reduceAction({ commit }) {
        commit('reduce')
    },
},

```
