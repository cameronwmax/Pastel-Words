import View from "./View.js";

class alertView extends View {
  displayAlert(msg) {
    this._alertMsg.innerHTML = msg;
    this._alertBox.classList.add("show-alert");

    setTimeout(() => this._alertBox.classList.remove("show-alert"), 1000);
  }

  hideAlert() {
    this._alertMsg.innerHTML = "";
    this._alertBox.classList.remove("show-alert");
  }

  handleLoss(msg) {
    this._alertMsg.innerHTML = msg;
    this._alertBox.classList.add("show-alert");
  }
}

export default new alertView();
