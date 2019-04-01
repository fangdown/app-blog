
## 数组相关
### 数组去重
1. 双重循环
2. indexOf
3. 排序检测前后是否有相同
4. object键值对
5. es5-filter
6. es6-Set

### 最大值最小值
1. Math.max/Math.min  
- 任一参数不能转换成数字，返回NaN
- 没有参数， max返回-Infinity，min返回 Infinity
- 参数是一个个的，不是数组
2. 循环方法
```js
 var arr = [6, 4, 1, 8, 2, 11, 23];
 var result = arr[0];
 for(var i = 1; i < arr.length; i++){
   result = Math.max(result, arr[i])
 }
```
3. reduce方法
```js
 var arr = [6, 4, 1, 8, 2, 11, 23];
 arr.reduce(function(prev, current){
   return Math.max(prev, current)
 })  
//  拿前一个计算结果和当前比较
```
4. 排序方法
```js
 var arr = [6, 4, 1, 8, 2, 11, 23];
 arr.sort(function(a, b){
   return a - b;
 })
```
5. apply方法
```js
 var arr = [6, 4, 1, 8, 2, 11, 23];
 Math.max.apply(null, arr)
```
6. es6
```js
  Math.max(...[arr])
```
### 数组扁平化
将可能含有的嵌套数组转换成一层数组
```js 
  var arr = [1, [2, [3, 4]]];
  function flatten(arr){
    var result = [];
    for(var i =0; i< arr.length; i++){
      if(Array.isArray(arr[i])){
        result = result.concat(flatten(arr[i]))
      } else {
        result.push(arr[i])
      }
    }
    return result;
  }
  function flatten(arr) {
    return arr.reduce(function(prev, next){
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    }, [])
  }
  function flatten(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
  }

```
### findIndex findLastIndex
```js
  function findIndex(array, predicate, context) {
      for (var i = 0; i < array.length; i++) {
          if (predicate.call(context, array[i], i, array)) return i;
      }
      return -1;
  }

  console.log(findIndex([1, 2, 3, 4], function(item, i, array){
      if (item == 3) return true;
  })) // 2
  function findLastIndex(array, predicate, context) {
      var length = array.length;
      for (var i = length - 1; i >= 0; i--) {
          if (predicate.call(context, array[i], i, array)) return i;
      }
      return -1;
  }

  console.log(findLastIndex([1, 2, 3, 4], function(item, index, array){
      if (item == 1) return true;
  })) // 0


``