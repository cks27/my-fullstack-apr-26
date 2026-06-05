/*

You are tasked with creating a promisify function that can turn any given function into a promisified version of itself. The objective is to convert a function that uses traditional callback-based asynchronous programming into a function that returns a promise.

The promisify function should accept a single argument fn, which is the function to be promisified. The promisified function should have the same behavior as the original function but should return a promise instead of using a callback.

The function fn to be promisified will always have a callback as its last argument. The callback function will have the following signature:

function(result) {}
The promisify function should return a new function that wraps the original function fn. Once you have implemented promisify, you should apply it to the provided function exampleFn and assign the resulting promisified function to a variable called promisified. The promisified function should be invoked with the appropriate arguments and then chained with .then() calls to handle the resolved value of the promise. This is how the function should work:

Example:
function exampleFn(a, b, cb) {
    cb(a + b);
}

const promisified = promisify(exampleFn);
promisified(5, 15).then(res => console.log(res)); 

Output: 20
*/

// Function to convert a callback-based function into a Promise-based function
function promisify(fn) {

    // Return a new function
    // This function will accept any number of arguments
    return function (...args) {

        // Return a Promise
        // Because the new function should behave like an async Promise-based function
        return new Promise((resolve) => {

            // Call the original function
            // Spread all received arguments (...args)
            // Add our custom callback as the LAST argument
            fn(...args, function (result) {

                // When callback executes,
                // resolve the promise with the result
                resolve(result);
            });
        });
    };
}


// Example callback-based function
// It takes two numbers and a callback
function exampleFn(a, b, cb) {

    // Perform operation and send result to callback
    cb(a + b);
}


// Convert exampleFn into a Promise-based function
const promisified = promisify(exampleFn);


// Call the promisified function
// Since it returns a Promise,
// we can use .then()
promisified(5, 15)
    .then((res) => {

        // Print resolved result
        console.log(res);
    });


// Output:
// 20