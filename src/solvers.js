/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, 
// with n rooks placed such that none of them can attack each other


  /*
  Specification:
    Input: number of rooks and board size
    Output: a matrix (array of arrays)
    Side effects: expensive
    Edge Cases: None for now
  Explanation:
    - Board is representation of n rooks placed in safe positions
  Viz (draw it):
  Approximation (psuedocode) :
  Verfication (go through with example data):
  Implementation (code it):
  */
window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  // Define inner function called placeRooks(board, numRooks)
  var placeRooks = function(board, numRooks) {
    // if numRooks === n
    if (numRooks === n) {
      // return board  
      return board._toMatrix();
    }
    // iterate i to size
    for (var i = 0; i < n; i++) {
      // iterate j to size
      for (var j = 0; j < n; j++) {
        // if this.get(i)[j] === 0
        if (this.get(i)[j] === 0) {
          // call togglePiece(i, j)
          this.togglePiece(i, j);          
          // if this.hasRow === false && this.hasCol === false
          if (!this.hasRowConflictAt(i) && !this.hasColConflictAt(j)) {
            // recurse placeRooks(board, numRooks)
            numRooks++;
            return placeRooks.call(board, board, numRooks);
          } else {
            this.togglePiece(i, j);
          }
        }
      }
    }
  };
  var board = new Board({n: n});
  return placeRooks.call(board, board, 0);   
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
