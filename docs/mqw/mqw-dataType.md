## 数据类型

### 数据类型
- string
- boolean
- number
- undefined
- null
- object
- symbol

### 显示数据转换

1. String函数
> 原始类型转换
- 数值转换后还是字符串数值
- string 转换后还是字符串
- true 转换成"true"， false转换成"false"
- undefined 转换成 "undefined"
- null 转换成 "null"
> 对象类型转换
调用自身的toString()方法，转换成原始类型转换，
调用自身的valueOf()方法，转换成原始类型转换，
如果还是复合类型，则报错

2. Number函数
> 原始类型转换
- 数值转换后还是数值
- string 如果可以转换成数字，转换成相应的数字，否则转换成NAN, 空字符转换成0
- true 转换成1， false转换成0
- undefined 转换成 NAN
- null 转换成0

> 对象类型转换
则调用对象的valueOf()方法，然后依据前面的规则转换返回的值。如果转换的结果是NaN，则调用对象的toString()方法，再次依照前面的规则转换返回的字符串值。

3. Boolean函数
- undefined null '' -0 +0 NAN 全部转换成false
- 其他全部为true

### 隐式数据转换

1. 四则运算
加法运算操作符 加号运算操作符在Javascript也用于字符串连接符，所以加号操作符的规则分两种情况：
- 有两个是数值，则进行相加，如果有一个为NaN,则结果为NaN
- 如果都是字符串，则进行拼接
- 如果有一个是字符串，另一个是对象/数值/Boolean值，则调用toString()得到字符串值
2. 判断语句

3. Native调用
console.log() // 自动转换成字符串

[JS类型转换（强制和自动的规则）](https://www.cnblogs.com/Juphy/p/7085197.html)