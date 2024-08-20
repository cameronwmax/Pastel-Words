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
let tempRow;
let tempWord;
let checkingRow = false;
let gameActive = true;

// SELECTORS
const rows = document.querySelectorAll(".row");
const enterKey = document.querySelector(".key-enter");
const backKey = document.querySelector(".key-back");
const alertBox = document.querySelector(".alert-box");
const alertMsg = document.querySelector(".alert-msg");

// FUNCTIONS
function checkLetters(i, row) {
  setTimeout(function () {
    let tempBox = rows[row].querySelector(`.box-${i}`);
    let tempKey = document.querySelector(`[data-key="${tempWord[i]}"]`);

    if (tempWord[i] === word[i]) {
      tempKey.classList.remove("background-yellow");
      tempKey.classList.add("background-green");
      tempBox.classList.add("background-green");
    } else if (word.includes(tempWord[i])) {
      tempBox.classList.add("background-yellow");
      tempKey.classList.add("background-yellow");
    } else {
      tempBox.classList.add("background-gray");
      tempKey.classList.add("background-gray");
    }
    tempBox.classList.add("letter-box-flip");

    setTimeout(() => {
      tempBox.classList.remove("letter-box-flip");
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

function handleCorrectWord() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      rows[curRow].querySelector(`.box-${i}`).classList.add("letter-box-up");

      if (i === 4) displayAlert("Great job!");
    }, 500 * i);
  }
}

function enterWord() {
  if (curTile !== 5 && checkingRow === false) {
    displayAlert("Not enough letters");
    handleRowShake();

    return;
  }

  if (!WORDS.includes(curWord) && checkingRow === false) {
    displayAlert("Not in word list");
    handleRowShake();
    return;
  }

  if (curTile === 5) {
    checkingRow = true;
    tempRow = curRow;
    tempWord = curWord;
    for (let i = 0; i < 5; i++) {
      checkLetters(i, tempRow, tempWord);
    }
    if (curWord !== word) {
      curWord = "";
      curRow++;
      curTile = 0;
      setTimeout(() => {
        checkingRow = false;
      }, 2500);
    } else {
      setTimeout(() => {
        gameActive = false;
        handleCorrectWord();
      }, 2500);
    }
  }
}

function backspace() {
  if (curTile === 0) return;

  curTile--;
  curWord = curWord.substring(0, curWord.length - 1);
  rows[curRow].querySelector(`.box-${curTile}`).innerHTML = "";
}

function handleKeyDown(e) {
  if (checkingRow || !gameActive) return;

  if (e.code === `Key${e.key.toUpperCase()}`) displayLetter(e.key.toLocaleLowerCase());

  if (e.code === "Enter") enterWord();

  if (e.code === "Backspace") backspace();
}

function handleKeyClicks(e) {
  if (checkingRow || !gameActive) return;

  if (!e.target.classList.contains("key")) return;

  if (e.target.dataset.key === "enter" || e.target.dataset.key === "back") return;

  displayLetter(e.target.dataset.key);
}

////// EVENT LISTENERS
document.querySelector(".keyboard-box").addEventListener("click", handleKeyClicks.bind(this));

document.addEventListener("keydown", handleKeyDown.bind(this));

enterKey.addEventListener("click", enterWord);

backKey.addEventListener("click", backspace);
