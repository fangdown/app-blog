---
title: react事件冒泡失效-事件争夺权
date: 2022-11-22 16:58:46
permalink: /pages/fa9f74/
categories:
  - 日记
tags:
  -
---

# react 事件冒泡失效-组件包裹的问题

## 背景

有一个需求使用 dropdown 组件， dropdown 内容自定义，非 Menu 菜单， 点击 icon 触发 dropdown 显示，点击内容区外，关闭弹窗，点击内容区内，不关闭弹窗

## 相关技术

- react
- antd
- dropdown

## 代码

```js
const baseInfo = (
        <div
            className="card-base-info"
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            内容区域内容区域内容区域内容区域内容区域
        </div>)
// ....
<Dropdown overlay={baseInfo} trigger={["click"]}>
  <span className="card-title-down"></span>
</Dropdown>
```

## 分析

给内容区域增加了阻止冒泡事件

```js
<div onClick={e => e.stopPropagation()}>
```

结果： 没生效，点击内容区域仍然关闭了

- 解决方案 1,增加原生阻止冒泡，不生效

```js
// 日志会被打印，代表执行了
console.log('stop)
e.stopPropagation();
e.nativeEvent.stopPropagation();
e.nativeEvent.stopImmediatePropagation();
```

- 苦恼中， 脑细胞思考中，到底是哪里出了问题呢

- overlay 相关？

## 解决

尝试在 overlay 中增加一个 div 标签包裹内容，猜测可能是组件对 overlay 做了什么不为人知的处理

```js
<Dropdown overlay={<div>{baseInfo}</div>} trigger={["click"]}>
  <span className="card-title-down"></span>
</Dropdown>
```

刷新页面，发现点击内容区域不关闭弹窗了， 问题得到了解决

那么就是 overlay 对传入的元素做了处理，第一层的事件处理被接手了，导致我们设置的事件冒泡不生效

我们在第二层中做了一下阻止冒泡就生效了

## 总结

思考这个问题， 知道解决问题的思路， 通过阻止冒泡的原理避免被关闭

但在业务使用的过程中， 尤其是使用一些公共组件、外部组件时， 正常设置的代码可能就被污染了，得不到正确的反馈结果

所以一定要逐步分析可能影响结果的过程才能快速准确的解决问题
