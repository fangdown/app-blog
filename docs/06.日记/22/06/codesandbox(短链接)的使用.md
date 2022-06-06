---
title: codesandbox(短链接)的使用
date: 2022-06-06 10:52:47
permalink: /pages/43b1ca/
categories:
  - 日记
tags:
  - codesandbox
---


# codesandbox(短链接)的使用

## 背景
经常在antd或者其他开源组件库中看到代码示例，都是用了codesandbox（沙箱）工具，今天我们就来学习如何使用它创建自己的代码应用。

## 步骤
1. 登录codesandbox
[传送门](https://codesandbox.io)

2. 注册或者登录

3. 进入[主页](https://codesandbox.io/dashboard/home)

4. 点击右上角create sandbox

5. 选择一个模板（本例用React）

6. 根据自己的需要安装依赖包、编写功能代码，保存

7. 短链接分享

那么怎么分享出去呢， 浏览器中的url是```https://codesandbox.io/s/pensive-black-q3wzyi?file=/src/App.js```

而我们看到的一般都是```https://codesandbox.io/s/8spd7t```这种短链接的

点击上方的share也不是短链接！

8.  短链接生成
- 回到[dashboard页面](https://codesandbox.io/dashboard/home), 再点击刚才项目， 此时页面上的url就是短链接了
- 如果名称不满意， 可以修改名称
- 改好了， 访问试试 [https://codesandbox.io/s/test123-b26zjj](https://codesandbox.io/s/test123-b26zjj)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2aa07988a0f4b38aaba6c73df2c3d67~tplv-k3u1fbpfcp-watermark.image?)

9. 对比发现，其实步骤7里的链接也是短链接，把后面的?file=/src/App.js删掉即可

