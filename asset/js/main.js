const cells = document.querySelectorAll("[data-cell]");
const gameStatus = document.getElementById("gameStatus");
const endGameStatus = document.getElementById("endGameStatus");
const playerOne = "X";
const playerTwo = "O";
let vsCpu = true;
let playerTurn = playerOne;
let random;

const winningPatterns = [
    // horizontal
    [0, 1, 2, 3],
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
    [7, 8, 9, 10],
    [8, 9, 10, 11],
    [9, 10, 11, 12],
    [10, 11, 12, 13],
    [14, 15, 16, 17],
    [15, 16, 17, 18],
    [16, 17, 18, 19],
    [17, 18, 19, 20],
    [21, 22, 23, 24],
    [22, 23, 24, 25],
    [23, 24, 25, 26],
    [24, 25, 26, 27],
    [28, 29, 30, 31],
    [29, 30, 31, 32],
    [30, 31, 32, 33],
    [31, 32, 33, 34],
    [35, 36, 37, 38],
    [36, 37, 38, 39],
    [37, 38, 39, 40],
    [38, 39, 40, 41],
    // verical
    [0, 7, 14, 21],
    [7, 14, 21, 28],
    [14, 21, 28, 35],
    [1, 8, 15, 22],
    [8, 15, 22, 29],
    [15, 22, 29, 36],
    [2, 9, 16, 23],
    [9, 16, 23, 30],
    [16, 23, 30, 37],
    [3, 10, 17, 24],
    [10, 17, 24, 31],
    [17, 24, 31, 38],
    [4, 11, 18, 25],
    [11, 18, 25, 32],
    [18, 25, 32, 39],
    [5, 12, 19, 26],
    [12, 19, 26, 33],
    [19, 26, 33, 40],
    [6, 13, 20, 27],
    [12, 20, 27, 34],
    [20, 27, 34, 41],
    // diagonal gauche
    [3, 11, 19, 27],
    [2, 10, 18, 26],
    [10, 18, 26, 34],
    [1, 9, 17, 25],
    [9, 17, 25, 33],
    [17, 25, 33, 41],
    [0, 8, 16, 24],
    [8, 16, 24, 32],
    [16, 24, 32, 40],
    [7, 15, 23, 31],
    [15, 23, 31, 39],
    [14, 22, 30, 38],
    // diagonal droite
    [20, 26, 32, 38],
    [13, 19, 25, 31],
    [19, 25, 31, 37],
    [6, 12, 18, 24],
    [12, 18, 24, 30],
    [18, 24, 30, 36],
    [5, 11, 17, 23],
    [11, 17, 23, 29],
    [17, 23, 29, 35],
    [4, 10, 16, 22],
    [10, 16, 22, 28],
    [3, 9, 15, 21],
];


// DEMARRAGE DE LA PARTIE ET REGLES DU JEUX\CONDITION


function playGame(e) {
  console.log(e);
  e.innerHTML = playerTurn;

if (playerTurn == playerOne) {
    e.setAttribute('style',' background-color: red; color:red')
} else if (playerTurn == playerTwo) {
    e.setAttribute('style',' background-color: blue; color:blue')
} 

  if (checkWin(playerTurn)) {
    updateGameStatus("wins" + playerTurn);
    return endGame();
  } else if (checkDraw()) {
    updateGameStatus("draw");
    return endGame();
  }

  updateGameStatus(playerTurn);
  playerTurn == playerOne ? (playerTurn = playerTwo) : (playerTurn = playerOne);
  if (vsCpu == true) {
    cpuTurn();
  }
}



// L'ORDINATEUR CHERCHE UNE CELLULE VIDE POUR JOUER\DECLARE LE GAGNANT

function cpuTurn() {
  random = Math.ceil(Math.random() * 9) - 1;
  while (true) {
    console.log(document.querySelectorAll(".cell")[random].innerHTML != "");
    if (document.querySelectorAll(".cell")[random].getAttribute('style')) {
      random = Math.ceil(Math.random() * 9) - 1;
    } else {
      document.querySelectorAll(".cell")[random].setAttribute('style',' background-color: blue; color:blue')
      document.querySelectorAll(".cell")[random].innerHTML = playerTurn
      break;
    }
  }
  if (checkWin(playerTurn)) {
    updateGameStatus("wins" + playerTurn);
    return endGame();
  } else if (checkDraw()) {
    updateGameStatus("draw");
    return endGame();
  }
  updateGameStatus(playerTurn);
  playerTurn == playerOne ? (playerTurn = playerTwo) : (playerTurn = playerOne);
}
// VERIFIE LE GAGNANT

function checkWin(playerTurn) {
  return winningPatterns.some((combination) => {
    return combination.every((index) => {
      return cells[index].innerHTML == playerTurn;
    });
  });
}

// A QUI LE TOUR

function checkDraw() {
  return [...cells].every((cell) => {
    return cell.innerHTML == playerOne || cell.innerHTML == playerTwo;
  });
}

// MET A JOUR LE GAMEPLAY

function updateGameStatus(status) {
  let statusText;

  switch (status) {
    case "X":
      statusText = "Player 2 turn ";
      break;
    case "O":
      statusText = "Player 1 turn ";
      break;
    case "winsX":
      statusText = "Player 1 WIN !";
      break;
    case "winsO":
      statusText = "Player 2 WIN !";
      break;
    case "draw":
      statusText = "Equality ! Try Again ";
      break;
  }

  gameStatus.innerHTML = statusText;
  endGameStatus.innerHTML = statusText;
}

// FONCTION QUI NETTOIE LES CELLULES QUAND ON PASSE EN MODE VS ORDI

function clearGrid() {
  let cells = document.querySelectorAll('.cell')
  for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = "";
  }

}

// FONCTION DE FIN DE JEUX

function endGame() {
  document.getElementById("gameEnd").style.display = "block";
}

// BUTTON PLAY AGAIN

function reloadGame() {
  window.location.reload();
}

// NETTOIE LES CELLULES

function gameMode(isCpuGame) {
    
  clearGrid();

  vsCpu = isCpuGame;
}

