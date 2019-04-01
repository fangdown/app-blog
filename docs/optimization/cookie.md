## cookie优化
我们知道，对于每一个http请求，无论是动态的网页aspx，还是jsp，还是/user/add这种MVC模式的URL，还是CSS或者JS文件，每一个http请求都会带着在硬盘上存有的跟这个域相关存有的cookie信息。越来越多的cookie导致请求头越来越大。那么应该如何去优化呢？

　　cookie存储在客户端，伴随着HTTP请求在浏览器和服务器之间传递。除了key-value外，cookie还有max-age，path，domain和httponly属性。

　　httponly属性标识一个客户端JavaScript能否操作该cookie；

　　max-age属性表示缓存时间，单位为秒；

　　domain设置可以访问该Cookie的域名；

　　path设置该domain下可以访问该Cookie的路径，默认为/。

　　cookie优化方案：

　　1、去除没有必要的cookie，如果网页不需要cookie就完全禁掉。

　　2、将cookie的大小减到最小。

　　由于cookie在访问对应域名下的资源时都会通过HTTP请求发送到服务器，因此，减小cookie的大小，能减小HTTP请求报文的大小，提高响应速度。

　　比如：对于服务器端完全不关心的数据，比如说一个网站把一个用户在网站阅读进度存储在浏览器本地。这时候我们可以采取存储在cookie中，但是这是服务器端不关心的数据，但是每次都会放到http头部中，造成冗余。这时候我们可以采取其他的缓存存储办法，比如说localStorage。

　　再比如：即使是有一些必须要存储在cookie中的参数，我们也可以通过合并来减少键值对的数量。

　　3、设置合适的过期时间，较长的过期时间可以提高响应速度。

　　给cookie添加一个过期时间，则cookie信息将存储到硬盘上，即使浏览器退出Cookie还会存在。只要Cookie未被清除且还在过期时间内，该Cookie就会在访问对应域名时发送给服务器。

　　4、通过使用不同的domain减少cookie的使用。

　　cookie在访问对应域名下的资源时都会通过HTTP请求发送到服务器，但在访问一些资源，如js，css和图片时，大多数情况下cookie是多余的，可以使用不同的domain来存储这些静态资源，这样访问这些资源时就不会发送多余的cookie，从而提高响应速度。

　　cookie隔离：如果静态文件都放在主域名下，那静态文件请求的时候都带有的cookie的数据提交给server的，非常浪费流量，所以不如隔离开。因为cookie有域的限制，因此不能跨域提交请求，故使用非主要域名的时候，请求头中就不会带有cookie数据，这样可以降低请求头的大小，降低请求时间，从而达到降低整体请求延时的目的。同时这种方式不会将cookie传入Web Server，也减少了Web Server对cookie的处理分析环节，提高了webserver的http请求的解析速度。