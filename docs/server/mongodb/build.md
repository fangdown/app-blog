## mogondb服务器搭建

1. 下载安装包
```
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.2.7.tgz
```
> 服务器下载很快

2. 解压安装包
```
tar -zxvf mongodb-linux-x86_64-3.2.7.tgz
```

3. 指定安装目录
```
mv ./mongodb-linux-x86_64-ubuntu1604-3.2.7 /root/mongodb
```
4. 创建db和logs目录
```
mkdir /root/mongodb/db
mkdir /root/mongodb/logs
```
5. 新建mongodb.conf文件 
```
vim /root/mongodb/bin/mongodb.conf
```

加入内容如下： 
```
dbpath = /root/mongodb/db #数据文件存放目录  
  
logpath = /root/mongodb/logs/mongodb.log #日志文件存放目录  
  
port = 27017  #端口  
  
fork = true  #以守护程序的方式启用，即在后台运行  
  
nohttpinterface = true
bind_ip = x.x.x.x (云内外ip)
```

6. 启动mongodb
```
./mongod --config ./mongodb.conf
```

[参考](https://www.jianshu.com/p/0a4f9acf811d)