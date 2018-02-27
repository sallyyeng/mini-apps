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
    if (this.player === 'X') {
      this.player = 'O';
    } else {
      this.player = 'X';
    }
  }

  placeSelection(selection) {
    let row = Math.floor((parseInt(selection) - 1) / 3);
    let col = Math.floor((parseInt(selection) - 1) % 3);
    this.board[row][col] = this.player;
    this.turns++;
  }

  promptPlayerTurn() {
    let selection = prompt.question(`Player ${this.player}, what's your next move? `);
    this.placeSelection(selection);
    this.switchPlayers();
  }

  isStalemate() {
    return this.turns === 9 ? true : false;
  }

  printNewTurn() {
    this.printBoard();
    this.promptPlayerTurn();
    if (!this.isStalemate()) {
      this.printNewTurn();
    } else {
      console.log('STALEMATE!');
    }
  }

  start() {
    this.printWelcomeMessage();
    this.printNewTurn();
  }
}


new Game().start();
