
const person = {
    name: 'Max',
    age: 25
}

function fun(x, y) {
    console.log(x + y);
    console.log(this);
}

// fun.call(person, 10, 20);

Function.prototype.myCall = function (customObj, ...args) {
    // `this` keyword will point to a caller object of this method, which in this case is a function
    // on which `myCall` is called.

    // console.log(this);
    customObj.__fn__ = this;
    /*
        person = {
            name: 'Max',
            age: 25,
            __fn__: fun
        }
    */
    const res = customObj.__fn__(...args);
    delete customObj.__fn__;
    return res;
}

// fun.myCall(person, 10, 20);

const obj = {
    a: 10,
    b: 20
}

function sum(x, y, z) {
    console.log(x + y + z);
    console.log(this);
}


const f = sum.bind(obj);

// f(2, 3, 4);

Function.prototype.myBind = function (customObj) {
    customObj.__fn__ = this;
    return function (...args) {
        const res = customObj.__fn__(...args);
        delete customObj.__fn__;
        return res;
    }
}

const f1 = sum.myBind(obj);
f1(1, 2, 3);

// --------------------------

console.log(Object.keys(obj));
console.log(Object.values(obj));
console.log(Object.entries(obj));


