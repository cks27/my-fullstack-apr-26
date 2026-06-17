const table = document.querySelector('table');
const tbody = document.querySelector('tbody');

function buildBoard(N) {
    const board = [];
    for (let i = 0; i < N; i++) {
        const row = [];
        for (let j = 0; j < N; j++) {
            const isBlack = (i + j) % 2 !== 0;
            row.push({ i, j, isBlack, isHighlighted: false })
        }
        board.push(row);
    }
    return board;
}

function highlightTopRight(board, currI, currJ) {
    const N = board.length;
    let i = currI;
    let j = currJ;
    while (i >= 0 && j < N) {
        board[i][j].isHighlighted = true;
        i--;
        j++
    }
}

function highlightTopLeft(board, currI, currJ) {
    const N = board.length;
    let i = currI;
    let j = currJ;
    while (i >= 0 && j >= 0) {
        board[i][j].isHighlighted = true;
        i--;
        j--;
    }
}

function hightLightBottomLeft(board, currI, currJ) {
    const N = board.length;
    let i = currI;
    let j = currJ;
    while (i < N && j >= 0) {
        board[i][j].isHighlighted = true;
        i++;
        j--;
    }
}

function highLightBottomRight(board, currI, currJ) {
    const N = board.length;
    let i = currI;
    let j = currJ;
    while (i < N && j < N) {
        board[i][j].isHighlighted = true;
        i++;
        j++;
    }
}

function highlight(board, currI, currJ) {
    const N = board.length;

    // Remove existing highlight
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            board[i][j].isHighlighted = false;
        }
    }
    highlightTopRight(board, currI, currJ);
    highlightTopLeft(board, currI, currJ);
    hightLightBottomLeft(board, currI, currJ);
    highLightBottomRight(board, currI, currJ);
    // once we are done hightlighting i.e updating the state.
    render(board);
}

function render(board) {
    tbody.innerHTML = '';
    const N = board.length;
    for (let i = 0; i < N; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < N; j++) {
            const cell = board[i][j];
            const td = document.createElement('td');

            // Attach the value of (x,y) as an attribute - to get the position later.
            td.setAttribute('i', i);
            td.setAttribute('j', j);

            if (cell.isBlack) {
                td.classList.add('black');
            }

            if (cell.isHighlighted) {
                if (td.classList.contains('black')) {
                    td.classList.remove('black');
                }
                td.classList.add('highlight');
            }
            tr.append(td);
        }
        tbody.append(tr);
    }
}

function registerEventListener(board) {
    table.addEventListener('click', function (event) {
        // /skip if element other than TD is clicked.
        if (event.target.nodeName !== 'TD') {
            return;
        }

        const currI = parseInt(event.target.getAttribute('i'));
        const currJ = parseInt(event.target.getAttribute('j'));
        highlight(board, currI, currJ);
    })
}


function initializeApp() {
    const sizeOfGrid = 8;
    const board = buildBoard(sizeOfGrid);
    render(board);
    registerEventListener(board);
}

initializeApp();