import { ROWS_FULL, TILES_FULL } from "./config.js ";
import { WORDS } from "./words.js";

export const state = {
  gameActive: false,
  randWord: "",
  curRow: 0,
  curTile: 0,
  curWord: "",
  messages: ["Genius!", "Magnificent!", "Impressive!", "Spendid!", "Great!", "Phew!"],

  guesses: [],
  checkingRow: false,
  outcome: false,

  temp: {
    row: 0,
    word: "",
  },

  darkMode: false,
};

export function getRandomWord() {
  const randInt = Math.floor(Math.random() * WORDS.length);
  const word = WORDS[randInt];
  setRandomWord(word);
  return word;
}

export function setRandomWord(word) {
  state.randWord = word;
}

export function guessesLen() {
  return state.guesses.length;
}

export function validateCurWord() {
  return WORDS.includes(state.curWord);
}

export function checkTilesFull() {
  return state.curTile === TILES_FULL;
}

export function checkRowsFull() {
  return state.curRow > ROWS_FULL;
}

export function resetState() {
  state.randWord = "";
  state.curRow = 0;
  state.curTile = 0;
  state.curWord = "";
  state.guesses = [];
  state.checkingRow = false;
  state.outcome = false;
  state.temp.row = 0;
  state.temp.word = "";
}

export function checkWord() {
  return state.curWord === state.randWord;
}
