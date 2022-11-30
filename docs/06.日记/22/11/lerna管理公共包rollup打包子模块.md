---
title: lerna管理公共包rollup打包子模块
date: 2022-11-30 14:27:17
permalink: /pages/1a009b/
categories:
  - 日记
tags:
  -
---

# lerna 管理公共包 rollup 打包子模块

## 背景

公司需要形成一个公共依赖包， 将一些公共模块放入该依赖包里供业务使用

## 技术栈

- lerna 管理
- rollup 打包

## 仓库初始化

```
npm install --global lerna

git init fd-core && cd fd-core

lerna init

```

## 创建父包依赖

支持 react 项目， 从 create-react-app 中 eject 出来依赖包， 复制到 dependencies 中，

然后运行`lerna bootstrap`进行安装依赖

## 创建子包

```
lerna create  @fd-core/api
```

会自动生成 packages/api 目录及文件

## 安装 rollup 依赖

```bash
"devDependencies": {
    "@rollup/plugin-commonjs": "15.0.0",
    "@rollup/plugin-json": "^4.1.0",
    "@rollup/plugin-node-resolve": "^9.0.0",
    "@rollup/plugin-typescript": "^6.1.0",
    "babel-preset-react-app": "^9.1.2",
    "less": "^4.1.3",
    "rollup-plugin-peer-deps-external": "^2.2.3",
    "rollup-plugin-postcss": "^4.0.2"
  },
```

## 子包改成 tsx 组件

```tsx
import ChartDemo from "./chart";
export { ChartDemo };
export default ChartDemo;
```

```tsx
import React from "react";

import "./style.less";

interface IProps {
  title: string;
}
const ChartDemo = ({ title }: IProps) => {
  return (
    <div className={"title"}>
      标题： {title}
      <div>描述内容</div>
    </div>
  );
};
export default ChartDemo;
```

## 子包构建

```
yarn build
```

## 业务引用

```tsx
import ChartDemo from "@fd-core/api";
const App = () => {
  return (
    <div className="App">
      123
      <ChartDemo title="demoapi" />
    </div>
  );
};
```

## [详细见仓库](https://github.com/fangdown/lerna-demo)

## 附件

- [lerna](https://www.lernajs.cn/)
- [lerna 指令总览](http://www.febeacon.com/lerna-docs-zh-cn/routes/commands/)
- [最详细的 lerna 中文手册](https://juejin.cn/post/7136925215388499998)
