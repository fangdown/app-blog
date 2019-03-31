## css盒模型

### 谈谈你对CSS盒模型的认识
- 基本概念：标准模型+IE模型

- 标准模型和IE模型的区别

- CSS 如何设置这两种模型：box-sizing
- js如何获取盒模型对应的宽和高 
  dom.style.width/height --只能获取内联样式的值
  dom.currentStyle.width
  window.getComputedStyle(dom).width
  dom.getBoundingClientRect().width
- 实例题（根据盒模型解释边距重叠）
- BFC(边距重叠解决方案)
  

1. BFC的基本概念
Block Formatting Context ，块级格式化上下文
2. BFC的原理
  - 内部的box会在垂直方向，一个接一个的放置
  - 计算bfc高度的时候，浮动元素也会参与计算
  - bfc的区域不会与浮动区域的box重叠
   -box垂直方向的距离由margin决定，属于同一个bfc的两个相邻box的margin会发生重叠
  - 每个元素的margin box的左边，与包含块border box的左边相接触（对于从做往右的格式化，否则相反
  
  - bfc是一个页面上的独立的容器，外面的元素不会影响bfc里的元素，反过来，里面的也不会影响外面的
  
3. 如何创建BFC
  - float 不为none
  - position是absolute和fixed
  - display:flex inline-block/ table-cell
  - overflow不为visible
  - 根元素
4. BFC的使用场景
  - 自适应两栏布局
  - 清除内部浮动 
  - 防止垂直margin重叠

  [BFC 神奇背后的原理-示例](http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)