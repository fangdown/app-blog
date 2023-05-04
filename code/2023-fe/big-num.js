/**
 * 两个大数相加
 * 0补位
 * 分割成反转数组
 * 循环数组相加
 *  */

function add(astr, bstr) {
  let a = astr + "";
  let b = bstr + "";
  const absLen = Math.abs(a.length - b.length);
  if (a.length > b.length) {
    b = Array(absLen).fill(0).join("") + b;
  } else if (a.length < b.length) {
    a = Array(absLen).fill(0).join("") + a;
  }
  const arr1 = a.split("").reverse();
  const arr2 = b.split("").reverse();
  const result = [];
  let carry = 0;
  for (let i = 0; i < arr1.length; i++) {
    const sum = parseInt(arr1[i]) + parseInt(arr2[i]) + carry;
    result.push(sum % 10);
    if (sum > 9) carry = 1;
    else {
      carry = 0;
    }
  }
  if (carry === 1) {
    result[arr1.length + 1] = 1;
  }
  console.log(result.reverse().join(""));
}
add(100, 200900);
