// ------------------------------------------------- Counter ---------------------
function counter(init) {
    //Here we are able to implement abstraction
    let count = init;

    function increment() {
        count++;
        return count;
    }

    function decrement() {
        count--;
        return count;
    }

    return {
        increment, decrement
    }
}

const c1 = counter(0);

// ------------------------------------------------- Example 2------------

function outer() {
    const arrFn = [];
    for (let i = 0; i <= 2; i++) {
        arrFn.push(function fn() {
            console.log(i);
        })
    }
    return arrFn;
}
const arrFn = outer();
// console.log(arrFn);
// arrFn[0]();
// arrFn[1]();
// arrFn[2]();

// ------------------------------------------------- Example 3-----------------

function createStack() {
    const stack = [];

    function push(item) {
        stack.push(item);
    }

    function pop() {
        return stack.pop();
    }

    function top() {
        if (stack.length === 0) {
            console.log('Stack is empty');
            return null;
        }
        return stack[stack.length - 1];
    }

    return {
        push,
        pop,
        top
    }
}


const stack1 = createStack();

// ------------------------------------------- Memoized functions --------------------

function memoize(fn) {
    const map = new Map();
    return function (n) {
        if (map.has(n)) {
            return map[n];
        } 

        const newValue = fn(n);
        map.set(n, newValue);
        return newValue;
    }
}


function calc(n) {
    let sum = 0;
    for (let i = 0; i < n; i++){
        sum += n;
    }
    return sum;
}

// closure {100000: <corresponding sum> }
const memoizedCalc = memoize(calc);

console.time('timer 1');
console.log(memoizedCalc(100000));
console.timeEnd('timer 1');

console.time('timer 2');
console.log(memoizedCalc(100000));
console.timeEnd('timer 2');

