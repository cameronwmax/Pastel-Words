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

// FUNCTIONS
function checkLetters(i) {
  setTimeout(function () {
    if (curWord[i] === word[i]) {
      rows[curRow].querySelector(`.box-${i}`).classList.add("background-green");
      document.querySelector(`[data-key="${curWord[i]}"]`).classList.remove("background-yellow");
      document.querySelector(`[data-key="${curWord[i]}"]`).classList.add("background-green");
    } else if (word.includes(curWord[i])) {
      rows[curRow].querySelector(`.box-${i}`).classList.add("background-yellow");
      document.querySelector(`[data-key="${curWord[i]}"]`).classList.add("background-yellow");
    } else {
      rows[curRow].querySelector(`.box-${i}`).classList.add("background-gray");
      document.querySelector(`[data-key="${curWord[i]}"]`).classList.add("background-gray");
    }
  }, 1000 * i);
}

function displayAlert(msg) {
  alertMsg.innerHTML = `${msg}`;
  alertBox.classList.add("show-alert");

  setTimeout(() => {
    alertBox.classList.remove("show-alert");
  }, 1000);
}

////// EVENT LISTENERS
document.querySelector(".keyboard-box").addEventListener("click", function (e) {
  if (!e.target.classList.contains("key")) return;

  if (e.target.dataset.key === "enter" || e.target.dataset.key === "back") return;

  if (curTile === 5) return;

  rows[curRow].querySelector(`.box-${curTile}`).innerHTML = e.target.dataset.key;
  curTile++;
  curWord += e.target.dataset.key;
});

enterKey.addEventListener("click", function () {
  if (curTile !== 5) {
    displayAlert("Not enough letters");
    return;
  }

  if (!WORDS.includes(curWord)) {
    displayAlert("Not in word list");
    return;
  }

  for (let i = 0; i < 5; i++) {
    checkLetters(i);
  }

  setTimeout(() => {
    curWord = "";
    curRow++;
    curTile = 0;
  }, 4000);
});

backKey.addEventListener("click", function () {
  if (curTile === 0) return;

  curTile--;
  curWord = curWord.substring(0, curWord.length - 1);
  rows[curRow].querySelector(`.box-${curTile}`).innerHTML = "";
});
