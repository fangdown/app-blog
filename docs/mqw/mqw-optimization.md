## 性能优化

### 资源压缩合并，减少http请求
1. gzip压缩
2. 图片压缩
3. base64

### 非核心代码异步加载
1. async
2. defer
3. 动态script
4. 懒加载
### 浏览器缓存
1. 强缓存
  - Expires 绝对时间
  - cache-control： no-store | no-cache
Expires发的是服务器时间，但是比对的时候是用浏览器本地时间，所以会有差异，不准确
cache-control优先级别高

2. 协商缓存
  - last-modified/if-modify-since
  - etag/if-none-match
last-modified 存在时间改了内容没有改的问题及1s内有多次更改，时间还是不变的问题
etag 文件内容变化即改变hash字符串，缺点是服务器集群容易发生混乱

### cdn
1. 动静态内容域名分离  
2. header头选项配置建议
  - connection: keep-alive
  - Vary:Accept-Encoding,User-Agent
3. 避免使用重定向
4. 4个左右域名交叉

### dns预解析
<meta http-equiv="x-dns-prefetch-control" content="on">
<link rel="dns-prefetch" rel="http://a.com" />

### 并行加速数控制
6个以内