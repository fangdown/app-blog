function search(arr, target) {
  if (arr.length < 1) return -1;
  let lowIndex = 0;
  let highIndex = arr.length - 1;
  while (lowIndex <= highIndex) {
    const middleIndex = Math.floor((lowIndex + highIndex) / 2);
    if (target < arr[middleIndex]) {
      highIndex = middleIndex - 1;
    } else if (target > arr[middleIndex]) {
      lowIndex = middleIndex + 1;
    } else {
      return middleIndex;
    }
  }
  console.log(lowIndex, highIndex);
  return -1;
}

const arr = [1, 5, 10, 39, 99, 123];
const res = search(arr, 99);
console.log(res); // 4
