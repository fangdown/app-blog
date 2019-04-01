## 浏览器缓存机制
### 缓存介绍
1. 为什么要用
```
重用已获取的资源能够有效的提升网站与应用的性能
减少延迟和网络阻塞
缓解服务器压力
```
2. 什么情况下用
```
一个检索请求的成功响应: 对于 GET请求，响应状态码为：200，则表示为成功。一个包含例如HTML文档，图片，或者文件的响应.
不变的重定向: 响应状态码：301.
错误响应: 响应状态码：404 的一个页面.
不完全的响应: 响应状态码 206，只返回局部的信息.
除了 GET 请求外，如果匹配到作为一个已被定义的cache键名的响应.
```
3. 有哪些缓存
```
cookie
session
sessionStorage
localStorage
```

### 缓存使用
1. cookie
  > cookie是一个字符串，存储name=value的数据，以文本方式存储在客户端，用于辨别用户身份
- 服务器通过 Set-Cookie 头给客户端(浏览器)一串字符串
- 浏览器得到Cookie之后,每次请求都带上Cookie
- 服务器读取Cookie之后就知道用户的信息
- Cookie的生命周期默认是你关掉浏览器就over,后端可以强行设置时间,+1s~~~ ，辣么内存Cookie就变成了硬盘Cookie
- Cookie本质是http协议中的一项内容
- Cookie大小在4k左右
  > 缺点
- Cookie会被附加在每个HTTP请求中，所以无形中增加了流量。
- 由于在HTTP请求中的Cookie是明文传递的，所以安全性成问题，除非用HTTPS。
- Cookie的大小限制在4KB左右，对于复杂的存储需求来说是不够用的。
- Cookie不安全,用户可以更改
  
2. session
  > session是一个抽象的东西,是一个数据结构,存储在服务器端
- 将 SessionID（随机数）通过 Cookie 发给客户端
- 客户端访问服务器时，服务器读取 SessionID
- 服务器有一块硬盘（哈希表）保存了所有 session
- 通过 SessionID 我们可以得到对应用户的隐私信息，如 id、email
- 这块硬盘（哈希表）就是服务器上的所有 session
  > 缺点
- Session保存的东西越多，就越占用服务器内存，对于用户在线人数较多的网站，服务器的内存压力会比较大。
- 依赖于cookie（sessionID保存在cookie），如果禁用cookie，则要使用URL重写，不安全
- 创建Session变量有很大的随意性，可随时调用，不需要开发者做精确地处理，所以，过度使用session变量将会导致代码不可读而且不好维护。
  
3. localStorage
> localStroage是html5提供的一个api,它的实质是存放在浏览器的一个哈希表{'key':'value'}, 
  ```js
  // api
  localStorage.setItem('myCat', 'Tom');

  var cat = localStorage.getItem("myCat");

  localStorage.removeItem("myCat");
```
> 特点
- localStorage和HTTP无关，
- HTTP请求不会带上localStorage
- 域名相同才能读取localStorage(没有同源辣么严格)
- 每个域名localStorage最大存储量为10M左右(每个浏览器不一样,自己测试好吧~)
- 由于数据存在本地,生命周期为无限,不用考虑过期的问题.

> 常用场景
- 记录不敏感的信息(用户名之类的，生日，不能记录密码)
- 用来提示用户新的功能(弹出对话框)

4. sessionStorage
基本内容同localStorage，区别在于SessionStorage在用户关闭页面（会话结束）后就失效.

