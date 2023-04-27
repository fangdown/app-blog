/**
 * 先比较内存地址
 * 再比较是否是null
 * 再比较类型是否相同
 * 再比较key value是否相同
 *
 * @param {*} obj1
 * @param {*} obj2
 */

function DeepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== typeof obj2 || obj1 === null || obj2 === null)
    return false;

  if (typeof obj1 === "object") {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (let key of keys1) {
      if (!keys2.includes(key) || !DeepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
    return true;
  }
  return false;
}
