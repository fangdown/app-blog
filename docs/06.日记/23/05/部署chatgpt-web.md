---
title: 部署chatgpt-web
date: 2023-05-25 15:52:44
permalink: /pages/b823d2/
categories:
  - 日记
  - 23
  - 05
tags:
  - 
---
# 部署 chatgpt-web

# 准备

## 海外服务器

- 在阿里云购买轻量服务器，配置选最低的， 一个月 24 元，可以接受
- 域名
  - 购买一个域名及相关的 ssl 证书
- chatgpt 账号
  - 光头哥小卖铺

## 环境安装

- oneinstack 安装 NGINX
- 安装 nvm
- 安装 nodejs 16 版本
- nginx 配置

## 永久启动

按照视频上的操作是不能关闭终端的，后来我又搜了一下，发现了可以一直让它跑在后台的办法：

1. 后端：
   nohup pnpm start >/dev/null 2>&1 & exit
2. 前端
   nohup pnpm dev >/dev/null 2>&1 & exit
   稍微解释一下：
   nohup 表示后台运行，以守护进程的方式运行
   > /dev/null 表示将日志抛弃，就是不留日志了（null 是一个特殊的文件，所有写到/dev/null 文件里的东西会消失）
   > 2>&1 表示将错误信息跟前面一样，抛弃掉
   > & exit 表示运行完命令之后退出终端
