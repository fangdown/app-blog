## web服务器http
http 模块主要用于搭建 HTTP 服务端和客户端，使用 HTTP 服务器或客户端功能必须调用 http 模块

### 最简单示例
```js
var http = require('http')
// 监听函数 回调函数
var serve = function(req, res){
  res.setHeader('Content-Type', 'text/text;charset=utf-8') // 解决中文编码问题
  res.write('当前时间：')
  res.write(new Date().toLocaleString())
  res.write('hello http')
  res.end() // 写入结束
}
var server = http.createServer(serve)
server.listen(80)
```

### 读取文件
```js

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
  res.setHeader('Content-Type', 'text/text;charset=utf-8') // 解决中文编码问题
  fs.readFile('fs-name.txt', function(err, data){
    if(err){
      res.end(err.toString())
    } else {
      res.end(data)
    }
  })
}
var server = http.createServer(serve)
server.listen(80)
```

### 读取静态文件
```js
var http = require('http')
var fs = require('fs')

// 监听函数 回调函数
var serve = function(req, res){
  // ############### 演示写入文件 ############
  const url = req.url // 请求路径
  if(url == '/'){
    res.setHeader('Content-Type', 'text/html;charset=utf-8') // 解决中文编码问题
    fs.readFile('http-index.html', function(err, data){
      if(err){
        res.end(err.toString())
      } else {
        res.end(data)
      }
    })
  } else if(url == '/index.css'){
    res.setHeader('Content-Type', 'text/css;charset=utf-8') // 解决中文编码问题
    fs.readFile('http-index.css', function(err, data){
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
```


### 读取多类型文件
```js
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
```