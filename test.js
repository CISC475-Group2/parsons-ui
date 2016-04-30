function swap(a, b) {
    var swap = function (x){return x};
    b = swap(a, a=b);
}

var one = { id: 1 }
var two = { id: 2 }
swap(one, two)
console.log(one) // Should be { id: 2 }
console.log(two) // Should be { id: 1 }
