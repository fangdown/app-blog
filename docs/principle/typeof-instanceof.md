## typeof-instanceof
* typeof的原理
> 前提知识
js在底层存储变量的时候， 会在变量的机器码的低位1-3位存储其类型信息.
+ 000： 对象
+ 010： 浮点数
+ 100： 字符串
+ 110： 布尔
+ 1： 整数
+ null： 0
+ undefined： −2^30整数

>所以原理: 利用储存类型判断。  
typeof a === 'function' 这个比较特殊。

* instanceof的原理
>原理： 右边变量的prototype在做左边变量的__proto__上即可，左边会在其原型链上去查找，如果一直查找不到，就返回false
```js
  function new_instanceof(leftValue, rightVaule){
    var leftProto = leftValue.__proto__;
    var rightPrototype = rightVaule.prototype;
    while(true){
      if( leftProto === null ){
        return false;
      }
      if( leftProto === rightPrototype ){
        return true;
      }
      leftProto = leftValue.__proto__;
    }
  }
```