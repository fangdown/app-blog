// 快排
function kuaipai(arr) {
  if (arr.length < 2) return arr;
  const index = Math.floor(arr.length / 2);
  const mid = arr.splice(index, 1);
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < mid) left.push(arr[i]);
    if (arr[i] > mid) right.push(arr[i]);
  }
  return kuaipai(left).concat(mid, kuaipai(right));
}
console.log(kuaipai([12, 10, 5, 4]));
