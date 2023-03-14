
function openPlayerConfig(e){  
  playerConfigOverlay.style.display = 'block';
  backdropEl.style.display = 'block';

  // shifting focus immediatly to player name input field
  playerName.focus();

  // removing focus from button
  e.target.blur();

  // extracting playerid from data attribute
  editedPlayer = Number(e.target.dataset.playerid);
}

function closePlayerConfig(){
  playerConfigOverlay.style.display = 'none';
  backdropEl.style.display = 'none';
  removeErrorMessage();
}

const savePlayerConfig = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  // entered player name
  const enteredPlayerName = formData.get('player-name').trim();
  
  if(enteredPlayerName.length < 3){
    message.innerHTML = "Enter valid 3 alphabet Name !!";
    message.classList.add('error');  // making error visible

    return;
  }

  // Checking if name already exist or not
  for (const playerData of players){
    if (playerData.name === enteredPlayerName){
      message.innerHTML = "Enter Different Name!!!";
      message.classList.add('error');

      return;
    }
  }
  
  // updating the player name on screen
  const updatedPlayerDataEl = document.querySelector(`#player-${editedPlayer}`)
  updatedPlayerDataEl.children[1].textContent = enteredPlayerName;

  // Saving player name in JS object
  players[editedPlayer-1].name = enteredPlayerName;

  // Resetting the form and closing th modal
  formEl.reset();
  closePlayerConfig();
}

function removeErrorMessage(){
  message.innerHTML = '';
  message.classList.remove('error');  // making error message invisble
}