## Nginx反向代理

```
// 修改nginx.conf
worker_processes 1; #工作进程数，和CPU核数相同
events {
    worker_connections 1024; #每个进程允许的最大连接数
}
http {
    #负载均衡就靠它
    upstream firstdemo {
        server 39.106.145.33;
        server 47.93.6.93;
    }
    server {
        listen 8080;
        location / {
            proxy_pass http://firstdemo; # 对应上面的配置
        }
    }
}
```

[参考](https://mp.weixin.qq.com/s/n7V-e-J41w8zNOn3NlS-OQ)