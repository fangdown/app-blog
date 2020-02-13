## 实现instanceof原理
> 左侧的原型是否在右侧的原型对象上
```js
function instanceof(left, right){
  let proto = left.proto;
  let prototype = right.prototype;
  while(true){
    if(proto === null) return false
    if(proto === prototype) return true
    proto = prototype
  }
}
```