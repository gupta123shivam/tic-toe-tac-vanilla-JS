let editedPlayer = 0;
let gameOver = false;

const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
]

// players data
const players = [
  {
    name: '',
    symbol: 'X'
  },
  {
    name: '',
    symbol: 'O'
  }
];

const startGameBtn = document.querySelector('#start-button') // start game button
const gameBoard = document.querySelector('#active-game') // game-Board
const gameFields = document.querySelectorAll('#game-board li') // buttons of gameBoard
const activePlayerName = document.querySelector('.active-player-name') // active player name
const winnerName = document.querySelector('.winner__banner h3 span');
const winnerBanner = document.querySelector('.winner__banner');


const playerConfigOverlay = document.querySelector('#config-overlay')
const backdropEl = document.querySelector('#backdrop')
const formEl = document.querySelector('form')

const message = document.querySelector('.message') // for displaying message

const editPlayer1Btn = document.querySelector('.edit__button-1');
const editPlayer2Btn = document.querySelector('.edit__button-2');

const playerName = document.querySelector('#player-name')

const cancelConfigBtn = document.querySelector('.modal__button-cancel')
const confirmConfigBtn = document.querySelector('.modal__button-confirm')

editPlayer1Btn.addEventListener('mousedown', openPlayerConfig);
editPlayer2Btn.addEventListener('mousedown', openPlayerConfig);

cancelConfigBtn.addEventListener('click', closePlayerConfig);
backdropEl.addEventListener('click', closePlayerConfig);

formEl.addEventListener('submit', savePlayerConfig);

startGameBtn.addEventListener('click', startNewGame);