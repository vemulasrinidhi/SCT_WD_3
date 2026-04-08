let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let mode = "player";

let xScore = 0;
let oScore = 0;
let drawScore = 0;

const boardDiv = document.getElementById("board");
const statusText = document.getElementById("status");

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];
function createBoard() {
    boardDiv.innerHTML = "";
    board.forEach((cell, index) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        if(cell) div.classList.add(cell);
        div.innerText = cell;
        div.addEventListener("click", () => handleClick(index));
        boardDiv.appendChild(div);
    });
}

function handleClick(index) {
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    createBoard();
    checkWinner();

    if (mode === "computer" && currentPlayer === "O" && gameActive) {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    let empty = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
    let move = empty[Math.floor(Math.random() * empty.length)];
    board[move] = "O";
    createBoard();
    checkWinner();
}

function checkWinner() {
    for (let pattern of winPatterns) {
        let [a,b,c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.innerText = board[a] + " Wins!";
            gameActive = false;

            if(board[a] === "X") {
                xScore++;
                document.getElementById("xScore").innerText = xScore;
            } else {
                oScore++;
                document.getElementById("oScore").innerText = oScore;
            }

            return;
        }
    }

    if (!board.includes("")) {
        statusText.innerText = "Draw!";
        drawScore++;
        document.getElementById("drawScore").innerText = drawScore;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = currentPlayer + "'s Turn";
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.innerText = "X's Turn";
    createBoard();
}

function resetScore() {
    xScore = 0;
    oScore = 0;
    drawScore = 0;

    document.getElementById("xScore").innerText = 0;
    document.getElementById("oScore").innerText = 0;
    document.getElementById("drawScore").innerText = 0;
}

function setMode(selectedMode) {
    mode = selectedMode;
    resetGame();
}

createBoard();
statusText.innerText = "X's Turn";