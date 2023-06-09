/**
 * 判断对象是数组和对象， 是什么返回什么
 * @param {*} obj
 * @returns copy
 */
function DeepClone(obj, map = new Map()) {
  if (typeof obj !== "object" || obj === null) return obj;
  let copy = Array.isArray(obj) ? [] : {};
  // 解决对象循环引用
  if (map.get(obj)) return map.get(obj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = DeepClone(obj[key]);
    }
  }
  map.set(obj, copy);
  return map.get(obj);
}
const obj = { a: 1, b: { c: [1, 2, 3], d: 2 } };
const d1 = DeepClone(obj);
console.log(d1);
