## 二分查找法
```js
/**
  @param arr 数组
  @param l 数组左侧位置
  @param r 数组右侧位置
  @param target 目标值
*/
function binarySearch(arr, l, r, target){
  if(l > r) return -1;
  let mid = l + Math.floor((r - l) / 2))
  if(arr[mid] === target){
    return mid
  } else if(arr[mid] >  target){
    return binarySearch(arr, l, mid -1, target)
  } else {
    return binarySearch(arr, mid + 1, r, target)
  }
}
```
> 思路：给定有序递增条件数组、左侧位置、右侧位置、目标值，找到中间值，

- 中间值算法等于目标值，
- 中间值大于目标值，则递归使用起始位，中间位-1
- 中间值小于目标值，则递归使用中间位+1， 右侧位置