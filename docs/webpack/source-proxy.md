## 源码-代理

> proxy代理解决跨域的问题

```js

devServer:{
  // 配置代理
  proxy:{
    '/api': {
      target: 'http://xxx.com',
      pathRewrite:{
        '/api': ''
      }
    }
  }
}
```

2. mock数据
```js
devServer: {
  before(app){
    app.get('/user', (req, res)=>{
      console.log('res',res)
    })
  }
}
```

3. 服务端启动webpack
node server.js
```js
const webpack = require('webpack')
const config = require('./webpack.config.js')
const complier = webpack(config)
const middle = require('webpack-dev-middleware')
app.use(middle(complier))

app.get('/user', (req, res)=>{
  console.log('res',res)
})
```