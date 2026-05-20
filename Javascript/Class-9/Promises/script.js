
// // 1. creation of a promise
// const promise = new Promise((resolve, reject) => {
//     // ---------here we are making a fetch call.
//     setTimeout(() => {
//         const response = {
//             success: true,
//             data: [1, 2, 3, 4, 5]
//         };
//         // resolve(response);
//         reject(new Error('This is some error'));
//     }, 2000);
// });

// // 2. Consuming/subscribing a promise

// promise
//     .then(function (val) { //this gets called if promise is resolved.
//         console.log('Inside .then()');
//         console.log(val);
//     })
//     .catch(function (err) { //this gets called if promise if rejected.
//         console.log(err.message);
//     });




// ------------------------------------------- 

console.log('START');

setTimeout(function callback() {
    console.log('Inside set timeout');
}, 0);

const p = new Promise((resolve, reject) => {
    resolve(100);
});

p.then(function (val) {
    console.log(`Promise resolved - value : ${val}`);
})

console.log('END');