const { log } = require("console");

function addNum(list) {
  list.forEach((item) => {
    const [x, y] = item.split(" ");
    console.log(parseInt(x) + parseInt(y));
  });
}

addNum(["1 5", "2 8"]);

// 本题为考试单行多行输入输出规范示例，无需提交，不计分。
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  // Write your code here
  function addNum(list) {
    list.forEach((item) => {
      const [x, y] = item.split(" ");
      console.log(parseInt(x) + parseInt(y));
    });
  }
  const list = [];
  while ((line = await readline())) {
    list.push(line);
  }
  addNum(list);
})();
// 最左侧冗余字符数,给定2个字符串s1和s2,和正整数k, s1长度为n1,s2长度为n2,在s2中选一个子串，满足
// 该子串长度为n1+k,该子串包含s1的全部字母
// 该子串每个字母的出现次数不小于s1中该字母的出现次数
// 给定s1,s2,k, 求最左侧的s2以长度k冗余覆盖s1的子串的首个元素下标，如果没有返回-1

function getIndx2(s1, s2, k) {
  const s1Arr = s1.split("");
  const s2Arr = s2.split("");
  let count = 0;
  for (let i = 0; i < s2Arr.length; i++) {
    console.log("s2Arr[i]", s2Arr[i]);
    console.log("s1Arr[0]", s1Arr[0]);
    if (s2Arr[i] === s1Arr[0]) {
      count++;
    }
  }
  if (count >= k) {
    return 0;
  } else {
    return -1;
  }
}
console.log(getIndx2("ab", "1aabcd", 1));
function left(list) {
  // const [n1, n2, k] = list;
  // const str = n2.split(n1);
  // if (!str.length) return -1;
  // const str2 = str[0].split("");
  // let count = 0;
  // for (let i = 0; i < str2.length; i++) {
  //   if (str2[i] === "0") {
  //     count++;
  //   } else {
  //     break;
  //   }
  // }
  // if (count >= k) {
  //   return count;
  // } else {
  //   return -1;
  // }
}
function getIndex(list) {
  const [s1, s2, k] = list;
  const str = s2.split(s1);
  let res = -1;
  if (str.length === 1) {
    return (res = -1);
  }
  const index = s2.indexOf(s1);
  if (index - k < 0) {
    return (res = -1);
  }

  const x = s2.substr(index - k, s1.length + k);
  if (s2.split(x).length === 1) {
    return (res = -1);
  }
  res = s2.indexOf(x);
  console.log(res);
}
console.log(getIndex(["ab", "aabcd", 1]));
// 最左侧的s2以长度k冗余覆盖s1的子串首个元素的下标
function getSub(s1, s2, k) {}

// 本题为考试单行多行输入输出规范示例，无需提交，不计分。
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  // Write your code here
  function getNum(list) {
    const [content, word] = list;
    const wordLen = word.split("").length;
    let count = 0;
    for (let i = 0; i < content.length; i++) {
      let s1 = content.substr(i, wordLen);
      if ([...s1].sort().join("") === [...word].sort().join("")) {
        count++;
      }
    }
    console.log(count);
  }
  // getNum(["abab", "ab"]);
  // getNum(["qweebaewqd", "qwe"]);
  const list = [];
  while ((line = await readline())) {
    list.push(line);
  }
  getNum(list);
})();
