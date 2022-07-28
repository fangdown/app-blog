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

## 7. 使用 Webpack 构建 NPM Library 的正确方式

- 流程

  - 初始化项目
  - 编写业务代码
  - 配置 webpack.config.js

  ```js
  // umd模式区别
  (function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module === "object")
      module.exports = factory();
    else if (typeof define === "function" && define.amd) define([], factory);
    else if (typeof exports === "object") exports["_"] = factory();
    else root["_"] = factory();
  })(self, function () {
    // ...
  });
  ```

  - 正确使用第三方包

    - 不去掉时， 打包体积变大 `569k`
    - 使用 externals 去掉 `4k`
      - peerDependencies + webpack-node-externals

  - 抽离 css `mini-css-extract-plugin `
  - 生成 sourcemap
    - devtool: 'source-map'
  - 其他配置
    - .npmignore 发布忽略
    - prepublishOnly `"prepublishOnly": "webpack --mode=production"`
    - package.json 中 增加 module 入口 `"module": "src/index.js"`

## 8. 使用 Webpack 构建微前端应用

使用 `ModuleFederationPlugin` 插件实现， 不做细读

## 9.如何借助 Webpack 开发 PWA、Node、Electron 应用？

- pwa node 略微了解一下
- electron 按代码示例跑了一个 app 出来了，

## 10. 深入理解图像加载原理与最佳实践

- webpack4 导入图像
  - url-loader
    - limit 限制， 超过则使用 file-loader， 不超过则 base64 文本
  - file-loader
    - 重命名后的文件路径
  - raw-loader
    - SVG 资源会被直接复制成字符串形式
- webpack5 特点

  - file-loader --> `type="asset/resource"`
  - url-loader --> `type="asset" 或者 type="asset/inline"`
  - raw-loader --> `type = "asset/source"`

- 图片优化
  - 压缩
    - image-webpack-loader
    - 生产情况下使用 ` disable: process.env.NODE_ENV === 'development'`
  - 雪碧图
    - SpritesmithPlugin (了解即可，http2 时代已无用)
  - 响应式
    - responsive-loader

## 11.深入理解 Webpack 核心配置结构

- `配置`驱动的构建工具
- 配置结构
  - 对象
  - 数组
  - 函数

```
module.exports = {
  entry: './src/index.js',
  // 其它配置...
};

module.exports = [{
  entry: './src/index.js',
  // 其它配置...
}, {
  entry: './src/index.js',
  // 其它配置...
}];

module.exports = function(env, argv) {
  // ...
  return {
    entry: './src/index.js',
    // 其它配置...
  }
}
```

- 环境治理策略
  通过`webpack-merge`进行合并，属性合并而非替换

```

└── config
  ├── webpack.common.js
  ├── webpack.development.js
  ├── webpack.testing.js
  └── webpack.production.js
```

- entry 配置
  - 字符串
  - 对象
  - 函数
  - 数组
- output

  - path
  - filename
  - publicPath
  - clean
  - library
  - chunkLoading

- target

  - web
  - node
  - Electron
  - WebWorker

- mode
  - development
  - production
  - none

## 12. 构建性能：分享 7 款常用的性能分析工具

- webpack 不足方面

  - 单线程 运算效率不高
  - 大项目借助许多插件、loader 完成大量的文件读写、代码编译

- 核心流程
  - 初始化阶段
    - 初始化参数
    - 创建编译器 compiler 对象
    - 初始化编译环境
    - 开始编译 run 方法
    - 确定入口
  - 构建阶段
    - 编译模块
    - 完成模块编译
  - 生成阶段
    - 合并 seal
    - 优化 optimization
    - 写入文件系统
- 性能问题
  大量 IO 和 CPU 操作，无法利用多核能力
  - 构建阶段
    - 文件层次深度
    - loader 的数量与复杂度
    - 代码复杂度
    - 模块数量
  - 生成阶段
    - splitChunks 分包算法复杂
    - Terser 大量 AST 计算
- 性能分析

  - 收集数据 stats ` npx webpack --json=stats.json`

  ```
  // webpack.config.js
  module.exports = {
    // ...
    profile: true
  }
  ```

- 可视化工具
  - Webpack Analysis
  - Statoscope
  - Webpack Visualizer
  - Webpack Bundle Analyzer
  - Webpack Dashboard
  - Unused Webpack Plugin

## 13. 如何使用 Webpack 持久化缓存大幅提升构建性能？

