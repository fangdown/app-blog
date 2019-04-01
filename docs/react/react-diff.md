## React diff
### 为什么虚拟dom会提高性能?
虚拟dom相当于在js和真实dom中间加了一个缓存，利用dom diff算法避免了没有必要的dom操作，从而提高性能。

步骤：  
1. 用JavaScript对象结构表示DOM树的结构，然后用这个数构建真正的dom树，插入到文档中；
2. 当状态变更的时候，重新构造一颗新的对象树，然后新的树和旧的树进行对比，记录两棵树之间的差异；
3. 把记录的差异应用到DOM树上，视图就更新了；
>AST抽象语法树
### diff算法?
1. 把树形结构按照层级分解，只比较同级元素
2. 给列表结构的每个单元添加唯一的key属性，方便比较
3. react只会匹配相同组件  
4. 合并操作，在setState方法的时候，react将其标记为dirty，到每一个事件循环结束，react检查所有标记dirty的组件，进行重新绘制
5. 选择性子树渲染，shouldComponentUpdate,提高diff的性能