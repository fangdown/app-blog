// setTimeout(() => {
//   console.log('time1')
//   process.nextTick(()=>{
//     console.log("nextTick2");
// });
// }, 0);

// console.log('start')

// process.nextTick(()=>{
//   console.log('nextTick1')
//   setTimeout(() => {
//     console.log('time2')
//   }, 0);
// })


// setImmediate(()=>{
//   console.log('setImmediate')
// });
// setTimeout(()=>{
//   console.log('timeout')
// })

const fs = require('fs')
fs.readFile('./stream.txt','utf8',()=>{
  
  setTimeout(()=>{
      console.log('timeout')
  })
  setImmediate(()=>{
    console.log('setImmediate')
  });
})