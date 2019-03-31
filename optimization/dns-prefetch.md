## DNS预解析
当浏览器请求一个URL的时候，通过firebug我们可以发现大概有以下几个过程：阻挡、域名解析、建立连接、发送请求、等待响应、接收数据。后面四个跟用户的网络情况和你的服务器处理速度有关，本文重点说说前两个。

### 阻挡：解决方案——提高浏览器并发连接数
阻挡：不同的浏览器对单个域名的最大并发连接数有一定的限制，HTTP/1.0和HTTP/1.1也不相同。比如HTTP/1.1协议下，IE6的并发连接数限制是2个；而在HTTP/1.0下，IE6的并发连接数可以达到4个。在其它浏览器也有类似的限制，一般是4~8个。这个时候，如果浏览器同时对某一域名发起多个请求，超过了限制就会出现等待，也就是阻挡。

　　那么为了解决阻挡这一问题，我们可以对某些URL的域名分散处理，比如我们的图片域名，一般用类似img.guoweiwei.com的域名，当一个页面包含20多张图片的时候，那至少有10几个请求会被阻挡，而如果我们分散到img0.guoweiwei.com/img1.guoweiwei.com/img2.guoweiwei.com/…等不同域名的时候，至少这20个图片请求会并发进行，网站打开速度会明显提升很多。类似的，可以对一些css/js的域名同样处理。

### 域名解析：解决方案
DNS预解析域名解析：从域名查询IP的过程，这个过程一般都很快的，但也会引起延迟。一般浏览器会适当的对解析结果缓存，并对页面中出现的新域名进行预解析，但并不是所有的浏览器都会这么做，为了帮助其它浏览器对某些域名进行预解析，你可以在页面的html标签中添加dns-prefetch告诉浏览器对指定域名预解析，如下：
```html
<link rel="dns-prefetch" href="//domain.com">
```
如果细心一点，你会在淘宝的网站发现这两个现象，淘宝有很多类似img0.tbcdn.cn这样的域名。

　　再另外提一点优化，
### cookie隔离
那就是为什么用img0.tbcdn.cn这个域名，而不是img0.taobao.com呢？这个得从cookie说起，淘宝的cookie已经非常大了，据说曾接近1K，如果用后面的域名，那每次请求图片都会带上长长的cookie，后果可想而知，不仅使得网络请求变慢，而且还浪费了带宽，而淘宝图片服务器并不需要这些cookie。这就是所说的cookie污染，为了解决这一问题，单独的域名是很有必要的。

### DNS预解析解决方案

NS预解析是浏览器试图在用户访问链接之前解析域名，这是计算机的正常DNS解析机制。

　　域名解析后，如果用户确实访问该域名，那么DNS解析时间将不会有延迟。

　　最明显的例子，DNS预解析在某个页面中包含非常多的域名非常有效，如搜索结果页。遇到网页中的超链接，DNS prefetching从中提取域名并将其解析为IP地址，这些工作在用户浏览网页时，使用最少的CPU和网络在后台进行解析。当用户点击这些已经预解析的域名，可以平均减少200毫秒耗时（假设用户最近还未访问过该域名），更重要的是用户不会遇到DNS解析最坏的情况（往往超过1秒）。

　　DNS Prefetch，即DNS预获取，是前端优化的一部分。一般来说，在前端优化中与 DNS 有关的有两点：

　　一个是减少DNS的请求次数，

　　另一个就是进行DNS预获取 。

　　DNS 作为互联网的基础协议，其解析的速度似乎很容易被网站优化人员忽视。现在大多数新浏览器已经针对DNS解析进行了优化，典型的一次DNS解析需要耗费 20-120 毫秒，减少DNS解析时间和次数是个很好的优化方式。

　　DNS Prefetching 是让具有此属性的域名不需要用户点击链接就在后台解析，而域名解析和内容载入是串行的网络操作，所以这个方式能 减少用户的等待时间，提升用户体验 。

　　浏览器对网站第一次的域名DNS解析查找流程依次为：浏览器缓存——系统缓存——路由器缓存——ISP DNS缓存——递归搜索
![](https://images2018.cnblogs.com/blog/1158910/201807/1158910-20180725233422177-444260396.png)

默认情况下浏览器会对页面中和当前域名（正在浏览网页的域名）不在同一个域的域名进行预获取，并且缓存结果，这就是隐式的 DNS Prefetch。如果想对页面中没有出现的域进行预获取，那么就要使用显示的 DNS Prefetch 了。

　　目前大多数浏览器已经支持此属性，支持版本如下：

– Safari: 5+
– Chrome: All
– Firefox: 3.5+
– Opera: Unknown
– IE: 9+ (called “Pre-resolution” on blogs.msdn.com)
　　其中 Chrome 和 Firefox 3.5+ 内置了 DNS Prefetching 技术并对DNS预解析做了相应优化设置。所以，即使不设置此属性，Chrome 和 Firefox 3.5+ 也能自动在后台进行预解析 。

　　目前很多大型站点也应用了这一优化，例如：

　　淘宝-支付宝-网易都采用了该技术

DNS Prefetch 应该尽量的放在网页的前面，推荐放在 ```html <meta charset="UTF-8">``` 后面。具体使用方法如下：
```html
<meta http-equiv="x-dns-prefetch-control" content="on">
<link rel="dns-prefetch" href="//www.zhix.net">
<link rel="dns-prefetch" href="//api.share.zhix.net">
<link rel="dns-prefetch" href="//bdimg.share.zhix.net">
```

预解析的实现：

　　1、用meta信息来告知浏览器, 当前页面要做DNS预解析:
```html
 <meta http-equiv="x-dns-prefetch-control" content="on" />
 <!--http中的a连接默认开启，但是https中默认关闭-->
 ```

　　2、在页面header中使用link标签来强制对DNS预解析:
```html

 <link rel="dns-prefetch" href="http://bdimg.share.baidu.com" />
 ```
　　注：dns-prefetch需慎用，多页面重复DNS预解析会增加重复DNS查询次数。

　　需要注意的是，虽然使用 DNS Prefetch 能够加快页面的解析速度，但是也不能滥用，因为有开发者指出 禁用DNS 预读取能节省每月100亿的DNS查询 。

　　如果需要禁止隐式的 DNS Prefetch，可以使用以下的标签：
```html
<meta http-equiv="x-dns-prefetch-control" content="off">
```