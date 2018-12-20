import { getRoutes } from 'public/utils'

export default getRoutes(require.context('./', false, /\.js$/), './index.js', 'demo')
