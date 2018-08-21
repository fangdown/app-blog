## 面试
1. [社招中级前端笔试面试题总结](https://juejin.im/post/5af3cc4af265da0ba3521028)
2. [前端基础面试题@JS篇](https://juejin.im/post/5af8f00c51882567105fda7b)

### 基础考题
1. 原生实现addClass、removeClass?
   ```js
    function addClass(ele, cls){
      let className = ele.className;
      className += ' ' + cls
      ele.className = className
    }
    // 备注： 不是class，不用通过attribute属性得到class
    function removeClass(ele, cls){
      let className = ele.className;
      className = className.replace(/\s+/ig, ' ')
      className = className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'), '')
      className = className.replace(/(\s+^)|(\s$)/, '')
      ele.className = className
    }
    function hasClass(ele, cls){
      let className = ele.className;
      className = className.replace(/\s+/ig, ' ')
      return new RegExp(' ' +cls+ ' ').test(' ' +className+' ')
    }
    // replace方法  返回值是新的结果，并不会更改className的值
    // 如果有变量不能用//表达式，要用new RegExp, 且是\
   ```
2. viewport 高清屏
   ```html
   <meta name="viewport" content="width=device-width;init-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scale=no, target-densitydpi" >

   ```
   当 target-densitydpi=device-dpi 时， css中的1px会等于物理像素中的1px。
   安卓中还支持  target-densitydpi  这个私有属性
   [移动前端开发之viewport的深入理解](https://www.cnblogs.com/2050/p/3877280.html)

3. readonly, disable的区别
   共同点：
   不可更改表单域的内容
   不同点：
   - 对象
   readonly只对input/textarea有效
   disable对表单所有内容都有效
   - 传值
   表单以post、get方式提交readonly 可以传值和更改，disable的表单域不会传值，可接受更改
   - 焦点
    readonly 可以被设置焦点
    disable 不可以被设置焦点

4. click 300ms的原因
   移动端有touch事件，刚开始触发touchstart、touchmove、touchend,之后是click；
   当用户一次点击屏幕之后，浏览器并不能立刻判断用户是要进行双击缩放，还是想要进行单击操作。因此，iOS Safari 就等待 300 毫秒，以判断用户是否再次点击了屏幕。
   [移动端click事件延迟300ms的原因以及解决办法](https://www.cnblogs.com/chaojidan/p/4517895.html)
   
5. 懒加载
```js
  function lazyLoad(){
    var clientHeight = document.documentElement.clientHeight;
    var imgs = document.documentElement.querySelectorAll('img');
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    for(var i = 0, len = imgs.length; i < len; i++){
      if(imgs[i].getAttribute('lazy-src') == null){
        continue;
      }
      var imgTop = imgs[i].offsetTop;
      // var react = imgs[i].getBoundingClientRect;
      // x,y,top,bottom,left,right,width,height
      console.log(imgTop);
      if(clientHeight + scrollTop - imgTop > 0) {
        imgs[i].setAttribute('src', imgs[i].getAttribute('lazy-src'));
        imgs[i].removeAttribute('lazy-src');
      }
    }
  }
  // 全局滚动监听
  let interval;
  window.onscroll = function(){
    if(interval == null) {
      interval = setInterval(checkScrollStop,5000)
    }
    topValue = document.documentElement.scrollTop || document.body.scrollTop;
  }
  // 局部滚动
  function checkScrollStop(){
			var top = document.documentElement.scrollTop || document.body.scrollTop
			if(top == topValue){
				clearInterval(interval);
				interval = null;
				lazyLoad();
			}
		}
```
考点：懒加载思路，可视区域，局部滚动

6. 轮播图原理
```js
// 思路1：叠加在一起，通过opcity来实现显示和隐藏
// 思路2： float：left，通过设置left的值来滑动显示
```
7. 拖动方法
```js
    function Drag(el){
			this.init(el);
		}
		Drag.prototype.init = function(el){
			this.mousedown(el)
			return false;
		}
		Drag.prototype.mousedown = function(el){
			el.onmousedown = function(e){
				var e = e || window.event;
				var left = e.clientX - el.offsetLeft;
				var top = e.clientY - el.offsetTop;
				document.onmousemove = function(e){ //为什么不是box,因为在移动时 box还没有执行下面的改位置程序，会失去焦点，进而失败,(我犯错了)
					var e = e || window.event;
					el.style.left = e.clientX - left + 'px';
					el.style.top = e.clientY - top  + 'px';
				}
			}
			document.onmouseup = function(e){
				document.onmousemove = null;
				document.onmousedown = null;
			}
		}
		var box = document.getElementById('drag');
		var box2 = document.getElementById('drag2');
		new Drag(box)
		new Drag(box2)

```
8. input事件监听,联想并完成填充
```js
  var arr = ['a', 'aaa', 'b']
  input.addEventListener('input', function(event){
   const event = event || window.event;
    const target = event.target || event.srcElement
    const value = target.value;
    if(!value) return;
    autoComplete(value, arr)
  })
  function autoComplete(str, arr){
    const list = []
    for(let i = 0; i< arr.length; i++){
      if(arr[i].startWidth(str)){
        list.push('<li>' +arr[i] +'</li>')
      }
    }
    ul.innerHtml = list.join('');
  }
  ul.addEventListener('click', function(event){
     const event = event || window.event;
     const target = event.target || event.srcElement
     if(target.name.toLowerCase() === 'li'){
       addToInput(event.target)
     }
  })
  function addToInput(li){
    const text = li.innerText;
    input.value = text;
  }
```
9. 为什么vue要引入虚拟dom
  - 组件的高度抽象化
  - 服务端渲染ssr、dom外
  - 跨平台 weex
10. 模拟实现promise
11. nodejs中的流
12. nodejs import 和export.module区别
13. 快排算法，复杂度
14. csrf怎么样获取客户端信息
15. 如何渲染几万条数据并不卡住界面
```js
  // 思路：异步执行，新建loop函数，判断渲染次数有没有到达最多次数，没有就执行增加，同时利用window.requestAnimationFrame，在界面重新渲染的之前执行新增方法，不卡顿
  setTimeout(() => {
    const total = 10000;
    const once = 20;
    const loopCount = Math.ceil(total / once);
    let countRender = 0;
    let ul = document.querySelector('ul');
    function add() {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < once; i++) {
        const li = document.createElement('li');
        li.innerText = Math.floor(Math.random() * total);
        fragment.appendChild(li);
      }
      ul.appendChild(fragment);
      countRender += 1;
      loop()
    }
    function loop() {
      if (countRender < loopCount) {
        // requestAnimationFrame里的不是执行函数，而是函数名
        window.requestAnimationFrame(add);
        // add()
      }
    }
    loop();
  }, 0);

```
16. 递归设计。 实现一个函数，给该函数一个DOM节点，函数访问其所有子元素(所有子元素，不仅仅是直接子元素)，每次访问子元素的时候，并为其传一个callback.
```js
  function traverse(DOM, callback){
    callback(DOM)
    var list = DOM.children;
    Array.prototype.forEach.apply(list, (item) => {
      traverse(item, callback)
    })
  }
```
17. commonJs module.exports  与 es6中的 export export default区别
  <strong>commonJs规范</strong>
>require: node 和 es6 都支持的引入
export / import : 只有es6 支持的导出引入
module.exports / exports: 只有 node 支持的导出
- node模块遵循CommonJS规范。
- module.export导出一个对象
- 用require导入
- exports = module.exports = {};
 <strong>es6规范</strong>
- import 导入
- export 导出 多个值，导入时要用解构赋值方法
- export default 只导出一个值

18. DOM0级事件和DOM2级事件区别
- 注册事件的方式不同
- DOM0级 this指向元素，DOM2级this没有明确指向
- 浏览器事件派发，0级派发给元素， 2级有捕获-目标-冒泡 三阶段
- 0级只对事件的类型进行分类，如鼠标和键盘事件。2级事件模型是模块化的，分为htmlEvent,MouseEvent,UIEvent,分别实现不同的接口

19. 为什么在vue的组件中，data要用function返回对象呢？
> 类比与引用数据类型。如果不用function return 每个组件的data都是内存的同一个地址，那一个数据改变其他也改变了，这当然就不是我们想要的。用function return 其实就相当于申明了新的变量，相互独立，自然就不会有这样的问题；js在赋值object对象时，是直接一个相同的内存地址。所以为了每个组件的data独立，采用了这种方式。
如果不是组件的话，正常data的写法可以直接写一个对象，比如data：{ msg ： ' 下载 ' }，但由于组件是会在多个地方引用
的，JS中直接共享对象会造成引用传递，也就是说修改了msg后所有按钮的msg都会跟着修改，所以这里用function来每次返回一个
20. let 作用域
```js
let a = 1;
if(true){
  console.log(a) 
  let a = 2
}
// a is not defined
```
21. 闭包遇上箭头函数
```js
var name = 'a'
var obj = {
  name : 'test',
  boo: function(){
    return function(){
      console.log(this.name)
    }
  },
  foo: function(){
    return ()=>{
      console.log(this.name)
    }
  }
}
obj.boo()() // a
obj.foo()() // test

```
22. no-cache和no-store的区别
  - no-store是真正的不进行缓存
  - no-cache是防止从缓存中获取过期的资源，缓存会向服务器进行有效处理确认之后处理资源