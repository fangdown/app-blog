import module from '../store'
import { registerStoreModule, createModuleLayout } from 'public/utils'

registerStoreModule(module, 'demo')

export default createModuleLayout('demoLayout')
