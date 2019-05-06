## 深度优先遍历

>思路： 对一个对象进行遍历， 如果发现有子集则递归遍历

```js

const obj = {
  type: 'div',
  id:0,
  props: {class:'list'},
  children: [
    {
      type: 'div',
      id:1,
      props: {class:'item'},
      children: ['1']
    },
    {
      type: 'div',
      id:2,
      props: {class:'item'},
      children: [
        {
          type: 'div',
          props: {class:'three'},
          children: ['three-1'],
          id:3
        },
        {
          type: 'div',
          props: {class:'three'},
          children: ['three-2'],
          id:4
        },
      ]
    },
    {
      type: 'div',
      props: {class:'item'},
      children: ['3'],
      id:5
    }
  ]
}
let Index = 0
function walk(obj, index){
  obj.children.forEach(child =>{
    if(Object.prototype.toString.call(child)  === '[object String]'){
      
    } else {
      walk(child, ++Index)
    }
  })
}
walk(obj, Index)


```