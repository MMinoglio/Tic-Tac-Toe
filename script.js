const player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
};
const gameBoard = (() => {
  let board = ["X", , "O", , "X", , "O", , "X"];
  const getState = () => board;
  const resetBoard = () => (board = [, , , , , , , ,]);
  const insertSymbol = (symbol, box) => {
    board[box] = symbol === "cross" ? "X" : "O";
  };
  const checkFullBoard = () => !board.includes(undefined);

  const checkLineSymbol = (symbol) =>
    (board[0] === symbol && board[1] === symbol && board[2] === symbol) ||
    (board[3] === symbol && board[4] === symbol && board[5] === symbol) ||
    (board[6] === symbol && board[7] === symbol && board[8] === symbol) ||
    (board[0] === symbol && board[3] === symbol && board[6] === symbol) ||
    (board[1] === symbol && board[4] === symbol && board[7] === symbol) ||
    (board[2] === symbol && board[5] === symbol && board[8] === symbol) ||
    (board[0] === symbol && board[4] === symbol && board[8] === symbol) ||
    (board[2] === symbol && board[4] === symbol && board[6] === symbol);

  return {
    getState,
    resetBoard,
    insertSymbol,
    checkLineSymbol,
    checkFullBoard,
  };
})();
const displayController = (() => {
  let listBoxes = () => document.querySelectorAll(".board-box");
  const getStartWindow = () => document.querySelector(".modal-container");
  const getStartButton = () => document.getElementById("submit");
  const getName = () => document.getElementById("name").value || "jugador 1";
  const getSymbol = () => {
    let symbolChecked = document.querySelector('input[name="symbol"]:checked');
    return symbolChecked ? symbolChecked.value : "cross";
  };
  const getOponentType = () => {
    let oponentChecked = document.querySelector(
      'input[name="oponent"]:checked'
    );
    return oponentChecked ? oponentChecked.value : "computer";
  };
  const getOponentName = () => {
    if (getOponentType() === "computer") return "Computadora";
    else return document.getElementById("oponent-name").value || "jugador 2";
  };
  const getDificulty = () => {
    let dificultyChecked = document.querySelector(
      'input[name="dificulty"]:checked'
    );
    return dificultyChecked ? dificultyChecked.value : "easy";
  };
  const refresh = () => {
    listBoxes().forEach((item, index) => {
      item.textContent = gameBoard.getState()[index];
    });
  };
  const showStart = () => {
    getStartWindow().classList.add("show");
    getStartButton().addEventListener("click", (event) => {
      event.preventDefault();
      game.start(
        getName(),
        getSymbol(),
        getOponentType(),
        getOponentName(),
        getDificulty()
      );
    });
  };
  const hideStart = () => {
    getStartWindow().classList.remove("show");
  };
  const boxSelectionListener = () => {
    listBoxes().forEach((box) => {
      box.addEventListener("click", (event) => {
        if (!!event.target.textContent) return;
        game.boxSelect(box.id);
      });
    });
  };
  showStart();
  refresh();
  return { refresh, showStart, hideStart, boxSelectionListener };
})();

const game = (() => {
  let playerName,
    playerSymbol,
    oponentType,
    oponentName,
    oponentDificulty,
    endGame,
    player1Turn;
  const start = (p1Name, p1Symbol, opType, opName, opDificulty) => {
    playerName = p1Name;
    playerSymbol = p1Symbol;
    oponentType = opType;
    oponentName = opName;
    oponentDificulty = opDificulty;
    player1Turn = Math.random() > 0.5;
    endGame = false;
    displayController.hideStart();
    gameBoard.resetBoard();
    displayController.refresh();
    displayController.boxSelectionListener();
    resumeGame();
  };
  const isWinner = (player) => {
    let symbol = player().getSymbol() === "cross" ? "X" : "O";
    return gameBoard.checkLineSymbol(symbol);
  };
  const isTie = () => gameBoard.checkFullBoard();
  const player1 = () => player(playerName, playerSymbol);
  const player2 = () =>
    player(oponentName, playerSymbol === "cross" ? "circle" : "cross");
  const resumeGame = () => {
    console.log(endGame)
    if (endGame) return; 
    player1Turn = !player1Turn;
    if (!player1Turn && oponentType === "computer") {
      computerMove(player2, oponentDificulty);
    }
    if (isWinner(player1)) {
      console.log(`El ganador es ${player1().getName()}`);
      endGame = true;
      return;
    } else if (isWinner(player2)) {
      console.log(`El ganador es ${player2().getName()}`);
      endGame = true;
      return;
    }

  };
  const computerMove = (player2, dificulty) => {
    let board = gameBoard.getState();
    if (dificulty === "easy") {
      while (true) {
        let randomNumber = Math.round(Math.random() * 8);
        if (board[randomNumber] === undefined) {
          gameBoard.insertSymbol(player2().getSymbol(), randomNumber);
          displayController.refresh();
          resumeGame();
          break;
        }
      }
    }
  };
  const boxSelect = (box) => {
    player1Turn
      ? gameBoard.insertSymbol(player1().getSymbol(), box)
      : gameBoard.insertSymbol(player2().getSymbol(), box);
    displayController.refresh();
    resumeGame();
  };
  return { start, boxSelect };
})();
