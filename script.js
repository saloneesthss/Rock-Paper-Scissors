let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    losses: 0,
    ties: 0,
};

updateScore();

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = "";
    if (playerMove === "rock") {
        if (computerMove === "rock") {
            result = "Tie.";
        } else if (computerMove === "paper") {
            result = "You Lose.";
        } else if (computerMove === "scissors") {
            result = "You Win.";
        }
    } else if (playerMove === "paper") {
        if (computerMove === "rock") {
            result = "You Win.";
        } else if (computerMove === "paper") {
            result = "Tie.";
        } else if (computerMove === "scissors") {
            result = "You Lose.";
        }
    } else if (playerMove === "scissors") {
        if (computerMove === "rock") {
            result = "You Lose.";
        } else if (computerMove === "paper") {
            result = "You Win.";
        } else if (computerMove === "scissors") {
            result = "Tie.";
        }
    }

    if (result === "You Win.") {
        score.wins += 1;
    } else if (result === "You Lose.") {
        score.losses += 1;
    } else if (result === "Tie.") {
        score.ties += 1;
    }

    localStorage.setItem("score", JSON.stringify(score));
    updateScore();
    document.querySelector(".js-result").innerHTML = result;
    document.querySelector(".js-moves").innerHTML = `You 
        <img src="images/${playerMove}-emoji.png" alt="Player Move" class="icon">
        <img src="images/${computerMove}-emoji.png" alt="Computer Move" class="icon">
        Computer`;
}

function updateScore() {
    document.querySelector(".js-score").innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const randomNo = Math.random();
    let computerMove = "";
    if (randomNo >= 0 && randomNo < 1 / 3) {
        computerMove = "rock";
    } else if (randomNo >= 1 / 3 && randomNo < 2 / 3) {
        computerMove = "paper";
    } else if (randomNo >= 2 / 3 && randomNo < 1) {
        computerMove = "scissors";
    }
    return computerMove;
}
