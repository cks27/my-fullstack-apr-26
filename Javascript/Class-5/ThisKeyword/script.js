

// Implicit binding

const person = {
    name: 'Max',
    age: 25,
    greet: function () {
        console.log(this.name);
    }
}

// person.greet();

// Default Binding

function fun() {
    console.log(this);
}

// fun(); //same as doing -> window.fun()


// Explicit Binding - call, bind and apply

function print(x, y) {
    const res = x + y;
    console.log(res);
    console.log(this);
}

// print();

const car = {
    name: 'BMW',
    price: 100
}

// print.call(car, 10, 20);

// ------------------------bind-----------------

const movie = {
    name: 'Superman',
    rating: 8,
    isWatched: false
}

// This is just a binding step
const f = print.bind(movie);

// 1000..lines of code

// f(30, 20);


// -------------------------Arrow Functions

// Normal function definition
function sum(x, y, z) {
    return x + y + z;
}

// function expression
const s = function (x, y, z) {
    return x + y + z;
}


// Arrow Function

const multiply1 = (x, y) => x * y; // Arrow function implicit return, same as below 

const multiply2 = (x, y) => {
    return x + y;
}


// Arrow function and this keyword binding

// 1. They do not have their own `this` keyword.
// 2. They inherit this keyword from it's lexical environment


// console.log(this); //window

const obj = {
    name: 'John',
    age: 25,
    sayName: ()=> {
        console.log(this);
    }
}

// obj.sayName();





const a = {
    greet: function () {

        // this -> a object
        const product = {
            title: 'Macbook',
            price: 200,
            speak: () => {
                console.log(this);
            }
        }

        product.speak();
    }
}

a.greet();



// // ------------Lexical Environment

// const name = 'Sarah';
// function printName(name) {
//     console.log(name);
// }

// function speak() {
//     const name = 'Max';
//     printName();
//     console.log(name);
// }

// speak();








