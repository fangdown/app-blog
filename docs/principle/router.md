## 路由原理
### 骨架
1. 基于hash的前端路由实现
2. 基于H5 History的前端路由实现

### 基于hash的前端路由实现
> 定义路由键值对、设置、读取执行路由键值对、 通过监听事件执行设置
> 
```js
  // 定义
  class Routers {
    constructor(){
      this.routes = {}；
      this.currentUrl = '';
    }
  }
```
```js
  // 定义+方法
  class Routers {
    constructor(){
      this.routes = {}；
      this.currentUrl = '';
    }
    // 设置路由键值对
    pushRoute(path, callback){
      this.routes[path] = callback || function(){}
    }
    // 执行当前路由对应的callback
    refresh() {
      this.currentUrl = location.hash.slice(1) || '/';
      this.routes[this.currentUrl]()
    }
  }
```
```js
  // 定义+ 方法+ 监听
  class Routers {
    constructor(){
      this.routes = {}；
      this.currentUrl = '';
      this.refresh = this.refresh.bind(this);
      window.addEventListener('load', this.refresh);
      window.addEventListener('hashchange', this.refresh);
    }
    // 设置路由键值对
    pushRoute(path, callback){
      this.routes[path] = callback || function(){}
    }
    // 执行当前路由对应的callback
    refresh() {
      this.currentUrl = location.hash.slice(1) || '/';
      this.routes[this.currentUrl]()
    }
  }
```
```js
  // 定义+ 方法+ 监听+后退
  class Routers {
    constructor(){
      this.routes = {};
      this.currentUrl = '';
      // 记录出现过的hash
      this.history = [];
      this.currentIndex = this.history.length -1;
      this.refresh = this.refresh.bind(this);
      this.backOff = this.backOff.bind(this);
      window.addEventListener('load', this.refresh);
      window.addEventListener('hashchange', this.refresh);
    }
    // 设置路由键值对
    pushRoute(path, callback){
      this.routes[path] = callback || function(){}
    }
    // 执行当前路由对应的callback
    refresh() {
      this.currentUrl = location.hash.slice(1) || '/';
      if (!this.isBack) {
        // 如果不是后退操作,且当前指针小于数组总长度,直接截取指针之前的部分储存下来
        // 此操作来避免当点击后退按钮之后,再进行正常跳转,指针会停留在原地,而数组添加新hash路由
        // 避免再次造成指针的不匹配,我们直接截取指针之前的数组
        // 此操作同时与浏览器自带后退功能的行为保持一致
        if (this.currentIndex < this.history.length - 1){
          this.history = this.history.slice(0, this.currentIndex + 1);
        }
        this.history.push(this.currentUrl);
        this.currentIndex++;
        }
      this.routes[this.currentUrl]();
      console.log('指针:', this.currentIndex, 'history:', this.history);
      this.isBack = false;
    }
    backOff() {
      this.isBack = true;
      this.currentIndex < 0 
      ? this.currentIndex = 0
      : this.currentIndex =  this.currentIndex -1;
      location.hash = this.history[this.currentIndex];
      this.routes[this.history[this.currentIndex]]();
    }
  }
```
```html
  <body>
  <ul>
      <li><a href="#/">turn yellow</a></li>
      <li><a href="#/blue">turn blue</a></li>
      <li><a href="#/green">turn green</a></li>
  </ul>
  </body>
  <script>
    window.Router = new Routers();
    Router.pushRoute('/', function(){changeBgColor('yellow')})
    Router.pushRoute('/blue', function(){changeBgColor('blue')})
    Router.pushRoute('/green', function(){changeBgColor('green')})
    var content = document.querySelector('body');
    function changeBgColor(color) {
      content.style.backgroundColor = color;
    }
  </script>
```
### vue组件演示
<router-hash/>


### 基于H5 History的前端路由实现
#### 骨架
1. 建立路由对象
2. 初始化路由对象并执行
3. 设置路由键值对
4. 监听点击事件，获取path，并从对象中找到该key的函数并执行

```js
  class Routers{
    constructor(){
      this.routes = {};
      this._bindPopState();
    }
    init(path){
      history.replaceState(null, null, path);
      this.routes[path] && this.routes[path]();
    }
    pushRoute(path, callback){
      this.routes[path] = callback || function(){}
    }
    go(path){
      history.pushState(null, null, path);
      this.routes[path] && this.routes[path]();
    }
    _bindPopState() {
      window.addEventListener('popstate', e => {
        const path = e.state && e.state.path;
        this.routes[path] && this.routes[path]();
      });
    }
  }
  var content = document.querySelector('body');
  function changeBgColor(color) {
    content.style.backgroundColor = color;
  }
  const routers = new Routers();
  routers.init(location.pathname)
  routers.pushRoute('/', function(){
    changeBgColor('yellow')
  });
  routers.pushRoute('/blue', function(){
    changeBgColor('blue')
  });
  routers.pushRoute('/green', function(){
    changeBgColor('green')
  });

```
<router-history/>


### hash-histroy共同点和不同点
1. 共同点
- 需要一个构造函数
- 设置routes对象
- 设置routes对象方法pushRoute

2. 不同点
- 监听事件不一样，hash监听hashchange，history监听popstate
- 对url处理不一样，hash是push(), history是pushState()