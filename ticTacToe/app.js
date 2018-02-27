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
      console.log('-------------');
    };

    this.newLine();
    printRowSeparator();
    this.board.forEach(row => {
      console.log(`| ${row[0]} | ${row[1]} | ${row[2]} |`);
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

  isValidSelection(selection) {
    if (!(selection > 0 && selection <= 9)) {
      console.log('Please select a value between 0 and 9');
      return false;
    } else if (this.isSelectedAlready(selection)) {
      console.log('That option has already been selected');
      return false;
    } else {
      return true;
    }
  }

  promptForSelection() {
    let selection = prompt.question(`Player ${this.player}, what's your next move? `);
    if (this.isValidSelection(selection)) {
      this.placeSelection(selection);
    } else {
      this.promptForSelection();
    }
  }

  placeSelection(selection) {
    const {row, col} = this.convertToRowCol(selection);
    this.board[row][col] = this.player;
    this.turns++;
    this.switchPlayers();
  }

  checkForStalemate() {
    if (this.turns === 9) {
      let restart = prompt.keyInYN('STALEMATE! TRY AGAIN?');
      restart ? this.start() : console.log('THANKS FOR PLAYING!'); process.exit(0);
    }
  }

  printNewTurn() {
    this.printBoard();
    this.promptForSelection();

    this.checkForStalemate();
    // this.checkForWinner();

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
