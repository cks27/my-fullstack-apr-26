const divs = document.querySelectorAll('section div');
const btn = document.querySelector('button');
const section = document.querySelector('section');

// for (let div of divs) {
//     div.addEventListener('click', function () {
//         console.log(div.innerText);
//     })
// }

btn.addEventListener('click', function () {
    const div = document.createElement('div');
    div.innerText = 'NEW DIV';
    section.append(div);
});

// for (let i = 0; i < divs.length; i++) {
//     const div = divs[i];
//     div.addEventListener('click', function () {
//         console.log(div.innerText);
//     })
// }

// Problem with the above code

// 1. Too many event listeners could lead to memory issues such as memory overflow and memory leaks.
// 2. Click and print content functionality do not works for dynamically
//    added divs.

// Event Delegation - This is a result of event bubbling.
section.addEventListener('click', function (event) {
    if (event.target.nodeName !== 'DIV') {
        return;
    }
    console.log(event.target.innerText);
});