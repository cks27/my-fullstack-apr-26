const starContainer = document.querySelector('.star-container');
const starNodeList = document.querySelectorAll('.star');
const stars = Array.from(starNodeList);

const countDisplay = document.querySelector('#count');
let currentRating = parseInt(countDisplay.textContent) || 0;

function updateStars(rating) {
  stars.forEach(star => {
    const currentIdx = parseInt(star.getAttribute('data-index'));
    if (currentIdx <= rating) {
      star.classList.add('star-filled');
    } else {
      star.classList.remove('star-filled');
    }
  });
}

// Initial state display
updateStars(currentRating);

starContainer.addEventListener('click', (event) => {
  const clickedStarIdx = event.target.dataset.index;
  if (!clickedStarIdx) return;

  currentRating = parseInt(clickedStarIdx);
  updateStars(currentRating);
  countDisplay.innerHTML = currentRating;
});

starContainer.addEventListener('mouseover', (event) => {
  const hoveredStarIdx = event.target.dataset.index;
  if (!hoveredStarIdx) return;

  updateStars(parseInt(hoveredStarIdx));
});

starContainer.addEventListener('mouseleave', () => {
  updateStars(currentRating);
});

