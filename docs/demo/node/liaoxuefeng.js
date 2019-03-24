if (typeof window === 'undefined'){
  console.log('nodejs')
} else {
  console.log('browser')
}
// 同步任务是一个队列，执行完毕后再执行下一个队列
process.nextTick(function(){
  console.log('nextTick callback')
  setTimeout(function() {
    console.log('i am nextTick  setTimeout')
  }, 0);
})
setTimeout(function() {
  console.log('i am setTimeout')
}, 0);
process.on('exit', function(){
  console.log('i will exit')
})
console.log('hello')