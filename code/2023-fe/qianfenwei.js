// 千分位

function qianfenwei(num) {
  const arr = String(num).split("").reverse();
  const arr2 = [];
  for (let i = 0; i < arr.length; i++) {
    arr2.push(arr[i]);
    if ((i + 1) % 3 === 0 && i !== 0 && i !== arr.length - 1) {
      arr2.push(",");
    }
  }
  console.log(arr2.reverse().join(""));
}
function qianfenwei2(str) {
  const reg = /(\d)(?=(?:\d{3})+$)/g;
  const res = str.toString().replace(reg, "$1,");
  console.log(res);
}
qianfenwei2(1000002023);
qianfenwei(1000002023);