### 请求流程
#### 浏览器第一次请求流程图：
![](https://upload-images.jianshu.io/upload_images/1419656-edd493eefc698849.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700)

#### 浏览器再次请求时：
![](https://upload-images.jianshu.io/upload_images/1419656-1f4c5b7ec7c29d5d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700)

#### 名词解释
1. Expires
> Expires是Web服务器响应消息头字段，在响应http请求时告诉浏览器在过期时间前浏览器可以直接从浏览器缓存取数据，而无需再次请求。不过Expires 是HTTP 1.0的东西，现在默认浏览器均默认使用HTTP 1.1，所以它的作用基本忽略。Expires 的一个缺点就是，返回的到期时间是服务器端的时间，这样存在一个问题，如果客户端的时间与服务器的时间相差很大（比如时钟不同步，或者跨时区），那么误差就很大，所以在HTTP 1.1版开始，使用Cache-Control: max-age=秒替代。

2. Cache-control策略(主流)
> Cache-Control与Expires的作用一致，都是指明当前资源的有效期，控制浏览器是否直接从浏览器缓存取数据还是重新发请求到服务器取数据。只不过Cache-Control的选择更多，设置更细致，如果同时设置的话，其优先级高于Expires

- Public 指示响应可被任何缓存区缓存，客户端和代理服务器都可缓存。

- Private 指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效。

- no-cache 指示请求或响应消息不能缓存，该选项并不是说可以设置”不缓存“，容易望文生义~

- no-store 用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不使用缓存，完全不存下來。

- max-age 指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应。

- min-fresh 指示客户机可以接收响应时间小于当前时间加上指定时间的响应。

- max-stale 指示客户机可以接收超出超时期间的响应消息。如果指定max-stale消息的值，那么客户机可以接收超出超时期指定值之内的响应消息。

3. Last-Modified/If-Modified-Since
- Last-Modified/If-Modified-Since：Last-Modified/If-Modified-Since要配合Cache-Control使用。

- Last-Modified：标示这个响应资源的最后修改时间。web服务器在响应请求时，告诉浏览器资源的最后修改时间。

- If-Modified-Since：当资源过期时（使用Cache-Control标识的max-age），发现资源具有Last-Modified声明，则再次向web服务器请求时带上头If-Modified-Since，表示请求时间。web服务器收到请求后发现有头If-Modified-Since 则与被请求资源的最后修改时间进行比对。若最后修改时间较新，说明资源又被改动过，则响应整片资源内容（写在响应消息包体内），HTTP 200；若最后修改时间较旧，说明资源无新修改，则响应HTTP 304 (无需包体，节省浏览)，告知浏览器继续使用所保存的cache。

4. Etag/If-None-Match
- Etag/If-None-Match：Etag/If-None-Match也要配合Cache-Control使用。

- Etag：web服务器响应请求时，告诉浏览器当前资源在服务器的唯一标识（生成规则由服务器决定）。Apache中，ETag的值，默认是对文件的索引节（INode），大小（Size）和最后修改时间（MTime）进行Hash后得到的。

- If-None-Match：当资源过期时（使用Cache-Control标识的max-age），发现资源具有Etage声明，则再次向web服务器请求时带上头If-None-Match（Etag的值）。web服务器收到请求后发现有头If-None-Match则与被请求资源的相应校验串进行比对，决定返回200或304。

1. 对比
- 既生Last-Modified何生Etag？你可能会觉得使用Last-Modified已经足以让浏览器知道本地的缓存副本是否足够新，为什么还需要Etag（实体标识）呢？HTTP1.1中Etag的出现主要是为了解决几个Last-Modified比较难解决的问题：

- Last-Modified标注的最后修改只能精确到秒级，如果某些文件在1秒钟以内，被修改多次的话，它将不能准确标注文件的修改时间；

- 如果某些文件会被定期生成，当有时内容并没有任何变化，但Last-Modified却改变了，导致文件没法使用缓存；

- 有可能存在服务器没有准确获取文件修改时间，或者与代理服务器时间不一致等情形；

Etag是服务器自动生成或者由开发者生成的对应资源在服务器端的唯一标识符，能够更加准确的控制缓存。Last-Modified与ETag一起使用时，服务器会优先验证ETag。

- yahoo的Yslow法则中则提示谨慎设置Etag：需要注意的是分布式系统里多台机器间文件的last-modified必须保持一致，以免负载均衡到不同机器导致比对失败，Yahoo建议分布式系统尽量关闭掉Etag(每台机器生成的etag都会不一样，因为除了 last-modified、inode 也很难保持一致)。

#### 用户行为
![](https://upload-images.jianshu.io/upload_images/1419656-e045c635b512afec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700)

