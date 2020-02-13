## 监听事件的注册和取消

### 背景
在项目中注册企业微信，因为授权关系，在新tab中打开注册页面， 注册完成后， 切回原来tab页面，点击注册完成，进入下一步

因其他原因在页面中监听了一个visibilitychange事件，如果注册成功，则取消这个监听，经过实践发现没有取消该事件

要寻找原因


### 分析

看看如何实现监听的
```js
  componentDidMount(){
    window.addEventListener('visibilitychange', this.visibilitychange);
  }
  visibilitychange(){
    !document.hidden && this.getBaseInfo();
  }
  getBaseInfo(){
    console.log('baseInfo')
    this.setState({'text': 'baseInfo'})
  }
  cancelListener = () =>{
    console.log('cancelListener')
    window.removeEventListener('visibilitychange', this.visibilitychange);
  }
```

1. componentDidMount实现监听
2. 子组件返回事件，执行cancelListener 取消监听

逻辑上没有错误， 代码看上去也没有问题， 那到底出现在什么地方呢


### 解决

经过多次代码实践，使用了箭头函数则能够正常的取消监听事件，反过来，没有用监听函数就失效，visibilitychange和getBaseInfo方法

```js
  componentDidMount(){
    window.addEventListener('visibilitychange', this.visibilitychange);
  }
  visibilitychange = () => {
    !document.hidden && this.getBaseInfo();
  }
  getBaseInfo = () => {
    console.log('baseInfo')
    this.setState({'text': 'baseInfo'})
  }
  cancelListener = () =>{
    console.log('cancelListener')
    window.removeEventListener('visibilitychange', this.visibilitychange);
  }
```

### 总结
在es6语法中， 箭头函数和非箭头函数的区别还是有的， 原理是什么呢？