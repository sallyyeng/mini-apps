const prompt = require('readline-sync');

class Game {
  constructor() {
    this.board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    this.player = 'X';
    this.turns = 0;
  }

  newLine() {
    console.log('\n');
  }

  printWelcomeMessage() {
    this.newLine();
    console.log('/** Welcome to Tic Tac Toe **/');
  }

  printBoard() {
    const printRowSeparator = () => {
      console.log('        -------------');
    };

    this.newLine();
    printRowSeparator();
    this.board.forEach(row => {
      console.log(`        | ${row[0]} | ${row[1]} | ${row[2]} |`);
      printRowSeparator();
    });
    this.newLine();
  }

  switchPlayers() {
    this.player = this.player === 'X' ? 'O' : 'X';
  }

  convertToRowCol(selection) {
    const row = Math.floor((selection - 1) / 3);
    const col = (selection - 1) % 3;
    return {row, col};
  }

  isSelectedAlready(selection) {
    const {row, col} = this.convertToRowCol(selection);
    return typeof this.board[row][col] === 'string';
  }

  isInvalidSelection(selection) {
    if (!selection.match(/^[1-9]$/)) {
      console.log('Please select a value between 0 and 9, try again');
      return true;
    } else if (this.isSelectedAlready(selection)) {
      console.log('That option has already been selected, try again');
      return true;
    } else {
      return false;
    }
  }

  promptForSelection() {
    let selection;
    do {
      selection = prompt.question(`Player ${this.player}, what's your move? `);
    } while (this.isInvalidSelection(selection));
    return selection;
  }

  placeSelection(selection) {
    const {row, col} = this.convertToRowCol(selection);
    this.board[row][col] = this.player;
    this.turns++;
  }

  askToRestart() {
    let restart = prompt.keyInYN('Do you want to play again?');
    restart ? this.start() : console.log('THANKS FOR PLAYING!'); process.exit(0);
  }

  checkForStalemate() {
    if (this.turns === 9) {
      console.log('GAME RESULT: DRAW BETWEEN PLAYERS');
      this.askToRestart();
    }
  }

  // After placing value, check if that particular placement activates a win //

  hasColWin(col) {
    return this.board[0][col] === this.board[1][col] && this.board[1][col] === this.board[2][col] ? true : false;
  }

  hasRowWin(row) {
    return this.board[row][0] === this.board[row][1] && this.board[row][1] === this.board[row][2] ? true : false;
  }

  hasDiagonalWin() {
    return this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2] ? true :
           this.board[2][0] === this.board[1][1] && this.board[1][1] === this.board[2][0] ? true : false;
  }

  printWinner() {
    this.newLine();
    console.log(`/==== WINNER IS: PLAYER ${this.player} ====/`);
    this.printBoard();
    console.log('/=============================/');
    this.newLine();
    this.askToRestart();
  }

  checkForWinner(selection) {
    const {row, col} = this.convertToRowCol(selection);
    this.hasColWin(col) || this.hasRowWin(row) || this.hasDiagonalWin() ? this.printWinner() : null;
  }


  printNewTurn() {
    this.printBoard();
    let selection = this.promptForSelection();
    this.placeSelection(selection);
    this.checkForWinner(selection);
    this.switchPlayers();
    this.checkForStalemate();

    this.printNewTurn();
  }

  resetBoard() {
    this.board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    this.player = 'X';
    this.turns = 0;
  }

  start() {
    this.resetBoard();
    this.printWelcomeMessage();
    this.printNewTurn();
  }
}


new Game().start();
