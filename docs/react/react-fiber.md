
## react-fiber机制
在v16版本中引入了fiber机制
### 为什么引入
如果有一个很复杂的复合组件，当最上册的state发生变化，造成调用栈会很长，若中间又有复杂的操作，就可能导致长时间阻塞主线程，带领不友好的用户体验

### fiber有什么好处
fiber本质上是一个虚拟的堆栈帧，新的调度器会按照优先级自由调度这些帧，从而将之前的同步渲染变成异步渲染，在不影响用户体验的情况下分段计算更新。  
如何区分优先级： 对于动画这种实时性很高的东西，也就是16ms必须渲染一次保证不卡顿的情况下，react会在16ms内暂停一下更新，返回来继续渲染动画。

### fiber 实现
带来了2个新的api，getDerivedStateFromProps（替换componentWillReciveProps）,getSnapshotBeforUpdate(用于替换componentWillUpdate)
异步渲染有2个阶段，Reconcilition阶段和commit阶段，前者是可以被打断的，后者不能暂停.
Reconcilition阶段有：
1. componentWillMount
2. componentWillReciveProps
3. shouldComponentUpdate
4. componentWillUpdate
commit阶段有：
1. componentDidMount
2. componentDidUpdate
3. componentWillUnmount

```js

  class ExampleComponent extends React.Component{
    state = {}
    static getDerivedStateFromProps (nextProps, preState){
      if(preState.someMirroredValue !== nextProps.someValue){
        return {
          derivedData: computeDerivedState(nextProps),
          someMirroredValue: nextProps.someValue
        }
      }
      return null
    }
  }
  // v16版本生命周期使用建议
  class ExampleComponent extends React.Component {
    // 用于初始化 state
    constructor() {}
    // 用于替换 `componentWillReceiveProps` ，该函数会在初始化和 `update` 时被调用
    // 因为该函数是静态函数，所以取不到 `this`
    // 如果需要对比 `prevProps` 需要单独在 `state` 中维护
    static getDerivedStateFromProps(nextProps, prevState) {}
    // 判断是否需要更新组件，多用于组件性能优化
    shouldComponentUpdate(nextProps, nextState) {}
    // 组件挂载后调用
    // 可以在该函数中进行请求或者订阅
    componentDidMount() {}
    // 用于获得最新的 DOM 数据
    getSnapshotBeforeUpdate() {}
    // 组件即将销毁
    // 可以在此处移除订阅，定时器等等
    componentWillUnmount() {}
    // 组件销毁后调用
    componentDidUnMount() {}
    // 组件更新后调用
    componentDidUpdate() {}
    // 渲染组件函数
    render() {}
    // 以下函数不建议使用
    UNSAFE_componentWillMount() {}
    UNSAFE_componentWillUpdate(nextProps, nextState) {}
    UNSAFE_componentWillReceiveProps(nextProps) {}
    }
```