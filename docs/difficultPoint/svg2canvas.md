## svg形状变形问题

1. 现状
图片文字等这些元素在生成海报的时候，没有问题，svg格式的形状在截取的时候出现残缺，不全

2. 分析
- 项目中逻辑复杂，嵌套较深，发现及调试问题都比较困难
- 个人喜欢用简单demo最大程度上去验证可行性
- 分析原因
  - 是不是html2canvas组件对svg支持不好呢
  - 经过一番搜索后也有人提出该问题，使用cansvg解决这个问题，先把svg转成canvas，然后再截图

3. 解决
- 按照分析的思路，在onbeforeRender中处理
```js
onBeforeRender(node: HTMLElement) {
    node.style.transform = 'none';
    // 因shape-cmp造成样式不全，去掉该样式
    const svgElements = Array.from(node.querySelectorAll('svg')) || [];
    svgElements.forEach(ele => {
      // 转成canvas，替换svg
    });
}
```
- 经过这样处理以后，形状不残缺了， 完整了，高兴一下
- 继续往下，在产品及测试的摧残中，觉得这个形状变模糊了，变粗变细变形等，瑕疵有不少，继续优化
- 在没有更好思路的情况下，在本地模拟系统数据
  - 拿到页面html结构
  - 删除无关内容，保留相关dom结构
  - 模拟关键js流程，外置cdnjs等，无法import
- 本地深入优化
  - 经过搭建之后，运行页面， 发现svg格式在不用转canvas的情况下，也是可以完整的截图，而且没有瑕疵
  - 得到这点验证，觉得哪里写的有问题， 继续向系统环境靠近，把页面中的js、css都拿过来
  - 发现生成的canvas有一闪而过（先完整后残缺）的动画， 之后的效果和系统中残缺的效果一致，看来问题发生在js和css中
  - 删除js和css验证，其中经过react构建的css太多，采用分段删除，提高效率和准确率，最终找到因一个css样式引起的这个动画效果
  - 经过反复对这个css的删除和添加，确定原因，在系统中查找这个css的产生原因，最后修复
  - 排除原因后， 再由系统生成形状海报，没有出现残缺了，有个粗细问题，产生的原因也是css有个属性overflow:visible,该属性的意思是内容不会裁剪，会出现在元素之外，加了这个属性就变粗了， 去掉之后就和原本形状一样了，
  - 问题都搞定
  ```html
  .shape-cmp{
    overflow:visible
  }

  ```