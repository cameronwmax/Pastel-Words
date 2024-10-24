import { TILES_FULL } from "../config.js";
import View from "./View.js";
import alertView from "./alertView.js";

class boardView extends View {
  _getRow(state) {
    return this._rows[state.curRow];
  }

  _getTile(state) {
    return this._getRow(state).querySelector(`.box-${state.curTile}`);
  }

  displayLetter(letter, state) {
    if (state.curTile === 5) return;

    const tempTile = this._getTile(state);

    tempTile.innerHTML = letter;
    tempTile.classList.add("letter-box--used");

    state.curTile++;
    state.curWord += letter;
  }

  backspace(state) {
    const tempTile = this._getTile(state);
    tempTile.innerHTML = "";
    tempTile.classList.remove("letter-box--used");
  }

  handleRowShake(state) {
    const tempRow = this._getRow(state);
    tempRow.classList.add("shake-row");
    setTimeout(() => tempRow.classList.remove("shake-row"), 500);
  }

  _colorBoxes(col, curWord, tempBox, tempKey, word) {
    if (curWord[col] === word[col]) {
      if (tempKey.classList.contains("background-yellow"))
        this._handleColorClass(tempKey, "background-yellow", false);

      this._handleColorClass(tempKey, "background-green");
      this._handleColorClass(tempBox, "background-green");
      return;
    }

    if (word.includes(curWord[col])) {
      if (!tempKey.classList.contains("background-green"))
        this._handleColorClass(tempKey, "background-yellow");

      this._handleColorClass(tempBox, "background-yellow");
      return;
    }

    this._handleColorClass(tempBox, "background-gray");
    this._handleColorClass(tempKey, "background-gray");
  }

  _handleColorClass(el, className, add = true) {
    if (add) el.classList.add(className);

    if (!add) el.classList.remove(className);
  }

  _checkLetters(i, state) {
    const tempTile = this._rows[state.temp.row].querySelector(`.box-${i}`);
    const tempKey = document.querySelector(`[data-key="${state.temp.word[i]}"]`);
    this._colorBoxes(i, state.temp.word, tempTile, tempKey, state.randWord);
    tempTile.classList.add("letter-box-flip");
  }

  checkLetters(i, state) {
    setTimeout(this._checkLetters.bind(this), 500 * i, i, state);
  }

  _handleCorrectWord(i, state, msgs) {
    const tempTile = this._getRow(state).querySelector(`.box-${i}`);
    tempTile.classList.add("letter-box-up");

    if (i === 4) alertView.displayAlert(msgs[state.curRow]);
  }

  handleCorrectWord(state, msgs) {
    for (let i = 0; i < 5; i++) {
      setTimeout(this._handleCorrectWord.bind(this), 500 * i, i, state, msgs);
    }
  }

  resetBoard(state) {
    for (let i = 0; i < state.curRow; i++) {
      for (let j = 0; j < TILES_FULL; j++) {
        const tempKey = this._rows[i].querySelector(`.box-${j}`).innerHTML;
        const tempKeyEl = document.querySelector(`[data-key="${tempKey}"]`);

        if (tempKeyEl.classList.value.split(" ").length !== 1) {
          tempKeyEl.classList.value = "key";
        }

        const tempTile = this._rows[i].querySelector(`.box-${j}`);
        tempTile.innerHTML = "";
        tempTile.classList.value = `letter-box box-${j}`;
      }
    }
  }

  addHandlerKeyboardBox(handler) {
    this._keyboardBox.addEventListener("click", function (e) {
      handler(e);
    });
  }

  addHandlerKeydown(handler) {
    document.addEventListener("keydown", function (e) {
      handler(e);
    });
  }
}

export default new boardView();
