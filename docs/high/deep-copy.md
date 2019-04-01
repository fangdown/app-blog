## 深浅拷贝
### 当前浅拷贝技巧
> 有3个方法， concat、slice、JSON格式化， 对象只能用JSON格式化
> 这3个方法都是浅拷贝, JSON格式化不能拷贝函数
1. 数组-concat()
```js
  var arr = ['fang', 'down'];
  var arr2 = [].concat(arr);
```
2. 数组-slice()
```js
  var arr = ['fang', 'down'];
  var arr2 = arr.slice();
```
3. 数组对象均可-JSON.stringify()方法
```js
  var arr = ['fang', 'down'];
  var obj = {
    name: 'fang'
  }
  var arr2 = JSON.parse(JSON.stringify(arr));
  var obj2 = JSON.parse(JSON.stringify(obj));

```
### 实现浅拷贝
> 思路： 循环属性，并赋值
```js
function shallowCopy(obj){
  if(typeof obj !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for(var key in obj){
    newObj[key] = obj[key]
  }
  return newObj;
}
```
### 实现深拷贝
>思路： 在浅拷贝的基础上，在循环中判断是否是对象，并且是自身对象
```js
function deepCopy(obj){
  if(typeof obj !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for(var key in obj){
    if(obj.hasOwnProperty(key)){
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}
```
> 这个能解决大部分问题，但是没有考虑到window null等等这些，暂且不考虑。
> 还可以用lodash中的cloneDeep实现深拷贝