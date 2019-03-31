## 快排
```js
var quickSort = function (arr){
  if(arr.length <= 1) return arr;
  let pivotIndex = Math.floor(arr.length / 2)
  let pivot = arr.splice(pivotIndex,1)[0]
  let left = [];
  let right = [];
  for(let i = 0, len = arr.length; i < len; i++){
    if(arr[i] < pivot){
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([pivot, quickSort(right))
}

```
> 思路： 
- 找到中间位，得到中间值
- 循环数组，小于中间值的放一个左侧数组，大于中间值的放在右侧数组
- 递归左侧、中间值、递归右侧数组
