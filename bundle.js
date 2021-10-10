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
  screenSize: 2 // How much larger the screen is than the actual

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

var GameCanvas = function GameCanvas(canvasClass, width, height, x, y, hasIdleAnimation, gameScreenRedrawCallback) {
  var _this = this;

  _classCallCheck(this, GameCanvas);

  _defineProperty(this, "animate", function (speed) {
    var currentFrame = 0;
    setInterval(function () {
      _this.clearCanvas(); // if(counter % 4 === 0){


      _this.paintImage(_this.imageStack[currentFrame]);

      _this.triggerGameScreenRedraw();

      currentFrame++;
      if (currentFrame >= _this.imageStack.length) currentFrame = 0; // }
    }, speed);
  });

  _defineProperty(this, "loadImageStack", function (imgStack) {
    // THIS IS TEMPED FOR SPECIFIC MOCKS
    _this.imageUrlStack = imgStack;
  });

  _defineProperty(this, "loadImages", function (callback) {
    var loadedImages = [];
    var loadedCount = 0;
    var totalImages = _this.imageUrlStack.length;

    for (var i = 0; i < totalImages; i++) {
      loadedImages.push(new Image());

      loadedImages[i].onload = function () {
        if (++loadedCount >= totalImages) {
          callback(loadedImages);
        }
      };

      loadedImages[i].src = _this.imageUrlStack[i];
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
    _this.ctx.drawImage(canvas.elem, canvas.x, canvas.y, canvas.width, canvas.height);
  });

  _defineProperty(this, "paintImage", function (image, isFlipped) {
    var imgHeight = image.height / 8 * config.screenSize;
    var imgWidth = image.width / 8 * config.screenSize;

    if (isFlipped) {
      _this.ctx.scale(-1, 1);

      _this.ctx.translate(imgWidth * -1, 0);
    }

    _this.ctx.drawImage(image, 0, 0, imgWidth, imgHeight);
  });

  this.canvasClass = canvasClass;
  this.x = x || 0;
  this.y = y || 0;
  this.width = width * config.screenSize;
  this.height = height * config.screenSize;
  this.elem = this.buildCanvas();
  this.ctx;
  this.imageUrlStack = [];
  this.imageStack = [];
  this.imagesLoaded = false;
  this.hasIdleAnimation = hasIdleAnimation;
  this.idleAnimationImages = [];
  this.idleAnimationRate = 0; // TODO - Gather from Database?

  this.triggerGameScreenRedraw = function () {
    if (gameScreenRedrawCallback) gameScreenRedrawCallback();
  };
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

    _this.loadImageStack(['./sprites/testing/battle-background.png']); // TODO - Dynamically Grab this stuff


    return _this;
  }

  return BackgroundCanvas;
}(GameCanvas);

/* 
  ATK - Courage - Fire / Dragons (Dragon's Roar)
  SPD - Friendship - Beast (Nature Spirits)
  HP  - Love - Sky / Plants (Wind Guardians)
  INT - Knowledge - Metal / Bugs (Metal Empire)
  RES - Purity - Plants / Bugs (Jungle Trooper)
  DEF - Honesty - Water / Metal (Deep Savers)
  HIT - Hope - Light (Holy Warriors)
  SP  - Light - Light (Holy Beasts)
  AVO - Kindness - Dark (Nightmare Soldiers)
*/
var evolutions = {
  agu: [{
    grey: {
      crests: [10, 0, 0, 0, 0, 0, 0, 0, 0],
      bond: 0
    }
  }, {
    geoGrey: {
      crests: [8, 0, 0, 0, 0, 0, 0, 2, 0],
      bond: 0
    }
  }]
};

var dgmnDB = {
  agu: {
    stage: 3,
    "class": 'vaccine',
    crests: [0],
    stats: [5, 5, 5, 5, 5, 5, 5, 5, 5],
    evolutions: evolutions['agu']
  },
  grey: {
    stage: 4,
    "class": 'vaccine',
    crests: [0],
    stats: [5, 5, 5, 5, 5, 5, 5, 5, 10],
    evolutions: evolutions['agu']
  }
};

var BattleDgmnCanvas = /*#__PURE__*/function (_GameCanvas) {
  _inherits(BattleDgmnCanvas, _GameCanvas);

  var _super = _createSuper(BattleDgmnCanvas);

  function BattleDgmnCanvas(dgmnName) {
    var _this;

    _classCallCheck(this, BattleDgmnCanvas);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.dgmnName = dgmnName;
    _this.frames = [];
    _this.animateSpeed = 2000;

    _this.loadImageStack(["./sprites/Battle/Dgmn/".concat(_this.dgmnName, "_idle_0.png"), "./sprites/Battle/Dgmn/".concat(_this.dgmnName, "_idle_1.png")]);

    return _this;
  }

  return BattleDgmnCanvas;
}(GameCanvas);

