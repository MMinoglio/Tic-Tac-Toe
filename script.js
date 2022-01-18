const gameBoard = (() => {
  const board = ["X","O","X","X","O","O","X","X","O"];
  const getBoard = () => board;
  return {getBoard};
})();

const displayController = (() => {
  const board = document.getElementById('board');
  
  const refresh = () => {

  }
})();

const player = () => {};

console.log(gameBoard.getBoard())