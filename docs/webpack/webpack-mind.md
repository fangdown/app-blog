## webpack 打包原理
### 模块化机制
### 核心思想
1. 一切皆模块（html/css/js/img）,利用require进行引用，这意味着我们可以将事物（业务）分割成更小的易于管理的片段，达到重复利用的目的。
2. 按需加载：传统打包工具会将所有的模块打包在一起，生成一个比较大的bundle.js模块，而webpack使用许多特性来分割代码生成多个bundle文件，异步加载部分可以实现按需加载。

### 文件管理
1. 每个文件都是一个资源，可用通过require或import导入
2. 每个入口文件会把自己所依赖的资源全部打包在一起，一个资源多次引用的话，只会打包一份
3. 对于多个入口的情况，其实就是分别独立的执行单个入口情况，每个入口文件不相干

### 打包原理
把所有依赖打包成一个bundle文件，通过代码分割成单元片段并按需加载。