const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const info = document.getElementById("info");
const restartBtn = document.getElementById("restartBtn");
const alertBox = document.getElementById("alertBox");
const alertMessage = document.getElementById("alertMessage");
const turnSound = document.getElementById("turnSound");

const modal = document.getElementById("playerModal");
const startBtn = document.getElementById("startBtn");
const player1Input = document.getElementById("player1Input");
const player2Input = document.getElementById("player2Input");

let turn = "X";
let gameOver = false;
let player1 = "Player 1";
let player2 = "Player 2";

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Play sound
function playTurnSound() {
  turnSound.currentTime = 0;
  turnSound.play();
}

// Speak messages
function speak(message) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(message);
  synth.speak(utter);
}

// Alert toggle
function showAlert(message) {
  alertMessage.textContent = message;
  alertBox.classList.add("show");
  speak(message);
}

function closeAlert() {
  alertBox.classList.remove("show");
}

// Handle click
function handleClick(e) {
  const cell = e.target;
  if (cell.textContent || gameOver) return;

  cell.textContent = turn;
  playTurnSound();

  if (checkWin(turn)) {
    showAlert(`${turn === "X" ? player1 : player2} Wins! 🎉`);
    gameOver = true;
    return;
  }

  if (isDraw()) {
    showAlert("It's a Draw!");
    gameOver = true;
    return;
  }

  turn = turn === "X" ? "O" : "X";
  info.textContent = `Turn: ${turn === "X" ? player1 : player2}`;
  speak(`Turn: ${turn === "X" ? player1 : player2}`);
}

function checkWin(player) {
  return winningCombos.some((combo) =>
    combo.every((index) => cells[index].textContent === player)
  );
}

function isDraw() {
  return [...cells].every((cell) => cell.textContent);
}

function restartGame() {
  cells.forEach((cell) => (cell.textContent = ""));
  turn = "X";
  gameOver = false;
  info.textContent = `Turn: ${player1}`;
}

// Start Game Modal
startBtn.addEventListener("click", () => {
  player1 = player1Input.value || "Player 1";
  player2 = player2Input.value || "Player 2";
  modal.style.display = "none";
  info.textContent = `Turn: ${player1}`;
  speak(`Game started. ${player1} goes first.`);
});

cells.forEach((cell) => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);
