const input = document.querySelector('input');

let count = 1;

function fetchProducts(query) {
    console.log(`API Call count - ${count++}`)
}

function debounce(fn, delay) {
    let timerId = null;
    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn(...args);
        }, delay);
    }
}

const fetchProductsDebounced = debounce(fetchProducts, 500);

input.addEventListener('keyup', function () {
    fetchProductsDebounced(input.value);
})