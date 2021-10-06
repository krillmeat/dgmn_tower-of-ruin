'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
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

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
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

// TODO - This needs to eventually be built out of a database
var config = {
  userName: 'Debug User',
  keyBindings: {
    /* TODO - Add some Key Bindings, so I can use this, rather than hard-coded inputs */
  },
  screenSize: 4 // How much larger the screen is than the actual

};

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

var GameCanvas = function GameCanvas(canvasClass, width, height, hasIdleAnimation) {
  var _this = this;

  _classCallCheck(this, GameCanvas);

  _defineProperty(this, "animate", function (speed) {
    var counter = 0;
    setInterval(function () {
      _this.clearCanvas();

      if (counter % 4 === 0) {
        _this.paintImage(_this.imageStack);
      }

      counter++;
    }, speed);
  });

  _defineProperty(this, "loadImages", function (callback) {
    var loadedImages = {};
    var loadedCount = 0;
    var totalImages = Object.keys(_this.imageUrlStack).length;

    for (var img in _this.imageUrlStack) {
      loadedImages[img] = new Image();

      loadedImages[img].onload = function () {
        if (++loadedCount >= totalImages) {
          callback(loadedImages);
        }
      };

      loadedImages[img].src = _this.imageUrlStack[img];
    }
  });

  _defineProperty(this, "clearCanvas", function () {
    _this.ctx.clearRect(0, 0, _this.elem.width, _this.elem.height);
  });

  _defineProperty(this, "buildCanvas", function () {
    var canvasElem = document.createElement('canvas');
    canvasElem.width = _this.width;
    canvasElem.height = _this.height;
    canvasElem.classList.add(_this.canvasClass);
    _this.ctx = canvasElem.getContext('2d');
    return canvasElem;
  });

  _defineProperty(this, "paintCanvas", function (canvas) {
    _this.ctx.clearRect(0, 0, _this.elem.width, _this.elem.height);

    _this.ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
  });

  _defineProperty(this, "paintImage", function (images) {
    for (var img in images) {
      var imgHeight = images[img].height / 8 * config.screenSize;
      var imgWidth = images[img].width / 8 * config.screenSize;

      _this.ctx.drawImage(images[img], 0, 0, imgWidth, imgHeight);
    }
  });

  this.canvasClass = canvasClass;
  this.width = width * config.screenSize;
  this.height = height * config.screenSize;
  this.elem = this.buildCanvas();
  this.ctx;
  this.imageUrlStack = {};
  this.imageStack = {};
  this.imagesLoaded = false;
  this.hasIdleAnimation = hasIdleAnimation;
  this.idleAnimationImages = {};
  this.idleAnimationRate = 0; // TODO - Gather from Database?
}
/**------------------------------------------------------------------------
 * IDLE ANIMATE
 * ------------------------------------------------------------------------
 * Creates a time-based animation that switches between two different images
 * TODO - Switch over to "IDLE" version
 * ------------------------------------------------------------------------
 * @param {Number} speed  How fast the animation will check to change
 * ----------------------------------------------------------------------*/
;

var BackgroundCanvas = /*#__PURE__*/function (_GameCanvas) {
  _inherits(BackgroundCanvas, _GameCanvas);

  var _super = _createSuper(BackgroundCanvas);

  function BackgroundCanvas() {
    var _this;

    _classCallCheck(this, BackgroundCanvas);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "loadImageStack", function () {
      _this.imageUrlStack = {
        battleBack: './sprites/testing/battle-background.png'
      };
    });

    _this.loadImageStack();

    return _this;
  }

  return BackgroundCanvas;
}(GameCanvas);

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

var DebugMenu = /*#__PURE__*/function () {
  function DebugMenu() {
    _classCallCheck(this, DebugMenu);

    debugLog('Booting Debug Menu...');
    this.elem = document.getElementById("debug-menu");
    this.state = 'active'; // Is the debug menu supposed to be visible or not [active | inactive]

    this.activate();
  }

  _createClass(DebugMenu, [{
    key: "activate",
    value: function activate() {
      this.elem.classList.add('active');
    }
  }]);

  return DebugMenu;
}();

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

    if (inDebug()) {
      _this.debugMenu = new DebugMenu();
    } // Draw Canvases


    _this.systemScreen.appendChild(_this.screenCanvas.elem);

    _this.backgroundCanvas.loadImages(function (images) {
      _this.backgroundCanvas.imageStack = images;

      _this.backgroundCanvas.animate(1000);
    });

    setTimeout(function () {
      _this.startGameTimer();
    }, 1000);
  });

  _defineProperty(this, "startGameTimer", function () {
    _this.gameTimer = setInterval(function () {
      _this.systemCount++;

      _this.screenCanvas.paintCanvas(_this.backgroundCanvas.elem); // TODO - Should be a full compiler of all other canvases


      if (_this.actionQueue.length > 0) {
        if (_this.actionQueue[0] === null) ; else {
          debugLog("Taking Action ", _this.actionQueue[0]);
        }

        _this.actionQueue.shift();
      }
    }, 20);
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
  this.systemScreen = document.getElementById('game-screen');
  this.systemScreen.style.width = 160 * config.screenSize + 'px';
  this.systemScreen.style.height = 144 * config.screenSize + 'px';
  this.debugMenu;
  this.gameTimer;
  this.systemCount = 0;
  this.actionQueue = [];
  this.screenCanvas = new GameCanvas('screen-canvas', 160, 144);
  this.backgroundCanvas = new BackgroundCanvas('background-canvas', 160, 144); // TODO - this should be loaded and then built

  this.subCanvases = [this.backgroundCanvas]; // TODO - this should be loaded
}
/**------------------------------------------------------------------------
 * START
 * ------------------------------------------------------------------------
 * Starts the System
 * ----------------------------------------------------------------------*/
;

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
