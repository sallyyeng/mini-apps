const options = ['red', 'green', 'yellow'];
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');

const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');

let colorCounter = 1;
let colorInterval;

const resetLights = () => {
  red.style.opacity = 0.35;
  yellow.style.opacity = 0.35;
  green.style.opacity = 0.35;
};

const switchLights = () => {
  resetLights();

  if (colorCounter === 1) {
    red.style.opacity = 1;
    colorCounter = 2;
  } else if (colorCounter === 2) {
    green.style.opacity = 1;
    colorCounter = 3;
  } else if (colorCounter === 3) {
    yellow.style.opacity = 1;
    colorCounter = 1;
  }
};

const startLights = function() {
  colorInterval = setInterval(switchLights, 2000);
};

const stopLights = function() {
  clearInterval(colorInterval);
  resetLights();
};

startButton.addEventListener('click', startLights);
stopButton.addEventListener('click', stopLights);
