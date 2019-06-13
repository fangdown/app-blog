## nrm使用

npm : 服务器在国外，导致于国内使用非常慢

cnpm : 此坑常常是无法下载完整

yarn  :  同cnpm一样，有的时候无法下载完整

nrm就是用来解决此问题，它是用于 npm 的切换

安装nrm 

  npm install nrm -g

  nrm ls  查看所有可用的路径

```
$ nrm ls

* npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
  taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
  tnpm --- http://npm.tuzhanai.com/

```
查看当前使用的是哪个源

```
切换使用
nrm use(taobao)
```

之后就可以使用该源进行安装

### 坑位
对于全局安装的npm
```npm i aaa -g```
依然是默认配置的源
有两种方式解决

1. 指定源安装--registry  
 ```npm i aaa -g --registry=http://registry.enpmjs.org/```

2. 更改默认配置源  
```npm config set registry http://registry.npm.taobao.org/```