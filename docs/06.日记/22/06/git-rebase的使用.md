---
title: git-rebase 合并多记录及变基的用法
date: 2022-06-01 16:42:55
permalink: /pages/d7e684/
categories:
  - 日记
tags:
  - 
---
# git-rebase 合并多记录及变基的用法

## 合并多条记录
在开发中，会经常提交commit并提交到远程，于是产生了多条记录， 在最终合并到master时建议把这些commit合并成一条commit，以便记录清晰

命令:

```
git rebase -i  HEAD~n
```
合并最近的n条记录，[具体请看](https://fangdown.cn/pages/4938a2/)

## rebase变基
场景： 在master分支上切出新分支A进行开发, 等待需合入时，前面已经有其他同事或者提交合并到了master，

此时需要使用变基的方式，使A分支在master的最前面。

要区别```git pull origin master```的方式， 这种方式会产生时间线的混乱

- 使用方式
1. 命令
```
git checkout A

git rebase master
```
2. sourcetree
- 在A分支上，右键变基


- 图例
![](https://api.git123.cn/proxy/image?url=https://img-blog.csdnimg.cn/12b959efcc454da5a15b9fdec493d61b.png?)