- webpack5 持久化缓存
  - cache
    - type `memory`| `filesystem`
    - cacheDirectory
    - buildDependencies
    - managedPaths
    - profile
    - maxAge

```
module.exports = {
    //...
    cache: {
        type: 'filesystem'
    },
    //...
};
```

- 缓存原理
  ![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58feafdeed084eefa40f12f98b627262~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

- webpack4

  - cache-loader：针对 Loader 运行结果的通用缓存方案；

  > 借助这种能力，我们可以打通本地与线上 CI/CD 环境，实现开发与生产环境构建的构建性能优化。

  ```js
  const redis = require("redis");
  const client = redis.createClient();
  // 读数据
  async function read(key, callback) {
    // ...
    const result = await client.get(key);
    const data = JSON.parse(result);
    callback(null, data);
  }

  // 写数据
  async function write(key, data, callback) {
    // ...
    await client.set(key, JSON.stringify(data));
    callback();
  }
  module.exports = {
    // ...
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: "cache-loader",
              // 传入 read、write 函数
              options: { read, write },
            },
            "babel-loader",
          ],
        },
      ],
    },
  };
  ```

- hard-source-webpack-plugin ：针对 Webpack 全生命周期的通用缓存方案；

> 首次运行时，hard-source-webpack-plugin 会在缓存文件夹 node_module/.cache 写入一系列日志文件,

> 下次运行时，hard-source-webpack-plugin 插件会复用缓存中记录的数据，跳过一系列构建步骤，从而提升构建性能。

```js
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

module.exports = {
  // ...
  plugins: [new HardSourceWebpackPlugin()],
};
```

- babel-loader：针对 Babel 工具的专用缓存能力；

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.m?js$/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  // ...
};
```

- eslint-loader：针对 ESLint 的专用缓存方案；
- stylelint-webpack-plugin：针对 StyleLint 的专用缓存方案。

```js
// webpack.config.js
module.exports = {
  plugins: [
    new ESLintPlugin({ cache: true }),
    new StylelintPlugin({ files: "**/*.css", cache: true }),
  ],
};
```

## 14.Webpack 都有哪些实现并行构建的方法？

- HappyPay
  - webpack4 推荐(作者不维护了， 不推荐使用)
  - 缺点
    - 子进程开销
    - 作用在于文件加载阶段，收益有限
  ```js
  const HappyPack = require("happypack");
  module.exports = {
    // ...
    module: {
      rules: [
        {
          test: /\.js?$/,
          // 使用 `id` 参数标识该 Loader 对应的 HappyPack 插件示例
          use: "happypack/loader?id=js",
        },
        {
          test: /\.less$/,
          use: "happypack/loader?id=styles",
        },
      ],
    },
    plugins: [
      new HappyPack({
        // 注意这里要明确提供 id 属性
        id: "js",
        loaders: ["babel-loader", "eslint-loader"],
      }),
      new HappyPack({
        id: "styles",
        loaders: ["style-loader", "css-loader", "less-loader"],
      }),
    ],
  };
  ```
- Thread-loader

  - 官网迭代中
  - 缺点
    - 兼容问题
    - 无法获取实例对象，webpack 配置

  ```js
  module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: "thread-loader",
              options: {
                workers: 2,
                workerParallelJobs: 50,
                // ...
              },
            },
            "babel-loader",
            "eslint-loader",
          ],
        },
      ],
    },
  };
  ```

- Parallel-Webpack

  - 多入口打包

- 并行压缩

```js
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 2, // number | boolean
      }),
    ],
  },
};
```

## 15. 有哪些值得学习的构建性能极致优化技巧？

- 使用最新版 webpack
- 使用 lazyCompilation
  - 只构建被用到的模块
  - 实验阶段， 开发环境使用

```js
// webpack.config.js
module.exports = {
  // ...
  experiments: {
    lazyCompilation: true,
  },
};
```

- loader 范围

  - exclude
  - include

- noParse 跳过文件编译
  - 注意部分未打包问题，配合`resolve.alias`解决

```js
// webpack.config.js
module.exports = {
  //...
  module: {
    noParse: /lodash|react/,
  },
  resolve: {
    alias: {
      react: path.join(
        __dirname,
        process.env.NODE_ENV === "production"
          ? "./node_modules/react/cjs/react.production.min.js"
          : "./node_modules/react/cjs/react.development.js"
      ),
    },
  },
};
```

- 开发模式禁用产物优化

```js
module.exports = {
  // ...
  mode: "development",
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    minimize: false,
    concatenateModules: false,
    usedExports: false,
  },
};
```

- 最小化 watch 监控范围

```js
// webpack.config.js
module.exports = {
  //...
  watchOptions: {
    ignored: /node_modules/,
  },
};
```

- 跳过 Ts 类型检查

```js
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // fork 出子进程，专门用于执行类型检查
    new ForkTsCheckerWebpackPlugin(),
  ],
};
```

- 优化 Eslint 性能

```js
const ESLintPlugin = require("eslint-webpack-plugin");
module.exports = {
  // ...
  plugins: [new ESLintPlugin(options)],
  // ...
};
``;
```

- 慎用 source-map

  - 开发： eval
  - 生产： source-map

- resolve 缩小范围
  - extensions
  - modules
  - mainFiles

## 16.如何正确使用 SplitChunks 提升应用性能？

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8a66c3358fb42e59660a0640210f359~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

- minChunks：用于设置引用阈值，被引用次数超过该阈值的 Module 才会进行分包处理；
- maxInitialRequest/maxAsyncRequests：用于限制 Initial Chunk(或 Async Chunk) 最大并行请求数，本质上是在限制最终产生的分包数量；
- minSize： 超过这个尺寸的 Chunk 才会正式被分包；
- maxSize： 超过这个尺寸的 Chunk 会尝试继续做分包；
- maxAsyncSize： 与 maxSize 功能类似，但只对异步引入的模块生效；
- maxInitialSize： 与 maxSize 类似，但只对 entry 配置的入口模块生效；
- enforceSizeThreshold： 超过这个尺寸的 Chunk 会被强制分包，忽略上述其它 size 限制；
- cacheGroups：用于设置缓存组规则，为不同类型的资源设置更有针对性的分包策略。

```js
module.exports = {
  mode: "development",
  devtool: false,
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];

            return `npm.${packageName.replace("@", "")}`;
          },
        },
      },
    },
  },
};
```

## 17. 不止 Terser：揭秘代码压缩的门门道道

- 代码压缩原理
  - 精简名称、空格 声明
    `const name = 'fangdown` ---> `let a='fangdown'`
