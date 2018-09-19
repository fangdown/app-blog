## 错误监控类
### 前端错误的分类
1. 即时运行错误
2. 资源加载错误

### 错误的捕获方式
1. 即时运行： try{}catch(e){}
```js
try {
    var a = 1;
    var b = a + c;
} catch (e) {
    // 捕获处理
    console.log(e); // ReferenceError: c is not defined
}
```
2. 资源加载： onerror事件
```js
window.onerror = function(errorMessage, scriptURI, lineNo, columnNo, error) {
    console.log('errorMessage: ' + errorMessage); // 异常信息
    console.log('scriptURI: ' + scriptURI); // 异常文件路径
    console.log('lineNo: ' + lineNo); // 异常行号
    console.log('columnNo: ' + columnNo); // 异常列号
    console.log('error: ' + error); // 异常堆栈信息
};

console.log(a);
```
- 节点上绑定onerror事件
- ie资源加载错误 - 不行
- performance.getEntries()-api, 拿到所有已经加载的资源列表
- 和document.getElementsByTagName('') 数量比较
- 利用捕获来监听error事件

跨域能捕获错误，不能得到错误详情
> 跨域之后window.onerror是无法捕获异常信息的，所以统一返回Script error.，解决方案便是script属性配置 crossorigin=”anonymous” 并且服务器添加Access-Control-Allow-Origin。
要拿到详情： 设置cors

3. MVVM框架

- vue
```js
Vue.config.errorHandler = function (err, vm, info) {
    let { 
        message, // 异常信息
        name, // 异常名称
        script,  // 异常脚本url
        line,  // 异常行号
        column,  // 异常列号
        stack  // 异常堆栈信息
    } = err;

    // vm为抛出异常的 Vue 实例
    // info为 Vue 特定的错误信息，比如错误所在的生命周期钩子
}
```
- react 
```js
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });

        // 将异常信息上报给服务器
        logErrorToMyService(error, info); 
    }

    render() {
        if (this.state.hasError) {
            return '出错了';
        }

        return this.props.children;
    }
}
<ErrorBoundary>
    <MyWidget />
</ErrorBoundary>
```
### 错误的上报

1. 利用image对象上报-推荐
2. 利用ajax上报

```js
(new Image()).src= 'http://xxxx.com?tj?param=xxx'

```

![](https://images2018.cnblogs.com/blog/775838/201803/775838-20180323224456954-1853086677.png)

[谈谈前端异常捕获与上报](https://www.cnblogs.com/luozhihao/p/8635507.html)