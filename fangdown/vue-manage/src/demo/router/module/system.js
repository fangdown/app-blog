const tag = '/demo/system'
const log = () => import(/* webpackChunkName: "demo" */ '../../pages/system/log')
const html2canvas = () => import(/* webpackChunkName: "demo" */ '../../pages/system/html2canvas')

export default [
  {
    path: 'system/log',
    component: log,
    meta: {
      tag,
      title: '日志查看'
    }
  },
  {
    path: 'system/html2canvas',
    component: html2canvas,
    meta: {
      tag,
      title: 'html2canvas'
    }
  }
]
