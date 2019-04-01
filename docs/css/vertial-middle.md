## 水平垂直居中
### 示例
```html
<div class="box box1">
  <span>垂直居中</span>
</div>
```
### table-cell
```html
.box1{
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
```
###  flex
```html
.box1{
  display: flex;
  justify-content:center;
  align-items:Center;
}
```
### absolute
```html
.box1{position:relative;}
.box1 span{
  position: absolute;
  width:100px;
  height: 50px;
  top:50%;
  left:50%;
  margin-left:-50px;
  margin-top:-25px;
  text-align: center;
}
```
### absolute+margin
```html
.box1{position:relative}
.box1 span{
  width: 50%; 
  height: 50%; 
  background: #000;
  overflow: auto; 
  margin: auto; 
  position: absolute; 
  top: 0; left: 0; bottom: 0; right: 0; 
}
```
### translate
```html
.box1{position:relative}
.box1 span{
  position: absolute;
  top:50%;
  left:50%;
  width:100%;
  transform:translate(-50%,-50%);
  text-align: center;
}
```
### flex+margin
```html
.box1{
    display: flex;
    text-align: center;
}
.box1 span{margin: auto;}
```