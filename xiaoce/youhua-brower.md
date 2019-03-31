## 浏览器核心

### 浏览器内核
1. 渲染引擎

包括了 HTML 解释器、CSS 解释器、布局、网络、存储、图形、音视频、图片解码器等等零部件。

内核有：Trident（IE）、Gecko（火狐）、Blink（Chrome、Opera）、Webkit（Safari）。

blink基于webkit
2. js引擎
v8引擎

### 渲染过程

1. HTML 解释器：将 HTML 文档经过词法分析输出 DOM 树。

2. CSS 解释器：解析 CSS 文档, 生成样式规则。

3. 图层布局计算模块：布局计算每个对象的精确位置和大小。

4. 视图绘制模块：进行具体节点的图像绘制，将像素渲染到屏幕上。

5. JavaScript 引擎：编译执行 Javascript 代码。

![](https://user-gold-cdn.xitu.io/2018/9/27/16619d637d220b20?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 优化
1. css选择器从右到做， 先找最右再最左
2. js阻塞、css阻塞、DOM优化
3. js引擎和渲染引擎只能执行一个，浏览器会不断在两者之间交权