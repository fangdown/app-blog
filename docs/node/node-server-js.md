## 构建nodejs 中间层(js版)

### 目录结构
```
├── client                 客户端工程目录
├── server                 中间层目录
|   ├── src                源文件
|   |   ├── controllers    控制层
|   |   |   ├── index.js   index 首页及相关公共页
|   |   |   └── user.js    api/user 对应路由
|   |   |   └── form.js    api/form 对应路由
|   |   ├── service        接口层
|   |   |   ├── index.js   index 页面逻辑
|   |   |   └── user.js    api/user 对应路由
|   ├── index.js           项目入口文件
|   └── routes.js          路由入口文件
|   └── createApp.js       封装创建的express应用
|   └── package.json         server端src应用启动依赖包
└── package.json
```
###  使用nodemon 启动node服务
好处是自动监听更改，并且不用重启


### 安装依赖包
1. 外层package.json
- nodemon
2. server下package.json
- body-parser
- debug
- express

### nodemon.json配置
```js
{
  "verbose": true,
  "ext": "js",
  "watch": ["server/src"],
  "ignore": ["node_modules", "dist"],
  "exec": "node --inspect=31006 server/src/index.js",
  "env": {
    "PORT": "32000",
    "NODE_ENV": "development",
    "RUNTIME_ENV": "dev",
    "DEBUG": "express:*,config"
  }
}
```
### 启动服务
```js
"scripts": {
    "dev-server": "nodemon"
  },
```

### server端构建
1. 入口文件
```js
const debug = require('debug')
const createApp = require('./createApp')
const routes = require('./routes')
function create() {
  debug('create app');
  return createApp({
    routes,
  });
}
create()
module.exports = create
```
2. express应用
```js
const debug = require('debug')('server');
const express = require("express");
const bodyParser = require("body-parser");

function createApp(settings) {
  debug('create express app');
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  const {routes} = settings
  for (const route in routes) {
      const handle = routes[route];
      if (typeof handle !== 'function')
          continue;
      app.use(route, handle);
  }
  app.listen('3100', function(){
      console.log('服务已经启动')
 })
  return app;
}
module.exports = createApp
```
3. 路由层
```js

const app = require('./controllers/app')
const site = require('./controllers/site')
module.exports = {
  '/': site,
  '/api/app': app,
}
```
3. 控制层
```js
// index.js
const express = require("express");
const router = express.Router()

router.get('/', (req, res) => {
  res.send('hello app')
});

module.exports = router
```

>  这里只是演示最基本情况下的服务端中间层，万变不离其中，最基础的也是最重要的，剩下的就是需要完善一些中间件、api层、及相关工具类

[项目地址](https://github.com/fangdown/node-server-js)