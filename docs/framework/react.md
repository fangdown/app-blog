## React知识
### 绑定this
> 推荐使用定义阶段用箭头函数定义()=>
> 见过各种各样的，但是没有形成统一认识。


1. createClass + handleClick() react16已经移除
2. bind + handleClick()
```js
class App extends React.Component {
  handleClick() {
    console.log('this > ', this);
  }
  render() {
    return (
      <div onClick={this.handleClick.bind(this)}>test</div>
    )
  }
}
```
问题： 组件每次render都会重新分配函数，这比较影响性能。

3. 返回一个函数 + handleClick()
 ```js
class App extends React.Component {
  handleClick() {
    console.log('this > ', this);
  }
  render() {
    return (
      <div onClick={(e) => this.handleClick(e)}>test</div>
    )
  }
}
```
问题：同2一样
4.  构造函数bind

```js
class App extends React.Component {
  constructor(){
    this.handleClick= this.handleClick.bind(this);
  }
  handleClick() {
    console.log('this > ', this);
  }
  render() {
    return (
      <div onClick={this.handleClick}>test</div>
    )
  }
}
```
5. 定义阶段箭头函数
```js
class App extends React.Component {
  
  handleClick = () => {
    console.log('this > ', this);
  }
  render() {
    return (
      <div onClick={this.handleClick}>test</div>
    )
  }
}
```