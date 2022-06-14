---
title: recharts去除CartesianGrid底部网格线
date: 2022-06-13 18:57:33
permalink: /pages/605cff/
categories:
  - 日记
tags:
  - recharts
---

# recharts去除CartesianGrid底部网格线

## 背景
在使用recharts图表组件时， 发现使用了背景网格线后， 水平方向底部有虚线和实线 重叠现象。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd6da59124ed4bafa033e67c62d58a14~tplv-k3u1fbpfcp-watermark.image?)

```js
<ResponsiveContainer width="100%" height="100%">
    <LineChart data={data} {...ChartProps}>
         <CartesianGrid
            strokeDasharray="4 4"
            horiziontal
            vertical={false}
            stroke="#dadfe6"
            className={s.horizontalLine}
        />
        <YAxis {...YAxisProps} />
        <XAxis {...XAxisProps} />
        <Tooltip content={<CustomTooltip />} />
    </LineChart>
   
    </ResponsiveContainer>
```
## 分析
1. 看了官方api文档，没有相关属性介绍
2. 查看issue，有类似的提问，但是时间较早，说的解决方法也不奏效
    - 把XAxis 配置放在CartesianGrid 后面， 本来就是放在后面的
    - 增加全局样式，没生效

## 解决
在stackoverflow上看到一篇文章，原理是给CartesianGrid增加class属性，由此受到启发，给CartesianGrid 增加一个属性解决, 将第一个线的透明度设置为0，这样就不显示了。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc207269610f4367b8444e6dbacebba6~tplv-k3u1fbpfcp-watermark.image?)
```js
<CartesianGrid
    strokeDasharray="4 4"
    horiziontal
    vertical={false}
    stroke="#dadfe6"
    className={s.horizontalLine}
/>
```

```css
.horizontal-line {
    &:first-child {
        opacity: 0;
    }
}
```