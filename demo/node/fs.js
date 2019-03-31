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

fs.readFile('./fs-name.txt', 'utf8', function(err, data){
  console.log(err)
  console.log(data)
  // null
  // hello
})