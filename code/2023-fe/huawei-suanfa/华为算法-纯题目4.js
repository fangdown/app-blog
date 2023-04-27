/**两数之和 */
// 将16进制为10进制
/**HJ3.明明的随机数 */
-- // HJ101 输入整型数组和排序标识，对其元素按照升序或降序进行排序
arr.sort((a,b)=> s ? a-b : b-a)
// 哈希表：HJ10.字符个数统计
// 递归：NC68.跳台阶
// HJ17.坐标移动
// HJ20.密码验证合格程序 4个条件 重复排查slice
-- // *HJ23.删除字符串中出现次数最少的字符
function deleteMin(str){
  const obj = {}
  for(let i =0; i< str.length;i++){
    if(!obj[str[i]]) obj[str[i]] = 1
    else obj[str[i]] +=1
  }
  const min = Math.min(...Object.values(obj))
  console.log('obj',obj)
  let res=''

  for(let i=0; i<str.length;i++){
    console.log('obj[str[i]]',obj[str[i]])
    if(obj[str[i]]!=min) res +=str[i]
  }
  console.log(res)
}
deleteMin('aabcdeeefff')
// *HJ33.整数与 IP 地址间的转换  padStart match正则 使用
// HJ101.输入整型数组和排序标识 slice sort join
// *HJ106.字符串逆序
// *HJ14.字符串排序 打乱重组排序
-- // HJ27.查找兄弟单词
function getBrotherword(str, word, k){
  const arr = str.split(' ')
  let s1 = [...word]
  const res =[]
  for(let i=0; i< arr.length;i++){
    let cur = [...arr[i]]
    if(s1.length !== cur.length) return
   if(s1.sort().join()===cur.sort().join()){
    res.push(arr[i])
   }
  }
  res.sort()
  console.log(res)
  console.log(res[res.length -1 -k])
}
getBrotherword('abc bca cab','abc',1)
// *NC37.合并区间  比尾巴和头比较
// *HJ68.成绩排序
// NC52.括号序列
// \*leetcode 1614.括号的最大嵌套深度
-- // leetcode 674.最长连续递增序列
function getLong(arr){
  let len = 1
  let max = 1
  for(let i =0; i<arr.length;i++){
    if(arr[i+1]> arr[i]){
      len+=1

    }else{
       len =1
    }
    max = Math.max(max , len)

  }
  console.log(max)
}
getLong([1,3,5,7,8, 4,7,9,10,23,25])
// *HJ108.求最小公倍数
// 汽水瓶
//  HJ4 字符串分隔 每8个分隔，不足补零
-- // HJ6 质数因子
// HJ15 求int型正整数在内存中存储时1的个数
// HJ21 简单密码
// HJ31 单词倒排
// HJ34 图片整理
// HJ37 统计每个月兔子的总数
// HJ40 统计字符
// HJ53 杨辉三角的变形
// HJ73 计算日期到天数转换
// HJ94 记票统计
-- // HJ100 等差数列
-- // HJ97 记负均正
function getzheng(str){
  const arr = str.split(' ').filter(x => x!==0)
  const fushulen = arr.filter(x => x < 0).length
  const zhengshu = arr.filter(x => x>0)
  const avg = zhengshu.length>0 ?zhengshu.reduce((sum, x)=> Number(sum)+Number(x),0)/zhengshu.length:0
  console.log(fushulen, avg.toFixed(1))
}
getzheng('1 2 3 4 5 6 7 8 9 0 -1')
getzheng('0 0 0')
// HJ96 表示数字
// HJ86 求最大连续bit数
// HJ84 统计大写字母个数