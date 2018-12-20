const tag = '/demo/framework'
const listCache = () => import(/* webpackChunkName: "demo" */ '../../pages/framework/list-cache')
const canvasTable = () => import(/* webpackChunkName: "demo" */ '../../pages/framework/canvas-table')

export default [
  {
    path: 'framework/list-cache',
    component: listCache,
    meta: {
      tag,
      title: '列表缓存'
    }
  },
  {
    path: 'framework/canvas-table',
    component: canvasTable,
    meta: {
      tag,
      title: 'canvas表格'
    }
  }
]
