describe("Connect 4", function () {
    beforeEach(function () {
      // Reset the game before each test
      board = [];
      currPlayer = 1;
      makeBoard();
    });
  
    describe("playerMoves", function () {
      it("should correctly handle player's move", function () {
        playerMoves(0); // Player 1 makes a move in column 0
        expect(board[HEIGHT - 1][0]).toBe(1); // Check that the player's piece is in the bottom row of column 0
        expect(currPlayer).toBe(2); // Check that the current player is updated to player 2
  
        playerMoves(3); // Player 2 makes a move in column 3
        expect(board[HEIGHT - 1][3]).toBe(2); // Check that the player's piece is in the bottom row of column 3
        expect(currPlayer).toBe(1); // Check that the current player is updated to player 1
      });
    });
  
    describe("checkForWin", function () {
      it("should correctly check for a win", function () {
        // Set up a winning scenario
        board = [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, 1, 1, 1, 1],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null]
        ];
  
        expect(checkForWin()).toBe(true); // Check that a win is detected
      });
  
      it("should correctly handle no win", function () {
        // Set up a scenario without a win
        board = [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, 1, 1, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null]
        ];
  
        expect(checkForWin()).toBe(false); // Check that no win is detected
      });
    });

    describe("updateWinCount", function () {
        it("should update the win count for the current player", function () {
          playerWins = [0, 0];
          currPlayer = 1;
    
          updateWinCount();
    
          expect(playerWins).toEqual([1, 0]); // Check that the win count for player 1 is updated
    
          currPlayer = 2;
    
          updateWinCount();
    
          expect(playerWins).toEqual([1, 1]); // Check that the win count for player 2 is updated
        });
      });
  
    describe("resetGame", function () {
      it("should reset the game", function () {
        board = [
          [1, null, 2, null, 1, 2, 1],
          [2, null, 1, 1, 2, 1, 2],
          [1, 2, 1, 2, 1, 2, 1],
          [2, 1, 2, 1, 2, 1, 2],
          [1, 2, 1, 2, 1, 2, 1],
          [2, 1, 2, 1, 2, 1, 2]
        ];
        currPlayer = 2;
  
        resetGame();
  
        expect(board).toEqual([
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null]
        ]);
        expect(currPlayer).toBe(1);
      });
    });
  });
  