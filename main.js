'use strict'

// click play button begins the game
const COUNT_CARROT = 10;
const COUNT_BUG = 10;
const OBJ_HEIGHT = 70, OBJ_WIDTH = 70;
const playBtn = document.querySelector('.game__play-btn');
const gameField = document.querySelector('.game__field');
const gameFieldRect = gameField.getBoundingClientRect();

playBtn.addEventListener('click', event => {
  const target = event.target;
  if (!target.classList.contains('playing')) {
    target.classList.add('playing');
    generateObjects('img/carrot.png', 'carrot', 'game__carrot', COUNT_CARROT);
    generateObjects('img/bug.png', 'bug', 'game__bug', COUNT_BUG);
  }
});

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