const fs = require('fs')
const ws1 = fs.createWriteStream('stream.txt', 'utf-8')
ws1.write('使用流写数据开始')
ws1.write('使用流写数据结束')
ws1.end()

const ws2 = fs.createReadStream('stream.txt', 'utf-8')
ws2.on('data', function(chunk){
  console.log('chunk', chunk) // 依次读取
})
const ws3 = fs.createWriteStream('fs-name.txt', 'utf-8')
ws2.pipe(ws3); 
// ws2 原文件  ws3目标文件， 把ws2中的内容 写入到ws3中