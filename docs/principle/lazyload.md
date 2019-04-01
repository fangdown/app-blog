## 懒加载-预加载
### 懒加载
>思路： 先给页面图片默认背景图，然后设置属性data-original为真实图片地址，
找到所有懒加载的图片，判断其是否在可视区域里，  
如果是则显示真实地址，显示后删除data-original属性
给scoll添加监听事件，注意防抖
```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Lazyload</title>
    <style>
      .image-item {
	    display: block;
	    margin-bottom: 50px;
	    height: 200px;//一定记得设置图片高度
	}
    </style>
</head>
<body>
<img src="" class="image-item" lazyload="true"  data-original="images/1.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/2.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/3.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/4.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/5.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/6.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/7.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/8.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/9.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/10.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/11.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/12.png"/>
<script>
  function laztLoad(){
    var viewHeight = document.documentElement.clientHeight;
    var eles = document.querySelectorAll('img[data-original][lazyload]'); // 类数组
    Array.prototype.forEach.call(eles, function(item, index){
      var rect;
      if(item.data.original===''){
        return;
      }
      rect = item.getBoundingClientRect();
       // 用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
      if(rect.bottom > 0 && rect.top < viewHeight){
        function(){
          var img  = new Image();
          img.src = item.dataset.url;
          img.onload = function(){
            item.src = img.src;
          }
          item.removeAttribute('data-original');
          item.removeAttribute('lazyload');
        }()
      }
    });
  }
  lazyload();
  document.addListenerEvent('scroll', lazyload);
  // 没什么区别，window高于document，在捕获或者冒泡阶段先后不一样
  window.addListenerEvent('scroll', lazyload);
</script>
</body>
</html>
```
### 预加载
> 预加载简单来说就是将所有所需的资源提前请求加载到本地，这样后面在需要用到时就直接从缓存取资源。  

* 方法
1. 使用图片
```html
<img src="http://xxx.jpg" style="display:none"/>
<!-- -->
```
2. 使用meta和link
```html
<!-- 显示的控制是否dns域名预加载，有些没有 -->
<meta http-equiv="x-dns-prefetch-control" content="on">
<!-- 预加载节省dns查询时间，大约120ms -->
<link rel="dns-prefetch" href="http://www.xxx.com">
```
3. 使用XMLHttpRequest
4. 使用Preloadjs库
### 总结
>两者都是提高页面性能有效的办法，两者主要区别是一个是提前加载，一个是迟缓甚至不加载。  
懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力