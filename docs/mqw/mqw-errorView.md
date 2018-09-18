## 错误监控类
### 前端错误的分类
1. 即时运行错误
2. 资源加载错误

### 错误的捕获方式
1. 即时运行： try(){}catch()
2. 资源加载： onerror事件
- 节点上绑定onerror事件
- ie资源加载错误 - 不行
- performance.getEntries()-api, 拿到所有已经加载的资源列表
- 和document.getElementsByTagName('') 数量比较
- 利用捕获来监听error事件

跨域能捕获错误，不能得到错误详情

要拿到详情： 设置cors


### 错误的上报

1. 利用image对象上报
2. 利用ajax上报

```js
var img = new Image()
img.src= 'http://xxxx.com?tj?param=xxx'
body
```