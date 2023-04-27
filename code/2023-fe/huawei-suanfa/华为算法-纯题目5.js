/**两数之和 */
// 将16进制为10进制
/**HJ3.明明的随机数 */
// HJ101 输入整型数组和排序标识，对其元素按照升序或降序进行排序
--- //  哈希表：HJ10.字符个数统计
function getCount(str){
    const res = Array.from(new Set(str.split('')))
    console.log(res.length)
}
getCount('abaca')
// 递归：NC68.跳台阶
// HJ17.坐标移动
// HJ20.密码验证合格程序 4个条件 重复排查slice
// *HJ23.删除字符串中出现次数最少的字符
--- // *HJ33.整数与 IP 地址间的转换  padStart match正则 使用'
function toNum(ip){
   const res = ip.split('.').map(x => parseInt(x).toString(2).padStart(8,'0')).join('')
   console.log(parseInt(res, 2))
}
toNum('255.255.255.1')
function toIp(num){
    const res = parseInt(num).toString(2).match(/.{1,8}/g).map(x => parseInt(x,2)).join('.')
    console.log(res)
}
toIp('4294967041')
// HJ101.输入整型数组和排序标识 slice sort join
// *HJ106.字符串逆序
// *HJ14.字符串排序 打乱重组排序
// HJ27.查找兄弟单词
--- // *NC37.合并区间  比尾巴和头比较
function merge(arr){
    let temp = arr[0]
    const res = []
    for(let i =1; i< arr.length;i++){
        const cur = arr[i]
        console.log(i, cur)
       
        if( temp[1]>= cur[0]){
            temp[1] =cur[1]
        } else{
            res.push(temp)
            temp = cur
        }
    }
    res.push(temp)
    console.log(res)

}
merge([[1,10],[10,20],[30,40]])

// *HJ68.成绩排序
// NC52.括号序列
// \*leetcode 1614.括号的最大嵌套深度
// leetcode 674.最长连续递增序列
--- // *HJ108.求最小公倍数
function getMinGB(a,b){
    function gcb(a,b){
        if(a%b===0) return b
        return gcb(b, a%b)
    }
    const res = a*b / gcb(a,b)
}
// 汽水瓶
//  HJ4 字符串分隔 每8个分隔，不足补零
// HJ6 质数因子
// HJ15 求int型正整数在内存中存储时1的个数
--- // HJ21 简单密码
function simplePass(str){
    const base = {
        2: "abc",
        3: "def",
        4: "ghi",
        5: "jkl",
        6: "mno",
        7: "pqrs",
        8: "tuv",
        9: "wxyz",
      };
    const str1 = str.replace(/[a-z]/g, x=>{
        for(let [k,v] of Object.entries(base)){
            if(v.includes(x)) return k
        }
    })
    const str2 = str1.replace(/[A-Z]/g, x =>{
        const res = x ==='Z'? 'a' : String.fromCharCode(x.toLowerCase().charCodeAt(0)+1)
        return res
    })
    console.log(str2)
}
simplePass('YUANzhi1987')
zvbo9441987
// HJ31 单词倒排
// HJ34 图片整理
// HJ37 统计每个月兔子的总数
// HJ40 统计字符
// HJ53 杨辉三角的变形
// HJ73 计算日期到天数转换
// HJ94 记票统计
// HJ100 等差数列
// HJ97 记负均正
// HJ96 表示数字
// HJ86 求最大连续bit数
// HJ84 统计大写字母个数