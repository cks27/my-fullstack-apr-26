const grandParent = document.querySelector('#grand-parent');
const parent = document.querySelector('#parent');
const child = document.querySelector('#child');

grandParent.addEventListener('click', function () {
    console.log('grand parent');
}, true);

parent.addEventListener('click', function (event) {
    event.stopPropagation();
    console.log('parent');
}, false);

child.addEventListener('click', function () {
    console.log('child');
}, true);



