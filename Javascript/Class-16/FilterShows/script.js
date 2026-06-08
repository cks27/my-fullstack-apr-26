const showsContainer = document.getElementById('shows-container')
const select = document.querySelector('select');

const shows = [
    {
        name: 'Fast and Furious',
        genre: 'action'
    },
    {
        name: 'Spiderman',
        genre: 'action'
    },
    {
        name: 'Super Natural',
        genre: 'horror'
    },
    {
        name: 'Jack Ryan',
        genre: 'thriller'
    },
    {
        name: 'Breaking Bads',
        genre: 'comedy'
    }
];

function createShowUIComponent(show) {
    return `<div>
        <h2>Name: ${show.name}</h2>
        <p>Genre: ${show.genre}</p>
    </div>`
}

function refreshUI(shows) {
    showsContainer.innerHTML = '';
    for (let show of shows) {
        const article = document.createElement('article');
        article.innerHTML = createShowUIComponent(show);
        showsContainer.append(article);
    }
}

function filterAndDisplayShows(selectedGenre) {
    const filteredShows = shows.filter((show) => {
        if (selectedGenre === 'all') {
            return true;
        }
        return show.genre === selectedGenre;
    });
    refreshUI(filteredShows);
}

function registerEventListeners() {
    select.addEventListener('change', function () {
        const selectedGenre = select.value;
        filterAndDisplayShows(selectedGenre);
    })
}


function initializeApp() {
    refreshUI(shows);
    registerEventListeners();
}

initializeApp();
