
// Default params---------------
function sum(x, y, z=5) { //default params should be at the end of the parameter list
    return x + y + z;
}

sum(3, 4);

// --------------------- Spread Operator-------------

const arr = [10, 20, 30];

const nums = [1, 2, 3, ...arr];

const obj1 = {
    a: 10,
    b:20
}

const obj2 = {
    l: true,
    m: 'Some string',
    ...obj1
}

// ----------------------------Rest Params

function sumOfNums(x, y, z, ...args) {
    let sum = 0;
    for (let num of args) {
        sum += num;
    }
    return x + y + z+sum;
}

console.log(sumOfNums(1, 2, 3, 3, 1, 2));



