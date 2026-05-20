const fsp = require('node:fs/promises');
const fspW  = require('node:fs/promises');


// let n1 = [];
// let n2 = [];
const ans = [];
const promise1 = fsp.readFile('input1.txt', 'utf-8');
const promise2 = fsp.readFile('input2.txt', 'utf-8');

Promise.all([promise1, promise2])
    .then((data) => {
        // console.log(data); // [ '22\r\n23\r\n100\r\n-10\r\n40', '28\r\n-11\r\n0\r\n56\r\n29' ]
        for(let el of data) {
            ans.push(...el.split('\r\n'));
        }
        // console.log(ans);
        /*
        n1 = data[0].toString().split('\r\n');
        n2 = data[1].toString().split('\r\n');

        for(let el of n1) {
            ans.push(el);
        }

        for(let el of n2) {
            ans.push(el);
        }
            */
    }).then(() => {
        ans.sort((a, b) => a - b);
        return fspW.writeFile('output.txt', ans.join('\r\n'));
    }).then(() => {
        console.log('file written successfully.');
    });


/*
promise1.then((data) => {
    n1 = data.toString().split('\r\n');
    console.log( n1);
});

const promise2 = fsp.readFile('input2.txt', 'utf-8');

promise2.then((data) => {
    // console.log(data.toString());
    n2 = data.toString().split('\r\n');
});
console.log(n1)
// merge n1 and n2
const ans = [];
for(let el of n1) {
    console.log(el)
    ans.push(el);
}

for(let el of n2) {
    ans.push(el);

}

console.log(ans);
*/

