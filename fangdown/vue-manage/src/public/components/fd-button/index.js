import Vue from 'vue'


const FdButton = Vue.component('fd-button', {
  functional: true,
  // h: createElement
  render (h, self) {
    return h('el-button', self.data, self.children)
  },
})

export default FdButton
