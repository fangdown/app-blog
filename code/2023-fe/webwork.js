var worker = new Worker('worker.js');
self.onmessage = function(event) {
    var data = event.data;
    var result = doSomeWork(data);
    self.postMessage(result);
  }
  
  function doSomeWork(data) {
    // 执行一些耗时的操作
    return result;
  }

worker.postMessage(data);