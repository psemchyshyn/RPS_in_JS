const root = document.getElementsByClassName("container")[0];
const intro = document.getElementsByClassName("intro")[0];
const main = document.getElementsByClassName("main")[0];
const startGame = document.getElementById("start");
const exitGame = document.getElementById("exit");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const computerScoreTag = document.getElementById("computer_score");
const userScoreTag = document.getElementById("player_score");
const message = document.querySelector(".message p");
const computerImg = document.querySelector(".computerImg img")
const playerImg = document.querySelector(".playerImg img")


var userScore = 0;
var computerScore = 0;


// launch starting screen
(function(){
    root.removeChild(main);
    console.log("play");
})();

// changes screen play/exit
function changeScreen(startGame=true){
    if (startGame){
        root.replaceChild(main, intro)
    }
    else {
        root.replaceChild(intro, main)
    }
};


function start(){
    changeScreen(true)
};


function finish(){
    changeScreen(false)
    computerScore = 0
    userScore = 0
    computerScoreTag.innerHTML = 0
    userScoreTag.innerHTML = 0
    message.innerHTML = ""
};


// main game logic stored
function game(userChoice){
    let computerChoice = getComputerChoice();
    changeImage(userChoice, playerImg)
    changeImage(computerChoice, computerImg)
    if (getWinner(userChoice, computerChoice) == "computer"){
        computerScoreTag.innerHTML = ++computerScore;
        message.innerHTML = "Computer smashed you"
    }
    else if (getWinner(userChoice, computerChoice) == "user"){
        userScoreTag.innerHTML = ++userScore;
        message.innerHTML = "You won!"
    }
    else {
        message.innerHTML = "Draw"
    }
};


// finds random computer move
function getComputerChoice(){
    let choices = ["r", "p", "s"]
    let randomChoice = Math.floor(Math.random(0, 1)*3)
    return choices[randomChoice]
}


// decides, who won the game
function getWinner(userChoice, computerChoice){
    switch (userChoice + computerChoice){
        case "pp":
        case "rr":
        case "ss":
            return "draw";
        case "pr":
        case "sp":
        case "rs":
            return "user";
        case "rp":
        case "pr":
        case "sr":
            return "computer"; 
    }
}


// makes the image movement
function animate(upperBound=0, lowerBound=-50) {
    var currentState = -100;
    var isUp = false;
    var start = new Date().getSeconds()
    function fluctuate(){
        playerImg.style.top = currentState + "px"
        computerImg.style.top = currentState + "px"
        if ((!isUp && currentState < upperBound) || currentState < lowerBound) {
            currentState = currentState + 10
            isUp = false
        }
        else {
            isUp = true
            currentState = currentState - 10
        }
        now = new Date().getSeconds()
        if ((now - start) < 2) requestAnimationFrame(fluctuate)
    }
    return requestAnimationFrame(fluctuate)
}


// Place the correct image
function changeImage(move, player) {
    player.style.top = -50 + "px";
    switch (move) {
        case "r":
            player.src = "./images/rock.png"
            return;
        case "p":
            player.src = "./images/paper.png"
            return;
        case "s":
            player.src = "./images/scissors.png"
            return;
    }
}


// Runs the game 
function run(move) {
    changeImage("r", computerImg)
    changeImage("r", playerImg)
    animate()
    setTimeout(function(){game(move)}, 1900)
}


// Events for DOM nodes for triggering the game events
startGame.addEventListener("click", start)
exitGame.addEventListener("click", finish)
rock.addEventListener("click", function(){run("r")})
paper.addEventListener("click", function(){run("p")})
scissors.addEventListener("click", function(){run("s")})
