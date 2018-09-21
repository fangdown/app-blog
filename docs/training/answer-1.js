Function.prototype.myCall = function(context){
  var context = context || window
  context.fn = this
  var args = [...arguments].slice(1)
  console.log('args', args)
  var result = context.fn(...args)
  delete context.fn
  return result
}

window.color = 'red';
document.color = 'yellow';

var s1 = {color: 'blue' };
function changeColor(param){
  console.log(this.color);
  console.log('param',param);
}
changeColor.myCall() // red
changeColor.myCall(document, 'param') // yellow

Function.prototype.myApply = function(context, arr){
  var context = context || window
  context.fn = this
  var result;
  if(Array.isArray(arr)){
    result = context.fn(...arr)
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}

Math.max.myApply(null, [1, 20, 10])
Math.max.myCall(null, 1, 20, 10)