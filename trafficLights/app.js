const options = ['green', 'yellow', 'red'];
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');

let currLightIndex = 0;
let prevLightIndex;
let colorInterval;

const resetLights = () => {
  let prevLight = document.querySelector(`.${options[prevLightIndex]}`);
  prevLight.style.opacity = 0.35;
};

const switchLights = () => {
  // if a light is on, turn it off
  prevLightIndex || prevLightIndex === 0 ? resetLights() : null;

  // turn on next light
  let currLight = document.querySelector(`.${options[currLightIndex]}`);
  currLight.style.opacity = 1;

  // set current light to previous light, increment current light
  prevLightIndex = currLightIndex;
  currLightIndex = currLightIndex === 2 ? 0 : currLightIndex += 1;
};

const startLights = function() {
  colorInterval = setInterval(switchLights, 1000);
};

const stopLights = function() {
  clearInterval(colorInterval);
  resetLights();
};

startButton.addEventListener('click', startLights);
stopButton.addEventListener('click', stopLights);
