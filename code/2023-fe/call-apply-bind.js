Function.prototype.myCall = (context, ...args) => {
    const context = context || window;
    context.fn = this;
    const res = context.fn(...args);
    delete context.fn;
    return res;
}
Function.prototype.myApply = (context, arr) => {
    const context = context || window;
    context.fn = this;
    const res = context.fn(...arr);
    delete context.fn;
    return res;
}
Function.prototype.myBind = (context,...args) => {
    const context = context || window;
    return  function (){
        const args2 = Array.prototype.slice.call(arguments);
        return this.call(context, ...args, ...args2)
    }
}