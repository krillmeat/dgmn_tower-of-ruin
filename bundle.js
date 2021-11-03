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
    action: 'ArrowRight',
    cancel: 'ArrowDown',
    up: 'w',
    right: 'd',
    down: 's',
    left: 'a',
    start: 'Shift',
    select: 'q'
  },
  screenSize: 2,
  // How much larger the screen is than the actual
  textSpeed: 2 // 1 is fastest, 4 is slowest

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

var GameCanvas = function GameCanvas(canvasClass, width, height, _x, _y, hasIdleAnimation, gameScreenRedrawCallback) {
  var _this = this;

  _classCallCheck(this, GameCanvas);

  _defineProperty(this, "animate", function (speed) {
    var currentFrame = 0;
    setInterval(function () {
      if (_this.isIdle) {
        _this.clearCanvas(); // if(counter % 4 === 0){


        _this.paintImage(_this.imageStack[currentFrame]);

        _this.triggerGameScreenRedraw();

        currentFrame++;
        if (currentFrame > 1) currentFrame = 0; // }
      }
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

  _defineProperty(this, "paintImage", function (image, x, y, isFlipped) {
    var imgHeight = image.height / 8 * config.screenSize;
    var imgWidth = image.width / 8 * config.screenSize;
    var imgX = x || 0;
    var imgY = y || 0;

    if (isFlipped) {
      _this.ctx.scale(-1, 1);

      _this.ctx.translate(imgWidth * -1, 0);
    }

    _this.ctx.drawImage(image, imgX, imgY, imgWidth, imgHeight);
  });

  this.canvasClass = canvasClass;
  this.x = _x || 0;
  this.y = _y || 0;
  this.width = width * config.screenSize;
  this.height = height * config.screenSize;
  this.elem = this.buildCanvas();
  this.ctx;
  this.imageUrlStack = [];
  this.imageStack = [];
  this.imagesLoaded = false;
  this.isIdle = true;
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
    _classCallCheck(this, BackgroundCanvas);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _super.call.apply(_super, [this].concat(args));
  }

  return BackgroundCanvas;
}(GameCanvas);

var fontData = {
  A: [0, 0],
  a: [0, 2],
  B: [1, 0],
  b: [1, 2],
  C: [2, 0],
  c: [2, 2],
  D: [3, 0],
  d: [3, 2],
  E: [4, 0],
  e: [4, 2],
  F: [5, 0],
  f: [5, 2],
  G: [6, 0],
  g: [6, 2],
  H: [7, 0],
  h: [7, 2],
  I: [8, 0],
  i: [8, 2],
  J: [9, 0],
  j: [9, 2],
  K: [10, 0],
  k: [10, 2],
  L: [11, 0],
  l: [11, 2],
  M: [12, 0],
  m: [12, 2],
  N: [13, 0],
  n: [13, 2],
  O: [14, 0],
  o: [14, 2],
  P: [15, 0],
  p: [15, 2],
  Q: [16, 0],
  q: [16, 2],
  R: [17, 0],
  r: [17, 2],
  S: [0, 1],
  s: [0, 3],
  T: [1, 1],
  t: [1, 3],
  U: [2, 1],
  u: [2, 3],
  V: [3, 1],
  v: [3, 3],
  W: [4, 1],
  w: [4, 3],
  X: [5, 1],
  x: [5, 3],
  Y: [6, 1],
  y: [6, 3],
  Z: [7, 1],
  z: [7, 3],
  space: [8, 1],
  dotM: [0, 4],
  hp: [1, 4],
  en: [2, 4],
  0: [3, 4],
  1: [4, 4],
  2: [5, 4],
  3: [6, 4],
  4: [7, 4],
  5: [8, 4],
  6: [9, 4],
  7: [10, 4],
  8: [11, 4],
  9: [12, 4],
  exclamation: [13, 4],
  period: [14, 4]
};

/**------------------------------------------------------------------------
 * TEXT MANAGER
 * ------------------------------------------------------------------------
 * Handles all Text displays
 * ------------------------------------------------------------------------
 * @param {Array} colors List of Images that correlate to the font image
 * @param {Number} rows
 * @param {Number} cols
 * @param {Number} x
 * @param {Number} y
 * @param {Function} colorizeCallback
 * ----------------------------------------------------------------------*/

var TextManager = function TextManager(colors, rows, cols, x, y, colorizeCallback) {
  var _this = this;

  _classCallCheck(this, TextManager);

  _defineProperty(this, "getFontCoord", function (_char) {
    return fontData[_char];
  });

  _defineProperty(this, "clearTextBox", function (canvas) {
    canvas.ctx.clearRect(_this.x * 8 * config.screenSize, _this.y * 8 * config.screenSize, _this.cols * 7 * config.screenSize, _this.rows * 7 * config.screenSize);
    canvas.ctx.fillStyle = '#00131a';
    canvas.ctx.fillRect(_this.x * 8 * config.screenSize, _this.y * 8 * config.screenSize, _this.cols * 7 * config.screenSize, _this.rows * 7 * config.screenSize);
  });

  _defineProperty(this, "instantPaint", function (canvas, message) {
    var ctx = canvas.ctx;

    var splitMessage = _this.replaceSpecials(message);

    _this.clearTextBox(canvas);

    for (var i = 0; i < splitMessage.length; i++) {
      var _char2 = splitMessage[i];
      var charX = fontData[_char2][0] * 64;
      var charY = fontData[_char2][1] * 64;

      var fontIndex = _this.colorize(_char2); // image, sX, sY, sW, sH, dX, dY, dW, dH || s = source | d = destination


      ctx.drawImage(_this.colors[fontIndex], charX, charY, 64, 64, 8 * config.screenSize * i + _this.x * 8 * config.screenSize, _this.y * 8 * config.screenSize, 8 * config.screenSize, 8 * config.screenSize);
    }
  });

  _defineProperty(this, "slowPaint", function (canvas, message, triggerRedraw) {
    var ctx = canvas.ctx;
    var splitWords = message.split(" ");

    for (var i = 0; i < splitWords.length; i++) {
      splitWords[i] = _this.replaceSpecials(splitWords[i]);
    }

    _this.clearTextBox(canvas);

    var c = 0; // Paint column

    var r = 0; // Paint row

    var word = 0;
    var _char3 = 0;
    var paintInterval = setInterval(function () {
      _this.drawCharacter(ctx, splitWords[word][_char3], c, r);

      triggerRedraw();
      _char3++;
      c++;

      if (c === _this.cols) {
        c = 0;
        r++;
      }

      if (r === _this.rows) ;

      if (_char3 >= splitWords[word].length) {
        if (c !== 0) {
          _this.drawCharacter(ctx, 'space', c, r);

          triggerRedraw();
          c++;
        } // If next word exists and its length plus the current spot is greater than the space available...
        //    go to a new row


        if (word + 1 <= splitWords.length - 1 && splitWords[word + 1].length + c > _this.cols) {
          r++;
          c = 0;
        }

        _char3 = 0;
        word++;
      }

      if (word >= splitWords.length) {
        clearInterval(paintInterval);
      } // Out of words, it's totally done

    }, config.textSpeed * 33);
  });

  _defineProperty(this, "replaceSpecials", function (message) {
    // TODO - This is awful
    var modString = message;
    modString = modString.replaceAll('.M', '^');
    modString = modString.replaceAll('.hp', '%');
    modString = modString.replaceAll('.en', '@');
    var modArray = modString.split('');

    for (var i = 0; i < modArray.length; i++) {
      if (modArray[i] === '^') modArray[i] = 'dotM';
      if (modArray[i] === '%') modArray[i] = 'hp';
      if (modArray[i] === '@') modArray[i] = 'en';
      if (modArray[i] === ' ') modArray[i] = 'space';
      if (modArray[i] === '!') modArray[i] = 'exclamation';
      if (modArray[i] === '.') modArray[i] = 'period';
    }

    return modArray;
  });

  _defineProperty(this, "drawCharacter", function (ctx, _char4, c, r) {
    ctx.drawImage(_this.colors[0], fontData[_char4][0] * 64, fontData[_char4][1] * 64, 64, 64, 8 * config.screenSize * c + _this.x * 8 * config.screenSize, 8 * config.screenSize * r + _this.y * 8 * config.screenSize, 8 * config.screenSize, 8 * config.screenSize);
  });

  _defineProperty(this, "progressivePaint", function (speed) {// Paints one letter at a time. Used for messages, talking, etc.
  });

  _defineProperty(this, "paintToCanvas", function (canvas) {// canvas.
  });

  this.colors = colors;
  this.rows = rows;
  this.cols = cols;
  this.x = x || 0;
  this.y = y || 0;

  this.colorize = function (_char5) {
    var fontIndex = 0;
    if (colorizeCallback) fontIndex = colorizeCallback(_char5);
    return fontIndex;
  };
};

var BattleMeter = function BattleMeter(stat) {
  _classCallCheck(this, BattleMeter);

  _defineProperty(this, "paintBase", function () {});

  this.stat = stat;
  this.currentValue = 0;
  this.maxValue = 100;
};

var DgmnBattleStatus = function DgmnBattleStatus(listIndex, dgmnData) {
  var _this = this;

  _classCallCheck(this, DgmnBattleStatus);

  _defineProperty(this, "drawMeter", function (canvas, meter, image, meterLength, color) {
    // TODO - Clear the original
    var meterOffset = meter === 'hp' ? 0 : 8 * config.screenSize;
    var leftOffset = _this.dgmnData.isEnemy ? 8 * config.screenSize : 17 * 8 * config.screenSize;
    var battleLocationOffset = _this.dgmnData.battleLocation * 32 * config.screenSize;
    canvas.ctx.clearRect(leftOffset, 16 * config.screenSize + meterOffset + battleLocationOffset, 24 * config.screenSize, 8 * config.screenSize);
    canvas.ctx.drawImage(image, leftOffset, 16 * config.screenSize + meterOffset + battleLocationOffset, 24 * config.screenSize, 8 * config.screenSize);
    canvas.ctx.fillStyle = color === 'White' ? "#c4cfa1" : "#6ca66c";
    canvas.ctx.fillRect(leftOffset + 4 * config.screenSize, 16 * config.screenSize + meterOffset + battleLocationOffset + 2 * config.screenSize, meterLength * config.screenSize, 3 * config.screenSize);
  });

  _defineProperty(this, "setCombo", function (canvas, combo, comboImg) {
    var tileMod = 8 * config.screenSize;
    var leftOffset = _this.dgmnData.isEnemy ? 3 * tileMod : 19 * tileMod;
    var battleLocationOffset = _this.dgmnData.battleLocation * 4 * tileMod;
    var _char = combo;
    canvas.ctx.clearRect(leftOffset, 4 * tileMod + battleLocationOffset, tileMod, tileMod);

    if (combo !== 'F') {
      canvas.ctx.drawImage(comboImg, fontData[_char][0] * 64, fontData[_char][1] * 64, 64, 64, leftOffset, 4 * tileMod + battleLocationOffset, tileMod, tileMod);
    }
  });

  this.listIndex = listIndex;
  this.dgmnData = dgmnData;
  this.currHP = new BattleMeter();
  this.currEN = new BattleMeter();
  this.statuses = [];
};

var attacksDB = {
  bubbles: {
    displayName: 'Bubbles',
    type: 'none',
    power: 'F',
    maxCost: 32,
    targets: 'single',
    hits: 2,
    animationFrames: [['bubbles1', 1], ['bubbles2', 4], ['bubbles1', 1]],
    animationFrameCount: 2
  },
  babyFlame: {
    displayName: 'BabyFlame',
    power: 'E',
    maxCost: 8,
    type: 'fire',
    targets: 'single',
    hits: 1,
    species: 'agu',
    animationFrames: [['babyFlame1', 1], ['babyFlame2', 1], ['babyFlame3', 4], ['babyFlame2', 1], ['babyFlame1', 1]],
    animationFrameCount: 3
  },
  megaFlame: {
    displayName: 'Mega Flame',
    power: 'D',
    maxCost: 8,
    type: 'fire',
    targets: 'single',
    hits: 1,
    animationFrames: [['babyFlame1', 1], ['babyFlame2', 1], ['babyFlame3', 4], ['babyFlame2', 1], ['babyFlame1', 1]],
    animationFrameCount: 3
  },
  petitFire: {
    displayName: 'Petit Fire',
    power: 'F',
    maxCost: 8,
    type: 'fire',
    targets: 'all',
    hits: 1
  }
};

var DgmnAttackMenu = function DgmnAttackMenu(fetchImageCallback) {
  var _this = this;

  _classCallCheck(this, DgmnAttackMenu);

  _defineProperty(this, "loadAttackList", function (attackData) {
    _this.attackList = attackData;
  });

  _defineProperty(this, "selectUp", function (canvas, newIndex) {
    if (newIndex >= 0) {
      _this.setSelection(canvas, newIndex);
    } else {
      console.log("Can't go up");
    }
  });

  _defineProperty(this, "selectDown", function (canvas, newIndex) {
    if (newIndex < _this.attackList.length) {
      _this.setSelection(canvas, newIndex);
    } else {
      console.log("Can't go down");
    }
  });

  _defineProperty(this, "setSelection", function (canvas, newIndex) {
    _this.clearCursor(canvas, _this.currentChoice);

    _this.paintCursor(canvas, newIndex);

    _this.currentChoice = newIndex;
  });

  _defineProperty(this, "clearCursor", function (canvas, index) {
    var tileMod = 8 * config.screenSize;
    canvas.ctx.fillStyle = '#00131A';
    canvas.ctx.fillRect((4 * 8 + 1) * config.screenSize, (2 + index * 2) * tileMod, tileMod - 1 * config.screenSize, tileMod);
  });

  _defineProperty(this, "paintCursor", function (canvas, index) {
    canvas.paintImage(_this.fetchImage('miniCursor'), 4 * (8 * config.screenSize), (2 + index * 2) * (8 * config.screenSize));
  });

  _defineProperty(this, "refreshList", function (canvas) {
    var loopCount = _this.attackList.length > 6 ? 6 : _this.attackList.length;

    for (var i = 0; i < loopCount; i++) {
      var attack = _this.attackList[i];
      var targetCount = attack.targets === 'single' ? 'targetOne' : 'targetAll';

      _this.textManagers[i].instantPaint(canvas, attack.displayName);

      canvas.ctx.drawImage(_this.fetchImage('costLabel'), 5 * (8 * config.screenSize), (3 + 2 * i) * (8 * config.screenSize), 16 * config.screenSize, 8 * config.screenSize);

      _this.calculateCost(canvas, attack, i);

      canvas.ctx.drawImage(_this.fetchImage("".concat(attack.type, "TypeIcon")), 16 * (8 * config.screenSize), (3 + 2 * i) * (8 * config.screenSize), 8 * config.screenSize, 8 * config.screenSize);
      canvas.ctx.drawImage(_this.fetchImage("pwr".concat(attack.power, "Icon")), 17 * (8 * config.screenSize), (3 + 2 * i) * (8 * config.screenSize), 8 * config.screenSize, 8 * config.screenSize);
      canvas.ctx.drawImage(_this.fetchImage(targetCount), 18 * (8 * config.screenSize), (3 + 2 * i) * (8 * config.screenSize), 8 * config.screenSize, 8 * config.screenSize);
      canvas.ctx.drawImage(_this.fetchImage('oneHitIcon'), 19 * (8 * config.screenSize), (3 + 2 * i) * (8 * config.screenSize), 8 * config.screenSize, 8 * config.screenSize);
    }
  });

  _defineProperty(this, "calculateCost", function (canvas, attack, index) {
    var blockCount = attack.maxCost / 4;
    var remCount = attack.currCost;

    for (var i = 0; i < blockCount; i++) {
      var remove = attack.maxCost - (i + 1) * 4;
      var check = attack.maxCost - remove - i * 4;

      var _final = 25 * (remCount - check);

      _final = _final >= 0 ? 0 : _final;
      _final = _final / 25 < -3 ? -100 : _final;
      canvas.ctx.drawImage(_this.fetchImage("costMeter".concat(100 + _final)), (7 + i) * (8 * config.screenSize), (3 + index * 2) * (8 * config.screenSize), 8 * config.screenSize, 8 * config.screenSize);
      remCount -= 4;
    }
  });

  this.attackList = [];
  this.currentChoice = 0;
  this.textManagers = [new TextManager([fetchImageCallback('fontsWhite')], 1, 15, 5, 2), new TextManager([fetchImageCallback('fontsWhite')], 1, 15, 5, 4), new TextManager([fetchImageCallback('fontsWhite')], 1, 15, 5, 6)];

  this.fetchImage = function (imageName) {
    return fetchImageCallback(imageName);
  };
};

var BattleMenu = function BattleMenu(dgmnData, gameScreenRedrawCallback, loadImageCallback, fetchImageCallback) {
  var _this = this;

  _classCallCheck(this, BattleMenu);

  _defineProperty(this, "buildStatusList", function () {
    for (var i = 0; i < _this.dgmnData.length; i++) {
      _this.dgmnStatusList.push(new DgmnBattleStatus(i, _this.dgmnData[i]));
    }
  });

  _defineProperty(this, "getStatusIndex", function (dgmnId) {
    var index = -1;

    for (var i = 0; i < _this.dgmnStatusList.length; i++) {
      if (_this.dgmnStatusList[i].dgmnData.dgmnId === dgmnId) {
        index = i;
      }
    }

    return index;
  });

  _defineProperty(this, "setTopText", function (message) {
    _this.topTextManager.instantPaint(_this.menuCanvas, message);
  });

  _defineProperty(this, "buildBattleMenus", function () {
    _this.menus.beetle = [];
    _this.menus.dgmn = {
      currentIndex: 0,
      totalIcons: 3,
      icons: [{
        label: 'Attack',
        activeImg: _this.fetchImage('attackSelected'),
        inactiveImg: _this.fetchImage('attackDeselected')
      }, {
        label: 'Defend',
        activeImg: _this.fetchImage('defendSelected'),
        inactiveImg: _this.fetchImage('defendDeselected')
      }, {
        label: 'Stats',
        activeImg: _this.fetchImage('statsSelected'),
        inactiveImg: _this.fetchImage('statsDeselected')
      }]
    };
    _this.menus.attack = {
      currentIndex: 0,
      currentPage: 0,
      currentPageMax: 0
    };
    _this.menus.targetSelect = {
      currentIndex: 0
    };
  });

  _defineProperty(this, "fullMenuPaint", function () {
    _this.paintMenu(0);

    _this.paintInitialIcons('dgmn'); // TODO - This should be set to Beetle, not DGMN


    _this.updateAllStatusBars();

    _this.drawAllComboLabels(); // Text Management


    _this.topTextManager.instantPaint(_this.menuCanvas, 'Attack');
  });

  _defineProperty(this, "paintInitialIcons", function (phase) {
    _this.menuCanvas.paintImage(_this.menus[phase].icons[0].activeImg, 112 * config.screenSize, 128 * config.screenSize);

    _this.menuCanvas.paintImage(_this.menus[phase].icons[1].inactiveImg, 128 * config.screenSize, 128 * config.screenSize);

    _this.menuCanvas.paintImage(_this.menus[phase].icons[2].inactiveImg, 144 * config.screenSize, 128 * config.screenSize);

    _this.triggerGameScreenRedraw();
  });

  _defineProperty(this, "setupDgmn", function (index) {
    _this.menuCanvas.ctx.clearRect(10 * (8 * config.screenSize), 2 * (8 * config.screenSize), 4 * (8 * config.screenSize), 12 * (8 * config.screenSize));

    _this.paintMenu(index);
  });

  _defineProperty(this, "paintMenu", function (index) {
    // TODO - All temporary, the inital screen should be based on Beetle Action, not DGMN action
    _this.menuCanvas.paintImage(_this.fetchImage('cursor'), 80 * config.screenSize, (2 + 4 * index) * (8 * config.screenSize) + 8 * config.screenSize); // Battle Cursor


    _this.paintBottomData(_this.dgmnData[index]);
  });

  _defineProperty(this, "clearBottomData", function (clearIcons) {
    if (clearIcons) {
      _this.menuCanvas.ctx.clearRect(0 * (8 * config.screenSize), 14 * (8 * config.screenSize), 20 * (8 * config.screenSize), 4 * (8 * config.screenSize));
    } else {
      _this.menuCanvas.ctx.clearRect(0 * (8 * config.screenSize), 14 * (8 * config.screenSize), 20 * (8 * config.screenSize), 2 * (8 * config.screenSize));

      _this.menuCanvas.ctx.clearRect(0 * (8 * config.screenSize), 16 * (8 * config.screenSize), 14 * (8 * config.screenSize), 2 * (8 * config.screenSize));
    }
  });

  _defineProperty(this, "paintBottomData", function (dgmn) {
    _this.clearBottomData();

    _this.dgmnNameTextManager.instantPaint(_this.menuCanvas, dgmn.nickname);

    _this.dgmnSpeciesTextManager.instantPaint(_this.menuCanvas, "".concat(dgmn.name, ".MON"));

    _this.currDgmnHP.instantPaint(_this.menuCanvas, ".hp".concat(dgmn.currHP));

    _this.currDgmnEN.instantPaint(_this.menuCanvas, ".en".concat(dgmn.currEN));

    _this.setDgmnPortrait(dgmn.name);

    _this.triggerGameScreenRedraw();
  });

  _defineProperty(this, "clearIcon", function (index) {
    _this.menuCanvas.ctx.clearRect((112 + 16 * index) * config.screenSize, 128 * config.screenSize, 16 * config.screenSize, 16 * config.screenSize);
  });

  _defineProperty(this, "setDgmnPortrait", function (species) {
    // TODO - Clear Portrait
    _this.menuCanvas.ctx.drawImage(_this.fetchImage("".concat(species.toLowerCase(), "Portrait")), 0, 0, 32 * 8, (32 - 1) * 8, 0 * 8 * config.screenSize, 14 * 8 * config.screenSize, 32 * config.screenSize, (32 - 1) * config.screenSize);
  });

  _defineProperty(this, "updateAllStatusBars", function () {
    for (var i = 0; i < _this.dgmnStatusList.length; i++) {
      _this.updateStatusBar(_this.dgmnStatusList[i], _this.dgmnData[_this.dgmnStatusList[i].listIndex].currHP, _this.dgmnData[_this.dgmnStatusList[i].listIndex].currStats[0], 'hp');

      _this.updateStatusBar(_this.dgmnStatusList[i], _this.dgmnData[_this.dgmnStatusList[i].listIndex].currEN, 100, 'en');
    }
  });

  _defineProperty(this, "drawAllComboLabels", function () {
    var tileMod = 8 * config.screenSize;

    for (var i = 0; i < _this.dgmnStatusList.length; i++) {
      var battleLocationOffset = _this.dgmnStatusList[i].dgmnData.battleLocation * 4 * tileMod;
      var leftOffset = _this.dgmnStatusList[i].dgmnData.isEnemy ? 0 : 16 * tileMod;

      _this.menuCanvas.paintImage(_this.fetchImage('comboLabel'), leftOffset, 4 * tileMod + battleLocationOffset);
    }
  });

  _defineProperty(this, "updateStatusBar", function (status, curr, max, bar) {
    var calcValue = Math.floor(curr / max * 18);
    var barColor = calcValue >= 9 ? 'White' : 'LightGreen';
    barColor = curr <= 0 ? 'DarkGreen' : barColor;
    status.drawMeter(_this.menuCanvas, bar, _this.fetchImage("dgmnBar".concat(barColor)), calcValue, barColor);

    _this.triggerGameScreenRedraw();
  });

  _defineProperty(this, "launchDgmnAttackMenu", function (attackList) {
    debugLog("Attacking");
    debugLog("-- Selecting attack...");
    _this.currentState = 'attack';

    _this.topTextManager.instantPaint(_this.menuCanvas, 'Select Attack');

    _this.menuCanvas.paintImage(_this.fetchImage('battleOptionSelectBaseRight'), 0, 0);

    _this.menuCanvas.paintImage(_this.fetchImage('miniCursor'), 4 * (8 * config.screenSize), 2 * (8 * config.screenSize)); // Build initial page


    _this.dgmnAttackMenu.currentChoice = 0;

    _this.dgmnAttackMenu.loadAttackList(_this.dgmnData[_this.currentDgmnActor].permAttacks);

    _this.dgmnAttackMenu.refreshList(_this.menuCanvas, 0);

    _this.triggerGameScreenRedraw();
  });

  _defineProperty(this, "closeDgmnAttackMenu", function () {
    _this.topTextManager.instantPaint(_this.menuCanvas, 'Attack');

    _this.menuCanvas.ctx.clearRect(4 * (8 * config.screenSize), 2 * (8 * config.screenSize), 16 * (8 * config.screenSize), 12 * (8 * config.screenSize)); // Redraw the Status Sections


    for (var i = 0; i < _this.dgmnStatusList.length; i++) {
      _this.updateStatusBar(_this.dgmnStatusList[i], _this.dgmnData[_this.dgmnStatusList[i].listIndex].currHP, _this.dgmnData[_this.dgmnStatusList[i].listIndex].currStats[0], 'hp');

      _this.updateStatusBar(_this.dgmnStatusList[i], _this.dgmnData[_this.dgmnStatusList[i].listIndex].currEN, 100, 'en');

      _this.dgmnStatusList[i].setCombo(_this.menuCanvas, _this.dgmnStatusList[i].dgmnData.comboLetter, _this.fetchImage('fontsWhite'));
    }

    _this.drawAllComboLabels();

    _this.triggerGameScreenRedraw();
  });

  _defineProperty(this, "launchSelectTarget", function () {
    debugLog("-- Selecting target...");
    _this.currentState = 'targetSelect';

    _this.closeDgmnAttackMenu();

    var attackData = attacksDB[_this.dgmnAttackMenu.attackList[_this.dgmnAttackMenu.currentChoice].attackName];

    if (attackData.targets === 'single') {
      _this.menuCanvas.paintImage(_this.fetchImage('cursorLeft'), 8 * (8 * config.screenSize), 16 * config.screenSize + 8 * config.screenSize);
    } else {
      console.log("MULTI TARGET");
    }

    _this.triggerGameScreenRedraw();
  });

  _defineProperty(this, "setCurrentIcon", function (index) {
    var prevIndex = _this.menus[_this.currentState].currentIndex;
    _this.menus[_this.currentState].currentIndex = index;

    _this.clearIcon(prevIndex);

    _this.clearIcon(index);

    _this.menuCanvas.paintImage(_this.menus[_this.currentState].icons[prevIndex].inactiveImg, (112 + 16 * prevIndex) * config.screenSize, 128 * config.screenSize);

    _this.menuCanvas.paintImage(_this.menus[_this.currentState].icons[index].activeImg, (112 + 16 * index) * config.screenSize, 128 * config.screenSize);

    _this.topTextManager.clearTextBox(_this.menuCanvas);

    _this.topTextManager.instantPaint(_this.menuCanvas, _this.menus[_this.currentState].icons[index].label);

    _this.triggerGameScreenRedraw();
  });

  // TODO - I do not want (if I can help it) ANY dgmnData in this file
  this.dgmnData = dgmnData;
  this.currentState = 'dgmn'; // none | beetle | dgmn | attack | item

  this.currentDgmnActor = 0;
  this.selectedAttack;
  this.topTextManager = new TextManager([fetchImageCallback('fontsWhite')], 1, 20, 0, 1); // TODO - I'm not worried about the font loading slower than anything else, but just in case, I should change this a little...

  this.bottomTextManager = new TextManager([fetchImageCallback('fontsWhite')], 4, 16, 4, 14);
  this.dgmnNameTextManager = new TextManager([fetchImageCallback('fontsWhite')], 1, 10, 4, 14);
  this.dgmnSpeciesTextManager = new TextManager([fetchImageCallback('fontsLightGreen')], 1, 16, 4, 15);
  this.currDgmnHP = new TextManager([fetchImageCallback('fontsWhite'), fetchImageCallback('fontsLightGreen')], 1, 6, 4, 16, function (_char) {
    if (_char === 'hp') {
      return 1;
    }

    return 0;
  });
  this.currDgmnEN = new TextManager([fetchImageCallback('fontsWhite'), fetchImageCallback('fontsLightGreen')], 1, 6, 4, 17, function (_char2) {
    if (_char2 === 'en') {
      return 1;
    }

    return 0;
  });
  this.dgmnStatusList = [];
  this.menus = {};
  this.menuImages = ['./sprites/Battle/Menu/dgmn-bar-white.png', './sprites/Battle/Menu/dgmn-bar-light-green.png', './sprites/Battle/Menu/attack-select-popup-base.png'];
  this.menuCanvas = new GameCanvas('battle-menu-canvas', 160, 144, 0, 0, false);
  this.menuCanvas.loadImageStack(this.menuImages); // this.dgmnPortraits = new DgmnPortrait(this.dgmnData,'sm'); // TODO - Find a way to load this in post, without the constructor needing any dgmnData

  this.dgmnAttackMenu = new DgmnAttackMenu(function (imageName) {
    return fetchImageCallback(imageName);
  });
  this.buildStatusList();

  this.triggerGameScreenRedraw = function () {
    gameScreenRedrawCallback();
  };

  this.fetchImage = function (imageName) {
    return fetchImageCallback(imageName);
  };
}
/**------------------------------------------------------------------------
 * BUILD STATUS LIST
 * ------------------------------------------------------------------------
 * Creates the List of Status Elements (HP/EN/Spec Conditions).
 * TODO - This should be in the Battle Element
 * ----------------------------------------------------------------------*/
;

var genericImages = ['./sprites/Battle/Menu/miniCursor.png', './sprites/Menus/typeLabel.png', './sprites/Menus/costLabel.png', './sprites/Menus/targetLabel.png', './sprites/Menus/powerLabel.png', './sprites/Menus/hitLabel.png', './sprites/Menus/noneTypeIcon.png', './sprites/Menus/fireTypeIcon.png', './sprites/Menus/targetOne.png', './sprites/Menus/targetAll.png', './sprites/Menus/pwrFIcon.png', './sprites/Menus/pwrEIcon.png', './sprites/Menus/pwrDIcon.png', './sprites/Menus/oneHitIcon.png', './sprites/Menus/costMeter100.png', './sprites/Menus/costMeter75.png', './sprites/Menus/costMeter50.png', './sprites/Menus/costMeter25.png', './sprites/Menus/costMeter0.png'];
var fontImages = ['./sprites/Fonts/fontsBlack.png', './sprites/Fonts/fontsWhite.png', './sprites/Fonts/fontsLightGreen.png'];
var battleImages = ['./sprites/Battle/battleBackground.png', './sprites/Battle/Menu/cursor.png', './sprites/Battle/Menu/cursorLeft.png', './sprites/Battle/Menu/attackDeselected.png', './sprites/Battle/Menu/attackSelected.png', './sprites/Battle/Menu/defendDeselected.png', './sprites/Battle/Menu/defendSelected.png', './sprites/Battle/Menu/statsDeselected.png', './sprites/Battle/Menu/statsSelected.png', './sprites/Battle/Menu/dgmnBarWhite.png', './sprites/Battle/Menu/dgmnBarLightGreen.png', './sprites/Battle/Menu/dgmnBarDarkGreen.png', './sprites/Battle/Menu/battleOptionSelectBaseRight.png', './sprites/Battle/Menu/comboLabel.png', './sprites/Battle/Menu/weak1.png', './sprites/Battle/Menu/weak2.png', './sprites/Battle/Menu/weak3.png'];

// Handles all of the actual values for Ranks (F - S)
var powerRanks = {
  F: .5,
  E: .75,
  D: 1,
  C: 1.5,
  B: 2,
  A: 4,
  S: 8
};
var comboRanks = {
  F: .75,
  E: 1,
  D: 1.5,
  C: 2,
  B: 3,
  A: 4,
  S: 6
};

var Attack = function Attack(attackName) {
  var _this = this;

  _classCallCheck(this, Attack);

  _defineProperty(this, "calculateDamage", function (targetDefense, attackerAttack, attackerLevel) {
    // FORMULA: ( ( ATK / DEF ) * (LV / 2 ) ) * ( PWR / 2 )
    // The reason you have /2's is because the "weight" of that variable needs to be weaker
    var atkDefDiff = attackerAttack / targetDefense;
    var preMods = Math.floor(atkDefDiff * (attackerLevel / 2) * powerRanks[_this.power] / _this.hits);
    return preMods;
  });

  _defineProperty(this, "animate", function (target, attacker, triggerRedraw, canvas, fetchImage, callback) {
    attacker.battleCanvas.attackAnimation();
    target.battleCanvas.hurtAnimation();
    var x = target.isEnemy ? 4 * (8 * config.screenSize) : 12 * (8 * config.screenSize);
    var y = (2 + target.battleLocation * 4) * (8 * config.screenSize);
    triggerRedraw();
    var animationCounter = 0;
    var animationSection = 0;
    canvas.clearCanvas();
    var attackAnimation = setInterval(function () {
      if (animationCounter === 0) {
        canvas.clearCanvas();

        if (animationSection === _this.animationFrames.length) {
          canvas.clearCanvas();
          triggerRedraw();
          clearInterval(attackAnimation);
          setTimeout(function () {
            attacker.battleCanvas.isIdle = true;
            if (!target.isDead) target.battleCanvas.isIdle = true;
            triggerRedraw();
          }, 200);
          setTimeout(function () {
            callback();
          }, 1200);
        } else {
          canvas.paintImage(fetchImage(_this.animationFrames[animationSection][0]), x, y);
          triggerRedraw();
        }

        animationCounter++;
      } else if (animationCounter !== 0 && animationCounter >= _this.animationFrames[animationSection][1]) {
        animationSection++;
        animationCounter = 0;
      } else {
        animationCounter++;
      }
    }, 66);
  });

  this.attackName = attackName;
  this.displayName = attacksDB[this.attackName].displayName;
  this.type = attacksDB[this.attackName].type;
  this.maxCost = attacksDB[this.attackName].maxCost;
  this.currCost = 6;
  this.power = attacksDB[this.attackName].power;
  this.targets = attacksDB[this.attackName].targets;
  this.hits = attacksDB[this.attackName].hits;
  this.animationFrames = attacksDB[this.attackName].animationFrames;
}
/**------------------------------------------------------------------------
 * CALCULATE DAMAGE
 * ------------------------------------------------------------------------
 * Calculates the amount of damage the attack will do.
 * Does NOT include modifiers like weakness, criticals, etc.
 * ------------------------------------------------------------------------
 * @param {Number} targetDefense  DEF/RES stat of the Dgmn being attacked
 * @param {Number} attackerAttack ATK/INT stat of the Dgmn attacking
 * @param {Number} attackerLevel  Level of the Dgmn attacking
 * ----------------------------------------------------------------------*/
;

var Battle = function Battle(_dgmnList, enemyDgmnList, _loadedCallback, addObjectCallback, gameScreenRedrawCallback, loadImageCallback, fetchImageCallback) {
  var _this = this;

  _classCallCheck(this, Battle);

  _defineProperty(this, "loadBattle", function () {
    debugLog("-- Loading Battle");

    _this.loadBattleImages(function () {
      // Load Player Dgmn
      _this.loadDgmn(_this.dgmnList, false);

      _this.addDgmnToObjectList(_this.dgmnList, false); // Load Enemy Dgmn


      _this.loadDgmn(_this.enemyDgmnList, true);

      _this.addDgmnToObjectList(_this.enemyDgmnList, true); // Setup Initial Battle Menu


      _this.addObject(_this.battleMenu.menuCanvas);

      _this.battleMenu.buildBattleMenus();

      _this.battleMenu.fullMenuPaint(); // Load Attack Canvas


      _this.addObject(_this.attackCanvas);

      _this.onLoaded();
    });
  });

  _defineProperty(this, "loadBattleImages", function (loadedCallback) {
    // Get all of the Dgmn-related Images together
    var allDgmn = _this.dgmnList.concat(_this.enemyDgmnList);

    var dgmnImages = [];

    for (var i = 0; i < allDgmn.length; i++) {
      // TODO - I need to push these to an array, and loop them, rather than declaring each
      var urlOne = "./sprites/Battle/Dgmn/".concat(allDgmn[i].name.toLowerCase(), "Idle0.png");
      var urlTwo = "./sprites/Battle/Dgmn/".concat(allDgmn[i].name.toLowerCase(), "Idle1.png");
      var attackUrl = "./sprites/Battle/Dgmn/".concat(allDgmn[i].name.toLowerCase(), "Attack.png");
      var hurtUrl = "./sprites/Battle/Dgmn/".concat(allDgmn[i].name.toLowerCase(), "Hurt.png");
      var urlThree = "./sprites/Battle/Dgmn/".concat(allDgmn[i].name.toLowerCase(), "Portrait.png");

      if (!dgmnImages.includes(urlOne)) {
        dgmnImages.push(urlOne);
        dgmnImages.push(urlTwo);
        dgmnImages.push(urlThree);
        dgmnImages.push(attackUrl);
        dgmnImages.push(hurtUrl);
      }
    }

    var allImages = battleImages.concat(dgmnImages); // Battle Images + Dgmn Images

    _this.loadImages(allImages, function () {
      _this.battleBackground.imageStack = [_this.fetchImage('battleBackground')];

      _this.battleBackground.paintImage(_this.battleBackground.imageStack[0]);

      _this.addObject(_this.battleBackground);

      loadedCallback();
    });
  });

  _defineProperty(this, "addDgmnToObjectList", function (dgmnList) {
    for (var i = 0; i < dgmnList.length; i++) {
      _this.addObject(dgmnList[i].battleCanvas);
    }
  });

  _defineProperty(this, "loadDgmn", function (dgmnList, isEnemy) {
    for (var i = 0; i < dgmnList.length; i++) {
      var dgmn = dgmnList[i];
      var imageStack = [_this.fetchImage("".concat(dgmn.name.toLowerCase(), "Idle0")), _this.fetchImage("".concat(dgmn.name.toLowerCase(), "Idle1")), _this.fetchImage("".concat(dgmn.name.toLowerCase(), "Attack")), _this.fetchImage("".concat(dgmn.name.toLowerCase(), "Hurt"))];
      dgmn.initBattleCanvas(_this.triggerGameScreenRedraw, imageStack);
      dgmn.battleCanvas.x = isEnemy ? 2 * (16 * config.screenSize) : 6 * (16 * config.screenSize);
      dgmn.battleCanvas.y = 16 * config.screenSize + 32 * i * config.screenSize;
      dgmn.battleCanvas.paintImage(dgmn.battleCanvas.imageStack[0], 0, 0, isEnemy);
      var speed = 1200 - Math.floor(dgmn.baseStats[7] * 2) * 33;
      dgmn.battleCanvas.animate(speed);
    }
  });

  _defineProperty(this, "generateEnemies", function (encounterData) {// new Dgmn / enemy
  });

  _defineProperty(this, "generateEnemyAttacks", function () {
    // TODO - This is manual right now, needs to have a BUNCH of logic and Data here...
    _this.attackActions[4] = {
      attacker: _this.enemyDgmnList[0],
      target: _this.dgmnList[0],
      attack: new Attack('babyFlame')
    };
  });

  _defineProperty(this, "setupOrder", function () {
    var order = _this.dgmnList.concat(_this.enemyDgmnList);

    for (var i = 0; i < order.length; i++) {
      for (var r = 0; r < order.length - 1; r++) {
        var temp = order[r];
        var currSpeed = order[r].currStats[7];
        var nextSpeed = order[r + 1].currStats[7];

        if (currSpeed < nextSpeed) {
          order[r] = order[r + 1];
          order[r + 1] = temp;
        }
      }
    }

    return order;
  });

  _defineProperty(this, "buildAttackImageList", function (attackList) {
    var imagesList = [];

    for (var prop in attackList) {
      var attackName = attackList[prop].attack.attackName;

      if (!_this.loadedAttacks.includes(attackName)) {
        _this.loadedAttacks.push(attackName);

        for (var r = 0; r < attacksDB[attackName].animationFrameCount; r++) {
          var url = "./sprites/Battle/Attacks/".concat(attackName).concat(r + 1, ".png");
          if (!imagesList.includes(url)) imagesList.push(url);
        }
      }
    }

    return imagesList;
  });

  _defineProperty(this, "loadAttacks", function () {
    _this.battleMenu.clearBottomData(true);

    var attackImageList = _this.buildAttackImageList(_this.attackActions);

    if (attackImageList.length !== 0) {
      _this.loadImages(attackImageList, function () {
        _this.runAttacks();
      });
    } else {
      _this.runAttacks();
    }
  });

  _defineProperty(this, "runAttacks", function () {
    var turnOrder = _this.setupOrder();

    var i = 0;
    var prevI = -1; // Runs every frame and checks for the currently attacking Dgmn to be 'done'

    var attackInterval = setInterval(function () {
      if (i !== prevI) {
        prevI = i;

        if (!turnOrder[i].isDead) {
          _this.attack(_this.attackActions[turnOrder[i].dgmnId]);
        }
      }

      if (_this.attackActions[turnOrder[i].dgmnId].status === 'done') i++;

      if (i === turnOrder.length) {
        _this.startNewTurn();

        clearInterval(attackInterval);
      } else if (_this.battleResult !== 'ongoing') {
        // If the battle is ever switched "off", stop Attacks
        clearInterval(attackInterval);
      }
    }, 33);
  });

  _defineProperty(this, "attack", function (attackAction) {
    var target = attackAction.target;
    var attacker = attackAction.attacker;
    var attack = attackAction.attack;
    debugLog("-- ".concat(attacker.nickname, " uses ").concat(attack.attackName, " on ").concat(target.nickname)); // Reduce EN / Cost

    attack.currCost--;
    var enCost = Math.floor(100 / 4 / attack.maxCost);
    enCost = enCost <= 0 ? 1 : enCost;
    attacker.currEN -= enCost; // Handle Types

    var typeMod = target.types[attack.type] || 1;
    var totalDamage = 0; // Loop through the Hit Count and do Damage

    for (var i = 0; i < attack.hits; i++) {
      // Handle Combo
      var comboMod = .75;

      if (typeMod === 1) {
        target.currCombo++;
      } else if (typeMod > 1) {
        target.currCombo += 2;
      }

      var comboLetter = _this.getComboLetter(target.currCombo);

      target.comboLetter = comboLetter;
      comboMod = comboRanks[comboLetter]; // Update Statuses and Messaging

      var topMessage = "";

      if (typeMod > 1) {
        topMessage += 'Strong Attack!';
      } else if (typeMod < 1) {
        topMessage += 'Weak Attack. ';
      }

      if (attack.hits > 1) {
        topMessage += "".concat(attack.hits, " hits! ");
      }

      _this.battleMenu.setTopText(topMessage);

      _this.battleMenu.dgmnStatusList[_this.battleMenu.getStatusIndex(target.dgmnId)].setCombo(_this.battleMenu.menuCanvas, target.comboLetter, _this.fetchImage('fontsWhite')); // Calculate Damage


      var damage = attack.calculateDamage(target.currStats[3], attacker.currStats[2], attacker.level);
      var postMods = damage * typeMod * comboMod; // TODO - Add all of the mods

      var rando = Math.floor(Math.random() * (4 - 1) + 1); // Add in a Random number from 1-3

      var finalDamage = Math.floor(postMods) + rando;
      debugLog("---- Attack Damage = ", finalDamage);
      totalDamage += finalDamage; // Handle "effects"
    }

    target.currHP -= totalDamage; // Handle Bottom information

    _this.battleMenu.clearBottomData(true);

    _this.battleMenu.setDgmnPortrait(attacker.name);

    var attackMessage = attacker.isEnemy ? "Enemy ".concat(attacker.name, ".MON used ").concat(attack.displayName, "!") : "".concat(attacker.nickname, " used ").concat(attack.displayName, "!");

    _this.battleMenu.bottomTextManager.slowPaint(_this.battleMenu.menuCanvas, attackMessage, _this.triggerGameScreenRedraw);

    attack.animate(target, attacker, _this.triggerGameScreenRedraw, _this.attackCanvas, _this.fetchImage, function () {
      _this.attackCanvas.clearCanvas();

      attackAction.status = 'done';
    });
    if (target.currHP <= 0) _this.knockOut(target);

    _this.battleMenu.updateAllStatusBars();
  });

  _defineProperty(this, "knockOut", function (target) {
    target.currHP = 0;
    target.currEN = 0;
    target.battleCanvas.isIdle = false;
    target.battleCanvas.clearCanvas();
    debugLog("Target DGMN was KO'd");
    target.isDead = true;

    _this.checkAllDead(target.isEnemy);
  });

  _defineProperty(this, "checkAllDead", function (isEnemy) {
    var checkList = isEnemy ? _this.enemyDgmnList : _this.dgmnList;
    var dgmnCount = 0;

    var _iterator = _createForOfIteratorHelper(checkList),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var dgmn = _step.value;
        if (dgmn.isDead) dgmnCount++;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (dgmnCount >= checkList.length) {
      isEnemy ? _this.battleWin() : _this.battleLose();
    }
  });

  _defineProperty(this, "getComboLetter", function (combo) {
    var letter = 'F';

    if (combo > 1 && combo < 5) {
      letter = 'E';
    } else if (combo > 4 && combo < 9) {
      letter = 'D';
    } else if (combo > 8 && combo < 14) {
      letter = 'C';
    } else if (combo > 13 && combo < 19) {
      letter = 'B';
    } else if (combo > 18 && combo < 24) {
      letter = 'A';
    } else if (combo >= 25) {
      letter = 'S';
    }

    return letter;
  });

  _defineProperty(this, "resetCombos", function (isEnemy) {
    var list = isEnemy ? _this.enemyDgmnList : _this.dgmnList;

    for (var i = 0; i < list.length; i++) {
      var combo = list[i].currCombo - 5;
      combo = combo < 0 ? 0 : combo;

      var comboLetter = _this.getComboLetter(combo);

      list[i].currCombo = combo;
      list[i].comboLetter = comboLetter;

      _this.battleMenu.dgmnStatusList[_this.battleMenu.getStatusIndex(list[i].dgmnId)].setCombo(_this.battleMenu.menuCanvas, comboLetter, _this.fetchImage('fontsWhite'));
    }
  });

  _defineProperty(this, "startNewTurn", function () {
    _this.turn++;
    _this.attackActions = {}; // Reset Combos - Ally, then Enemy

    _this.resetCombos();

    _this.resetCombos(true); // Reset Battle Menu


    _this.battleMenu.menus.dgmn.currentIndex = 0;
    _this.battleMenu.currentState = 'dgmn';
    _this.battleMenu.currentDgmnActor = 0;

    _this.battleMenu.setTopText(_this.battleMenu.menus.dgmn.icons[0].label);

    _this.battleMenu.menuCanvas.paintImage(_this.fetchImage('cursor'), 80 * config.screenSize, (2 + 4 * 0) * (8 * config.screenSize) + 8 * config.screenSize);

    _this.battleMenu.paintBottomData(_this.dgmnList[0]);

    _this.battleMenu.paintInitialIcons('dgmn');
  });

  _defineProperty(this, "battleWin", function () {
    _this.battleResult = 'win';

    _this.battleMenu.setTopText('Victory');

    debugLog('You Win!!'); //TODO - Below
    // Calculate EXP
    // Calculate Drops
    // End Battle State
  });

  _defineProperty(this, "battleLose", function () {
    _this.battleResult = 'lose';
    debugLog('You lost...'); // TODO - All of the below:
    //        Reset Dgmn to Egg
    //        Put you back in town
    //        Clear Items
  });

  _defineProperty(this, "keyTriage", function (key) {
    if (key === 'action') {
      _this.actionKeyHandler();
    } else if (key === 'cancel') {
      _this.cancelKeyHandler();
    } else if (key === 'up') {
      _this.upKeyHandler();
    } else if (key === 'right') {
      _this.rightKeyHandler();
    } else if (key === 'down') {
      _this.downKeyHandler();
    } else if (key === 'left') {
      _this.leftKeyHandler();
    }
  });

  _defineProperty(this, "actionKeyHandler", function () {
    if (_this.battleMenu.currentState === 'dgmn') {
      if (_this.battleMenu.menus.dgmn.currentIndex === 0) {
        _this.battleMenu.launchDgmnAttackMenu();
      }
    } else if (_this.battleMenu.currentState === 'attack') {
      var chosenAttack = _this.battleMenu.dgmnAttackMenu.attackList[_this.battleMenu.dgmnAttackMenu.currentChoice];
      _this.battleMenu.selectedAttack = chosenAttack;

      _this.battleMenu.launchSelectTarget();
    } else if (_this.battleMenu.currentState === 'targetSelect') {
      _this.battleMenu.menuCanvas.ctx.clearRect(8 * (8 * config.screenSize), 2 * (8 * config.screenSize), 2 * (8 * config.screenSize), 12 * (8 * config.screenSize));

      _this.triggerGameScreenRedraw();

      var dgmnId = _this.dgmnList[_this.battleMenu.currentDgmnActor].dgmnId; // Add Attack to Attack Actions List

      _this.attackActions[dgmnId] = {
        attacker: _this.dgmnList[_this.battleMenu.currentDgmnActor],
        target: _this.enemyDgmnList[_this.battleMenu.menus.targetSelect.currentIndex],
        attack: _this.battleMenu.selectedAttack,
        status: 'todo'
      };

      if (_this.battleMenu.currentDgmnActor === _this.dgmnList.length - 1) {
        _this.generateEnemyAttacks();

        debugLog("Running Attacks...");

        _this.loadAttacks();
      } else {
        _this.battleMenu.currentState = 'dgmn';
        _this.battleMenu.currentDgmnActor++;

        _this.battleMenu.setupDgmn(_this.battleMenu.currentDgmnActor);
      }
    }
  });

  _defineProperty(this, "upKeyHandler", function () {
    if (_this.battleMenu.currentState === 'attack') {
      _this.battleMenu.dgmnAttackMenu.selectUp(_this.battleMenu.menuCanvas, _this.battleMenu.dgmnAttackMenu.currentChoice - 1);

      _this.triggerGameScreenRedraw();
    }
  });

  _defineProperty(this, "rightKeyHandler", function () {
    if (_this.battleMenu.currentState === 'dgmn') {
      var newIndex = _this.battleMenu.menus.dgmn.currentIndex === _this.battleMenu.menus.dgmn.totalIcons - 1 ? 0 : _this.battleMenu.menus.dgmn.currentIndex + 1;

      _this.battleMenu.setCurrentIcon(newIndex);
    }
  });

  _defineProperty(this, "downKeyHandler", function () {
    if (_this.battleMenu.currentState === 'attack') {
      _this.battleMenu.dgmnAttackMenu.selectDown(_this.battleMenu.menuCanvas, _this.battleMenu.dgmnAttackMenu.currentChoice + 1);

      _this.triggerGameScreenRedraw();
    }
  });

  _defineProperty(this, "leftKeyHandler", function () {
    if (_this.battleMenu.currentState === 'dgmn') {
      var newIndex = _this.battleMenu.menus.dgmn.currentIndex === 0 ? _this.battleMenu.menus.dgmn.totalIcons - 1 : _this.battleMenu.menus.dgmn.currentIndex - 1;

      _this.battleMenu.setCurrentIcon(newIndex);
    }
  });

  _defineProperty(this, "cancelKeyHandler", function () {
    if (_this.battleMenu.currentState === 'attack') {
      _this.battleMenu.currentState = 'dgmn';

      _this.battleMenu.closeDgmnAttackMenu();
    }
  });

  this.battleActive = true;
  this.dgmnList = _dgmnList;
  this.enemyDgmnList = enemyDgmnList;
  this.battleResult = 'ongoing';
  this.turn = 0;
  this.attackActions = {};

  this.triggerGameScreenRedraw = function () {
    gameScreenRedrawCallback();
  };

  this.addObject = function (newObject) {
    addObjectCallback(newObject);
  };

  this.loadImages = function (imageList, callback) {
    loadImageCallback(imageList, callback);
  };

  this.fetchImage = function (imageName) {
    return fetchImageCallback(imageName);
  };

  this.loadedAttacks = [];
  this.battleBackground = new BackgroundCanvas('background-canvas', 160, 144);
  this.battleMenu = new BattleMenu(this.dgmnList.concat(this.enemyDgmnList), gameScreenRedrawCallback, loadImageCallback, this.fetchImage);
  this.attackCanvas = new GameCanvas('attack-canvas', 160, 144);

  this.onLoaded = function () {
    _loadedCallback();
  };

  this.loadBattle();
}
/**------------------------------------------------------------------------
 * LOAD BATTLE
 * ------------------------------------------------------------------------
 * Loads all data and then preps the menus.
 * Relies on all Battle Images being loaded
 * ----------------------------------------------------------------------*/
;

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
  Agu: {
    stage: 3,
    "class": 'vaccine',
    crests: [0],
    stats: [5, 5, 5, 5, 5, 5, 5, 5],
    evolutions: evolutions['agu'],
    types: {
      fire: .5,
      water: 1.5,
      plant: .75,
      evil: 2
    }
  },
  Gabu: {
    stage: 3,
    "class": 'data',
    crests: [0],
    stats: [5, 5, 5, 5, 5, 5, 5, 6],
    evolutions: evolutions['agu']
  },
  Grey: {
    stage: 4,
    "class": 'vaccine',
    crests: [0],
    stats: [6, 5, 5, 5, 5, 5, 5, 6],
    evolutions: evolutions['agu'],
    types: {
      fire: .5,
      water: 1.5,
      plant: .75,
      evil: 2
    }
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

    _defineProperty(_assertThisInitialized(_this), "attackAnimation", function () {
      _this.isIdle = false;

      _this.clearCanvas();

      _this.paintImage(_this.imageStack[2]);

      _this.triggerGameScreenRedraw();
    });

    _defineProperty(_assertThisInitialized(_this), "hurtAnimation", function () {
      _this.isIdle = false;

      _this.clearCanvas();

      _this.paintImage(_this.imageStack[3]);

      _this.triggerGameScreenRedraw();
    });

    _this.dgmnName = dgmnName;
    _this.frames = [];
    _this.animateSpeed = 2000;
    return _this;
  }

  return BattleDgmnCanvas;
}(GameCanvas);

/**
 * DIGIMON
 * @param {Number}  id              Each Dgmn is assigned a basic number ID, to track
 * @param {String}  nickname        Name given to a Dgmn by the Player
 * @param {String}  name            The species name (does not include MON)
 * @param {Number}  level           Dgmn's Level, grown by EXP
 * @param {Number}  battleLocation  Where in your party they are located (0-2)
 * @param {Boolean} isEnemy         Whether the Dgmn is an Enemy or not
 */

var Dgmn = function Dgmn(id, nickname, name, battleLocation, isEnemy) {
  var _this = this;

  _classCallCheck(this, Dgmn);

  _defineProperty(this, "loadDgmn", function (loadData) {
    // Go through and load in all of the data
    _this.level = loadData.level || _this.level;
    _this.permAttacks = loadData.permAttacks || _this.permAttacks;
  });

  _defineProperty(this, "initBattleCanvas", function (gameScreenRedrawCallback, imageStack) {
    _this.battleCanvas = new BattleDgmnCanvas(_this.name, 'dgmn-canvas', 32, 32, 0, 0, true, gameScreenRedrawCallback);
    _this.battleCanvas.imageStack = imageStack;
  });

  _defineProperty(this, "calcEnergyCost", function (maxCost) {
    var cost = 0;
    cost = Math.floor(_this.currStats[1] / maxCost);
    cost = cost <= 0 ? 0 : cost;
    return cost;
  });

  _defineProperty(this, "buildDgmn", function () {
    for (var i = 0; i < _this.baseStats.length; i++) {
      var finalStat = _this.baseStats[i] * _this.level;
      finalStat *= i < 2 ? 1.5 : 1;
      finalStat = Math.floor(finalStat);

      _this.currStats.push(finalStat);
    }
  });

  this.dgmnId = id;
  this.nickname = nickname;
  this.name = name;
  this.stage = dgmnDB[name].stage;
  this["class"] = dgmnDB[name]["class"];
  this.baseStats = dgmnDB[name].stats;
  this.crests = dgmnDB[name].crests;
  this.types = dgmnDB[name].types; // Permanent

  this.permAttacks = [];
  this.permCrests = {};
  this.permSync = {};
  this.fullDgmnList = []; // Every Dgmn this Dgmn has ever been
  // Temporary - Only Matters per hatch, resets on reversion to egg

  this.level = 1;
  this.currDgmnPath = []; // The Dgmn this Dgmn has become since it hatched

  this.currHP = 52;
  this.currEN = 70;
  this.currHunger = 0;
  this.currPoop = 0;
  this.currStats = [];
  this.currCombo = 0;
  this.comboLetter = 'F';
  this.currConditions = [];
  this.currBuffs = [];
  this.battleCanvas;
  this.battleLocation = battleLocation || 0;
  this.isEnemy = isEnemy || false;
  this.isDead = false;
};

var setupMockDgmn = function setupMockDgmn() {
  var dgmnList = [new Dgmn(0, 'FLAME', 'Agu', 0), new Dgmn(1, 'BLITZ', 'Grey', 1) // new Dgmn(2,'FROST','Gabu',2)
  ]; // MOCK DGMN

  dgmnList[0].level = 12;
  dgmnList[0].permAttacks = [new Attack('babyFlame'), new Attack('bubbles')];
  dgmnList[0].permAttacks[0].currCost = 3;
  dgmnList[0].permAttacks[1].currCost = 24;
  dgmnList[0].buildDgmn();
  dgmnList[1].level = 7;
  dgmnList[1].permAttacks = [new Attack('megaFlame'), new Attack('babyFlame'), new Attack('bubbles')];
  dgmnList[1].permAttacks[0].currCost = 8;
  dgmnList[1].permAttacks[1].currCost = 4;
  dgmnList[1].permAttacks[2].currCost = 30;
  dgmnList[1].buildDgmn(); // dgmnList[2].level = 4;
  // dgmnList[2].buildDgmn();
  // dgmnList[2].permAttacks = [
  //   new Attack('petitFire'),
  //   new Attack('bubbles')
  // ]
  // dgmnList[2].permAttacks[0].currCost = 6;

  return dgmnList;
};
var setupMockEnemyDgmn = function setupMockEnemyDgmn() {
  var dgmnList = [new Dgmn(4, 'ENEMY', 'Agu', 0, true)];
  dgmnList[0].level = 8;
  dgmnList[0].buildDgmn();
  return dgmnList;
};

var mockDgmn = setupMockDgmn();
var mockEnemyDgmn = setupMockEnemyDgmn();
/**------------------------------------------------------------------------
 * GAME
 * ------------------------------------------------------------------------
 * Manager for all Game Elements, which includes most things
 * ------------------------------------------------------------------------
 * @param {Function} loadImageCallback  Callback used by the System to load Images
 * @param {Function} fetchImageCallback Gets an image from the System
 * ----------------------------------------------------------------------*/

var Game = function Game(loadImageCallback, fetchImageCallback) {
  var _this = this;

  _classCallCheck(this, Game);

  _defineProperty(this, "bootGame", function () {// TODO - Once the game is more fleshed-out, run through this, rather than debuggers
  });

  _defineProperty(this, "keyHandler", function (keyState) {
    if (keyState[config.keyBindings.action]) {
      _this.keyManager('action');
    } else {
      _this.keyTimers.action = 0;
    }

    if (keyState[config.keyBindings.cancel]) {
      _this.keyManager('cancel');
    } else {
      _this.keyTimers.cancel = 0;
    }

    if (keyState[config.keyBindings.up]) {
      _this.keyManager('up');
    } else {
      _this.keyTimers.up = 0;
    }

    if (keyState[config.keyBindings.right]) {
      _this.keyManager('right');
    } else {
      _this.keyTimers.right = 0;
    }

    if (keyState[config.keyBindings.down]) {
      _this.keyManager('down');
    } else {
      _this.keyTimers.down = 0;
    }

    if (keyState[config.keyBindings.left]) {
      _this.keyManager('left');
    } else {
      _this.keyTimers.left = 0;
    }
  });

  _defineProperty(this, "keyManager", function (key) {
    _this.keyTimers[key]++; // DGMN MENU

    if (_this.battle.battleActive) {
      if (_this.keyTimers[key] === 2) {
        // Prevent instant tap from taking action
        _this.battle.keyTriage(key);
      }

      if ((key === 'right' || key === 'left' || key === 'down' || key === 'up') && _this.keyTimers[key] > 15) {
        // Only directions can be held to take action
        _this.keyTimers[key] = 0;
      }
    }
  });

  _defineProperty(this, "startBattle", function () {
    debugLog("Starting Battle..."); // TODO - ALL OF THIS IS TEMP RIGHT NOW

    _this.battle = new Battle(mockDgmn, mockEnemyDgmn, _this.onBattleLoad, _this.addToObjectList, _this.drawGameScreen, _this.loadImages, _this.fetchImage);
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
  this.battle; // Init Battle (cleared and created by Game Logic)

  this.gameCanvas = // Canvas Every in-game Element is drawn on
  new GameCanvas('game-canvas', 160, 144);
  this.keyState = {}; // Sent in from System, holds true/false value for all Keys Pressed

  this.keyTimers = {
    // Keeps track of how many ms each action has been held
    action: 0,
    cancel: 0,
    up: 0,
    right: 0,
    down: 0,
    left: 0,
    start: 0,
    select: 0
  };
  this.objectList = []; // All of the Images to be drawn on the Game Canvas

  this.loadImages = function (imageList, callback) {
    loadImageCallback(imageList, callback);
  };

  this.fetchImage = function (imageName) {
    return fetchImageCallback(imageName);
  };
}
/**------------------------------------------------------------------------
 * BOOT GAME
 * ------------------------------------------------------------------------
 * Start the Game
 * Runs all functionality that would boot a game up (load screen, company, etc.)
 * ----------------------------------------------------------------------*/
;

/**------------------------------------------------------------------------
 * CONTROLLER CLASS
 * ------------------------------------------------------------------------
 * A Virtual Controller, which handles all inputs from all sources
 * ----------------------------------------------------------------------*/

var Controller = function Controller(setKeyState) {
  var _this = this;

  _classCallCheck(this, Controller);

  _defineProperty(this, "setupMobileController", function () {
    var mobileControllerElem = document.querySelector(".mobile-controls");

    if (document.body.dataset.view === 'mobile') {
      var windowHeight = window.innerHeight;
      var screenHeight = document.getElementById("game-screen").offsetHeight;
      mobileControllerElem.style.height = "".concat(windowHeight - screenHeight, "px");
    }
  });

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

  this.setupMobileController();
  this.connectEventListener();
};

var DebugMenu = function DebugMenu(launchBattleCallback) {
  var _this = this;

  _classCallCheck(this, DebugMenu);

  _defineProperty(this, "activate", function () {
    _this.elem.classList.add('active');

    _this.elem.querySelector("button.battle-launch").addEventListener('click', function () {
      _this.launchBattle();
    });

    _this.elem.querySelector("button.mobile-switch").addEventListener('click', function () {
      var newValue = document.body.dataset.view === 'mobile' ? 'dotcom' : 'mobile';
      document.body.dataset.view = newValue;

      if (newValue === 'mobile') {
        var mobileControllerElem = document.querySelector(".mobile-controls");

        if (document.body.dataset.view === 'mobile') {
          var windowHeight = window.innerHeight;
          var screenHeight = document.getElementById("game-screen").offsetHeight;
          mobileControllerElem.style.height = "".concat(windowHeight - screenHeight, "px");
        }
      }
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

var ImageHandler = function ImageHandler() {
  var _this = this;

  _classCallCheck(this, ImageHandler);

  _defineProperty(this, "addToQueue", function (imageList, callback) {
    var loadedImages = {};
    var loadedCount = 0;
    var totalImages = imageList.length;

    for (var i = 0; i < totalImages; i++) {
      var modName = _this.modImageName(imageList[i]);

      loadedImages[modName] = new Image();
      loadedImages[modName].src = imageList[i];

      loadedImages[modName].onload = function () {
        if (++loadedCount >= totalImages) {
          _this.loadedImages = Object.assign(_this.loadedImages, loadedImages);
          callback();
        }
      };
    }
  });

  _defineProperty(this, "modImageName", function (fileName) {
    var modName = fileName.substring(fileName.lastIndexOf('/') + 1, fileName.lastIndexOf(".png"));
    return modName;
  });

  _defineProperty(this, "fetchImage", function (imgName) {
    return _this.loadedImages[imgName];
  });

  this.loadQueue = [];
  this.loadedImages = {};
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
    } // Load Base Images - Run game once that is all done


    _this.imageHandler.addToQueue(genericImages.concat(fontImages), function () {
      _this.game.bootGame(); // TODO - Eventually, this needs to wait until loaded to take actions


      _this.systemScreen.appendChild(_this.screenCanvas.elem);

      setTimeout(function () {
        _this.startGameTimer();
      }, 1000);
    });
  });

  _defineProperty(this, "paintToScreen", function (canvas) {
    _this.screenCanvas.clearCanvas();

    _this.screenCanvas.paintCanvas(canvas);
  });

  _defineProperty(this, "startGameTimer", function () {
    _this.gameTimer = setInterval(function () {
      // try{
      _this.systemCount++;

      _this.game.keyHandler(_this.keyState);

      _this.screenCanvas.paintCanvas(_this.game.gameCanvas); // TODO - Should be a full compiler of all other canvases


      if (_this.actionQueue.length > 0) {
        if (_this.actionQueue[0] === null) ; else {
          debugLog("Taking Action ", _this.actionQueue[0]);
        }

        _this.actionQueue.shift();
      } // } catch(e){ console.log("GAME ERROR! - ",e.message); clearInterval(this.gameTimer) }

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
  this.imageHandler = new ImageHandler();
  this.gameTimer;
  this.systemCount = 0;
  this.actionQueue = [];
  this.screenCanvas = new GameCanvas('screen-canvas', 160, 144);
  this.game = new Game(this.imageHandler.addToQueue.bind(this), function (imageName) {
    return _this.imageHandler.fetchImage(imageName);
  });
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
