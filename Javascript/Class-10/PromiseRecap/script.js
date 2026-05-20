

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve(100);
        reject(new Error('Some error'));
    }, 1000);
});

promise
    .then((val) => {
        console.log(val);
    })
    .catch((err) => {
        console.log(err);
    })
