// Constants
const WIDTH = 7;
const HEIGHT = 6;

// Global variables
let board = [];
let currPlayer = 1;
let playerWins = [0, 0];

// Create the game board
function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }).fill(null));
  }
}

// Create the HTML board
function makeHTMLBoard() {
  const boardNode = document.getElementById("board");

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.appendChild(cell);
    }

    boardNode.appendChild(row);
  }
}

//
// Display end game message and cupcake image, end the game
function endGame(message) {
  const cupcakeImage = document.createElement("img");
  cupcakeImage.src = "https://tr.rbxcdn.com/60946b2a8f814e9cfec5046f2e2b1ece/420/420/Image/Png";
  cupcakeImage.classList.add("cupcake-image");

  const cupcakeLink = document.createElement("a");
  cupcakeLink.href = "https://example.com";
  cupcakeLink.appendChild(cupcakeImage);

  const messageElement = document.createElement("div");
  messageElement.classList.add("end-message");
  messageElement.textContent = message;

  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play Again";
  playAgainButton.addEventListener("click", resetGame);

  const board = document.getElementById("board");
  board.innerHTML = "";
  board.appendChild(cupcakeLink);
  board.appendChild(messageElement);
  board.appendChild(playAgainButton);

  updateWinCount(); // Update win count
}

// Handle player's move
function playerMoves(col) {
  const row = findSpotForCol(col);

  if (row === null) {
    return;
  }

  const cell = document.getElementById(`${row}-${col}`);
  const piece = document.createElement("div");
  piece.classList.add("piece", `p${currPlayer}`);
  cell.appendChild(piece);

  board[row][col] = currPlayer;
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} wins!`);
  }

  if (board.every(row => row.every(cell => cell !== null))) {
    return endGame("It's a tie!");
  }

  currPlayer = currPlayer === 1 ? 2 : 1;
}

// Find the lowest empty spot in the column
function findSpotForCol(col) {
  for (let row = HEIGHT - 1; row >= 0; row--) {
    if (board[row][col] === null) {
      return row;
    }
  }
  return null;
}

function handleClick(event) {
  const col = event.target.cellIndex;
  playerMoves(col);
}

// Check for a win
function checkForWin() {
  function _win(cells) {
    // Check if all cells in the provided array are the same player's piece
    // and not null
    return cells.every(
      ([row, col]) =>
        row >= 0 &&
        row < board.length &&
        col >= 0 &&
        col < board[row].length &&
        
        board[row][col] === currPlayer
    );
  }

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      // Check horizontal win
      const horiz = [
        [row, col],
        [row, col + 1],
        [row, col + 2],
        [row, col + 3]
      ];
      // Check vertical win
      const vert = [
        [row, col],
        [row + 1, col],
        [row + 2, col],
        [row + 3, col]
      ];
      // Check diagonal win (positive slope)
      const diagDR = [
        [row, col],
        [row + 1, col + 1],
        [row + 2, col + 2],
        [row + 3, col + 3]
      ];
      // Check diagonal win (negative slope)
      const diagDL = [
        [row, col],
        [row + 1, col - 1],
        [row + 2, col - 2],
        [row + 3, col - 3]
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }

  return false;
}

// Update win count for current player
function updateWinCount() {
  const playerWinsElement = document.querySelectorAll(".player-wins");
  playerWinsElement[currPlayer - 1].textContent = ++playerWins[currPlayer - 1];
}

// Reset the game
function resetGame() {
  board = [];
  currPlayer = 1;
  makeBoard();
  makeHTMLBoard();
}

// Game initialization
function startGame() {
  makeBoard();
  makeHTMLBoard();
  document.getElementById("board").addEventListener("click", handleClick);
}

startGame();
