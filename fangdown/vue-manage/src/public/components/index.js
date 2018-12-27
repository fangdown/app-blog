
import '../assets/scss/element-variables.scss'
import '../assets/scss/app.scss'

import FdButton from './fd-button/index'
import FdCustom from './fd-custom/index.vue'

const components = [
  FdButton,
  FdCustom
]

const install = function (Vue) {
  console.log('install', components.filter(v => typeof v !== 'function'))
  console.log('type', typeof components[0])
  components.filter(v => typeof v !== 'function').forEach(v => {
    console.log('v', v)
    Vue.component(v.name, v)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default install
