## plugin编写

1. 调用插件 apply 函数传入 compiler 对象
2. 通过 compiler 对象监听事件

比如你想实现一个编译结束退出命令的插件
```js
class BuildEndPlugin {
  apply (compiler) {
    const afterEmit = (compilation, cb) => {
      cb()
      setTimeout(function () {
        process.exit(0)
      }, 1000)
    }

    compiler.plugin('after-emit', afterEmit)
  }
}

module.exports = BuildEndPlugin

```