var Dgmn = function Dgmn(id, name, level) {
  var _this = this;

  _classCallCheck(this, Dgmn);

  _defineProperty(this, "loadDgmn", function (dgmnData) {// This how the data will be loaded into a DGMN when a new instance is created
  });

  _defineProperty(this, "initBattleCanvas", function (gameScreenRedrawCallback) {
    _this.battleCanvas = new BattleDgmnCanvas(_this.name, 'dgmn-canvas', 32, 32, 0, 0, true, gameScreenRedrawCallback);
  });

  this.dgmnId = id;
  this.name = name;
  this.stage = dgmnDB[name].stage;
  this["class"] = dgmnDB[name]["class"];
  this.baseStats = dgmnDB[name].stats;
  this.crests = dgmnDB[name].crests; // Permanent

  this.permAttacks = {};
  this.permCrests = {};
  this.permSync = {};
  this.fullDgmnList = []; // Every Dgmn this Dgmn has ever been
  // Temporary - Only Matters per hatch, resets on reversion to egg

  this.level = level || 1;
  this.currDgmnPath = []; // The Dgmn this Dgmn has become since it hatched

  this.currHP = 0;
  this.currHunger = 0;
  this.currEnergy = 0;
  this.currPoop = 0;
  this.battleCanvas;
};

var Battle = function Battle(_dgmnList, enemyDgmnList, _loadedCallback, addObjectCallback, gameScreenRedrawCallback) {
  var _this = this;

  _classCallCheck(this, Battle);

  _defineProperty(this, "loadBattle", function (loadedCallback) {
    debugLog("-- Loading Battle"); // Load Background

    _this.battleBackground.loadImages(function (images) {
      _this.battleBackground.imageStack = images;

      _this.battleBackground.paintImage(_this.battleBackground.imageStack[0]);

      _this.loadedState.battleBackgroundLoaded = true;

      _this.addObject(_this.battleBackground);
    }); // Start Interval


    var loadingInterval = setInterval(function () {
      // Load Party Dgmn
      if (_this.loadedState.battleBackgroundLoaded && !_this.loadedState.party.loadingDgmn) {
        debugLog("---- Background Loaded");
        _this.loadedState.party.loadingDgmn = true;

        _this.loadDgmn(_this.dgmnList, false);
      } // Load Enemy Dgmn


      if (_this.loadedState.party.imagesLoaded && !_this.loadedState.enemy.loadingDgmn) {
        debugLog("---- Party Images Loaded");
        _this.loadedState.enemy.loadingDgmn = true;

        _this.addDgmnToObjectList(_this.dgmnList, false);

        _this.loadDgmn(_this.enemyDgmnList, true);
      } // Done Loading


      if (_this.loadedState.enemy.imagesLoaded) {
        debugLog("---- Enemy Images Loaded");

        _this.addDgmnToObjectList(_this.enemyDgmnList, true);
      } // Every done? Stop Loading


      if (_this.isBattleLoaded()) {
        loadedCallback();
        clearInterval(loadingInterval);
      }
    }, 100);
  });

  _defineProperty(this, "addDgmnToObjectList", function (dgmnList, isEnemy) {
    for (var i = 0; i < dgmnList.length; i++) {
      _this.addObject(dgmnList[i].battleCanvas);

      if (i === dgmnList.length - 1) {
        isEnemy ? _this.loadedState.enemy.dgmnLoaded = true : _this.loadedState.party.dgmnLoaded = true;
      }
    }
  });

  _defineProperty(this, "loadDgmn", function (dgmnList, isEnemy) {
    var _loop = function _loop(i) {
      var dgmn = dgmnList[i];
      dgmn.initBattleCanvas(_this.triggerGameScreenRedraw);
      dgmn.battleCanvas.x = isEnemy ? 2 * (16 * config.screenSize) : 6 * (16 * config.screenSize);
      dgmn.battleCanvas.y = 16 * config.screenSize + 33 * i * config.screenSize;
      dgmn.battleCanvas.loadImages(function (images) {
        isEnemy ? _this.loadedState.enemy.dgmnLoadedCount++ : _this.loadedState.party.dgmnLoadedCount++;
        dgmn.battleCanvas.imageStack = images;
        dgmn.battleCanvas.paintImage(dgmn.battleCanvas.imageStack[0], isEnemy);
        var speed = 1000 - Math.floor(dgmn.baseStats[8] * 2) * 33;
        dgmn.battleCanvas.animate(speed);
        isEnemy ? _this.loadedState.enemy.imagesLoaded = _this.loadedState.enemy.dgmnLoadedCount >= dgmnList.length : _this.loadedState.party.imagesLoaded = _this.loadedState.party.dgmnLoadedCount >= dgmnList.length;
      });
    };

    for (var i = 0; i < dgmnList.length; i++) {
      _loop(i);
    }
  });

  _defineProperty(this, "isBattleLoaded", function () {
    return _this.loadedState.battleBackgroundLoaded && _this.loadedState.party.dgmnLoaded && _this.loadedState.enemy.dgmnLoaded;
  });

  _defineProperty(this, "generateEnemies", function (encounterData) {// new Dgmn / enemy
  });

  _defineProperty(this, "attack", function (target, attacker) {});

  this.dgmnList = _dgmnList;
  this.enemyDgmnList = enemyDgmnList;
  this.loadedState = {
    battleBackgroundLoaded: false,
    party: {
      loadingDgmn: false,
      imagesLoaded: false,
      dgmnLoaded: false,
      dgmnLoadedCount: false
    },
    enemy: {
      loadingDgmn: false,
      imagesLoaded: false,
      dgmnLoaded: false,
      dgmnLoadedCount: false
    }
  };
  this.battleBackground = new BackgroundCanvas('background-canvas', 160, 144);

  this.triggerGameScreenRedraw = function () {
    gameScreenRedrawCallback();
  };

  this.addObject = function (newObject) {
    addObjectCallback(newObject);
  };

  this.loadBattle(_loadedCallback);
}
/**------------------------------------------------------------------------
 * LOAD BATTLE
 * ------------------------------------------------------------------------
 * Interval used to load all images and data for a Battle
 * ------------------------------------------------------------------------
 * @param {Function} loadedCallback Function called after everything is loaded
 * ----------------------------------------------------------------------*/
