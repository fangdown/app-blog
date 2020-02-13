## ci持续集成

### 先决条件
1. 前端github项目
2. 远程服务器机器免密
3. 远程登录Linux脚本
4. 该服务器装Jenkins
5. 前端代码提交完成-成功后，把script文件夹拷贝到远程执行
6. Jenkins安装插件 nodejs publish over ssh
7. 全局工具配置配置publish over ssh
8. 创建任务，配置命令

### 免密生成
1. 生成一对秘钥
2. ssh-keygen -t rsa "409951398@qq.com"
3. ssh-copy-id -i ~/.ssh/id_rsa.pub  root@148.70.216.46
4. ssh-add-K ~/.ssh/id_rsa(可选操作)
下次就可以
ssh  root@148.70.216.46 不用输入密码了

### 服务器配置
1. 安装好node yarn pm2 npm 等

### 本机安装jekins
1. 安装下一步下一步即可，要记住3个账号的密码

### 配置全局配置
系统配置-》全局配置-》Publish over SSH
- 设置Passphrase 密码
- 设置SSH Servers
    - name fd
    - Hostname 148.70.216.46
    - Username root
    - Remote Directory	

### 创建任务
系统配置-》创建任务
1.  源码管理
  