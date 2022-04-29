---
title: React阻止事件冒泡的问题
date: 2022-04-29 11:38:13
permalink: /pages/e0d0f5/
categories:
  - React
  - 事件冒泡

tags:
  - 
---
# React阻止事件冒泡的问题

## 问题
在项目开发中，有一个table，点击其中单元格的时候，会触发对应的弹窗（非遮罩）出来，那么问题来了：

- 目标：点击弹窗内区域不关闭弹窗，点击弹窗外部区域关闭弹窗。
- 现状： 点击弹窗区域也关闭了弹窗

- 关键代码
```js
//  监听document click事件
useEffect(() => {
    const closePanel = () => {
        setCurrent('');
    };
    if (current) {
        document.addEventListener('click', closePanel);
    }
    return () => {
        document.removeEventListener('click', closePanel);
    };
}, [current]);


// 弹窗区域
<div
  onClick={(e) => {
      e.stopPropagation();
  }}
>
......
</div>
```


## 分析

根据事件冒泡原理，先是div触发点击click事件，然后一直冒泡到document上， 在div上做了stopPropagation方法后，理应不会冒泡到document上， 但是document却又执行了click事件，是为什么呢？ 

```
-----------------|--|-----------------
 | Parent         |  |                |
 |   -------------|--|-----------     |
 |   |Children    V  |          |     |
 |   ----------------------------     |
 |                                    |
 --------------------------------------
 ```

仔细检查代码， 没发现明显的逻辑问题，难道是React的原因吗？

### React 中事件处理的原理
- 原理： React 是通过监听 document 冒泡阶段来代理组件中的事件


- 解答： 因为 button 事件处理器的执行前提是事件达到 document 被 React 接收到，然后 React 将事件派发到 button 组件。既然在按钮的事件处理器执行之前，事件已经达到 document 了，那当然就无法在按钮的事件处理器进行阻止了。


## 解决
可以用2个方法解决


1. 用 ```window``` 替换 ```document```
```js
useEffect(() => {
    const closePanel = () => {
        setCurrent('');
    };
    if (current) {
        window.addEventListener('click', closePanel);
    }
    return () => {
        window.removeEventListener('click', closePanel);
    };
}, [current]);
```
2. Event.stopImmediatePropagation()
React中需要nativeEvent来执行原生事件

``` 
event.nativeEvent.stopImmediatePropagation()
```

## 总结
了解React 的事件原理有助于找到问题的根本原因，从而解决问题


