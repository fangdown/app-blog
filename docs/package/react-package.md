## react 组件封装

react 没有插槽，可以用this.props.children替代

### 父组件Parent.jsx
```js
// ...
import Child from './child.jsx'
render(){
  return (
    <Child  
      getData={this.getChildData}
      data={data}
    />
  )
}
//
```

### 子组件 Child.jsx
```js
  sendData(){
    this.props.getData('数据')
  }
  render(){
    <div onclick={this.sendData.bind(this)}>
    111
      {this.props.children}
    </div>
  }

```