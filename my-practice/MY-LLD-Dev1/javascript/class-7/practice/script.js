console.log('============================== Question 1 ============================');
/*
People often think:

    "Since the method belongs to rabbit, this should be rabbit"

That is wrong.

    JavaScript decides this at call time, based on the object before the dot.

    rabbit
   │
   ├── name: "Rabbit"
   │
   ▼
Rabbit.prototype
   └── sayHi()
*/
function Rabbit(name) {
    this.name = name;
}

Rabbit.prototype.sayHi = function() {
    console.log(this.name);
}

let rabbit = new Rabbit("Rabbit");

rabbit.sayHi();

Rabbit.prototype.sayHi();

Object.getPrototypeOf(rabbit).sayHi();

rabbit.__proto__.sayHi();




// =======================================================
console.log('============================== Question 2 ============================');
/*
Real interview takeaway

    instanceof does not care which constructor created the object.

It only checks:

    Is Constructor.prototype present in the prototype chain?
*/
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

console.log(a instanceof B);



// ==========================================================================
console.log('============================== Question 3 ============================');
/*
    When a class extends another class, it becomes a derived class.

In derived classes:

    You must call super() before using this.

Rabbit2 constructor
        │
        ▼
super(name)  → Animal constructor creates `this`
        │
        ▼
Now `this` is usable

Until super() runs this is uninitialized.


current code:
-----------------

new Rabbit2("White Rabbit")
        │
        ▼
Rabbit2 constructor starts
        │
        ▼
tries to use this.name
        │
        ❌ this not created yet


CURRENT FLOW:
-----------------

new Rabbit2("White Rabbit")
        │
        ▼
Rabbit2 constructor starts
        │
        ▼
super(name)
        │
        ▼
Animal constructor runs
        │
        ▼
this = { name: "White Rabbit" }
        │
        ▼
returns to Rabbit2
        │
        ▼
this.created = Date.now()
*/
class Animal {
    constructor(name) {
        this.name = name;
    }
}

class Rabbit2 extends Animal {
    constructor(name) {
        super(); // added to avoid error
        this.name = name;
        this.created = Date.now();
    }
}

let rabbit2 = new Rabbit2("White Rabbit");
console.log(rabbit2.name);

/* o/p :-
    Must call super constructor in derived class
    before accessing 'this'
    ReferenceError:
*/

// =========================================================================================

console.log('============================== Question 4 ============================');

class Animal2 {}

class Dog extends Animal2 {}

const d = new Dog();

console.log(d instanceof Animal2);
console.log('hello');