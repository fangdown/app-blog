const fs = require('fs')
fs.readFile(__dirname+'/1.txt', 'utf8', (err, data)=>{
  console.log('err', err)
  if(err) return
  console.log('data', data)
})