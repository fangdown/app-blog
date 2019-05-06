## 源码 js-loader

### 说明
加载babel-loader 及相应的前置及插件
```js
module: {
    rules: [
      {
        test: /\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            //用babel-loader 需要把es6转成es5
            presets:[
              '@babel/preset-env'
            ],
            plugins: ['']
          }
        }
      }
    ]
}

```
### 引入eslint
```js
{
  test: /\.js$/,
  use:{
    loader:'eslint-loader',
    options:{
     enforce: 'pre' //强制先执行检查
    }
  }
}

```