
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
```
  
3. 更新某个包
```js
   查看版本 npm view vuepress versions  
   更新该版本 npm update vuepress
```
   
