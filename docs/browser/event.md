## 事件相关
### 监听事件
```js
/**
 * 监听事件
 * ele 监听元素
 * type 事件类型
 * handle 处理方法
 */
function addEvent(ele, type, handle){
  if(ele.addEventListener){
    ele.addEventListener(type, handle, false)
  } else if(ele.attchEvent){
    ele['temp'] = function(){
      handle.call(ele); // this指向dom，若不做处理指向window
    }
    ele.attchEvent('on'+type+, ele['temp']);
  } else{
    ele['on'+type] = handle;
  }
}
```

### 移除监听
```js
function removeEvent(ele, type, handle){
  if(ele.addEventListener){
    ele.removeEventListener(type, handle, false)
  } else if(ele.attchEvent){
    ele.detachEvent('on'+type+, handle);
  } else{
    ele['on'+type] = null;
  }
}
```
### 获取事件
```js
  var e = e || window.event
```
### 获取事件源
```js
  var e = e || window.event;
  var target = e.target || e.srcElement;
  var currentTarget = e.currentTarget;
```

### 阻止冒泡
```js
  e.stopPropagation() || e.cancelBubble = true
```

### 阻止默认行为
```js
  e.preventDefault() || e.returnValue = true
```
### 事件委托
```js
  var ul = document.getElementById('test');
  ul.onclick = function (e){
    var e = e || window.event;
    e.preventDefault() || e.returnValue = true;
    var target = e.target || e.srcElement;
    var currentTarget = e.currentTarget;
    console.log(target.innerText)
    console.log(currentTarget.innerText)
  }
  
  ```
### 禁止右键
```html
<body ondragstart="window.event.returnValue=false" oncontextmenu="window.event.returnValue=false" onselectstart="window.event.returnValue=false">
```
### 获取shift control alt按键
```js
  var keys = []
  document.addEventListener('keydown', function(e){
    var e = e || window.event
    console.log('e', e)
    keys = []
    if(e.shiftKey){
      keys.push('按了shift key')
    } else if(e.ctrlKey){
      keys.push('按了control key')
    } else if(e.altKey){
      keys.push('按了alt key')
    }
    console.log(keys)
  }, false)
```
### 获取滚轮方向
```js
var scrollDir = "down";
var scrollFunc = function (e) {
  e = e || window.event;
  if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件               
    if (e.wheelDelta > 0) { //当滑轮向上滚动时  
      scrollDir = "up";
    } else if (e.wheelDelta < 0) { //当滑轮向下滚动时  
      scrollDir = "down";
    }
  } else if (e.detail) {  //Firefox滑轮事件  
    if (e.detail > 0) { //当滑轮向上滚动时  
      scrollDir = "down";
    } else if (e.detail < 0) { //当滑轮向下滚动时  
      scrollDir = "up";
    }
  }
  console.log('scrollDir', scrollDir)
}
//给页面绑定滑轮滚动事件  
if (document.addEventListener) {//firefox  
  document.addEventListener('DOMMouseScroll', scrollFunc, false);
}
//滚动滑轮触发scrollFunc方法  //ie 谷歌  
window.onmousewheel = document.onmousewheel = scrollFunc;

```
### 简单图示
![图例](https://upload-images.jianshu.io/upload_images/12185313-7f48cbb2c54f72be.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/441)