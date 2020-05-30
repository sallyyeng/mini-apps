const CIRCLE_TURN = "O";
const X_TURN = "X";
const board = document.querySelector("[data-board]");
const cells = document.querySelectorAll("[data-cell]");
const gameOverModal = document.querySelector("dialog[data-game-over]");
const gameOverModalDesc = document.querySelector(".dialog_description");
const resetGameButtons = document.querySelectorAll(".reset_game");
const cancelButton = document.querySelector("dialog .cancel");

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let numOfTurns;
let isCircleTurn;

const closeGameOverModal = () => {
  board.focus();
  gameOverModal.close();
};

const resetCells = () => {
  cells.forEach(cell => {
    cell.innerText = "";
    cell.className = "cell";
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick, { once: true });
  });
};

function resetBoard() {
  numOfTurns = 0;
  isCircleTurn = true;
  resetCells();
  closeGameOverModal();
}

resetBoard();

function placeChar({ cell, currTurn }) {
  cell.innerText = currTurn;
  cell.className = `${cell.className} clicked`;
  numOfTurns += 1;
}

const isDraw = () => numOfTurns === 9;

function isWinner({ currTurn }) {
  return WINNING_COMBINATIONS.some(comb => {
    return comb.every(cellIndex => {
      return cells[cellIndex].innerText === currTurn;
    });
  });
}

function presentGameOverModal(currTurn) {
  let modalDesc;

  if (currTurn) {
    modalDesc = `Congratulations ${currTurn}, you won!`;
  } else {
    modalDesc = `Darn, draw game!`;
  }

  gameOverModalDesc.innerText = modalDesc;
  gameOverModal.showModal();
}

function handleCellClick(e) {
  const currTurn = isCircleTurn ? CIRCLE_TURN : X_TURN;

  placeChar({ cell: e.target, currTurn });

  if (isWinner({ currTurn })) {
    presentGameOverModal(currTurn);
  } else if (isDraw()) {
    presentGameOverModal();
  }

  isCircleTurn = !isCircleTurn;
}

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick, { once: true });
});

cancelButton.addEventListener("click", closeGameOverModal);

resetGameButtons.forEach(button =>
  button.addEventListener("click", resetBoard)
);
