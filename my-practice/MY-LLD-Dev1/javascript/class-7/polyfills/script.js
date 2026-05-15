// polyfills for map, filter and reduce
Array.prototype.myMap = function(callback) {
    let result = [];

    for(let i=0; i<this.length; i++) {
        result.push(callback(this[i], i, this));
    }

    return result;
}

const arr = [1,2,3];
console.log(arr.myMap(num => num + 2)); // 3,4,5

// Filter polyfill
Array.prototype.myFilter = function(callback) {
    let result = [];

    for(let i=0; i< this.length; i++) {
       if(callback(this[i], i, this)) {
            result.push(this[i]);
       }
    }

    return result;
}

const arr1 = [1,2,3,4];
console.log(arr1.myFilter(num => num % 2)); // 2, 4


Array.prototype.myReduce = function(callback, acc) {
    let accumulator = acc;
    let startIdx = 0;

    if (typeof accumulator === 'undefined') {
        accumulator = this[0];
        startIdx = 1;
    }

    for(let i=startIdx; i<this.length; i++) {
       accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
}
// Reduce polyfill
const arr2 = [1,2,3,4];
console.log(arr2.myReduce((acc, curr) => acc + curr, 0)); // 10
// call polyfill



// apply polyfill


// bind polyfill