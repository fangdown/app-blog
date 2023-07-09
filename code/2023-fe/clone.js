/**
 * 判断对象是数组和对象， 是什么返回什么
 * @param {*} obj
 * @returns copy
 */
function DeepClone(obj, map = new WeakMap()) {
  if (typeof obj !== "object" || obj === null) return obj;
  let copy = Array.isArray(obj) ? [] : {};
  // 解决对象循环引用
  if (map.get(obj)) return map.get(obj);
  // set
  if (obj instanceof Set) {
    copy = new Set();
    obj.forEach((item) => {
      const v1 = DeepClone(item, map);
      copy.add(v1);
    });
  }
  // map
  if (obj instanceof Map) {
    copy = new Map();
    obj.forEach((k, v) => {
      const k1 = DeepClone(k, map);
      const v1 = DeepClone(v, map);
      copy.set(k1, v1);
    });
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = DeepClone(obj[key]);
    }
  }
  map.set(obj, copy);
  return map.get(obj);
}
const obj = {
  a: 1,
  b: {
    c: [1, 2, 3],
    d: 2,
    e: new Set([1, 2]),
    f: new Map([
      ["x", 10],
      ["y", 20],
    ]),
  },
};
const d1 = DeepClone(obj);
console.log(d1);
