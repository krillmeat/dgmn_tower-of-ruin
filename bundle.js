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
var warningLog = function warningLog(message, object) {
  if (inDebug()) object ? console.log("%c".concat(message), 'color:#E6DB74', object) : console.log("%c".concat(message), 'color:#E6DB74');
};

var DgmnAH = function DgmnAH(getDgmnDataCB, getDgmnAttackDataCB, initDgmnCanvasCB, getCanvasCB, animateDgmnCB) {
  _classCallCheck(this, DgmnAH);
  this.getDgmnData = function (dgmnId, dataList, isEnemy) {
    return getDgmnDataCB(dgmnId, dataList, isEnemy);
  };
  this.getDgmnAttackData = function (dgmnId, dataList) {
    return getDgmnAttackDataCB(dgmnId, dataList);
  };
  this.initDgmnCanvas = function (dgmnId, drawCB, imageList, battleLocation) {
    initDgmnCanvasCB(dgmnId, drawCB, imageList, battleLocation);
  };
  this.getCanvas = function (dgmnId) {
    return getCanvasCB(dgmnId);
  };
  this.startDgmnIdleAnimation = function (dgmnId) {
    animateDgmnCB(dgmnId);
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
  _defineProperty(this, "flip", function () {
    _this.ctx.scale(-1, 1);
    _this.ctx.translate(_this.width * -1, 0);
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

var DgmnCanvas = function (_GameCanvas) {
  _inherits(DgmnCanvas, _GameCanvas);
  var _super = _createSuper(DgmnCanvas);
  function DgmnCanvas(refreshScreenCB, dgmnName) {
    var _this;
    _classCallCheck(this, DgmnCanvas);
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "animate", function (speed) {
      var currentFrame = 0;
      setInterval(function () {
        if (_this.isIdle) {
          _this.clearCanvas();
          _this.paintImage(_this.frames[currentFrame]);
          currentFrame++;
          if (currentFrame > 1) currentFrame = 0;
        }
        _this.refreshScreen();
      }, speed);
    });
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
    _this.refreshScreen = function () {
      refreshScreenCB();
    };
    return _this;
  }
  return DgmnCanvas;
}(GameCanvas);

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

var AttackUtility = function AttackUtility() {
  _classCallCheck(this, AttackUtility);
  _defineProperty(this, "getDisplayName", function (attackName) {
    return attacksDB[attackName].displayName;
  });
  _defineProperty(this, "getMaxCost", function (attackName) {
    return attacksDB[attackName].maxCost;
  });
  _defineProperty(this, "getType", function (attackName) {
    return attacksDB[attackName].type;
  });
  _defineProperty(this, "getPower", function (attackName) {
    return attacksDB[attackName].power;
  });
  _defineProperty(this, "getTargets", function (attackName) {
    return attacksDB[attackName].targets;
  });
  _defineProperty(this, "getHits", function (attackName) {
    return attacksDB[attackName].hits;
  });
};

var Attack = function Attack(attackName) {
  _classCallCheck(this, Attack);
  this.attackName = attackName;
  this.currCost = 4;
  this.attackUtility = new AttackUtility();
  this.displayName = this.attackUtility.getDisplayName(this.attackName);
  this.maxCost = this.attackUtility.getMaxCost(this.attackName);
  this.type = this.attackUtility.getType(this.attackName);
  this.power = this.attackUtility.getPower(this.attackName);
  this.targets = this.attackUtility.getTargets(this.attackName);
  this.hits = this.attackUtility.getHits(this.attackName);
};

var Dgmn = function Dgmn(id, nickname, speciesName) {
  var _this = this;
  _classCallCheck(this, Dgmn);
  _defineProperty(this, "initCanvas", function (refreshScreenCB, dgmnImageList, battlePosition) {
    _this.dgmnCanvas = new DgmnCanvas(refreshScreenCB, _this.speciesName, 'dgmn-canvas', 32, 32);
    _this.dgmnCanvas.x = (24 + (_this.isEnemy ? 8 : 72)) * config.screenSize;
    _this.dgmnCanvas.y = (16 + battlePosition * 32) * config.screenSize;
    _this.dgmnCanvas.frames = dgmnImageList;
    if (_this.isEnemy) {
      _this.dgmnCanvas.flip();
    }
  });
  _defineProperty(this, "startIdleAnimation", function () {
    var speed = 1200 - Math.floor(_this.currentStats.SPD * 2) * 33;
    _this.dgmnCanvas.animate(speed);
  });
  _defineProperty(this, "drawDgmnToCanvas", function (image) {
    _this.dgmnCanvas.paintImage(image);
  });
  _defineProperty(this, "getAllAttacks", function () {
    return _this.attacks;
  });
  _defineProperty(this, "getMaxHP", function () {
    return _this.currentStats.HP;
  });
  _defineProperty(this, "getATK", function () {
    return _this.currentStats.ATK;
  });
  this.dgmnId = id;
  this.nickname = nickname;
  this.speciesName = speciesName;
  this.currentLevel = 1;
  this.currentHP = 25;
  this.currentEN = 100;
  this.currentStats = {
    HP: 30,
    ATK: 0,
    DEF: 0,
    INT: 0,
    RES: 0,
    HIT: 0,
    AVO: 0,
    SPD: 0
  };
  this.attackList = ["bubbles", "babyFlame"];
  this.attacks = [];
  this.dgmnCanvas;
}
;

var DgmnManager = function DgmnManager() {
  var _this = this;
  _classCallCheck(this, DgmnManager);
  _defineProperty(this, "mockParty", function () {
    _this.enemyDgmn.edId0.isEnemy = true;
    _this.enemyDgmn.edId1.isEnemy = true;
    _this.enemyDgmn.edId2.isEnemy = true;
    _this.allDgmn.dId0.attacks = [new Attack('bubbles'), new Attack('babyFlame'), new Attack('magicalFire'), new Attack('darknessGear'), new Attack('petitFire'), new Attack('petitTwister')];
    return ['dId0', 'dId1', 'dId2'];
  });
  _defineProperty(this, "isEnemy", function (dgmnId) {
    return dgmnId.charAt(0) === 'e';
  });
  _defineProperty(this, "getDgmnData", function (dgmnId, dataList, isEnemy) {
    var obj = {};
    for (var i = 0; i < dataList.length; i++) {
      obj[dataList[i]] = !isEnemy ? _this.allDgmn[dgmnId][dataList[i]] : _this.enemyDgmn[dgmnId][dataList[i]];
    }
    return obj;
  });
  _defineProperty(this, "getDgmnAttackData", function (dgmnId, dataList) {
    var objList = [];
    var dgmnAttacks = _this.allDgmn[dgmnId].attacks;
    for (var a = 0; a < dgmnAttacks.length; a++) {
      var obj = {
        attackName: _this.allDgmn[dgmnId].attacks[a].attackName
      };
      for (var i = 0; i < dataList.length; i++) {
        obj[dataList[i]] = _this.allDgmn[dgmnId].attacks[a][dataList[i]];
      }
      objList.push(obj);
    }
    return objList;
  });
  _defineProperty(this, "initDgmnCanvas", function (dgmnId, drawCB, imageList, battleLocation) {
    !_this.isEnemy(dgmnId) ? _this.allDgmn[dgmnId].initCanvas(drawCB, imageList, battleLocation) : _this.enemyDgmn[dgmnId].initCanvas(drawCB, imageList, battleLocation);
  });
  _defineProperty(this, "animateDgmn", function (dgmnId) {
    !_this.isEnemy(dgmnId) ? _this.allDgmn[dgmnId].startIdleAnimation() : _this.enemyDgmn[dgmnId].startIdleAnimation();
  });
  _defineProperty(this, "getCanvas", function (dgmnId) {
    return !_this.isEnemy(dgmnId) ? _this.allDgmn[dgmnId].dgmnCanvas : _this.enemyDgmn[dgmnId].dgmnCanvas;
  });
  this.allDgmn = {
    dId0: new Dgmn(0, "FLARE", "Agu"),
    dId1: new Dgmn(1, "SPROUT", "Lala"),
    dId2: new Dgmn(2, "GEAR", "Haguru")
  };
  this.dgmnAH = new DgmnAH(this.getDgmnData, this.getDgmnAttackData, this.initDgmnCanvas, this.getCanvas, this.animateDgmn);
  this.enemyDgmn = {
    edId0: new Dgmn(0, "ENEMY", "gabu"),
    edId1: new Dgmn(1, "ENEMY", "picoDevi"),
    edId2: new Dgmn(2, "ENEMY", "pulse")
  };
  this.party = this.mockParty();
}
;

var DigiBeetleAH = function DigiBeetleAH(addItemToToolBoxCB) {
  _classCallCheck(this, DigiBeetleAH);
  this.addItemToToolBox = function (item) {
    addItemToToolBoxCB(item);
  };
};

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
var fontImages$1 = ['./sprites/Fonts/fontsBlack.png', './sprites/Fonts/fontsWhite.png', './sprites/Fonts/fontsLightGreen.png', './sprites/Fonts/fontsDarkGreen.png'];
var battleImages = ['./sprites/Battle/battleBackground.png', './sprites/Battle/Menu/cursor.png', './sprites/Battle/Menu/cursorLeft.png', './sprites/Battle/Menu/attackDeselected.png', './sprites/Battle/Menu/attackSelected.png', './sprites/Battle/Menu/defendDeselected.png', './sprites/Battle/Menu/defendSelected.png', './sprites/Battle/Menu/statsDeselected.png', './sprites/Battle/Menu/statsSelected.png', './sprites/Battle/Menu/dgmnBarWhite.png', './sprites/Battle/Menu/dgmnBarRed.png', './sprites/Battle/Menu/dgmnBarBlue.png', './sprites/Battle/Menu/dgmnBarLightGreen.png', './sprites/Battle/Menu/dgmnBarDarkGreen.png', './sprites/Battle/Menu/battleOptionSelectBaseRight.png', './sprites/Battle/Menu/comboLabel.png', './sprites/Battle/Menu/weak0.png', './sprites/Battle/Menu/weak1.png', './sprites/Battle/Menu/weak2.png', './sprites/Battle/Menu/weak3.png'];
var dungeonImages = ['./sprites/Dungeon/startTile.png', './sprites/Dungeon/endTile.png', './sprites/Dungeon/enemyTile.png'];
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

var DgmnUtility = function DgmnUtility() {
  _classCallCheck(this, DgmnUtility);
  _defineProperty(this, "getAllDgmnImages", function (speciesName) {
    return ["./sprites/Battle/Dgmn/".concat(speciesName.toLowerCase(), "Idle0.png"), "./sprites/Battle/Dgmn/".concat(speciesName.toLowerCase(), "Idle1.png"), "./sprites/Battle/Dgmn/".concat(speciesName.toLowerCase(), "Attack.png"), "./sprites/Battle/Dgmn/".concat(speciesName.toLowerCase(), "Hurt.png"), "./sprites/Battle/Dgmn/".concat(speciesName.toLowerCase(), "Portrait.png")];
  });
};

var BattleAH = function BattleAH(cbObj) {
  _classCallCheck(this, BattleAH);
  this.drawBattleCanvas = function () {
    cbObj.drawBattleCanvasCB();
  };
  this.paintToBattleCanvas = function (image, x, y) {
    cbObj.paintToBattleCanvasCB(image, x, y);
  };
  this.getDgmnDataByIndex = function (dgmnIndex, data) {
    return cbObj.getDgmnDataByIndexCB(dgmnIndex, data);
  };
  this.getDgmnAttackData = function (dgmnIndex, data) {
    return cbObj.getDgmnAttackDataCB(dgmnIndex, data);
  };
  this.selectAttack = function () {
    cbObj.selectAttackCB();
  };
  this.setCurrentAttackTarget = function (dir) {
    cbObj.setCurrentAttackTargetCB(dir);
  };
  this.selectTarget = function () {
    cbObj.selectTargetCB();
  };
  this.getCurrDgmnChoice = function () {
    return cbObj.getCurrDgmnChoiceCB();
  };
};

var BattleUtility = function BattleUtility() {
  _classCallCheck(this, BattleUtility);
  _defineProperty(this, "getDefaultBattleImages", function () {
    return battleImages;
  });
  _defineProperty(this, "calculateTurnOrder", function (idList) {
    var order = [];
    var sortArray = idList;
    for (var i = 0; i < sortArray.length; i++) {
      for (var r = 0; r < sortArray.length - 1; r++) {
        var store = sortArray[r];
        if (sortArray[r].SPD < sortArray[r + 1].SPD) {
          sortArray[r] = sortArray[r + 1];
          sortArray[r + 1] = store;
        }
      }
    }
    var _iterator = _createForOfIteratorHelper(sortArray),
        _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var dgmn = _step.value;
        order.push(dgmn.dgmnId);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return order;
  });
  _defineProperty(this, "calculateMeterLength", function (curr, max) {
    return Math.floor(curr / max * 18);
  });
};

var MenuUtility = function MenuUtility() {
  _classCallCheck(this, MenuUtility);
  _defineProperty(this, "prependZeros", function (number, max) {
    var zeroCount = max - number.toString().length;
    var zeroString = "";
    for (var i = 0; i < zeroCount; i++) {
      zeroString += "0";
    }
    return zeroString + number.toString();
  });
}
;

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

var BattleIO = function (_IO) {
  _inherits(BattleIO, _IO);
  var _super = _createSuper(BattleIO);
  function BattleIO(battleAH) {
    var _this;
    _classCallCheck(this, BattleIO);
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "setMenuAH", function (ah) {
      _this.battleMenuAH = ah;
    });
    _defineProperty(_assertThisInitialized(_this), "actionKeyHandler", function (upDown) {
      if (_this.battleMenuAH.getCurrMenuType() === 'icon') {
        _this.battleMenuAH.selectIcon();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "upKeyHandler", function (upDown) {
      if (upDown === 'down') {
        _this.triageMenuMove('up', _this.battleAH.getMenuState(), _this.battleAH.getMenuChart());
      }
    });
    _defineProperty(_assertThisInitialized(_this), "rightKeyHandler", function (upDown) {
      if (upDown === 'down') {
        if (_this.battleMenuAH.getCurrMenuType() === 'icon') {
          _this.battleMenuAH.nextIcon();
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "downKeyHandler", function (upDown) {
      if (upDown === 'down') {
        _this.triageMenuMove('down', _this.battleAH.getMenuState(), _this.battleAH.getMenuChart());
      }
    });
    _defineProperty(_assertThisInitialized(_this), "leftKeyHandler", function (upDown) {
      if (upDown === 'down') {
        if (_this.battleMenuAH.getCurrMenuType() === 'icon') {
          _this.battleMenuAH.prevIcon();
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "triageMenuMove", function (dir, menuState, menuChart) {
      var newIndex = menuChart.index;
      if (dir === 'up') {
        if (menuState === 'attack-list') {
          _this.battleAH.setCurrentAttackMenuItem('prev');
        } else if (menuState === 'target-select') {
          _this.battleAH.setCurrentAttackTarget('prev');
        }
      }
      if (dir === 'right') {
        if (menuState === 'battle') {
          newIndex = newIndex === menuChart[menuChart.level].length - 1 ? 0 : newIndex + 1;
          _this.battleAH.setCurrentMenuButton(menuChart[menuChart.level][newIndex]);
        }
      }
      if (dir === 'down') {
        if (menuState === 'attack-list') {
          _this.battleAH.setCurrentAttackMenuItem('next');
        } else if (menuState === 'target-select') {
          _this.battleAH.setCurrentAttackTarget('next');
        }
      }
    });
    _this.battleAH = battleAH;
    _this.battleMenuAH;
    _this.menuUtility = new MenuUtility();
    return _this;
  }
  return BattleIO;
}(IO);

var BattleCanvas = function (_GameCanvas) {
  _inherits(BattleCanvas, _GameCanvas);
  var _super = _createSuper(BattleCanvas);
  function BattleCanvas() {
    var _this;
    _classCallCheck(this, BattleCanvas);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "drawBattleBase", function (backgroundImage) {
      _this.blackFill();
      _this.paintImage(backgroundImage);
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnCanvas", function (dgmnCanvas) {
      _this.paintCanvas(dgmnCanvas);
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnPortrait", function (dgmnPortraitImage) {
      var portraitX = 0;
      var portraitY = 0;
      _this.paintImage(dgmnPortraitImage, portraitX, portraitY);
    });
    return _this;
  }
  return BattleCanvas;
}(GameCanvas);

var Menu = function Menu(systemAH, gameAH, parentAH) {
  var _this = this;
  _classCallCheck(this, Menu);
  _defineProperty(this, "addSubMenu", function (label, menu) {
    _this.subMenus[label] = menu;
  });
  _defineProperty(this, "buildIconImages", function (labels) {
    var images = {};
    var _iterator = _createForOfIteratorHelper(labels),
        _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var label = _step.value;
        images[label] = {
          selected: _this.systemAH.fetchImage("".concat(label, "Selected")),
          deselected: _this.systemAH.fetchImage("".concat(label, "Deselected"))
        };
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return images;
  });
  this.currSubMenu;
  this.subMenus = {};
  this.systemAH = systemAH;
  this.gameAH = gameAH;
  this.parentAH = parentAH;
  this.menuUtility = new MenuUtility();
}
;

var SubMenu = function SubMenu(label) {
  _classCallCheck(this, SubMenu);
  this.label = label;
  this.isVisible = false;
  this.isActive = false;
};

var IconMenu = function (_SubMenu) {
  _inherits(IconMenu, _SubMenu);
  var _super = _createSuper(IconMenu);
  function IconMenu(coord, iconList) {
    var _this;
    _classCallCheck(this, IconMenu);
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "nextIcon", function () {
      var newIndex = _this.currIcon < _this.iconList.length - 1 ? _this.currIcon + 1 : 0;
      _this.drawIcons(newIndex);
      _this.currIcon = newIndex;
    });
    _defineProperty(_assertThisInitialized(_this), "prevIcon", function () {
      var newIndex = _this.currIcon > 0 ? _this.currIcon - 1 : _this.iconList.length - 1;
      _this.drawIcons(newIndex);
      _this.currIcon = newIndex;
    });
    _defineProperty(_assertThisInitialized(_this), "selectIcon", function () {
      _this.currIcon = 0;
      _this.isActive = false;
    });
    _defineProperty(_assertThisInitialized(_this), "getCurrLabel", function () {
      return _this.iconList[_this.currIcon];
    });
    _defineProperty(_assertThisInitialized(_this), "clearIcons", function () {
      _this.menuCanvas.blackFill();
    });
    _defineProperty(_assertThisInitialized(_this), "drawIcons", function (selected) {
      _this.clearIcons();
      for (var i = 0; i < _this.iconList.length; i++) {
        var img = selected === i ? _this.images[_this.iconList[i]].selected : _this.images[_this.iconList[i]].deselected;
        _this.menuCanvas.paintImage(img, i * 16 * config.screenSize, 0);
      }
    });
    _this.currIcon = 0;
    _this.menuChart;
    _this.iconList = iconList;
    _this.images;
    _this.menuCanvas = new GameCanvas("".concat(_this.label, "-menu"), _this.iconList.length * 16, 16);
    _this.menuCanvas.x = coord[0] * 8 * config.screenSize;
    _this.menuCanvas.y = coord[1] * 8 * config.screenSize;
    return _this;
  }
  return IconMenu;
}(SubMenu);

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
  space: [9, 1],
  dotM: [0, 4],
  hp: [1, 4],
  en: [2, 4],
  lv: [8, 1],
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
var fontImages = [];

var TextArea = function TextArea(x, y, width) {
  var _this = this;
  var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var colorizeCB = arguments.length > 4 ? arguments[4] : undefined;
  _classCallCheck(this, TextArea);
  _defineProperty(this, "instantText", function (ctx, message, color) {
    var charArray = _this.createCharArray(message);
    var h = 0;
    for (var w = 0; w < charArray.length; w++) {
      var coord = _this.getCharCoordinates(charArray[w]);
      var callbackColor = _this.colorizeCB(charArray[w], charArray, w);
      callbackColor = callbackColor === "none" ? _this.colorImages[color] : _this.colorImages[callbackColor];
      ctx.drawImage(callbackColor, coord[0] * 64, coord[1] * 64, 64, 64, (w + _this.x) * (8 * config.screenSize), (h + _this.y) * (8 * config.screenSize), 8 * config.screenSize, 8 * config.screenSize);
    }
  });
  _defineProperty(this, "createCharArray", function (message) {
    return _this.returnSpecialCharacters(_this.splitMessage(_this.replaceSpecialCharacters(message)));
  });
  _defineProperty(this, "replaceSpecialCharacters", function (message) {
    var modifiedMessage;
    modifiedMessage = message.replace(/\.M/g, '^');
    modifiedMessage = modifiedMessage.replace(/\.hp/g, '%');
    modifiedMessage = modifiedMessage.replace(/\.en/g, '$');
    modifiedMessage = modifiedMessage.replace(/\.lv/g, '@');
    return modifiedMessage;
  });
  _defineProperty(this, "returnSpecialCharacters", function (charArray) {
    var modifiedCharArray = charArray;
    for (var i = 0; i < modifiedCharArray.length; i++) {
      var _char = modifiedCharArray[i];
      if (_char === "^") {
        modifiedCharArray[i] = "dotM";
      } else if (_char === " ") {
        modifiedCharArray[i] = "space";
      } else if (_char === "%") {
        modifiedCharArray[i] = "hp";
      } else if (_char === "$") {
        modifiedCharArray[i] = "en";
      } else if (_char === "@") {
        modifiedCharArray[i] = "lv";
      }
    }
    return modifiedCharArray;
  });
  _defineProperty(this, "splitMessage", function (message) {
    return message.split("");
  });
  _defineProperty(this, "getCharCoordinates", function (_char2) {
    return fontData[_char2];
  });
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.colorImages = {
    white: fontImages[1],
    green: fontImages[2],
    black: fontImages[0],
    darkGreen: fontImages[3]
  };
  this.colorizeCB = colorizeCB ? function (_char3, wholeString, index) {
    return colorizeCB(_char3, wholeString, index);
  } : function () {
    return 'none';
  };
}
;

var ListMenu = function (_SubMenu) {
  _inherits(ListMenu, _SubMenu);
  var _super = _createSuper(ListMenu);
  function ListMenu(coord, itemAmount, listWidth) {
    var _this;
    var itemHeight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var listItems = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
    var cursorImg = arguments.length > 5 ? arguments[5] : undefined;
    var backImg = arguments.length > 6 ? arguments[6] : undefined;
    _classCallCheck(this, ListMenu);
    for (var _len = arguments.length, args = new Array(_len > 7 ? _len - 7 : 0), _key = 7; _key < _len; _key++) {
      args[_key - 7] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "buildList", function () {
      warningLog("WARNING - SubMenu ".concat(_this.label, " is missing buildList Method"));
    });
    _defineProperty(_assertThisInitialized(_this), "setMenuItem", function (dir) {
      warningLog("WARNING - SubMenu ".concat(_this.label, " is missing setMenuItem Method"));
    });
    _defineProperty(_assertThisInitialized(_this), "drawBackImg", function () {
      _this.menuCanvas.paintImage(_this.backImg, 0, 0);
    });
    _defineProperty(_assertThisInitialized(_this), "drawCursor", function (listIndex, offsetX, offsetY) {
      _this.menuCanvas.paintImage(_this.cursorImg, offsetX * 8 * config.screenSize, (listIndex * _this.listHeight + offsetY) * 8 * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "getYOffsetForIndex", function (listIndex) {
      return _this.itemHeight * listIndex * 8 * config.screenSize;
    });
    _this.listItems = listItems;
    _this.itemHeight = itemHeight;
    _this.currIndex = 0;
    _this.backImg = backImg;
    _this.cursorImg = cursorImg;
    _this.menuCanvas = new GameCanvas("".concat(_this.label, "-menu"), listWidth * 8, itemAmount * (itemHeight * 8));
    _this.menuCanvas.x = coord[0] * 8 * config.screenSize;
    _this.menuCanvas.y = coord[1] * 8 * config.screenSize;
    _this.drawBackImg();
    return _this;
  }
  return ListMenu;
}(SubMenu);

var AttackMenu = function (_ListMenu) {
  _inherits(AttackMenu, _ListMenu);
  var _super = _createSuper(AttackMenu);
  function AttackMenu(fetchImageCB) {
    var _this;
    _classCallCheck(this, AttackMenu);
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "drawAttackList", function () {
      for (var i = 0; i < _this.listItems.length; i++) {
        var attack = _this.listItems[i];
        attack.textArea = new TextArea(1, i * 2, 8, 1);
        attack.textArea.instantText(_this.menuCanvas.ctx, attack.displayName, "white");
        _this.drawCostMeter(i, attack.maxCost, attack.currCost);
        _this.drawTypeIcon(i, attack.type);
        _this.drawPowerIcon(i, attack.power);
        _this.drawTargetsIcon(i, attack.targets);
        _this.drawHitsIcon(i, attack.hits);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "drawTypeIcon", function (listIndex, type) {
      _this.menuCanvas.paintImage(_this.fetchImage("".concat(type, "TypeIcon")), 88 * config.screenSize, _this.getYOffsetForIndex(listIndex) + 8 * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawPowerIcon", function (listIndex, power) {
      _this.menuCanvas.paintImage(_this.fetchImage("pwr".concat(power, "Icon")), 96 * config.screenSize, _this.getYOffsetForIndex(listIndex) + 8 * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawTargetsIcon", function (listIndex, targets) {
      var imageName = targets === 'single' ? 'targetOne' : 'targetAll';
      _this.menuCanvas.paintImage(_this.fetchImage(imageName), 104 * config.screenSize, _this.getYOffsetForIndex(listIndex) + 8 * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawHitsIcon", function (listIndex, hits) {
      _this.menuCanvas.paintImage(_this.fetchImage('oneHitIcon'),
      112 * config.screenSize, _this.getYOffsetForIndex(listIndex) + 8 * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawCostMeter", function (listIndex, maxCost, currCost) {
      var blockCount = maxCost / 4;
      var remCount = currCost;
      for (var i = 0; i < blockCount; i++) {
        var remove = maxCost - (i + 1) * 4;
        var check = maxCost - remove - i * 4;
        var _final = 25 * (remCount - check);
        _final = _final >= 0 ? 0 : _final;
        _final = _final / 25 < -3 ? -100 : _final;
        _this.menuCanvas.ctx.drawImage(_this.fetchImage("costMeter".concat(100 + _final)), (1 + i) * (8 * config.screenSize), (1 + listIndex * 2) * (8 * config.screenSize), 8 * config.screenSize, 8 * config.screenSize);
        remCount -= 4;
      }
    });
    _this.fetchImage = function (imgName) {
      return fetchImageCB(imgName);
    };
    return _this;
  }
  return AttackMenu;
}(ListMenu);

var BattleMenuAH = function BattleMenuAH(cbObj) {
  _classCallCheck(this, BattleMenuAH);
  this.nextIcon = function () {
    cbObj.nextIconCB();
  };
  this.prevIcon = function () {
    cbObj.prevIconCB();
  };
  this.getCurrMenuType = function () {
    return cbObj.getCurrMenuTypeCB();
  };
  this.selectIcon = function () {
    cbObj.selectIconCB();
  };
};

var BattleMenuCanvas = function (_GameCanvas) {
  _inherits(BattleMenuCanvas, _GameCanvas);
  var _super = _createSuper(BattleMenuCanvas);
  function BattleMenuCanvas() {
    var _this;
    _classCallCheck(this, BattleMenuCanvas);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "setTopMessage", function (message) {
      _this.ctx.clearRect(0, 8 * config.screenSize, 160 * config.screenSize, 8 * config.screenSize);
      _this.topTxt.instantText(_this.ctx, message, 'white');
    });
    _defineProperty(_assertThisInitialized(_this), "drawBottomSection", function (dgmnData) {
      _this.drawNickname(_this.dgmnNicknameTxt, dgmnData.nickname);
      _this.dgmnSpeciesNameTxt.instantText(_this.ctx, dgmnData.speciesName + ".MON", "green");
      _this.dgmnHPTxt.instantText(_this.ctx, ".hp" + _this.menuUtility.prependZeros(dgmnData.currentHP, 3), "white");
      _this.dgmnENTxt.instantText(_this.ctx, ".en" + dgmnData.currentEN, "white");
      _this.drawLevel(_this.dgmnLVTxt, dgmnData.currentLevel);
      _this.drawDgmnPortrait(dgmnData.portrait);
    });
    _defineProperty(_assertThisInitialized(_this), "drawNickname", function (textArea, nickname) {
      textArea.instantText(_this.ctx, nickname, "white");
    });
    _defineProperty(_assertThisInitialized(_this), "drawLevel", function (textArea, level) {
      textArea.instantText(_this.ctx, ".lv" + _this.menuUtility.prependZeros(level, 3), "white");
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnPortrait", function (portraitImg) {
      _this.ctx.drawImage(portraitImg, 0, 0, 256, 248, 0, 112 * config.screenSize, 32 * config.screenSize, (32 - 1) * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawMenuButtons", function (selected, images, coord) {
      var buttonCount = Object.keys(images).length;
      _this.ctx.clearRect(coord[0] * 8 * config.screenSize, coord[1] * 8 * config.screenSize, buttonCount * 16 * config.screenSize, 16 * config.screenSize);
      var offset = 0;
      for (var image in images) {
        var img = image === selected ? images[image].selected : images[image].deselected;
        _this.ctx.drawImage(img, (offset * 16 + coord[0] * 8) * config.screenSize, coord[1] * 8 * config.screenSize, 16 * config.screenSize, 16 * config.screenSize);
        offset++;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "paintCurrentCursor", function (battleIndex, image) {
      _this.paintImage(image, 80 * config.screenSize, (24 + battleIndex * 32) * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "clearCurrentCursors", function (isEnemy) {
      var xOffset = !isEnemy ? 72 : 56;
      _this.ctx.clearRect(xOffset * config.screenSize, 16 * config.screenSize, 24 * config.screenSize, 96 * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "setCurrentTargetCursor", function (battleIndex, image) {
      _this.clearCurrentCursors(true);
      _this.paintImage(image, 64 * config.screenSize, (battleIndex * 32 + 24) * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "dgmnHPENTxtColorize", function (_char, wholeString, index) {
      var color = 'none';
      if (_char === 'hp' || _char === 'en' || _char === 'lv') {
        color = 'green';
      } else if (_char === '0' && index === 1 || _char === '0' && index === 2 && wholeString[1] === '0') {
        color = 'darkGreen';
      }
      return color;
    });
    _this.menuUtility = new MenuUtility();
    _this.topTxt = new TextArea(0, 1, 20);
    _this.dgmnNicknameTxt = new TextArea(4, 14, 10);
    _this.dgmnSpeciesNameTxt = new TextArea(4, 15, 16);
    _this.dgmnHPTxt = new TextArea(4, 16, 4, 1, function (_char2, wholeString, index) {
      return _this.dgmnHPENTxtColorize(_char2, wholeString, index);
    });
    _this.dgmnENTxt = new TextArea(4, 17, 4, 1, function (_char3, wholeString, index) {
      return _this.dgmnHPENTxtColorize(_char3, wholeString, index);
    });
    _this.dgmnLVTxt = new TextArea(16, 14, 4, 1, function (_char4, wholeString, index) {
      return _this.dgmnHPENTxtColorize(_char4, wholeString, index);
    });
    return _this;
  }
  return BattleMenuCanvas;
}(GameCanvas);

var BattleMenu = function (_Menu) {
  _inherits(BattleMenu, _Menu);
  var _super = _createSuper(BattleMenu);
  function BattleMenu() {
    var _this;
    _classCallCheck(this, BattleMenu);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "init", function () {
      debugLog("+ Battle Menu");
      _this.menuCanvas.setTopMessage("Attack");
      _this.setCurrentDgmn(0);
      _this.buildDgmnMenu();
      _this.currSubMenu = 'dgmn';
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "buildDgmnMenu", function () {
      _this.addSubMenu('dgmn', new IconMenu([14, 16], ['attack', 'defend', 'stats'], 'dgmn'));
      _this.subMenus.dgmn.isVisible = true;
      _this.subMenus.dgmn.images = _this.buildIconImages(_this.subMenus.dgmn.iconList);
      _this.subMenus.dgmn.drawIcons(0);
    });
    _defineProperty(_assertThisInitialized(_this), "buildAttackMenu", function () {
      var currDgmnAttackData = _this.battleAH.getDgmnAttackData(_this.battleAH.getCurrDgmnChoice(), ['displayName', 'currCost', 'maxCost', 'type', 'power', 'hits', 'targets']);
      debugLog("++ Build Attack List | Data = ", currDgmnAttackData);
      _this.addSubMenu('attack', new AttackMenu(_this.systemAH.fetchImage, [4, 2], 6, 16, 2, currDgmnAttackData, _this.systemAH.fetchImage('miniCursor'), _this.systemAH.fetchImage('battleOptionSelectBaseRight'), 'attack'));
      _this.subMenus.attack.drawAttackList();
    });
    _defineProperty(_assertThisInitialized(_this), "setCurrentDgmn", function (battleIndex) {
      _this.menuCanvas.paintCurrentCursor(battleIndex, _this.systemAH.fetchImage('cursor'));
      var dgmnData = _this.battleAH.getDgmnDataByIndex(0, ['speciesName', 'nickname', 'currentHP', 'currentEN', 'currentLevel']);
      dgmnData.portrait = _this.systemAH.fetchImage("".concat(dgmnData.speciesName.toLowerCase(), "Portrait"));
      _this.menuCanvas.drawBottomSection(dgmnData);
    });
    _defineProperty(_assertThisInitialized(_this), "setCurrentAttackTarget", function (targets, dir) {
      var spot = dir ? _this.validateTarget(dir) : _this.currTargetChoice;
      if (targets === 'single') {
        _this.menuCanvas.setCurrentTargetCursor(spot, _this.systemAH.fetchImage('cursorLeft'));
        _this.currTargetChoice = spot;
      } else {
        for (var i = 0; i < 3; i++) {
          _this.menuCanvas.paintImage(_this.systemAH.fetchImage('cursorLeft'), 64 * config.screenSize, (i * 32 + 24) * config.screenSize);
        }
      }
      _this.battleAH.drawBattleCanvas();
    });
    _defineProperty(_assertThisInitialized(_this), "validateTarget", function (dir) {
      var newTargetChoice = _this.currTargetChoice;
      if (dir === 'next' && _this.currTargetChoice < 2) {
        newTargetChoice++;
      } else if (dir === 'prev' && _this.currTargetChoice > 0) {
        newTargetChoice--;
      }
      return newTargetChoice;
    });
    _defineProperty(_assertThisInitialized(_this), "launchAttackList", function () {
      _this.buildAttackMenu();
      _this.currSubMenu = 'attack';
      _this.subMenus[_this.currSubMenu].isVisible = true;
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "getCurrMenuType", function () {
      return _this.subMenus[_this.currSubMenu] instanceof IconMenu ? 'icon' : 'list';
    });
    _defineProperty(_assertThisInitialized(_this), "nextIcon", function () {
      _this.subMenus[_this.currSubMenu].nextIcon();
      var message = _this.subMenus[_this.currSubMenu].getCurrLabel();
      _this.menuCanvas.setTopMessage(message.charAt(0).toUpperCase() + message.slice(1));
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "prevIcon", function () {
      _this.subMenus[_this.currSubMenu].prevIcon();
      var message = _this.subMenus[_this.currSubMenu].getCurrLabel();
      _this.menuCanvas.setTopMessage(message.charAt(0).toUpperCase() + message.slice(1));
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "selectIcon", function () {
      var selected = _this.subMenus[_this.currSubMenu].getCurrLabel();
      _this.subMenus[_this.currSubMenu].selectIcon();
      if (selected === 'attack') {
        _this.launchAttackList();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "drawMenu", function () {
      for (var key in _this.subMenus) {
        if (_this.subMenus[key].isVisible) {
          _this.menuCanvas.paintCanvas(_this.subMenus[key].menuCanvas);
        }
      }
      _this.battleAH.drawBattleCanvas();
    });
    _this.battleAH = _this.parentAH;
    _this.menuCanvas = new BattleMenuCanvas('battle-menu-canvas', 160, 144);
    _this.currTargetChoice = 0;
    _this.battleMenuAH = new BattleMenuAH({
      nextIconCB: _this.nextIcon,
      prevIconCB: _this.prevIcon,
      getCurrMenuTypeCB: _this.getCurrMenuType,
      selectIconCB: _this.selectIcon
    });
    return _this;
  }
  return BattleMenu;
}(Menu);

var AttackManager = function AttackManager() {
  _classCallCheck(this, AttackManager);
  _defineProperty(this, "addAction", function (action) {
    console.log("Adding Action = ", action);
  });
  this.attackActions = {};
};

var BattleDgmnStatusCanvas = function (_GameCanvas) {
  _inherits(BattleDgmnStatusCanvas, _GameCanvas);
  var _super = _createSuper(BattleDgmnStatusCanvas);
  function BattleDgmnStatusCanvas() {
    var _this;
    _classCallCheck(this, BattleDgmnStatusCanvas);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "drawDgmnStatusMeter", function (coord, images, meterLength) {
      var xPosition = coord[0] * 8;
      var yPosition = coord[1] * 8;
      var barHex = meterLength >= 9 ? "#6CA66C" : "#1D5A4A";
      var borderImg = meterLength >= 9 ? images[0] : images[1];
      _this.ctx.clearRect(xPosition * config.screenSize, yPosition * config.screenSize, 24 * config.screenSize, 8 * config.screenSize);
      _this.ctx.drawImage(borderImg, xPosition * config.screenSize, yPosition * config.screenSize, 24 * config.screenSize, 8 * config.screenSize);
      _this.ctx.fillStyle = barHex;
      _this.ctx.fillRect((xPosition + 4) * config.screenSize, (yPosition + 2) * config.screenSize, meterLength * config.screenSize, 3 * config.screenSize);
    });
    return _this;
  }
  return BattleDgmnStatusCanvas;
}(GameCanvas);

var Battle = function Battle() {
  var _this = this;
  _classCallCheck(this, Battle);
  _defineProperty(this, "init", function () {
    debugLog("Building New Battle...");
    _this.battleMenu = new BattleMenu(_this.systemAH, _this.gameAH, _this.battleAH);
    _this.battleIO.setMenuAH(_this.battleMenu.battleMenuAH);
    _this.yourParty = _this.gameAH.getDgmnParty();
    _this.generateEnemyParty();
    _this.initCanvas();
    _this.loadBattleImages();
    debugLog("Your Party = ", _this.yourParty);
  });
  _defineProperty(this, "initCanvas", function () {
    _this.battleCanvas = new BattleCanvas('battle-canvas', 160, 144);
  });
  _defineProperty(this, "initAH", function (systemAH, gameAH, dgmnAH, dungeonAH, digiBeetleAH) {
    _this.systemAH = systemAH;
    _this.gameAH = gameAH;
    _this.dgmnAH = dgmnAH;
    _this.DungeonAH = dungeonAH;
    _this.digiBeetleAH = digiBeetleAH;
  });
  _defineProperty(this, "loadBattleImages", function () {
    var allImages = [];
    var defaultImages = _this.battleUtility.getDefaultBattleImages();
    var _iterator = _createForOfIteratorHelper(defaultImages),
        _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var img = _step.value;
        allImages.push(img);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var allDgmn = _this.yourParty.concat(_this.enemyParty);
    var _iterator2 = _createForOfIteratorHelper(allDgmn),
        _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var dgmnId = _step2.value;
        var dgmnData = _this.dgmnAH.getDgmnData(dgmnId, ['speciesName'], dgmnId.charAt(0) === 'e');
        var allDgmnImages = _this.dgmnUtility.getAllDgmnImages(dgmnData.speciesName);
        var _iterator3 = _createForOfIteratorHelper(allDgmnImages),
            _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var dgmnImage = _step3.value;
            allImages.push(dgmnImage);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    _this.systemAH.loadImages(allImages, function () {
      _this.onBattleImagesLoaded();
    });
  });
  _defineProperty(this, "onBattleImagesLoaded", function () {
    _this.dgmnStatusCanvas = new BattleDgmnStatusCanvas('battle-dgmn-status', 160, 144);
    _this.gameAH.addCanvasObject(_this.battleCanvas);
    _this.buildDgmnCanvases();
    _this.battleMenu.init();
    _this.drawAllStatuses();
    _this.drawBattleCanvas();
    _this.gameAH.refreshScreen();
  });
  _defineProperty(this, "initDgmnChoice", function () {
    _this.battleMenu.setCurrentDgmn(_this.currDgmnChoice);
  });
  _defineProperty(this, "gotoNextChoice", function () {
    _this.currDgmnChoice++;
    if (_this.currDgmnChoice >= 3) {
      console.log("BEGIN ACTIONS");
    } else {
      _this.initDgmnChoice();
    }
  });
  _defineProperty(this, "generateEnemyParty", function () {
  });
  _defineProperty(this, "drawAllStatuses", function () {
    for (var i = 0; i < 3; i++) {
      _this.drawDgmnStatusMeter(false, i, 'hp');
      _this.drawDgmnStatusMeter(false, i, 'en');
      _this.drawDgmnStatusMeter(true, i, 'hp');
      _this.drawDgmnStatusMeter(true, i, 'en');
    }
  });
  _defineProperty(this, "drawDgmnStatusMeter", function (isEnemy, dgmnIndex, stat) {
    var dgmnData = !isEnemy ? _this.dgmnAH.getDgmnData(_this.yourParty[dgmnIndex], ["current".concat(stat.toUpperCase()), 'currentStats']) : _this.dgmnAH.getDgmnData(_this.enemyParty[dgmnIndex], ["current".concat(stat.toUpperCase()), 'currentStats'], true);
    var coord = [];
    coord[0] = isEnemy ? 1 : 17;
    coord[1] = dgmnIndex * 4 + 2 + (stat === 'hp' ? 0 : 1);
    var currStat = dgmnData["current".concat(stat.toUpperCase())];
    var maxStat = stat === 'hp' ? dgmnData.currentStats.HP : 100;
    _this.dgmnStatusCanvas.drawDgmnStatusMeter(coord, [_this.systemAH.fetchImage('dgmnBarLightGreen'), _this.systemAH.fetchImage('dgmnBarDarkGreen')], _this.battleUtility.calculateMeterLength(currStat, maxStat));
  });
  _defineProperty(this, "paintToBattleCanvas", function (image, x, y) {
    _this.battleCanvas.paintImage(image, x, y);
  });
  _defineProperty(this, "drawBattleCanvas", function () {
    _this.battleCanvas.drawBattleBase(_this.systemAH.fetchImage('battleBackground'));
    _this.battleCanvas.paintCanvas(_this.dgmnStatusCanvas);
    for (var i = 0; i < 3; i++) {
      _this.battleCanvas.drawDgmnCanvas(_this.dgmnAH.getCanvas(_this.yourParty[i]));
      _this.battleCanvas.drawDgmnCanvas(_this.dgmnAH.getCanvas(_this.enemyParty[i]));
    }
    _this.battleCanvas.paintCanvas(_this.battleMenu.menuCanvas);
    _this.gameAH.refreshScreen();
  });
  _defineProperty(this, "buildDgmnCanvases", function () {
    var dgmnList = _this.yourParty.concat(_this.enemyParty);
    for (var i = 0; i < dgmnList.length; i++) {
      var isEnemy = dgmnList[i].charAt(0) === 'e';
      var dgmnData = _this.dgmnAH.getDgmnData(dgmnList[i], ['speciesName'], isEnemy);
      var battleLocation = !isEnemy ? i : i - 3;
      var dgmnImageList = [_this.systemAH.fetchImage("".concat(dgmnData.speciesName.toLowerCase(), "Idle0")), _this.systemAH.fetchImage("".concat(dgmnData.speciesName.toLowerCase(), "Idle1"))];
      _this.dgmnAH.initDgmnCanvas(dgmnList[i], _this.drawBattleCanvas, dgmnImageList, battleLocation);
      _this.dgmnAH.startDgmnIdleAnimation(dgmnList[i]);
    }
  });
  _defineProperty(this, "launchTargetSelect", function (attackData) {
    console.log("Launch Target Select for ", attackData.displayName);
    _this.attackChoice = attackData;
    _this.attackMenu = undefined;
    _this.menuState = 'target-select';
    _this.setCurrentAttackTarget();
    _this.drawBattleCanvas();
  });
  _defineProperty(this, "setCurrentAttackTarget", function (dir) {
    if (dir) {
      _this.battleMenu.setCurrentAttackTarget(_this.attackChoice.targets, dir);
    } else {
      _this.battleMenu.setCurrentAttackTarget(_this.attackChoice.targets);
    }
  });
  _defineProperty(this, "getDgmnValueByIndex", function (isEnemy, dgmnIndex, value) {
    var returnValue;
    if (!isEnemy) {
      returnValue = _this.yourParty[dgmnIndex][value];
    }
    return returnValue;
  });
  _defineProperty(this, "getDgmnDataByIndex", function (dgmnIndex, data) {
    return _this.dgmnAH.getDgmnData(_this.yourParty[dgmnIndex], data);
  });
  _defineProperty(this, "getDgmnAttackData", function (dgmnIndex, data) {
    return _this.dgmnAH.getDgmnAttackData(_this.yourParty[dgmnIndex], data);
  });
  _defineProperty(this, "getCurrDgmnChoice", function () {
    return _this.currDgmnChoice;
  });
  _defineProperty(this, "selectAttack", function () {
    _this.attackMenu.selectAttack();
  });
  _defineProperty(this, "selectTarget", function () {
    _this.attackManager.addAction();
    _this.gotoNextChoice();
  });
  _defineProperty(this, "menuInput", function (dir) {
    console.log("MENU INPUT = ", dir);
  });
  this.battleActive = true;
  this.turn = 0;
  this.yourParty;
  this.enemyParty = ['edId0', 'edId1', 'edId2'];
  this.menuState = 'battle';
  this.currDgmnChoice = 0;
  this.attackChoice;
  this.systemAH;
  this.gameAH;
  this.digiBeetleAH;
  this.dungeonAH;
  this.battleAH = new BattleAH({
    drawBattleCanvasCB: this.drawBattleCanvas,
    paintToBattleCanvasCB: this.paintToBattleCanvas,
    getDgmnDataByIndexCB: this.getDgmnDataByIndex,
    selectAttackCB: this.selectAttack,
    selectTargetCB: this.selectTarget,
    setCurrentAttackTargetCB: this.setCurrentAttackTarget,
    getDgmnAttackDataCB: this.getDgmnAttackData,
    getCurrDgmnChoiceCB: this.getCurrDgmnChoice
  });
  this.battleIO = new BattleIO(this.battleAH);
  this.battleUtility = new BattleUtility();
  this.dgmnUtility = new DgmnUtility();
  this.attackManager = new AttackManager();
  this.battleCanvas;
  this.dgmnStatusCanvas;
  this.battleMenu;
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
[0, 16, 1, 1, 4, 1, 5, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 6, 1, 0], [0, 5, 1, 1, 1, 1, 10, 1], [0, 1, 1, 7, 1, 1, 1, 0], [0, 1, 8, 1, 1, 2, 1, 0], [0, 0, 0, 1, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0],
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
  _defineProperty(this, "isOpenTile", function (tileValue) {
    var possibleValues = [1];
    return possibleValues.indexOf(tileValue) !== -1;
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
    _this.generateEvents();
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
    var possibleTiles = _this.findAllTilesOnFloor([2, 4, 12, 13, 14, 15, 16]);
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
    var possibleTiles = _this.findAllTilesOnFloor([3, 4, 13, 15, 16]);
    var randomChoice = Math.floor(Math.random() * possibleTiles.length);
    end.room = possibleTiles[randomChoice].room;
    end.tile = possibleTiles[randomChoice].tile;
    _this.roomMatrix[end.room[0]][end.room[1]].changeTile([end.tile[0], end.tile[1]], 102);
    return end;
  });
  _defineProperty(this, "generateEvents", function () {
    var eventOrder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ["enemy", "trap", "treasure"];
    for (var i = 0; i < eventOrder.length; i++) {
      if (eventOrder[i] === 'enemy') {
        _this.generateEnemies();
      } else if (eventOrder[i] === 'trap') ; else if (eventOrder[i] === 'treasure') ;
    }
  });
  _defineProperty(this, "generateEnemies", function () {
    var potentialSpots = _this.findAllTilesOnFloor([6, 8, 10, 11, 12, 14, 15]);
    var enemyChance = _this.floorEventMod === 'enemy' ? 30 : 60;
    var encounterId = 1;
    for (var i = 0; i < potentialSpots.length; i++) {
      var rando = Math.floor(Math.random() * 100);
      if (rando <= enemyChance) {
        _this.addEncounter(potentialSpots[i], encounterId);
        encounterId++;
      }
    }
    debugLog("ENCOUNTERS = ", _this.encounters);
  });
  _defineProperty(this, "addEncounter", function (tile, encounterId) {
    var tileNumber = 105 + encounterId / 100;
    _this.roomMatrix[tile.room[0]][tile.room[1]].changeTile([tile.tile[0], tile.tile[1]], tileNumber);
    _this.encounters.push({
      id: encounterId
    });
    _this.createEncounterRange(tile, encounterId);
  });
  _defineProperty(this, "createEncounterRange", function (encounterTile, encounterId) {
    var encounterRange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var tileNumber = 106 + encounterId / 100;
    var range = encounterRange;
    var tile = encounterTile.tile;
    var rMin = tile[0] - range < 0 ? 0 - tile[0] : -range;
    var rMax = range + 1;
    var cMin = tile[1] - range < 0 ? 0 - tile[1] : -range;
    var cMax = range + 1;
    for (var r = rMin; r < rMax; r++) {
      for (var c = cMin; c < cMax; c++) {
        var delta = Math.abs(r) + Math.abs(c);
        if (delta <= range && delta !== 0) {
          if (_this.mapUtility.isOpenTile(_this.roomMatrix[encounterTile.room[0]][encounterTile.room[1]].tileMatrix[tile[0] + r][tile[1] + c])) {
            _this.roomMatrix[encounterTile.room[0]][encounterTile.room[1]].changeTile([tile[0] + r, tile[1] + c], tileNumber);
          }
        }
      }
    }
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
        _this.dungeonAH.setMoving('none');
        return;
      }
      if (upDown === 'up') {
        _this.dungeonAH.setMoving('none');
      }
    }
  });
  _defineProperty(this, "moveInDirection", function (dir) {
    var delta = dir === 'down' || dir === 'right' ? -1 : 1;
    var moveX = dir === 'down' || dir === 'up' ? null : _this.floorCanvas.x + delta * config.screenSize;
    var moveY = dir === 'right' || dir === 'left' ? null : _this.floorCanvas.y + delta * config.screenSize;
    _this.moveFloorCanvas(moveX, moveY);
  });
  _defineProperty(this, "checkCurrentTile", function () {
    var room = _this.roomMatrix[_this.currentTile.room[0]][_this.currentTile.room[1]];
    var tile = room.tileMatrix[_this.currentTile.tile[0]][_this.currentTile.tile[1]];
    if (tile === 102) {
      _this.dungeonAH.goUpFloor();
      return true;
    } else if (Math.floor(tile) === 105 || Math.floor(tile) === 106) {
      _this.dungeonAH.startBattle();
      return true;
    }
    return false;
  });
  _defineProperty(this, "checkCollision", function () {
    var room = _this.roomMatrix[_this.currentTile.room[0]][_this.currentTile.room[1]];
    var tile = _this.currentTile.tile;
    if (tile[0] !== 0 && room.tileMatrix[tile[0] - 1][tile[1]] === 0) {
      _this.dungeonAH.setCollision('up', true);
    } else if (tile[0] === 0 && _this.currentTile.room[0] === 0) {
      _this.dungeonAH.setCollision('up', true);
    } else {
      _this.dungeonAH.setCollision('up', false);
    }
    if (tile[1] !== 7 && room.tileMatrix[tile[0]][tile[1] + 1] === 0) {
      _this.dungeonAH.setCollision('right', true);
    } else if (tile[1] === 7 && _this.currentTile.room[1] >= _this.roomMatrix[_this.currentTile.room[0]].length - 1) {
      _this.dungeonAH.setCollision('right', true);
    } else {
      _this.dungeonAH.setCollision('right', false);
    }
    if (tile[0] !== 7 && room.tileMatrix[tile[0] + 1][tile[1]] === 0) {
      _this.dungeonAH.setCollision('down', true);
    } else if (tile[0] === 7 && _this.currentTile.room[0] >= _this.roomMatrix.length - 1) {
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
    _this.floorCanvas.drawTile(_this.systemAH.fetchImage('endTile'), _this.end.room, _this.end.tile);
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
  this.gameAH;
  this.dungeonAH;
  this.mapUtility = new MapUtility();
  this.floorCanvas;
  this.roomMatrix = [];
  this.floorEventMod = 'none';
  this.start = {
    room: [],
    tile: []
  };
  this.end = {
    room: [],
    tile: []
  };
  this.encounters = [null];
  this.currentTile = {
    room: [],
    tile: []
  };
}
;

var DungeonAH = function DungeonAH(getCurrentDirectionCB, setCurrentDirectionCB, paintFloorCanvasCB, getDungeonStateCB, getMovingCB, setMovingCB, getCollisionCB, setCollisionCB, moveFloorCB, goUpFloorCB, startBattleCB) {
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
  this.goUpFloor = function () {
    goUpFloorCB();
  };
  this.startBattle = function () {
    startBattleCB();
  };
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
    debugLog("Ascending Floor...");
    _this.moving = 'none';
    _this.dungeonState = 'ascending';
  });
  _defineProperty(this, "startBattle", function () {
    debugLog("Starting Battle...");
    _this.moving = 'none';
    _this.dungeonState = 'battle';
    _this.gameAH.startBattle();
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
  this.dungeonAH = new DungeonAH(this.getCurrentDirection, this.setCurrentDirection, this.paintFloorCanvas, this.getDungeonState, this.getMoving, this.setMoving, this.getCollision, this.setCollision, this.moveFloor, this.goUpFloor, this.startBattle);
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

var GameAH = function GameAH(addToObjectListCB, drawGameScreenCB, startBattleCB, getDgmnPartyCB) {
  _classCallCheck(this, GameAH);
  this.addCanvasObject = function (canvas) {
    addToObjectListCB(canvas);
  };
  this.refreshScreen = function () {
    drawGameScreenCB();
  };
  this.startBattle = function () {
    startBattleCB();
  };
  this.getDgmnParty = function () {
    return getDgmnPartyCB();
  };
};

var Game = function Game() {
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
        _this.battle.battleIO.keyTriage(key, upDown);
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
    _this.battle = new Battle();
    _this.battle.initAH(_this.systemAH, _this.gameAH, _this.yourDgmn.dgmnAH, function () {}, function () {});
    _this.battle.init();
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
  _defineProperty(this, "getDgmnParty", function () {
    return _this.yourParty;
  });
  debugLog('Game Created...');
  this.gameAH = new GameAH(this.addToObjectList, this.drawGameScreen, this.startBattle, this.getDgmnParty);
  this.systemAH;
  this.yourDgmn = new DgmnManager();
  this.yourParty = this.yourDgmn.party;
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

(function (_GameCanvas) {
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
})(GameCanvas);

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
    _this.imageHandler.addToQueue(genericImages.concat(fontImages$1), function () {
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
  _defineProperty(this, "buildFontImages", function () {
    var _iterator = _createForOfIteratorHelper(fontImages$1),
        _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var imgURL = _step.value;
        var image = new Image();
        image.src = imgURL;
        fontImages.push(image);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
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
  this.buildFontImages();
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
