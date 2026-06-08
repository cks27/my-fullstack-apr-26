// Write your solution here
const board = document.querySelector('.board');
const checkboxes = document.querySelectorAll('.checkbox');

board.addEventListener('click', (event) => {
    // only proceed if a checkbox square was clicked
    const clickedcheckbox = event.target.closest('.checkbox');
    if (!clickedcheckbox) return;

    //console.log("???? ", clickedcheckbox);
    // convert checkboxes nodelist to an array to find the clicked index
    const checkboxArray = Array.from(checkboxes);
    const clickedindex = checkboxArray.indexOf(clickedcheckbox);
    // console.log('=====', checkboxArray, clickedindex, "+++++");

    // calculate 2D coordinates of the clicked cell (0 indexed)
    const clickedRow = Math.floor(clickedindex / 8);
    const clickedCol = clickedindex % 8;
    // console.log('===row===', clickedRow, '===col===', clickedCol);

    // update the background color of diagonal cells

    checkboxArray.forEach((cell, index) => {
        const current_row = Math.floor(index / 8);
        const current_col = index % 8;

        // Check for forward diagonal (sum of coordinates is constant)
        if (Math.abs(current_row - clickedRow) === Math.abs(current_col - clickedCol)) {
            applyRedBackground(cell);
        } else {
            const isDark = (current_row + current_col) % 2 === 0;
            cell.style.backgroundColor = isDark ? 'black' : 'white';
        }
    });
});

function applyRedBackground(obj) {
    if (!obj) return;

    obj.style.backgroundColor = 'red';
}

