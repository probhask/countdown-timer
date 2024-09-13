// getting the element references

// time input
const hourInput = document.getElementById("hour");
const minuteInput = document.getElementById("minute");
const secondInput = document.getElementById("second");
// play btn
const playBtn = document.getElementById("play");
// pause btn
const pauseBtn = document.getElementById("pause");
// reset btn
const resetBtn = document.getElementById("reset");
// pop up
const popupDiv = document.querySelector(".popup");
const popSign = document.querySelector(".sign").firstElementChild;
const popMessage = document.querySelector(".message");
const popBtn = document.querySelector(".button");
// pop icon
const successIcon = "fa-check-circle";
const errorIcon = "fa-warning";

// interval Id
let intervalId = "";

// validate time
const validateTime = (hour, minute, second) => {
  let isValid = true;
  if (hour < 0 || minute < 0 || second < 0) {
    isValid = false;
  }
  if (second > 60) {
    isValid = false;
  }
  if (minute > 60) {
    isValid = false;
  }
  return isValid;
};

//pop message display
const popUP = (message, sign) => {
  popupDiv.classList.add("pop-in");
  popSign.className = `fa-solid ${sign}`;
  //   if (popSign.classList.contains("fa-check-circle")) {
  if (sign === "fa-check-circle") {
    popSign.style.color = "green";
  } else {
    popSign.style.color = "red";
  }
  popMessage.innerHTML = message;
};
//pop up remove
popBtn.addEventListener("click", () => {
  popupDiv.classList.remove("pop-in");
  popSign.classList.remove("fa-check-circle");
  popSign.classList.remove("fa-warning");
});

//reset button functionality
const resetTimer = () => {
  clearInterval(intervalId);
  // play pause Toggle
  playBtn.parentElement.classList.remove("hidden");
  pauseBtn.parentElement.classList.add("hidden");
  // set initial
  hourInput.value = "00";
  minuteInput.value = "00";
  secondInput.value = "00";
};

const playFunc = () => {
  // disable the input
  hourInput.disabled = true;
  minuteInput.disabled = true;
  secondInput.disabled = true;
  // get input value
  let hour = Number(hourInput.value);
  let minute = Number(minuteInput.value);
  let second = Number(secondInput.value);
  console.log(hour, minute, second);
  //times format is not valid
  if (!validateTime(hour, minute, second)) {
    popUP("Enter a valid time", errorIcon);
    return;
  }
  // valid time go ahead
  // play pause Toggle
  playBtn.parentElement.classList.add("hidden");
  pauseBtn.parentElement.classList.remove("hidden");

  // run Time
  function runTime() {
    if (hour === 0 && minute === 0 && second === 0) {
      resetTimer();
      popUP("Time's Up", successIcon);
    } else {
      if (second === 0) {
        second = 59;
        if (minute === 0) {
          minute = 59;
          hour--;
        } else {
          minute--;
        }
      } else {
        second--;
      }
    }

    // update timer UI
    hourInput.value = hour.toString().padStart(2, 0);
    minuteInput.value = minute.toString().padStart(2, 0);
    secondInput.value = second.toString().padStart(2, 0);
  }
  intervalId = setInterval(runTime, 1000);
};
// play button click add event
playBtn.addEventListener("click", playFunc);
// resetBtn event
resetBtn.addEventListener("click", resetTimer);
// reset btn

// pause btn event
pauseBtn.addEventListener("click", () => {
  if (pauseBtn.style.display !== "none") {
    clearInterval(intervalId);
    // play pause Toggle
    playBtn.parentElement.classList.remove("hidden");
    pauseBtn.parentElement.classList.add("hidden");

    // enable the input
    hourInput.disabled = false;
    minuteInput.disabled = false;
    secondInput.disabled = false;
  }
});
