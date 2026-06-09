const board = document.querySelector('.board');

board.addEventListener('click', (event) => {
  const targetElement = event.target;

  const { row: clickedRow, col: clickedCol } = getTargetElementCoordinates(targetElement);

  const checkboxNodeList = document.querySelectorAll('.checkbox');
  const checkboxArray = Array.from(checkboxNodeList);

  checkboxArray.forEach((checkbox) => {
    const { row: currentRow, col: currentCol } = getTargetElementCoordinates(checkbox);

    if (isRooksPath(clickedRow, clickedCol, currentRow, currentCol)) {
      applyRedBackground(checkbox);
    } else if (isBishopsPath(clickedRow, clickedCol, currentRow, currentCol)) {
      applyRedBackground(checkbox);
    } else {
      const isDark = (currentRow + currentCol) % 2 === 0;
      checkbox.style.backgroundColor = isDark ? 'black' : 'white';
    }
  });

  // applyBishopsPath();
  // applyRooksPath();
  // applyQueensPath();
  // applyKingsPath();
});

function applyRedBackground(obj) {
  if (!obj) return;
  obj.style.backgroundColor = 'red';
}

function getTargetElementCoordinates(targetElement) {
  const cellId = targetElement.getAttribute('id');

  const row = Math.floor((cellId - 1) / 8);
  const col = (cellId - 1) % 8;

  return { row, col };
}

function isRooksPath(clickedRow, clickedCol, currentRow, currentCol) {
  return clickedRow === currentRow || clickedCol === currentCol;
}

function isBishopsPath(clickedRow, clickedCol, currentRow, currentCol) {
  return Math.abs(clickedRow - currentRow) === Math.abs(clickedCol - currentCol);
}
