'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var gameLog = function gameLog(message, object) {
  object ? console.log(message, object) : console.log(message);
};

var System = function System() {
  _classCallCheck(this, System);

  gameLog("Loading System...");
};

window.onload = function () {
  init();
};

function init() {
  // console.log("%cInitializing...","color:#999");
  console.log("Booting...");
  new System();
}
