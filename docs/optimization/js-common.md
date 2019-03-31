## js优化总结

### 对多个条件使用 Array.includes
```js
// bad
function test(fruit) {
  if (fruit == 'apple' || fruit == 'strawberry') {
    console.log('red');
  }
}
// good
function test(fruit) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
  if (redFruits.includes(fruit)) {
    console.log('red');
  }
}

```
### 更少的嵌套，尽早返回
```js
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
 
  // condition 1: throw error early
  if (!fruit) throw new Error('No fruit!');
 
  // condition 2: must be red
  if (redFruits.includes(fruit)) {
    console.log('red');
 
    // condition 3: must be big quantity
    if (quantity &gt; 10) {
      console.log('big quantity');
    }
  }
}
// =========> good
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
 
  if (!fruit) throw new Error('No fruit!'); // condition 1: throw error early
  if (!redFruits.includes(fruit)) return; // condition 2: stop when fruit is not red
 
  console.log('red');
 
  // condition 3: must be big quantity
  if (quantity &gt; 10) {
    console.log('big quantity');
  }
}
```
### 使用默认的函数参数和解构
```js
function test(fruit, quantity) {
  if (!fruit) return;
  const q = quantity || 1;
  console.log(`We have ${q} ${fruit}!`);
}
test('banana'); // We have 1 banana!
test('apple', 2); // We have 2 apple!
// =========> good
function test(fruit, quantity = 1) {
  if (!fruit) return;
  console.log(`We have ${quantity} ${fruit}!`);
}
test('banana'); // We have 1 banana!
test('apple', 2); // We have 2 apple!
```
### 选择 Map 或对象字面量，而不是 Switch 语句
```js
function test(color) {
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}
test(null); // []
test('yellow'); // ['banana', 'pineapple']
// =========> good
const fruitColor = {
  red: ['apple', 'strawberry'],
  yellow: ['banana', 'pineapple'],
  purple: ['grape', 'plum']
};
 
function test(color) {
  return fruitColor[color] || [];
}
// or
const fruitColor = new Map()
.set('red', ['apple', 'strawberry'])
.set('yellow', ['banana', 'pineapple'])
.set('purple', ['grape', 'plum']);
 
function test(color) {
  return fruitColor.get(color) || [];
}
```
###避免全局变量
在一个函数中会用到全局对象存储为局部变量来减少全局查找，因为访问局部变量的速度要比访问全局变量的速度更快些。
```js
function search() {
  //当我要使用当前页面地址和主机域名
  alert(window.location.href + window.location.host);
}
//最好的方式是如下这样  先用一个简单变量保存起来
function search() {
  var location = window.location;
  ……
}
```

### 定时器
如果针对的是不断运行的代码，不应该使用setTimeout，而应该是用setInterval，因为setTimeout每一次都会初始化一个定时器，而setInterval只会在开始的时候初始化一个定时器。
```js
var timeoutTimes = 0;
function timeout() {
  timeoutTimes++;
  if (timeoutTimes < 10) {
    setTimeout(timeout, 10);
  }
}
timeout();
//可以替换为：
var intervalTimes = 0;
function interval() {
  intervalTimes++;
  if (intervalTimes >= 10) {
    clearInterval(interv);
  }
}
var interv = setInterval(interval, 10);
```
### 字符串连接
如果要连接多个字符串，应该少使用+=，如
```js
s+=a;
s+=b;
s+=c;
//应该写成
s+=a + b + c；

```
　而如果是收集字符串，比如多次对同一个字符串进行+=操作的话，最好使用一个缓存，使用JavaScript数组来收集，最后使用join方法连接起来
```js
var buf = [];
for (var i = 0; i < 100; i++) {
  buf.push(i.toString());
}
var all = buf.join("");
``
### 避免with
和函数类似 ，with语句会创建自己的作用域，因此会增加其中执行的代码的作用域链的长度，由于额外的作用域链的查找，在with语句中执行的代码肯定会比外面执行的代码要慢，在能不使用with语句的时候尽量不要使用with语句
```js
with (a.b.c.d) {
    property1 = 1;
    property2 = 2;
}
//可以替换为：
var obj = a.b.c.d;
obj.property1 = 1;
obj.property2 = 2;
```
### 数字转字符串
　一般最好用"" + 1来将数字转换成字符串，虽然看起来比较丑一点，但事实上这个效率是最高的，性能上来说：

　`　("" +) > String() > .toString() > new String()`

　　如果定义了toString()方法来进行类型转换的话，推荐显式调用toString()，因为内部的操作在尝试所有可能性之后，会尝试对象的toString()方法尝试能否转化为String，所以直接调用这个方法效率会更高
### 浮点转整型
很多人喜欢使用parseInt()，其实parseInt()是用于将字符串转换成数字，而不是浮点数和整型之间的转换，我们应该使用Math.floor()或者Math.round()
### 多个类型声明，使用单var
在JavaScript中所有变量都可以使用单个var语句来声明，这样就是组合在一起的语句，以减少整个脚本的执行时间，就如上面代码一样，上面代码格式也挺规范，让人一看就明了。
```js
 var a = 1;
 var b = 2;
 // 替换成
 var a = 1,
     b = 2;

