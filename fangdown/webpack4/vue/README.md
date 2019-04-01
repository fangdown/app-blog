# 微官网
###Project Structure 项目结构
├── build                     webpack配置文件
│   ├──...
│   ├──webpack.config.dev.js   开发环境配置(启动速度优化)
│   ├──webpack.config.prod.js  生产环境配置(打包体积优化)
├── config                     生产环境/开发环境动态配置项
├── dist                       打包目录
├── node_modules               node模块目录
├── template                   模板文件（未用）
│   └──index.html
├── src
|   ├── index.js               项目入口文件
|   ├── App.vue                应用入口文件
|   ├── router                 路由文件夹
│   │   ├── modules            模块路由
│   │   └── index.js           主路由，对外暴露
│   ├── store                  vuex目录
│   │   ├── mutation.js        模块vuex
│   │   └── index.js           vuex主文件
│   ├── public                 通用模块
│   │   ├── component          通用功能组件
│   │   ├── plugins            通用vue插件
│   │   ├── template           首页模板
│   │   ├── util               工具类
│   │   │   ├── index.js       通用工具
│   │   │   └── constant.js    通用常量配置
│   │   └── lib                第三方目录
│   ├── pages                  页面模块
│   │   ├── xxx                模块文件夹
│   │   │   ├── xxx.vue        模块文件
│   │   │   ├── xxx.api.js     模块文件接口
│   │   └── └── component      模块组件文件夹
│   ├── locales                国际化目录（待配置）
│   ├── assets                 通用样式图片目录
├── static                     静态资源
├── .gitignore                 git忽略文件
├── .babelrc                   babel插件
├── .eslintignore              eslint忽略文件
├── .eslintrc                  eslint配置
├── .postcssrc                 postcss插件
├── package.json               项目包
├── README.md                  自我描述
└── yarn.lock                  yarn包文件
## 运行
```
1. npm i // 安装依赖包
2. npm start // 运行开发环境
3. npm run build // 编译生产环境代码
```

## 目录结构
```
1、assets
  存放静态资源文件，字体图标，全局公共样式，图片资源

2、pages
  存放各个各个页面的源码

  //示例 index ：首页
  index.js // 页面开始打包的入口文件
  App.vue // 页面第一个组件
  app.js // 页面接口
  router // 存放当前页面的路由配置
  components //当前页面的业务组件

3、public 
  包含公共组件、ajax调用、工具方法、html模板

  components
  公用组件，使用index.js 抛出
  service
  提供ajax调用基础方法，做公共的拦截，提供接口调用通用处理方法
  util
  公共的方法及公用方法
  template
  html入口通用模板
4、static
  静态资源文件，会复制进入编译后的static目录下

```

## eslint配置
1. vscode配置中添加一下代码
```
"eslint.autoFixOnSave": true,
"eslint.validate": [
        "javascript",
        "javascriptreact",
        {
             "language": "vue",
            "autoFix": true
        }
    ]
```
2. 在.eslintrc.js中添加
```
module.exports = {
    // ...
    "extends": [
           "standard",
           "plugin:vue/base"
      ]
}
```

### 5. 命名规范
```
命名法说明
1).camel命名法，形如thisIsAnApple
2).pascal命名法，形如ThisIsAnApple
3).下划线命名法，形如this_is_an_apple
4).中划线命名法，形如this-is-an-apple
 
1、文件夹命名
使用名词，采用camel命名法
2、js
采用camel命名法
3、vue
vue组件采用pascal命名法,例如:CarList.vue
组件注入依然使用 CarList
模板template中书写方法 <car-list></car-list>或<car-list/>
4、css
文件命名采用camel命名法
类明采用中划线命名法，例如：table-container
5、其他
尽量使用常用单词，使用简写需要时大家都能明白的简写
 
```