
## DOM相关
#### 当前页面dom深度
```js
const getDomDepth = (node) => {
  let max = 1;
  // void 函数无返回值
  void function fn(d, m) {
    m++;
    Array.from(d.children).forEach(n => {
      if (n.children.length) {
        fn(n, m);
      } else {
        if (max < m) max = m;
      }
    })
  }(node, 1);

  return max;
}
```