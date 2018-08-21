## js阻塞页面渲染
网页中引用的外部文件： JavaScritp、CSS 等常常会阻塞浏览器渲染页面。假设在 `<head>` 中引用的某个 JavaScript 文件由于各种不给力需要2秒来加载，那么浏览器渲染页面的过程就会被阻塞2秒，直到该JS文件下载并执行完后才继续。

前端性能调优时必须排除任何潜在的渲染阻塞点，让浏览器在最短时间内渲染出整体页面。

1、JavaScript为何会阻塞？
```js
<!doctype html>
<html>
  <head>
    <script type="text/javascript" src="page.js"></script>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```
上述代码中，当浏览器解析 script 标签时，由于浏览器并不知道 page.js 将会对页面做什么改变，所以浏览器需要停止渲染，下载并执行 page.js 后再继续渲染后面的内容。如果 page.js 的下载过程中出现任何延迟，也将影响整个页面的渲染。

2、优化方案：

（1）Inline JavaScript：

如果页面的初始渲染的确依赖于page.js，我们可以考虑使用内联JavaScript。
```js
<!doctype html>
<html>
  <head>
    <script type="text/javascript">
    /* page.js的内容 */
    </script>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```
（2）推迟加载：

如果页面的初始渲染并不依赖于page.js，我们可以考虑推迟加载page.js，让其在页面初始内容渲染完成后再加载。
```js
<!doctype html>
<html>
  <head>
  </head>
  <body>
    <h1>Hello World</h1>
    <script type="text/javascript" src="page.js"></script>
  </body>
</html>
```
（3）异步加载

HTML5允许我们给 script 标签添加属性： "async" 来告诉浏览器不必停下来等待该脚本执行，什么时候下载完什么时候执行该脚本就可以了。这样的话浏览器会边下载page.js边渲染后面的内容。
```html
<!doctype html>
<html>
  <head>
    <script type="text/javascript" src="page.js" async></script>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
``` 
然而如果某个JS被其他JS所依赖，那么就不能使用异步加载了。
```html
<!doctype html>
<html>
  <head>
    <script type="text/javascript" src="jquery-1.11.3.min.js" async></script>
    <script type="text/javascript" src="jq-plugin.js" async></script>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```
由于使用异步加载后，JS不再顺序执行。上例中 jq-plugin.js 依赖于jQuery，如果 jq-plugin.js 先下载完成，此时jQuery还没下载完，那么浏览器就会先执行 jq-plugin.js 导致出错。当然这类问题可以通过引入依赖管理来解决，这是另外一个主题，就不展开讨论了。

3、CSS为什么会阻塞？

由于CSS决定了DOM元素的样式、布局，所以浏览器遇到CSS文件时会等待CSS文件加载并解析完后才继续渲染页面。

4、优化方案：

（1）Inline CSS

我们可以将那些页面首屏渲染需要用到的CSS代码加入Inline CSS。

（2）推迟加载CSS

对于那些首屏渲染不需要用到的CSS，我们可以依旧使用文件形式并在页面内容渲染完成后再加载。
```html
<!doctype html>
<html>
  <head>
    <style tpe="text/css">
    .blue {
        color: blue;
    }
    </style>
  </head>
  <body>
    <div class="blue">
      Hello, world!
    </div>
    <link href="other.css" rel="stylesheet" />
  </body>
</html>
```
5、结论

在页面加载时我们需要让页面内容尽快呈现给用户，页面初始渲染所需要的JS和CSS可以直接在 `<head>` 标签中以代码形式插入。

所有的外部文件引用可以放在页面内容之后，对于JS文件也可以采用异步加载。