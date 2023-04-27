/**两数之和 */
-- // 将16进制为10进制
console.log(parseInt(str, 16))
/**HJ3.明明的随机数 */
// HJ101 输入整型数组和排序标识，对其元素按照升序或降序进行排序
// 哈希表：HJ10.字符个数统计
// 递归：NC68.跳台阶
-- // HJ17.坐标移动
function move(str){
  const reg = /^[ASWD]\d+$/
  const arr = []
  let x =0 
  let y = 0
  str.split(';').forEach(x =>{  
    if(reg.test(x)){
      arr.push(x)
    }
  })
  for(let i =0; i< arr.length;i++){
    const direction = arr[i].substring(0,1)
    const value = Number(arr[i].substr(1))
    switch(direction){
      case 'A':
          x -= value
          break;
      case 'D':
            x += value
            break;
      case 'W':
              y += value
              break;
      case 'S':
                y -= value
                break;
    }
  }
  console.log(x, y)
}
move('A10;S20;W10;D30;X;A1A;B10A11;;A10;')
// HJ20.密码验证合格程序 4个条件 重复排查slice
// *HJ23.删除字符串中出现次数最少的字符
// *HJ33.整数与 IP 地址间的转换  padStart match正则 使用
// HJ101.输入整型数组和排序标识 slice sort join
-- // *HJ106.字符串逆序
console.log(str.split('').reverse().join(''))
// *HJ14.字符串排序 打乱重组排序
// HJ27.查找兄弟单词
// *NC37.合并区间  比尾巴和头比较
// *HJ68.成绩排序
-- // NC52.括号序列
function checkKuohao(str){
  const stack = []
  const leftK = '([{'
  const  rightK = ')]}'
  function compare(left, right){
    if(left==='(' && right === ')' || 
    left==='[' && right === ']'||
    left==='{' && right === '}'){
      return true
    }
    return false 
  }
  for(let i =0 ;i < str.length;i++){
    if(leftK.includes(str[i])){
      stack.push(str[i])
    }else if(rightK.includes(str[i])){
      const left = stack[stack.length -1]
      const res = compare(left, str[i])
      if(res){
       stack.pop()
      }else{
        return false
      }
    }
  }
  return stack.length === 0
}
console.log(checkKuohao('({[]})'))
// \*leetcode 1614.括号的最大嵌套深度
// leetcode 674.最长连续递增序列
// *HJ108.求最小公倍数
// 汽水瓶
-- //  HJ4 字符串分隔 每8个分隔，不足补零
function splitStr(str){
  const res = str.match(/.{1,8}/g).map(x => {
    const len = 8- x.length 
    console.log('len',len)
    return x + new Array(len).fill('0').join('')
  })
  console.log(res)
}
splitStr('abc')
// HJ6 质数因子
// HJ15 求int型正整数在内存中存储时1的个数
// HJ21 简单密码
// HJ31 单词倒排
-- // HJ34 图片整理
console.log(str.split('').sort().join(''))
// HJ37 统计每个月兔子的总数
// HJ40 统计字符
// HJ53 杨辉三角的变形
// HJ73 计算日期到天数转换
-- // HJ94 记票统计
function getCount(str){
  const mans = ['A', 'B', 'C','D',]
  const arr = str.split(' ')
  const obj = {}
  mans.forEach(x =>{
    obj[x] = 0
  })
  obj['Invalid'] = 0
  for(let i=0; i< arr.length;i++){
    if(mans.includes(arr[i])){
      obj[arr[i]] +=1
    } else{
      obj['Invalid'] +=1
    }
  }
  Object.entries(obj).map(x => {
    console.log(x.join(' '))
  })
}
getCount('A D E CF A GG A B')

// HJ100 等差数列
// HJ97 记负均正
// HJ96 表示数字
// HJ86 求最大连续bit数
-- // HJ84 统计大写字母个数
function getUpCaseNum(str){
    let count = 0
    for(let i =0 ;i< str.length;i++){
      if(/[A-Z]/.test(str[i])){
        count+=1
      }
    }
    console.log(count)
}
getUpCaseNum('A 1 0 1 1150175017(&^%&$vabovbaoadd 123#$%#%#O')