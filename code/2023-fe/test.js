// bfs 
function bfs(node) {
    const stack = [node]
    const res = []
    while (stack.length) {
        res.push(stack.shift())
        if (node.children) {
            stack.push(...node.children)
        }
    }
    return res
}

function dfs(node) {
    const stack = [node]
    const arr = []
    while (stack.length) {
        arr.push(stack.shift())
        if (node.children) {
            stack.unshift(...node.children)
        }
    }
}


// deepClone
function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) return obj
    const newObj = Array.isArray(obj) ? [] : {}
    Object.keys(obj).forEach(x => {
        newObj[x] = deepClone(obj[x])
    })
    return newObj
}

const o1 = [{ a: 1, b: [1, 2, 3] }]
const o2 = deepClone(o1)
console.log(o2)


function deepEqual(obj1, obj2) {
    if (typeof obj1 === 'object' && typeof obj2 === 'object') {
        const keys1 = Object.keys(obj1)
        const keys2 = Object.keys(obj2)
        if (keys1.length !== keys2.length) return false
        for (key in obj1) {
            if (!deepEqual(obj1[key], obj2[key])) return false
        }
        return true
    }
    return obj1 === obj2
}
const obj1 = { a: 1 }
const obj2 = { a: 1 }
console.log(obj1 === obj2)
console.log(deepEqual(obj1, obj2))

[1, 2, 3, 4].forEach(x => {
    console.log(x)
    if (x === 2) return false
})

for (x in [1, 2, 3, 4]) {
    console.log(x)
    if (x === 2) return false
}