;

var Game = function Game(paintToScreenCallback) {
  var _this = this;

  _classCallCheck(this, Game);

  _defineProperty(this, "bootGame", function () {// Shrug for now
  });

  _defineProperty(this, "startBattle", function () {
    debugLog("Starting Battle..."); // TODO - ALL OF THIS IS TEMP RIGHT NOW

    _this.battle = new Battle([new Dgmn(0, 'agu', 5), new Dgmn(1, 'grey', 5), new Dgmn(2, 'agu', 6)], [new Dgmn(0, 'agu', 5)], _this.onBattleLoad, _this.addToObjectList, _this.drawGameScreen);
  });

  _defineProperty(this, "onBattleLoad", function () {
    console.log("Battle Loaded...");

    _this.drawGameScreen();
  });

  _defineProperty(this, "addToObjectList", function (newObject) {
    _this.objectList.push(newObject);
  });

  _defineProperty(this, "drawGameScreen", function () {
    _this.gameCanvas.clearCanvas();

    var _iterator = _createForOfIteratorHelper(_this.objectList),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var obj = _step.value;

        _this.gameCanvas.paintCanvas(obj);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });

  debugLog('Game Created...');
  this.battle;
  this.gameCanvas = new GameCanvas('game-canvas', 160, 144);
  this.renderTimer;
  this.objectList = [];
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

var DebugMenu = function DebugMenu(launchBattleCallback) {
  var _this = this;

  _classCallCheck(this, DebugMenu);

  _defineProperty(this, "activate", function () {
    _this.elem.classList.add('active');

    _this.elem.querySelector("button.battle-launch").addEventListener('click', function () {
      _this.launchBattle();
    });
  });

  debugLog('Booting Debug Menu...');
  this.elem = document.getElementById("debug-menu");
  this.state = 'active'; // Is the debug menu supposed to be visible or not [active | inactive]

  this.activate();

  this.launchBattle = function () {
    launchBattleCallback();
  };
};

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
      _this.debugMenu = new DebugMenu(_this.game.startBattle);
    } // Load Game


    _this.game.bootGame(); // TODO - Eventually, this needs to wait until loaded to take actions
    // Draw Canvases


    _this.systemScreen.appendChild(_this.screenCanvas.elem);

    setTimeout(function () {
      _this.startGameTimer();
    }, 1000);
  });

  _defineProperty(this, "paintToScreen", function (canvas) {
    _this.screenCanvas.clearCanvas();

    _this.screenCanvas.paintCanvas(canvas);
  });

  _defineProperty(this, "startGameTimer", function () {
    _this.gameTimer = setInterval(function () {
      try {
        _this.systemCount++;

        _this.screenCanvas.paintCanvas(_this.game.gameCanvas); // TODO - Should be a full compiler of all other canvases


        if (_this.actionQueue.length > 0) {
          if (_this.actionQueue[0] === null) {
            /* SPACER */
          } else {
            debugLog("Taking Action ", _this.actionQueue[0]);
          }

          _this.actionQueue.shift();
        }
      } catch (e) {
        console.log("GAME ERROR!");
        clearInterval(_this.gameTimer);
      }
    }, 33);
  });

  _defineProperty(this, "addToActionQueue", function (action) {
    _this.actionQueue.push(action);
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
  this.game = new Game(this.paintToScreen.bind(this));
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
