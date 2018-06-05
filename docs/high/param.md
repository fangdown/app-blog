## 参数按值传递

### 骨架
> 传递的是一个值类型，该值指向被传递的地址

### 解析
```js
var a = 'hello';
var b = {
    name: 'fang'
}
function foo(a, b){
    console.log(a, b)
}
```
1. 在函数中，解析形参
```js
var a = a; var b = b;`
```
2. 改变形参值
```js
var a = 'hello';
var b = {
    name: 'fang'
}
function foo(a, b){
    a = 'world';
    b = 'hi'; // 将b指向另外一个指针了
    console.log(a, b)
}
foo(a, b) 
console.log(a, b)
// 输出
// world
// hi
// hello 
// {name: "fang"}
```