const section = document.querySelector('section');
const input = document.querySelector('input');
const form = document.querySelector('form');

// -----------------Mouse Events---------------------
section.addEventListener('mouseenter', function () {
    section.style.backgroundColor = 'lightgreen';
});

section.addEventListener('mouseleave', function () {
    section.style.backgroundColor = '';
});

// ---------------Keyboard Events----------------

input.addEventListener('keyup', function (event) {
    // console.log(input.value);
    if (event.keyCode === 13) {
        console.log(input.value);
    }
});

// ------Form Events -------------------------

form.addEventListener('submit', function (event) {
    // This disables the default submitting/page refresh due to submit event.
    event.preventDefault();
    console.log('form submitted');

    // How to get the values of all the inputs
    // console.log(form.elements);

    const username = form.elements[0].value;
    const password = form.elements[1].value;

    console.log(username);
    console.log(password);
});