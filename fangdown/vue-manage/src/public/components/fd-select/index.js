import Vue from 'vue'


const FdSelect = Vue.component('fd-select', {
  functional: true,
  // h: createElement
  render (h, self) {
    return h('el-select', self.data, self.children)
  },
})

export default FdSelect
