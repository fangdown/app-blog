
### 数据类型
Number/String/Boolean/Null/Undefined/Object
新增Symbol

### 类型分类
1. 基础性类型 
   Number/String/Boolean/Null/Undefined/Object
2. 引用性类型
    Object
    ```js
    const obj = new Object();
    ```
### 类型判断
1. typeof 利用存储二进制头部编码可判断string/boolean/number/object/undefined
   ```js
   typeof 'hello' // string
   typeof null // object
   ```
2. instanceof 判断实例是否在原型链上
   ```js
   var arr = [1,2]
   arr instanceof Array // true
   ```
3. Object.prototype.toString.call(obj) 返回[Object xxx]判断具体的类型
   ```js
    var obj = {name: 'fang'}
    Object.prototype.toString.call(obj) // [object Object] 前面object 小写 不变，后面的可有13种类型
   ```