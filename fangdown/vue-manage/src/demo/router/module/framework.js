const tag = '/demo/framework'
const listCache = () => import(/* webpackChunkName: "demo" */ '../../pages/framework/list-cache')
const canvasTable = () => import(/* webpackChunkName: "demo" */ '../../pages/framework/canvas-table')
const registerModule = () => import(/* webpackChunkName: "demo" */ '../../pages/framework/register-module')
const routerTag = () => import(/* webpackChunkName: "demo" */ '../../pages/framework/router-tag')
const errorHandle = () => import(/* webpackChunkName: "demo" */ '../../pages/framework/error-handle')

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
  },
  {
    path: 'framework/register-module',
    component: registerModule,
    meta: {
      tag,
      title: '动态注册vuex'
    }
  },
  {
    path: 'framework/tag',
    component: routerTag,
    meta: {
      tag,
      title: 'tag的使用'
    }
  },
  {
    path: 'framework/error-handle',
    component: errorHandle,
    meta: {
      tag,
      title: '错误采集'
    }
  }
]
