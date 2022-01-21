const player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
};

const gameBoard = (() => {
  const board = ["X", , "O", , "X", , "O", , "X"];
  const getState = () => board;
  const resetBoard = () => (board = []);
  const insertSymbol = (symbol, box) => (board[box] = symbol);
  const checkLineSymbol = (symbol) =>
    (board[0] === symbol && board[1] === symbol && board[2] === symbol) ||
    (board[3] === symbol && board[4] === symbol && board[5] === symbol) ||
    (board[6] === symbol && board[7] === symbol && board[8] === symbol) ||
    (board[0] === symbol && board[3] === symbol && board[6] === symbol) ||
    (board[1] === symbol && board[4] === symbol && board[7] === symbol) ||
    (board[2] === symbol && board[5] === symbol && board[8] === symbol) ||
    (board[0] === symbol && board[4] === symbol && board[8] === symbol) ||
    (board[2] === symbol && board[4] === symbol && board[6] === symbol);

  return { getState, resetBoard, insertSymbol, checkLineSymbol };
})();

const displayController = (() => {
  const listBoxes = () => document.querySelectorAll(".board-box");
  const boardState = () => gameBoard.getState();
  const selectBox = (box) => gameFlow.boxSelected(box);
  const getStartWindow = () => document.querySelector(".modal-container");
  const getStartButton = () => document.getElementById("submit");
  const getPlayerName = () => document.getElementById("name");
  const getPlayerSymbol = () => {
    document.querySelectorAll('input[name="symbol"]').forEach((element) => {
      element.checked ? console.log(element.value) : console.log("cross");
    });
  };
  const refresh = () => {
    boardState().forEach((element, index) => {
      listBoxes()[index].textContent = element;
    });
  };
  const showStart = () => {
    getStartWindow().classList.add("show");
    getStartButton().addEventListener("click", (event) => {
      event.preventDefault();
      startGame();
    });
  };

  const startGame = () => {
    console.log(getPlayerName().value);
    getPlayerSymbol();
  };

  listBoxes().forEach((box) => {
    box.addEventListener("click", (event) => {
      if (!!event.target.textContent) return;
      selectBox(event.target.id);
    });
  });
  refresh();
  showStart();

  return { refresh };
})();

const gameFlow = (() => {
  let player1Turn = Math.random() > 0.5;

  const isWinner = (player) => gameBoard.checkLineSymbol(player.getSymbol());
  const refresh = () => displayController.refresh();
  const insertSymbol = (symbol, box) => gameBoard.insertSymbol(symbol, box);
  const player1 = () => player("playerOne", "X");
  const player2 = () => player("playerTwo", "O");
  const boxSelected = (box) => {
    player1Turn ? playerSelect(player1(), box) : playerSelect(player2(), box);
  };
  const playerSelect = (player, box) => {
    insertSymbol(player.getSymbol(), box);
    player1Turn = !player1Turn;
    refresh();
    if (isWinner(player)) {
      console.log(`${player.getName()} is the winner!!!`);
    }
  };
  return { boxSelected };
})();
