const playSummary = {
    gameNumbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}

const game = {
    playerChoice: null,
    computer: null,
}

const imgs = document.querySelectorAll(".images img");
const btn = document.querySelector(".start");
const btnReset = document.querySelector(".newGame");
let leftBarYourChoice = document.querySelector(`[data-summary ="yourChoice"]`);
let computerChoiceSummary = document.querySelector(`[data-summary ="computerChoice"]`);
let gameNumbersSummary = document.querySelector(`p.gameNumber span`);
let wins = document.querySelector(`p.wins span`);
let winnerSummary = document.querySelector(`[data-summary="winner"]`)
let losses = document.querySelector(`p.losses span`);
let draws = document.querySelector(`p.draws span`);


// ----------------------img choice------------------------------------------------------
function getChoice() {
    game.playerChoice = this.dataset.option;
    imgs.forEach(img => img.style.boxShadow = "");
    this.style.boxShadow = `0 0 0 2px grey`;
}

imgs.forEach(img => {
    img.addEventListener("click", getChoice)
});

// ------------------computer choice ----------------------------------------------------
function computerChoice() {
    const randomComputerChoice = imgs[Math.floor(Math.random() * 3)].dataset.option;
    return randomComputerChoice;
    // return imgs[Math.floor(Math.random() * 3)].dataset.option; 
}
// -----------------comparison results----------------------------------------------------

function checkResult(player, computer) {
    if (player === computer) {
        return "draw"
    } else if (
        (player === "papier" && computer === "kamień") || (player === "nożyczki" && computer === "papier") || (player === "kamień" && computer === "nożyczki")
    ) {
        return "win";
    } else {
        return "lost"
    }
}
// ------------------publishing results-------------------
function publishGameResult(player, computer, result) {

    leftBarYourChoice.textContent = ` ${player}`;
    computerChoiceSummary.textContent = ` ${computer}`;
    gameNumbersSummary.textContent = ` ${++playSummary.gameNumbers}`;

    if (result === "win") {
        wins.textContent = ++playSummary.wins;
        winnerSummary.textContent = ` Gratuluję. Wygrałeś!`;
    } else if (result === "lost") {
        // playSummary.losses++;
        losses.textContent = ++playSummary.losses;
        winnerSummary.textContent = ` Przegrałeś`;

    } else {
        // playSummary.draws++;
        draws.textContent = ++playSummary.draws;
        winnerSummary.textContent = ` REMIS`;
    };
}
// ----------------------------- reset choices---------------------------
function resetGame() {
    document.querySelector(`[data-option="${game.playerChoice}"]`).style.boxShadow = "";
    game.playerChoice = "";
    game.computer = "";
}

// --------------------------directive funkction-----------------------
function gameStart() {
    if (!game.playerChoice) return alert("WYBIERZ OPCJĘ!!!");
    game.computer = computerChoice();
    const gameResult = checkResult(game.playerChoice, game.computer);
    publishGameResult(game.playerChoice, game.computer, gameResult);
    resetGame();
}

btn.addEventListener("click", gameStart);

function gameReset() {
    console.log(playSummary);
    playSummary.gameNumbers = 0;
    playSummary.wins = 0;
    playSummary.losses = 0;
    playSummary.draws = 0;
    game.computer = null;
    game.playerChoice = null;
    leftBarYourChoice.textContent = game.playerChoice;
    computerChoiceSummary.textContent = game.computer;
    gameNumbersSummary.textContent = playSummary.gameNumbers;
    wins.textContent = playSummary.wins
    winnerSummary.textContent = "";
    losses.textContent = playSummary.losses;
    draws.textContent = playSummary.draws;
}

btnReset.addEventListener("click", gameReset);