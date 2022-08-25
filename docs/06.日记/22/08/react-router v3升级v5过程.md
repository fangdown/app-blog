---
title: react-router v3升级v5过程
date: 2022-08-25 18:49:19
permalink: /pages/2d8b1c/
categories:
  - 日记
tags:
  -
---

# react-router v3 升级 v5 过程

## 背景

项目中使用了 react-router 版本 V3， 因为要接入一个外部项目， 外部项目使用了 V5 版本, 为了更好的接入，需将 V3 版本升级到 V5 版本

## 分析

### 版本现状

- "react-router": "3.2.1",
- "@types/react-router": "^3.0.20",

### 差异

- V3 版本无法使用 useLocation、useHistory 等新特性
- V5 版本没有 onEnter、onChange 方法、不需传 history

## 解决

### 升级版本

- "react-router-dom": "^5.2.0",
- "@types/react-router-dom": "^5.3.3",

### 替换 history 引用

- V3 版本： `const { history } = props`
- V5 版本： ` const history = useHistory`

### onEnter onChange 处理

在组件内触发方法（如权限）

```js
useEffect(() => {
  permission();
}, [])``;
```
