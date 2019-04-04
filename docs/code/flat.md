## 实现数组扁平化

```js
function flat(items) {
  return items.reduce((prev, current) => {
    if(Array.isArray(current)){
      return prev.concat(flat(current))
    }
    return prev.concat(current)
  }, [])
}
let data = [1, 3, 5, [10, 15, [333,444]], [22, 23,34]]
console.log(flat(data)) 
// [ 1, 3, 5, 10, 15, 333, 444, 22, 23, 34 ]
```