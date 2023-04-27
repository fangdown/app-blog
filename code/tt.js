/**
 *  最左侧冗余字符数
 * 给定2个字符串s1和s2,和正整数k, 其中s1长度为n1,s2长度为n2,在s2中选一个子串，满足：
  - 该子串长度为n1+k,
  - 该子串包含s1的全部字母
  - 该子串每个字母的出现次数不小于s1中该字母
   给定s1,s2,k, 求最左侧的s2以长度k冗余覆盖s1的子串的首个元素的下标，如果没有返回-1
 */

function getIndex(list) {
  const [s1, s2, k] = list;
  const str = s2.split(s1);
  let res = -1;
  if (str.length === 1) {
    return (res = -1);
  }
  const index = s2.indexOf(s1);
  // 前面没有k个字符
  if (index - k >= 0) {
    const x = s2.substr(index - k, s1.length + k);
    if (s2.split(x).length === 1) {
      return (res = -1);
    }
    res = s2.indexOf(x);
  } else {
    const x = s2.substr(index, k + s1.length);
    if (s2.split(x).length === 1) {
      return (res = -1);
    }
    res = s2.indexOf(x);
  }

  return res;
}

const res1 = getIndex(["ab", "aabcd", 1]);
console.log(res1);
const res2 = getIndex(["abc", "dfs", 0]);
console.log(res2);

const res3 = getIndex(["ab", "abcd", 12]);
console.log(res3);

for (let i = 0; i < k; k++) {}
function foo(list) {
  const [s1, s2, k] = list;
  const index = s2.indexOf(s1);
  let str1 = s2.substr(index - k, s1.length + k);
  let str2 = s2.substr(index, s1.length + k);

  if (s2.split(str1).length > 1) {
    console.log(s2.indexOf(str1));
  } else if (s2.split(str2).length > 1) {
    console.log(s2.indexOf(str2));
  } else {
    console.log(-1);
  }
}
const res4 = foo(["ab", "aabcd", 1]);
console.log(res4);
