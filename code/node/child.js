process.on('message', function(msg){
  console.log('收到父进程消息, 处理中',msg)
  process.send('处理完成， 我来自child')
})