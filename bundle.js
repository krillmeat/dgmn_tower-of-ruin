'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

/**------------------------------------------------------------------------
 * IN DEBUG
 * ------------------------------------------------------------------------
 * Checks if Debug is acive, based on Query Parameter 
 * ------------------------------------------------------------------------
 * @returns {Boolean} Is Debug On or Not
 * ----------------------------------------------------------------------*/
var inDebug = function inDebug() {
  return getAllQueryParams().debug === 'true';
};
/**------------------------------------------------------------------------
 * GET ALL QUERY PARAMS
 * ------------------------------------------------------------------------
 * Gathers all of the Query Params into an Object
 * Removes starting ? and splits 'name=value' into {name:value}
 * ------------------------------------------------------------------------
 * @returns {Object} All Params split into an object
 * ----------------------------------------------------------------------*/

var getAllQueryParams = function getAllQueryParams() {
  var url = window.location.href;
  var params = url.substring(url.indexOf("?") + 1);
  var paramObj = {};

  var _iterator = _createForOfIteratorHelper(params.split("&")),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var param = _step.value;
      var split = param.split("=");
      paramObj[split[0]] = split[1];
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return paramObj;
};

/**------------------------------------------------------------------------
   * DEBUG LOG
   * ------------------------------------------------------------------------
   * Logs Debug Logs, which are more verbose than Game Logs
   * Used only when debug=true is set in the URL Params
   * ----------------------------------------------------------------------*/

var debugLog = function debugLog(message, object) {
  if (inDebug()) object ? console.log("%c".concat(message), 'color:#A6E22E', object) : console.log("%c".concat(message), 'color:#A6E22E');
};

/**------------------------------------------------------------------------
 * CONTROLLER CLASS
 * ------------------------------------------------------------------------
 * A Virtual Controller, which handles all inputs from all sources
 * ----------------------------------------------------------------------*/

var Controller = function Controller(setKeyState) {
  var _this = this;

  _classCallCheck(this, Controller);

  _defineProperty(this, "connectEventListener", function () {
    window.addEventListener("keydown", function (e) {
      _this.setKeyState(e.key, true);
    });
    window.addEventListener("keyup", function (e) {
      _this.setKeyState(e.key, false);
    });
  });

  debugLog("Plugged In Controller...");

  this.setKeyState = function (key, value) {
    setKeyState(key, value);
  };

  this.connectEventListener();
}
/**------------------------------------------------------------------------
 * CONNECT EVENT LISTENER
 * ------------------------------------------------------------------------
 * Sets up the Key Listeners on the Window
 * TODO - Set this up to track config values to send specific
 *        actions to the System, rather than the direct key
 * TODO - Setup Touch Events with 'touchstart' and 'touchend'
 * ----------------------------------------------------------------------*/
;

/**------------------------------------------------------------------------
 * SYSTEM CLASS
 * ------------------------------------------------------------------------
 * A Virtual System, which handles things like Memory, Display, and Input
 * ----------------------------------------------------------------------*/

var System = function System() {
  var _this = this;

  _classCallCheck(this, System);

  _defineProperty(this, "start", function () {
    debugLog("Starting System...");

    _this.pluginController();
  });

  _defineProperty(this, "setKeyState", function (key, value) {
    _this.keyState[key] = value;
  });

  _defineProperty(this, "pluginController", function () {
    _this.controllers.push(new Controller(_this.setKeyState.bind(_this)));
  });

  debugLog("Loading System...");
  this.controllers = [];
  this.keyState = {};
}
/**------------------------------------------------------------------------
 * START
 * ------------------------------------------------------------------------
 * Starts the System
 * ----------------------------------------------------------------------*/
;

// TODO - This needs to eventually be built out of a database
var config = {
  userName: 'Debug User',
  keyBindings: {
    /* TODO - Add some Key Bindings, so I can use this, rather than hard-coded inputs */
  }
};

window.onload = function () {
  init();
};

function init() {
  debugLog("Booting for ".concat(config.userName, "..."));
  var system = new System();
  setTimeout(function () {
    system.start();
  }, 1000);
}
