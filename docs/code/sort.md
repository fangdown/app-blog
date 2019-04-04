## 实现排序

```js
  let arr1 = [6,1,2,7,9,3,4,5,10,8]
let n = 0 // 运行次数
for(let j = 0; j < arr1.length -1; j++){
  // 判断是否有交换， 无交换说明已经排好了
  let isOk = true
  for(let i = 0; i < arr1.length -1 - j; i++){
    let a = arr1[i]
    let b = arr1[i+1]
    if( a > b ){
      arr1[i] = b
      arr1[i+1] = a
      isOk = false
    }
    n++
  }
  if(isOk){
    break
  }
}
console.log(arr1,n)
//[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] 30
```