```
### 插入迭代器
如var name=values[i]; i++;前面两条语句可以写成var name=values[i++]。（原理在于i++是先赋值，再自加）
### 使用直接量
```js
var aTest = new Array(); //替换为
var aTest = [];
var aTest = new Object; //替换为
var aTest = {};
var reg = new RegExp(); //替换为
var reg = /../;

//如果要创建具有一些特性的一般对象，也可以使用字面量，如下：
var oFruit = new O;
oFruit.color = "red";
oFruit.name = "apple";
//前面的代码可用对象字面量来改写成这样：
var oFruit = { color: "red", name: "apple" };
```
### 使用DocumentFragment优化多次append
```js
for (var i = 0; i < 1000; i++) {
  var el = document.createElement_x('p');
  el.innerHTML = i;
  document.body.appendChild(el);
}

//可以替换为：
var frag = document.createDocumentFragment();
for (var i = 0; i < 1000; i++) {
  var el = document.createElement_x('p');
  el.innerHTML = i;
  frag.appendChild(el);
}
document.body.appendChild(frag);
```
### 使用一次innerHTML赋值代替构建dom元素
对于大的DOM更改，使用innerHTML要比使用标准的DOM方法创建同样的DOM结构快得多。
```js
var frag = document.createDocumentFragment();
for (var i = 0; i < 1000; i++) {
  var el = document.createElement_x('p');
  el.innerHTML = i;
  frag.appendChild(el);
}
document.body.appendChild(frag);

//可以替换为：
var html = [];
for (var i = 0; i < 1000; i++) {
  html.push(' ' + i + ' '); 
}
document.body.innerHTML = html.join('');
```
### 使用firstChild和nextSibling代替childNodes遍历dom元素
很多人喜欢在JavaScript中使用document.write来给页面生成内容。事实上这样的效率较低，如果需要直接插入HTML，可以找一个容器元素，比如指定一个div或者span，并设置他们的innerHTML来将自己的HTML代码插入到页面中。通常我们可能会使用字符串直接写HTML来创建节点，其实这样做，1、无法保证代码的有效性；2、字符串操作效率低，所以应该是用document.createElement_x()方法，而如果文档中存在现成的样板节点，应该用cloneNode()方法，因为使用createElement_x()方法之后，你需要设置多次元素的属性，使用cloneNode()则可以减少属性的设置次数——同样如果需要创建很多元素，应该先准备一个样板节点。
```js
var frag = document.createDocumentFragment();
for (var i = 0; i < 1000; i++) {
   var el = document.createElement_x('p');
   el.innerHTML = i;
   frag.appendChild(el);
}
document.body.appendChild(frag);

