## JS实用代码-判断
#### 判断数据类型
```js
  var class2type = {};
  'Boolean Number String Function Array RegExp Error Date Object'.split(' ').map((item) => {
    return class2type['[Object '+item+']'] = item.toLowerCase();
  })
  function type(obj){
    // 兼容ie6
    if(obj == null){
      return obj + '';
    }
    return typeof obj === 'object' || typeof obj === 'function' ? 
    class2type[Object.prototype.toString.call(obj)] || 'object'
     : typeof obj;
  }
```
#### 是否为空对象
```js
  function isEmptyObject(obj){
    var name;
    // 进入循环即代表有属性
    for(name in obj){
      return false;
    }
    return true;
  }
```
#### 是否为window
```js
  function isWindow(obj){
    return obj!=null && obj = obj.window;
  }
```
#### 是否为数组
```js
  Array.isArray(arr);
```
#### 是否为类数组
```js
  function isArrayLike(obj) {

    // obj 必须有 length属性
    var length = !!obj && "length" in obj && obj.length;
    var typeRes = type(obj);

    // 排除掉函数和 Window 对象
    if (typeRes === "function" || isWindow(obj)) {
        return false;
    }

    return typeRes === "array" || length === 0 ||
        typeof length === "number" && length > 0 && (length - 1) in obj;
}
```
#### 是否为dom
```js
  function isElement(obj){
    // 1,元素 2，属性 3，文本 8，注释
    return !!(obj && obj.nodeType === 1)
  }
```
