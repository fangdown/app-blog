## Vue 小技巧

### computed 和 watch区别
computed是一个对象，对象里的属性名，对应的是一个函数，函数返回值即是该属性的值，该属性会挂载到vm实例中，因此不能跟data里的属性名重复，否则会报错。
watch 也是一个对象，对象里的属性名，对应的也是一个函数，属性名需为data中已经定义过的属性，监听该属性变化则执行相应的操作。

### 组件style的scoped
动态创建的DOM元素，添加样式不生效
+ 原因  
  1. 当 style标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素。它会为组件中所有的标签和class样式添加一个scoped标识，就像上面结果中的data-v-1b971ada。
  2. 动态添加的dom样式并没有后面的后缀
+ 解决方法
  1. 去掉style中的scoped属性
  2. 给元素动态添加样式
### Vue 数组/对象更新 视图不更新
由于js的限制，Vue 不能检测以上数组的变动，以及对象的添加/删除，很多人会因为像上面这样操作，出现视图没有更新的问题.
+ 原因
  1. 数组和对象是引用型数据，直接修改里面的某个值，其引用地址并没有发生变化
+ 解决方法
  1. this.$set(你要改变的数组/对象，你要改变的位置/key，你要改成什么value)
  2. 使用原生方法push()/pop()/shift()/unshift()等
  3. 使用filter或map返回新数组替代
### Vue filters 过滤器的使用
```html
 <!-- 在双花括号中 -->
    {{ message | filterTest }}
    <!-- 在 `v-bind` 中 -->
    <div :id="message | filterTest"></div>
    <script >
    export default {    
     data() {
        return {
         message:1   
        }
     },
    filters: {  
        filterTest(value) {
            // value在这里是message的值
            if(value===1){
                return '最后输出这个值';
            }
        }
    }
  }
</script>
```
### v-if尽量不要与v-for在同一节点使用
v-for 的优先级比 v-if 更高,如果它们处于同一节点的话，那么每一个循环都会运行一遍v-if。
1. 如果你想根据循环中的每一项的数据来判断是否渲染，那么你这样做是对的
2. 如果你想要根据某些条件跳过循环，而又跟将要渲染的每一项数据没有关系的话，你可以将v-if放在v-for的父节点
### 这些情况下不要使用箭头函数
1. 不应该使用箭头函数来定义一个生命周期方法
2. 不应该使用箭头函数来定义 method 函数
3. 不应该使用箭头函数来定义计算属性函数
4. 不应该对 data 属性使用箭头函数
5. 不应该使用箭头函数来定义 watcher 函数
### 路由懒加载写法
```js
const router = new Router({
  routes: [
    path: './app',
    component: () => import('./app')
  ]
})
```
### 路由启动项 和 404页
```js
export default new Router({
      routes: [
        {
          path: '/', // 项目启动页
          redirect:'/login'  // 重定向到下方声明的路由 
        },
        // 放在最后面，找不到任何一个的时候走这一步
        {
          path: '*', // 404 页面 
          component: () => import('./notFind') // 或者使用component也可以的
        },
      ]
    })
```