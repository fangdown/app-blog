/**
 * 判断对象是数组和对象， 是什么返回什么
 * @param {*} obj
 * @returns copy
 */
function DeepClone(obj) {
  if (typeof obj !== "object" || obj === null) return obj;
  let copy = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = DeepClone(obj[key]);
    }
  }
  return copy;
}
const obj = { a: 1, b: { c: [1, 2, 3], d: 2 } };
const d1 = DeepClone(obj);
console.log(d1);
