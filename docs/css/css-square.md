## css实现正方形
### css3vm单位
>CSS3 中新增了一组相对于可视区域百分比的长度单位vw、vh、vmin、vmax。其中vw是相对于视口宽度百分比的单位，1vw = 1% viewport width，vh是相对于视口高度百分比的单位，1vh = 1% viewport height；vmin是相对当前视口宽高中较小的一个的百分比单位，同理 vmax是相对当前视口宽高中较大的一个的百分比单位
```html
  #square{
    width: 30%;
    height: 30vw;
    background-color: red;
  }
  <div id="square">内容</div>
```

### 设置垂直方向的padding撑开容器
> 由于margin/padding的百分比数值相对于父元素计算的，所以将垂直方向的一个padding设置为于宽度相同大小的百分比就可以制作出自适应正方形了;
> 内容要占据高度，所以把内容高度设置为0
```html
  #square{
    width: 30%;
    height:0;
    padding-bottom: 30%;
    background-color: red;
    overflow:hidden;
  }
<div id="square">内容</div>
```
### 设置伪类
>用一个子元素撑开content部分的高度，从而使max-height属性生效。首先需要设置伪元素，其内容为空，margin-top设置为100%。  
但要注意，若使用垂直方向上的margin撑开父元素，仅仅设置伪元素是不够的，这涉及到margin collapse外边距合并的概念，由于容器与伪元素在垂直方向发生了外边距合并，所以撑开父元素高度并没有出现，解决方法是在父元素上触发BFC：设置overflow:hidden。




```html
  #square{
    width: 30%;
  }
  #square:after{
    content: '';
    display: block;
    margin-top: 100%;
  }
```

### 延伸 BFC是什么，怎么样才是BFC
>BFC是一个独立的布局环境，其中的元素布局是不受外界的影响，并且在一个BFC中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直的沿着其父元素的边框排列。
- 怎么创建BFC
1. float的值不是none
2. position的值不是static或者relative
3. display的值是inline-block、tabel-cell、flex
4. overflow的值不是visible

[参考](https://www.cnblogs.com/libin-1/p/7098468.html)