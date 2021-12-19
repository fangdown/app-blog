const cloneDeep = (obj, hash = new WeakMap()) => {
  if (obj === null) return obj;
  if (typeof obj !== "object") return obj;
  if (hash.get(obj)) return hash.get(obj);
  let newObj = new obj.constructor();
  hash.set(obj, newObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = cloneDeep(obj[key], hash);
    }
  }
  return newObj;
};
const obj = {
  name: 'A',
  name1: undefined,
  name3: function() {},
  name4:  Symbol('A')
}
const newObj = cloneDeep(obj)
console.log(newObj)
// {
//   name: 'A',
//   name1: undefined,
//   name3: [Function: name3],
//   name4: Symbol(A)
// }