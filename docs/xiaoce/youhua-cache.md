## 浏览器缓存优化

### 4个方面
依次为：
1. Memory Cache -内存
2. Service Worker Cache - 针对Service Worker Cache 类型
3. HTTP Cache - 主流
4. Push Cache - http2特性

### http缓存
#### 强缓存
1. expires - 单位是时间，存在时间不一致的问题
```
  expires: Wed, 11 Sep 2019 16:12:18 GMT
```
2. cache-control - 单位是秒，存活时间
```
  cache-control: max-age=3600, s-maxage=31536000
```
>s-maxage 优先级高于 max-age，两者同时出现时，优先考虑 s-maxage。如果 s-maxage 未过期，则向代理服务器请求其缓存内容。s-maxage针对cdn等代理,对public有效
- public vs private

public 可以被浏览器缓存，可以被代理缓存（设置了 s-maxage，maxage public可以不用手动设置）

private 只可以被浏览器缓存,默认值

- no-store vs no-cache

no-store 直接请求服务器，拉取新数据，不进行缓存判断
no-cache 绕过浏览器，询问服务器是否过期，过期就重新拉，否则用缓存

#### 协商缓存

1. Last-Modified if-modified-since
优点： 以文件修改时间为标准判断是否更改
缺点： 秒级以内的修改检测不到

2. Etag
优点：以文件内容是否变化为标准
缺点：集群时会遇到不同步时，状态紊乱


![](https://user-gold-cdn.xitu.io/2018/9/20/165f701820fafcf8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

