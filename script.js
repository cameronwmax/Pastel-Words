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

// EVENT LISTENERS
keys.forEach((cur) => {
  if (cur.dataset.key === "enter" || cur.dataset.key === "back") {
    return;
  }

  cur.addEventListener("click", function () {
    if (curTile === 5) return;

    rows[curRow].querySelector(`.box-${curTile}`).innerHTML = cur.dataset.key;
    curTile++;
    curWord += cur.dataset.key;
    console.log(curWord);
  });
});

enterKey.addEventListener("click", function () {
  if (curTile !== 5) return;

  for (let i = 0; i < 5; i++) {
    checkLetters(i);
  }

  setTimeout(() => {
    curWord = "";
    curRow++;
    curTile = 0;
  }, 4000);
});
