---
title: Webpack5 核心原理与应用实践-笔记
date: 2022-07-20 10:08:43
permalink: /pages/0a0cfa/
categories:
  - 笔记
tags:
  - webpack5
---

# Webpack5 核心原理与应用实践-笔记

## 1.重新认识 Webpack：旧时代的破局者

- 主要讲了前端构建的历史及现状、webpack 的由来
- 介绍什么是 webpack 及优点
  - 将所有代码/非代码文件都统一看作 Module —— 模块对象，以相同的加载、解析、依赖管理、优化、合并流程实现打包，并借助 Loader、Plugin 两种开放接口将资源差异处理逻辑转交由社区实现，实现统一资源构建模型
- webpack 还有学习价值吗

  - 高达 89% 的使用率
  - vite 定位解决特定问题
  - 持续迭代发展

- 如何高效学习 webpack？

  - 上手实践各种场景下的构建配置方法，捋清楚最基本的使用规则
  - 初步理解底层构建流程，学会分析性能卡点，并根据此做出正确性能优化
  - 深入 webpack 扩展原则， 理解 loader 与 plugin 能做什么，怎么做
  - 深挖源码， 理解 webpack 底层工作原理， 加强应用于扩展能力

- 小册讲什么
  - 基础语法篇
  - 性能优化篇
  - 扩展能力篇
  - 核心原理篇

## 2.如何理解 Webpack 配置底层结构逻辑？

- 结构化理解 webpack 配置项

  - 流程类

    - 输入
    - 模块处理
    - 后处理（optimiztation、target、 mode）
    - 输出

  - 工具类
    - 开发效率类
      - watch
      - devtool
      - devServer
    - 性能优化类
      - cache
      - performance
    - 日志类
      - stats
      - infrastructureLogging

- 配置示例讲解
- 脚手架工具
  - vue/cli
  - create-react-app
  - webpack-cli
  - neutrino
  - react-starter-kit

## 3. 如何借助 Babel+TS+ESLint 构建现代 JS 工程环境？

从 3 个角度讲了 webpack 的配置

- 使用 babel

  - 依赖`npm i -D @babel/core @babel/preset-env babel-loader`
  - 配置模块

- 使用 Typescript
  - 依赖 `npm i -D typescript ts-loader`
  - 配置模块
  - 创建 tsconfig.json
- 使用 Eslint

```
# 安装 webpack 依赖
yarn add -D webpack webpack-cli

# 安装 eslint
yarn add -D eslint eslint-webpack-plugin

# 简单起见，这里直接使用 standard 规范
yarn add -D eslint-config-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node
```

- webpack 生成目录结构

  - 匿名 js
  - 依赖模块收集存入对象**webpack_modules**
  - 定义 **webpack_require**函数
  - 增加**webpack_require**函数 三个（d、r、o）方法
  - 执行入口文件 index

  ```
  /* eslint-disable */
  (() => {
    var __webpack_modules__ = {};
    function __webpack_require__(moduleId) {}

    // define getter functions for harmony exports
    (() => {
      __webpack_require__.d = (exports, definition) => {};
    })()


    /* webpack/runtime/hasOwnProperty shorthand */
    (() => {
      __webpack_require__.o = (obj, prop) => {};
    })()


    /* webpack/runtime/make namespace object */
    (() => {
      __webpack_require__.r = (exports) => {};
    })()


    (() => {
      // 执行index的逻辑
    })();
  })();
  ```

## 4. 如何借助预处理器、PostCSS 等构建现代 CSS 工程环境？

- 如何处理 css 资源

  - css-loader : 作用 module.exports = "${css}"
  - style-loader（开发环境）: 将 css 代码注入到 style 标签
  - mini-css-extract-plugin（生产环境）: 将 css 代码抽离到单独的.css 文件，并将文件以 link 方式插入到页面中
  - html-webpack-plugin 自动生成 index.html 文件

    ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5be680b877f44414a4349b62bc0143ba~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

- sass less 的规则应用

## 5. 如何搭建 Vue 全栈开发环境？

略

## 6. 如何搭建 React 全栈开发环境？

- 解析 jsx
  - babel-loader @babel/core @babel/preset-react
- 解析 tsx
  - typescript
  - babel-loader @babel/core @babel/preset-typescript
- 运行时 automatic

  ```
  {
        test: /\.jsx$/,
        loader: 'babel-loader',
        options: {
          'presets': [["@babel/preset-react", {
            "runtime": "automatic"
          }]]
        }
      },
  ```

- ssr 实战

  - webpack

    - weback.base
    - webpack.client
      - WebpackManifestPlugin 插件生成 manifest-client.json
    - webpack.server
      - 不需要 css 具体内容， 只需路径

  - src
    - entry-client.jsx
    - entry-server.jsx
      - 获取 manifest-client.json 中的 js 和 css 注入到 html 中
      - renderToString 生成页面

- create-react-app

  - customize-cra
  - react-app-rewired

- modern js 字节 web 工程体系
