import View from "./View.js";
import boardView from "./boardView.js";

class playView extends View {
  showBoard() {
    this._startBox.classList.toggle("hide");
    this._gameBox.classList.toggle("hide");
  }

  showRestart(outcome) {
    if (outcome) this._restartHeading.innerHTML = "Correct!";

    if (!outcome) this._restartHeading.innerHTML = "Incorrect";

    this._restartBox.classList.toggle("hide");
    this._restartContentBox.classList.toggle("add-grow");
  }

  addHandlerPlayBtn(handler) {
    this._playBtn.addEventListener("click", function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerRestartBtn(handler) {
    this._restartBtn.addEventListener("click", function (e) {
      e.preventDefault();
      handler();
    });
  }

  fillBoxes(guessesLen, guesses, word) {
    for (let i = 0; i < guessesLen; i++) {
      for (let j = 0; j < 5; j++) {
        let tempBox = this._rows[i].querySelector(`.box-${j}`);
        let tempKey = document.querySelector(`[data-key="${guesses[i][j]}"]`);

        boardView._colorBoxes(j, guesses[i], tempBox, tempKey, word);
        this._rows[i].querySelector(`.box-${j}`).innerHTML = guesses[i][j];
      }
    }
  }
}

export default new playView();
