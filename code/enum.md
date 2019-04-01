## 枚举的方式

```js
Object.prototype.z = 3
let obj  = {x:1, y:2}
// 加上这个，那么y不会进行枚举
Object.defineProperty(obj, 'y', {
  enumerable: false
})
for(let key in obj){
  console.log(key)
  // x,y,z
  // 会遍历原型链上的属性
}
Object.keys(obj).forEach(item => console.log(item))
// x, y 

```