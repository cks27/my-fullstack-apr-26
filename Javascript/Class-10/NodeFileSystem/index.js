const fs = require('node:fs');
const fsp = require('node:fs/promises');

console.log('START');

// --------------reading file using async way---------
// fs.readFile('abc.txt', (err, data) => {
//     if (err) {
//         throw err;
//     }
//     console.log(data.toString());
// });

// -------------reading a file using sync method-------
// const content = fs.readFileSync('abc.txt');

// console.log(content.toString());


// -------------reading using promises

const promise = fsp.readFile('abc.txt');

promise.then((data) => {
    console.log(data.toString());
})

console.log('END');