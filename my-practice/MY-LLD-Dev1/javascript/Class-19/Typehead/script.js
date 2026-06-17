const resultsSection = document.getElementById('results');
const input = document.querySelector('#container input');
let timer;
input.addEventListener('keyup', async function () {
    const query = input.value;
    // if input query is empty string then do not do anything.
    if (query.trim().length === 0) {
        return;
    }

    clearTimeout(timer);

    timer = setTimeout(async () => {
        const data = await search(query);
        console.log(data);
        displayResult(data);
    }, 150);

});
// emoji
function displayResult(data) {
    if (!data || !data.products || data.products.length === 0) {
        resultsSection.innerHTML = "No results found.";
        return;
    }

    resultsSection.innerHTML = "";
    data.products.forEach(product => {
        const div = document.createElement('div');
        div.innerText = product.title;
        div.onclick = () => {
            input.value = product.title;
            resultsSection.innerHTML = "";
        }
        resultsSection.appendChild(div);
    });
}

async function search(query) {
    const ep = `https://dummyjson.com/products/search?q=${query}`;
    const res = await fetch(ep);
    const data = await res.json();
    return data;
}