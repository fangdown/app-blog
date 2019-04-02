## minxis的使用
1. 定义公用js
2. 引入使用

```js
// 定义  mixins/index.js
export default {
  mounted(){
    // do something
  },
  methods:{

  }
}
```

```js
// 使用
 import mixins from './mixins'
 export default {
    name: 'name',
    mixins: mixins,
 }
```