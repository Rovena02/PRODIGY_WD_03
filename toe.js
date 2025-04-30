let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let lastWinner = null;
let scores = { X: 0, O: 0 };

const symbols = { X: "❌", O: "⭕" };
const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

document.getElementById("theme-switch").addEventListener("change", (e) => {
  document.body.classList.toggle("dark-theme", e.target.checked);
});

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', () => handleClick(cell));
});

function handleClick(cell) {
  const index = cell.dataset.index;
  if (board[index] !== "" || !isGameActive) return;

  board[index] = currentPlayer;
  cell.textContent = symbols[currentPlayer];
  cell.classList.add('clicked');

  if (checkWinner()) {
    document.getElementById("status").textContent = `${symbols[currentPlayer]} wins! 🎉`;
    document.getElementById("status").classList.add("status-animate");
    isGameActive = false;
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    lastWinner = currentPlayer;
    scores[currentPlayer]++;
    updateScores();
    document.getElementById("last-winner").textContent = `🎉 Last winner: ${symbols[lastWinner]}`;
    return;
  }

  if (board.every(cell => cell !== "")) {
    document.getElementById("status").textContent = "It's a draw! 😐";
    document.getElementById("status").classList.add("status-animate");
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateTurnDisplay();
}

function checkWinner() {
  for (const [a, b, c] of winningConditions) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      document.querySelector(`[data-index="${a}"]`).classList.add("winner");
      document.querySelector(`[data-index="${b}"]`).classList.add("winner");
      document.querySelector(`[data-index="${c}"]`).classList.add("winner");
      return true;
    }
  }
  return false;
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner", "clicked");
  });
  document.getElementById("status").textContent = "";
  document.getElementById("status").classList.remove("status-animate");
  if (lastWinner) {
    document.getElementById("last-winner").textContent = `🎉 Last winner: ${symbols[lastWinner]}`;
  }
  updateTurnDisplay();
}

function updateScores() {
  document.getElementById("score-x").textContent = scores.X;
  document.getElementById("score-o").textContent = scores.O;
}

function updateTurnDisplay() {
  document.getElementById("status").textContent = `Turn: ${symbols[currentPlayer]}`;
}
