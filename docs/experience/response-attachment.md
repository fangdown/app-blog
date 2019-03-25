## 附件下载
> 图片、pdf、文本等需要下载？


### 解决方案
默认对浏览器能打开的直接打开了,找了n多方法均不可兼容，最后获得支持，得知可以更改nginx配置，解决

解决方法： 
1. 设置nginx，设置返回头部
```

location / {
    #root   html;
    #index  index.html index.htm;

    if ($request_filename ~* ^.*?\.(txt|doc|pdf|rar|gz|zip|docx|exe|xlsx|ppt|pptx)$){
      add_header Content-Disposition:'attachment';
    }
}

```

> 核心思路： 设置response-header，告知浏览器作为附件下载， Content-Disposition下载文件标识，通过nginx批量设置简单快捷实用

参考：[nginx作为下载文件服务器](https://www.cnblogs.com/zhuiluoyu/p/7085323.html)