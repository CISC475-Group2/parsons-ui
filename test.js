var a = ['0', '1', '2']

var str = a.reduce((str, curr, index) => {
    console.log(index)
    return str + curr + '-'
}, '')

console.log(str)
