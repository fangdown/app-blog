## 闭包
### 骨架
函数 + 自由变量
### 自由变量
1. 不在该函数内部定义的变量
2. 不是形参

### 理论角度
所有的函数都是闭包，因为都可以访问到全局变量

### 实践角度
1. 即使创建的上下文已经销毁，它仍然存在，比如内部函数从外部函数返回
2. 自由变量

```js
for(var i = 0; i < 3; i++){
    data[i] = (function(i){
        return function (){
            console.log(i)
        }
    })(i)
}
data[i].context = {
    scope: [AO, 匿名函数context, 全局vO]
}
```