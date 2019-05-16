## 如何使用docker

### 安装docker
根据各自的环境安装docker

- mac| window
https://www.docker.com/products/docker-desktop
- linux
curl https://releases.rancher.com/install-docker/17.12.sh | sh

### 初始化nodeJs项目
> 演示用一个简单的（越简单，越好）
1. 创建文件夹demo
2. npm初始化
3. 安装koa
4. 修改package.json中的script
```
 "start": "node app.js",
 ```
5. 新增app.js,创建koa应用
```js
const Koa = require('koa')
const app = new Koa()

app.use( async ctx => {
  ctx.body = 'hello docker'
})

app.listen('3000', ()=>{
  console.log('app is start')
})
```
6. 启动项目
```
npm run start
```
### docker配置
1. 新建.dockerignore文件，表示过滤该类型的文件。类似git的.gitignore
2. 新建Dockerfile,构建脚本信息
```
#制定node镜像的版本
FROM node:8.9-alpine
#声明作者
MAINTAINER robin
#移动当前目录下面的文件到app目录下
ADD . /app/
#进入到app目录下面，类似cd
WORKDIR /app
#安装依赖
RUN npm install
#对外暴露的端口
EXPOSE 3000
#程序启动脚本
CMD ["npm", "start"]
```
### docker镜像构建
1. docker build -t docker_demo . (点不能少)
docker build -t 镜像名 当前目录
2. docker images 查看镜像
构建完成

### 运行docker容器
1. 启动容器
docker run -d -p 8088:3000 docker_demo(端口映射，如果不加会随机指派一个端口)
创建一个新的容器并运行，-d为后台执行，-p 8088:3000前面为主机端口，后面是容器端口。docker_demo镜像名

2. 停止容器
docker stop docker_demo

3. 重启容器
docker restart docker_demo

4. 杀死容器
docker kill -s KILL docker_demo

5. 删除容器
docker rm -f docker_demo

6. 列出容器
docker ps


### 上传镜像
使用官方的docker hub进行上传
1. 登录
docker login 
2. 打标签
docker tag docker_demo fangdown/docker_demo
格式docker tag 标签名 用户名/标签名
3. 推送
docker push fangdown/docker_demo
4. 成功后可以在docker hub查看

### 下载镜像
在服务器上下载镜像
1. docker login 

2. docker pull fangdown/docker_demo
3. 启动容器

### 通俗理解
docker就是把一个现有的nodejs项目搬到一个盒子，在相应的端也下载一个docker，那么下载了这个盒子。  
利用公共载体运行某个项目

### docker命令
解释|命令
-|-|
查看当前docker版本 | docker -v
查看当前本地所有镜像 | docker images
构造镜像,用法docker build -t 镜像名称 | docker build -t docker_demo .
用于容器与主机之间的数据拷贝。用法docker cp 主机文件地址 容器内地址。12d7f14v45cv为容器id。| docker cp /www/runoob 12d7f14v45cv:/www/
创建一个新的容器并运行，-d为后台执行，-p 9000:3000前面为主机端口，后面是容器端口。docker_demo镜像名| docker run -d -p 9000:3000 docker_demo
启动已被停止的容器 | docker start docker_demo
关闭已被启动的容器 | docker stop docker_demo
重新启动容器 | docker restart docker_demo
杀掉一个运行中的容器。| docker kill -s KILL docker_demo
删除一个或多少容器。-f :通过SIGKILL信号强制删除一个运行中的容器-l :移除容器间的网络连接，而非容器本身-v :-v 删除与容器关联的卷 | docker rm -f docker_demo、docker_demo1
在运行的容器中执行命令。104e28f2f072容器id | sudo docker exec -it 104e28f2f072 /bin/bash 
列出容器。 -a:所有容器包含没有运行的 | docker ps 
获取容器获取容器的日志 104e28f2f072容器id，-t:显示时间戳 | docker logs -f -t 104e28f2f072 
登陆镜像仓库 | docker login
获取镜像 | docker pull 
上传镜像| docker push
查看指定镜像的创建历史| docker history docker_demo