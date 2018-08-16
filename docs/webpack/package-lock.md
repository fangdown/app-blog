## package-lock文件的作用
npm5之后安装文件之后会多出一个package-lock.json的文件，它的作用是：

1. 安装之后锁定包的版本，手动更改package.json文件安装将不会更新包，想要更新只能使用 npm install xxx@1.0.0 --save 这种方式来进行版本更新package-lock.json 文件才可以

2. 加快了npm install 的速度，因为 package-lock.json 文件中已经记录了整个 node_modules 文件夹的树状结构，甚至连模块的下载地址都记录了，再重新安装的时候只需要直接下载文件即可

它的意义在于锁定了包的版本，确保能够避免包版本不同产生的问题。