# Bishop Move Highlighter on a Chessboard

## Problem Statement

Build an interactive chessboard using HTML, CSS, and JavaScript.

When a user clicks on any cell of the chessboard, highlight all the positions that a **Bishop** can reach in a single move according to standard chess rules.

A bishop can move diagonally in any direction until it reaches the edge of the board. Therefore, when a cell is selected, all cells lying on the four diagonals passing through that cell should be highlighted.

## Requirements

* Create an **8 × 8** chessboard dynamically using JavaScript.
* Use alternating black and white colors to represent the board.
* When a user clicks on a cell:

  * Highlight the selected cell.
  * Highlight all cells that are reachable by a bishop in one move.
* Clicking on a different cell should clear the previous highlights and display the new bishop path.
* The solution should use efficient DOM manipulation and avoid recreating the board on every interaction.

## Example

If the user clicks on cell `(3,3)`, the following cells should be highlighted:

```text
(0,0) (1,1) (2,2)
            (3,3)
(4,4) (5,5) (6,6) (7,7)

(0,6) (1,5) (2,4)
            (3,3)
(4,2) (5,1) (6,0)
```

## Constraints

* Board size is fixed at **8 × 8**.
* The bishop can move only diagonally.
* All valid diagonal cells up to the board boundary must be highlighted.

## Learning Objectives

This exercise helps practice:

* DOM creation and manipulation
* Event handling
* Event delegation
* Grid traversal algorithms
* Coordinate-based problem solving
* Separation of logic and UI rendering

## Bonus Challenges

1. Make the board size configurable (`N × N`).
2. Add support for other chess pieces:

   * Rook
   * Queen
   * Knight
   * King
3. Display row and column coordinates.
4. Allow keyboard navigation.
5. Animate the highlighting effect.
6. Show a bishop icon on the selected square.
