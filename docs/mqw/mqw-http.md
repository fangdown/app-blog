## http-M

### http的特点
1. 简单快速
2. 灵活
3. 无连接
4. 无状态

### http的报文组成
1. 请求报文
   - 请求行： url method http-version
   - 请求头
   - 空行
   - 请求体

2. 响应报文
   - 响应行
   - 响应头
   - 空行
   - 响应体

### http的请求方法
1. post
2. get
3. option
4. head
5. put
6. delete

### post get区别
1. get前进后退是无害的， post会重新提交
2. get被浏览器主动缓存，post不会
3. get请求参数会被保留，post不会
4. get请求参数头部有长度限制，2kb左右（其实是url限制）
5. get接受Ascii字符， post支持更多
6. get参数不安全，明文显示
7. post参数被放在消息体里传递


### http状态码
1. 1xx 提示信息
2. 2xx 成功 
3. 3xx 重定向
4. 4xx 客户端错误
5. 5xx 服务端错误

> 206 503 

### 持久连接
http1.1 支持 connection: keep-alive

### 管线化
>请求1->响应1->请求2->响应2->请求3->响应3

>请求1->请求2->请求3 ---> 响应1->响应2->响应3

条件： 
- http1.1
- 长连接
- get/head, post有所限制
- 服务端支持

> 管线化特点和原理，不要设置管线限制
