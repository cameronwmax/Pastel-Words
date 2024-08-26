"use strict";
import { WORDS } from "./words.js";

// VARIABLES
let word = getRandWord();
let curRow = 0;
let curTile = 0;
let curWord = "";
const messages = ["Genius!", "Magnificent!", "Impressive!", "Spendid!", "Great!", "Phew!"];
// const guesses = ["shore", "shore", "shore", "shore", "shore", "shore"];
let guesses = [];
let tempRow;
let tempWord;
let checkingRow = false;
let gameActive = true;

console.log(word);

// localStorage.removeItem("guesses");

function getGuesses() {
  const data = JSON.parse(localStorage.getItem("guesses"));
  if (!data) return;

  guesses = data;
}
getGuesses();

//////////////////////////////////////////
// SELECTORS
const rows = document.querySelectorAll(".row");
const enterKey = document.querySelector(".key-enter");
const backKey = document.querySelector(".key-back");
const alertBox = document.querySelector(".alert-box");
const alertMsg = document.querySelector(".alert-msg");
const playBtn = document.querySelector(".play-btn");

const startBox = document.querySelector(".start-box");
const boardBox = document.querySelector(".board-box");
const keyboardBox = document.querySelector(".keyboard-box");

//////////////////////////////////////////
// FUNCTIONS
function getRandWord() {
  let randInt = Math.floor(Math.random() * WORDS.length);
  let word = WORDS[randInt];
  return word;
}

function playGame(e) {
  e.preventDefault();
  startBox.classList.add("hide");
  boardBox.classList.remove("hide");
  keyboardBox.classList.remove("hide");

  if (guesses.length === 0) return;
  if (guesses.length === 6) {
    gameActive = false;
    fillBoxes();
    return;
  }

  curRow = guesses.length;

  fillBoxes();
}

function fillBoxes() {
  for (let i = 0; i < guesses.length; i++) {
    for (let j = 0; j < 5; j++) {
      let tempBox = rows[i].querySelector(`.box-${j}`);
      let tempKey = document.querySelector(`[data-key="${guesses[i][j]}"]`);

      colorBoxes(j, guesses[i], tempBox, tempKey);
      rows[i].querySelector(`.box-${j}`).innerHTML = guesses[i][j];
    }
  }
}

function colorBoxes(col, curWord, tempBox, tempKey) {
  if (curWord[col] === word[col]) {
    tempKey.classList.remove("background-yellow");
    tempKey.classList.add("background-green");
    tempBox.classList.add("background-green");
  } else if (word.includes(curWord[col])) {
    tempBox.classList.add("background-yellow");
    if (!tempKey.classList.contains("background-green")) {
      tempKey.classList.add("background-yellow");
    }
  } else {
    tempBox.classList.add("background-gray");
    tempKey.classList.add("background-gray");
  }
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

function handleCorrectWord() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      rows[curRow].querySelector(`.box-${i}`).classList.add("letter-box-up");

      if (i === 4) {
        displayAlert(messages[curRow]);
      }
    }, 500 * i);
  }
}

function handleLoss(msg) {
  alertMsg.innerHTML = `${msg}`;
  alertBox.classList.add("show-alert");
}

//////////////////////////////////////////
//// GAME BOARD FUNCTIONS
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
      guesses.push(curWord);
      curWord = "";
      curRow++;
      curTile = 0;
      setTimeout(() => {
        checkingRow = false;
      }, 2500);

      localStorage.setItem("guesses", JSON.stringify(guesses));
      // console.log(guesses);
    }
    if (curWord === word) {
      setTimeout(() => {
        gameActive = false;
        handleCorrectWord();
      }, 2500);
    }
    if (curRow === 6) {
      setTimeout(() => {
        gameActive = false;
        handleLoss(word.toUpperCase());
      }, 2500);
    }
  }
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

function checkLetters(i, row) {
  setTimeout(function () {
    let tempBox = rows[row].querySelector(`.box-${i}`);
    let tempKey = document.querySelector(`[data-key="${tempWord[i]}"]`);
    colorBoxes(i, tempWord, tempBox, tempKey);
    tempBox.classList.add("letter-box-flip");

    setTimeout(() => {
      tempBox.classList.remove("letter-box-flip");
    }, 500);
  }, 500 * i);
}

//////////////////////////////////////////
//// KEYBOARD FUNCTIONS
function handleKeyClicks(e) {
  if (checkingRow || !gameActive) return;

  if (!e.target.classList.contains("key")) return;

  if (e.target.dataset.key === "enter" || e.target.dataset.key === "back") return;

  displayLetter(e.target.dataset.key);
}

function handleKeyDown(e) {
  if (checkingRow || !gameActive) return;

  if (e.code === `Key${e.key.toUpperCase()}`) displayLetter(e.key.toLocaleLowerCase());

  if (e.code === "Enter") enterWord();

  if (e.code === "Backspace") backspace();
}

function backspace() {
  if (curTile === 0) return;

  // localStorage.removeItem("guesses");

  curTile--;
  curWord = curWord.substring(0, curWord.length - 1);
  rows[curRow].querySelector(`.box-${curTile}`).innerHTML = "";
}

//////////////////////////////////////////
////// EVENT LISTENERS
document.querySelector(".keyboard-box").addEventListener("click", handleKeyClicks.bind(this));
document.addEventListener("keydown", handleKeyDown.bind(this));
enterKey.addEventListener("click", enterWord);
backKey.addEventListener("click", backspace);
playBtn.addEventListener("click", playGame.bind(this));
