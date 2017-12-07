// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    /*
    Specification:
      Input: a number, row index
      Output: boolean
      Side effects: None
      Edge Cases: 
        - Maybe the row has no pieces
        - Assume that rowIndex is valid
    Explanation: 
        - The row index will let us iterate over each row
        - Within each row you can add up the value in that box
        - If that value is greater than 1, then return true
        - In all other cases return false
    Viz (draw it):
    Approximation (psuedocode) :
    Verfication (go through with example data):
    Implementation (code it):
    */
    hasRowConflictAt: function(rowIndex) {
      // define row
      var row = this.get(rowIndex);
      // create a count variable, initialized to 0
      var count = 0;
      // iterate over row
      for (var i = 0; i < row.length; i++) {
        // increment count by the value of each element in the row array
        count += row[i];
      }
      return count > 1;
    },

    /*
    Specification:
      Input: None
      Output: boolean
      Side effects: None
      Edge Cases: None
    Explanation:
      - search all rows in the entire board
      - use .hasRowConflictAt to determine if any row has a conflict
      - if any row does have a conflict, return true
      - otherwise resturn false
    Viz (draw it):
    Approximation (psuedocode) :
    Verfication (go through with example data):
    Implementation (code it):
    */
    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var size = this.get('n');
      // iterate from 0 to size
      for (var i = 0; i < size; i++) {
        // call hasRowConflictAt(i)
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict

    /*
    Specification:
      Input: A number colIndex
      Output: A boolean
      Side effects: none
      Edge Cases: 
        - Maybe the row has no pieces
        - Assume that rowIndex is valid
    Explanation:
      colIndex -> true/false

      Return if total value of items in column at colIndex > 1
  
        - need a way to define row
        - loop over row, using i until row.length
        - for each row, pass in column index
        - increment count by the value of row[i][colIndex]
        - return count > 1
    Viz (draw it):
    Approximation (psuedocode) :
    Verfication (go through with example data):
    Implementation (code it):
    */

    hasColConflictAt: function(colIndex) {
      // need a way to define row
      // define size?
      var count = 0;
      var numRows = this.get('n');
      // loop over row, using i until row.length
      for (var i = 0; i < numRows; i++) {
        // for each row, pass in column index
        var row = this.get(i);
        // increment count by the value of row[i][colIndex]
        count += row[colIndex];
      }
      return count > 1;
    },

  
    /*
    Specification:
      Input: None
      Output: Boolean
      Side effects: None
      Edge Cases: None
    Explanation:
      - true: if any column hasColConflictAt returns true
      - false: else
    Viz (draw it):
    Approximation (psuedocode) :
    Verfication (go through with example data):
    Implementation (code it):
    */
    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // define num cols as a variable
      var numCols = this.get('n');
      // iterate through the columns using i
      for (var i = 0; i < numCols; i++) {
        // if call hasColConflictAt(i) is true
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    /*
    Specification: 
      Input: column index [can be negative]
      Output: Boolean
      Side effects (does running this function change anything): None
      Edge Cases: Negative column index
    Explanation (relation between inputs/outputs/side effects):
      - true: a diagonal starting from first row at colIndex, from left to right, contains 2
      - false: else
    Viz (draw it):
    Approximation (psuedocode) :
    Verfication (go through with example data):
    Implementation (code it):
    */
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // var n = majorDiagonal
      var col = majorDiagonalColumnIndexAtFirstRow;
      // define output array, which will be a diagonal
      // var rowIncrease = false;
      var colIncrease = false;
      var diagonal = [];
      // define inner function that accepts row and column
      var recurseDiagonal = function(row, col) {
        var value = this.get(row)[col];

        if (value !== undefined) {
          // push value at [row, column] to output array
          diagonal.push(value);
        }
        // if column + 1 < size
        if (colIncrease) {
          var check = col;
        } else {
          var check = row;
        }
        if (check + 1 < this.get('n')) {
          // row++, col++
          row++;
          col++;
          // call inner function(row, column)
          recurseDiagonal.call(this, row, col);
        }
      };

      // if n > 0 (positive)
      if (col >= 0) {
        colIncrease = true;
      } 
      // else {
      //   rowIncrease = true;
      // }
      // call recursive function [0, n]
      recurseDiagonal.call(this, 0, col);

      // reduce output array
      var sum = diagonal.reduce(function(count, piece) {
        return count + piece;
      });    
      return sum > 1; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

  /*
  Specification:
    Input:
    Output:
    Side effects (does running this function change anything):
    Edge Cases:
  Explanation (relation between inputs/outputs/side effects):
  Viz (draw it):
  Approximation (psuedocode) :
  Verfication (go through with example data):
  Implementation (code it):
  */