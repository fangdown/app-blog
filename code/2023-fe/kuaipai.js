function kuaipai(arr) {
  if (arr.length < 2) return arr;
  let index = Math.floor(arr.length / 2);
  let mid = arr.splice(index, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < mid) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return kuaipai(left).concat(mid, kuaipai(right));
}

const arr = [1, 11, 3, 9, 5, 6, 4];
const result = kuaipai(arr);
console.log(result);
