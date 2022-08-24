const playerOneScore = document.querySelector("#red");
const playerTwoScore = document.querySelector("#blue");
const board = document.querySelector(".board");
const boardItems = document.querySelectorAll(".item");
const boardSymbols = document.querySelectorAll(".symbol");
let redPlayerTurn = true;

const winList = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"],
];

function nextTurn(event) {
  if (redPlayerTurn === true) {
    placeSymbol(event, "resources/images/x-symbol.svg", "x");
  } else {
    placeSymbol(event, "resources/images/o-symbol.svg", "o");
  }
}

function placeSymbol(event, symbolLink, symbol) {
  if (event.target.className === "") return;
  if (
    event.target.className === "item" ||
    event.target.className === "item last"
  ) {
    if (!(event.target.childNodes[0].style.backgroundImage === "")) return;
    event.target.childNodes[0].style.backgroundImage = `url(${symbolLink})`;
    event.target.childNodes[0].setAttribute("data-symbol", symbol);
  } else {
    if (!(event.target.style.backgroundImage === "")) return;
    event.target.style.backgroundImage = `url(${symbolLink})`;
    event.target.setAttribute("data-symbol", symbol);
  }

  checkForWinner();
}

function checkForWinner() {
  const winObject = {
    x: [],
    o: [],
  };
  for (symbol of boardSymbols) {
    if (!symbol.dataset.symbol || symbol.dataset.symbol == "null") continue;
    winObject[symbol.dataset.symbol].push(symbol.dataset.id);
  }

  let win;
  for (let i = 0; i < winList.length; i++) {
    // win = winObject.x.every((element) => winList[i].includes(element));
    win = winList[i].every((element) => winObject.x.includes(element));
    if (win === true) break;
    win = winList[i].every((element) => winObject.o.includes(element));
    if (win === true) break;
  }

  if (win === false) {
    // check for tie
    if (winObject.x.length + winObject.o.length === 9) {
      alert("There was a tie!");
      clearBoard();
    }
    redPlayerTurn === true ? (redPlayerTurn = false) : (redPlayerTurn = true);
    return;
  }

  if (redPlayerTurn === true) {
    playerOneScore.innerHTML = Number(playerOneScore.innerHTML) + 1;
    alert("Red Player wins!");
  } else {
    playerTwoScore.innerHTML = Number(playerTwoScore.innerHTML) + 1;
    alert("Blue Player wins!");
  }

  redPlayerTurn = true;
  clearBoard();
}

function clearBoard() {
  boardSymbols.forEach((symbol) => {
    symbol.style.backgroundImage = null;
    symbol.dataset["symbol"] = null;
  });
}

board.addEventListener("click", nextTurn);
