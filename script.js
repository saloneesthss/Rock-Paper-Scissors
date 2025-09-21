let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    losses: 0,
    ties: 0,
};

updateScore();

// Adding events to buttons and keys
document.querySelector('.rock-btn').addEventListener("click", () => {
    playGame('rock');
});

document.querySelector('.paper-btn').addEventListener("click", () => {
    playGame('paper');
});

document.querySelector('.scissors-btn').addEventListener("click", () => {
    playGame('scissors');
});

document.body.addEventListener("keydown", (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    }
});

const resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener("click", () => {
    score.wins=0; 
    score.losses=0; 
    score.ties=0; 
    localStorage.removeItem('score'); 
    updateScore();
});

const autoplayBtn = document.querySelector('.auto-play-btn');
autoplayBtn.addEventListener("click", () => {
    autoPlay();
});

// Logic of game
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

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
            autoplayBtn.innerText = 'Stop Autoplay';
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        autoplayBtn.innerText = 'Auto Play';
    }
}
