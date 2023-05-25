'use strict'

// click play button begins the game
const COUNT_CARROT = 8;
const COUNT_BUG = 10;
const OBJ_HEIGHT = 70, OBJ_WIDTH = 70;
const SECONDS = 10;
const POPUP_TEXT = 'REPLAY?'

const playBtn = document.querySelector('.game__play-btn');
const gameField = document.querySelector('.game__field');
const gameFieldRect = gameField.getBoundingClientRect();
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

let started = false;
let score = 0;
let timer = undefined;

playBtn.addEventListener('click', event => {
  const target = event.target;
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

function startGame() {
  showTimerAndScore();
  countDown(SECONDS);
  showStopBtn();
  generateObjects('img/carrot.png', 'carrot', 'game__carrot', COUNT_CARROT);
  generateObjects('img/bug.png', 'bug', 'game__bug', COUNT_BUG);
}

function stopGame() {
  stopTimer();
  playBtn.classList.add('game__play-btn--hide');
  showPopUpWithText(POPUP_TEXT);
}

function showStopBtn() {
  const icon = playBtn.querySelector('.fa-play');
  icon.classList.remove('fa-play');
  icon.classList.add('fa-stop');
}

function showTimerAndScore() {
  gameTimer.classList.remove('game__timer--hide');
  gameTimer.textContent = `0:${SECONDS}`;
  gameScore.classList.remove('game__score--hide');
  gameScore.textContent = `${COUNT_CARROT}`;
}

function countDown(seconds) {
  timer = setInterval(() => {
    seconds--;
    gameTimer.textContent = `0:${seconds}`;
    if (seconds === 0) stopTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function showPopUpWithText(text) {
  popUp.classList.remove('pop-up--hide');
  popUpMessage.textContent = text;
}

function getRandomPosition(boundX, boundY) {
  const x = Math.floor(Math.random() * (boundX - OBJ_WIDTH));
  const y = Math.floor(Math.random() * (boundY - OBJ_HEIGHT));
  return [x, y];
}

function generateObjects(src, alt, className, count) {
  for (let i = 0; i < count; i++) {
    const position = getRandomPosition(gameFieldRect.width, gameFieldRect.height);
    const img = document.createElement('img');
    img.setAttribute('src', src);
    img.setAttribute('alt', alt);
    img.setAttribute('class', className);
    img.setAttribute('style', `top:${position[1]}px; left:${position[0]}px;`);
    gameField.appendChild(img);
  }
}