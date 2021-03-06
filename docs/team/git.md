
### git知识分享

1. [如何在git push之后删除node_modules和dist](https://blog.csdn.net/yisimo/article/details/80341615)
```js
  git rm -r --cached .
  git add .
  git commit -m 'remove node_modules and dist'
  git push origin master
```
2. 使用淘宝npm的命令
```js
  临时：npm --registry https://registry.npm.taobao.org install express    
  永久：npm config set registry https://registry.npm.taobao.org
  安装cnpm： npm install -g cnpm --registry=https://registry.npm.taobao.org

  删除代理
  npm config delete registry

```
  
3. 更新某个包
```js
   查看版本 npm view vuepress versions  
   更新该版本 npm update vuepress
```
4. 更新npm
```
  npm install -g npm
```

5. git stash 暂存恢复和文件误删恢复
```
  git commit提交文件，服务器返回本地文件有修改。

  1、git stash :暂存本地代码

  2、git pull origin develop : 获取远程分支代码

  3、git stash pop:恢复之前暂存的文件

  git 误删文件和恢复指令

  1、git  fsck --lost-found :查看最近移除的文件.

  2、git show  '误删编号'：查看删除文件内容

  3、git merge ‘误删编号’： 本地合并误删的文件内容
  ```

  6. git commit -m 和 -am的区别
  简要区别： 已经提交过的文件，修改了，可以使用am一起，如果文件没有add过，则不能用am
  [区别](https://www.cnblogs.com/xiaohuochai/p/6664451.html)

  7. git 打标签
  - 创建 git tag version (-light) 
  - 创建附注标签 git tag -a v0.1.0 -m "release 0.1.0 version"
  - 查看标签 git tag , git show version 
  - 删除标签 git tag -d version
  - 补打标签 git tag -a v0.1.0 49e0cd22f6bd9510fe65084e023d9c4316b446a6（commitId）
  - 发布标签 git push origin version

8. 配置sshkey到github
  - ssh
  - ssh-keygen -t rsa连续按回车键三次（注意：千万不要输入密码！
  - cd .ssh/
  - cat id_rsa.pub
[参考](https://blog.csdn.net/gulingfengze/article/details/69665223)

9. 取消git初始化
rm -rf .git

10. git子模块

- git clone http://172.20.8.45/erp-frontend/base.git --recursive （recursive如果有子目录 会带下来）
- cd base
- git submodule add -b dev http://172.20.8.45/erp-frontend/ecms.git src/ecms （关键步骤，添加子模块）
- git submodule foreach git pull origin dev （更新子模块）

11. mac显示分支
[参考](https://www.jianshu.com/p/9f64abc94d45)

12. 比较分支
- -w 忽略空格导致的差异
  git diff prod..dev -w
- 比较两个文件
  git diff prod..dev -w xx/xxx/xxx.jsx

13. 忽略空格merge
- git merge -Xignore-all-space origin/prod（当前在dev分支）