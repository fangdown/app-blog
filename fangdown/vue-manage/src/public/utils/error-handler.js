// import { http } from '../utils/http'

const report = (params) => {
  // http('syslog.frontendOperationLog.save', params, false)
}

const install = (Vue) => {
  const error = Vue.config.errorHandler

  Vue.config.errorHandler = (err, vm, info) => {
    let user = 'test'
    let menu = 'menu'
    console.log('err', err)
    console.log('vm', vm)
    console.log('info', info)
    report({
      userId: user.id,
      userName: user.name,
      menuId: menu.id,
      menuName: menu.$title,
      error: JSON.stringify({
        message: err.message,
        stack: err.stack
      }),
      option: JSON.stringify({
        url: location.href,
        info: info,
        component: vm.$vnode.componentOptions.tag
      })
    })


    if (typeof error === 'function') {
      error.call(Vue, err, vm, info)
    }
  }
}

export default install
