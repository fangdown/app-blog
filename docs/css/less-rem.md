## rem布局方式
### less预处理
```
//375屏幕为 20px，以此为基础计算出每一种宽度的字体大小
//375以下不变，375以上等比放大

@baseWidth: 375px;
@baseFont: 100px;

html {
  font-size: @baseFont;  //默认当做320px宽度的屏幕来处理
}

@bps: 400px, 414px, 480px; 
.loop(@i: 1) when (@i <= length(@bps)) {  //注意less数组是从1开始的
  @bp: extract(@bps, @i);
  @font: @bp/@baseWidth*@baseFont;  
  @media only screen and (min-width: @bp){
    html {
      font-size: @font !important;
    }
  }
  .loop((@i + 1));
};
.loop;

```
以上作为一个rem.less文件，在公共css中引入即可

### js设置
```js
  const baseWidth = 375;
  const htmlFontSize= (document.docmentElement.clientWidth/baseWidth * 100);
  document.getElementsByTagName('html')[0].style.fontSize=htmlFontSize+'px'
  document.getElementByTagName('body')[0].style.fontSize="12px;"
```