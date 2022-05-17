---
title: create-react-app使用less、scss的经验
date: 2022-05-17 17:51:52
permalink: /pages/d1e208/
categories:
  - 日记
tags:
  - react
---

# create-react-app使用less、scss的经验

## 背景
react项目中使用scss/less样式

## 增加scss
- yarn add sass sass-resources-loader

- 在config-overrides.js 增加配置
```js
const {
    override,
    addWebpackAlias,
    fixBabelImports,
    addWebpackModuleRule,
} = require('customize-cra');
// ...
module.exports = {
    // ...
    addWebpackModuleRule({
        test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
                {
                    loader: 'sass-resources-loader',
                    options: {
                        // 可选
                        resources: ['./src/global/var.scss']
                    }
                }
            ] 
        }) 
}
```
- 新建/src/global/var.scss
```
@mixin posTl($top, $left) {
  position: absolute;
  left: $left;
  top: $top;
}
$color: red;

```
- 重启项目即可

## 增加less
- 增加配置
- ```yann add less less-loader```

- 配置
```js
const {
    override,
    addWebpackAlias,
    fixBabelImports,
    addWebpackModuleRule,
    addLessLoader,
    adjustStyleLoaders,
} = require('customize-cra');

module.exports = {
    // ...
    // 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import)
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, //自动打包相关的样式 默认为 style:'css'
    }),
    addWebpackModuleRule({
        test: /\.scss$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader',
            {
                loader: 'sass-resources-loader',
                options: {
                    resources: ['./src/global/var.scss'],
                },
            },
        ],
    }),
    //less-loader
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            localIdentName: '[local]--[hash:base64:5]',
        },
    }),
    // less配置时有些报postcss错误， 增加以下配置解决
    adjustStyleLoaders(({ use: [, , postcss] }) => {
        const postcssOptions = postcss.options;
        postcss.options = { postcssOptions };
    }),
    // ...
}
```
- 重启项目即可