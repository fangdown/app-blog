---
title: webpack自定义文案插件plugin简单入门
date: 2022-07-06 16:47:36
permalink: /pages/893c91/
categories:
  - 日记
tags:
  - webpack
---

# webpack自定义文案插件plugin简单入门
## 目标
在构建完成之后，输出带有颜色的自定义文案


## 极简插件示例
```js
class HelloWorldPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('Hello World Plugin', (
      stats /* 在 hook 被触及时，会将 stats 作为参数传入。*/
    ) => {
      console.log('Hello World!');
    });
  }
}
module.exports = HelloWorldPlugin;
```

## 了解插件触发时机-5次
- entryOption : 在 webpack 选项中的 entry 配置项 处理过之后，执行插件。
- afterPlugins : 设置完初始插件之后，执行插件。
- compilation : 编译创建之后，生成文件之前，执行插件。同步方式。
- emit : 生成资源到 output 目录之前。
- done : 编译完成。

## 触发方式
- tap ：以同步方式触发钩子；
- tapAsync ：以异步方式触发钩子；
- tapPromise ：以异步方式触发钩子，返回 Promise；


```js
const chalk = require("chalk");
const PLGIN_NAME = "DevMessagePlugin";
class DevMessagePlugin {
  apply(compiler) {
    compiler.hooks.entryOption.tap(
      PLGIN_NAME,
      (compilation, callback) => {
        console.info(chalk.yellow("entryOption 阶段"))
      }
    );
    compiler.hooks.afterPlugins.tap(
      PLGIN_NAME,
      (compilation, callback) => {
        console.info(chalk.yellow("afterPlugins 阶段"))
      }
    );
    compiler.hooks.compilation.tap(
      PLGIN_NAME,
      (compilation, callback) => {
        console.info(chalk.yellow("compilation 阶段"))
      }
    );
    compiler.hooks.emit.tap(
      PLGIN_NAME,
      (compilation, callback) => {
        console.info(chalk.yellow("emit 阶段"))
      }
    );
    compiler.hooks.done.tap(PLGIN_NAME, () => {
      setTimeout(() => {
        console.info(
         chalk.green(`done 阶段，输出开发环境的彩蛋，chalk5版本不用用cjs了😭，百度地址 = ${chalk.yellow('http://www.baidu.com')}`)
        );
      }, 10);
    });
  }
}

module.exports = DevMessagePlugin;

```
- webpack 输出信息
```bash

entryOption 阶段
afterPlugins 阶段
(node:99715) [DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE] DeprecationWarning: 'onAfterSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:99715) [DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE] DeprecationWarning: 'onBeforeSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
compilation 阶段
compilation 阶段
Starting the development server...

emit 阶段
Compiled successfully!

You can now view app-micro-webpack-plugin in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://10.94.100.80:3000

Note that the development build is not optimized.
To create a production build, use yarn build.

webpack compiled successfully
done 阶段，输出开发环境的彩蛋，chalk5版本不用用cjs了😭，百度地址 = http://www.baidu.com

```

## 显示webpack 构建信息
修改node_modules/react-dev-utils/clearConsole.js 文件：

```js
'use strict';

function clearConsole() {
  if (process.env.REACT_APP_NO_CLEAR_CONSOLE) {
    return;
  }
  process.stdout.write(
    process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
  );
}

module.exports = clearConsole;

```

```
// package.json
{
  "scripts": {
    "start": "REACT_APP_NO_CLEAR_CONSOLE=true react-app-rewired start",
  }
}
```