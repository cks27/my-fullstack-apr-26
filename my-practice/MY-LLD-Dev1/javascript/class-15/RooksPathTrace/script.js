const board = document.querySelector('.board');

function getCellCoordinates(clickedCheckboxCell) {
  const cell_id = parseInt(clickedCheckboxCell.getAttribute("id")) - 1;

  const row = Math.floor(cell_id / 8);
  const col = cell_id % 8;

  return { row, col };

}

function applyRedBackground(obj) {
  if (!obj) return;

  obj.style.backgroundColor = "red";
}

board.addEventListener('click', (event) => {
  const clickedcheckbox = event.target;

  const { row: clickedRow, col: clickedCol } = getCellCoordinates(clickedcheckbox);

  const checkboxNodeList = document.querySelectorAll('.checkbox');
  const checkboxArray = Array.from(checkboxNodeList);


  for (let checkbox of checkboxArray) {
    const { row: currentRow, col: currentCol } = getCellCoordinates(checkbox);

    if (clickedRow === currentRow || clickedCol === currentCol) {
      applyRedBackground(checkbox);
    } else {
      const isDark = (currentRow + currentCol) % 2 === 0;

      checkbox.style.backgroundColor = isDark ? 'black' : 'white';
    }
  }
});

