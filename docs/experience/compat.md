## 兼容性汇总
分CSS兼容性和JS兼容性


### 当在a标签中嵌套img标签时，在某些浏览器中img会有蓝色边框
给img添加border：0；或者是border：none；

### 图片默认有间隙
- 给img标签添加左浮动float：left；
- 给img标签添加display：block；

### 上下margin的重叠问题
给上边元素设置了margin-bottom，给下边元素设置了margin-top，浏览器只会识别较大值；
解决方法：margin-top和margin-bottom中选择一个，只设置其中一个值；

### 安卓浏览器看背景图片，有些设备会模糊。
devicePixelRatio手机分辨率的问题，一般使用2x的图片替代
```css
background:url(../images/icon/all.png) no-repeat center center;
-webkit-background-size:50px 50px;
background-size: 50px 50px;display:inline-block; width:100%; height:50px;
```

### 防止手机中网页放大和缩小。
```html
<meta name="viewport" content="width=device-width;initical-scale=1.0;maximum-scale=1.0;minimum-sacle=1.0;user-scale=no">
```
### 上下拉动滚动条时卡顿、慢
```css
body{
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
```

### Retina屏的1px边框
```css
ele{
  border-width: thin;
}
```
### 某些Android手机圆角失效
```css
background-clip: padding-box;
```

### 移动端 HTML5 input date 不支持 placeholder 问题
这个我感觉没有什么好的解决方案，用如下方法
```html
<input placeholder="Date" class="textbox-n" type="text" onfocus="(this.type='date')"  id="date">
```

### 多张图片一行滚动，flex布局，华为手机失效
- 原因： 华为努比亚手机不支持超出屏幕外的元素
- 解决方法： 使用position：relative,absolute,float
```css
  .wrapper{
    position: relative;
    overflow-x:auto;
    overflow-y:hidden;
    .container{
      position:absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      height: 200px
      width:100%;
    }
  }

````
### 滚动条
document.documentElement.scrollTop || document.body.scrollTop（IE）

### 获取样式兼容
```js
function getStyle(dom, styleName){

  return dom.currentStyle?

  dom.currentStyle[styleName] // ie

  getComputedStyle(dom)[styleName];

}
```
### 事件类
```js
evt = evt || window.event // 获取事件
evt.stopPropagation ? evt.stopPropagation : evt.cancelBubble = true // 阻止冒泡
evt.preventDefault ? evt.preventDefault: evt.returnValue = false // 阻止默认事件
evt.target ? e.target : e.srcElement // 目标元素
evt.addEventListener ? dom.addEventListener('click', fn)  : dom.attactEvent('onclick', fn)
```

### getBoundingClientRect获取元素位置
  IE坐标是从默认坐标从(2,2)开始计算，左边和上面有2px距离，右侧和下侧无
  chrome 默认坐标是（0,0）
  ```js
  var ele = document.getElementById('id');
  var obj = ele.getBoundingClientRect();
  // obj = {"x":510,"y":8,"width":740,"height":111.390625,"top":8,"right":1250,"bottom":119.390625,"left":510}
  document.documentElement.clientLeft = 2; //ie
  document.documentElement.clientTop = 2; //ie
  ```
### H5 data-* 属性
  支持情况
  1. Internet Explorer 11+
  2. Chrome 8+
```html
  <div id="box" data-name="boxname">
  <script>
    var box = document.getElementById('box');
    var name = box.dataset.name
  </script>
```

### new Date 问题
  - 原因：
    在项目中，对时间进行排序，sort方法，在chrome下是正常的， 在ie11中不正常，找原因。   
  - 解决方法
    ie11 对new Date的时候 ，字符串中YYYY-MM-DD 会返回NAN，应该要用YYYY/MM/DD.
    <strong>是不是觉得很坑啊</strong>
  
  ```js
  var quickSort(arr, startDate, endDate){
    if(arr.length <=1) return arr;
    arr.sort((a, b) => {
      if(a[startDate] === b[startDate]){
        return new Date(b[endDate].replace(/-/g, '/')) - new Date(a[endDate].replace(/-/g, '/'))
         //IE11会出错，返回NAN
        return new Date(b[endDate]) - new Date(a[endDate])         
      } else {
        return new Date(b[startDate].replace(/-/g, '/')) - new Date(a[startDate].replace(/-/g, '/'))
      }
    })
  }

  ```
  
### document.body document.documentElement
区别： 
- 页面具有 DTD，或者说指定了 DOCTYPE 时，使用 document.documentElement。
- 页面不具有 DTD，或者说没有指定了 DOCTYPE，时，使用 document.body。

移动端：
定义了DTD， 仍让是document.body生效，奇怪


