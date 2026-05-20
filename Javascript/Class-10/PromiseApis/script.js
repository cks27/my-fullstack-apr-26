
const p1 = new Promise((resolve, reject) => {
    resolve(100);
});

// const p2 = Promise.resolve(200);
const p2 = Promise.resolve(p1);

// const p3 = Promise.reject(new Error('something went wrong!'));

// p1.then((val) => console.log(val));

// p2.then((val) => console.log(val));

// p3.then((val) => console.log(val))
//     .catch((err) => console.log(err.message));

const p4 = Promise.resolve(999);
const p5 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('I dont want promise to resolve'));
    }, 200)
});

const p6 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('p6 got rejected'))
    }, 100)
});



const p7 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('p7 got rejected'))
    }, 200)
});


const p8 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(777)
    }, 300)
});
// p4.then((val) => console.log(val));
// p5.then((val) => console.log(val));
// p6.then((val) => console.log(val));

Promise.all([p4, p5, p6])
    .then((values) => {
        console.log(values);
    })
    .catch((err) => {
        console.log(err);
    });

Promise.allSettled([p4, p5, p6])
    .then((values) => {
        console.log(values);
    });

Promise.any([p6, p7, p8])
    .then((value) => console.log(value))
    .catch((err) => console.log(err));