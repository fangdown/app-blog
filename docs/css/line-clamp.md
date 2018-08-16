## 单行 多行溢出...
### 单行
单行比较简单，兼容性好
```css
  .overflowStyle {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow:hidden;
    /* 要有宽度限制 */
    width: 100px;  
  }
```
### 多行
多行复杂一点，根据兼容性可分为几种
1. WebKit浏览器或移动端的页面
```css
  .overflowStyle{
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkt-box-orient: vertical;
    overflow:hidden;
    text-overflow: ellipsis;
  }
```
2. 跨浏览器兼容的方案
```css
  .p{
    position: relative;
    width: 100px;
    height: 4.2em;
    line-height: 1.4em;
    overflow: hidden;
  }
  .p:after{
    position:absolute;
    right:0;
    bottom: 0;
    padding: 0 20px 1px 40px;
    content: '...';
    background:url(http://css88.b0.upaiyun.com/css88/2014/09/ellipsis_bg.png) repeat-y;
  }
```
> 注意： 行高和高度的关系，3倍，尤其注意行高  
> 伪类中用半透明元素遮住原文字


3. 使用成熟框架
- Clamp.js
```js
  var module = document.getElementById("clamp-this-module");
  $clamp(module, {clamp: 3});

```