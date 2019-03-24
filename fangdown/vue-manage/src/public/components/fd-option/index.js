import Vue from 'vue'


const FdOption = Vue.component('fd-option', {
  functional: true,
  // h: createElement
  render (h, self) {
    return h('el-option', self.data, self.children)
  },
})

export default FdOption
