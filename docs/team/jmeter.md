## jmeter压测工具

1. 环境准备
- 安装jdk 
- 下载jmeter
- 设置环境变量JAVA_HOME
- [java环境变量-win10](https://www.cnblogs.com/cnwutianhao/p/5487758.html)
- [jmeter安装配置](https://www.cnblogs.com/monjeo/p/9330464.html)

2. 使用方式
- 添加plan
- 添加Thread Group
- 添加HTTP Request
- 添加Summary Report
- 添加View Results Tree
- [参考示例](http://www.cnblogs.com/TankXiao/p/4059378.html?utm_source=tuicool#source)

### 坑位
1. 阿里云
阿里云拦截jmeter压测请求， 如果过多的话会被拒绝的