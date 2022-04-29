---
title: git合并提交记录
date: 2022-04-26 11:14:12
permalink: /pages/4938a2/
categories:
  - 日记
tags:
  - 
---

# git合并提交记录
## 问题
在开发分支上开发了特性功能， 分批次提交到了远程分支， 现在开发完成，需把历史提交记录合并，使提交记录简洁


## 解决：合并已经到远程开发分支的的记录
- git rebase -i HEAD~5  合并最新的5条commit记录

- 输入命令后，出现5条commit记录， 把主记录前pick保留，其他记录 pick改成 squash(简写s也可以)，保存进入下一步

- 精简commit，只保留需要的文案描述，保存

- 远程提交更新， git push -f


![](https://www.git-tower.com/learn/media/pages/git/faq/git-squash/32939580-1650822512/cli-interactive-rebase@2x.gif)