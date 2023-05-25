'use strict'

// click play button begins the game
const COUNT_CARROT = 5;
const COUNT_BUG = 10;
const OBJ_HEIGHT = 70, OBJ_WIDTH = 70;
const SECONDS = 5;
const WON = 'YOU WON!';
const LOST = 'YOU LOST!';
const REPLAY = 'REPLAY?';

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

playBtn.addEventListener('click', () => {
  if (started) {
    stopGame(REPLAY);
  } else {
    startGame();
  }
});

popUpRefresh.addEventListener('click', () => {
  hidePopUp();
  startGame();
});

gameField.addEventListener('click', event => {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches('.game__carrot')) {
    target.remove();
    score++;
    updateScore();
    
    if (score === COUNT_CARROT) {
      stopGame(WON);
    }
  } else if (target.matches('.game__bug')) {
    stopGame(LOST);
  }
});

function startGame() {
  started = true;
  gameField.innerHTML = '';
  gameField.classList.remove('game__field--stop');
  showTimerAndScore();
  startTimer(SECONDS);
  showStopBtn();
  generateObjects('img/carrot.png', 'carrot', 'game__carrot', COUNT_CARROT);
  generateObjects('img/bug.png', 'bug', 'game__bug', COUNT_BUG);
}

function stopGame(text) {
  started = false;
  score = 0;
  gameField.classList.add('game__field--stop');
  stopTimer();
  hidePlayBtn();
  showPopUpWithText(text);
}

function hidePlayBtn() {
  playBtn.classList.add('game__play-btn--hide');
}

function showStopBtn() {
  playBtn.classList.remove('game__play-btn--hide');
  const icon = playBtn.querySelector('i');
  icon.classList.remove('fa-play');
  icon.classList.add('fa-stop');
}

function showTimerAndScore() {
  gameTimer.classList.remove('game__timer--hide');
  gameScore.classList.remove('game__score--hide');
  gameScore.textContent = `${COUNT_CARROT}`;
}

function startTimer(seconds) {
  updateTimer(seconds);
  timer = setInterval(() => {
    updateTimer(--seconds);
    if (seconds <= 0) stopGame(LOST);
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function updateTimer(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.textContent = `${minutes}:${seconds}`;
}

function updateScore() {
  gameScore.textContent = COUNT_CARROT - score;
}

function showPopUpWithText(text) {
  popUp.classList.remove('pop-up--hide');
  popUpMessage.textContent = text;
}

function hidePopUp() {
  popUp.classList.add('pop-up--hide');
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