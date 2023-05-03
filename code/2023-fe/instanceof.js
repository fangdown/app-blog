function myIntanceof(left, right) {
    let L = left.__proto__;
    const R = right.prototype
    while (true) {
        if (L === null) return false
        if (L === R) return true
        L = L.__proto__
    }
}
function fn() {

}
console.log(myIntanceof(fn, Object))