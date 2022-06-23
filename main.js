//custom initialization
class Counter {
  constructor(minutes = 0, seconds = 0, milliseconds = 0) {
    this.minutes = minutes;
    this.seconds = seconds;
    this.milliseconds = milliseconds;

    this.startTimer = function () {
      this.milliseconds++;
      if (this.milliseconds > 99) {
        this.seconds++;
        this.milliseconds = 0;
      }
      if (this.seconds > 59) {
        this.minutes++;
        this.seconds = 0;
      }
    };
  }
}

const timer = document.querySelector(".timer");
const tracker = document.querySelector(".laps");
const startBtn = document.querySelector(".startBtn");
const pauseBtn = document.querySelector(".stopBtn");
const resetBtn = document.querySelector(".resetBtn");
const lapBtn = document.querySelector(".lapBtn");
let isCounting = false;
let interval;
let laps = [];
let curr_counter;
let counter = new Counter();


startBtn.addEventListener("click", (event) => {
  isCounting = true;
  if (!laps.length) {
    addLaps();
  }
  interval = setInterval(() => {
    counter.startTimer();
    curr_counter.startTimer();
    updateCounter();
    updateLaps();
  }, 10);
});


pauseBtn.addEventListener("click", () => {
  isCounting = false;
  clearInterval(interval);
  updateCounter();
});


resetBtn.addEventListener("click", () => {
  isCounting = false;
  counter.minutes = 0;
  counter.seconds = 0;
  counter.milliseconds = 0;
  laps = [];
  updateLaps();
  updateCounter();
  resetBtn.style.display = "none";
  lapBtn.style.display = "block";
});

//
function updateCounter() {
  startBtn.style.display = isCounting ? "none" : "block";
  pauseBtn.style.display = isCounting ? "block" : "none";
  resetBtn.style.display = isCounting ? "none" : "block";
  lapBtn.style.display = isCounting ? "block" : "none";

  timer.innerHTML = `
      <span class = "minutes">${doubleDigits(counter.minutes)}</span>:<span class="seconds">${doubleDigits(
    counter.seconds
  )}</span>.<span class= "milliseconds">${doubleDigits(
    counter.milliseconds
  )}</span>
 `;
}

function updateLaps() {
  tracker.innerHTML = laps.map(
    (lap, index) => `
     <div class="lap-data">
       <span>Lap ${index + 1}</span><span>${doubleDigits(lap.minutes)}:${doubleDigits(lap.seconds)}:${doubleDigits(lap.milliseconds)}</span>
     </div>
     <hr>`
     
  )
    .reverse()
    .join(" ");
}

function addLaps() {
  curr_counter = new Counter();
  laps = [...laps, curr_counter];
}

//  slice(-2) extracts the last two elements in the sequence, adding "0" if string is a single char
function doubleDigits(num) {
  return ("0" + num).slice(-2);
}


lapBtn.addEventListener("click", addLaps);
