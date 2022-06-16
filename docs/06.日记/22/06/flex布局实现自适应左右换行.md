---
title: flex布局实现自适应左右换行
date: 2022-06-16 10:35:40
permalink: /pages/a024b1/
categories:
  - 日记
tags:
  - flex
---

# flex布局实现自适应左右换行

## 需求
在header一行中， 有左右2个功能块， 左右排列， 当屏幕缩小时，右侧内容自适应的换行到左功能模块下方


## 分析
考虑用到flex布局+ antd解决

## 解决
```js

<Row className={s.responseRow}>
    <Col className={s.l1}>
        <div>
        内容1
        </div>
    </Col>
    <Col className={s.l2}>
        内容2
    </Col>
</Row>
```
```css
.responseRow {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    margin: -8px 0 0 -8px;
    flex-flow: row wrap;
    .l1 {
        display: flex;
        align-items: center;
        margin: 8px 0 0 8px;
    }
    .l2 {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin: 8px 0 0 8px;
    }
}
```

# 演示效果
![演示效果](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fb4ec2f11de4ae0abcb23de5606154c~tplv-k3u1fbpfcp-watermark.image)