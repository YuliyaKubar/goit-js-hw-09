const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onStartColor);
stopBtn.addEventListener('click', onStopColor);

let changeId = null;

function onStartColor() {
  changeId = setInterval(
    () => (bodyEl.style.backgroundColor = getRandomHexColor()),
    1000
  );
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function onStopColor() {
  clearInterval(changeId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
