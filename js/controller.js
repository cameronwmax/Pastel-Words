import { CORRECT_MSGS, CORRECT_WORD_TIMER, ERROR_MSGS, ROW_CHECK_TIME } from "./config.js";
import * as model from "./model.js";
import alertView from "./views/alertView.js";
import boardView from "./views/boardView.js";
import playView from "./views/playView.js";

function playGame() {
  if (!getWord()) setWord();

  model.state.gameActive = true;
  playView.showBoard();
  const guesses = getGuesses();

  if (!guesses) return;

  model.state.guesses = guesses;

  if (model.guessesLen() === 6) {
    model.state.playViewActive = false;
    playView.fillBoxes(model.guessesLen(), model.state.guesses, model.state.randWord);
    lossHelper();
    return;
  }

  model.state.curRow = model.guessesLen();
  playView.fillBoxes(model.guessesLen(), model.state.guesses, model.state.randWord);
}

function enterWord() {
  if (model.state.curTile !== 5 && !model.state.checkingRow) {
    alertView.displayAlert(ERROR_MSGS[0]);
    boardView.handleRowShake(model.state);
    return;
  }

  if (!model.validateCurWord() && !model.state.checkingRow) {
    alertView.displayAlert(ERROR_MSGS[1]);
    boardView.handleRowShake(model.state);
    return;
  }

  if (model.checkTilesFull()) {
    model.state.checkingRow = true;
    model.state.temp.row = model.state.curRow;
    model.state.temp.word = model.state.curWord;

    for (let i = 0; i < 5; i++) boardView.checkLetters(i, model.state);

    if (model.state.curWord !== model.state.randWord && !model.checkRowsFull()) {
      model.state.guesses.push(model.state.curWord);
      model.state.curWord = "";

      model.state.curRow++;

      model.state.curTile = 0;

      setTimeout(() => (model.state.checkingRow = false), 2500);

      setLocalStorage("guesses", model.state.guesses);
    }

    if (model.checkWord()) {
      timeoutHelper(winHelper);
    }

    if (model.checkRowsFull()) {
      timeoutHelper(lossHelper);
    }
  }
}

function getGuesses() {
  const data = getLocalStorage("guesses");
  if (!data) return;
  return data;
}

function resetGame() {
  removeLocalStorage("guesses");
  removeLocalStorage("word");
  boardView.resetBoard(model.state);
  model.resetState();

  playView.showBoard();
  playView.showRestart();
  alertView.hideAlert();
  location.reload();
}

function winHelper() {
  model.state.outcome = true;
  model.state.gameActive = false;
  boardView.handleCorrectWord(model.state, CORRECT_MSGS);

  timeoutHelper(() => model.state.curRow++, CORRECT_WORD_TIMER);

  timeoutHelper(showRestartHelper);
}

function showRestartHelper() {
  playView.showRestart(model.checkWord());
}

function lossHelper() {
  model.state.gameActive = false;
  alertView.handleLoss(model.state.randWord.toUpperCase());

  timeoutHelper(showRestartHelper);
}

function handleKeyClicks(e) {
  if (model.state.checkingRow || !model.state.gameActive) return;

  if (!e.target.classList.contains("key")) return;

  if (e.target.dataset.key === "enter") {
    enterWord();
    return;
  }

  if (e.target.dataset.key === "back") {
    handleBackspace();
    return;
  }

  boardView.displayLetter(e.target.dataset.key, model.state);
}

function handleKeyDown(e) {
  if (model.state.checkingRow || !model.state.gameActive) return;

  if (e.code === `Key${e.key.toUpperCase()}`)
    boardView.displayLetter(e.key.toLowerCase(), model.state);

  if (e.code === "Enter") enterWord();

  if (e.code === "Backspace") handleBackspace();
}

function handleBackspace() {
  if (model.state.curTile === 0) return;

  model.state.curTile--;

  model.state.curWord = model.state.curWord.substring(0, model.state.curWord.length - 1);
  boardView.backspace(model.state);
}

function timeoutHelper(func) {
  setTimeout(func, ROW_CHECK_TIME);
}

function getWord() {
  const word = getLocalStorage("word");
  if (!word) return false;
  model.setRandomWord(word);
  return true;
}

function setWord() {
  const word = model.getRandomWord();
  model.setRandomWord(word);
  setLocalStorage("word", word);
}

function setLocalStorage(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

function getLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name));
}

function removeLocalStorage(name) {
  localStorage.removeItem(name);
}

function init() {
  playView.addHandlerPlayBtn(playGame);
  playView.addHandlerRestartBtn(resetGame);
  boardView.addHandlerKeyboardBox(handleKeyClicks);
  boardView.addHandlerKeydown(handleKeyDown);

  // setLocalStorage("guesses", ["shore", "shore", "shore", "shore", "shore"]);
}
init();
