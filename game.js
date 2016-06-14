var Game = function(n) {
  this.board = this.makeBoard(n);
  this.registerEvents();
  this.player1 = 'Megan' || prompt('What is your Name?');
  this.player2 = 'Computer';
  this.currentPlayer = this.player1;
  $('.player').text(`Player's Turn: ${this.currentPlayer}`);
};

Game.prototype.swapTurns = function(player) {
  this.currentPlayer = (this.player1 === player) ? this.player2 : this.player1;
  $('.player').text(`Player's Turn: ${this.currentPlayer}`);
}

Game.prototype.makeBoard = function(n) {
  var board = [];
  for (var i = 0; i < n; i++) {
    board.push([])
    for (var j = 0; j < n; j++) {
      board[i].push(new Square(i, j));
    }
  }
  this.renderBoard(board);
  return board;
};

Game.prototype.renderBoard = function(board) {
  var container = document.createElement('table');
  container.classList.value = 'table';
  var rows = board.length;
  for (var i = 0; i < rows; i++) {
    var row = document.createElement('tr');
    row.classList.value = "row row-" + i;
    var cols = board[i].length;
    for (var j = 0; j < cols; j++) {
      var col = document.createElement('td');
      col.classList.value = "col col-" + j;
      row.appendChild(col);
    }
    container.appendChild(row);
  }
  document.getElementById('board').appendChild(container);
};

Game.prototype.fillSquare = function(row, col) {
  this.board[row][col].empty = false;
  this.board[row][col].player = this.currentPlayer;
  var classToAdd = (this.currentPlayer === this.player1) ? 'fill-player1' : 'fill-player2';
  $(`.row-${row} .col-${col}`).addClass(classToAdd);
  this.checkWin(row, col);
  this.swapTurns(this.currentPlayer);
};

Game.prototype.checkWin = function(row, col) {
  var start = Math.max(col - 3, 0);
  var end = Math.min(col + 3, 7);
  var count = 0;
  for (var i = start; i <= end; i++) {
    if (this.board[row][i].player === this.currentPlayer) {
      count ++;
      if (count === 4) {
        alert(this.currentPlayer + ' Won!');
        return this.currentPlayer;
      }
    } else {
      count = 0;
    }
  }
};

Game.prototype.registerEvents = function() {
  var gameThis = this;

  $('.col').on('mouseover', function() {
    var classNames = $(this).attr('class');
    var num = classNames[8];
    var col = $('.col-' + num);
    $.each(col, function(i, val) {
      $(val).addClass('active');
    });
  });

  $('.col').on('mouseout', function() {
    var classNames = $(this).attr('class');
    var num = classNames[8];
    var col = $('.col-' + num);
    $.each(col, function(i, val) {
      $(val).removeClass('active');
    });
  });

  $('.col').on('click', function() {
    var classNames = $(this).attr('class');
    var board = gameThis.board;
    var col = classNames[8];
    for (var row = board.length - 1; row >= 0; row--) {
      if (board[row][col].empty) {
        return gameThis.fillSquare(row, col);
      }
    }
  });

};
