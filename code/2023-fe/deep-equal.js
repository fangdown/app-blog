/**
 * 先比较内存地址
 * 再比较是否是null
 * 再比较类型是否相同
 * 再比较key value是否相同
 *
 * @param {*} obj1
 * @param {*} obj2
 */

function deepEqual(obj1, obj2) {
  if (typeof obj1 === 'object' && typeof obj2 === 'object') {
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)
    if (keys1.length !== keys2.length) return false
    for (let key in obj1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false
    }
    return true
  }
  return obj1 === obj2
}
const obj1 = { a: 1 }
const obj2 = { a: 1 }
console.log(obj1 === obj2)
console.log(deepEqual(obj1, obj2))