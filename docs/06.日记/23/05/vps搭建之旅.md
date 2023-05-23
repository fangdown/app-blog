---
title: vps搭建之旅
date: 2023-04-27 21:01:02
permalink: /pages/4b6f7f/
categories:
  - 日记
tags:
  - 
---
# VPS搭建之旅

# 购买服务器
- 去了vultr, 发现不支持马来西亚， 所以又去了lightnode购买
- 注册流程自行了解
- vultr支持退款， lightnode不支持退款


# 购买域名
- 要购买国外的域名，免备案
- namesilo  去注册购买， 这里有个坑，个人信息不能写中文，会报错， 尝试好久才发现。明明填写了表单值，却总是提示错误，直到改成了英文才好
- namesilo 域名解析 巨慢 要1个小时， 折磨人的耐心


# trojan 一键安装脚本
- yum update -y && yum install curl -y
- source <(curl -sL https://git.io/trojan-install) （安装）
- source <(curl -sL https://git.io/trojan-install) --remove (卸载)
 
- 坑： 选了一新版本的centos， 没有docker，导致脚本安装失败， 折腾了好多方法， 都很麻烦， 最后重装低版本服务器。

# 连上验证
ok
# 参考教程

[搭建自己的专属独享TikTok节点—国际版抖音节点搭建教程](https://www.tiktok11.com/%e6%90%ad%e5%bb%ba%e8%87%aa%e5%b7%b1%e7%9a%84%e4%b8%93%e5%b1%9e%e7%8b%ac%e4%ba%abtiktok%e8%8a%82%e7%82%b9-%e5%9b%bd%e9%99%85%e7%89%88%e6%8a%96%e9%9f%b3%e8%8a%82%e7%82%b9%e6%90%ad%e5%bb%ba/)
[trojan.sh](https://trojan.bojin.co/)
[namesilo](https://www.namesilo.com/login)
[ip是否被强](https://www.vps234.com/ipchecker/)

