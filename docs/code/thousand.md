## 实现千分位
```js
var num = 9999111231
function thousand (num) {
  return num && num.toString().replace(/(\d)(?=(\d{3})+$)/g, function($1){
    return $1+ ','
  })
}
console.log(thousand(num))
```