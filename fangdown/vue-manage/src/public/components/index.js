
import '../assets/scss/element-variables.scss'
import '../assets/scss/app.scss'
import { http } from '../utils/http.js'
import FdButton from './fd-button/index'
import FdCustom from './fd-custom/index.vue'

const components = [
  FdButton,
  FdCustom
]
const setPrototype = (Vue) => {
  Vue.prototype.$bus = new Vue()
  Vue.prototype.$http = http
}

const install = function (Vue) {
  components.filter(v => typeof v !== 'function').forEach(v => {
    Vue.component(v.name, v)
  })
  setPrototype(Vue)
}


if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default install
