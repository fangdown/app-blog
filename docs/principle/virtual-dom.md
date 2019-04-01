## 虚拟DOM
> why: 操作 DOM 是很耗费性能的一件事情，既然如此，我们可以考虑通过 JS 对象来模拟 DOM 对象，毕竟操作 JS 对象比操作 DOM 省时的多。

### JS对象模拟DOM对象的实现
>骨架： 标签，属性、子元素， key，递归调用，放入dom中  
```js
  export default class Element{
    constructor(tag, props, children, key){
      this.tag = tag;
      this.props = props;
      if(Array.isArray(children)){
        this.children = children;
      } else {
        this.key = children;
        this.children = null;
      }
      if(key){
        this.key = key;
      }
      this.render();
    }
    _createElement(tag, props, child, key){
      let el = document.createElement(tag);
      for(const key in props){
        const value = props[key];
        el.setAttribute(key, value);
      }
      if(key){
        el.setAttribute('key', key)
      }
      if(child){
        child.forEach(element => {
          let dom;
          if(element instanceof Element){ // 子元素可能是一个实例对象
            dom = this._createElement(
              element.tag,
              element.props,
              element.children,
              element.key,
            )
          } else {
            dom = document.createTextNode(element)
          }
          el.appendChild(dom);
        })
      }
      return el;
    }
    render(){
      let root = this._createElement(this.tag, this.props, this.children, this.key);
      document.body.appendChild(root);
      return root;
    }
  }
  let test4 = new Element('div', { class: 'my-div' }, ['test4'])
```

### 算法
1. 树的递归
2. 判断属性的更改
3. 判断列表差异算法实现
4. 遍历子元素打标识
5. 渲染差异
(待继续学习)

### 总结
virtual Dom 算法的实现也就是以下三步
1. 通过 JS 来模拟创建 DOM 对象
2. 判断两个对象的差异
3. 渲染差异

[参考](https://juejin.im/post/5b10dd36e51d4506e04cf802)