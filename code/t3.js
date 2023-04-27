// 统一货物限载最小值
function getMinWeightLimit(weightLimitList) {
  return Math.min(...weightLimitList);
}

// 本题为考试单行多行输入输出规范示例，无需提交，不计分。
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  // Write your code here
  function getIndex(list) {
    const [s1, s2, k] = list;
    let res = -1;
    const str = s2.split(s1);
    if (str.length < 2) {
      return (res = -1);
    }
    const index = s2.indexOf(s1);
    if (index - k < 0) {
      return (res = -1);
    }

    const x = s2.substr(index - k, s1.length + k);
    if (s2.split(x).length < 2) {
      return (res = -1);
    }
    if (x.indexOf(s1) < 0) {
      return (res = -1);
    }
    res = s2.indexOf(x);
    return res;
  }

  const list = [];
  while ((line = await readline())) {
    list.push(line);
  }
  console.log(getIndex(list));
})();
