## 变量对象
### 骨架
- 变量对象(Variable object，VO) 活动对象（Active object AO）
- 全局上下文的变量初始化对象就是全局对象
- 函数上下文的变量初始化只是arguments对象
- 在进入函数上下文时会给变量添加形参、函数声明、变量声明等初始化的属性值
- 在代码执行阶段再次修改变量的属性值

>未进入执行阶段之前，变量对象(VO)中的属性都不能访问！但是进入执行阶段之后，变量对象(VO)转变为了活动对象(AO)，里面的属性都能被访问了，然后开始进行执行阶段的操作。它们其实都是同一个对象，只是处于执行上下文的不同生命周期
### 进入函数上下文，AO步骤
1. 分析
```js
  VO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1, // 形参
    b: undefined,
    c: reference to function c(){},
    d: undefined
  }
```
2. 执行
```js
  AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 3,
    c: reference to function c(){},
    d: reference to FunctionExpression "d"
  }
```