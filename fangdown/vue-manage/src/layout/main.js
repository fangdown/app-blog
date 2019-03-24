// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUi from 'element-ui'
import store from '../public/store'
import FdUi from '../public/components'
import App from './layout/index.vue'
import router from './router'
import errorHandler from '../public/utils/error-handler'

Vue.use(ElementUi, { size: 'mini' })
Vue.use(FdUi)
Vue.use(errorHandler)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  render: (h) => h('App')
})
