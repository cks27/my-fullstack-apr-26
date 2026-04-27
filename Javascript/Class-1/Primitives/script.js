

let name = 'Max';

typeof name; //string

name = 109;

typeof name  //number


// const myName = `shfgjks
// dfeshdjkf
// vwsdfhvjskd
// `

const firstName = 'John';
const lastName = 'Doe';

// string template literals
const fullName = `Mr.${lastName},${firstName}`;

// ---------------------Objects



const txn1 = {
    id: 325674289,
    type: 'Payment',
    amount: 100.9,
    paymentMode: 'UPI',
    status: 'SUCCESS',
    userId: "dsghjq36r7823943"
}

const max = {
    name: 'Max',
    age:25
}

// --------------------------Functions

// x,y are parameter
function sum(x,y) {
    return x + y;
}

// 4,5 are the arguments
const res = sum(4, 5);


// function definition
function fun() {
    console.log('Inside fun');
}

// fun(); // function call