//替换为：
var frag = document.createDocumentFragment();
var pEl = document.getElementsByTagName_r('p')[0];
for (var i = 0; i < 1000; i++) {
   var el = pEl.cloneNode(false);
   el.innerHTML = i;
   frag.appendChild(el);
}
document.body.appendChild(frag);
```
### 删除DOM节点
删除dom节点之前，一定要删除注册在该节点上的事件，不管是用observe方式还是用attachEvent方式注册的事件，否则将会产生无法回收的内存。另外，在removeChild和innerHTML=""二者之间，尽量选择后者。因为在sIEve(内存泄露监测工具)中监测的结果是用removeChild无法有效地释放dom节点。
### 使用事件代理
任何可以冒泡的事件都不仅仅可以在事件目标上进行处理，目标的任何祖先节点上也能处理，使用这个知识就可以将事件处理程序附加到更高的地方负责多个目标的事件处理，同样，对于内容动态增加并且子节点都需要相同的事件处理函数的情况，可以把事件注册提到父节点上，这样就不需要为每个子节点注册事件监听了。另外，现有的js库都采用observe方式来创建事件监听。其实现上隔离了dom对象和事件处理函数之间的循环引用，所以应该尽量采用这种方式来创建事件监听。
### 重复使用的调用结果，事先保存到局部变量
避免多次取值的调用开销
```js
//避免多次取值的调用开销
 var h1 = element1.clientHeight + num1;
 var h2 = element1.clientHeight + num2;

 //可以替换为：
 var eleHeight = element1.clientHeight;
 var h1 = eleHeight + num1;
 var h2 = eleHeight + num2;
```
### 注意NodeList
```js
var images = document.getElementsByTagName_r('img');
for (var i = 0, len = images.length; i < len; i++) {
}
```
最小化访问NodeList的次数可以极大的改进脚本的性能
编写JavaScript的时候一定要知道何时返回NodeList对象，这样可以最小化对它们的访问

 进行了对getElementsByTagName_r()的调用
 获取了元素的childNodes属性
 获取了元素的attributes属性
 访问了特殊的集合，如document.forms、document.images等等
　　要了解了当使用NodeList对象时，合理使用会极大的提升代码执行速度。

### 优化循环
可以使用下面几种方式来优化循环

1、减值迭代

　　大多数循环使用一个从0开始、增加到某个特定值的迭代器，在很多情况下，从最大值开始，在循环中不断减值的迭代器更加高效

2、简化终止条件

　　由于每次循环过程都会计算终止条件，所以必须保证它尽可能快，也就是说避免属性查找或者其它的操作，最好是将循环控制量保存到局部变量中，也就是说对数组或列表对象的遍历时，提前将length保存到局部变量中，避免在循环的每一步重复取值。
```js
var list = document.getElementsByTagName_r('p');
for (var i = 0; i < list.length; i++) {
   //……
}

//替换为：
var list = document.getElementsByTagName_r('p');
for (var i = 0, l = list.length; i < l; i++) {
   //……
}
```
3、简化循环体

　　循环体是执行最多的，所以要确保其被最大限度的优化

4、使用后测试循环

　　在JavaScript中，我们可以使用for(;;),while(),for(in)三种循环，事实上，这三种循环中for(in)的效率极差，因为他需要查询散列键，只要可以，就应该尽量少用。for(;;)和while循环，while循环的效率要优于for(;;)，可能是因为for(;;)结构的问题，需要经常跳转回去。
```js
var arr = [1, 2, 3, 4, 5, 6, 7];
var sum = 0;
for (var i = 0, l = arr.length; i < l; i++) {
   sum += arr[i];
}
//可以考虑替换为：
var arr = [1, 2, 3, 4, 5, 6, 7];
var sum = 0, l = arr.length;
while (l--) {
    sum += arr[l];
}
```
最常用的for循环和while循环都是前测试循环，而如do-while这种后测试循环，可以避免最初终止条件的计算，因此运行更快。
### 展开循环
当循环次数是确定的，消除循环并使用多次函数调用往往会更快。

　　避免双重解释：如果要提高代码性能，尽可能避免出现需要按照JavaScript解释的字符串，也就是

1、尽量少使用eval函数：使用eval相当于在运行时再次调用解释引擎对内容进行运行，需要消耗大量时间，而且使用Eval带来的安全性问题也是不容忽视的。

2、不要使用Function构造器

3、不要给setTimeout或者setInterval传递字符串参数
```js
var num = 0;
setTimeout('num++', 10);

//可以替换为：
var num = 0;
function addNum() {
  num++;
}
setTimeout(addNum, 10);
```
### 条件分支
将条件分支，按可能性顺序从高到低排列：可以减少解释器对条件的探测次数

在同一条件子的多（>2）条件分支时，使用switch优于if：switch分支选择的效率高于if，在IE下尤为明显。4分支的测试，IE下switch的执行时间约为if的一半。

使用三目运算符替代条件分支
```js
if (a > b) {
     num = a;
} else {
     num = b;
}

//可以替换为：
num = a > b ? a : b;
```