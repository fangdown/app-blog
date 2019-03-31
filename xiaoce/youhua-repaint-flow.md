## 重绘回流

回流：当我们对 DOM 的修改引发了 DOM 几何尺寸的变化（比如修改元素的宽、高或隐藏元素等）时，浏览器需要重新计算元素的几何属性（其他元素的几何属性和位置也会因此受到影响），然后再将计算的结果绘制出来。这个过程就是回流（也叫重排）。

重绘：当我们对 DOM 的修改导致了样式的变化、却并未影响其几何属性（比如修改了颜色或背景色）时，浏览器不需重新计算元素的几何属性、直接为该元素绘制新的样式（跳过了上图所示的回流环节）。这个过程叫做重绘。

### 回流的必要条件
1. 修改了dom的几何属性width、height、padding、margin、left、top、border 等等

2. 修改了dom的结构
3. 获取offsetTop、offsetLeft、 offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、clientTop、clientLeft、clientWidth、clientHeight 时，你就要注意了！
4. 执行getComputedStyle或currentStyle方法时

### 重绘的必要条件
1. color,background
2. 

### 优化方案
1. 缓存dom
2. 避免逐条改变样式,使用类名
3. 将dom离线，display:none
4. 浏览器flush队列（自身优化方案）