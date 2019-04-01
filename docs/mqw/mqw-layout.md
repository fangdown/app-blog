## 页面布局
1. 题目像我们想的那么简单吗？
2. 这个题目技巧在哪里
3. 题目怎么延申，拔高

### 三栏布局
左右各200px，中间自适应，高度已知
1. float布局
2. 绝对布局
3. flex布局
4. table布局
5. grid布局

> 各种的优缺点
1. float布局
浮动布局是有局限性的，浮动元素是脱离文档流，要做清除浮动，这个处理不好的话，会带来很多问题，比如高度塌陷等。 
浮动布局的优点就是比较简单，兼容性也比较好。只要清除浮动做的好，是没有什么问题的。 

2. 绝对布局
绝对定位布局优点，很快捷，设置很方便，而且也不容易出问题，你可以很快的就能想出这种布局方式。 

3. flex布局
缺点就是，绝对定位是脱离文档流的，意味着下面的所有子元素也会脱离文档流，这就导致了这种方法的有效性和可使用性是比较差的。
4. table布局

表格布局在历史上遭到很多人的摒弃，说表格布局麻烦，操作比较繁琐，其实这是一种误解，在很多场景中，表格布局还是很适用的，比如这个三栏布局，用表格布局就轻易写出来了。还有表格布局的兼容性很好，在flex布局不兼容的时候，可以尝试表格布局。 
表格布局也是有缺陷的，当其中一个单元格高度超出的时候，两侧的单元格也是会跟着一起变高的，而有时候这种效果不是我们想要的。
5. grid布局
IE10+、Chrome、Opera和Webkit Nightly支持。

firefox不支持

> 兼容性
felxbox的缺点就是不能兼容IE8及以下浏览器。部分手机不支持
> 高度未知

### 总结

- 语义化掌握到位 h5标签
- 页面布局理解深刻
- CSS基础知识扎实
- 思维灵活且积极上进 grid
- 代码书写规范

```html
<!--float布局，脱离文档流，但是还占位-->
  <div class="layout float">
    <style>
      .float > div{
        height: 100px;
      }
      .float> .left{
        float: left;
        width: 200px;
        background-color: gray
      }
      .float > .right{
        float: right;
        width: 200px;
        background-color: green;
      }
      .float > .center{
        background-color: lightgray
      }
    </style>
    <div class="left"></div>
    <div class="right"></div>
    <div class="center">
      我是float布局
      我在中间部分
    </div>
  </div>
  <!--绝对定位布局-->
  <div class="layout absolute">
    <style>
      .absolute{
        position: relative;
        height: 100px;
      }
      .absolute > div{
        height: 100px;
      }
      .absolute > .left{
        position: absolute;
        left: 0;
        width: 200px;
        background-color: gray;
      }
      .absolute > .center{
        position: absolute;
        left: 200px;
        right: 200px;
        background-color: lightgray
      }
      .absolute > .right{
        position: absolute;
        right: 0;
        width: 200px;
        background-color: green;
      }
    </style>
    <div class="left"></div>
    <div class="center">
       我是absolute布局
       我在中间部分
    </div>
    <div class="right"></div>
  </div>
  <!--flex布局 center: flex=1 -->
  <div class="layout flex">
    <style>
      .flex{
        display: flex;
      }
      .flex > div{
        height: 100px;
      }
      .flex > .left{
        width: 200px;
        background-color: gray;
      }
      .flex > .center{
        flex: 1;
        background-color: lightgray;
      }
      .flex > .right{
        width: 200px;
        background-color: green;
      }
    </style>
    <div class="left"></div>
    <div class="center">
      我是flex布局
      我在中间部分
    </div>
    <div class="right"></div>
  </div>
  <!--table布局  设置100%-->
  <div class="layout table">
    <style>
      .table{
        display: table;
        width: 100%;
      }
      .table > div{
        height: 100px;
      }
      .table > .left{
        display: table-cell;
        width: 200px;
        background-color: gray;
      }
      .table > .center{
        display: table-cell;
        background-color: lightgray;
      }
      .table > .right{
        display: table-cell;
        width: 200px;
        background-color: green;
      }
    </style>
    <div class="left"></div>
    <div class="center">
      我是table布局
      我在中间部分
    </div>
    <div class="right"></div>
  </div>
  <!--grid布局-->
  <div class="layout grid">
    <style> 
      .grid{
        width: 100%;
        display: grid;
        grid-template-rows: 100px;
        grid-template-columns: 200px auto 200px;
      }
      .grid >.left{
         width: 200px;
        background-color: gray;
      }
      .grid >.center{
        background-color: lightgray;
      }
      .grid >.right{
        width: 200px;
        background-color: green;
      }
    </style>
    <div class="left"></div>
    <div class="center">
      我是grid布局
      我在中间部分
    </div>
    <div class="right"></div>
  </div>
```