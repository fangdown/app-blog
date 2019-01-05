const tag = '/demo/base'
const customComponent = () => import(/* webpackChunkName: "demo" */ '../../pages/base/component')

export default [
  {
    path: 'base/component',
    component: customComponent,
    meta: {
      tag,
      title: '组件设计'
    }
  }
]
