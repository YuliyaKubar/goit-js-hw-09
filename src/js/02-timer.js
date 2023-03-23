import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

btnEl.setAttribute(`disabled`, true);
btnEl.addEventListener('click', onStartTimer);

let chooseDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onChooseValidDate(selectedDates[0]);
    console.log(selectedDates[0]);
  },
};

function onChooseValidDate(selectedDates) {
  chooseDate = selectedDates.getTime();
  if (selectedDates < Date.now()) {
    Notify.failure('Please choose a date in the future');
  }

  if (selectedDates >= Date.now()) {
    btnEl.removeAttribute('disabled');
  }
}

function onStartTimer() {
  timerId = setInterval(startTimer, 1000);
  btnEl.setAttribute(`disabled`, true);
  inputEl.setAttribute(`disabled`, true);
}

function startTimer() {
  const differentDate = chooseDate - Date.now();
  const formatDate = convertMs(differentDate);
  renderDate(formatDate);
  if (secondsEl.textContent === '00' && minutesEl.textContent === '00') {
    Notify.success('Time end');
    clearInterval(timerId);
  }
}

function renderDate({ days, hours, minutes, seconds }) {
  secondsEl.textContent = addLeadingZero(seconds);
  minutesEl.textContent = addLeadingZero(minutes);
  hoursEl.textContent = addLeadingZero(hours);
  daysEl.textContent = addLeadingZero(days);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr(inputEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
