## vue注册组件
```js
// ui.js
import c1 from './packages/hello-world/index.js';
import c2 from './packages/switch/index.js';
const components = [
  c1,
  c2
]
const install = function(Vue, opts={}){
  components.map(item => Vue.component(component.name, component))
  // 将方法挂在原型上
  Vue.prototype.$http = http
}
if(typeof window !== 'undefined' && window.Vue){
  install(window.Vue)
}
export default {
  install
}
```

### 使用
> 在主入口文件中，
```js
import ui from 'ui.js'
Vue.use(ui)
```