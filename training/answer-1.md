## 集锦1

1. JS类
### 谈谈变量提升

### bind/call/apply区别

### 实现一个bind函数

### 实现一个call函数

### 实现一个apply函数

### 简单说一下原型链

### 怎么判断对象类型

### 箭头函数的特点

### 简单说一下this

### async/await的优缺点

### generator的原理

### promise的使用

### 实现一个pormise

### == 和 ===的区别

### 垃圾回收机制

### 说一下闭包

### 基本类型和对象类型存储的区别

### 浏览器Eventloop 和node的Eventloop 区别

### 数组降维

### setTimeout倒计时误差

### 防抖

### 深拷贝

### typeof和instanceof区别

2. 浏览器类

### cookie/sesstionStorage/localStorage区别

### 判断页面是否加载完成

### 如何解决跨越
- JSONP
- CORS
- document.domain
- postMessage

### 什么是事件代理

### service worker

### 浏览器缓存
- 强缓存
- 协商缓存
- 选择合适的缓存策略

### 浏览器性能问题
- 重绘 回流
- 图片优化
- 其他文件优化
- CDN
- webpack项目优化

3. webpack

### 优化打包速度

### babel原理

### 如何实现一个插件

4. 框架

### React生命周期
- v16生命周期函数用法建议
### setState

### Vue的nextTick原理

### Vue的生命周期

### Vue的双向绑定原理

### V-model原理

### watch和computer的区别

### Vue的父子通信

### 路由原理

### MVVM

### proxy和Object.defineProperty区别

### 虚拟DOM

### 路由鉴权

### Vue和React区别

5. 网络

### TCP 3次握手

### HTTPS握手

### HTTP状态码

### 从输入URL到页面加载全过程
- dns 查询 获取到ip，是否智能查询及cdn
- tcp握手，3次或者4次握手 ，成功后封装报文进行物理传输
- 到达服务端，负载均衡，到达服务器，服务器响应，并返回响应报文
- 根据响应报文解析，针对不同的状态码，做不同的响应
- 开始解析文件，有压缩，先解压，然后用指定的编码格式进行编码
- 编码成功后，开始解析dom，从上到下，html/css/js（阻塞与异步）生成dom树和css树，使用http2.0会提搞下载效率
- dom解析完成触发domContentLoaded事件
- css和dom树构建完成后生成render树，计算页面元素的布局与显示位置
- 调用GPU在屏幕上绘制图层，并最终合并，展现
- 
6. 算法

### 常见排序
- 冒泡
- 插入
- 选择
- 快排

7. 设计模式

### 发布订阅模式

### 工厂模式

### 单例模式

### 沙箱模式

8. CSS类

### 盒模型

### BFC

### 布局

### 垂直居中

9. 安全

### CSRF

### XSS
