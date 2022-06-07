---
title: 前端脚手架cli制作简单入门
date: 2022-06-07 15:00:02
permalink: /pages/6ee30e/
categories:
  - 日记
tags:
  - 脚手架
---

# 前端脚手架cli制作简单入门
## 背景
有一个简单的前端项目模板， 需通过脚手架的方式进行创建

## 如何制作脚手架cli


**准备资料**
- git项目模板

**核心包**
- commander    // 命令行
- fs-extra     // 文件系统
- inquirer     // 交互命令
- axios        // 请求工具
- download-git-repo  // 下载git

### 过程
1. 脚手架命令开始

2. 创建文件夹
    - 提示是否覆盖已有文件夹
    - 创建文件夹

3. 创建核心

    - 获取模板库repos
    - 获取tag
    - 下载模板并复制到目标文件夹
4. npm 发布
   - npm login
   - npm publish
   
## QA
**github api 下载限制**

解决方法： 换网络、或者用token
```
{

-   message: "API rate limit exceeded for xx.xx.xx.xx. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)",
-   documentation_url: "<https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting>"

}
```