- 使用 TerserWebpackPlugin 压缩 JS
  - test：只有命中该配置的产物路径才会执行压缩，功能与 module.rules.test 相似；
  - include：在该范围内的产物才会执行压缩，功能与 module.rules.include 相似；
  - exclude：与 include 相反，不在该范围内的产物才会执行压缩，功能与 module.rules.exclude 相似；
  - parallel：是否启动并行压缩，默认值为 true，此时会按 os.cpus().length - 1 启动若干进程并发执行；
  - minify：用于配置压缩器，支持传入自定义压缩函数，也支持 swc/esbuild/uglifyjs 等值，下面我们再展开讲解；
  - terserOptions：传入 minify —— “压缩器”函数的配置参数；
  - extractComments：是否将代码中的备注抽取为单独文件，可配合特殊备注如 @license 使用

```js
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: { foo: "./src/foo.js", bar: "./src/bar.js" },
  output: {
    filename: "[name].js",
    // ...
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /foo\.js$/i,
        extractComments: "all",
      }),
      new TerserPlugin({
        test: /bar\.js/,
        extractComments: false,
      }),
    ],
  },
};
```

- 使用 CssMinimizerWebpackPlugin 压缩 CSS

  - 支持`test、include、exclude、minify、minimizerOptions`配置
  - minify
    - CssMinimizerPlugin.cssnanoMinify：默认值，使用 cssnano 压缩代码，不需要额外安装依赖；
    - CssMinimizerPlugin.cssoMinify：使用 csso 压缩代码，需要手动安装依赖 yarn add -D csso；
    - CssMinimizerPlugin.cleanCssMinify：使用 clean-css 压缩代码，需要手动安装依赖 yarn add -D clean-css；
    - CssMinimizerPlugin.esbuildMinify：使用 ESBuild 压缩代码，需要手动安装依赖 yarn add -D esbuild；
    - CssMinimizerPlugin.parcelCssMinify：使用 parcel-css 压缩代码，需要手动安装依赖 yarn add -D @parcel/css。

```js
module.exports = {
  mode: "development",
  devtool: false,
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /.css$/,
        // 注意，这里用的是 `MiniCssExtractPlugin.loader` 而不是 `style-loader`
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // Webpack5 之后，约定使用 `'...'` 字面量保留默认 `minimizer` 配置
      "...",
      new CssMinimizerPlugin(),
    ],
  },
  // 需要使用 `mini-css-extract-plugin` 将 CSS 代码抽取为单独文件
  // 才能命中 `css-minimizer-webpack-plugin` 默认的 `test` 规则
  plugins: [new MiniCssExtractPlugin()],
};
```

