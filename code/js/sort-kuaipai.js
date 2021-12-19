function kuaipai(arr) {
  const sort = (arr) => {
    if (arr.length < 2) return arr;
    const left = [];
    const right = [];
    const mid = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < mid) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return [...sort(left), mid, ...sort(right)];
  };
  return sort(arr);
}

const arr = [1, 19, 2, 5, 99, 23];
const res = kuaipai(arr);
console.log(res); //[ 1, 2, 5, 19, 23, 99 ]
