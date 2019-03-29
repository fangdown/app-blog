## 实现一深拷贝函数

```js
/**
 * 数组的深拷贝函数
 * @param {Array} src 
 * @param {Array} target 
 */
  function deepClone(src, target){
    const keys = Reflect.ownKeys(src)
    let value = null

    for(let key of keys){
      value = src[key]
      if(Array.isArray(value)){
        target[key] = cloneArr(value, [])
      } else if(typeof value === 'object'){
        target[key]== deepClone(value,{})
      } else {
        target[key] = value
      }
    }
  }
  /**
 * 对象的深拷贝实现
 * @param {Object} src 
 * @param {Object} target 
 * @return {Object}
 */
  function cloneArr(src, target){
    for(let item of src){
      if(Array.isArray(item)){
        target.push(cloneArr(item, []))
      } else if(typeof item === 'object'){
        target.push(deepClone(item,{}))
      } else {
        target.push(item)
      }
    }
    return target
  }
```