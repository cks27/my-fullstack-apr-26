// Promise executor runs IMMEDIATELY (synchronously)
let p = new Promise(function (resolve, reject) {

    // Schedules a reject after 2 seconds
    // But it will execute later
    setTimeout(function () {
        reject(new Error("some value"));
    }, 2000);

    // Promise gets fulfilled immediately
    // State: pending -> fulfilled("some error")
    resolve("some error");

    // Another reject scheduled after 2 seconds
    // Will be ignored because promise is already fulfilled
    setTimeout(function () {
        reject(new Error("some value"));
    }, 2000);

    // Ignored ❌
    // Promise already settled
    resolve("some error");

    // Another reject scheduled
    // Also ignored after 2 sec
    setTimeout(function () {
        reject(new Error("some value"));
    }, 2000);
});

// Final Promise State:
// fulfilled("some error")



// ----------------------------------------------------
// then(successCallback, errorCallback)
// ----------------------------------------------------
p.then(
    null, // success callback not provided

    function (err) {
        // This runs ONLY if promise rejects

        console.log(1);
        console.log(err);
    }
);

// Promise is fulfilled ❌
// error callback skipped



// ----------------------------------------------------
// catch() = then(null, errorHandler)
// ----------------------------------------------------
p.catch(function (err) {

    // Runs only for rejected promise

    console.log(2);
    console.log(err);
});

// Promise fulfilled ❌
// catch skipped



// ----------------------------------------------------
// finally() runs ALWAYS
// (fulfilled OR rejected)
// ----------------------------------------------------
p.finally(function () {

    // finally does not receive value/error

    console.log(1);
});

// Output:
// 1



// ----------------------------------------------------
// Another finally()
// ----------------------------------------------------
p.finally(function () {

    console.log(2);

    // No return here
    // Original promise value preserved
})
.then(function (val) {

    // finally passes through original value

    console.log(val);
});

// Output:
// 2
// some error



// ----------------------------------------------------
// Normal then(success, error)
// ----------------------------------------------------
p.then(

    // Since promise is fulfilled,
    // this callback executes
    function (val) {
        console.log(val);
    },

    // Will NOT run
    // because promise is not rejected
    function (err) {
        console.log(err);
    }
);

// Output:
// some error