/*-------------------------------- Constants --------------------------*/
winningArrays = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
tieArrays = [

]



/*---------------------------- Variables (state) -----------------------*/
let board = []
let isTurn;
let isWinner;
let playerOne = "";
let playerTwo = "";


/*------------------------ Cached Element References -------------------*/
const sZero = document.querySelector("#sq0")
const sOne = document.querySelector("#sq1")
const sTwo = document.querySelector("#sq2")
const sThree = document.querySelector("#sq3")
const sFour = document.querySelector("#sq4")
const sFive = document.querySelector("#sq5")
const sSix = document.querySelector("#sq6")
const sSeven = document.querySelector("#sq7")
const sEight = document.querySelector("#sq8")
const allSquares = document.querySelectorAll(".squares")

const resetBtn = document.querySelector("#reset-button")
const newPlayersBtn = document.querySelector("#player-reset-button")

const message = document.querySelector("#message")
const winMessage = document.querySelector("#win-message")
const gameState = document.querySelector("#game-state")
const enterprise = document.querySelector("#enterprise")



/*----------------------------- Event Listeners -----------------------*/

allSquares.forEach(function(square, index){
  square.addEventListener("click", handleClick)
})

resetBtn.addEventListener("click", init)
newPlayersBtn.addEventListener("click", getPlayerNames)
/*-------------------------------- Functions ---------------------------*/
getPlayerNames()

function getPlayerNames(){
  playerOne = window.prompt("Enter the name of the Captain who will defend Federation space:");
  playerTwo = window.prompt("Enter the name of the Borg drone assimilating this game:");
  init();
  console.log(playerOne)
}

function init(){
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  isTurn = -1;
  isWinner = null;
  resetBtn.setAttribute("hidden", true)
  newPlayersBtn.setAttribute("hidden", true)
  whosTurn();
  render();
}

function whosTurn(){
  isTurn = (isTurn * -1)
}

function render() {
  board.forEach(function(square, index){
    let squareDiv = document.querySelector(`#sq${index}`);
    if (square === 0) squareDiv.innerText = "";
    if (square === 1) squareDiv.innerText = "🖖";
    if (square === -1) squareDiv.innerText = "🟩";
  })
  if (isTurn === 1){
    gameState.innerText = `Captain ${playerOne}'s turn!`
  } if (isTurn === -1){
    gameState.innerText = `${playerTwo} of Borg's turn`
  }
  if (isWinner === 1 || -1){
    renderWinner(); return}
  if (isWinner === 'T'){
    renderTie(); return} 
}

function renderWinner() {
  const neverForget = new Audio("../Audio/never.wav")
  const borgPrevail = new Audio("../Audio/Borg-have-prevailed.mp3")
  if(isWinner === 1){
    gameState.innerText = `Captain ${playerOne} saved the Federation! Congratulations!`;
    neverForget.play();
  } else if 
    (isWinner === -1) {
      gameState.innerText = `${playerTwo} of Borg has assimilated this game! Noone can resist us!`;
    borgPrevail.play();
  } else {
    return
  }
}

function renderTie() {
  gameState.innerText = `Tie Game! Engage Again!`
}

function handleClick(event) {
  resetBtn.removeAttribute("hidden")
  newPlayersBtn.removeAttribute("hidden")
  let index = event.target.id[2]
  if (isWinner !== null){ 
    return
  } else if (board[index] === 0) {
    board[index] = isTurn
    getWinner()
    checkTie()
    whosTurn()
    render()
  } else {
    return
  }
}

function getWinner(){
  let sum = 0
  winningArrays.forEach(function(array){
    sum = array.reduce(function (previousValue, currentValue){
      return previousValue + board[currentValue]
    }, 0)
    if (Math.abs(sum) === 3){
      let winner = board[array[1]]
      isWinner = winner;
      console.log(board[array[1]])
      console.log(array)
    }
  });
}

function checkTie(){
  if (board.includes(0)){
  return}else
  {isWinner = "T"}
  render()
}