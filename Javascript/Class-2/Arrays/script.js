

const nums = [10, 20, 30, 49, 59];

const arr = ['hello', 10, true, { a: 10, b: 20 }];

const arr2 = [['X', 'O', 'X'], ['O', 'X', 'X']];

const cart = [{ title: 'Macbook air', price: 100, qty: 1 }, { title: 'Iphone', price: 150, qty: 2 }];

console.log(nums);

// ---------------------Loops

// for (let i = 0; i < cart.length; i++){
//     console.log(cart[i]);
// }

// let i = 0;
// while (i < cart.length) {
//     console.log(cart[i]);
//     i++;
// }

// for-of loops - Iterables - arrays, sets, map, string

for (let product of cart) {
    console.log(product);
}