## vue组件

### 组件实现方式1
1. 定义组件
2. 引入组件
3. 使用组件
```js
import Vue from 'vue'

const FdButton = Vue.component('fd-button', {
  functional: true,
  render (h, self) {
    return h('el-button', self.data, self.children)
  },
})

export default FdButton
```

```js
import '../assets/scss/element-variables.scss'
import '../assets/scss/app.scss'
import FdButton from './fd-button/index'

const components = [
  FdButton
]

const install = function (Vue) {
  // 函数式和非函数式
  components.filter(v => typeof v !== 'function').forEach(v => {
    Vue.component(v.name, v)
  })
}
// 安装
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default install
```

```js
// main.js中全局引用

import FdUi from '../public/components'

Vue.use(FdUi)
```

