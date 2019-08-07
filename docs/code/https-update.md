## https升级记录

> 现在https越来越流行，使用场景和范围越来越广，要求越来要高， 如小程序的接口必须是https接口。升级项目中的http协议到https协议，已经迫不及待！

### 前置条件
1. 现有的http网站
  - centos 7
  - nginx （目录 /usr/local/nginx）
  - nginx （下载目录 /root/tool/nginx）
2. 阿里云 SSL证书
  - 可以免费申请20个证书
  - 证书和域名一一对应（子域名也是单独一个）

### 升级步骤
1. 购买SSL证书
- 登录阿里云-->产品与服务-->安全--> SSL证书，购买证书，下单支付
- 在未签发列表中，每一行后面有个申请按钮，点击，按要求填写表单，申请待审核
- 审核过后（2个小时左右），已签发列表后有下载证书到本地，[详细官方操作文档](https://help.aliyun.com/document_detail/98728.html?spm=5176.2020520163.0.0.14d6AGgpAGgpoO)

2. 配置nginx
- 如遇到nginx:[emerg]unknown directive ssl错误提示，则说明需要配置ssl模块（坑位，没有装的有， 装过的就没有了， 可通过./nginx -V 查看）[参考](https://blog.csdn.net/weixin_38111957/article/details/81283121)
```
[root@VM_0_4_centos nginx]# ./sbin/nginx -V 
nginx version: nginx/1.12.0
built by gcc 4.8.5 20150623 (Red Hat 4.8.5-36) (GCC) 
built with OpenSSL 1.0.2k-fips  26 Jan 2017
TLS SNI support enabled
configure arguments: --with-http_ssl_module
# 已有ssl模块
```
- 安装ssl模块
进入下载目录下
+ ./configure --with-http_ssl_module  //重新添加这个ssl模块 
+ make
+ cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.bak
+ cp objs/nginx /usr/local/nginx/sbin/nginx
+ 再次执行 ./sbin/nginx -V ，查看是否安装成功， 如果没有安装成功， 把这几个命令重复几次

- 配置443端口
```
server {
    listen 443;
    server_name api.fangdown.cn;
    ssl on;
    ssl_certificate ../cert/2612540_api.fangdown.cn.pem;
    ssl_certificate_key ../cert/2612540_api.fangdown.cn.key;

    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;

    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;  #使用此加密套件。
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;   #使用该协议进行配置。
    ssl_prefer_server_ciphers  on;

    location / {
      proxy_pass http://127.0.0.1:11000; # 这里可以继续http
      index index.html index.htm;
    }
  }
```

- 重启Nginx服务
```
./nginx -t # 检查一下语法是否有误
./nginx -s reload
```
>到这里为止，如果不出意外，已经可以正常访问https项目了
### 总结
以前觉得使用https配置很难，或者说不知道怎么配，很神秘， 今天自己动手实践了一次，觉得一下子就豁然开朗了，所以动手实践很重要。

要点： 
1. 阿里云提供了免费证书及文档说明（很棒，不然得到处找免费证书）
2. Nginx配置里增加ssl模块，然后把ssl证书配置正确