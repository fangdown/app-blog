## 移动端JS判断手势方向
1. 监听touch事件，获取坐标点
2. 根据两次的坐标点，获取方向
3. 根据移动距离计算角度

```js
var startX, startY;
document.addEventLisener('touchstart', function(e){
  startX = e.touches[0].pageX;
  startY = e.touches[0].pageY;
}, false);
document.addEventLisener('touchend', function(e){
  var endX, endY;
  endX = e.changedTouches[0].pageX;
  endY = e.changedTouches[0].pageY;
  var direction = getSlideDirection(startX, startY, endX, endY);
  switch (direction) {
    case 0: 
      console.log('没动');
      break;
    case 1: 
      console.log('向上')
      break;
    case 2: 
      console.log('向下')
      break;
    case 3: 
      console.log('向左')
      break;
    case 4: 
      console.log('向右')
      break;
    default:
      break;
  }
})
// 计算方向结果
function getSlideDirection (startX, startY, endX, endY){
  var dx = endX - startX;
  var dy = endY - startY;
  var result = 0;
  if(Math.abs(dx) < 2 && Math.abs(dy) < 2){
    return result;
  }
  var angle = getSlideAngle(dx, dy)
  if (angle >= -45 && angle < 45) {
    result = 4
  } else if (angle >= 45 && angle < 135){
    result = 1
  } else if ((angle > 135 && angle <= 180 ) ||  (angle < -135 && angle >= -180 )){
    result = 3
  } else if (angle >= -135 && angle < -45) {
    result = 2;
  }
}
// 计算角度
function getSlideAngle (dx, dy){
  return Math.atan2(dy, dx)* 180 / Math.PI; // dx,dy 相反
}
```