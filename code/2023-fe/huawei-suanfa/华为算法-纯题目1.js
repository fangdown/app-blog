---/**两数之和 */
function getSum(arr, target){
  const obj ={}
  for(let i =0; i< arr.length; i++){
    const diff = target-arr[i]
    // 注意这里的undefined 而不是用!
    if(obj[diff]===undefined){
      obj[arr[i]] = i
    } else{
      console.log(obj[diff]+1, i+1)
    }
  }
}
getSum([2,5,19,7,1], 9)
// 将16进制为10进制
/**HJ3.明明的随机数 */
// HJ101 输入整型数组和排序标识，对其元素按照升序或降序进行排序
// 哈希表：HJ10.字符个数统计
--- // 递归：NC68.跳台阶
function getStep(n){
  if(n< 2) return 1
  return getStep(n-1)+ getStep(n-2)
}
// HJ17.坐标移动
// HJ20.密码验证合格程序 4个条件 重复排查slice
// *HJ23.删除字符串中出现次数最少的字符
// *HJ33.整数与 IP 地址间的转换  padStart match正则 使用
--- // HJ101.输入整型数组和排序标识 slice sort join
function getSort(arr, sort){
  const res = arr.sort((a,b) => sort === 1? a-b: b-a)
  res.forEach(x => console.log(x))
}
// *HJ106.字符串逆序
// *HJ14.字符串排序 打乱重组排序
// HJ27.查找兄弟单词
// *NC37.合并区间  比尾巴和头比较
--- // *HJ68.成绩排序
function getSort2(arr, sort){
  const newArr = arr.map(x => x.split(' '))
  newArr.sort((a,b)=> sort ===1 ? a[1]- b[1]: b[1]-a[1])
  newArr.forEach(x=>{
    console.log(x.join(' '))
  })
}
getSort2(['张三 100', 'ww 90', 'bs 98'], 0)
// NC52.括号序列
// \*leetcode 1614.括号的最大嵌套深度
// leetcode 674.最长连续递增序列
// *HJ108.求最小公倍数
--- // 汽水瓶
function getPingzi(n){
  if(n ==1) return 0
  if(n == 2) return 1
  return getPingzi(n-2) +1
}
console.log(getPingzi(4))
//  HJ4 字符串分隔 每8个分隔，不足补零
// HJ6 质数因子
// HJ15 求int型正整数在内存中存储时1的个数
// HJ21 简单密码
--- // HJ31 单词倒排
console.log(str.split(' ').reverse().join(''))
// HJ34 图片整理
// HJ37 统计每个月兔子的总数
// HJ40 统计字符
// HJ53 杨辉三角的变形
--- // HJ73 计算日期到天数转换
function getDay(str){
  const date = new Date(str)
  const oneDay = new Date(date.getFullYear(), 0 ,0 )
  const diff = (+date) - (+oneDay )
  const sec= 1000*60*60*24
  console.log(Math.floor(diff/sec))
}
getDay('2023-02-09')
// HJ94 记票统计
// HJ100 等差数列
// HJ97 记负均正
// HJ96 表示数字
---// HJ86 求最大连续非1bit数
function getNum2(str){
  console.log(Number(str).toString(2))
  // 注意这里是[^1] 而不是 /^1/ 
  const arr = Number(str).toString(2).replace(/[^1]/g, ' ').split(' ')
  let max =0 
  console.log(arr)
  arr.forEach(x => {
    max = Math.max(max, x.length)
  })
  console.log(max)
}
getNum2(200)
// HJ84 统计大写字母个数