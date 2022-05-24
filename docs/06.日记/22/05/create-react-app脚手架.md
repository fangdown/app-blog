---
title: create-react-app完善router+typescript+eslint规范+antd+sass模块化
date: 2022-05-17 17:51:52
permalink: /pages/d1e208/
categories:
  - 日记
tags:
  - react
---

# 功能架构
- creat-react-app
- typescript
- eslint
- prettier
- husky
- Router v6
- react-app-rewired customize-cra
- sass
- less


## 背景
react项目中使用scss/less样式

## creat-react-app
```
yarn create react-app react-router-sass-antd-ts --template typescript

```

## 新增路由
```
yarn add react-router-dom
```
### APP引入路由
```js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import About from './component/about';
import Home from './component/home';

function App() {
  return (
    <Router >
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
    </Router>
  );
}

export default App;

```

## eslint + prettier+ husky规范
- 安装依赖
```
yarn add eslint husky lint-staged prettier eslint-plugin-prettier eslint-config-prettier eslint-config-alloy @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

- 修改package.json
```
scripts:{
  ...,
  "eslint": "eslint src --ext .ts,.js",
  "fix:eslint": "eslint src --fix --ext .ts,.js",
  "fix:prettier": "prettier --write \"**/*.{ts,tsx,js,jsx,json,css,less,yml,yaml,md}\""
}

"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "src/**/*.{ts,js}": [
    "eslint --fix --ext .ts,.js",
    "prettier --write",
  ]
},
```

- 新增.eslintrc.js
```js
module.exports = {
    extends: [
        'alloy',
        'alloy/typescript',
        // 使用prettier中的样式规范，且如果使得ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出
        'plugin:prettier/recommended',
    ],
    env: {
        // 您的环境变量（包含多个预定义的全局变量）
        // Your environments (which contains several predefined global variables)
        browser: true,
        node: true,
        es6: true,
        // mocha: true,
        jest: true,
        // jquery: true
    },
    globals: {
        // 您的全局变量（设置为 false 表示它不允许被重新赋值）
        // Your global variables (setting to false means it's not allowed to be reassigned)
        // myGlobal: false
    },
    settings: {},
    // "off" 或 0 - 关闭规则
    // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
    // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
    rules: {
        // TODO：代表要修复，没有标记则规则保留规则"off"状态
        // 在类属性和方法上需要显式的可访问性修饰符
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        // 确保了this.props在constructor完成之前就被赋值
        '@typescript-eslint/no-useless-constructor': 'off',
        //  待定
        '@typescript-eslint/no-dynamic-delete': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/prefer-optional-chain': 'off',
        // 必须使用 === 或 !==，禁止使用 == 或 !=
        eqeqeq: 'off',
        // 禁止变量申明时用逗号一次申明多个
        'max-params': 'off',
        // 强制可嵌套的块的最大深度
        'no-useless-constructor': 'off',
        // 关闭禁止不必要的布尔类型转换
        'no-extra-boolean-cast': 'off',
        // 禁止重复导入模块，可留
        // TODO
        'no-duplicate-imports': 'off',
        // 禁止使用较短的符号实现类型转换
        'no-implicit-coercion': 'off',
        // 禁止在对象中使用不必要的计算属性
        'no-useless-computed-key': 'off',
        'no-undef': 'off',
        'one-var': 'off',
        // 默认情况下，parseInt()将自动检测十进制和十六进制(通过0x前缀),可留
        // TODO
        radix: 'off',
        // 强制在注释中 // 或 /* 使用一致的空格，可留，修改很大
        // TODO
        'spaced-comment': 'off',
        // 条件判断中字面量在先而变量在第二的位置
        yoda: 'off',
        'no-unused-vars': 'error',
    },
};
```
- 新增.pretterrc
```
{
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 4
}

```
- vscode配置 保存格式化
新建.vscode/setting.json
```
{
    "editor.formatOnType": true,
    "editor.formatOnSave": true
}
```
## 引入antd
```
yarn add antd

```
- 在src/App.css中引入css
```
@import '~antd/dist/antd.css';
```
## 配置webpack
```
yarn add react-app-rewired customize-cra
```
- 修改package.json
```
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
}
```
- 新建config-overrides.js

```js
// config-overrides.js
const webpackConfig = require('./config/webpack.config');
module.exports = {
    webpack: webpackConfig,
    devServer: (configFunction) => {
        return (proxy, allowedHost) => {
            const config = configFunction(proxy, allowedHost);
            config.historyApiFallback = true;
            config.open = false;
            config.hot = false;
            config.liveReload = false;
            config.headers = {
                'Access-Control-Allow-Origin': '*',
            };
            return config;
        };
    },
};

```
- 新建webpack.config.js
```js
//用于修改webpack默认配置
const {
    override,
} = require('customize-cra');
const path = require('path');
module.exports = override();

```
## 增加scss模块化
```
yarn add sass
```
- 修改config.js
```js
const {
    override,
    addWebpackAlias,
    fixBabelImports,
    addWebpackModuleRule,
    addLessLoader,
    adjustStyleLoaders,
} = require('customize-cra');
const path = require('path');
module.exports = override(
    addWebpackModuleRule({
        test: /\.scss$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        localIdentName: '[local]--[hash:base64:5]',
                    },
                },
            },
            'sass-loader',
        ],
    })
);

```
- 测试scss
新建style.scss， 引入使用

```
import s from './style.scss'

<div classname={s.content}>content</div>
```
## 增加less模块化
- 依赖安装
```
yarn add less less-loader
```
```js
//用于修改webpack默认配置
const {
    override,
    addWebpackAlias,
    fixBabelImports,
    addWebpackModuleRule,
    addLessLoader,
    adjustStyleLoaders,
} = require('customize-cra');
const path = require('path');
module.exports = override(
    addWebpackModuleRule({
        test: /\.scss$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        localIdentName: '[local]--[hash:base64:5]',
                    },
                },
            },
            'sass-loader',
        ],
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            localIdentName: '[local]__[hash:base64:5]',
        },
    }),
    // 加了这么个配置
    adjustStyleLoaders(({ use: [, , postcss] }) => {
        const postcssOptions = postcss.options;
        postcss.options = { postcssOptions };
    })
);

```
- 测试less
新建style.less， 引入使用

```
import s from './style.module.scss'

<div classname={s.content}>content</div>
```

- 找不到模块“./style.scss” 或less或其相应的类型声明。ts(2307)
解决方法： 在src目录下新建types.d.ts

```
declare module '*.scss';
declare module '*.less';
```

## antd及别名
```js

const {
    override,
    addWebpackAlias,
    fixBabelImports,
    addWebpackModuleRule,
    addLessLoader,
    adjustStyleLoaders,
} = require('customize-cra');
module.exports = override(
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src'),
    }),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, //自动打包相关的样式 默认为 style:'css'
    }),
）
// ...
```