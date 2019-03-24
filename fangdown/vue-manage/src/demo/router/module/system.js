const tag = '/demo/system'
const log = () => import(/* webpackChunkName: "demo" */ '../../pages/system/log')

export default [
  {
    path: 'system/log',
    component: log,
    meta: {
      tag,
      title: '日志查看'
    }
  }
]
