
// ======================== Closures for saving the active player
const switchPlayer = function(){
  let activePlayer = 1;

  return {
    resetActivePlayer(){
      activePlayer = 1;
    },

    changeActivePlayer(){
      if(activePlayer == 1){
        activePlayer = 2 // Player 2
      }else{
        activePlayer = 1 // Player 1
      }
  
      // Updating player name
      activePlayerName.textContent = players[activePlayer-1].name;
  
      return activePlayer;
    }
  }
}();

// ======================== Closures for saving the current Round
const round = function(){
  let currentRound = 0;

  return {
    getCurrentRound(){
      return currentRound;
    },

    increaseCurrentRound(){
      currentRound++;
    },
    resetCurrentRound(){
      currentRound = 0;
    }
  };
}();

// =====================Resetting Game Board ==================
function resetGameStatus(){
  switchPlayer.resetActivePlayer();
  round.resetCurrentRound();  
  // winnerBanner.firstElementChild.innerHTML = `You Won! <span id="winner-name"></span>`;
  winnerBanner.classList.remove('show-winner');

  for (let i=0; i<3; i++){   // resetting gameData
    for(let j = 0; j < 3; j++){
      gameData[i][j] = 0;
    }
  }

  gameOver = false;

  gameFields.forEach(n => {
    n.textContent='';
    n.classList.remove('disabled');
  });
}


// ======================Start New Game =========================
function startNewGame(){
  // checking if player names are valid
  if (players[0].name=='' || players[1].name==''){
    alert('Please set custom player names for both player')
    return;
  }

  resetGameStatus();
  gameFields.forEach(n => n.addEventListener('click', selectGameField))

  // Updating player name
  activePlayerName.textContent = players[0].name;
  gameBoard.classList.add('show-game')
}

// ==================== Field Click =====================
function selectGameField(e){
  const field = e.target;

  // not allowing to overwrite already filled field
  // if(field.textContent.trim() != ''){
  //   return;
  // }

  const row =  Math.ceil(Number(field.dataset.num) / 3) - 1 ;
  const col = Number(field.dataset.num) - 3*row - 1;

  // not allowing to overwrite already filled field or when game is finished
  if(gameOver || gameData[row][col]){
    return;
  }

  const activePlayer = switchPlayer.changeActivePlayer();

  field.textContent = players[activePlayer-1].symbol;
  field.classList.add('disabled');
  
  gameData[row][col] = activePlayer;
  round.increaseCurrentRound(); // incrementing currentRound

  const winnerID = isGameOver();
  if(winnerID !== 0){     // calling endGame if winner is found or round==9
    endGame(winnerID);
  }
}

function isGameOver(){

  for (let i= 0; i < 3; i++){     // Check for winner in rows
    if(
      gameData[i][0] > 0 &&
      gameData[i][0] ==gameData[i][1] &&
      gameData[i][1] == gameData[i][2]
    ){
      return gameData[i][0];
    }
  }

  for (let i= 0; i < 3; i++){   // Check for winner in rows
    if(
      gameData[0][i] > 0 &&
      gameData[0][i] == gameData[1][i] &&
      gameData[1][i] == gameData[2][i]
    ){
      return gameData[i][0];
    }
  }

  // Check for winner in diagonal
  if(
    gameData[0][0] > 0 &&
    gameData[0][0] == gameData[1][1] &&
    gameData[1][1] == gameData[2][2]
  ){
    return gameData[0][0];
  }

  if(
    gameData[2][0] > 0 &&
    gameData[2][0] == gameData[1][1] &&
    gameData[1][1] == gameData[0][2]
  ){
    return gameData[2][0];
  }

  if(round.getCurrentRound()==9){
    return -1;  // game over, but no winner
  }


  return 0;  // game not over yet
}

function endGame(winnerID){
  winnerBanner.classList.add('show-winner')
  if(winnerID > 0){  // when winner
    gameOver = true;
    winnerName.textContent = players[winnerID-1].name;
  }
  
  if(winnerID == -1){  // when no winner
    winnerBanner.firstElementChild.textContent = `It's a draw!`;
  }
}