
##  react高阶函数
### 骨架
1. 是一个函数，参数是组件
2. 返回一个组件，组件render中return参数组件
```javascript
import React, { Component } from 'react';

// 高阶函数 高阶组件
// 高阶组件和父组件区别
const TestConnect = (key) => (WrapComponent) => {
  return class extends Component {
    constructor() {
      super();
      this.state = {};
    }
    componentDidMount = () => {
      const data = localStorage.getItem(key);
      this.setState({ data });
    }
    render() {
      const { data } = this.state;
      return (
        <WrapComponent data={data} {...this.props} />
      );
    }
  };
};
export default TestConnect;

```
调用
```javascript
import React, { Component } from 'react';
import TestConnect from './component/TestConnect';
class TestHighComponent extends Component {

  render() {
    const { data } = this.props;
    return (
      <div>
        {data}
      </div>
    );
  }
}
export default TestConnect('name')(TestHighComponent);
```

### 高阶组件和父组件有什么区别
1. 高阶组件强调的是逻辑的抽象，是无副作用的函数
2. 父组件是UI视图
3. 如果有需要更改UI的就用父组件， 反之用高阶函数

参考文章：  
[深入理解React 高阶组件](https://www.jianshu.com/p/3fdbcef475af)