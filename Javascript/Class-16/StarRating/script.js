const stars = document.querySelectorAll('section i');
const starRatingContainer = document.querySelector('#star-rating-container');

function updateUI(rating) {
    for (let star of stars) {
        star.classList.remove('filled-star');
    }
    for (let i = 0; i <= rating - 1; i++){
        stars[i].classList.add('filled-star');
    }
}


// Event delgation
starRatingContainer.addEventListener('click', function (event) {
    if (event.target.nodeName !== 'I') {
        return;
    }
    const rating = event.target.getAttribute('data-rating');
    updateUI(rating);
})
