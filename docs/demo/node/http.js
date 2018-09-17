var http = require('http')
var fs = require('fs')

// 监听函数 回调函数
var serve = function(req, res){
  // ############### 演示写入 ############
  // res.setHeader('Content-Type', 'text/text;charset=utf-8') // 解决中文编码问题
  // res.write('当前时间：')
  // res.write(new Date().toLocaleString())
  // res.write('hello http')
  // res.end() // 写入结束

  // ############### 演示写入文件 ############
  // res.setHeader('Content-Type', 'text/text;charset=utf-8') // 解决中文编码问题
  // fs.readFile('fs-name.txt', function(err, data){
  //   if(err){
  //     res.end(err.toString())
  //   } else {
  //     res.end(data)
  //   }
  // })
  // ############### 演示多种类型文件 ############
  const url = req.url
  if(url === '/favicon.ico'){
    req.end('404')
    return false
  }
  if(url == '/'){
    res.setHeader('Content-Type', 'text/html;charset=utf-8') // 解决中文编码问题
    fs.readFile('./http-index.html', function(err, data){
      if(err){
        res.end(err.toString())
      } else {
        res.end(data)
      }
    })
  } else if(url == '/http-index.css'){
    res.setHeader('Content-Type', 'text/css;charset=utf-8') // 解决中文编码问题
    fs.readFile('./http-index.css', function(err, data){
      if(err){
        res.end(err.toString())
      } else {
        res.end(data)
      }
    })
  } else {
    res.end('404')
  }
}
var server = http.createServer(serve)
server.listen(80)