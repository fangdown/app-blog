import Vue from 'vue'


const FdDatePicker = Vue.component('fd-date-picker', {
  functional: true,
  // h: createElement
  render (h, self) {
    return h('el-date-picker', self.data, self.children)
  },
})

export default FdDatePicker
