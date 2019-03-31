## 获取url参数
```js
var url = "http://www.taobao.com/index.php?key0=0&key1=1&key2=2"
function queryParams(url){
  var str = url.split('?')[1],
      items = str.split('&');
  var arr= [], obj = {}
  items.forEach(item =>{
    arr = item.split('=')
    obj[arr[0]] = arr[1]
  })
  return obj
}
console.log(queryParams(url)) // { key0: '0', key1: '1', key2: '2' }

```