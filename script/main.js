const lapBtn = document.getElementById('lapBtn');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const lapRecord = document.getElementById('lapRecord');

let [minutes, seconds, centi] = [0, 0, 0];
let [lapMin, lapSec, lapCenti] = [0, 0, 0];
let lapRound = null;
let lapCounter = 1;
let interval = null;

//this doesn't work anymore
//i replaced all 3 spans with just one, so I need to get rid of centi, sec etc...
const start = () => {
  centi++;
  if (centi < 10) displayCenti = "0" + centi.toString();
  else displayCenti = centi;

  if (seconds < 10) displaySec = "0" + seconds.toString();
  else displaySec = seconds;

  if (minutes < 10) displayMins = "0" + minutes.toString();
  else displayMins = minutes;

  if (centi / 60 === 1) {
    seconds++;
    centi = 0;

  if (seconds / 60 === 1) {
      minutes++;
      seconds = 0;
    }
  }
  timerSec.innerHTML = displaySec;
  timerMins.innerHTML = displayMins;
  timerCenti.innerHTML = displayCenti;
}

const startStop = () => {
  startStopBtn = document.getElementById("startBtn");
  startStopTxt = startStopBtn.innerText;
  resetLapBtn = document.getElementById("lapBtn");
  if (startStopTxt === "Stop") {    
      startStopBtn.className = "start";
      startStopBtn.innerText = "Start";
      resetLapBtn.innerText = "Reset";
  } else if (startStopTxt === "Start") {
      startStopBtn.className = "stop";
      startStopBtn.innerText = "Stop";
      resetLapBtn.innerText = "Lap";
      start();
  }
};

const reset = () => {
  timer.innerHTML = '00:00.00';
  [minutes, seconds, centi] = [0, 0, 0];
}


//need to fix my zero intervals
function lap() {
  lapNow = `<div class="lap">${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')} : ${centi.toString().padStart(2, '0')}</div>`;
  lapRecord.innerHTML += lapNow;
}

//this function will revert all of the colors back to the original
/*function changeColor() {
  //need to change from green start to red stop back and forth
  //
  const theToggle = document.getElementById("startBtn");
  const toggleStatus = theToggle.dataset.status;
  switch (toggleStatus) {
    case "off":
      theToggle.dataset.status = "on";
      theToggle.style.color = "white";
      theToggle.style.backgroundColor = "green";
      break;
    case "on":
      theToggle.dataset.status = "off";
      theToggle.style.color = "black";
      theToggle.style.backgroundColor = "red";
      break;
  }

}*/

lapBtn.addEventListener('click', lap);
startBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);

