"use strict";
"use strict";
import { WORDS } from "./words.js";

// VARIABLES
let randInt = Math.floor(Math.random() * WORDS.length);
let word = WORDS[randInt];
word = "grape";

let curRow = 0;
let curTile = 0;
let curWord = "";

// SELECTORS
const rows = document.querySelectorAll(".row");
const keys = document.querySelectorAll(".key");
const enterKey = document.querySelector(".key-enter");
const backKey = document.querySelector(".key-back");
const alertBox = document.querySelector(".alert-box");
const alertMsg = document.querySelector(".alert-msg");
let temp = 0;
// FUNCTIONS
function checkLetters(i) {
  setTimeout(function () {
    let tempBox = rows[curRow].querySelector(`.box-${i}`);
    console.log(tempBox);
    if (curWord[i] === word[i]) {
      tempBox.classList.add("background-green");
      document.querySelector(`[data-key="${curWord[i]}"]`).classList.remove("background-yellow");
      document.querySelector(`[data-key="${curWord[i]}"]`).classList.add("background-green");
    } else if (word.includes(curWord[i])) {
      tempBox.classList.add("background-yellow");
      document.querySelector(`[data-key="${curWord[i]}"]`).classList.add("background-yellow");
    } else {
      tempBox.classList.add("background-gray");
      document.querySelector(`[data-key="${curWord[i]}"]`).classList.add("background-gray");
    }
    tempBox.classList.add("letter-box-flip");

    setTimeout(() => {
      tempBox.classList.remove("letter-box-flip");
      console.log(tempBox);
    }, 500);
  }, 500 * i);
}

function displayAlert(msg) {
  alertMsg.innerHTML = `${msg}`;
  alertBox.classList.add("show-alert");

  setTimeout(() => {
    alertBox.classList.remove("show-alert");
  }, 1000);
}

function handleRowShake() {
  rows[curRow].classList.add("shake-row");

  setTimeout(() => {
    rows[curRow].classList.remove("shake-row");
  }, 500);
}

function displayLetter(letter) {
  if (curTile === 5) return;

  let tempBox = rows[curRow].querySelector(`.box-${curTile}`);

  tempBox.innerHTML = letter;

  tempBox.classList.add("letter-box-animation");
  setTimeout(() => {
    tempBox.classList.remove("letter-box-animation");
  }, 200);

  curTile++;
  curWord += letter;
}

function enterWord() {
  if (curTile !== 5) {
    displayAlert("Not enough letters");
    handleRowShake();

    return;
  }

  if (!WORDS.includes(curWord)) {
    displayAlert("Not in word list");
    handleRowShake();
    return;
  }

  for (let i = 0; i < 5; i++) {
    checkLetters(i);
  }
  setTimeout(() => {
    curWord = "";
    curRow++;
    curTile = 0;
  }, 2000);
}

function backspace() {
  if (curTile === 0) return;

  curTile--;
  curWord = curWord.substring(0, curWord.length - 1);
  rows[curRow].querySelector(`.box-${curTile}`).innerHTML = "";
}

////// EVENT LISTENERS
document.querySelector(".keyboard-box").addEventListener("click", function (e) {
  if (!e.target.classList.contains("key")) return;

  if (e.target.dataset.key === "enter" || e.target.dataset.key === "back") return;

  displayLetter(e.target.dataset.key);
});

document.addEventListener("keydown", function (e) {
  if (e.code === `Key${e.key.toUpperCase()}`) {
    displayLetter(e.key);
  } else if (e.code === "Enter") {
    enterWord();
  } else if (e.code === "Backspace") {
    backspace();
  }
});

enterKey.addEventListener("click", enterWord);

backKey.addEventListener("click", backspace);
