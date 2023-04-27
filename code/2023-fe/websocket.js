/**
 * 客户端
 */

// 创建WebSocket对象
var socket = new WebSocket('ws://localhost:8080');

// 连接成功时触发
socket.onopen = function() {
  console.log('WebSocket连接成功');
  
  // 向服务器发送消息
  socket.send('Hello, WebSocket!');
};

// 收到服务器消息时触发
socket.onmessage = function(event) {
  console.log('收到服务器消息：' + event.data);
};

// 连接关闭时触发
socket.onclose = function() {
  console.log('WebSocket连接关闭');
};

// 连接出错时触发
socket.onerror = function() {
  console.log('WebSocket连接出错');
};

/**
 * 服务端
 * 
 */
// 引入WebSocket库
const WebSocket = require('ws');

// 创建WebSocket服务器
const server = new WebSocket.Server({ port: 8080 });

// 监听客户端连接事件
server.on('connection', (socket) => {
  console.log('客户端已连接');

  // 向客户端发送消息
  socket.send('Hello, WebSocket!');

  // 监听客户端消息事件
  socket.on('message', (message) => {
    console.log('收到客户端消息：' + message);
  });

  // 监听客户端关闭事件
  socket.on('close', () => {
    console.log('客户端已关闭');
  });
});