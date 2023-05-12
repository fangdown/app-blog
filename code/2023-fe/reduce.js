function myreduce(arr, callback, init) {
    let result = init ? init : arr[0]
    let i = init ? 1 : 0
    for (i; i < arr.length; i++) {
        result = callback(result, arr[i], arr)
    }
    return result
}