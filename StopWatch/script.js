let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.querySelector('.display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.querySelector('.laps');

function timeToString(time) {
  let hrs = Math.floor(time / 3600000);
  let mins = Math.floor((time % 3600000) / 60000);
  let secs = Math.floor((time % 60000) / 1000);
  let ms = Math.floor((time % 1000) / 10);

  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
}

function updateDisplay() {
  display.textContent = timeToString(elapsedTime);
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);
  isRunning = true;
  startStopBtn.textContent = 'Stop';
}

function stop() {
  clearInterval(timerInterval);
  isRunning = false;
  startStopBtn.textContent = 'Start';
}

function reset() {
  stop();
  elapsedTime = 0;
  updateDisplay();
  lapsList.innerHTML = '';
}

function recordLap() {
  if (!isRunning) return;
  const li = document.createElement('li');
  li.textContent = `Lap ${lapsList.children.length + 1}: ${timeToString(elapsedTime)}`;
  lapsList.appendChild(li);
}

startStopBtn.addEventListener('click', () => {
  isRunning ? stop() : start();
});

resetBtn.addEventListener('click', reset);

lapBtn.addEventListener('click', recordLap);
