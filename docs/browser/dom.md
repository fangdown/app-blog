
## DOM相关
### 操作DOM
```js
// 创建元素
var node = document.createElement('div')
var flag = document.createDocumentFragment('')

// 添加新元素
  // 默认有id为list的元素，要向其里面添加节点
  //方法1
  var node = document.createElement('div')
  node.innerHTML = '新的节点'
  var list = document.getElementById('list')
  list.insertBefore(node, list.children[0])
  // 如果没有指定第二个参数，则是插入到list的末尾
// 移动元素
  var item1 = document.getElementById('item1')
  var item2 = document.getElementById('item2')
  list.insertBefore(item2, item1) 
  
  var item3 = document.getElementById('item3')
  list.appendChild(item3)
// 复制元素
  var list = document.getElementById('list')
  var cloneList = list.cloneNode(true)
  var cloneList = list.cloneNode() // 浅克隆，不会复制标签里的文本及子节点，

// 删除元素
  var list = document.getElementById('list')
  var item1 = document.getElementById('item1')
  list.removeChild(item1)
// 查找元素
  parentNode - 指向父节点
  childNodes - 指向所有节点，是一个数组
  previousSibling - 指向前一个兄弟节点
  nextSibling - 指向后一个兄弟节点
  firstChild - 指向第一个子节点
  lastChild - 指向最后一个字节点
  document.querySelector('id') - 查找符合条件的元素，返回第一个
  document.querySelectorAll('class') 查找所有符合条件的元素
  
```
### list.children 和list.childNodes区别
children返回的是一个数组，数组向是一个元素
childNodes 返回的也是一个数组，不过包含了换行

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