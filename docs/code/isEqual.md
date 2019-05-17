## 比较对象是否相同
思路：要考虑的几个类型 null、数组、对象，嵌套引用
1. 直接相等
2. 判断null
3. 判断基本类型
4. 判断是否为数组和对象
5. 递归判断数组和对象里面的值
```js
function isEqual(obj1, obj2){
  if(obj1 === obj2) return true
  if(obj1 === null || obj2 === null){
    return obj1 === obj2
  }
  const ta = typeof obj1
  const tb = typeof obj2
  if(ta !== tb) return false
  const a = Array.isArray(obj1)
  const b = Array.isArray(obj2)
  if(a !== b) return false
  return a ? isArrayEqual(obj1, obj2) : isObjEqual(obj1, obj2)
}
function isArrayEqual(arr1, arr2){
  if(!Array.isArray(arr2)) return false
  if(arr1.length !== arr2.length) return false
  let len = arr1.length
  while(len--){
    if(!isEqual(arr1[len],arr2[len])) return false
  }
  return true
}
function isObjEqual(obj1, obj2){
  // 判断是否为对象，是否为node， 是否为window
  if (!isObject(obj2) || obj2.nodeType || obj2 === obj2.window) {
    return false;
  }
  if(!Object.keys(obj2).length) return false
  if(Object.keys(obj1).length !== Object.keys(obj2).length) return false
  const arr = Object.keys(obj1)
  for(let i = 0; i < arr.length; i++){
    if(!isEqual(obj1[arr[i]], obj2[arr[i]])){
      return false
    }
  }
  return true
}
function isObject(obj){
  const type = typeof obj;
  return (obj && (type === 'object' || type === 'function')) || false;
}
const a = {name: 'a', arr: [1,2, null]}
const b = {name: 'a', arr: [1,2, null]}
console.log(isEqual(a, b))

```