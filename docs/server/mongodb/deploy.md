## centerOS部署nginx+node+pm2

> 还原安装过程，总结经验，避坑


### 一、服务器环境部署
1. 安装node
- 下载最新的node进行安装
```
wget http://nodejs.org/dist/v9.9.0/node-v9.9.0-linux-x64.tar.gz #下载
tar xvzf node-v9.9.0-linux-x64.tar.gz #解压
cd node-v9.9.0-linux-x64 #进入解压文件目录
```
- 配置node、npm软连接
```
ln -s /root/node/bin/node /usr/local/bin/node  
ln -s /root/node4/bin/npm /usr/local/bin/npm
```
- 安装查看
```
node -v
npm -v
```
2. 安装pm2
```
npm i pm2 -g
ln -s /root/node/bin/pm2 /usr/local/bin/pm2

```
3. 安装nginx
```
yum install nginx
```

### 二、项目安装
1. 项目拷贝
```
git clone git@xxxxxxx/xxxxx.git  #或者直接上传项目文件夹
```
2. 安装依赖
```
cd xxx //项目目录
npm install 
```

### 三、启动项目
1. 配置
- nginx配置
>新建文件todo.conf
```
upstream todo {
  server 127.0.0.1:8888; #这里要和启动项目的PORT端口一致
  keepalive 64;
}
server {
  listen 80;
  server_name www.xxxxx.com; #填写必须是已备案的域名，不然解析会出错。没有域名可填写服务器ip
  root         /root/projects/VUE-SSR-TECH; #项目favicon.ico所在文件夹
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwardered-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-Nginx-Proxy true;
    proxy_set_header Connection '';
    proxy_pass http://todo; #这里要和最上面upstream后的应用名一致,可以自定义
  }
}
```
- json配置
```
1. 简单版：pm2 start app.js
2. json方式
// weather.json
{
  "apps": [
    {
      "name": "weather",
      "cwd": "/root/github/node/koa2-mongodb",
      "script": "/root/github/node/koa2-mongodb/app.js",
      "log_date_format": "YYYY-MM-DD HH:mm Z",
      "error_file": "/var/log/node-app/node-app.stderr.log",
      "out_file": "log/node-app.stdout.log",
      "pid_file": "pids/node-geo-api.pid",
      "instances": 6,
      "min_uptime": "200s",
      "max_restarts": 10,
      "max_memory_restart": "1M",
      "cron_restart": "1 0 * * *",
      "watch": false,
      "merge_logs": true,
      "exec_interpreter": "node",
      "exec_mode": "fork",
      "autorestart": false,
      "vizion": false
    }
  ]
}
// package.json
"scripts": {
  "pm2": "pm2 start weather.json"
}
```

2. 启动项目
```
// 启动nginx
sudo ln -s /root/github/node/koa2-mongodb/todo.conf /etc/nginx/conf.d/  #nginx启动文件的软链接
service nginx start #启动nginx服务
cd xxx #进入项目根目录

// 启动pm2
pm2 start app.js
或
npm run pm2
```