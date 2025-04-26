let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8], 
  [0,3,6], [1,4,7], [2,5,8], 
  [0,4,8], [2,4,6]           
];

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', () => handleClick(cell));
});

function handleClick(cell) {
  const index = cell.dataset.index;
  if (board[index] !== "" || !isGameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    document.getElementById("status").textContent = `${currentPlayer} wins!`;
    isGameActive = false;
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
      lastWinner = currentPlayer;
    document.getElementById("last-winner").textContent = `🎉 Last winner: ${lastWinner}`;  
    return;
  }

  if (board.every(cell => cell !== "")) {
    document.getElementById("status").textContent = "It's a draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
  return winningConditions.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = "");
  document.getElementById("status").textContent = "";
  if (lastWinner) {
    document.getElementById("last-winner").textContent = `🎉 Last winner: ${lastWinner}`;
}
}
