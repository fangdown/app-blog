## Vue知识点1
### 整体生态全局
![](https://user-gold-cdn.xitu.io/2018/6/8/163dd402808287f7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
1. vue-cli脚手架中各目录和文件的作用
   - assets 静态资源
   - components 组件
   - router 路由配置
   - view 视图
   - app.vue 应用主组件
   - mian.js入口文件
2. vuex
   - 状态管理
   - store，音乐播放，登录状态，购物车
3. restful api
   - RESTful是一个api的标准，无状态请求。请求的路由地址是固定的
   - post get put delete

### 进阶考察
1. 生命周期
   - 创建前后： 在beforeCreated阶段，vue实例的挂载元素
    beforeCreated: el和数据对象data都为undefined，还未初始化;  
    created，vue的实例对象data已经有了，el还没有;
   - 载入前后
   beforeMount: el和data已经初始化了，挂载在虚拟dom上;  
   mouted阶段： vue实例挂载在dom上;
   - 更新前后
   beforeUpdate：会触发beforUpdate方法;
   updated： 触发updated方法;
   - 销毁前后
   在执行destroy方法后，对data的变化不再触发生命周期函数，说明此时vue已经解除了事件监听已经dom的绑定，但是dom结果依然存在。
2. vue的双向数据绑定原理
> vue.js是采用数据劫持结合发布者订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter/getter， 在数据变动时发布消息给订阅者，触发相应的回调。 

   - [详情请点击vue双向绑定原理](../principle/defineProperty.md)
3. template模板编译原理
   - 通过compile编译器把template编译成AST（抽象语法树）；
   - AST经过generate得到render函数，render的返回值是VNode（虚拟节点）
### 更多扩展
1. event&v-model:事件和v-model的实现原理
2. slot&keep-alive: 内置组件的原理
3. transition过度的实现原理
4. vue-router：官方路由的实现原理
5. vuex: 官方状态管理的实现原理