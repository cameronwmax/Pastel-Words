export default class View {
  _startBox = document.querySelector(".start-box");
  _boardBox = document.querySelector(".board-box");
  _keyboardBox = document.querySelector(".keyboard-box");
  _gameBox = document.querySelector(".game-container");
  _restartBox = document.querySelector(".restart-container");
  _restartContentBox = document.querySelector(".restart-content-container");

  _rows = document.querySelectorAll(".row");
  _enterKey = document.querySelector(".key-enter");
  _backKey = document.querySelector(".key-back");
  _alertBox = document.querySelector(".alert-box");
  _alertMsg = document.querySelector(".alert-msg");
  _playBtn = document.querySelector(".play-btn");
  _restartBtn = document.querySelector(".restart-btn");
}
