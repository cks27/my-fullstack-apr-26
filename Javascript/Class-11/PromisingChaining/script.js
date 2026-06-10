

// Promise.resolve(100)
//     .then((val1) => {
//         console.log(val1);
//         return val1 + 1;
//     })
//     .then((val2) => {
//         console.log(val2);

//          // ---------Below both the lines are equivalent---------------
//         // return Promise.reject("error1");
//         throw "error1";
//     })
//     .catch((err) => {
//         console.log(err);
//     })
//     .finally((val) => {
//         console.log("Finally", val);
//     })


// -----------

// Promise.resolve(200)
//     .then((val) => {
//         console.log(val);
//         return Promise.reject(val + 1);
//     })
//     .finally((val) => {
//         console.log("Finally", val);
//         // return Promise.reject("error in finally");
//         throw "throwing this string";
//     })
//     .then((val) => {
//         console.log(val);
//     })
//     .catch((err) => {
//         console.log("Catch: ", err);
//     })


// --------------------------------------Question 1---------------

// Promise.resolve(1)
//   .then(x => {
//     console.log("A", x);
//     return x + 1;
//   })
//   .then(x => {
//     console.log("B", x);
//     return x + 1;
//   })
//   .catch(err => {
//     console.log("ERR", err);
//   });


// Output: 
//   A 1
//   B 2

// ------------------------------ Question 2----------------

// Promise.resolve(1)
//   .then(x => {
//     console.log("A");
//     throw new Error("boom");
//   })
//   .then(x => {
//     console.log("B");
//   })
//   .catch(err => {
//     console.log("CATCH", err.message);
//   });

//   Output
// A
// CATCH boom

// ---------------------------------Question 3


// Promise.resolve(1)
//   .then(() => {
//     throw new Error("boom");
//   })
//   .catch(err => {
//     console.log("handled");
//     return 100;
//   })
//   .then(val => {
//     console.log(val);
//   });

//   Output
// handled
// 100
// -----------------------------Question 4

// Promise.resolve()
//   .then(() => {
//     throw new Error("boom");
//   })
//   .catch(err => {
//     console.log("caught once");
//     throw err;
//   })
//   .then(() => {
//     console.log("success");
//   })
//   .catch(err => {
//     console.log("caught again", err.message);
//   });

// Output
// caught once
// caught again

// --------------------------------Question 5--------------

// Promise.resolve(5)
//   .then(v => {
//     console.log(v);
//     return v * 2;
//   })
//   .finally(() => {
//     console.log("cleanup");
//   })
//   .then(v => {
//     console.log(v);
//   });

// Output:
// 5
// cleanup
// 10

// --------------------------------------- Question 6----------

// Promise.reject("ERR")
//   .finally(() => {
//     console.log("cleanup");
//   })
//   .catch(err => {
//     console.log(err);
//   });

// Output:
// cleanup
// ERR

// ---------------------------------Question 7---------------

// Promise.resolve(10)
//   .finally(() => {
//     return 999;
//   })
//   .then(v => {
//     console.log(v);
//   });

// Output
// 10

// ----------------------------- Question 8-------------

// Promise.resolve(10)
//     .finally(() => {
//         throw new Error("cleanup failed");
//     })
//     .then(v => {
//         console.log(v);
//     })
//     .catch(err => {
//         console.log(err.message);
//     });

// Output
// cleanup failed

// function fun(val) {
//     console.log(val);
// }

// Promise.resolve(100)
//     .then(fun)
//     .then((val) => {
//         console.log(val);
//     })


// ------------------------------------------ 

Promise.resolve(1)
    .finally((data) => {
        console.log(data) //undefined
        return Promise.reject('error message')
    })
    .catch((error) => {
        console.log(error)
        throw 'error2'
    })
    .finally((data) => {
        console.log(data)
        return Promise.resolve(2).then(console.log)
    })
    .then(console.log)
    .catch(console.log)

// Output:

// undefined
// error message
// undefined
// 2
// error2