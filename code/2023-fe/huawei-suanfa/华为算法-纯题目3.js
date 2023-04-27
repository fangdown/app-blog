/**两数之和 */
// 将16进制为10进制
---/**HJ3.明明的随机数 */
function getRandom(arr){
  Array.from(new Set(arr)).sort((a,b)=> a-b).forEach(x => console.log(x))
}
getRandom([2,3,22,1,2,3])
// HJ101 输入整型数组和排序标识，对其元素按照升序或降序进行排序
// 哈希表：HJ10.字符个数统计
// 递归：NC68.跳台阶
// HJ17.坐标移动
---// HJ20.密码验证合格程序 4个条件 重复排查slice

function checkPass(str){
   const r1 = /[A-Z]/
   const r2 = /[a-z]/
   const r3 = /[0-9]/
   let t1 =0 
   let t2 =0
   let t3=0
   let t4 =0
   if(str.length < 8) return false
   for(let i =0; i< str.length;i++){
    if(r1.test(str[i])){
      t1+=1
    }
    if(r2.test(str[i])){
      t1+=1
    }
    if(r3.test(str[i])){
      t3 +=1
    } else{
      t4+=1
    }
   }
   const count = (t1>0?1:0) + (t2>0?1:0) +( t3>0?1:0) + (t4>0?1:0 )
   if(count < 3) return false
   for(let i =0; i < str.length-2;i++){
    const len = str.split(str.slice(i, i+3)).filter(x => !!x).length
    if(len > 2) return false
   }
   return true
  }
  console.log(checkPass('021Abc9000'))
  console.log(checkPass('021Abc9Abc1'))
  

// *HJ23.删除字符串中出现次数最少的字符
// *HJ33.整数与 IP 地址间的转换  padStart match正则 使用
// HJ101.输入整型数组和排序标识 slice sort join
// *HJ106.字符串逆序
--- // *HJ14.字符串排序 打乱重组排序
console.log(arr.sort().join(''))
// HJ27.查找兄弟单词
// *NC37.合并区间  比尾巴和头比较
// *HJ68.成绩排序
// NC52.括号序列
-- // \*leetcode 1614.括号的最大嵌套深度
function maxDept(str){
  let max = 0
  const stack = []
  for(let i =0; i< str.length;i++){
    if(str[i]==='('){
      stack.push(str[i])
    }else if(str[i]===')'){
      stack.pop()
    }
    max = Math.max(max, stack.length)
  }
  console.log(max)
}
maxDept('fsdf((((ffa))))((12))')
// leetcode 674.最长连续递增序列
// *HJ108.求最小公倍数
// 汽水瓶
//  HJ4 字符串分隔 每8个分隔，不足补零
-- // HJ6 质数因子
// HJ15 求int型正整数在内存中存储时1的个数
// HJ21 简单密码
// HJ31 单词倒排
// HJ34 图片整理
-- // HJ37 统计每个月兔子的总数
function getRabbit(n){
  if(n<2) return 1
  return getRabbit(n-2)+ getRabbit(n-1)
}
console.log(getRabbit(5))
// HJ40 统计字符
// HJ53 杨辉三角的变形
// HJ73 计算日期到天数转换
// HJ94 记票统计
// HJ100 等差数列
// HJ97 记负均正
// HJ96 表示数字
// HJ86 求最大连续bit数
// HJ84 统计大写字母个数