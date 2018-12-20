import Home from '../pages/index'

const getModuleRoutes = (context) => {
  const children = []
  context.keys().forEach(key => {
    const route = context(key).default
    if (route && route.name) {
      children.push(route)
    }
  })
  return children
}
const moduleRouters = getModuleRoutes(require.context('../../', true, /router\/index\.js$/))
console.log('moduleRouters', moduleRouters)
const chunkRouters = []
moduleRouters.forEach(module => {
  Object.keys(module.chunks).forEach(v => {
    chunkRouters.push({
      path: `/${v}`,
      name: v,
      meta: { playout: module.name },
      component: module.layout,
      children: module.chunks[v]
    })
  })
})
console.log('chunkRouters', chunkRouters)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  ...chunkRouters
]
export default routes
