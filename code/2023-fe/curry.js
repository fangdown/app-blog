function curry() {
    var fn = arguments[0]
    var args = [...arguments].slice(1)
    if (args.length === fn.length) {
        return fn.apply(this, args)
    }
    function _curry() {
        args.push(...arguments)
        if (args.length === fn.length) {
            return fn.apply(this, args)
        }
        return _curry
    }

    return _curry
}

// 测试 1
function add(a, b, c) {
    return a + b + c;
}
console.log(curry(add, 1)(3, 4))
