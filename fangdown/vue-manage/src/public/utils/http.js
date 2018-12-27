import axios from 'axios'
import { Message } from 'element-ui'
import { random, getToken } from './common'
import ERPcache from './cache-plugin'

import queryString from 'query-string'
// import LogPlugin from './log-plugin'

// const ERPlog = new LogPlugin()

const CancelToken = new axios.CancelToken(cancel => cancel())

const TOKEN_ERROR_CODES = [100201, 6001]

const TIMEOUT = 20000

const ERRORS = {
  'Network Error': '网络错误，请检查网络',
  [`timeout of ${TIMEOUT}ms exceeded`]: '请求超时，服务器未响应',
  'Internal Server Error': '内部服务器错误',
  api: '接口错误'
}

// 用户ID-时间戳-4位随机数-前端menuID
const getWebTraceId = () => {
  let userId = 'userId'
  let menuId = 'menuId'
  return `${userId}-${Date.now()}-${random(4)}-${menuId}`
}

const httpPending = {}
const removeHttpPending = (config, isRemove = true) => {
  if (!config || !config.headers.method) {
    return false
  }
  let key = config.headers.method
  let val = typeof config.data === 'object' ? JSON.stringify(config.data) : config.data
  if (httpPending[key] === val) {
    if (isRemove) {
      delete httpPending[key]
    } else {
      console.warn(`[${key}]: repeated http request`)
    }
    return true
  }
  httpPending[key] = val
  return false
}

const service = axios.create({
  timeout: TIMEOUT,
  headers: { 'format': 'JSON' }
})

service.interceptors.request.use(config => {
  // try {
  //   ERPlog.handerConfig(config)
  // } catch (e) {
  //   console.log(e)
  // }
  config.data = config.data || {}

  // 防止重复提交
  if (removeHttpPending(config, false)) {
    config.cancelToken = CancelToken
  }
  // 日志记录请求头
  config.headers.webTraceId = getWebTraceId()
  // 数据权限范围控制
  config.headers['X-menu-id'] = ''

  config.headers.token = getToken()
  return config
})

service.interceptors.response.use(response => {
  console.log('response', response)
  try {
    // 后期优化为订阅分发
    // ERPlog.push(response)
    ERPcache.save(response)
  } catch (e) {
    console.log(e)
  }

  removeHttpPending(response.config)
  // 文件流下载
  if (response.data instanceof Blob) {
    return response.data
  }
  let data = typeof response.data === 'object' ? response.data : {}
  if (data.error_code === 0) {
    return data.result
  }
  let method = response.config.headers.method || response.config.url
  let $config = response.config.$config
  let msg = ($config && $config.msg) || data.msg || data.error || ERRORS.api
  if (msg && (!$config || !$config.cancel)) {
    // Message({ message: msg, type: 'error', duration: 2500 })
  }
  data.message = msg
  data.method = method
  if (TOKEN_ERROR_CODES.includes(data.code)) {
    location.hash = '#/error?type=5'
  }
  return Promise.reject(data)
}, error => {
  console.log('error', error)
  removeHttpPending(error.config)
  let msg = error.message
  if (msg) {
    error.message = ERRORS[msg] || msg
    Message({ message: error.message, type: 'error', duration: 2500 })
  }
  return Promise.reject(error.response)
})

export default service

/**
 * 封装 http
 * @param method: open api code
 * @param data: request body
 * @param opt: string | boolean | object
 * @returns {AxiosPromise}
 * opt:
 *   string: appkey不符合通用规则时，值为特殊的appkey
 *   boolean: 接口出错时是否弹出提示信息
 *   object: 自定义配置，比如替换接口的错误提示信息
 *   {
 *     appkey: '1',
 *     msg: '自定义错误提示信息',
 *     cancel: true, // 接口调用失败时是否提示错误信息
 *     axios: {} // axios request config
 *   }
 */
export const http = async (url, data, opt) => {
  let cacheData = await ERPcache.get(url, data)
  if (cacheData) {
    console.info('[cache-plugin] data from cache', cacheData)
    return Promise.resolve(cacheData)
  }
  url = url + '?' + queryString.stringify(data)
  const cof = { url, method: 'get', data }
  return service(cof)
}
