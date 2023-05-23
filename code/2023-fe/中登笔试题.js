// mycall函数
Function.prototype.Mycall = function (context, ...args) {
    context = context || global
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
}

function Add(a, b) {
    return a + b
}
const res = Add.Mycall(null, 1, 2)
console.log(res)


// 前端防抖
function debounce(fn, delay) {
    let timer
    return function () {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        const _self = this
        const args = [...arguments]
        timer = setTimeout(() => {
            fn.apply(_self, args)
            time = null
        }, delay);
    }
}


// 深度复制
function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) return obj
    const newObj = Array.isArray(obj) ? [] : {}
    for (k in obj) {
        if (obj.hasOwnProperty(k)) {
            newObj[k] = deepClone(obj[k])
        }
    }
    return newObj
}
const obj1 = { name: 'fang', cout: [1, 2, 3, 4] }
const obj2 = deepClone(obj1)
console.log(obj2);

// Partial  
type Partial<T> = {
    [P in keyof T]?: T[P]
}
//  ReturnType
type ReturnType<T> = T extends (...args: any[]) => infer P ? P : any

type Pick<T, U extends keyof T> = {
    [P in U]: T[P]
}
// compose
function KoaCompose(middlewares) {
    return (ctx) => {
        const dispatch = (i) => {
            if (i === middlewares.length) return
            const middleware = middlewares[i]
            return middleware(ctx, dispatch(i + 1))

        }
        dispatch(0)
    }
}

function compose(...funs) {
    let result
    const list = [...funs]
    return function f1(...args1) {
        while (list.length) {
            result = list.pop().apply(this, args1)
            return f1(result)
        }
        return result
    }
}
function Add(a, b) {
    return Number(a) + Number(b)
}
function Sqr(a) {
    return Number(a) * Number(a)
}
function mins(a) {
    return a = a - 1
}
const c1 = compose(mins, Sqr, Add)
console.log(c1(2, 3))