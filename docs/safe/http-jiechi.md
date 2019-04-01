## http-防劫持
### HTTP劫持、DNS劫持与XSS
#### HTTP劫持
什么是HTTP劫持呢，大多数情况是运营商HTTP劫持，当我们使用HTTP请求请求一个网站页面的时候，网络运营商会在正常的数据流中插入精心设计的网络数据报文，让客户端（通常是浏览器）展示“错误”的数据，通常是一些弹窗，宣传性广告或者直接显示某网站的内容，大家应该都有遇到过。
#### DNS劫持
DNS 劫持就是通过劫持了 DNS 服务器，通过某些手段取得某域名的解析记录控制权，进而修改此域名的解析结果，导致对该域名的访问由原IP地址转入到修改后的指定IP，其结果就是对特定的网址不能访问或访问的是假网址，从而实现窃取资料或者破坏原有正常服务的目的。

DNS 劫持比之 HTTP 劫持 更加过分，简单说就是我们请求的是 http://www.a.com/index.html ，直接被重定向了 http://www.b.com/index.html 
#### XSS跨站脚本
XSS指的是攻击者利用漏洞，向 Web 页面中注入恶意代码，当用户浏览该页之时，注入的代码会被执行，从而达到攻击的特殊目的。

关于这些攻击如何生成，攻击者如何注入恶意代码到页面中本文不做讨论，只要知道如 HTTP 劫持 和 XSS 最终都是恶意代码在客户端，通常也就是用户浏览器端执行，本文将讨论的就是假设注入已经存在，如何利用 Javascript 进行行之有效的前端防护。


### 页面被嵌入 iframe 中，重定向 iframe
先来说说我们的页面被嵌入了 iframe 的情况。也就是，网络运营商为了尽可能地减少植入广告对原有网站页面的影响，通常会通过把原有网站页面放置到一个和原页面相同大小的 iframe 里面去，那么就可以通过这个 iframe 来隔离广告代码对原有页面的影响。
避免被嵌套 window.self 与 window.top
```js
if (self != top) {
  // 我们的正常页面
  var url = location.href;
  // 父级页面重定向
  top.location = url;
}
```
#### 使用白名单放行正常 iframe 嵌套
#### 更改 URL 参数绕过运营商标记
最常规的手段是在页面 URL 中设置一个参数，例如 http://www.example.com/index.html?iframe_hijack_redirected=1 ，其中 iframe_hijack_redirected=1 表示页面已经被劫持过了，就不再嵌套 iframe 了
#### 内联事件及内联脚本拦截
```js
<a href="javascript:alert(1)" ></a>
<iframe src="javascript:alert(1)" />
<img src='x' onerror="alert(1)" />
<video src='x' onerror="alert(1)" ></video>
<div onclick="alert(1)" onmouseover="alert(2)" ><div>
```
除去一些未列出来的非常少见生僻的注入方式，大部分都是 `javascript:... `及内联事件 on*。

我们假设注入已经发生，那么有没有办法拦截这些内联事件与内联脚本的执行呢？

对于上面列出的 (1) (5) ，这种需要用户点击或者执行某种事件之后才执行的脚本，我们是有办法进行防御的。

### 静态脚本拦截

XSS 跨站脚本的精髓不在于“跨站”，在于“脚本”。

通常而言，攻击者或者运营商会向页面中注入一个`<script>`脚本，具体操作都在脚本中实现，这种劫持方式只需要注入一次，有改动的话不需要每次都重新注入。

我们假定现在页面上被注入了一个` <script src="http://attack.com/xss.js"> `脚本，我们的目标就是拦截这个脚本的执行。

听起来很困难啊，什么意思呢。就是在脚本执行前发现这个可疑脚本，并且销毁它使之不能执行内部代码。

所以我们需要用到一些高级 API ，能够在页面加载时对生成的节点进行检测。
#### MutationObserver
MutationObserver 是 HTML5 新增的 API，功能很强大，给开发者们提供了一种能在某个范围内的 DOM 树发生变化时作出适当反应的能力。

说的很玄乎，大概的意思就是能够监测到页面 DOM 树的变换，并作出反应。

MutationObserver() 该构造函数用来实例化一个新的Mutation观察者对象。

#### 使用白名单对 src 进行匹配过滤

### 动态脚本拦截
要拦截这类动态生成的脚本，且拦截时机要在它插入 DOM 树中，执行之前，本来是可以监听 Mutation Events 中的 DOMNodeInserted 事件的。
#### Mutation Events 与 DOMNodeInserted

### 重写 setAttribute 与 document.write
#### 重写原生 Element.prototype.setAttribute 方法
```js

var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.setAttribute('src', 'http://www.example.com/xss/c.js');
 
document.getElementsByTagName('body')[0].appendChild(script);

```
在动态脚本插入执行前，监听 DOM 树的变化拦截它行不通，脚本仍然会执行。

那么我们需要向上寻找，在脚本插入 DOM 树前的捕获它，那就是创建脚本时这个时机。
#### 重写嵌套 iframe 内的 Element.prototype.setAttribute
#### 重写 document.write

```js
function resetDocumentWrite(window) {
  var old_write = window.document.write;
 
  window.document.write = function(string) {
    if (blackListMatch(keywordBlackList, string)) {
      console.log('拦截可疑模块:', string);
      return;
    }
 
    // 调用原始接口
    old_write.apply(document, arguments);
  }
}
```

### 建立拦截上报
 ```js
 /**
 * 自定义上报 -- 替换页面中的 console.log()
 * @param  {[String]} name  [拦截类型]
 * @param  {[String]} value [拦截值]
 */
function hijackReport(name, value) {
  var img = document.createElement('img'),
    hijackName = name,
    hijackValue = value.toString(),
    curDate = new Date().getTime();
 
  // 上报
  img.src = 'http://www.reportServer.com/report/?msg=' + hijackName + '&value=' + hijackValue + '&time=' + curDate;
}
 ```
### HTTPS 与 CSP
最后再简单谈谈 HTTPS 与 CSP。其实防御劫持最好的方法还是从后端入手，前端能做的实在太少。而且由于源码的暴露，攻击者很容易绕过我们的防御手段。


#### CSP
CSP 即是 Content Security Policy，翻译为内容安全策略。这个规范与内容安全有关，主要是用来定义页面可以加载哪些资源，减少 XSS 的发生。
#### HTTPS
能够实施 HTTP 劫持的根本原因，是 HTTP 协议没有办法对通信对方的身份进行校验以及对数据完整性进行校验。如果能解决这个问题，则劫持将无法轻易发生。

HTTPS，是 HTTP over SSL 的意思。SSL 协议是 Netscape 在 1995 年首次提出的用于解决传输层安全问题的网络协议，其核心是基于公钥密码学理论实现了对服务器身份认证、数据的私密性保护以及对数据完整性的校验等功能。
[JavaScript防http劫持与XSS](http://www.cnblogs.com/coco1s/p/5777260.html)