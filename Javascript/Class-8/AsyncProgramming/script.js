

// console.log('START');

// function apiCall(func) {
//     console.log('starting an API call')
//     const currTS = new Date().getTime(); //lets assume this is 0
//     while (new Date().getTime() < currTS + 3 * 1000) { }
    
//     func();
// }

// function callback() {
//     console.log('API call is complete');
// }

// apiCall(callback); //3 sec

// console.log('END');


// ----------------------------- setTimeOut

// console.log('START');

// function callback() {
//     console.log('Inside callback');
// }

// setTimeout(callback, 6000);

// console.log('END');

// ------------------------------ 

// console.log('START');

// setTimeout(() => {
//     console.log('Inside Callback');
// },1000);

// let x = 100;

// while (x < 200) {
//     console.log(x);
//     x = x - 10;
// }

// console.log('END');


// ---------------------------------------------

console.log('START');

setTimeout(() => {
    console.log('Inside set timeout');
}, 0);

console.log('After set timeout');

console.log('END');