- 使用 HtmlMinifierTerser 压缩 HTML
  - collapseWhitespace：删除节点间的空字符串
  - removeComments：删除备注
  - collapseBooleanAttributes：删除 HTML 的 Boolean 属性值

```js
module.exports = {
  mode: "development",
  devtool: false,
  entry: { foo: "./src/index.js" },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      // Webpack5 之后，约定使用 `'...'` 字面量保留默认 `minimizer` 配置
      "...",
      new HtmlMinimizerPlugin({
        minimizerOptions: {
          // 折叠 Boolean 型属性
          collapseBooleanAttributes: true,
          // 使用精简 `doctype` 定义
          useShortDoctype: true,
          // ...
        },
      }),
    ],
  },
  plugins: [
    // 简单起见，这里我们使用 `html-webpack-plugin` 自动生成 HTML 演示文件
    new HtmlWebpackPlugin({
      templateContent: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>webpack App</title>
      </head>
      <body>
        <input readonly="readonly"/>
        <!-- comments -->
        <script src="index_bundle.js"></script>
      </body>
    </html>`,
    }),
  ],
};
```
## 18. 还有哪些值得学习的应用性能极致优化技巧？
- 细碎方法
  - 使用动态加载、减少首屏资源加载量
  - 使用externals、tree-shaking、scope hoisting 等特性减少体积
  - 正确使用`[hash]`占位符， 优化http资源缓存效率

- 动态加载
  - 动态加载是 Webpack 内置能力之一， ，我们不需要做任何额外配置就可以通过动态导入语句(`import、require.ensure`)轻易实现
  ```js
  import someBigMethod from "./someBigMethod";

  document.getElementById("someButton").addEventListener("click", () => {
    someBigMethod();
  });
  // 优化
  document.getElementById("someButton").addEventListener("click", async () => {
  //  使用 `import("module")` 动态加载模块
    const someBigMethod = await import("./someBigMethod");
    someBigMethod();
  });
  ```
- HTTP缓存优化
  - [fullhash] ： 项目hash， 一变全变
  - [chunkhash]： 对应chunk, 一变对应变
  - [contenthash]： 对应内容，内容变化才变，实用性高
  ```js
  module.exports = {
    entry: { index: "./src/index.js" },
    mode: "development",
    devtool: false,
    output: {
      filename: "[name]-[contenthash].js",
      path: path.resolve(__dirname, "dist")
    },
    // 将运行时代码抽取到 `runtime` 文件中
    optimization: { runtimeChunk: { name: "runtime" } },
  };
  ```
  - 使用外置依赖
    外置lodash/react等
    ```js
    module.exports = {
      // ...
      externals: {
        react: "React",
        lodash: "_",
      },
      plugins: [
        new HtmlWebpackPlugin({
          templateContent: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Webpack App</title>
      <script defer crossorigin src="//unpkg.com/react@18/umd/react.development.js"></script>
      <script defer crossorigin src="//unpkg.com/lodash@4.17.21/lodash.min.js"></script>
    </head>
    <body>
      <div id="app" />
    </body>
    </html>
      `,
        }),
      ],
    };
    ```
- tree shaking
```js
// webpack.config.js
module.exports = {
  mode: "production",
  optimization: {
    usedExports: true,
  },
};

```

- hoisting
  -  将符合条件的多个模块合并到同一个函数空间,减少体积

  ```js
  const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

  module.exports = {
      // 方法1： 将 `mode` 设置为 production，即可开启
      mode: "production",
      // 方法2： 将 `optimization.concatenateModules` 设置为 true
      optimization: {
          concatenateModules: true,
          usedExports: true,
          providedExports: true,
      },
      // 方法3： 直接使用 `ModuleConcatenationPlugin` 插件
      plugins: [new ModuleConcatenationPlugin()]
  };
  ```
  - 监控产物
  ```js
  module.exports = {
    // ...
    performance: {    
      // 设置所有产物体积阈值
      maxAssetSize: 172 * 1024,
      // 设置 entry 产物体积阈值
      maxEntrypointSize: 244 * 1024,
      // 报错方式，支持 `error` | `warning` | false
      hints: "error",
      // 过滤需要监控的文件类型
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith(".js");
      },
    },
  };
```