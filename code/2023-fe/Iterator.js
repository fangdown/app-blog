function MyIterator(arr) {
  let nextIndex = 0;
  return {
    next: function () {
      return nextIndex < arr.length
        ? { value: arr[nextIndex++], done: false }
        : { value: undefined, done: true };
    },
  };
}

const p1 = MyIterator([1, 2, 3, 4]);
const r1 = p1.next();
console.log(r1); //{ value: 1, done: false }
p1.next();
p1.next();
p1.next();
p1.next();
