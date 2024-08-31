document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const cells = document.querySelectorAll(".cell");
    const statusDisplay = document.getElementById("status");
    const newGameButton = document.getElementById("newGameButton");
    const resultScreen = document.getElementById("resultScreen");
    const resultMessage = document.getElementById("resultMessage");
    const playAgainButton = document.getElementById("playAgainButton");

    let currentPlayer = "X";
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        handleResultValidation();
    };

    const handleResultValidation = () => {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            resultMessage.textContent = `Player ${currentPlayer} Ganhou!`;
            resultScreen.style.display = "flex";
            gameActive = false;
            return;
        }

        const roundDraw = !gameState.includes("");
        if (roundDraw) {
            resultMessage.textContent = 'É um empate!';
            resultScreen.style.display = "flex";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.textContent = `Vez do Player ${currentPlayer}`;
    };

    const handleRestartGame = () => {
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        statusDisplay.textContent = `Vez do Player ${currentPlayer}`;
        cells.forEach(cell => cell.textContent = "");
        resultScreen.style.display = "none";
    };

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    newGameButton.addEventListener("click", handleRestartGame);
    playAgainButton.addEventListener("click", handleRestartGame);
});
