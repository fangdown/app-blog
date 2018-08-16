## IE兼容性汇总
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
  ### 多张图片一行滚动，flex布局，华为手机失效
  - 原因： 华为努比亚手机不支持超出屏幕外的元素
  - 解决方法： 使用position：relative,absolute,float
  ```html
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