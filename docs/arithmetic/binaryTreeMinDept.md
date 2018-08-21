## 二叉树最小深度
```js
var minDepth = function (root){
  if(root === null) return 0
  var leftMin = minDepth(root.left);
  var rightMin = minDepth(root.right);
  if(leftMin === null || rightMin === null){
    return leftMin + rightMin + 1  
    // 排除只有左节点或者右节点的节点的影响
  }
  return Math.min(leftMin, rightMin) + 1
}
```
### 思路
- 判断是否为空 
- 判断左侧left是否为空
- 判断右侧是否为空
- 只有左节点或者右节点
- 判断最小