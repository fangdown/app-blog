## fs 文件系统
Node.js 提供一组类似 UNIX（POSIX）标准的文件操作API。 异步方法。

```js
var fs = require('fs')
/**
 * @param err 错误对象，如果没有错误返回null
 * @param data 数据对象
 **/
fs.readFile('./fs-name.txt', function(err, data){
  console.log(err)
  console.log(data.toString())
  // null
  // hello
})
// 如果不要data.toString, 可以多加一个参数utf8
fs.readFile('./fs-name.txt', 'utf8', function(err, data){
  console.log(err)
  console.log(dat)
  // null
  // hello
})
```