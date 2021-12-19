let cp = require("child_process");
cp.exec("echo hello world", function(err, stdout) {
  // console.log(stdout); // hello world
});
// let cp = require("child_process");
cp.execFile("echo", ["hello", "world"], function(err, stdout) {
  // console.log(stdout);  // hello world
});

let cat=cp.spawn('cat',['1.txt']);
let sort = cp.spawn('sort')
cat.stdout.pipe(sort.stdin)
sort.stdout.pipe(process.stdout)
// console.log('out',process.stdout)
// console.log('cat', cat);

// var spawnObj = cp.spawn('ping', ['127.0.0.1'], {encoding: 'utf-8'});
// spawnObj.stdout.on('data', function(chunk) {
//     console.log(chunk.toString());
// });

let child = cp.fork(__dirname+'/child.js')
child.on('message', function(msg){
  console.log('收到了子进程消息:', msg)
  child.disconnect()
})
child.send('hello world');