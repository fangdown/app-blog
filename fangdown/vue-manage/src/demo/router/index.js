import demo from './module'
const layout = () => import(/* webpackChunkName: "ecms" */ '../pages/layout')
export default {
  name: 'demoLayout',
  layout,
  chunks: { demo }
}
