
const tag = '/demo/elementUI'
const log = () => import(/* webpackChunkName: "demo" */ '../../pages/elementUI/dynamic-form')

export default [
  {
    path: 'elementUI/dynamic-form',
    component: log,
    meta: {
      tag,
      title: '动态表单'
    }
  }
]
