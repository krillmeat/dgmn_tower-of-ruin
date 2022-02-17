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
  textSpeed: 2
};

var inDebug = function inDebug() {
  return getAllQueryParams().debug === 'true';
};
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

var debugLog = function debugLog(message, object) {
  if (inDebug()) object ? console.log("%c".concat(message), 'color:#A6E22E', object) : console.log("%c".concat(message), 'color:#A6E22E');
};

var DigiBeetleAH = function DigiBeetleAH(addItemToToolBoxCB) {
  _classCallCheck(this, DigiBeetleAH);
  this.addItemToToolBox = function (item) {
    addItemToToolBoxCB(item);
  };
};

var GameCanvas = function GameCanvas(canvasClass, width, height, _x, _y, hasIdleAnimation, gameScreenRedrawCallback) {
  var _this = this;
  _classCallCheck(this, GameCanvas);
  _defineProperty(this, "animate", function (speed) {
    var currentFrame = 0;
    setInterval(function () {
      if (_this.isIdle) {
        _this.clearCanvas();
        _this.paintImage(_this.imageStack[currentFrame]);
        _this.triggerGameScreenRedraw();
        currentFrame++;
        if (currentFrame > 1) currentFrame = 0;
      }
    }, speed);
  });
  _defineProperty(this, "loadImageStack", function (imgStack) {
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
  _defineProperty(this, "blackFill", function () {
    _this.ctx.fillStyle = "#00131A";
    _this.ctx.fillRect(0, 0, _this.elem.width, _this.elem.height);
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
  this.x = _x * config.screenSize || 0;
  this.y = _y * config.screenSize || 0;
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
  this.idleAnimationRate = 0;
  this.triggerGameScreenRedraw = function () {
    if (gameScreenRedrawCallback) gameScreenRedrawCallback();
  };
}
;

var DigiBeetleCanvas = function (_GameCanvas) {
  _inherits(DigiBeetleCanvas, _GameCanvas);
  var _super = _createSuper(DigiBeetleCanvas);
  function DigiBeetleCanvas(currentDirectionCallback) {
    var _this;
    _classCallCheck(this, DigiBeetleCanvas);
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "animateBeetle", function () {
      var frame = 0;
      _this.animateTimer = setInterval(function () {
        _this.animationCounter++;
        if (_this.animationCounter % 8 === 0 || _this.getDirection() !== _this.prevDirection) {
          _this.prevDirection = _this.getDirection();
          _this.animationCounter = 0;
          if (frame === 0) {
            frame = 1;
          } else {
            frame = 0;
          }
          _this.clearCanvas();
          _this.paintImage(_this.frames[_this.getDirection()][frame]);
          _this.triggerGameScreenRedraw();
        }
      }, 66);
    });
    _defineProperty(_assertThisInitialized(_this), "stopAnimatingBeetle", function () {
      clearInterval(_this.animateTimer);
    });
    _this.direction = 'down';
    _this.frames = {
      down: [],
      up: [],
      left: [],
      right: []
    };
    _this.animateSpeed = 2000;
    _this.animationCounter = 0;
    _this.animateTimer;
    _this.prevDirection = 'down';
    _this.getDirection = function () {
      return currentDirectionCallback();
    };
    return _this;
  }
  return DigiBeetleCanvas;
}(GameCanvas);

var genericImages = ['./sprites/Battle/Menu/miniCursor.png', './sprites/Menus/typeLabel.png', './sprites/Menus/costLabel.png', './sprites/Menus/targetLabel.png', './sprites/Menus/powerLabel.png', './sprites/Menus/hitLabel.png', './sprites/Menus/noneTypeIcon.png', './sprites/Menus/fireTypeIcon.png', './sprites/Menus/windTypeIcon.png', './sprites/Menus/plantTypeIcon.png', './sprites/Menus/elecTypeIcon.png', './sprites/Menus/evilTypeIcon.png', './sprites/Menus/metalTypeIcon.png', './sprites/Menus/targetOne.png', './sprites/Menus/targetAll.png', './sprites/Menus/pwrFIcon.png', './sprites/Menus/pwrEIcon.png', './sprites/Menus/pwrDIcon.png', './sprites/Menus/oneHitIcon.png', './sprites/Menus/costMeter100.png', './sprites/Menus/costMeter75.png', './sprites/Menus/costMeter50.png', './sprites/Menus/costMeter25.png', './sprites/Menus/costMeter0.png', './sprites/Battle/Attacks/blankAttack.png'];
var fontImages = ['./sprites/Fonts/fontsBlack.png', './sprites/Fonts/fontsWhite.png', './sprites/Fonts/fontsLightGreen.png'];
var battleImages = ['./sprites/Battle/battleBackground.png', './sprites/Battle/Menu/cursor.png', './sprites/Battle/Menu/cursorLeft.png', './sprites/Battle/Menu/attackDeselected.png', './sprites/Battle/Menu/attackSelected.png', './sprites/Battle/Menu/defendDeselected.png', './sprites/Battle/Menu/defendSelected.png', './sprites/Battle/Menu/statsDeselected.png', './sprites/Battle/Menu/statsSelected.png', './sprites/Battle/Menu/dgmnBarWhite.png', './sprites/Battle/Menu/dgmnBarRed.png', './sprites/Battle/Menu/dgmnBarBlue.png', './sprites/Battle/Menu/dgmnBarLightGreen.png', './sprites/Battle/Menu/dgmnBarDarkGreen.png', './sprites/Battle/Menu/battleOptionSelectBaseRight.png', './sprites/Battle/Menu/comboLabel.png', './sprites/Battle/Menu/weak0.png', './sprites/Battle/Menu/weak1.png', './sprites/Battle/Menu/weak2.png', './sprites/Battle/Menu/weak3.png'];
var dungeonImages = ['./sprites/Dungeon/startTile.png', './sprites/Dungeon/endTile.png'];
var digiBeetleImages = ['./sprites/Dungeon/DigiBeetle/digiBeetleDown0.png', './sprites/Dungeon/DigiBeetle/digiBeetleDown1.png', './sprites/Dungeon/DigiBeetle/digiBeetleUp0.png', './sprites/Dungeon/DigiBeetle/digiBeetleUp1.png', './sprites/Dungeon/DigiBeetle/digiBeetleRight0.png', './sprites/Dungeon/DigiBeetle/digiBeetleRight1.png', './sprites/Dungeon/DigiBeetle/digiBeetleLeft0.png', './sprites/Dungeon/DigiBeetle/digiBeetleLeft1.png'];

var DigiBeetle = function DigiBeetle(dungeonAH) {
  var _this = this;
  _classCallCheck(this, DigiBeetle);
  _defineProperty(this, "init", function () {
    _this.initCanvas();
    _this.loadDigiBeetleImages();
  });
  _defineProperty(this, "initSystemAH", function (actionHandler) {
    _this.systemAH = actionHandler;
  });
  _defineProperty(this, "initGameAH", function (actionHandler) {
    _this.gameAH = actionHandler;
  });
  _defineProperty(this, "initDungeonAH", function (actionHandler) {
    _this.dungeonAH = actionHandler;
  });
  _defineProperty(this, "initCanvas", function () {
    _this.digiBeetleCanvas = new DigiBeetleCanvas(_this.dungeonAH.getCurrentDirection, 'digibeetle-canvas', 16, 16, 64, 64, false, _this.gameAH.refreshScreen);
  });
  _defineProperty(this, "addItemToToolBox", function (item) {
    _this.toolBox.push(item);
  });
  _defineProperty(this, "loadDigiBeetleImages", function () {
    var allImages = [];
    for (var img = 0; img < digiBeetleImages.length; img++) {
      allImages.push(digiBeetleImages[img]);
    }
    _this.systemAH.loadImages(allImages, function () {
      _this.drawDigiBeetle();
      _this.onDigiBeetleImagesLoaded();
    });
  });
  _defineProperty(this, "onDigiBeetleImagesLoaded", function () {
    _this.gameAH.addCanvasObject(_this.digiBeetleCanvas);
    _this.onLoaded();
  });
  _defineProperty(this, "drawDigiBeetle", function () {
    _this.digiBeetleCanvas.frames.down = [_this.systemAH.fetchImage('digiBeetleDown0'), _this.systemAH.fetchImage('digiBeetleDown1')];
    _this.digiBeetleCanvas.frames.up = [_this.systemAH.fetchImage('digiBeetleUp0'), _this.systemAH.fetchImage('digiBeetleUp1')];
    _this.digiBeetleCanvas.frames.right = [_this.systemAH.fetchImage('digiBeetleRight0'), _this.systemAH.fetchImage('digiBeetleRight1')];
    _this.digiBeetleCanvas.frames.left = [_this.systemAH.fetchImage('digiBeetleLeft0'), _this.systemAH.fetchImage('digiBeetleLeft1')];
    _this.digiBeetleCanvas.animateBeetle('down');
  });
  _defineProperty(this, "onLoaded", function () {});
  this.digiBeetleAH = new DigiBeetleAH(this.addItemToToolBox);
  this.dungeonAH;
  this.gameAH;
  this.systemAH;
  this.digiBeetleCanvas;
  this.toolBox = {
    version: 'dodo',
    items: []
  };
};

var BackgroundCanvas = function (_GameCanvas) {
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
      var fontIndex = _this.colorize(_char2);
      ctx.drawImage(_this.colors[fontIndex], charX, charY, 64, 64, 8 * config.screenSize * i + _this.x * 8 * config.screenSize, _this.y * 8 * config.screenSize, 8 * config.screenSize, 8 * config.screenSize);
    }
  });
  _defineProperty(this, "slowPaint", function (canvas, message, triggerRedraw, onDone) {
    var ctx = canvas.ctx;
    var splitWords = message.split(" ");
    for (var i = 0; i < splitWords.length; i++) {
      splitWords[i] = _this.replaceSpecials(splitWords[i]);
    }
    _this.clearTextBox(canvas);
    var c = 0;
    var r = 0;
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
        }
        if (word + 1 <= splitWords.length - 1 && splitWords[word + 1].length + c > _this.cols) {
          r++;
          c = 0;
        }
        _char3 = 0;
        word++;
      }
      if (word >= splitWords.length) {
        onDone();
        clearInterval(paintInterval);
      }
    }, config.textSpeed * 33);
  });
  _defineProperty(this, "replaceSpecials", function (message) {
    var modArray;
    if (message) {
      var modString = message;
      modString = modString.replace(/.M/g, '^');
      modString = modString.replace(/.hp/g, '%');
      modString = modString.replace(/.en/g, '@');
      modArray = modString.split('');
      for (var i = 0; i < modArray.length; i++) {
        if (modArray[i] === '^') modArray[i] = 'dotM';
        if (modArray[i] === '%') modArray[i] = 'hp';
        if (modArray[i] === '@') modArray[i] = 'en';
        if (modArray[i] === ' ') modArray[i] = 'space';
        if (modArray[i] === '!') modArray[i] = 'exclamation';
        if (modArray[i] === '.') modArray[i] = 'period';
      }
    }
    return modArray;
  });
  _defineProperty(this, "drawCharacter", function (ctx, _char4, c, r) {
    ctx.drawImage(_this.colors[0], fontData[_char4][0] * 64, fontData[_char4][1] * 64, 64, 64, 8 * config.screenSize * c + _this.x * 8 * config.screenSize, 8 * config.screenSize * r + _this.y * 8 * config.screenSize, 8 * config.screenSize, 8 * config.screenSize);
  });
  _defineProperty(this, "progressivePaint", function (speed) {
  });
  _defineProperty(this, "paintToCanvas", function (canvas) {
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
    var meterOffset = meter === 'hp' ? 0 : 8 * config.screenSize;
    var leftOffset = _this.dgmnData.isEnemy ? 8 * config.screenSize : 17 * 8 * config.screenSize;
    var battleLocationOffset = _this.dgmnData.battleLocation * 32 * config.screenSize;
    var barColor;
    if (color === 'Red') {
      barColor = '#F83018';
    } else if (color === 'Blue') {
      barColor = '#58A0F8';
    } else {
      barColor = '#6CA66C';
    }
    canvas.ctx.clearRect(leftOffset, 16 * config.screenSize + meterOffset + battleLocationOffset, 24 * config.screenSize, 8 * config.screenSize);
    canvas.ctx.drawImage(image, leftOffset, 16 * config.screenSize + meterOffset + battleLocationOffset, 24 * config.screenSize, 8 * config.screenSize);
    canvas.ctx.fillStyle = barColor;
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
  _defineProperty(this, "setWeakened", function (canvas, levelImg) {
    var tileMod = 8 * config.screenSize;
    var leftOffset = _this.dgmnData.isEnemy ? 0 * tileMod : 16 * tileMod;
    var battleLocationOffset = _this.dgmnData.battleLocation * 4 * tileMod;
    canvas.paintImage(levelImg, leftOffset, 5 * tileMod + battleLocationOffset);
  });
  _defineProperty(this, "setStatusConditions", function (canvas, conditionImages) {});
  _defineProperty(this, "cleanAll", function (canvas) {
    console.log("CLEAN AFTER KO");
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
    stat: 'physical',
    targets: 'single',
    hits: 1,
    animationFrames: [['bubbles1', 1], ['bubbles2', 4], ['bubbles1', 1]],
    animationFrameCount: 2,
    effect: ['buff', 1, 1, 100]
  },
  babyFlame: {
    displayName: 'Baby Flame',
    power: 'E',
    maxCost: 12,
    stat: 'physical',
    type: 'fire',
    targets: 'single',
    hits: 1,
    species: 'agu',
    animationFrames: [['babyFlame1', 1], ['babyFlame2', 1], ['babyFlame3', 1], ['babyFlame4', 2], ['babyFlame5', 1], ['babyFlame6', 1]],
    animationFrameCount: 6
  },
  megaFlame: {
    displayName: 'Mega Flame',
    power: 'D',
    maxCost: 8,
    stat: 'physical',
    type: 'fire',
    targets: 'single',
    hits: 1,
    animationFrames: [['babyFlame1', 2], ['babyFlame2', 2], ['babyFlame3', 8], ['babyFlame2', 2], ['babyFlame1', 2]],
    animationFrameCount: 3
  },
  picoDarts: {
    displayName: 'Pico Darts',
    power: 'F',
    stat: 'physical',
    maxCost: 12,
    type: 'evil',
    targets: 'single',
    hits: 1,
    animationFrames: [['picoDarts1', 1], ['picoDarts2', 1], ['picoDarts3', 1], ['picoDarts4', 1], ['picoDarts5', 1]],
    animationFrameCount: 5,
    effect: ['debuff', 1, .5, 25]
  },
  petitFire: {
    displayName: 'Petit Fire',
    power: 'F',
    stat: 'physical',
    maxCost: 8,
    type: 'fire',
    targets: 'all',
    hits: 1
  },
  elecRush: {
    displayName: 'Elec Rush',
    power: 'F',
    stat: 'physical',
    maxCost: 12,
    type: 'elec',
    targets: 'single',
    hits: 1,
    animationFrames: [['elecRush1', 2], ['elecRush2', 2], ['elecRush3', 2], ['elecRush4', 2]],
    animationFrameCount: 4,
    effect: ['status', 'paralyze', 100]
  },
  petitTwister: {
    displayName: 'Petit Twister',
    power: 'F',
    stat: 'special',
    maxCost: 8,
    type: 'wind',
    targets: 'all',
    hits: 1
  },
  darknessGear: {
    displayName: 'Darkness Gear',
    power: 'F',
    maxCost: 12,
    type: 'metal',
    stat: 'physical',
    targets: 'single',
    hits: 2,
    animationFrames: [['darknessGear1', 1], ['darknessGear2', 1], ['darknessGear3', 1], ['darknessGear4', 1], ['darknessGear5', 1], ['darknessGear6', 1], ['darknessGear7', 1], ['blankAttack', 8], ['darknessGear1', 1], ['darknessGear2', 1], ['darknessGear3', 1], ['darknessGear4', 1], ['darknessGear5', 1], ['darknessGear6', 1], ['darknessGear7', 1]],
    animationFrameCount: 7
  },
  nutsShoot: {
    displayName: 'Nuts Shoot',
    power: 'F',
    maxCost: 12,
    stat: 'physical',
    type: 'plant',
    targets: 'all',
    hits: 1,
    animationFrames: [['nutsShoot1', 1], ['nutsShoot2', 1], ['nutsShoot3', 1], ['nutsShoot4', 1]],
    animationFrameCount: 4
  },
  magicalFire: {
    displayName: 'Magical Fire',
    power: 'F',
    maxCost: 8,
    type: 'fire',
    stat: 'special',
    targets: 'single',
    hits: 1,
    animationFrames: [['babyFlame1', 1], ['babyFlame2', 1], ['babyFlame3', 4], ['babyFlame2', 1], ['babyFlame1', 1]],
    animationFrameCount: 3
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

var getComboLetter = function getComboLetter(combo) {
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
};
var getStatNameFromIndex = function getStatNameFromIndex(index) {
  var stat = '';
  switch (index) {
    case 0:
      stat = 'HP';
      break;
    case 1:
      stat = 'ATK';
      break;
    case 2:
      stat = 'DEF';
      break;
    case 3:
      stat = 'INT';
      break;
    case 4:
      stat = 'RES';
      break;
    case 5:
      stat = 'HIT';
      break;
    case 6:
      stat = 'AVO';
      break;
    case 7:
      stat = 'SPD';
      break;
  }
  return stat;
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
    if (message) _this.topTextManager.instantPaint(_this.menuCanvas, message);
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
    _this.paintInitialIcons('dgmn');
    _this.updateAllStatusBars();
    _this.drawAllComboLabels();
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
    _this.menuCanvas.paintImage(_this.fetchImage('cursor'), 80 * config.screenSize, (2 + 4 * index) * (8 * config.screenSize) + 8 * config.screenSize);
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
    if (bar === 'hp') {
      barColor = 'LightGreen';
    } else if (bar === 'en') {
      barColor = 'LightGreen';
    }
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
    _this.menuCanvas.paintImage(_this.fetchImage('miniCursor'), 4 * (8 * config.screenSize), 2 * (8 * config.screenSize));
    _this.dgmnAttackMenu.currentChoice = 0;
    _this.dgmnAttackMenu.loadAttackList(_this.dgmnData[_this.currentDgmnActor].permAttacks);
    _this.dgmnAttackMenu.refreshList(_this.menuCanvas, 0);
    _this.triggerGameScreenRedraw();
  });
  _defineProperty(this, "closeDgmnAttackMenu", function () {
    _this.topTextManager.instantPaint(_this.menuCanvas, 'Attack');
    _this.menuCanvas.ctx.clearRect(4 * (8 * config.screenSize), 2 * (8 * config.screenSize), 16 * (8 * config.screenSize), 12 * (8 * config.screenSize));
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
    var firstAlive = 0;
    for (var i = 0; i < _this.dgmnData.length; i++) {
      if (_this.dgmnData[i].isEnemy && !_this.dgmnData[i].isDead) {
        firstAlive = _this.dgmnData[i].battleLocation;
        break;
      }
    }
    _this.menus.targetSelect.currentIndex = 0;
    var attackData = attacksDB[_this.dgmnAttackMenu.attackList[_this.dgmnAttackMenu.currentChoice].attackName];
    if (attackData.targets === 'single') {
      _this.targetSelectedType = 'single';
      _this.paintTargetSelectCursor('single', firstAlive);
    } else {
      _this.targetSelectedType = 'all';
      _this.paintTargetSelectCursor('all');
    }
  });
  _defineProperty(this, "targetSelect", function (mod, battleLocations) {
    if (_this.targetSelectedType !== 'all') {
      if (!(mod < 0 && _this.menus.targetSelect.currentIndex === 0) && !(mod > 0 && _this.menus.targetSelect.currentIndex === 2) && battleLocations.enemy[_this.menus.targetSelect.currentIndex + mod] && !_this.dgmnKOs[battleLocations.enemy[_this.menus.targetSelect.currentIndex + mod]]) {
        _this.clearTargetSelectCursor();
        _this.menus.targetSelect.currentIndex += mod;
        _this.paintTargetSelectCursor('single', _this.menus.targetSelect.currentIndex);
      }
    }
  });
  _defineProperty(this, "clearCurrentDgmnCursors", function () {
    var tileMod = 8 * config.screenSize;
    _this.menuCanvas.ctx.clearRect(10 * tileMod, 2 * tileMod, 2 * tileMod, 12 * tileMod);
  });
  _defineProperty(this, "clearTargetSelectCursor", function () {
    var tileMod = 8 * config.screenSize;
    _this.menuCanvas.ctx.clearRect(8 * tileMod, 2 * tileMod, 2 * tileMod, 12 * tileMod);
  });
  _defineProperty(this, "paintTargetSelectCursor", function (targetCount, index) {
    var tileMod = 8 * config.screenSize;
    if (targetCount === 'single') {
      _this.menuCanvas.paintImage(_this.fetchImage('cursorLeft'), 8 * tileMod, (3 + index * 4) * tileMod);
    } else {
      for (var i = 0; i < 3; i++) {
        _this.menuCanvas.paintImage(_this.fetchImage('cursorLeft'), 8 * tileMod, (3 + i * 4) * tileMod);
      }
    }
    _this.triggerGameScreenRedraw();
  });
  _defineProperty(this, "setAttackBottomInfo", function (attacker, attack, missCrit, onDone) {
    _this.clearBottomData(true);
    _this.setDgmnPortrait(attacker.name);
    var attackMessage = attacker.isEnemy ? "Enemy ".concat(attacker.name, ".MON used ").concat(attack.displayName, "!") : "".concat(attacker.nickname, " used ").concat(attack.displayName, "!");
    if (missCrit === 'missed') attackMessage += " ...but missed.";
    if (missCrit === 'critical') attackMessage += " Critical Hit!";
    _this.bottomTextManager.slowPaint(_this.menuCanvas, attackMessage, _this.triggerGameScreenRedraw, onDone);
  });
  _defineProperty(this, "setDefendBottomInfo", function (defender, onDone) {
    _this.clearBottomData(true);
    _this.setDgmnPortrait(defender.name);
    var defendMessage = defender.isEnemy ? "Enemy ".concat(defender.name, ".MON Defends!") : "".concat(defender.nickname, " Defends!");
    _this.bottomTextManager.slowPaint(_this.menuCanvas, defendMessage, _this.triggerGameScreenRedraw, onDone);
  });
  _defineProperty(this, "setEffectBottomInfo", function (effect, attacker, target, isCapped, onDone) {
    var effectMessage;
    if (!isCapped) {
      switch (effect[0]) {
        case 'buff':
          var amount = '';
          if (effect[2] === 1) {
            amount = ' a bit';
          } else if (effect[2] === 2) {
            amount = 'a lot';
          }
          effectMessage = "".concat(getStatNameFromIndex(effect[1]), " went up").concat(amount, "!");
          break;
        case 'status':
          console.log("EFFECT = ", effect);
          effectMessage = "".concat(target, " inflicted with ").concat(effect[1]);
          break;
        default:
          effectMessage = 'Something went wrong...';
          onDone();
          break;
      }
    } else {
      effectMessage = "Couldn't increase ".concat(getStatNameFromIndex(effect[1]), "...");
    }
    _this.bottomTextManager.slowPaint(_this.menuCanvas, effectMessage, _this.triggerGameScreenRedraw, onDone);
  });
  _defineProperty(this, "setMissedBottomInfo", function (onDone) {
    _this.bottomTextManager.slowPaint(_this.menuCanvas, '', _this.triggerGameScreenRedraw, onDone);
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
  _defineProperty(this, "resetBattleMenuForNewTurn", function (indexZeroDgmn) {
    _this.menus.dgmn.currentIndex = 0;
    _this.currentState = 'dgmn';
    _this.currentDgmnActor = 0;
    _this.setTopText(_this.menus.dgmn.icons[0].label);
    _this.menuCanvas.paintImage(_this.fetchImage('cursor'), 80 * config.screenSize, (2 + 4 * 0) * (8 * config.screenSize) + 8 * config.screenSize);
    _this.paintBottomData(indexZeroDgmn);
    _this.paintInitialIcons('dgmn');
  });
  _defineProperty(this, "setDgmnWeakenedState", function (statusIndex, imageName) {
    dgmnStatus.setWeakened(_this.dgmnStatusList[statusIndex], _this.fetchImage(imageName));
  });
  _defineProperty(this, "setDgmnComboState", function (comboLetter, dgmnId) {
    _this.dgmnStatusList[_this.getStatusIndex(dgmnId)].setCombo(_this.menuCanvas, comboLetter, _this.fetchImage('fontsWhite'));
  });
  _defineProperty(this, "setDgmnKOState", function (dgmnId) {
    _this.dgmnKOs[dgmnId] = true;
    _this.dgmnStatusList[_this.getStatusIndex(dgmnId)].cleanAll();
  });
  this.dgmnData = dgmnData;
  this.currentState = 'dgmn';
  this.currentDgmnActor = 0;
  this.selectedTarget = 0;
  this.targetSelectedType = 'single';
  this.selectedAttack;
  this.topTextManager = new TextManager([fetchImageCallback('fontsWhite')], 1, 20, 0, 1);
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
  this.dgmnKOs = {};
  this.dgmnStatusList = [];
  this.menus = {};
  this.menuImages = ['./sprites/Battle/Menu/dgmn-bar-white.png', './sprites/Battle/Menu/dgmn-bar-light-green.png', './sprites/Battle/Menu/attack-select-popup-base.png'];
  this.menuCanvas = new GameCanvas('battle-menu-canvas', 160, 144, 0, 0, false);
  this.menuCanvas.loadImageStack(this.menuImages);
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
;

var powerRanks = {
  F: 1,
  E: 1.125,
  D: 1.25,
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
    var atkDefDiff = attackerAttack / targetDefense;
    var preMods = Math.floor(atkDefDiff * (attackerLevel / 2) * powerRanks[_this.power] / _this.hits);
    return preMods;
  });
  _defineProperty(this, "animate", function (targets, attacker, triggerRedraw, canvas, fetchImage, callback) {
    attacker.battleCanvas.attackAnimation();
    triggerRedraw();
    var x,
        y = 0;
    var target = undefined;
    var animationCounter = 0;
    var animationSection = 0;
    var currentTarget = 0;
    var targetCount = _this.targets === 'single' ? 1 : 3;
    canvas.clearCanvas();
    var attackAnimation = setInterval(function () {
      if (currentTarget < targetCount) {
        target = targets[currentTarget];
        if (!target.isDead) {
          target.battleCanvas.hurtAnimation();
          x = target.isEnemy ? 4 * (8 * config.screenSize) : 12 * (8 * config.screenSize);
          y = (2 + target.battleLocation * 4) * (8 * config.screenSize);
          if (animationCounter === 0) {
            canvas.clearCanvas();
            if (animationSection === _this.animationFrames.length) {
              currentTarget++;
              animationCounter = 0;
              animationSection = 0;
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
        } else {
          currentTarget++;
          animationCounter = 0;
          animationSection = 0;
        }
      } else {
        canvas.clearCanvas();
        triggerRedraw();
        clearInterval(attackAnimation);
        setTimeout(function () {
          attacker.battleCanvas.isIdle = true;
          for (var i = 0; i < targetCount; i++) {
            if (!targets[i].isDead) targets[i].battleCanvas.isIdle = true;
          }
          triggerRedraw();
        }, 200);
        setTimeout(function () {
          callback();
        }, 2000);
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
  this.stat = attacksDB[this.attackName].stat;
  this.effect = attacksDB[this.attackName].effect || null;
  this.animationFrames = attacksDB[this.attackName].animationFrames;
}
;

var Battle = function Battle(_dgmnList, enemyDgmnList, _loadedCallback, addObjectCallback, gameScreenRedrawCallback, loadImageCallback, fetchImageCallback) {
  var _this = this;
  _classCallCheck(this, Battle);
  _defineProperty(this, "loadBattle", function () {
    debugLog("-- Loading Battle");
    _this.loadBattleImages(_this.onBattleImagesLoaded);
  });
  _defineProperty(this, "onBattleImagesLoaded", function () {
    _this.loadDgmn(_this.dgmnList, false);
    _this.addDgmnToObjectList(_this.dgmnList, false);
    _this.loadDgmn(_this.enemyDgmnList, true);
    _this.addDgmnToObjectList(_this.enemyDgmnList, true);
    _this.addObject(_this.battleMenu.menuCanvas);
    _this.battleMenu.buildBattleMenus();
    _this.battleMenu.fullMenuPaint();
    _this.addObject(_this.attackCanvas);
    _this.onLoaded();
  });
  _defineProperty(this, "loadBattleImages", function (loadedCallback) {
    var allDgmn = _this.dgmnList.concat(_this.enemyDgmnList);
    var dgmnImages = [];
    for (var i = 0; i < allDgmn.length; i++) {
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
    var allImages = battleImages.concat(dgmnImages);
    _this.loadImages(allImages, function () {
      _this.setupBattleBackground(loadedCallback);
    });
  });
  _defineProperty(this, "setupBattleBackground", function (loadedCallback) {
    _this.battleBackground.imageStack = [_this.fetchImage('battleBackground')];
    _this.battleBackground.paintImage(_this.battleBackground.imageStack[0]);
    _this.addObject(_this.battleBackground);
    loadedCallback();
  });
  _defineProperty(this, "addDgmnToObjectList", function (dgmnList) {
    for (var i = 0; i < dgmnList.length; i++) {
      _this.addObject(dgmnList[i].battleCanvas);
    }
  });
  _defineProperty(this, "loadDgmn", function (dgmnList, isEnemy) {
    for (var i = 0; i < dgmnList.length; i++) {
      var dgmn = dgmnList[i];
      var side = isEnemy ? 'enemy' : 'party';
      _this.battleLocations[side][dgmn.battleLocation] = dgmn.dgmnId;
      var imageStack = [_this.fetchImage("".concat(dgmn.name.toLowerCase(), "Idle0")), _this.fetchImage("".concat(dgmn.name.toLowerCase(), "Idle1")), _this.fetchImage("".concat(dgmn.name.toLowerCase(), "Attack")), _this.fetchImage("".concat(dgmn.name.toLowerCase(), "Hurt"))];
      dgmn.initBattleCanvas(_this.triggerGameScreenRedraw, imageStack);
      dgmn.battleCanvas.x = isEnemy ? 2 * (16 * config.screenSize) : 6 * (16 * config.screenSize);
      dgmn.battleCanvas.y = 16 * config.screenSize + 32 * i * config.screenSize;
      dgmn.battleCanvas.paintImage(dgmn.battleCanvas.imageStack[0], 0, 0, isEnemy);
      var speed = 1200 - Math.floor(dgmn.baseStats[7] * 2) * 33;
      dgmn.battleCanvas.animate(speed);
    }
  });
  _defineProperty(this, "generateEnemies", function (encounterData) {
  });
  _defineProperty(this, "generateEnemyAttacks", function () {
    for (var i = 0; i < 3; i++) {
      if (!_this.enemyDgmnList[i].isDead) {
        _this.attackActions[_this.enemyDgmnList[i].dgmnId] = {
          attacker: _this.enemyDgmnList[i],
          targets: [_this.dgmnList[i]],
          attack: _this.enemyDgmnList[i].permAttacks[0],
          status: 'todo'
        };
      }
    }
  });
  _defineProperty(this, "setupOrder", function () {
    var order = _this.dgmnList.concat(_this.enemyDgmnList);
    for (var i = 0; i < order.length; i++) {
      for (var r = 0; r < order.length - 1; r++) {
        var temp = order[r];
        var currSpeed = order[r].currStats[7] * order[r].currBuffs[7];
        var nextSpeed = order[r + 1].currStats[7] * order[r + 1].currBuffs[7];
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
      if (!attackList[prop].defend) {
        var attackName = attackList[prop].attack.attackName;
        if (!_this.loadedAttacks.includes(attackName)) {
          _this.loadedAttacks.push(attackName);
          for (var r = 0; r < attacksDB[attackName].animationFrameCount; r++) {
            var url = "./sprites/Battle/Attacks/".concat(attackName).concat(r + 1, ".png");
            if (!imagesList.includes(url)) imagesList.push(url);
          }
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
    debugLog('Attacks = ', _this.attackActions);
    var turnOrder = _this.setupOrder();
    var i = 0;
    var prevI = -1;
    var attackInterval = setInterval(function () {
      var targets, attacker, attack;
      if (i !== prevI) {
        prevI = i;
        if (!turnOrder[i].isDead) {
          if (!_this.attackActions[turnOrder[i].dgmnId].defend) {
            targets = _this.attackActions[turnOrder[i].dgmnId].targets;
            attacker = _this.attackActions[turnOrder[i].dgmnId].attacker;
            attack = _this.attackActions[turnOrder[i].dgmnId].attack;
            var accuracy = '';
            if (targets.length === 1 && targets[0].isDead) {
              i++;
            } else {
              for (var _i = 0; _i < targets.length; _i++) {
                accuracy = _this.calculateAccuracy(attacker.dgmnId, targets[_i].currStats[6] * targets[_i].currBuffs[6], attacker.currStats[5] * attacker.currBuffs[5]);
                if (accuracy !== 'missed') {
                  var critMod = accuracy === 'critical' ? 2 : 1;
                  _this.attack(targets[_i], attacker, attack, critMod);
                }
              }
              if (accuracy !== 'missed') {
                _this.battleMenu.setAttackBottomInfo(attacker, attack, accuracy, function () {
                  setTimeout(function () {
                    attack.animate(targets, attacker, _this.triggerGameScreenRedraw, _this.attackCanvas, _this.fetchImage, function () {
                      if (!attack.effect) {
                        _this.attackActions[turnOrder[i].dgmnId].status = 'done';
                        _this.finishAttack(targets);
                      } else {
                        _this.handleEffect(attack.effect, attacker, targets);
                      }
                    });
                  }, 1000);
                });
              } else {
                _this.battleMenu.setAttackBottomInfo(attacker, attack, accuracy, function () {
                  setTimeout(function () {
                    _this.attackActions[turnOrder[i].dgmnId].status = 'done';
                    _this.finishAttack(targets);
                  }, 1000);
                });
              }
            }
          } else {
            _this.defend(_this.attackActions[turnOrder[i].dgmnId]);
          }
        } else if (turnOrder[i].isDead && i !== turnOrder.length) {
          i++;
        }
      }
      if (i < turnOrder.length && _this.attackActions[turnOrder[i].dgmnId].status === 'done') i++;
      if (i === turnOrder.length) {
        _this.startNewTurn();
        clearInterval(attackInterval);
      } else if (_this.battleResult !== 'ongoing') {
        clearInterval(attackInterval);
      }
    }, 33);
  });
  _defineProperty(this, "defend", function (attackAction) {
    var defender = attackAction.defender;
    defender.isDefending = true;
    _this.battleMenu.setDefendBottomInfo(defender, function () {
      setTimeout(function () {
        attackAction.status = 'done';
      }, 1000);
    });
  });
  _defineProperty(this, "attack", function (target, attacker, attack, missCritMod) {
    debugLog("-- ".concat(attacker.nickname, " uses ").concat(attack.attackName, " on ").concat(target.nickname));
    attack.currCost--;
    var enCost = Math.floor(100 / 4 / attack.maxCost);
    enCost = enCost <= 0 ? 1 : enCost;
    attacker.currEN -= enCost;
    var typeMod = target.types[attack.type] || 1;
    var totalDamage = 0;
    for (var i = 0; i < attack.hits; i++) {
      var comboMod = _this.calculateCombo(target, typeMod);
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
      _this.battleMenu.dgmnStatusList[_this.battleMenu.getStatusIndex(target.dgmnId)].setCombo(_this.battleMenu.menuCanvas, target.comboLetter, _this.fetchImage('fontsWhite'));
      totalDamage += _this.calculateDamage(attacker, target, attack, typeMod, comboMod, missCritMod);
      debugLog("--- Total Attack Damage = ", totalDamage);
      if (typeMod > 1) {
        target.weakenedState[0] = true;
        if (target.weakenedState[1] < 3) target.weakenedState[1]++;
      }
      if (target.weakenedState[0]) _this.battleMenu.dgmnStatusList[_this.battleMenu.getStatusIndex(target.dgmnId)].setWeakened(_this.battleMenu.menuCanvas, _this.fetchImage("weak".concat(target.weakenedState[1])));
    }
    target.currHP -= totalDamage;
  });
  _defineProperty(this, "finishAttack", function (targets) {
    _this.attackCanvas.clearCanvas();
    for (var i = 0; i < targets.length; i++) {
      if (targets[i].currHP <= 0) _this.knockOut(targets[i]);
    }
    _this.battleMenu.updateAllStatusBars();
  });
  _defineProperty(this, "handleEffect", function (effect, attacker, targets) {
    debugLog("---- Running Attack Effect");
    var isBuffCapped;
    var shouldRun = '';
    if (effect[0] === 'buff') {
      shouldRun = _this.buffStat(targets[0], effect[3], effect[1], effect[2]);
      isBuffCapped = shouldRun === 'capped';
    } else if (effect[0] === 'debuff') ; else if (effect[0] === 'status') {
      shouldRun = _this.inflictStatus(targets[0], attacker, targets[0].nickname, effect[2], effect[1]);
    }
    if (shouldRun !== 'missed' && shouldRun !== '') {
      _this.battleMenu.setEffectBottomInfo(effect, attacker, targets[0].nickname, isBuffCapped, function () {
        setTimeout(function () {
          _this.attackActions[attacker.dgmnId].status = 'done';
          _this.finishAttack(targets);
        }, 1000);
      });
    } else {
      _this.attackActions[attacker.dgmnId].status = 'done';
      _this.finishAttack(targets);
    }
  });
  _defineProperty(this, "buffStat", function (dgmn, chance, stat, amount) {
    var buffStatus = '';
    var shouldRun = Math.floor(Math.random() * (100 - 1) + 1) <= chance;
    if (shouldRun) {
      if (dgmn.currBuffs[stat] + amount <= 4) {
        dgmn.currBuffs[stat] += amount;
        buffStatus = 'yes';
        debugLog("----- Buffing ".concat(stat, " by ").concat(amount));
      } else {
        dgmn.currBuffs[stat] = 4;
        buffStatus = 'capped';
      }
    } else {
      buffStatus = 'missed';
    }
    return buffStatus;
  });
  _defineProperty(this, "inflictStatus", function (dgmn, chance, condition) {
    var shouldInflict = Math.floor(Math.random() * (100 - 1) + 1) <= chance;
    if (shouldInflict) {
      if (!dgmn.currConditions[condition]) {
        debugLog("----- Adding condition - ", condition);
        dgmn.currConditions[condition] = true;
      }
    }
    return shouldInflict;
  });
  _defineProperty(this, "calculateCombo", function (target, typeMod) {
    var mod = .75;
    if (typeMod === 1) {
      target.currCombo++;
    } else if (typeMod > 1) {
      target.currCombo += 2;
    }
    if (target.weakenedState[0]) {
      target.currCombo++;
    }
    var comboLetter = getComboLetter(target.currCombo);
    target.comboLetter = comboLetter;
    mod = comboRanks[comboLetter];
    return mod;
  });
  _defineProperty(this, "calculateAccuracy", function (attackerDgmnId, targetAvo, attackerHit) {
    var accuracy = 'hit';
    var missRange = targetAvo / attackerHit;
    var critRange = attackerHit / targetAvo;
    if (missRange !== 1) {
      missRange = missRange < 1 ? missRange * .5 : missRange * 2;
      critRange = critRange < 1 ? critRange * .5 : critRange * 2;
    }
    missRange *= 10;
    critRange *= 10;
    var rand = Math.floor(Math.random() * (1000 - 1) + 1);
    if (rand <= missRange) {
      console.log("ATTACK MISSED");
      accuracy = 'missed';
    } else if (rand >= 1000 - critRange) {
      console.log("CRITICAL HIT");
      accuracy = 'critical';
    }
    return accuracy;
  });
  _defineProperty(this, "calculateDamage", function (attacker, target, attack, typeMod, comboMod, missCritMod) {
    var weakenedMod = target.weakenedState[0] ? 1.25 : 1;
    var defendMod = target.isDefending ? .5 : 1;
    var stats = attack.stat === 'physical' ? [target.currStats[2] * target.currBuffs[2], attacker.currStats[1] * attacker.currBuffs[1]] : [target.currStats[4] * target.currBuffs[4], attacker.currStats[3] * attacker.currBuffs[3]];
    var damage = attack.calculateDamage(stats[0], stats[1], attacker.level);
    var postMods = damage * typeMod * comboMod * weakenedMod * defendMod * missCritMod;
    var rando = Math.floor(Math.random() * (4 - 1) + 1);
    var finalDamage = Math.floor(postMods) + rando;
    return finalDamage;
  });
  _defineProperty(this, "knockOut", function (target) {
    target.currHP = 0;
    target.currEN = 0;
    target.battleCanvas.isIdle = false;
    target.battleCanvas.clearCanvas();
    _this.battleMenu.setDgmnKOState(target.dgmnId);
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
  _defineProperty(this, "resetCombos", function (dgmnList) {
    for (var i = 0; i < dgmnList.length; i++) {
      if (!dgmnList[i].isDead) {
        var combo = dgmnList[i].currCombo - 3;
        combo = combo < 0 ? 0 : combo;
        var comboLetter = getComboLetter(combo);
        dgmnList[i].currCombo = combo;
        dgmnList[i].comboLetter = comboLetter;
        _this.battleMenu.setDgmnComboState(comboLetter, dgmnList[i].dgmnId);
      } else {
        dgmnList[i].comboLetter = 'F';
        dgmnList[i].currCombo = 0;
        _this.battleMenu.setDgmnComboState('F', dgmnList[i].dgmnId);
      }
    }
  });
  _defineProperty(this, "resetWeakened", function (dgmnList) {
    var _iterator2 = _createForOfIteratorHelper(dgmnList),
        _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var dgmn = _step2.value;
        var weakenedState = dgmn.weakenedState;
        if (weakenedState[1] > 0) {
          weakenedState[1]--;
          if (weakenedState[1] === 0) {
            weakenedState[0] = false;
          }
          var imageName = "weak".concat(weakenedState[1]);
          var statusIndex = _this.battleMenu.getStatusIndex(dgmn.dgmnId);
          _this.battleMenu.setDgmnWeakenedState(statusIndex, imageName);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  });
  _defineProperty(this, "resetDefend", function (dgmnList) {
    var _iterator3 = _createForOfIteratorHelper(dgmnList),
        _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var dgmn = _step3.value;
        dgmn.isDefending = false;
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  });
  _defineProperty(this, "startNewTurn", function () {
    _this.turn++;
    _this.attackActions = {};
    _this.resetWeakened(_this.dgmnList.concat(_this.enemyDgmnList));
    _this.resetCombos(_this.dgmnList.concat(_this.enemyDgmnList));
    _this.resetDefend(_this.dgmnList.concat(_this.enemyDgmnList));
    _this.battleMenu.resetBattleMenuForNewTurn(_this.dgmnList[0]);
  });
  _defineProperty(this, "battleWin", function () {
    _this.battleResult = 'win';
    _this.battleMenu.setTopText('Victory');
    debugLog('You Win!!');
  });
  _defineProperty(this, "battleLose", function () {
    _this.battleResult = 'lose';
    debugLog('You lost...');
  });
  _defineProperty(this, "goToNextDgmn", function () {
    _this.battleMenu.currentState = 'dgmn';
    _this.battleMenu.currentDgmnActor++;
    _this.battleMenu.setCurrentIcon(0);
    _this.battleMenu.setupDgmn(_this.battleMenu.currentDgmnActor);
  });
  _defineProperty(this, "beginBattle", function () {
    _this.battleMenu.currentState = 'battling';
    _this.generateEnemyAttacks();
    debugLog("Running Attacks...");
    _this.loadAttacks();
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
      } else if (_this.battleMenu.menus.dgmn.currentIndex === 1) {
        _this.battleMenu.clearCurrentDgmnCursors();
        _this.attackActions[_this.dgmnList[_this.battleMenu.currentDgmnActor].dgmnId] = {
          defend: true,
          defender: _this.dgmnList[_this.battleMenu.currentDgmnActor],
          status: 'todo'
        };
        _this.battleMenu.menuCanvas.ctx.clearRect(8 * (8 * config.screenSize), 2 * (8 * config.screenSize), 2 * (8 * config.screenSize), 12 * (8 * config.screenSize));
        if (_this.battleMenu.currentDgmnActor === _this.dgmnList.length - 1) {
          _this.beginBattle();
        } else {
          _this.goToNextDgmn();
        }
      }
    } else if (_this.battleMenu.currentState === 'attack') {
      var chosenAttack = _this.battleMenu.dgmnAttackMenu.attackList[_this.battleMenu.dgmnAttackMenu.currentChoice];
      _this.battleMenu.selectedAttack = chosenAttack;
      _this.battleMenu.launchSelectTarget();
    } else if (_this.battleMenu.currentState === 'targetSelect') {
      _this.battleMenu.menuCanvas.ctx.clearRect(8 * (8 * config.screenSize), 2 * (8 * config.screenSize), 2 * (8 * config.screenSize), 12 * (8 * config.screenSize));
      _this.triggerGameScreenRedraw();
      var dgmnId = _this.dgmnList[_this.battleMenu.currentDgmnActor].dgmnId;
      var attackTargets = _this.battleMenu.selectedAttack.targets === 'single' ? [_this.enemyDgmnList[_this.battleMenu.menus.targetSelect.currentIndex]] : _this.enemyDgmnList;
      _this.attackActions[dgmnId] = {
        attacker: _this.dgmnList[_this.battleMenu.currentDgmnActor],
        targets: attackTargets,
        attack: _this.battleMenu.selectedAttack,
        status: 'todo'
      };
      if (_this.battleMenu.currentDgmnActor === _this.dgmnList.length - 1) {
        _this.beginBattle();
      } else {
        _this.goToNextDgmn();
      }
    }
  });
  _defineProperty(this, "upKeyHandler", function () {
    if (_this.battleMenu.currentState === 'attack') {
      _this.battleMenu.dgmnAttackMenu.selectUp(_this.battleMenu.menuCanvas, _this.battleMenu.dgmnAttackMenu.currentChoice - 1);
      _this.triggerGameScreenRedraw();
    } else if (_this.battleMenu.currentState === 'targetSelect') {
      _this.battleMenu.targetSelect(-1, _this.battleLocations);
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
    } else if (_this.battleMenu.currentState === 'targetSelect') {
      _this.battleMenu.targetSelect(1, _this.battleLocations);
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
  this.battleLocations = {
    party: {},
    enemy: {}
  };
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
;

var dungeonFloorsDB = {
  twoByTwo: [[[5, 6], [7, 8]]]
};
var dungeonRoomsDB = [[[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0],
[0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 2, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 0], [0, 3, 1, 1, 2, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0],
[0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 1, 0, 0, 0, 0],
[0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 3, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0],
[0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 1, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0],
[0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 3, 0], [0, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 1, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0],
[0, 1, 1, 1, 1, 1, 3, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 1, 0, 0, 0, 0]], [[0, 0, 0, 1, 0, 0, 0, 0],
[0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 3, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 5, 1, 1], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 2, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 1, 0, 0, 0, 0],
[0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 3, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 1, 1, 1, 1, 1, 0], [0, 0, 1, 1, 1, 1, 1, 0], [0, 0, 1, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0]]];

var MapUtility = function MapUtility() {
  var _this = this;
  _classCallCheck(this, MapUtility);
  _defineProperty(this, "calculateDungeonDimensions", function (floor) {
    var dimensions = "";
    switch (true) {
      case floor < 5 && floor > 0:
        dimensions = "twoByTwo";
        break;
      case floor >= 5 && floor < 10:
        dimensions = "twoByThree";
        break;
      case floor >= 10 && floor < 16:
        dimensions = "threeByThree";
        break;
      default:
        debugLog('ERROR - Floor is incorrect value!');
        dimensions = "twoByTwo";
        break;
    }
    return dimensions;
  });
  _defineProperty(this, "getFloorLayout", function (dimensions) {
    var floorOptions = dungeonFloorsDB[dimensions];
    var selectedFloor = Math.floor(Math.random() * (floorOptions.length - 0));
    var roomNumberMatrix = floorOptions[selectedFloor];
    return roomNumberMatrix;
  });
  _defineProperty(this, "getTileLayout", function (roomId) {
    return dungeonRoomsDB[roomId];
  });
  _defineProperty(this, "getTotalOffset", function (roomCount, tileCount) {
    return _this.getRoomOffset(roomCount) + _this.getTileOffset(tileCount);
  });
  _defineProperty(this, "getRoomOffset", function (roomCount) {
    return roomCount * 128 * config.screenSize;
  });
  _defineProperty(this, "getTileOffset", function (tileCount) {
    return tileCount * 16 * config.screenSize;
  });
  _defineProperty(this, "isOnExactTile", function (dir, canvasX, canvasY) {
    var coord = dir === 'down' || dir === 'up' ? canvasY : canvasX;
    return coord % (16 * config.screenSize) === 0 || coord === 0;
  });
};

var Room = function Room(roomId, _position) {
  var _this = this;
  _classCallCheck(this, Room);
  _defineProperty(this, "findAllTilesInRoom", function (tileValues) {
    var allTiles = [];
    for (var r = 0; r < _this.tileMatrix.length; r++) {
      for (var c = 0; c < _this.tileMatrix[r].length; c++) {
        for (var v = 0; v < tileValues.length; v++) {
          if (_this.tileMatrix[r][c] === tileValues[v]) allTiles.push([r, c]);
        }
      }
    }
    return allTiles;
  });
  _defineProperty(this, "setupTiles", function () {
    _this.tileMatrix = _this.mapUtility.getTileLayout(_this.roomId);
  });
  _defineProperty(this, "changeTile", function (position, value) {
    _this.tileMatrix[position[0]][position[1]] = value;
  });
  this.roomId = roomId;
  this.position = _position;
  this.tileMatrix = [];
  this.mapUtility = new MapUtility();
}
;

var FloorCanvas = function (_GameCanvas) {
  _inherits(FloorCanvas, _GameCanvas);
  var _super = _createSuper(FloorCanvas);
  function FloorCanvas() {
    var _this;
    _classCallCheck(this, FloorCanvas);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "drawRoom", function (image, position) {
      var roomX = position[1] * 16 * 8;
      var roomY = position[0] * 16 * 8;
      _this.paintImage(image, roomX * config.screenSize, roomY * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawTile", function (image, room, tile) {
      var roomXOffset = room[1] * 16 * 8;
      var roomYOffset = room[0] * 16 * 8;
      var tileXOffset = tile[1] * 16;
      var tileYOffset = tile[0] * 16;
      _this.paintImage(image, (roomXOffset + tileXOffset) * config.screenSize, (roomYOffset + tileYOffset) * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "redraw", function () {
      _this.blackFill();
      _this.paintCanvas(_assertThisInitialized(_this));
    });
    return _this;
  }
  return FloorCanvas;
}(GameCanvas);

var Floor = function Floor(_floorNumber) {
  var _this = this;
  _classCallCheck(this, Floor);
  _defineProperty(this, "initAH", function (systemAH, gameAH, dungeonAH) {
    _this.initSystemAH(systemAH);
    _this.initGameAH(gameAH);
    _this.initDungeonAH(dungeonAH);
  });
  _defineProperty(this, "initSystemAH", function (actionHandler) {
    _this.systemAH = actionHandler;
  });
  _defineProperty(this, "initGameAH", function (actionHandler) {
    _this.gameAH = actionHandler;
  });
  _defineProperty(this, "initDungeonAH", function (actionHandler) {
    _this.dungeonAH = actionHandler;
  });
  _defineProperty(this, "initCanvas", function () {
    _this.floorCanvas = new FloorCanvas('floor-canvas', _this.roomMatrix.length * 128, _this.roomMatrix[0].length * 128);
  });
  _defineProperty(this, "generateFloor", function () {
    _this.roomMatrix = _this.buildRoomMatrix(_this.number);
    _this.start = _this.generateStart();
    _this.end = _this.generateEnd();
    _this.currentTile = _this.start;
    _this.initCanvas();
  });
  _defineProperty(this, "buildRoomMatrix", function (floorNumber) {
    var buildMatrix = [];
    var floorDimensions = _this.mapUtility.calculateDungeonDimensions(floorNumber);
    var roomNumbers = _this.mapUtility.getFloorLayout(floorDimensions);
    for (var r = 0; r < roomNumbers.length; r++) {
      var row = [];
      for (var c = 0; c < roomNumbers[r].length; c++) {
        var newRoom = new Room(roomNumbers[r][c], [r, c]);
        newRoom.setupTiles();
        row.push(newRoom);
      }
      buildMatrix.push(row);
    }
    return buildMatrix;
  });
  _defineProperty(this, "generateStart", function () {
    var start = {
      room: [],
      tile: []
    };
    var possibleTiles = _this.findAllTilesOnFloor([2, 4, 8, 9]);
    var randomChoice = Math.floor(Math.random() * possibleTiles.length);
    start.room = possibleTiles[randomChoice].room;
    start.tile = possibleTiles[randomChoice].tile;
    _this.roomMatrix[start.room[0]][start.room[1]].changeTile([start.tile[0], start.tile[1]], 101);
    return start;
  });
  _defineProperty(this, "generateEnd", function () {
    var end = {
      room: [],
      tile: []
    };
    var possibleTiles = _this.findAllTilesOnFloor([3]);
    var randomChoice = Math.floor(Math.random() * possibleTiles.length);
    end.room = possibleTiles[randomChoice].room;
    end.tile = possibleTiles[randomChoice].tile;
    _this.roomMatrix[end.room[0]][end.room[1]].changeTile([end.tile[0], end.tile[1]], 102);
    return end;
  });
  _defineProperty(this, "findAllTilesOnFloor", function (tileValues) {
    var allTiles = [];
    for (var r = 0; r < _this.roomMatrix.length; r++) {
      for (var c = 0; c < _this.roomMatrix[r].length; c++) {
        var tilesInRoom = _this.roomMatrix[r][c].findAllTilesInRoom(tileValues);
        for (var t = 0; t < tilesInRoom.length; t++) {
          allTiles.push({
            room: [r, c],
            tile: tilesInRoom[t]
          });
        }
      }
    }
    return allTiles;
  });
  _defineProperty(this, "moveInDirection", function (dir) {
    var delta = dir === 'down' || dir === 'right' ? -1 : 1;
    var moveX = dir === 'down' || dir === 'up' ? null : _this.floorCanvas.x + delta * config.screenSize;
    var moveY = dir === 'right' || dir === 'left' ? null : _this.floorCanvas.y + delta * config.screenSize;
    _this.moveFloorCanvas(moveX, moveY);
  });
  _defineProperty(this, "move", function (dir, upDown) {
    _this.dungeonAH.setCurrentDirection(dir);
    _this.dungeonAH.setMoving(dir);
    _this.moveInDirection(dir);
    if (_this.mapUtility.isOnExactTile(dir, _this.floorCanvas.x, _this.floorCanvas.y)) {
      if (dir === 'up') {
        _this.currentTile.tile[0]--;
      } else if (dir === 'right') {
        _this.currentTile.tile[1]++;
      } else if (dir === 'down') {
        _this.currentTile.tile[0]++;
      } else if (dir === 'left') {
        _this.currentTile.tile[1]--;
      }
      if (_this.shouldMoveRoom(dir)) {
        _this.moveIntoRoom(dir);
      }
      _this.checkCollision();
      if (_this.checkCurrentTile()) {
        return;
      }
      if (upDown === 'up') {
        _this.dungeonAH.setMoving('none');
      }
    }
  });
  _defineProperty(this, "checkCurrentTile", function () {
    return false;
  });
  _defineProperty(this, "checkCollision", function () {
    var room = _this.roomMatrix[_this.currentTile.room[0]][_this.currentTile.room[1]];
    var tile = _this.currentTile.tile;
    if (tile[0] !== 0 && room.tileMatrix[tile[0] - 1][tile[1]] === 0) {
      _this.dungeonAH.setCollision('up', true);
    } else if (tile[0] === 0 && _this.currentTile.room[0] >= _this.roomMatrix.length) {
      _this.dungeonAH.setCollision('up', true);
    } else {
      _this.dungeonAH.setCollision('up', false);
    }
    if (tile[1] !== 7 && room.tileMatrix[tile[0]][tile[1] + 1] === 0) {
      _this.dungeonAH.setCollision('right', true);
    } else if (tile[1] === 7 && _this.currentTile.room[1] >= _this.roomMatrix[_this.currentTile.room[0]].length) {
      _this.dungeonAH.setCollision('right', true);
    } else {
      _this.dungeonAH.setCollision('right', false);
    }
    if (tile[0] !== 7 && room.tileMatrix[tile[0] + 1][tile[1]] === 0) {
      _this.dungeonAH.setCollision('down', true);
    } else if (tile[0] === 7 && _this.currentTile.room[0] >= _this.roomMatrix.length) {
      _this.dungeonAH.setCollision('down', true);
    } else {
      _this.dungeonAH.setCollision('down', false);
    }
    if (tile[1] !== 0 && room.tileMatrix[tile[0]][tile[1] - 1] === 0) {
      _this.dungeonAH.setCollision('left', true);
    } else if (tile[1] === 0 && _this.currentTile.room[1] === 0) {
      _this.dungeonAH.setCollision('left', true);
    } else {
      _this.dungeonAH.setCollision('left', false);
    }
  });
  _defineProperty(this, "shouldMoveRoom", function (dir) {
    if (dir === 'up') {
      if (_this.currentTile.tile[0] === -1 && _this.currentTile.room[0] > 0) {
        return true;
      }
    } else if (dir === 'right') {
      if (_this.currentTile.tile[1] === 8 && _this.currentTile.room[1] < _this.roomMatrix[_this.currentTile.room[1]].length) {
        return true;
      }
    } else if (dir === 'down') {
      if (_this.currentTile.tile[0] === 8 && _this.currentTile.room[0] < _this.roomMatrix.length) {
        return true;
      }
    } else if (dir === 'left') {
      if (_this.currentTile.tile[1] === -1 && _this.currentTile.room[1] > 0) {
        console.log("MOVE LEFT ROOM");
        return true;
      }
    }
    return false;
  });
  _defineProperty(this, "moveIntoRoom", function (dir) {
    if (dir === 'up') {
      _this.currentTile.room[0]--;
      _this.currentTile.tile[0] = 7;
    } else if (dir === 'right') {
      _this.currentTile.room[1]++;
      _this.currentTile.tile[1] = 0;
    } else if (dir === 'down') {
      _this.currentTile.room[0]++;
      _this.currentTile.tile[0] = 0;
    } else if (dir === 'left') {
      _this.currentTile.room[1]--;
      _this.currentTile.tile[1] = 7;
    }
  });
  _defineProperty(this, "drawFloor", function () {
    _this.drawFloorBase();
    _this.dungeonAH.paintFloorCanvas(_this.floorCanvas);
    _this.gameAH.refreshScreen();
  });
  _defineProperty(this, "redrawFloor", function () {
    _this.dungeonAH.paintFloorCanvas(_this.floorCanvas);
  });
  _defineProperty(this, "drawFloorBase", function () {
    for (var r = 0; r < _this.roomMatrix.length; r++) {
      for (var c = 0; c < _this.roomMatrix[r].length; c++) {
        var room = _this.roomMatrix[r][c];
        _this.floorCanvas.drawRoom(_this.systemAH.fetchImage("room".concat(room.roomId)), [room.position[0], room.position[1]]);
      }
    }
  });
  _defineProperty(this, "setFloorToStart", function () {
    var xOffset = 64 * config.screenSize - _this.mapUtility.getTotalOffset(_this.start.room[1], _this.start.tile[1]);
    var yOffset = 64 * config.screenSize - _this.mapUtility.getTotalOffset(_this.start.room[0], _this.start.tile[0]);
    _this.moveFloorCanvas(xOffset, yOffset);
    _this.redrawFloor();
  });
  _defineProperty(this, "moveFloorCanvas", function (newX, newY) {
    _this.floorCanvas.x = newX !== null ? newX : _this.floorCanvas.x;
    _this.floorCanvas.y = newY !== null ? newY : _this.floorCanvas.y;
    _this.redrawFloor();
  });
  this.number = _floorNumber || 1;
  this.systemAH;
  this.dungeonAH;
  this.mapUtility = new MapUtility();
  this.floorCanvas;
  this.roomMatrix = [];
  this.start = {
    room: [],
    tile: []
  };
  this.end = {
    room: [],
    tile: []
  };
  this.currentTile = {
    room: [],
    tile: []
  };
}
;

var DungeonAH = function DungeonAH(getCurrentDirectionCB, setCurrentDirectionCB, paintFloorCanvasCB, getDungeonStateCB, getMovingCB, setMovingCB, getCollisionCB, setCollisionCB, moveFloorCB) {
  _classCallCheck(this, DungeonAH);
  this.getCurrentDirection = function () {
    return getCurrentDirectionCB();
  };
  this.setCurrentDirection = function (newValue) {
    setCurrentDirectionCB(newValue);
  };
  this.paintFloorCanvas = function (canvas) {
    paintFloorCanvasCB(canvas);
  };
  this.getDungeonState = function () {
    return getDungeonStateCB();
  };
  this.getMoving = function () {
    return getMovingCB();
  };
  this.setMoving = function (newValue) {
    setMovingCB(newValue);
  };
  this.getCollision = function () {
    return getCollisionCB();
  };
  this.setCollision = function (dir, newValue) {
    setCollisionCB(dir, newValue);
  };
  this.moveFloor = function (dir, upDown) {
    moveFloorCB(dir, upDown);
  };
};

var IO = function IO() {
  var _this = this;
  _classCallCheck(this, IO);
  _defineProperty(this, "keyTriage", function (key, upDown) {
    if (key === 'action') {
      _this.actionKeyHandler();
    } else if (key === 'cancel') {
      _this.cancelKeyHandler();
    } else if (key === 'up') {
      _this.upKeyHandler(upDown);
    } else if (key === 'right') {
      _this.rightKeyHandler(upDown);
    } else if (key === 'down') {
      _this.downKeyHandler(upDown);
    } else if (key === 'left') {
      _this.leftKeyHandler(upDown);
    }
  });
  _defineProperty(this, "actionKeyHandler", function (upDown) {});
  _defineProperty(this, "cancelKeyHandler", function (upDown) {});
  _defineProperty(this, "upKeyHandler", function (upDown) {});
  _defineProperty(this, "rightKeyHandler", function (upDown) {});
  _defineProperty(this, "downKeyHandler", function (upDown) {});
  _defineProperty(this, "leftKeyHandler", function (upDown) {});
};

var DungeonIO = function (_IO) {
  _inherits(DungeonIO, _IO);
  var _super = _createSuper(DungeonIO);
  function DungeonIO(dungeonAH) {
    var _this;
    _classCallCheck(this, DungeonIO);
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "cancelKeyHandler", function (upDown) {
      console.log("DOWN");
    });
    _defineProperty(_assertThisInitialized(_this), "upKeyHandler", function (upDown) {
      if (_this.dungeonAH.getDungeonState() === 'free') {
        _this.movingInDirection('up', upDown);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "rightKeyHandler", function (upDown) {
      if (_this.dungeonAH.getDungeonState() === 'free') {
        _this.movingInDirection('right', upDown);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "downKeyHandler", function (upDown) {
      if (_this.dungeonAH.getDungeonState() === 'free') {
        _this.movingInDirection('down', upDown);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "leftKeyHandler", function (upDown) {
      if (_this.dungeonAH.getDungeonState() === 'free') {
        _this.movingInDirection('left', upDown);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "isNotAlreadyMoving", function (dir, moving) {
      if (dir === 'up') {
        return moving !== 'right' && moving !== 'down' && moving !== 'left';
      } else if (dir === 'right') {
        return moving !== 'up' && moving !== 'down' && moving !== 'left';
      } else if (dir === 'down') {
        return moving !== 'up' && moving !== 'right' && moving !== 'left';
      } else if (dir === 'left') {
        return moving !== 'up' && moving !== 'right' && moving !== 'down';
      }
      return false;
    });
    _defineProperty(_assertThisInitialized(_this), "movingInDirection", function (dir, upDown) {
      var moving = _this.dungeonAH.getMoving();
      var collision = _this.dungeonAH.getCollision();
      if (_this.isNotAlreadyMoving(dir, moving)) {
        if (!collision[dir] && (upDown === 'down' || upDown === 'up' && moving === dir)) {
          _this.dungeonAH.moveFloor(dir, upDown);
        } else if (collision[dir] && moving === dir) {
          _this.dungeonAH.setMoving('none');
        } else if (collision[dir] && upDown === 'down') {
          _this.dungeonAH.setCurrentDirection(dir);
        }
      }
    });
    _this.dungeonAH = dungeonAH;
    return _this;
  }
  return DungeonIO;
}(IO);

var Dungeon = function Dungeon(isNewDungeon, loadedCallback) {
  var _this = this;
  _classCallCheck(this, Dungeon);
  _defineProperty(this, "init", function () {
    _this.buildFloor();
  });
  _defineProperty(this, "initDigiBeetleAH", function (actionHandler) {
    _this.digiBeetleAH = actionHandler;
  });
  _defineProperty(this, "initGameAH", function (actionHandler) {
    _this.gameAH = actionHandler;
  });
  _defineProperty(this, "initSystemAH", function (actionHandler) {
    _this.systemAH = actionHandler;
  });
  _defineProperty(this, "buildFloor", function () {
    debugLog('Building Floor...');
    _this.floor = new Floor(_this.floorNumber);
    _this.floor.initAH(_this.systemAH, _this.gameAH, _this.dungeonAH);
    _this.floor.generateFloor();
    _this.loadDungeonImages(_this.floor.roomMatrix);
  });
  _defineProperty(this, "loadDungeonImages", function (roomMatrix) {
    var rooms = [];
    var allImages = [];
    for (var r = 0; r < roomMatrix.length; r++) {
      for (var c = 0; c < roomMatrix[r].length; c++) {
        if (rooms.indexOf(roomMatrix[r][c].roomId) === -1) {
          allImages.push("./sprites/Dungeon/Rooms/room".concat(roomMatrix[r][c].roomId, ".png"));
        }
      }
    }
    for (var img = 0; img < dungeonImages.length; img++) {
      allImages.push(dungeonImages[img]);
    }
    _this.systemAH.loadImages(allImages, function () {
      _this.onDungeonImagesLoaded();
    });
  });
  _defineProperty(this, "onDungeonImagesLoaded", function () {
    _this.gameAH.addCanvasObject(_this.dungeonCanvas);
    _this.floor.drawFloor();
    _this.floor.checkCollision();
    _this.floor.setFloorToStart();
    _this.onLoaded();
  });
  _defineProperty(this, "paintFloorCanvas", function (canvas) {
    _this.dungeonCanvas.blackFill();
    _this.dungeonCanvas.paintCanvas(canvas);
    _this.gameAH.refreshScreen();
  });
  _defineProperty(this, "moveFloor", function (dir, upDown) {
    _this.floor.move(dir, upDown);
  });
  _defineProperty(this, "goUpFloor", function () {
    _this.moving = 'none';
    console.log("LOGIC FOR GOING UP A FLOOR");
  });
  _defineProperty(this, "getCurrentDirection", function () {
    return _this.facing;
  });
  _defineProperty(this, "setCurrentDirection", function (newValue) {
    _this.facing = newValue;
  });
  _defineProperty(this, "getDungeonState", function () {
    return _this.dungeonState;
  });
  _defineProperty(this, "getMoving", function () {
    return _this.moving;
  });
  _defineProperty(this, "setMoving", function (newValue) {
    _this.moving = newValue;
  });
  _defineProperty(this, "getCollision", function () {
    return _this.collision;
  });
  _defineProperty(this, "setCollision", function (dir, value) {
    _this.collision[dir] = value;
  });
  this.digiBeetleAH;
  this.gameAH;
  this.systemAH;
  this.dungeonAH = new DungeonAH(this.getCurrentDirection, this.setCurrentDirection, this.paintFloorCanvas, this.getDungeonState, this.getMoving, this.setMoving, this.getCollision, this.setCollision, this.moveFloor);
  this.dungeonCanvas = new GameCanvas('dungeon-canvas', 160, 144);
  this.dungeonIO = new DungeonIO(this.dungeonAH);
  this.floor;
  this.floorNumber = isNewDungeon ? 1 : 0;
  this.dungeonState = 'free';
  this.facing = 'down';
  this.moving = 'none';
  this.collision = {
    up: false,
    right: false,
    down: false,
    left: false
  };
  this.onLoaded = function () {
    loadedCallback();
  };
}
;

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
    stats: [5, 5, 4, 3, 4, 4, 4, 3],
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
    evolutions: evolutions['agu'],
    types: {
      water: .75,
      plant: 1.5
    }
  },
  Piyo: {
    stage: 3,
    "class": 'vaccine',
    crests: [],
    stats: [5, 5, 5, 5, 5, 5, 5, 6],
    evolutions: evolutions['agu']
  },
  Terrier: {
    stage: 3,
    "class": 'vaccine',
    crests: [],
    stats: [5, 5, 5, 5, 5, 5, 5, 6],
    evolutions: evolutions['agu'],
    types: {
      evil: 1.5,
      metal: 2
    }
  },
  Pulse: {
    stage: 3,
    "class": 'vaccine',
    stats: [5, 6, 4, 4, 4, 5, 5, 6],
    evolutions: evolutions['agu'],
    types: {
      earth: 2,
      water: .5
    }
  },
  Lala: {
    stage: 3,
    "class": 'data',
    stats: [5, 5, 5, 5, 5, 5, 5, 5],
    evolutions: evolutions['agu'],
    types: {
      fire: 2,
      water: .5
    }
  },
  Haguru: {
    stage: 3,
    "class": 'virus',
    crests: [],
    stats: [5, 5, 7, 5, 6, 5, 5, 3],
    evolutions: evolutions['agu'],
    types: {}
  },
  PicoDevi: {
    stage: 3,
    "class": 'virus',
    crests: [],
    stats: [5, 5, 5, 5, 5, 5, 5, 8],
    evolutions: evolutions['agu'],
    types: {
      holy: 2
    }
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

var BattleDgmnCanvas = function (_GameCanvas) {
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

var Dgmn = function Dgmn(id, nickname, name, battleLocation, isEnemy) {
  var _this = this;
  _classCallCheck(this, Dgmn);
  _defineProperty(this, "loadDgmn", function (loadData) {
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
      finalStat *= i === 0 ? 1.25 : 1;
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
  this.types = dgmnDB[name].types;
  this.permAttacks = [];
  this.permCrests = {};
  this.permSync = {};
  this.fullDgmnList = [];
  this.level = 1;
  this.currDgmnPath = [];
  this.currHP = 52;
  this.currEN = 70;
  this.currHunger = 0;
  this.currPoop = 0;
  this.currStats = [];
  this.currCombo = 0;
  this.comboLetter = 'F';
  this.weakenedState = [false, 0];
  this.currConditions = {};
  this.currBuffs = [0, 1, 1, 1, 1, 1, 1, 1];
  this.battleCanvas;
  this.battleLocation = battleLocation || 0;
  this.isEnemy = isEnemy || false;
  this.isDead = false;
  this.isDefending = false;
};

var setupMockDgmn = function setupMockDgmn() {
  var dgmnList = [new Dgmn(0, 'FLARE', 'Agu', 0),
  new Dgmn(1, 'SPROUT', 'Lala', 1),
  new Dgmn(2, 'GEAR', 'Haguru', 2)];
  dgmnList[0].level = 10;
  dgmnList[0].permAttacks = [new Attack('babyFlame'), new Attack('bubbles')];
  dgmnList[0].permAttacks[0].currCost = 3;
  dgmnList[0].permAttacks[1].currCost = 24;
  dgmnList[0].buildDgmn();
  dgmnList[0].currHP = dgmnList[0].currStats[0];
  dgmnList[1].level = 10;
  dgmnList[1].permAttacks = [new Attack('nutsShoot'), new Attack('bubbles')];
  dgmnList[1].permAttacks[0].currCost = 8;
  dgmnList[1].permAttacks[1].currCost = 30;
  dgmnList[1].buildDgmn();
  dgmnList[1].currHP = dgmnList[1].currStats[0];
  dgmnList[2].level = 10;
  dgmnList[2].buildDgmn();
  dgmnList[2].currHP = dgmnList[2].currStats[0];
  dgmnList[2].permAttacks = [new Attack('darknessGear'), new Attack('bubbles')];
  dgmnList[2].permAttacks[0].currCost = 6;
  return dgmnList;
};
var setupMockEnemyDgmn = function setupMockEnemyDgmn() {
  var dgmnList = [new Dgmn(4, 'ENEMY', 'Gabu', 0, true), new Dgmn(5, 'ENEMY', 'PicoDevi', 1, true), new Dgmn(6, 'ENEMY', 'Pulse', 2, true)];
  dgmnList[0].level = 5;
  dgmnList[0].buildDgmn();
  dgmnList[0].currHP = dgmnList[0].currStats[0];
  dgmnList[0].permAttacks = [new Attack('babyFlame')];
  dgmnList[1].level = 5;
  dgmnList[1].permAttacks = [new Attack('picoDarts')];
  dgmnList[1].buildDgmn();
  dgmnList[1].currHP = dgmnList[1].currStats[0];
  dgmnList[2].level = 5;
  dgmnList[2].buildDgmn();
  dgmnList[2].permAttacks = [new Attack('elecRush')];
  dgmnList[2].currHP = dgmnList[2].currStats[0];
  return dgmnList;
};

var GameAH = function GameAH(addToObjectListCB, drawGameScreenCB) {
  _classCallCheck(this, GameAH);
  this.addCanvasObject = function (canvas) {
    addToObjectListCB(canvas);
  };
  this.refreshScreen = function () {
    drawGameScreenCB();
  };
};

var mockDgmn = setupMockDgmn();
var mockEnemyDgmn = setupMockEnemyDgmn();
debugLog("PARTY = ", mockDgmn);
debugLog("ENEMY = ", mockEnemyDgmn);
var Game = function Game(loadImageCallback, fetchImageCallback) {
  var _this = this;
  _classCallCheck(this, Game);
  _defineProperty(this, "initSystemAH", function (actionHandler) {
    _this.systemAH = actionHandler;
  });
  _defineProperty(this, "bootGame", function () {
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
      _this.keyManager('up', 'down');
    } else {
      _this.keyTimers.up = 0;
      _this.keyManager('up', 'up');
    }
    if (keyState[config.keyBindings.right]) {
      _this.keyManager('right', 'down');
    } else {
      _this.keyTimers.right = 0;
      _this.keyManager('right', 'up');
    }
    if (keyState[config.keyBindings.down]) {
      _this.keyManager('down', 'down');
    } else {
      _this.keyTimers.down = 0;
      _this.keyManager('down', 'up');
    }
    if (keyState[config.keyBindings.left]) {
      _this.keyManager('left', 'down');
    } else {
      _this.keyTimers.left = 0;
      _this.keyManager('left', 'up');
    }
  });
  _defineProperty(this, "keyManager", function (key, upDown) {
    var _this$battle, _this$dungeon;
    _this.keyTimers[key]++;
    if ((_this$battle = _this.battle) !== null && _this$battle !== void 0 && _this$battle.battleActive) {
      if (_this.keyTimers[key] === 2) {
        _this.battle.keyTriage(key);
      }
      if ((key === 'right' || key === 'left' || key === 'down' || key === 'up') && _this.keyTimers[key] > 15) {
        _this.keyTimers[key] = 0;
      }
    }
    if (((_this$dungeon = _this.dungeon) === null || _this$dungeon === void 0 ? void 0 : _this$dungeon.dungeonState) === 'free') {
      _this.dungeon.dungeonIO.keyTriage(key, upDown);
    }
  });
  _defineProperty(this, "startBattle", function () {
    debugLog("Starting Battle...");
    _this.battle = new Battle(mockDgmn, mockEnemyDgmn, _this.onBattleLoad, _this.addToObjectList, _this.drawGameScreen, _this.loadImages, _this.fetchImage);
  });
  _defineProperty(this, "buildDungeon", function () {
    debugLog("Building Dungeon...");
    _this.dungeon = new Dungeon(true, _this.onDungeonLoad);
    _this.digiBeetle = new DigiBeetle();
    _this.digiBeetle.initDungeonAH(_this.dungeon.dungeonAH);
    _this.digiBeetle.initGameAH(_this.gameAH);
    _this.digiBeetle.initSystemAH(_this.systemAH);
    _this.dungeon.initDigiBeetleAH(_this.digiBeetle.digiBeetleAH);
    _this.dungeon.initGameAH(_this.gameAH);
    _this.dungeon.initSystemAH(_this.systemAH);
    _this.dungeon.init();
    _this.digiBeetle.init();
  });
  _defineProperty(this, "onBattleLoad", function () {
    console.log("Battle Loaded...");
    _this.drawGameScreen();
  });
  _defineProperty(this, "onDungeonLoad", function () {
    console.log("Dungeon Loaded...");
    _this.drawGameScreen();
  });
  _defineProperty(this, "addToObjectList", function (newObject) {
    if (_this.objectList.indexOf(newObject) === -1) {
      _this.objectList.push(newObject);
    }
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
  this.gameAH = new GameAH(this.addToObjectList, this.drawGameScreen);
  this.systemAH;
  this.battle;
  this.dungeon;
  this.gameCanvas =
  new GameCanvas('game-canvas', 160, 144);
  this.keyState = {};
  this.keyTimers = {
    action: 0,
    cancel: 0,
    up: 0,
    right: 0,
    down: 0,
    left: 0,
    start: 0,
    select: 0
  };
  this.objectList = [];
};

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

var DebugMenu = function DebugMenu(launchBattleCallback, buildDungeonCallback) {
  var _this = this;
  _classCallCheck(this, DebugMenu);
  _defineProperty(this, "activate", function () {
    _this.elem.classList.add('active');
    _this.elem.querySelector("button.battle-launch").addEventListener('click', function () {
      _this.launchBattle();
    });
    _this.elem.querySelector("button.dungeon-launch").addEventListener('click', function () {
      _this.launchDungeon();
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
  this.state = 'active';
  this.activate();
  this.launchBattle = function () {
    launchBattleCallback();
  };
  this.launchDungeon = function () {
    buildDungeonCallback();
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

var SystemAH = function SystemAH(loadImagesCB, fetchImageCB) {
  _classCallCheck(this, SystemAH);
  this.loadImages = function (images, callback) {
    loadImagesCB(images, callback);
  };
  this.fetchImage = function (image) {
    return fetchImageCB(image);
  };
};

var System = function System() {
  var _this = this;
  _classCallCheck(this, System);
  _defineProperty(this, "start", function () {
    debugLog("Starting System...");
    _this.pluginController();
    if (inDebug()) {
      _this.debugMenu = new DebugMenu(_this.game.startBattle, _this.game.buildDungeon);
    }
    _this.imageHandler.addToQueue(genericImages.concat(fontImages), function () {
      _this.game.bootGame();
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
      _this.systemCount++;
      _this.game.keyHandler(_this.keyState);
      _this.screenCanvas.paintCanvas(_this.game.gameCanvas);
      if (_this.actionQueue.length > 0) {
        if (_this.actionQueue[0] === null) ; else {
          debugLog("Taking Action ", _this.actionQueue[0]);
        }
        _this.actionQueue.shift();
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
  _defineProperty(this, "loadImage", function (images, callback) {
    _this.imageHandler.addToQueue(images, callback);
  });
  _defineProperty(this, "fetchImage", function (imageName) {
    return _this.imageHandler.fetchImage(imageName);
  });
  debugLog("Loading System...");
  this.systemAH = new SystemAH(this.loadImage, this.fetchImage);
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
  this.game = new Game(this.systemAH);
  this.game.initSystemAH(this.systemAH);
  this.subCanvases = [this.backgroundCanvas];
}
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
