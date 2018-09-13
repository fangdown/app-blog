## canvas

### 常用api
- canvas.getContext("2d") 获取上下文
- fillRect(x, y, width, height) 实心矩形
- strokeRect(x, y, width, height) 空心矩形
- fillText('hello world', 200, 200) 实心文字
- strokeText('hello word', 200, 200) 空心文字

### 精简实例 绘制矩形
```html
<canvas id="tutorial"></canvas>
```
```js
function draw(){
  var canvas = document.getElementById('tutorial');
  if(!canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgb(200,0,0)";
  //绘制矩形
  ctx.fillRect (10, 10, 55, 50);

  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  ctx.fillRect (30, 30, 55, 50);
}
draw();
```