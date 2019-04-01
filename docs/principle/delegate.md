## 原生事件委托
>手动写一个事件委托的函数
```js
function delegate(parent, eventType, selector, fn){}
```

> 思路： 找到parent元素，在该元素上添加eventType监听事件，执行监听事件，找到当前target，如果target等于selector,执行fn，记得call哦

```js
/***
 * @parent 父级元素
 * @eventType 事件类型
 * @selector 容器内包含的元素class或id
 * @fn 元素上要执行的函数
 */
function delegate(parent, eventType, selector, fn){
  if(typeof parent === 'string'){
    var parent = document.getElementById(parent);
    !parent && alert('parent is not a element');
  }
  if(typeof fn !== 'function'){
    alert('fn is not a function');
  }
  
  function handle(e){
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if(target.id === selector || target.className.indexOf(selector) > -1){
      fn.call(target)
    }
  }
  parent[eventType] = handle(e); // 这种写法以前没碰到过，确实很好玩，在元素在定义事件
}
    delegate('list', 'onclick', 'listener', function(){  
        console.log(this);      
    });
```
