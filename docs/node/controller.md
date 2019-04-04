## node中间层
### 作用
1. node中间层作用：前端也是mvc，NodeJS之后，前端可以更加专注于视图层，而让更多的数据逻辑放在Node层处理 

2. node中间层作用：当发现所有请求量太多应付不过来的时候就可以考虑做这样的分离，将处理页面渲染的请求分给另一个服务，挡在前面，自己只负责数据相关的请求。nodejs擅长处理io密集型任务，很适合做处理页面渲染的服务

3. node中间层作用：功能分离，减轻板块负担 

4. 善用学习网站（不只善用搜索引擎）：去菜鸟教程或者别的里面首页可以了解例如node.js的作用

5. node.js：部署在服务器上的js，可以部署一些高性能服务。

### 中间层实例
1. 客户端请求数据
2. node接受请求，跟后台发起请求
3. node得到请求响应，经过封装，并返回给client

```js
// http.js
var formatURL = require('./formatURL.js');
var http = require('http');
const POSThttp = function(request){
  return new Promise((resolve, reject) => {
    let body = '';
    // http模块拿到真实后台api的数据
    http.get(formatURL(request.body.musicname), function(res){
      res.on('data', (data) => {
        body += data;
      }).on('end', () => {
        // 格式化
        const {
          name,
          audio: musicUrl,
          page,
          album: {
            name: musicName,
            picUrl,
          },
          artists: [{
            name: singer,
          }],
        } = JSON.parse(body).result.songs[0];
        const reply = {
          name,
          picUrl,
          musicUrl,
          page,
          singer,
        };
        resolve(reply);
      });
    });
  });
};
module.exports = POSThttp;
```
```js
var express = require('express');
var POSThttp = require('./POSThttp.js');
var bodyParser = require('body-parser');
// 使用body-parser解析post请求的参数，如果没有，req.body为undefined。
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.post('/', (req, res) => {
  POSThttp(req).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.send(err);
  });
});
app.listen(3000, () => {
  console.log('open wx-audio server successful!')
});
```

> 有了NodeJS之后，前端可以更加专注于视图层，而让更多的数据逻辑放在Node层处理

### node做中间层是什么意思，能具体详说么
问题：

没接触过node，经常看文章说node做中间层，不知道具体指什么意思？比如在程序中解决了什么问题，如果说解决了渲染问题，那也是页面端，前端框架已经解决了，难道说是后端渲染前端框架，然后整个塞到前端吗？

 

解答：

很多项目中后端应用往往不止一个服务，而是一群各司其职的服务，比如nginx的存在就是因为服务器上运行着多个服务，而不同的网络请求由不同的服务处理，需要在这些服务前假设一层nginx做为代理，将请求分发给不同的服务，nginx在这里的角色就相当于中间层。

对于一个比较复杂的web站点，页面中的请求通常分为两种，请求页面与请求数据(ajax)。如果后端是个单体应用，当发现所有请求量太多应付不过来的时候就可以考虑做这样的分离，将处理页面渲染的请求分给另一个服务，挡在前面，自己只负责数据相关的请求。nodejs擅长处理io密集型任务，很适合做处理页面渲染的服务，于是很多人选择了nodejs。淘宝也是类似的架构，据说现在所有淘宝的页面都是由node服务渲染的。

 

讲道理就是用nodejs做静态资源管理和请求转发。
做到后端只管数据接口，前端负责路由，静态资源。

 

加了node的中间层，可以让前端处理view层和control层，后端只负责处理model层。前后端分离比较彻底，分工更明确一些吧。

另外就是有些框架在服务器不是node的时候SEO比较难做。加了node中间层后比较好做SEO

 

node就是链状执行

请求接收 -> 中间件1 -> 中间件2 -> ... 中间件n ... -> 返回

中间件就是某一个处理操作

### 我们使用Node层
1. 转发数据，串接服务
2. 路由设计，控制逻辑
3. 渲染页面，体验优化
4. 中间层带来的性能问题，在异步ajax转成同步渲染过程中得到平衡

[参考](https://www.cnblogs.com/Renyi-Fan/p/9004177.html)