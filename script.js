"use strict";
"use strict";
import { WORDS } from "./words.js";

let randInt = Math.floor(Math.random() * WORDS.length);
let word = WORDS[randInt];
word = "grape";

let curRow = 0;
let curTile = 0;
let curWord = "";

const rows = document.querySelectorAll(".row");
const keys = document.querySelectorAll(".key");

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
