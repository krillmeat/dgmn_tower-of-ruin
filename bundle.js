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
  pixelKidMode: 'PKP',
  screenSize: 2,
  tileSize: 2 * 8,
  textSpeed: 1
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

var DgmnAH = function DgmnAH(cbObj) {
  _classCallCheck(this, DgmnAH);
  this.getDgmnData = function (dgmnId, dataList, isEnemy) {
    return cbObj.getDgmnDataCB(dgmnId, dataList, isEnemy);
  };
  this.getDgmnAttackData = function (dgmnId, dataList) {
    return cbObj.getDgmnAttackDataCB(dgmnId, dataList);
  };
  this.initDgmnCanvas = function (dgmnId, drawCB, imageList, battleLocation) {
    return cbObj.initDgmnCanvasCB(dgmnId, drawCB, imageList, battleLocation);
  };
  this.getCanvas = function (dgmnId) {
    return cbObj.getCanvasCB(dgmnId);
  };
  this.startDgmnIdleAnimation = function (dgmnId) {
    return cbObj.animateDgmnCB(dgmnId);
  };
  this.useAttack = function (dgmnId, amount, attackName) {
    return cbObj.useAttackCB(dgmnId, amount, attackName);
  };
  this.dealDMG = function (dgmnId, dmg) {
    return cbObj.dealDMGCB(dgmnId, dmg);
  };
  this.checkKO = function (dgmnId) {
    return cbObj.checkKOCB(dgmnId);
  };
  this.checkAllDead = function (isEnemy) {
    return cbObj.checkAllDeadCB(isEnemy);
  };
  this.createDgmn = function (index, data, isEnemy) {
    return cbObj.createDgmnCB(index, data, isEnemy);
  };
  this.generateEnemies = function (data) {
    return cbObj.generateEnemiesCB(data);
  };
  this.modifyCombo = function (target, comboDelta) {
    return cbObj.modifyComboCB(target, comboDelta);
  };
  this.modifyWeak = function (target, weakDelta) {
    return cbObj.modifyWeakCB(target, weakDelta);
  };
  this.showDgmnFrame = function (dgmnId, frame) {
    return cbObj.showDgmnFrameCB(dgmnId, frame);
  };
  this.idleDgmn = function (dgmnId) {
    return cbObj.idleDgmnCB(dgmnId);
  };
  this.getIsDead = function (dgmnId) {
    return cbObj.getIsDeadCB(dgmnId);
  };
  this.battleWrapUp = function (dgmnId, rewards) {
    return cbObj.battleWrapUpCB(dgmnId, rewards);
  };
  this.moveDgmnCanvas = function (dgmnId, newX, newY) {
    return cbObj.moveDgmnCanvasCB(dgmnId, newX, newY);
  };
  this.stopDgmnCanvas = function (dgmnId) {
    return cbObj.stopDgmnCanvasCB(dgmnId);
  };
  this.giveDgmnReward = function (dgmnId, reward) {
    return cbObj.giveDgmnRewardCB(dgmnId, reward);
  };
  this.giveDgmnXP = function (dgmnId, xp) {
    return cbObj.giveDgmnXPCB(dgmnId, xp);
  };
  this.checkLevelUp = function (dgmnId) {
    return cbObj.checkLevelUpCB(dgmnId);
  };
  this.buildStatGrowth = function (dgmnId, stats) {
    return cbObj.buildStatGrowthCB(dgmnId, stats);
  };
  this.getTempDgmn = function () {
    return cbObj.getTempDgmnCB();
  };
  this.evolve = function (dgmnId, speciesName) {
    return cbObj.evolveCB(dgmnId, speciesName);
  };
  this.hatchEgg = function (dgmnId, species) {
    return cbObj.hatchEggCB(dgmnId, species);
  };
};

var evolutions = {
  Bota: ['Koro'],
  Yura: ['Bud'],
  Doki: [{
    dgmnName: 'Bibi',
    fields: {
      NS: 3
    }
  }],
  Zuru: [{
    dgmnName: 'Pagu',
    fields: {
      NA: 3
    }
  }],
  Pururu: [{
    dgmnName: 'Poro',
    fields: {
      WG: 3
    }
  }],
  Choro: [{
    dgmnName: 'Capri',
    fields: {
      ME: 3
    }
  }],
  Pitch: [{
    dgmnName: 'Puka',
    fields: {
      DS: 3
    }
  }],
  Poyo: [{
    dgmnName: 'Toko',
    fields: {
      VB: 3
    }
  }]
};

var dgmnDB = {
  Bota: {
    stage: 1,
    attr: 'Free',
    stats: {
      HP: 2,
      ATK: 1,
      DEF: 0,
      INT: 0,
      RES: 0,
      HIT: 1,
      AVO: 0,
      SPD: 1
    },
    evolutions: evolutions['Bota'],
    types: {},
    fields: {
      DR: 1
    },
    attack: 'bubbles',
    hatchFields: {
      DR: 1
    }
  },
  Jyari: {
    stage: 1,
    attr: 'Free',
    stats: {
      HP: 2,
      ATK: 2,
      DEF: 0,
      INT: 0,
      RES: 0,
      HIT: 0,
      AVO: 0,
      SPD: 1
    },
    evolutions: ['Gigi'],
    types: {},
    fields: {
      DR: 1
    },
    attack: 'bubbles',
    hatchFields: {
      DR: 2,
      NA: 1
    }
  },
  Yura: {
    stage: 1,
    attr: 'Free',
    stats: {
      HP: 2,
      ATK: 1,
      DEF: 0,
      INT: 1,
      RES: 1,
      HIT: 0,
      AVO: 0,
      SPD: 0
    },
    evolutions: ['Bud'],
    types: {},
    fields: {
      JT: 1
    },
    attack: 'bubbles'
  },
  Doki: {
    stage: 1,
    attr: 'Free',
    stats: [2, 1, 0, 0, 0, 0, 1, 1],
    evolutions: [],
    types: {},
    fields: {
      NS: 1
    },
    attack: 'bubbles'
  },
  Zuru: {
    stage: 1,
    attr: 'Free',
    stats: [2, 1, 0, 1, 0, 0, 1, 0],
    evolutions: [],
    types: {},
    fields: {
      NA: 1
    },
    attack: 'bubbles'
  },
  Pururu: {
    stage: 1,
    attr: 'Free',
    stats: [2, 1, 0, 0, 0, 1, 0, 1],
    evolutions: [],
    types: {},
    fields: {
      WG: 1
    },
    attack: 'bubbles'
  },
  Choro: {
    stage: 1,
    attr: 'Free',
    stats: {
      HP: 2,
      ATK: 1,
      DEF: 1,
      INT: 0,
      RES: 1,
      HIT: 0,
      AVO: 0,
      SPD: 0
    },
    evolutions: ['Capri'],
    types: {},
    fields: {
      ME: 1
    },
    attack: 'bubbles'
  },
  Pitch: {
    stage: 1,
    attr: 'Free',
    stats: [2, 0, 1, 0, 1, 0, 1, 0],
    evolutions: [],
    types: {},
    fields: {
      DS: 1
    },
    attack: 'bubbles'
  },
  Poyo: {
    stage: 1,
    attr: 'Free',
    stats: [2, 1, 0, 1, 1, 0, 0, 0],
    evolutions: [],
    types: {},
    fields: {
      VB: 1
    },
    attack: 'bubbles'
  },
  Koro: {
    stage: 2,
    attr: 'Free',
    stats: {
      HP: 4,
      ATK: 2,
      DEF: 1,
      INT: 1,
      RES: 1,
      HIT: 2,
      AVO: 1,
      SPD: 2
    },
    evolutions: ['Agu'],
    types: {},
    fields: {
      DR: 2
    },
    evoFields: {
      DR: 2
    }
  },
  Bud: {
    stage: 2,
    attr: 'Free',
    stats: {
      HP: 6,
      ATK: 1,
      DEF: 1,
      INT: 2,
      RES: 2,
      HIT: 1,
      AVO: 1,
      SPD: 1
    },
    evolutions: ['Lala'],
    types: {},
    fields: {
      JT: 2
    },
    evoFields: {
      JT: 2
    }
  },
  Tane: {},
  Bibi: {},
  Pagu: {},
  Poro: {},
  Capri: {
    stage: 2,
    attr: 'Free',
    stats: {
      HP: 4,
      ATK: 2,
      DEF: 2,
      INT: 1,
      RES: 2,
      HIT: 1,
      AVO: 1,
      SPD: 1
    },
    evolutions: ['Haguru'],
    types: {},
    fields: {
      ME: 2
    },
    evoFields: {
      ME: 2
    }
  },
  Puka: {},
  Toko: {},
  Agu: {
    stage: 3,
    attr: 'vaccine',
    stats: {
      HP: 5,
      ATK: 5,
      DEF: 4,
      INT: 3,
      RES: 4,
      HIT: 4,
      AVO: 4,
      SPD: 3
    },
    evolutions: [],
    types: {
      fire: .5,
      water: 1.5,
      plant: .75,
      evil: 2
    },
    fields: {
      DR: 3
    },
    evoFields: {
      DR: 5
    },
    attack: 'babyFlame'
  },
  Gabu: {
    stage: 3,
    "class": 'data',
    stats: [5, 5, 5, 5, 5, 5, 5, 6],
    evolutions: evolutions['agu'],
    types: {
      water: .75,
      plant: 1.5,
      fire: 1.125
    }
  },
  Piyo: {
    stage: 3,
    "class": 'vaccine',
    stats: [5, 5, 5, 5, 5, 5, 5, 6],
    evolutions: evolutions['agu']
  },
  Terrier: {
    stage: 3,
    "class": 'vaccine',
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
    attr: 'data',
    stats: {
      HP: 5,
      ATK: 4,
      DEF: 3,
      INT: 5,
      RES: 4,
      HIT: 4,
      AVO: 4,
      SPD: 3
    },
    evolutions: [],
    types: {
      fire: 2,
      water: .5
    },
    fields: {
      JT: 3
    },
    evoFields: {
      JT: 5
    },
    attack: 'nutsShoot'
  },
  Haguru: {
    stage: 3,
    attr: 'virus',
    stats: {
      HP: 5,
      ATK: 5,
      DEF: 7,
      INT: 5,
      RES: 6,
      HIT: 5,
      AVO: 5,
      SPD: 3
    },
    evolutions: [],
    types: {},
    fields: {
      ME: 3
    },
    evoFields: {
      ME: 5
    },
    attack: 'darknessGear'
  },
  PicoDevi: {
    stage: 3,
    "class": 'virus',
    stats: [5, 5, 5, 5, 5, 5, 5, 8],
    evolutions: evolutions['agu'],
    types: {
      holy: 2,
      fire: 1.5
    }
  },
  Grey: {
    stage: 4,
    "class": 'vaccine',
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
  _defineProperty(this, "clearBottomSection", function () {
    _this.ctx.clearRect(0, 14 * 8 * config.screenSize, 20 * 8 * config.screenSize, 4 * 8 * config.screenSize);
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
      _this.paintImage(_this.frames[1]);
      _this.refreshScreen();
      _this.idleInterval = setInterval(function () {
        if (_this.isIdle) {
          _this.clearCanvas();
          _this.paintImage(_this.frames[currentFrame]);
          currentFrame++;
          if (currentFrame > 1) currentFrame = 0;
        }
        _this.refreshScreen();
      }, speed);
    });
    _defineProperty(_assertThisInitialized(_this), "showFrame", function (frame) {
      _this.isIdle = false;
      _this.clearCanvas();
      _this.paintImage(frame);
    });
    _defineProperty(_assertThisInitialized(_this), "idle", function () {
      _this.isIdle = true;
    });
    _defineProperty(_assertThisInitialized(_this), "stop", function () {
      clearInterval(_this.idleInterval);
      _this.clearCanvas();
      _this.refreshScreen();
      _this.refreshScreen = null;
    });
    _this.dgmnName = dgmnName;
    _this.frames = [];
    _this.animateSpeed = 2000;
    _this.idleInterval;
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
    animationFrames: [['bubbles1', 1], ['bubbles2', 1], ['bubbles3', 1], ['bubbles4', 1], ['bubbles5', 1], ['bubbles6', 1]],
    animationFrameCount: 6,
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

var AttackUtility = function AttackUtility() {
  _classCallCheck(this, AttackUtility);
  _defineProperty(this, "getComboLetter", function (combo) {
    var letter = 'F';
    if (combo >= 1 && combo < 5) {
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
  _defineProperty(this, "getComboMod", function (letter) {
    return comboRanks[letter];
  });
  _defineProperty(this, "getAttackData", function (attackName, attributeList) {
    var dataObj = {};
    var _iterator = _createForOfIteratorHelper(attributeList),
        _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var attr = _step.value;
        dataObj[attr] = attacksDB[attackName][attr];
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return dataObj;
  });
  _defineProperty(this, "getDisplayName", function (attackName) {
    return attacksDB[attackName].displayName;
  });
  _defineProperty(this, "getMaxCost", function (attackName) {
    return attacksDB[attackName].maxCost;
  });
  _defineProperty(this, "getType", function (attackName) {
    return attacksDB[attackName].type;
  });
  _defineProperty(this, "getStat", function (attackName) {
    return attacksDB[attackName].stat;
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
  this.attackUtility = new AttackUtility();
  this.displayName = this.attackUtility.getDisplayName(this.attackName);
  this.maxCost = this.attackUtility.getMaxCost(this.attackName);
  this.type = this.attackUtility.getType(this.attackName);
  this.power = this.attackUtility.getPower(this.attackName);
  this.targets = this.attackUtility.getTargets(this.attackName);
  this.hits = this.attackUtility.getHits(this.attackName);
  this.currCost = this.maxCost;
};

var digiTamaDB = {
  DR: ['Bota', 'Jyari'],
  NS: ['Doki'],
  WG: ['Pururu'],
  ME: ['Choro'],
  VB: ['Poyo'],
  NA: ['Zuru'],
  JT: ['Yura'],
  DS: ['Pitch']
};

var DgmnUtility = function DgmnUtility() {
  var _this = this;
  _classCallCheck(this, DgmnUtility);
  _defineProperty(this, "getAllDgmnImages", function (speciesName) {
    return ["DGMN/".concat(speciesName.toLowerCase(), "Idle0"), "DGMN/".concat(speciesName.toLowerCase(), "Idle1"), "DGMN/".concat(speciesName.toLowerCase(), "Attack"), "DGMN/".concat(speciesName.toLowerCase(), "Hurt"), "DGMN/".concat(speciesName.toLowerCase(), "Portrait")];
  });
  _defineProperty(this, "getAllEvoImages", function (speciesName) {
    var allImgs = [];
    var evos = _this.getEvolutions(speciesName);
    var _iterator = _createForOfIteratorHelper(evos),
        _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var evo = _step.value;
        allImgs.push("DGMN/".concat(evo.toLowerCase(), "Idle0"));
        allImgs.push("DGMN/".concat(evo.toLowerCase(), "Idle1"));
        allImgs.push("DGMN/".concat(evo.toLowerCase(), "Portrait"));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return allImgs;
  });
  _defineProperty(this, "getAllHatchImages", function (eggField) {
    var allImgs = [];
    var hatches = _this.getEggHatches(eggField);
    var _iterator2 = _createForOfIteratorHelper(hatches),
        _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var hatch = _step2.value;
        allImgs.push("DGMN/".concat(hatch.toLowerCase(), "Idle0"));
        allImgs.push("DGMN/".concat(hatch.toLowerCase(), "Idle1"));
        allImgs.push("DGMN/".concat(hatch.toLowerCase(), "Portrait"));
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return allImgs;
  });
  _defineProperty(this, "getTypeMod", function (type, speciesName) {
    return dgmnDB[speciesName].types[type] || 1;
  });
  _defineProperty(this, "getStage", function (speciesName) {
    return dgmnDB[speciesName].stage;
  });
  _defineProperty(this, "getAttribute", function (species) {
    return dgmnDB[species].attr;
  });
  _defineProperty(this, "isEnemy", function (dgmnId) {
    return dgmnId.charAt(0) === 'e';
  });
  _defineProperty(this, "checkLevelReq", function (level) {
    return 3 * level;
  });
  _defineProperty(this, "getAttack", function (species) {
    return dgmnDB[species].attack;
  });
  _defineProperty(this, "getAllBaseStats", function (speciesName) {
    return dgmnDB[speciesName].stats;
  });
  _defineProperty(this, "getBaseStat", function (speciesName, stat) {
    return dgmnDB[speciesName].stats[stat];
  });
  _defineProperty(this, "getBaseFP", function (speciesName) {
    return dgmnDB[speciesName].fields;
  });
  _defineProperty(this, "getEvolutions", function (speciesName) {
    return dgmnDB[speciesName].evolutions;
  });
  _defineProperty(this, "getEvoFP", function (speciesName) {
    return dgmnDB[speciesName].evoFields;
  });
  _defineProperty(this, "getHatchFP", function (species) {
    return dgmnDB[species].hatchFields;
  });
  _defineProperty(this, "buildInitialStats", function (species) {
    var stats = {
      HP: 10,
      ATK: 1,
      DEF: 1,
      INT: 1,
      RES: 1,
      HIT: 1,
      AVO: 1,
      SPD: 1
    };
    for (var stat in stats) {
      stats[stat] += _this.getAllBaseStats(species)[stat];
    }
    return stats;
  });
  _defineProperty(this, "checkEvolution", function (dgmnData) {
    var evolutions = dgmnDB[dgmnData.speciesName].evolutions;
    if (evolutions.length === 0) return false;
    var _iterator3 = _createForOfIteratorHelper(evolutions),
        _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var evo = _step3.value;
        var evoFP = _this.getEvoFP(evo);
        for (var FP in evoFP) {
          if (dgmnData.currentFP[FP] < evoFP[FP]) {
            return false;
          }
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return true;
  });
  _defineProperty(this, "canEvolveInto", function (dgmnFP, evoSpecies) {
    var evoFP = _this.getEvoFP(evoSpecies);
    for (var FP in evoFP) {
      if (dgmnFP[FP] < evoFP[FP]) {
        return false;
      }
    }
    return true;
  });
  _defineProperty(this, "canHatchInto", function (dgmnFP, hatchSpecies) {
    var hatchFP = _this.getHatchFP(hatchSpecies);
    for (var FP in hatchFP) {
      if (dgmnFP[FP] < hatchFP[FP]) {
        return false;
      }
    }
    return true;
  });
  _defineProperty(this, "getEggHatches", function (field) {
    return digiTamaDB[field];
  });
};

var Dgmn = function Dgmn(id, nickname, speciesName, eggField) {
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
    var speed = 1800 - Math.floor(_this.currentStats.SPD * 2) * 33;
    speed = speed <= 0 ? 33 : speed;
    _this.dgmnCanvas.animate(speed);
  });
  _defineProperty(this, "showFrame", function (frame) {
    _this.dgmnCanvas.showFrame(frame);
  });
  _defineProperty(this, "idle", function () {
    _this.dgmnCanvas.idle();
  });
  _defineProperty(this, "drawDgmnToCanvas", function (image) {
    _this.dgmnCanvas.paintImage(image);
  });
  _defineProperty(this, "heal", function (amount) {
    debugLog("  - Healing: ", amount);
    _this.currentHP += amount;
    _this.currentHP = _this.currentHP > _this.currentStats.HP ? _this.currentStats.HP : _this.currentHP;
  });
  _defineProperty(this, "hatchSetup", function () {
    _this.setInitialFP();
  });
  _defineProperty(this, "hatch", function (species) {
    _this.speciesName = species;
    _this.currentHP = _this.currentStats.HP;
    _this.currentStats = _this.dgmnUtility.buildInitialStats(_this.speciesName);
    _this.setInitialFP();
  });
  _defineProperty(this, "setInitialFP", function () {
    debugLog("  - Egg Field : ", _this.eggField);
    _this.currentFP[_this.eggField] = 1;
  });
  _defineProperty(this, "getDgmnAttackByName", function (attackName) {
    for (var i = 0; i < _this.attacks.length; i++) {
      if (_this.attacks[i].attackName === attackName) return i;
    }
    return -1;
  });
  _defineProperty(this, "reduceDgmnAttackCost", function (attackName) {
    var attack = _this.getDgmnAttackByName(attackName);
    _this.attacks[attack].currCost--;
    if (_this.attacks[attack].currCost < 0) ;
  });
  _defineProperty(this, "levelUpStats", function () {
    for (var stat in _this.currentStats) {
      var growth = _this.dgmnUtility.getBaseStat(_this.speciesName, stat);
      _this.currentStats[stat] += growth;
    }
    _this.heal(_this.dgmnUtility.getBaseStat(_this.speciesName, 'HP') + Math.floor(_this.currentStats.HP / 4));
  });
  _defineProperty(this, "levelUpFP", function () {
    var baseFP = _this.dgmnUtility.getBaseFP(_this.speciesName);
    for (var FP in baseFP) {
      _this.currentFP[FP] += baseFP[FP];
    }
  });
  _defineProperty(this, "learnAttack", function () {
    var newAttack = _this.dgmnUtility.getAttack(_this.speciesName);
    if (newAttack) _this.attacks.unshift(new Attack(newAttack));
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
  this.eggField = eggField || '';
  this.permFP = {
    DR: 0,
    NS: 0,
    WG: 0,
    ME: 0,
    DS: 0,
    JT: 0,
    VB: 0,
    NA: 0
  };
  this.permAttacks = [];
  this.currentLevel = 1;
  this.currentHP = 23;
  this.currentEN = 100;
  this.currentStats = {
    HP: 13,
    ATK: 0,
    DEF: 0,
    INT: 0,
    RES: 0,
    HIT: 0,
    AVO: 0,
    SPD: 0
  };
  this.currentFP = {
    DR: 0,
    NS: 0,
    WG: 0,
    ME: 0,
    DS: 0,
    JT: 0,
    VB: 0,
    NA: 0
  };
  this.currentXP = 0;
  this.combo = 0;
  this.weak = 0;
  this.attackList = ["bubbles", "babyFlame"];
  this.attacks = [new Attack('bubbles')];
  this.isDead = false;
  this.dgmnCanvas;
  this.dgmnUtility = new DgmnUtility();
}
;

({
  dId0: {
    currentLevel: 1,
    attacks: [new Attack('bubbles'), new Attack('babyFlame'), new Attack('magicalFire'), new Attack('darknessGear'), new Attack('petitFire'), new Attack('petitTwister'), new Attack('picoDarts')],
    currentStats: {
      HP: 10,
      ATK: 1,
      DEF: 1,
      INT: 1,
      RES: 1,
      HIT: 1,
      AVO: 1,
      SPD: 1
    }
  },
  dId1: {
    currentLevel: 10,
    attacks: [new Attack('bubbles'), new Attack('nutsShoot'), new Attack('picoDarts')],
    currentStats: {
      HP: 24,
      ATK: 10,
      DEF: 6,
      INT: 10,
      RES: 7,
      HIT: 6,
      AVO: 6,
      SPD: 6
    }
  },
  dId2: {
    currentLevel: 1,
    attacks: [new Attack('bubbles'), new Attack('darknessGear')],
    currentStats: {
      HP: 10,
      ATK: 1,
      DEF: 1,
      INT: 1,
      RES: 1,
      HIT: 1,
      AVO: 1,
      SPD: 1
    }
  }
});
({
  edId0: {
    speciesName: 'Yura',
    currentLevel: 3,
    currentStats: {
      HP: 16,
      ATK: 4,
      DEF: 1,
      INT: 4,
      RES: 4,
      HIT: 1,
      AVO: 1,
      SPD: 1
    },
    attacks: [new Attack('bubbles')]
  },
  edId1: {
    speciesName: 'Zuru',
    currentLevel: 3,
    currentStats: {
      HP: 16,
      ATK: 4,
      DEF: 1,
      INT: 4,
      RES: 1,
      HIT: 1,
      AVO: 4,
      SPD: 1
    },
    attacks: [new Attack('bubbles')]
  },
  edId2: {
    speciesName: 'Doki',
    currentLevel: 3,
    currentStats: {
      HP: 16,
      ATK: 4,
      DEF: 1,
      INT: 1,
      RES: 1,
      HIT: 1,
      AVO: 4,
      SPD: 4
    },
    attacks: [new Attack('bubbles')]
  }
});

var dgmnEncounterChartDB = {
  1: {
    DR: {
      pre10: 1,
      dgmnList: ['Bota']
    },
    NS: {
      pre10: 1,
      dgmnList: ['Doki']
    },
    DS: {
      pre10: 1,
      dgmnList: ['Pitch']
    },
    WG: {
      pre10: 1,
      dgmnList: ['Pururu']
    },
    JT: {
      pre10: 1,
      dgmnList: ['Yura']
    },
    ME: {
      pre10: 1,
      dgmnList: ['Choro']
    },
    VB: {
      pre10: 1,
      dgmnList: ['Yura']
    },
    NA: {
      pre10: 1,
      dgmnList: ['Zuru']
    }
  },
  2: {
    DR: {
      pre10: 1,
      dgmnList: ['Koro']
    }
  },
  3: {},
  4: {},
  5: {},
  6: {},
  7: {}
};
var dgmnEncounterFieldsDB = ['DR', 'NS', 'DS', 'WG', 'JT', 'ME', 'VB', 'NA'];
var dgmnEncounterDB = {
  Bota: {
    speciesName: 'Bota',
    currentLevel: 2,
    currentStats: {
      HP: 5,
      ATK: 2,
      DEF: 1,
      INT: 1,
      RES: 1,
      HIT: 2,
      AVO: 1,
      SPD: 1
    },
    attacks: [new Attack('bubbles')]
  },
  Yura: {
    speciesName: 'Yura',
    currentLevel: 2,
    currentStats: {
      HP: 5,
      ATK: 2,
      DEF: 1,
      INT: 2,
      RES: 2,
      HIT: 1,
      AVO: 1,
      SPD: 1
    },
    attacks: [new Attack('bubbles')]
  },
  Zuru: {
    speciesName: 'Zuru',
    currentLevel: 2,
    currentStats: {
      HP: 5,
      ATK: 2,
      DEF: 1,
      INT: 2,
      RES: 1,
      HIT: 1,
      AVO: 2,
      SPD: 1
    },
    attacks: [new Attack('bubbles')]
  },
  Doki: {
    speciesName: 'Doki',
    currentLevel: 2,
    currentStats: {
      HP: 5,
      ATK: 2,
      DEF: 1,
      INT: 1,
      RES: 1,
      HIT: 1,
      AVO: 2,
      SPD: 2
    },
    attacks: [new Attack('bubbles')]
  },
  Pururu: {
    speciesName: 'Pururu',
    currentLevel: 2,
    currentStats: {
      HP: 5,
      ATK: 2,
      DEF: 1,
      INT: 1,
      RES: 1,
      HIT: 2,
      AVO: 1,
      SPD: 2
    },
    attacks: [new Attack('bubbles')]
  },
  Choro: {
    speciesName: 'Choro',
    currentLevel: 2,
    currentStats: {
      HP: 5,
      ATK: 2,
      DEF: 2,
      INT: 1,
      RES: 2,
      HIT: 1,
      AVO: 1,
      SPD: 1
    },
    attacks: [new Attack('bubbles')]
  },
  Pitch: {
    speciesName: 'Pitch',
    currentLevel: 2,
    currentStats: {
      HP: 5,
      ATK: 1,
      DEF: 2,
      INT: 1,
      RES: 2,
      HIT: 1,
      AVO: 2,
      SPD: 1
    },
    attacks: [new Attack('bubbles')]
  },
  Koro: {
    speciesName: 'Koro',
    currentLevel: 3,
    currentStats: {
      HP: 8,
      ATK: 3,
      DEF: 2,
      INT: 2,
      RES: 2,
      HIT: 3,
      AVO: 2,
      SPD: 2
    },
    attacks: [new Attack('bubbles')]
  }
};

var EnemyGenerator = function EnemyGenerator(dgmnAH) {
  var _this = this;
  _classCallCheck(this, EnemyGenerator);
  _defineProperty(this, "generate", function (currFloor, maxFloor) {
    var enemies = {};
    console.log("Generating Enemies on Floor ", currFloor);
    for (var i = 0; i < 3; i++) {
      var stage = _this.calcDgmnStage(currFloor);
      var field = _this.calcDgmnField();
      var dgmnName = _this.calcDgmnName(stage, field);
      var dgmnData = dgmnEncounterDB[dgmnName];
      _this.dgmnAH.createDgmn(i, dgmnData, true);
    }
    return enemies;
  });
  _defineProperty(this, "calcDgmnStage", function (currFloor) {
    if (currFloor < 2) {
      return 1;
    }
    return 1;
  });
  _defineProperty(this, "calcDgmnField", function (mods) {
    var rando = Math.floor(Math.random() * 8);
    return rando;
  });
  _defineProperty(this, "calcDgmnName", function (stage, field) {
    var dgmnArray = dgmnEncounterChartDB[stage][dgmnEncounterFieldsDB[field]].dgmnList;
    var rando = Math.floor(Math.random() * dgmnEncounterChartDB[stage][dgmnEncounterFieldsDB[field]].pre10);
    var dgmn = dgmnArray[rando];
    return dgmn;
  });
  this.dgmnAH = dgmnAH;
};

var DgmnManager = function DgmnManager(systemAH) {
  var _this = this;
  _classCallCheck(this, DgmnManager);
  _defineProperty(this, "mockParty", function () {
    return ['dId0', 'dId1', 'dId2'];
  });
  _defineProperty(this, "createDgmn", function (index, data, isEnemy) {
    if (isEnemy) {
      _this.enemyDgmn["edId".concat(index)] = new Dgmn(index, "ENEMY", data.speciesName);
      _this.enemyDgmn["edId".concat(index)].isEnemy = true;
      _this.enemyDgmn["edId".concat(index)].currentStats = data.currentStats;
      _this.enemyDgmn["edId".concat(index)].currentHP = _this.enemyDgmn["edId".concat(index)].currentStats.HP;
      _this.enemyDgmn["edId".concat(index)].attacks = data.attacks;
    }
  });
  _defineProperty(this, "buildPartyEggs", function () {
    var _iterator = _createForOfIteratorHelper(_this.party),
        _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var dgmn = _step.value;
        _this.allDgmn[dgmn].hatchSetup();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
  _defineProperty(this, "hatchEgg", function (dgmnId, species) {
    _this.allDgmn[dgmnId].hatch(species);
  });
  _defineProperty(this, "isEnemy", function (dgmnId) {
    return dgmnId.charAt(0) === 'e';
  });
  _defineProperty(this, "generateEnemies", function (currFloor, maxFloor) {
    _this.enemyGenerator.generate(currFloor, maxFloor);
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
  _defineProperty(this, "getParty", function (dgmnId) {
    return _this.isEnemy(dgmnId) ? "enemyDgmn" : "allDgmn";
  });
  _defineProperty(this, "useAttack", function (dgmn, energyCost, attackName) {
    _this[_this.getParty(dgmn)][dgmn].reduceDgmnAttackCost(attackName);
    _this.reduceEnergy(dgmn, energyCost);
  });
  _defineProperty(this, "reduceEnergy", function (dgmn, amount) {
    _this[_this.getParty(dgmn)][dgmn].currentEN -= amount;
  });
  _defineProperty(this, "dealDMG", function (target, dmg) {
    var party = _this.getParty(target);
    _this[party][target].currentHP -= dmg;
    _this[party][target].currentHP = _this[party][target].currentHP < 0 ? 0 : _this[party][target].currentHP;
  });
  _defineProperty(this, "modifyCombo", function (target, comboDelta) {
    var party = _this.getParty(target);
    _this[party][target].combo += comboDelta;
    _this[party][target].combo = _this[party][target].combo < 0 ? 0 : _this[party][target].combo;
  });
  _defineProperty(this, "modifyWeak", function (target, weakDelta) {
    var party = _this.getParty(target);
    _this[party][target].weak += weakDelta;
    _this[party][target].weak = _this[party][target].weak > 3 ? 3 : _this[party][target].weak;
    _this[party][target].weak = _this[party][target].weak < 0 ? 0 : _this[party][target].weak;
  });
  _defineProperty(this, "checkKO", function (target) {
    var party = _this.getParty(target);
    if (!_this[party][target].isDead) {
      if (_this.isEnemy(target)) {
        if (_this[party][target].currentHP <= 0) {
          _this.showDgmnFrame(target, 'dead');
          _this[party][target].isDead = true;
          _this[party][target].currentHP = 0;
          _this[party][target].currentEN = 0;
          _this[party][target].combo = 0;
          _this[party][target].weak = 0;
          return true;
        }
      }
    }
    return false;
  });
  _defineProperty(this, "battleWrapUp", function (dgmnId) {
    var leveledUp = _this.checkLevelUp(dgmnId);
    return leveledUp;
  });
  _defineProperty(this, "giveDgmnReward", function (dgmnId, reward) {
    console.log(dgmnId + " is getting " + reward);
    reward === 'XP' ? _this.allDgmn[dgmnId].currentXP++ : _this.allDgmn[dgmnId].currentFP[reward]++;
  });
  _defineProperty(this, "giveDgmnXP", function (dgmnId, xp) {
    _this.allDgmn[dgmnId].currentXP += xp;
  });
  _defineProperty(this, "checkLevelUp", function (dgmnId) {
    if (_this.allDgmn[dgmnId].currentXP >= _this.dgmnUtility.checkLevelReq(_this.allDgmn[dgmnId].currentLevel)) {
      _this.levelUp(dgmnId);
      return true;
    }
    return false;
  });
  _defineProperty(this, "levelUp", function (dgmnId) {
    _this.allDgmn[dgmnId].currentXP = 0;
    _this.allDgmn[dgmnId].currentLevel++;
    _this.allDgmn[dgmnId].levelUpStats();
    _this.allDgmn[dgmnId].levelUpFP();
    debugLog(_this.allDgmn[dgmnId].nickname + " Leveled Up!");
    debugLog("  - New FP: ", _this.allDgmn[dgmnId].currentFP);
  });
  _defineProperty(this, "evolve", function (dgmnId, evoSpecies) {
    console.log(dgmnId + " is Evolving into " + evoSpecies);
    _this.allDgmn[dgmnId].speciesName = evoSpecies;
    _this.allDgmn[dgmnId].levelUpStats();
    _this.allDgmn[dgmnId].learnAttack();
  });
  _defineProperty(this, "buildStatGrowth", function (dgmnId, stat) {
    var baseGrowth = _this.dgmnUtility.getBaseStat(_this.allDgmn[dgmnId].speciesName, stat);
    return baseGrowth + 0;
  });
  _defineProperty(this, "checkAllDead", function (isEnemy) {
    var party = isEnemy ? _this.enemyDgmn : _this.party;
    for (var dgmn in party) {
      if (!party[dgmn].isDead) return false;
    }
    return true;
  });
  _defineProperty(this, "initDgmnCanvas", function (dgmnId, drawCB, imageList, battleLocation) {
    !_this.isEnemy(dgmnId) ? _this.allDgmn[dgmnId].initCanvas(drawCB, imageList, battleLocation) : _this.enemyDgmn[dgmnId].initCanvas(drawCB, imageList, battleLocation);
  });
  _defineProperty(this, "animateDgmn", function (dgmnId) {
    !_this.isEnemy(dgmnId) ? _this.allDgmn[dgmnId].startIdleAnimation() : _this.enemyDgmn[dgmnId].startIdleAnimation();
  });
  _defineProperty(this, "showDgmnFrame", function (dgmnId, frame) {
    var dgmnSpecies = _this.isEnemy(dgmnId) ? _this.enemyDgmn[dgmnId].speciesName.toLowerCase() : _this.allDgmn[dgmnId].speciesName.toLowerCase();
    var frameImage = frame === 'dead' ? _this.systemAH.fetchImage('dgmnDead') : _this.systemAH.fetchImage(dgmnSpecies + frame);
    _this.isEnemy(dgmnId) ? _this.enemyDgmn[dgmnId].showFrame(frameImage) : _this.allDgmn[dgmnId].showFrame(frameImage);
  });
  _defineProperty(this, "idleDgmn", function (dgmnId) {
    !_this.isEnemy(dgmnId) ? _this.allDgmn[dgmnId].idle() : _this.enemyDgmn[dgmnId].idle();
  });
  _defineProperty(this, "moveDgmnCanvas", function (dgmnId, newX, newY) {
    _this[_this.getParty(dgmnId)][dgmnId].dgmnCanvas.x = newX;
    _this[_this.getParty(dgmnId)][dgmnId].dgmnCanvas.y = newY;
  });
  _defineProperty(this, "stopDgmnCanvas", function (dgmnId) {
    _this[_this.getParty(dgmnId)][dgmnId].dgmnCanvas.stop();
  });
  _defineProperty(this, "getTempDgmn", function () {
    return _this.tempDgmn;
  });
  _defineProperty(this, "getCanvas", function (dgmnId) {
    return !_this.isEnemy(dgmnId) ? _this.allDgmn[dgmnId].dgmnCanvas : _this.enemyDgmn[dgmnId].dgmnCanvas;
  });
  _defineProperty(this, "getIsDead", function (dgmnId) {
    return _this.isEnemy(dgmnId) ? _this.enemyDgmn[dgmnId].isDead : _this.allDgmn[dgmnId].isDead;
  });
  this.allDgmn = {
    dId0: new Dgmn(0, "FLARE", "Bota", 'DR'),
    dId1: new Dgmn(1, "SPROUT", "Yura", 'JT'),
    dId2: new Dgmn(2, "GEAR", "Choro", 'ME')
  };
  this.dgmnAH = new DgmnAH({
    getDgmnDataCB: this.getDgmnData,
    getDgmnAttackDataCB: this.getDgmnAttackData,
    initDgmnCanvasCB: this.initDgmnCanvas,
    getCanvasCB: this.getCanvas,
    animateDgmnCB: this.animateDgmn,
    useAttackCB: this.useAttack,
    dealDMGCB: this.dealDMG,
    checkKOCB: this.checkKO,
    checkAllDeadCB: this.checkAllDead,
    createDgmnCB: this.createDgmn,
    generateEnemiesCB: this.generateEnemies,
    modifyComboCB: this.modifyCombo,
    modifyWeakCB: this.modifyWeak,
    showDgmnFrameCB: this.showDgmnFrame,
    idleDgmnCB: this.idleDgmn,
    getIsDeadCB: this.getIsDead,
    battleWrapUpCB: this.battleWrapUp,
    moveDgmnCanvasCB: this.moveDgmnCanvas,
    stopDgmnCanvasCB: this.stopDgmnCanvas,
    giveDgmnRewardCB: this.giveDgmnReward,
    giveDgmnXPCB: this.giveDgmnXP,
    checkLevelUpCB: this.checkLevelUp,
    buildStatGrowthCB: this.buildStatGrowth,
    getTempDgmnCB: this.getTempDgmn,
    evolveCB: this.evolve,
    hatchEggCB: this.hatchEgg
  });
  this.systemAH = systemAH;
  this.enemyGenerator = new EnemyGenerator(this.dgmnAH);
  this.enemyDgmn = {};
  this.party = this.mockParty();
  this.tempDgmn = new Dgmn(0, 'EVO', 'Bota');
  this.dgmnUtility = new DgmnUtility();
}
;

var DigiBeetleAH = function DigiBeetleAH(cbObj) {
  _classCallCheck(this, DigiBeetleAH);
  this.init = function () {
    return cbObj.initCB();
  };
  this.addItemToToolBox = function (item) {
    return cbObj.addItemToToolBoxCB(item);
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

var dungeonImages = ['Dungeon/startTile', 'Dungeon/endTile', 'Dungeon/enemyTile', 'Dungeon/treasureTile', 'Dungeon/treasureTileOpen', 'Menus/dungeonPauseOverlay'];
var digiBeetleImages = ['Dungeon/DigiBeetle/digiBeetleDown0', 'Dungeon/DigiBeetle/digiBeetleDown1', 'Dungeon/DigiBeetle/digiBeetleUp0', 'Dungeon/DigiBeetle/digiBeetleUp1', 'Dungeon/DigiBeetle/digiBeetleRight0', 'Dungeon/DigiBeetle/digiBeetleRight1', 'Dungeon/DigiBeetle/digiBeetleLeft0', 'Dungeon/DigiBeetle/digiBeetleLeft1'];
var genericImages = ['Menus/miniCursor', 'Menus/cursor', 'Menus/cursorLeft', 'Icons/targetAll', 'Icons/targetOne', 'Icons/comboFIcon', 'Icons/pwrFIcon', 'Icons/pwrEIcon', 'Icons/oneHitIcon', 'Icons/costMeter100', 'Icons/costMeter75', 'Icons/costMeter50', 'Icons/costMeter25', 'Icons/costMeter0', 'Menus/continueCursor', 'Battle/Menus/evoIconPositive', 'Battle/Menus/evoIconNegative', 'Battle/Menus/battleLevelUpOverlay', 'Battle/Menus/battleEvolutionOverlay', 'Battle/Menus/battleVictoryRewardsOverlay', 'Eggs/eggDR', 'Eggs/eggJT', 'Eggs/eggME', 'Menus/hatchingEggOverlay', 'Menus/textBox'];
var loadingImages = ['Loading/loading0', 'Loading/loading1', 'Loading/loading2', 'Loading/loading3', 'Loading/loading4', 'Loading/loading5', 'Loading/loading6', 'Loading/loading7', 'Loading/loading8', 'Loading/loading9', 'Loading/loading10'];
var fontImages$1 = ['Fonts/fontsBlack', 'Fonts/fontsWhite', 'Fonts/fontsLightGreen', 'Fonts/fontsDarkGreen'];
var typeIcons = ['Icons/Types/noneTypeIcon', 'Icons/Types/fireTypeIcon', 'Icons/Types/windTypeIcon', 'Icons/Types/plantTypeIcon', 'Icons/Types/elecTypeIcon', 'Icons/Types/evilTypeIcon', 'Icons/Types/metalTypeIcon'];
var fieldIcons = ['Icons/Fields/fieldDRIcon', 'Icons/Fields/fieldNSIcon', 'Icons/Fields/fieldWGIcon', 'Icons/Fields/fieldVBIcon', 'Icons/Fields/fieldMEIcon', 'Icons/Fields/fieldJTIcon', 'Icons/Fields/fieldNAIcon', 'Icons/Fields/fieldDSIcon'];
var battleImages = ['Attacks/blankAttack', 'Battle/battleBackground', 'Battle/Menus/attackDeselected', 'Battle/Menus/attackSelected', 'Battle/Menus/defendDeselected', 'Battle/Menus/defendSelected', 'Battle/Menus/statsDeselected', 'Battle/Menus/statsSelected', 'Icons/Battle/weak0', 'Icons/Battle/weak1', 'Icons/Battle/weak2', 'Icons/Battle/weak3', 'DGMN/dgmnDead', 'Battle/Menus/dgmnBarLightGreen', 'Battle/Menus/dgmnBarDarkGreen', 'Battle/Menus/battleOptionSelectBaseRight', 'Battle/Menus/battleVictoryOverlay', 'Icons/xpIconSmall', 'Icons/xpIconLarge'];

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
    _this.toolBox.items.push(item);
    debugLog("Toolbox : ", _this.toolBox.items);
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
  this.digiBeetleAH = new DigiBeetleAH({
    initCB: this.init,
    addItemToToolBoxCB: this.addItemToToolBox
  });
  this.dungeonAH;
  this.gameAH;
  this.systemAH;
  this.digiBeetleCanvas;
  this.toolBox = {
    version: 'dodo',
    items: []
  };
};

var BattleAH = function BattleAH(cbObj) {
  _classCallCheck(this, BattleAH);
  this.getBattleState = function () {
    return cbObj.getBattleStateCB();
  };
  this.drawBattleCanvas = function () {
    cbObj.drawBattleCanvasCB();
  };
  this.getDgmnDataByIndex = function (dgmnIndex, data, isEnemy) {
    return cbObj.getDgmnDataByIndexCB(dgmnIndex, data, isEnemy);
  };
  this.getDgmnAttackData = function (dgmnIndex, data) {
    return cbObj.getDgmnAttackDataCB(dgmnIndex, data);
  };
  this.addAction = function (dgmnIndex, isEnemy, actionData) {
    return cbObj.addActionCB(dgmnIndex, isEnemy, actionData);
  };
  this.beginCombat = function () {
    cbObj.beginCombatCB();
  };
  this.drawActionText = function (species, message) {
    cbObj.drawActionTextCB(species, message);
  };
  this.drawAllStatuses = function () {
    return cbObj.drawAllStatusesCB();
  };
  this.newTurn = function () {
    return cbObj.newTurnCB();
  };
  this.checkBattleCondition = function () {
    return cbObj.checkBattleConditionCB();
  };
  this.battleWin = function () {
    return cbObj.battleWinCB();
  };
  this.battleLose = function () {
    return cbObj.battleLoseCB();
  };
  this.addRewards = function (target) {
    return cbObj.addRewardsCB(target);
  };
  this.gotoRewards = function () {
    return cbObj.gotoRewardsCB();
  };
  this.giveCurrReward = function (dir) {
    return cbObj.giveCurrRewardCB(dir);
  };
  this.levelUpNext = function () {
    return cbObj.levelUpNextCB();
  };
  this.evolveCurrDgmn = function () {
    return cbObj.evolveCurrDgmnCB();
  };
};

var BattleUtility = function BattleUtility() {
  _classCallCheck(this, BattleUtility);
  _defineProperty(this, "getDefaultBattleImages", function () {
    return battleImages.concat(typeIcons).concat(fieldIcons);
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
    return Math.floor(curr / max * 10);
  });
  _defineProperty(this, "getRewards", function (species) {
    var rewards = [];
    for (var k in dgmnDB[species].fields) {
      var FP = dgmnDB[species].fields[k];
      if (FP > 0) {
        for (var i = 0; i < FP; i++) {
          rewards.push(k);
        }
      }
    }
    return rewards;
  });
  _defineProperty(this, "getXP", function (species) {
    return dgmnDB[species].stage;
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
    } else if (key === 'start') {
      _this.startKeyHandler();
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
  _defineProperty(this, "startKeyHandler", function (upDown) {});
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
      if (_this.battleAH.getBattleState() === 'battle') {
        if (_this.battleMenuAH.getCurrMenuType() === 'icon') {
          _this.battleMenuAH.selectIcon();
        } else if (_this.battleMenuAH.getCurrMenuType() === 'list') {
          _this.battleMenuAH.selectListItem();
        } else if (_this.battleMenuAH.getState() === 'victory') {
          _this.battleAH.gotoRewards();
        }
      } else if (_this.battleAH.getBattleState() === 'victory') {
        if (_this.battleMenuAH.getState() === 'level-next') {
          _this.battleAH.levelUpNext();
        } else if (_this.battleMenuAH.getState() === 'evolution-choice') {
          _this.battleAH.evolveCurrDgmn();
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "upKeyHandler", function (upDown) {
      if (upDown === 'down') {
        if (_this.battleAH.getBattleState() === 'battle') {
          if (_this.battleMenuAH.getCurrMenuType() === 'list') {
            _this.battleMenuAH.prevListItem();
          }
        } else if (_this.battleAH.getBattleState() === 'victory') {
          if (_this.battleMenuAH.getState() === 'rewards') _this.battleAH.giveCurrReward('up');
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "rightKeyHandler", function (upDown) {
      if (upDown === 'down') {
        if (_this.battleAH.getBattleState() === 'battle') {
          if (_this.battleMenuAH.getCurrMenuType() === 'icon') {
            _this.battleMenuAH.nextIcon();
          }
        } else if (_this.battleAH.getBattleState() === 'victory') {
          if (_this.battleMenuAH.getState() === 'rewards') _this.battleAH.giveCurrReward('right');
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "downKeyHandler", function (upDown) {
      if (upDown === 'down') {
        if (_this.battleAH.getBattleState() === 'battle') {
          if (_this.battleMenuAH.getCurrMenuType() === 'list') {
            _this.battleMenuAH.nextListItem();
          }
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "leftKeyHandler", function (upDown) {
      if (upDown === 'down') {
        if (_this.battleAH.getBattleState() === 'battle') {
          if (_this.battleMenuAH.getCurrMenuType() === 'icon') {
            _this.battleMenuAH.prevIcon();
          }
        } else if (_this.battleAH.getBattleState() === 'victory') {
          if (_this.battleMenuAH.getState() === 'rewards') _this.battleAH.giveCurrReward('left');
        }
      }
    });
    _this.battleAH = battleAH;
    _this.battleMenuAH;
    _this.victoryMenuAH;
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

var ContinueCursor = function ContinueCursor(cursorImg, parentCanvasCB, drawCB) {
  var _this = this;
  _classCallCheck(this, ContinueCursor);
  _defineProperty(this, "blink", function () {
    var count = 0;
    _this.blinkInterval = setInterval(function () {
      count++;
      if (count % 2 === 0) {
        _this.cursorCanvas.paintImage(_this.cursorImg, 0, 0);
      } else {
        _this.cursorCanvas.blackFill();
      }
      _this.paintToParent(_this.cursorCanvas);
      _this.drawCB();
    }, 500);
  });
  _defineProperty(this, "remove", function () {
    _this.cursorCanvas.blackFill();
    _this.paintToParent(_this.cursorCanvas);
    _this.drawCB();
    clearInterval(_this.blinkInterval);
  });
  this.cursorCanvas = new GameCanvas('cursor', 16, 16, 8 * 18, 8 * 16);
  this.cursorImg = cursorImg;
  this.paintToParent = function (canvas) {
    parentCanvasCB(canvas);
  };
  this.drawCB = function () {
    drawCB();
  };
  this.blinkInterval;
};

var Menu = function Menu(systemAH, gameAH, parentAH) {
  var _this = this;
  _classCallCheck(this, Menu);
  _defineProperty(this, "addSubMenu", function (label, menu) {
    _this.subMenus[label] = menu;
  });
  _defineProperty(this, "removeSubMenu", function (label) {
    delete _this.subMenus[label];
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
  _defineProperty(this, "drawContinueCursor", function (continueCursorImg, drawCB) {
    var _this$menuCanvas;
    _this.continueCursor = new ContinueCursor(continueCursorImg, (_this$menuCanvas = _this.menuCanvas) === null || _this$menuCanvas === void 0 ? void 0 : _this$menuCanvas.paintCanvas, drawCB);
    _this.continueCursor.blink();
  });
  this.currSubMenu;
  this.subMenus = {};
  this.systemAH = systemAH;
  this.gameAH = gameAH;
  this.parentAH = parentAH;
  this.menuUtility = new MenuUtility();
};

var SubMenu = function SubMenu(label) {
  _classCallCheck(this, SubMenu);
  this.label = label;
  this.isVisible = false;
  this.isActive = false;
  this.menuUtility = new MenuUtility();
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
    _this.coord = coord;
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
  _defineProperty(this, "timedText", function (ctx, message, drawCB) {
    var wordArray = message.split(" ");
    var word = 0;
    var _char = 0;
    var r = 0;
    var c = 0;
    var paintInterval = setInterval(function () {
      var charArray = _this.createCharArray(wordArray[word]);
      _this.drawChar(ctx, charArray[_char], c, r);
      drawCB();
      _char++;
      r = c + 1 >= _this.width ? r + 1 : r;
      c = c + 1 >= _this.width ? 0 : c + 1;
      if (_char >= charArray.length) {
        word++;
        _char = 0;
        if (c !== 0) {
          _this.drawChar(ctx, 'space', c, r);
          drawCB();
          c++;
          if (c >= _this.width) r = 0;
        }
        if (word < wordArray.length && wordArray[word].length + c > _this.width) {
          r++;
          c = 0;
        }
      }
      if (word >= wordArray.length) clearInterval(paintInterval);
    }, config.textSpeed * 33);
  });
  _defineProperty(this, "drawChar", function (ctx, _char2, col, row) {
    var coord = _this.getCharCoordinates(_char2);
    ctx.drawImage(_this.colorImages.white, coord[0] * 64, coord[1] * 64, 64, 64, (col + _this.x) * config.tileSize, (row + _this.y) * config.tileSize, config.tileSize, config.tileSize);
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
    modifiedMessage = modifiedMessage.replace(/\!/g, '#');
    modifiedMessage = modifiedMessage.replace(/\./g, '£');
    return modifiedMessage;
  });
  _defineProperty(this, "returnSpecialCharacters", function (charArray) {
    var modifiedCharArray = charArray;
    for (var i = 0; i < modifiedCharArray.length; i++) {
      var _char3 = modifiedCharArray[i];
      if (_char3 === "^") {
        modifiedCharArray[i] = "dotM";
      } else if (_char3 === " ") {
        modifiedCharArray[i] = "space";
      } else if (_char3 === "%") {
        modifiedCharArray[i] = "hp";
      } else if (_char3 === "$") {
        modifiedCharArray[i] = "en";
      } else if (_char3 === "@") {
        modifiedCharArray[i] = "lv";
      } else if (_char3 === "#") {
        modifiedCharArray[i] = "exclamation";
      } else if (_char3 === "£") {
        modifiedCharArray[i] = "period";
      }
    }
    return modifiedCharArray;
  });
  _defineProperty(this, "splitMessage", function (message) {
    return message.split("");
  });
  _defineProperty(this, "getCharCoordinates", function (_char4) {
    return fontData[_char4];
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
  this.colorizeCB = colorizeCB ? function (_char5, wholeString, index) {
    return colorizeCB(_char5, wholeString, index);
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
    _defineProperty(_assertThisInitialized(_this), "drawList", function () {
      warningLog("WARNING - SubMenu ".concat(_this.label, " is missing drawList Method"));
    });
    _defineProperty(_assertThisInitialized(_this), "buildList", function () {
      warningLog("WARNING - SubMenu ".concat(_this.label, " is missing buildList Method"));
    });
    _defineProperty(_assertThisInitialized(_this), "setMenuItem", function (dir) {
      warningLog("WARNING - SubMenu ".concat(_this.label, " is missing setMenuItem Method"));
    });
    _defineProperty(_assertThisInitialized(_this), "getCurrLabel", function () {
      return _this.listItems[_this.currIndex];
    });
    _defineProperty(_assertThisInitialized(_this), "drawBackImg", function () {
      if (_this.backImg) _this.menuCanvas.paintImage(_this.backImg, 0, 0);
    });
    _defineProperty(_assertThisInitialized(_this), "drawCursor", function (index) {
      var spotIndex = index ? index : _this.currIndex;
      _this.menuCanvas.paintImage(_this.cursorImg, 0, spotIndex % _this.itemAmount * (8 * _this.itemHeight) * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawMenu", function () {
      _this.drawBackImg();
      _this.drawList();
      _this.drawCursor();
    });
    _defineProperty(_assertThisInitialized(_this), "drawScrollBar", function () {
      var barMax = 8 * config.screenSize * _this.itemHeight * _this.itemAmount;
      var barHeight = barMax / Math.ceil(_this.listItems.length / _this.itemAmount);
      var barX = _this.menuCanvas.width - 8 * config.screenSize;
      var barY = barHeight * (Math.ceil((_this.currIndex + 1) / _this.itemAmount) - 1);
      barY = barY < 0 ? 0 : barY;
      _this.menuCanvas.ctx.fillStyle = "#6CA66C";
      _this.menuCanvas.ctx.fillRect(barX + 2 * config.screenSize, barY + 1 * config.screenSize, 5 * config.screenSize, barHeight - 3 * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "getYOffsetForIndex", function (listIndex) {
      return _this.itemHeight * listIndex * 8 * config.screenSize;
    });
    _defineProperty(_assertThisInitialized(_this), "nextListItem", function () {
      if (_this.currIndex < _this.listItems.length - 1) {
        if (_this.currIndex % _this.itemAmount === _this.itemAmount - 1 && _this.currIndex !== 0) _this.currPage++;
        _this.currIndex++;
        _this.drawMenu();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "prevListItem", function () {
      if (_this.currIndex > 0) {
        if (_this.currIndex % _this.itemAmount === 0) _this.currPage--;
        _this.currIndex--;
        _this.drawMenu();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "selectListItem", function () {
      _this.currIndex = 0;
      _this.isActive = false;
    });
    _this.listItems = listItems;
    _this.itemHeight = itemHeight;
    _this.itemAmount = itemAmount;
    _this.currIndex = 0;
    _this.currPage = 0;
    _this.backImg = backImg;
    _this.cursorImg = cursorImg;
    _this.menuCanvas = new GameCanvas("".concat(_this.label, "-menu"), listWidth * 8, itemAmount * (itemHeight * 8));
    _this.menuCanvas.x = coord[0] * 8 * config.screenSize;
    _this.menuCanvas.y = coord[1] * 8 * config.screenSize;
    _this.drawMenu();
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
    _defineProperty(_assertThisInitialized(_this), "drawList", function () {
      for (var i = 0; i < _this.itemAmount; i++) {
        var pageOffset = i + _this.currPage * _this.itemAmount;
        if (pageOffset >= _this.listItems.length) break;
        var attack = _this.listItems[pageOffset];
        attack.textArea = new TextArea(1, i * 2, 8, 1);
        attack.textArea.instantText(_this.menuCanvas.ctx, attack.displayName, "white");
        _this.drawCostMeter(i, attack.maxCost, attack.currCost);
        _this.drawTypeIcon(i, attack.type);
        _this.drawPowerIcon(i, attack.power);
        _this.drawTargetsIcon(i, attack.targets);
        _this.drawHitsIcon(i, attack.hits);
      }
      _this.drawScrollBar();
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
  this.selectIcon = function () {
    cbObj.selectIconCB();
  };
  this.getCurrMenuType = function () {
    return cbObj.getCurrMenuTypeCB();
  };
  this.nextListItem = function () {
    cbObj.nextListItemCB();
  };
  this.prevListItem = function () {
    cbObj.prevListItemCB();
  };
  this.selectListItem = function () {
    cbObj.selectListItemCB();
  };
  this.setTopMessage = function () {
    cbObj.setTopMessageCB();
  };
  this.getState = function () {
    return cbObj.getStateCB();
  };
  this.levelUpNext = function () {
    return cbObj.levelUpNextCB();
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
    _defineProperty(_assertThisInitialized(_this), "clearTopMessage", function () {
      _this.ctx.clearRect(0, 8 * config.screenSize, 160 * config.screenSize, 8 * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "setTopMessage", function (message) {
      _this.clearTopMessage();
      _this.topTxt.instantText(_this.ctx, message, 'white');
    });
    _defineProperty(_assertThisInitialized(_this), "clearBottomSection", function () {
      _this.ctx.clearRect(0, 14 * 8 * config.screenSize, 20 * 8 * config.screenSize, 4 * 8 * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawBottomSection", function (dgmnData) {
      _this.clearBottomSection();
      _this.drawNickname(_this.dgmnNicknameTxt, dgmnData.nickname);
      _this.dgmnSpeciesNameTxt.instantText(_this.ctx, dgmnData.speciesName + ".MON", "green");
      _this.dgmnHPTxt.instantText(_this.ctx, ".hp" + _this.menuUtility.prependZeros(dgmnData.currentHP, 3), "white");
      _this.dgmnENTxt.instantText(_this.ctx, ".en" + _this.menuUtility.prependZeros(dgmnData.currentEN, 3), "white");
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
    _this.continueCursor;
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

var TargetSelect = function (_ListMenu) {
  _inherits(TargetSelect, _ListMenu);
  var _super = _createSuper(TargetSelect);
  function TargetSelect(hitsAll, dgmnIsDeadCB, parentCTX) {
    var _this;
    _classCallCheck(this, TargetSelect);
    for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "drawMenu", function () {
      var startingIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      _this.menuCanvas.clearCanvas();
      if (_this.hitsAll) {
        _this.drawAllCursors(true);
      } else {
        _this.drawCursor(startingIndex);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "clearAllCursors", function (isEnemy) {
      if (isEnemy) {
        _this.parentCTX.clearRect(8 * 8 * config.screenSize, 2 * 8 * config.screenSize, 2 * 8 * config.screenSize, 12 * 8 * config.screenSize);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "drawAllCursors", function (isEnemy) {
      if (isEnemy) {
        _this.drawCursor(0);
        _this.drawCursor(1);
        _this.drawCursor(2);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "nextListItem", function () {
      if (_this.currIndex < _this.listItems.length - 1 && !_this.hitsAll) {
        if (!_this.isDgmnDead(_this.currIndex + 1)) {
          _this.clearAllCursors(true);
          _this.currIndex++;
          _this.drawMenu();
        } else if (_this.currIndex === 0 && _this.isDgmnDead(1) && !_this.isDgmnDead(2)) {
          _this.clearAllCursors(true);
          _this.currIndex = 2;
          _this.drawMenu();
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "prevListItem", function () {
      if (_this.currIndex > 0 && !_this.hitsAll) {
        if (!_this.isDgmnDead(_this.currIndex - 1)) {
          _this.clearAllCursors(true);
          _this.currIndex--;
          _this.drawMenu();
        } else if (_this.currIndex === 2 && _this.isDgmnDead(1) && !_this.isDgmnDead(0)) {
          _this.clearAllCursors(true);
          _this.currIndex = 0;
          _this.drawMenu();
        }
      }
    });
    _this.parentCTX = parentCTX;
    _this.isDgmnDead = function (index) {
      return dgmnIsDeadCB(index);
    };
    _this.hitsAll = hitsAll;
    return _this;
  }
  return TargetSelect;
}(ListMenu);

var MenuCanvas = function (_GameCanvas) {
  _inherits(MenuCanvas, _GameCanvas);
  var _super = _createSuper(MenuCanvas);
  function MenuCanvas() {
    var _this;
    _classCallCheck(this, MenuCanvas);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "clearTopMessage", function () {
      _this.ctx.clearRect(0, 8 * config.screenSize, 160 * config.screenSize, 8 * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "setTopMessage", function (message) {
      _this.clearTopMessage();
      _this.topTxt.instantText(_this.ctx, message, 'white');
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnPortrait", function (portraitImage, spcies) {});
    _this.topTxt = new TextArea(0, 1, 20);
    return _this;
  }
  return MenuCanvas;
}(GameCanvas);

var VictoryMenuAH = function VictoryMenuAH(cbObj) {
  _classCallCheck(this, VictoryMenuAH);
  this.getState = function () {
    return cbObj.getCurrStateCB();
  };
  this.getCurrMenuType = function () {
    return cbObj.getCurrMenuTypeCB();
  };
  this.nextIcon = function () {
    return cbObj.nextEvolutionCB();
  };
  this.prevIcon = function () {
    return cbObj.prevEvolutionCB();
  };
};

var RewardsMenu = function (_SubMenu) {
  _inherits(RewardsMenu, _SubMenu);
  var _super = _createSuper(RewardsMenu);
  function RewardsMenu() {
    var _this;
    _classCallCheck(this, RewardsMenu);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "drawRewardsList", function (rewards) {
      _this.menuCanvas.paintImage(_this.fetchImageCB("field".concat(rewards[_this.currIndex], "Icon")), 1 * config.tileSize, 2 * config.tileSize);
      for (var i = _this.currIndex + 1; i < rewards.length; i++) {
        var img = rewards[i] === 'XP' ? 'xpIconSmall' : "field".concat(rewards[i], "Icon");
        _this.menuCanvas.paintImage(_this.fetchImageCB(img), (2 + (i - _this.currIndex)) * config.tileSize, 2 * config.tileSize);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "updateRewardsList", function (rewards, onDoneCB) {
      var backImg = _this.fetchImageCB('battleVictoryRewardsOverlay');
      _this.currIndex++;
      if (_this.currIndex >= rewards.length) {
        _this.menuCanvas.paintImage(backImg, 0, 0);
        _this.redrawParentCB();
        onDoneCB();
      } else {
        _this.menuCanvas.paintImage(backImg, 0, 0);
        _this.drawRewardsList(rewards);
        _this.redrawParentCB();
      }
    });
    _this.fetchImageCB;
    _this.redrawParentCB;
    _this.currIndex = 0;
    _this.menuCanvas = new GameCanvas('rewards-menu', 160, 144);
    return _this;
  }
  return RewardsMenu;
}(SubMenu);

var LevelUpMenu = function (_SubMenu) {
  _inherits(LevelUpMenu, _SubMenu);
  var _super = _createSuper(LevelUpMenu);
  function LevelUpMenu() {
    var _this;
    _classCallCheck(this, LevelUpMenu);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "buildLevelUpScreen", function (dgmnData, redrawCB) {
      _this.drawDgmnCanvas(dgmnData.speciesName, redrawCB);
      for (var stat in dgmnData.currentStats) {
        var growth = _this.dgmnUtility.getBaseStat(dgmnData.speciesName, stat);
        _this.statTxtAreas[stat].original.instantText(_this.menuCanvas.ctx, _this.menuUtility.prependZeros(dgmnData.currentStats[stat], 3), 'white');
        _this.statTxtAreas[stat].plus.instantText(_this.menuCanvas.ctx, _this.menuUtility.prependZeros(growth, 2), 'green');
      }
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnCanvas", function (species, redrawCB) {
      _this.dgmnCanvas = new DgmnCanvas(function () {}, species, 'dgmn-canvas', 32, 32);
      _this.dgmnCanvas.x = 3 * config.tileSize;
      _this.dgmnCanvas.y = 8 * config.tileSize;
      _this.dgmnCanvas.frames = [_this.fetchImgCB("".concat(species.toLowerCase(), "Idle0")), _this.fetchImgCB("".concat(species.toLowerCase(), "Idle1"))];
      _this.dgmnCanvas.refreshScreen = function () {
        return _this.redrawDgmn(redrawCB);
      };
      _this.dgmnCanvas.animate(100);
    });
    _defineProperty(_assertThisInitialized(_this), "redrawDgmn", function (redrawCB) {
      _this.menuCanvas.ctx.fillStyle = "#00131A";
      _this.menuCanvas.ctx.fillRect(3 * config.tileSize, 8 * config.tileSize, 32 * config.screenSize, 32 * config.screenSize);
      _this.menuCanvas.paintCanvas(_this.dgmnCanvas);
      redrawCB();
    });
    _this.menuCanvas = new GameCanvas('level-up', 160, 144);
    _this.dgmnUtility = new DgmnUtility();
    _this.dgmnCanvas;
    _this.levelUpTxt = new TextArea(3, 5, 4, 1, _this.baseXPTxtColorize);
    _this.statTxtAreas = {
      HP: {
        original: new TextArea(13, 4, 3, 1, _this.baseXPTxtColorize),
        plus: new TextArea(17, 4, 2, 1, _this.baseXPTxtColorize)
      },
      ATK: {
        original: new TextArea(13, 5, 3, 1, _this.baseXPTxtColorize),
        plus: new TextArea(17, 5, 2, 1, _this.baseXPTxtColorize)
      },
      DEF: {
        original: new TextArea(13, 6, 3, 1, _this.baseXPTxtColorize),
        plus: new TextArea(17, 6, 2, 1, _this.baseXPTxtColorize)
      },
      INT: {
        original: new TextArea(13, 7, 3, 1, _this.baseXPTxtColorize),
        plus: new TextArea(17, 7, 2, 1, _this.baseXPTxtColorize)
      },
      RES: {
        original: new TextArea(13, 8, 3, 1, _this.baseXPTxtColorize),
        plus: new TextArea(17, 8, 2, 1, _this.baseXPTxtColorize)
      },
      HIT: {
        original: new TextArea(13, 9, 3, 1, _this.baseXPTxtColorize),
        plus: new TextArea(17, 9, 2, 1, _this.baseXPTxtColorize)
      },
      AVO: {
        original: new TextArea(13, 10, 3, 1, _this.baseXPTxtColorize),
        plus: new TextArea(17, 10, 2, 1, _this.baseXPTxtColorize)
      },
      SPD: {
        original: new TextArea(13, 11, 3, 1, _this.baseXPTxtColorize),
        plus: new TextArea(17, 11, 2, 1, _this.baseXPTxtColorize)
      }
    };
    return _this;
  }
  return LevelUpMenu;
}(SubMenu);

var EvolutionMenu = function (_IconMenu) {
  _inherits(EvolutionMenu, _IconMenu);
  var _super = _createSuper(EvolutionMenu);
  function EvolutionMenu() {
    var _this;
    _classCallCheck(this, EvolutionMenu);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "buildEvolutionScreen", function (dgmnData, redrawCB) {
      var evos = _this.dgmnUtility.getEvolutions(dgmnData.speciesName);
      _this.selectedDgmn = evos[0];
      _this.iconList = evos;
      _this.drawIcons(dgmnData.currentFP, evos, 0);
      _this.drawDgmnStats(_this.dgmnUtility.getAllBaseStats(_this.selectedDgmn));
      _this.drawEvoRequirements(evos[0]);
      _this.drawDgmnCanvas('dgmnCanvas', dgmnData.speciesName, redrawCB);
      _this.drawDgmnCanvas('evoCanvas', evos[0], redrawCB);
      _this.drawDgmnInfo(evos[0]);
      _this.redrawParentCB();
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnInfo", function (species) {
      _this.drawEvoPortrait(_this.fetchImgCB("".concat(species.toLowerCase(), "Portrait")));
      _this.evoNameTxt.instantText(_this.menuCanvas.ctx, "".concat(species, ".MON"), 'white');
      _this.evoAttributeTxt.instantText(_this.menuCanvas.ctx, _this.dgmnUtility.getAttribute(species), 'green');
      _this.evoWeakTxt.instantText(_this.menuCanvas.ctx, 'WEAK', 'green');
      _this.evoResTxt.instantText(_this.menuCanvas.ctx, 'RES', 'green');
      _this.menuCanvas.paintImage(_this.fetchImgCB("fieldDRIcon"), (5 + 4) * config.tileSize, 15 * config.tileSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnStats", function (stats) {
      for (var stat in stats) {
        _this.statTxtAreas[stat].instantText(_this.menuCanvas.ctx, _this.menuUtility.prependZeros(stats[stat], 2), 'white');
      }
    });
    _defineProperty(_assertThisInitialized(_this), "drawEvoRequirements", function (species) {
      var fpReqs = _this.dgmnUtility.getEvoFP(species);
      var i = 0;
      for (var req in fpReqs) {
        var img = _this.fetchImgCB("field".concat(req, "Icon"));
        _this.menuCanvas.paintImage(img, (1 + i) * config.tileSize, 10 * config.tileSize);
        _this.evoReqsTxt[i].instantText(_this.menuCanvas.ctx, _this.menuUtility.prependZeros(fpReqs[req], 3), 'white');
        i++;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "drawIcons", function (dgmnFP, evoList, selected) {
      var possibleEvos = [];
      var iconsOffset = [1 * config.tileSize, 13 * config.tileSize];
      for (var i = 0; i < evoList.length; i++) {
        var img = void 0;
        if (_this.dgmnUtility.canEvolveInto(dgmnFP, evoList[i])) {
          possibleEvos.push(evoList[i]);
          img = _this.fetchImgCB('evoIconPositive');
        } else {
          img = _this.fetchImgCB('evoIconNegative');
        }
        _this.menuCanvas.paintImage(img, iconsOffset[0] + i * config.tileSize, iconsOffset[1]);
      }
      _this.menuCanvas.ctx.fillStyle = "#C4CFA1";
      _this.menuCanvas.ctx.fillRect(iconsOffset[0] + selected * 8 + 3, iconsOffset[1] + 3, 5 * config.screenSize, 4 * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "chooseEvolution", function (dgmnData) {});
    _defineProperty(_assertThisInitialized(_this), "drawEvoPortrait", function (portraitImg) {
      _this.menuCanvas.ctx.drawImage(portraitImg, 0, 0, 256, 248, 0, 112 * config.screenSize, 32 * config.screenSize, (32 - 1) * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnCanvas", function (canvas, species, redrawCB) {
      var coord = canvas === 'dgmnCanvas' ? [1, 4] : [8, 4];
      _this[canvas] = new DgmnCanvas(function () {}, species, 'dgmn-canvas', 32, 32);
      _this[canvas].x = coord[0] * config.tileSize;
      _this[canvas].y = coord[1] * config.tileSize;
      _this[canvas].frames = [_this.fetchImgCB("".concat(species.toLowerCase(), "Idle0")), _this.fetchImgCB("".concat(species.toLowerCase(), "Idle1"))];
      _this[canvas].refreshScreen = function () {
        return _this.redrawDgmn(_this[canvas], coord, redrawCB);
      };
      _this[canvas].animate(100);
    });
    _defineProperty(_assertThisInitialized(_this), "redrawDgmn", function (canvas, coord, redrawCB) {
      _this.menuCanvas.ctx.fillStyle = "#00131A";
      _this.menuCanvas.ctx.fillRect(coord[0] * config.tileSize, coord[1] * config.tileSize, 32 * config.screenSize, 32 * config.screenSize);
      _this.menuCanvas.paintCanvas(canvas);
      redrawCB();
    });
    _this.dgmnUtility = new DgmnUtility();
    _this.dgmnCanvas;
    _this.evoCanvas;
    _this.menuCanvas = new GameCanvas("".concat(_this.label, "-menu"), 160, 144);
    _this.menuCanvas.x = 0;
    _this.menuCanvas.y = 0;
    _this.selectedDgmn = '';
    _this.statTxtAreas = {
      HP: new TextArea(17, 2, 3, 1, _this.baseXPTxtColorize),
      ATK: new TextArea(17, 3, 3, 1, _this.baseXPTxtColorize),
      DEF: new TextArea(17, 4, 3, 1, _this.baseXPTxtColorize),
      INT: new TextArea(17, 5, 3, 1, _this.baseXPTxtColorize),
      RES: new TextArea(17, 6, 3, 1, _this.baseXPTxtColorize),
      HIT: new TextArea(17, 7, 3, 1, _this.baseXPTxtColorize),
      AVO: new TextArea(17, 8, 3, 1, _this.baseXPTxtColorize),
      SPD: new TextArea(17, 9, 3, 1, _this.baseXPTxtColorize)
    };
    _this.evoReqsTxt = [new TextArea(2, 10, 3, 1, _this.baseXPTxtColorize), new TextArea(6, 10, 3, 1, _this.baseXPTxtColorize), new TextArea(2, 11, 3, 1, _this.baseXPTxtColorize), new TextArea(6, 11, 3, 1, _this.baseXPTxtColorize)];
    _this.evoNameTxt = new TextArea(4, 14, 12, 1, _this.baseXPTxtColorize);
    _this.evoAttributeTxt = new TextArea(4, 15, 7, 1, _this.baseXPTxtColorize);
    _this.evoWeakTxt = new TextArea(4, 16, 4, 1, _this.baseXPTxtColorize);
    _this.evoResTxt = new TextArea(12, 16, 3, 1, _this.baseXPTxtColorize);
    _this.fetchImgCB;
    _this.redrawParentCB;
    return _this;
  }
  return EvolutionMenu;
}(IconMenu);

var VictoryMenu = function (_Menu) {
  _inherits(VictoryMenu, _Menu);
  var _super = _createSuper(VictoryMenu);
  function VictoryMenu(battleXP, battleRewards) {
    var _this;
    _classCallCheck(this, VictoryMenu);
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "gotoRewards", function (rewards) {
      _this.currState = 'loading';
      _this.menuCanvas.paintImage(_this.systemAH.fetchImage('battleVictoryRewardsOverlay'), 0, 0);
      _this.actionTxt.timedText(_this.menuCanvas.ctx, 'Choose DGMN to get Rewards!', _this.drawMenu);
      _this.addSubMenu('rewards', new RewardsMenu('rewards'));
      _this.subMenus.rewards.isVisible = true;
      _this.subMenus.rewards.isActive = true;
      _this.subMenus.rewards.fetchImageCB = function (img) {
        return _this.systemAH.fetchImage(img);
      };
      _this.subMenus.rewards.redrawParentCB = function () {
        _this.drawMenu();
      };
      _this.subMenus.rewards.drawRewardsList(rewards);
      setTimeout(function () {
        _this.currState = 'rewards';
      }, 1500);
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "gotoLevelUp", function () {
      _this.currState = 'level';
      _this.menuCanvas.paintImage(_this.systemAH.fetchImage('battleLevelUpOverlay'), 0, 0);
      _this.menuCanvas.clearBottomSection();
      debugLog('Leveling Up : ', _this.levelUpDgmn);
      var dgmn = _this.levelUpDgmn[_this.levelUpIndex];
      _this.actionTxt.timedText(_this.menuCanvas.ctx, "".concat(dgmn.nickname, " Leveled Up!"), _this.drawMenu);
      _this.drawDgmnPortrait(_this.systemAH.fetchImage(dgmn.speciesName.toLowerCase() + 'Portrait'));
      _this.addSubMenu('level', new LevelUpMenu('level'));
      _this.subMenus.level.isVisible = true;
      _this.subMenus.level.isActive = true;
      _this.subMenus.level.fetchImgCB = function (img) {
        return _this.systemAH.fetchImage(img);
      };
      _this.subMenus.level.buildLevelUpScreen(dgmn, _this.parentAH.drawBattleCanvas);
      setTimeout(function () {
        _this.drawContinueCursor(_this.systemAH.fetchImage('continueCursor'), _this.drawMenu);
        _this.currState = 'level-next';
      }, 1000);
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "gotoNextLevelUp", function () {
      _this.levelUpIndex++;
      _this.gotoLevelUp();
    });
    _defineProperty(_assertThisInitialized(_this), "setLevelUpList", function (dgmnDataList) {
      var _iterator = _createForOfIteratorHelper(dgmnDataList),
          _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var dgmn = _step.value;
          _this.levelUpDgmn.push(dgmn);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "gotoEvolution", function (dgmnData) {
      _this.continueCursor.remove();
      _this.currState = 'evolution';
      _this.menuCanvas.paintImage(_this.systemAH.fetchImage('battleEvolutionOverlay'), 0, 0);
      _this.menuCanvas.clearBottomSection();
      _this.removeSubMenu('level');
      _this.addSubMenu('evolution', new EvolutionMenu([1, 13], [], 'evolution'));
      _this.subMenus.evolution.isVisible = true;
      _this.subMenus.evolution.isActive = true;
      _this.subMenus.evolution.fetchImgCB = function (img) {
        return _this.systemAH.fetchImage(img);
      };
      _this.subMenus.evolution.redrawParentCB = function () {
        _this.drawMenu();
      };
      _this.subMenus.evolution.buildEvolutionScreen(dgmnData, _this.parentAH.drawBattleCanvas);
      setTimeout(function () {
        _this.drawContinueCursor(_this.systemAH.fetchImage('continueCursor'), _this.drawMenu);
        _this.currState = 'evolution-choice';
      }, 1000);
    });
    _defineProperty(_assertThisInitialized(_this), "nextEvolution", function () {
      console.log("NEXT ICON");
    });
    _defineProperty(_assertThisInitialized(_this), "prevEvolution", function () {
      console.log("PREV ICON");
    });
    _defineProperty(_assertThisInitialized(_this), "selectIcon", function () {
      _this.subMenus.evolution.chooseEvolution(_this.levelUpDgmn[_this.levelUpIndex]);
    });
    _defineProperty(_assertThisInitialized(_this), "drawMenu", function () {
      for (var key in _this.subMenus) {
        if (_this.subMenus[key].isVisible) {
          _this.menuCanvas.paintCanvas(_this.subMenus[key].menuCanvas);
        }
      }
      _this.parentAH.drawBattleCanvas();
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnPortrait", function (portraitImg) {
      _this.menuCanvas.ctx.drawImage(portraitImg, 0, 0, 256, 248, 0, 112 * config.screenSize, 32 * config.screenSize, (32 - 1) * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "updateRewardsList", function (rewards, onDone) {
      _this.subMenus.rewards.updateRewardsList(rewards, onDone);
    });
    _defineProperty(_assertThisInitialized(_this), "getCurrState", function () {
      return _this.currState;
    });
    _defineProperty(_assertThisInitialized(_this), "getCurrMenuType", function () {
      return 'icon';
    });
    _this.currState = '';
    _this.actionTxt = new TextArea(4, 14, 16, 4);
    _this.battleRewards = battleRewards;
    _this.battleXP = battleXP;
    _this.currRewardIndex = 0;
    _this.levelUpIndex = 0;
    _this.levelUpDgmn = [];
    _this.victoryMenuAH = new VictoryMenuAH({
      getCurrStateCB: _this.getCurrState,
      getCurrMenuTypeCB: _this.getCurrMenuType,
      nextEvolutionCB: _this.nextEvolution,
      prevEvolutionCB: _this.prevEvolution
    });
    _this.menuUtility = new MenuUtility();
    _this.dgmnUtility = new DgmnUtility();
    _this.menuCanvas = new MenuCanvas('victory', 160, 144);
    return _this;
  }
  return VictoryMenu;
}(Menu);

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
      _this.newTurn();
    });
    _defineProperty(_assertThisInitialized(_this), "buildDgmnMenu", function () {
      _this.addSubMenu('dgmn', new IconMenu([14, 16], ['attack', 'defend', 'stats'], 'dgmn'));
      _this.subMenus.dgmn.isVisible = true;
      _this.subMenus.dgmn.images = _this.buildIconImages(_this.subMenus.dgmn.iconList);
      _this.subMenus.dgmn.drawIcons(0);
    });
    _defineProperty(_assertThisInitialized(_this), "newTurn", function () {
      _this.menuCanvas.setTopMessage("Attack");
      _this.currDgmnIndex = 0;
      _this.setCurrentDgmn(_this.currDgmnIndex);
      _this.buildDgmnMenu();
      _this.currSubMenu = 'dgmn';
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "buildAttackMenu", function () {
      var currDgmnAttackData = _this.battleAH.getDgmnAttackData(_this.currDgmnIndex, ['displayName', 'currCost', 'maxCost', 'type', 'power', 'hits', 'targets']);
      debugLog("++ Build Attack List | Data = ", currDgmnAttackData);
      _this.addSubMenu('attack', new AttackMenu(_this.systemAH.fetchImage, [4, 2], 6, 16, 2, currDgmnAttackData, _this.systemAH.fetchImage('miniCursor'), _this.systemAH.fetchImage('battleOptionSelectBaseRight'), 'attack'));
      _this.subMenus.attack.drawList();
    });
    _defineProperty(_assertThisInitialized(_this), "buildTargetSelect", function () {
      debugLog("++ Selecting Target...");
      var hitsAll = _this.currAttackAction.targets === 'all';
      _this.addSubMenu('target', new TargetSelect(hitsAll, function (index) {
        return _this.battleAH.getDgmnDataByIndex(index, ['isDead'], true).isDead;
      }, _this.menuCanvas.ctx, [8, 2], 3, 3, 4, ['one', 'two', 'three'], _this.systemAH.fetchImage('cursorLeft'), null, 'target'));
      _this.subMenus.target.currIndex = _this.getStartingTarget();
      _this.subMenus.target.drawMenu(_this.getStartingTarget());
    });
    _defineProperty(_assertThisInitialized(_this), "getStartingTarget", function () {
      var start = 0;
      if (_this.battleAH.getDgmnDataByIndex(0, ['isDead'], true).isDead) {
        if (_this.battleAH.getDgmnDataByIndex(1, ['isDead'], true).isDead) {
          start = 2;
        } else {
          start = 1;
        }
      }
      return start;
    });
    _defineProperty(_assertThisInitialized(_this), "setCurrentDgmn", function (battleIndex) {
      _this.menuCanvas.ctx.clearRect(10 * config.tileSize, 2 * config.tileSize, 2 * config.tileSize, 12 * config.tileSize);
      _this.menuCanvas.paintCurrentCursor(battleIndex, _this.systemAH.fetchImage('cursor'));
      var dgmnData = _this.battleAH.getDgmnDataByIndex(_this.currDgmnIndex, ['speciesName', 'nickname', 'currentHP', 'currentEN', 'currentLevel']);
      dgmnData.portrait = _this.systemAH.fetchImage("".concat(dgmnData.speciesName.toLowerCase(), "Portrait"));
      _this.menuCanvas.drawBottomSection(dgmnData);
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "launchAttackList", function () {
      _this.buildAttackMenu();
      _this.currSubMenu = 'attack';
      _this.subMenus[_this.currSubMenu].isVisible = true;
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "drawActionText", function (species, message) {
      _this.menuCanvas.clearBottomSection();
      _this.menuCanvas.drawDgmnPortrait(_this.systemAH.fetchImage(species.toLowerCase() + 'Portrait'));
      _this.actionTxt.timedText(_this.menuCanvas.ctx, message, _this.drawMenu);
    });
    _defineProperty(_assertThisInitialized(_this), "launchTargetSelect", function () {
      _this.buildTargetSelect();
      if (_this.currSubMenu === 'attack') {
        _this.menuCanvas.ctx.clearRect(32 * config.screenSize, 16 * config.screenSize, 128 * config.screenSize, 96 * config.screenSize);
      }
      _this.removeSubMenu(_this.currSubMenu);
      _this.currSubMenu = 'target';
      _this.subMenus[_this.currSubMenu].isVisible = true;
      _this.menuCanvas.paintCurrentCursor(_this.currDgmnIndex, _this.systemAH.fetchImage('cursor'));
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "getCurrMenuType", function () {
      if (_this.currSubMenu === null) return null;
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
      } else if (selected === 'defend') {
        _this.battleAH.addAction(_this.currDgmnIndex, false, {
          isDefend: true
        });
        _this.gotoNextChoice();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "nextListItem", function () {
      _this.subMenus[_this.currSubMenu].nextListItem();
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "prevListItem", function () {
      _this.subMenus[_this.currSubMenu].prevListItem();
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "selectListItem", function () {
      var currSubMenuLabel = _this.subMenus[_this.currSubMenu].label;
      if (currSubMenuLabel === 'attack') {
        _this.setCurrentAttack();
        _this.launchTargetSelect();
      } else if (currSubMenuLabel === 'target') {
        var targets = _this.subMenus.target.hitsAll ? [0, 1, 2] : [_this.subMenus.target.currIndex];
        _this.subMenus.target.clearAllCursors(true);
        _this.setCurrentTargets(targets);
        _this.drawMenu();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "setCurrentAttack", function () {
      var attackData = _this.subMenus.attack.listItems[_this.subMenus.attack.currIndex];
      _this.currAttackAction.attackName = attackData.attackName;
      _this.currAttackAction.hits = attackData.hits;
      _this.currAttackAction.targets = attackData.targets;
      _this.currAttackAction.power = attackData.power;
      _this.currAttackAction.type = attackData.type;
    });
    _defineProperty(_assertThisInitialized(_this), "setCurrentTargets", function (targets) {
      _this.removeSubMenu(_this.currSubMenu);
      debugLog("++ Action = ", _this.currAttackAction);
      var tempAction = {};
      for (var key in _this.currAttackAction) {
        tempAction[key] = _this.currAttackAction[key];
      }
      tempAction.attacker = _this.currDgmnIndex;
      tempAction.targetIndex = targets;
      _this.battleAH.addAction(_this.currDgmnIndex, false, tempAction);
      _this.gotoNextChoice();
    });
    _defineProperty(_assertThisInitialized(_this), "gotoNextChoice", function () {
      debugLog("+ Next Dgmn...");
      _this.currDgmnIndex++;
      if (_this.currDgmnIndex < 3) {
        _this.setCurrentDgmn(_this.currDgmnIndex);
        if (_this.currSubMenu !== 'dgmn') {
          _this.buildDgmnMenu();
          _this.currSubMenu = 'dgmn';
        } else {
          _this.subMenus.dgmn.drawIcons(0);
          _this.drawMenu();
        }
      } else {
        _this.beginCombat();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "beginCombat", function () {
      debugLog("+ BEGIN COMBAT!");
      _this.menuCanvas.ctx.clearRect(10 * config.tileSize, 2 * config.tileSize, 2 * config.tileSize, 12 * config.tileSize);
      _this.menuCanvas.clearTopMessage();
      _this.menuCanvas.clearBottomSection();
      _this.removeSubMenu(_this.currSubMenu);
      _this.removeSubMenu('dgmn');
      _this.currSubMenu = null;
      _this.battleAH.beginCombat();
    });
    _defineProperty(_assertThisInitialized(_this), "onVictoryDisplay", function () {
      _this.currState = 'victory';
      _this.drawContinueCursor(_this.systemAH.fetchImage('continueCursor'), _this.drawMenu);
    });
    _defineProperty(_assertThisInitialized(_this), "gotoRewards", function (rewards) {
      _this.currState = 'rewards';
      _this.menuCanvas.continueCursor.remove();
      _this.menuCanvas.clearBottomSection();
      _this.actionTxt.timedText(_this.menuCanvas.ctx, 'Assign Rewards to your DGMN!', _this.drawMenu);
      _this.victoryMenu.gotoRewardsScreen(rewards, _this.systemAH.fetchImage);
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "gotoLevelUp", function (levelUps) {
      _this.currState = 'levelUp';
      _this.levelUps = levelUps;
      _this.menuCanvas.clearBottomSection();
      _this.actionTxt.x = 5;
      _this.actionTxt.timedText(_this.menuCanvas.ctx, "".concat(levelUps[0].nickname, " leveled up!"), _this.drawMenu);
      _this.victoryMenu.gotoLevelUpScreen(levelUps, _this.systemAH.fetchImage, _this.menuCanvas.drawDgmnPortrait);
      _this.drawMenu();
      setTimeout(function () {
        _this.drawContinueCursor(_this.systemAH.fetchImage('continueCursor'), _this.drawMenu);
        _this.currState = 'levelUp-next';
      });
    });
    _defineProperty(_assertThisInitialized(_this), "gotoEvolution", function (dgmnData) {
      console.log("Evolving ", dgmnData.dgmnId);
      _this.victoryMenu.gotoEvolution(dgmnData, _this.systemAH.fetchImage);
    });
    _defineProperty(_assertThisInitialized(_this), "levelUpNext", function () {
      _this.currState = 'levelUp';
      _this.victoryMenu.levelUpNext();
      _this.menuCanvas.continueCursor.remove();
    });
    _defineProperty(_assertThisInitialized(_this), "endBattle", function (rewards, baseXP) {
      _this.menuCanvas.clearBottomSection();
      _this.menuCanvas.paintImage(_this.systemAH.fetchImage('battleVictoryOverlay'), 0, 0);
      _this.drawBaseXP(baseXP);
      _this.drawVictoryRewards(rewards, _this.onVictoryDisplay);
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "drawVictoryMessage", function () {
      _this.actionTxt.x = 2;
      _this.actionTxt.y = 15;
      _this.actionTxt.timedText(_this.menuCanvas.ctx, 'You won!', _this.drawMenu);
    });
    _defineProperty(_assertThisInitialized(_this), "drawVictoryRewards", function (rewards, callback) {
      var i = 0;
      var rewardInterval = setInterval(function () {
        var image = rewards[i] === 'XP' ? 'xpIconSmall' : "field".concat(rewards[i], "Icon");
        _this.menuCanvas.paintImage(_this.systemAH.fetchImage(image), (2 + i) * config.tileSize, 5 * config.tileSize);
        if (i >= rewards.length - 1) {
          clearInterval(rewardInterval);
          setTimeout(function () {
            callback();
          }, 500);
        }
        i++;
      }, 66);
    });
    _defineProperty(_assertThisInitialized(_this), "drawBaseXP", function (xpTotal) {
      var baseXPTxt = new TextArea(6, 11, 3, 1, function (_char, wholeString, index) {
        return _this.baseXPTxtColorize(_char, wholeString, index);
      });
      baseXPTxt.instantText(_this.menuCanvas.ctx, _this.menuUtility.prependZeros(xpTotal, 3), 'white');
    });
    _defineProperty(_assertThisInitialized(_this), "getState", function () {
      return _this.currState;
    });
    _defineProperty(_assertThisInitialized(_this), "drawMenu", function () {
      for (var key in _this.subMenus) {
        if (_this.subMenus[key].isVisible) {
          _this.menuCanvas.paintCanvas(_this.subMenus[key].menuCanvas);
        }
      }
      _this.battleAH.drawBattleCanvas();
    });
    _defineProperty(_assertThisInitialized(_this), "baseXPTxtColorize", function (_char2, wholeString, index) {
      var color = 'none';
      if (index === 0 && _char2 === 0) {
        color = 'darkGreen';
      } else if (index === 1 && _char2 === 0 && wholeString[0] === 0) {
        color = 'darkGreen';
      }
      return color;
    });
    _this.battleAH = _this.parentAH;
    _this.menuCanvas = new BattleMenuCanvas('battle-menu-canvas', 160, 144);
    _this.actionTxt = new TextArea(4, 14, 16, 4);
    _this.currDgmnIndex = 0;
    _this.currAttackAction = {};
    _this.currState = 'default';
    _this.battleMenuAH = new BattleMenuAH({
      nextIconCB: _this.nextIcon,
      prevIconCB: _this.prevIcon,
      getCurrMenuTypeCB: _this.getCurrMenuType,
      selectIconCB: _this.selectIcon,
      nextListItemCB: _this.nextListItem,
      prevListItemCB: _this.prevListItem,
      selectListItemCB: _this.selectListItem,
      setTopMessageCB: function setTopMessageCB(message) {
        _this.menuCanvas.setTopMessage(message);
      },
      getStateCB: _this.getState,
      levelUpNextCB: _this.levelUpNext
    });
    return _this;
  }
  return BattleMenu;
}(Menu);

var AttackCanvas = function (_GameCanvas) {
  _inherits(AttackCanvas, _GameCanvas);
  var _super = _createSuper(AttackCanvas);
  function AttackCanvas(drawCB) {
    var _this;
    _classCallCheck(this, AttackCanvas);
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "animateAttack", function (targetSpot, isTargetEnemy, images, callback) {
      if (!isTargetEnemy) _this.flip();
      var targets = targetSpot === 'all' ? [0, 1, 2] : [targetSpot];
      var i = 1;
      var f = 0;
      var t = 0;
      _this.paintAttackFrame(targetSpot, images[0].img);
      var animationInterval = setInterval(function () {
        f++;
        if (f > images[i].frameCount) {
          _this.paintAttackFrame(targets[t], images[i].img);
          i++;
          f = 0;
        }
        if (i >= images.length) {
          if (t === targets.length - 1) {
            if (!isTargetEnemy) _this.flip();
            clearInterval(animationInterval);
            callback();
          } else {
            t++;
            f = 0;
            i = 0;
          }
        }
      }, 66);
    });
    _defineProperty(_assertThisInitialized(_this), "paintAttackFrame", function (targetIndex, frame) {
      _this.clearCanvas();
      _this.paintImage(frame, 0, 4 * targetIndex * config.tileSize);
      _this.drawCB();
    });
    _this.drawCB = function () {
      return drawCB();
    };
    return _this;
  }
  return AttackCanvas;
}(GameCanvas);

var AttackManager = function AttackManager() {
  var _this = this;
  _classCallCheck(this, AttackManager);
  _defineProperty(this, "initAH", function (systemAH, battleAH, dgmnAH) {
    _this.systemAH = systemAH;
    _this.battleAH = battleAH;
    _this.dgmnAH = dgmnAH;
    _this.attackCanvas = new AttackCanvas(_this.battleAH.drawBattleCanvas, 'attack', 96, 96, 32, 16);
  });
  _defineProperty(this, "addAction", function (dgmnId, actionData) {
    _this.attackActions[dgmnId] = actionData;
    _this.attackActions[dgmnId].status = 'pending';
    if (!actionData.isDefend) {
      _this.attackActions[dgmnId].targetIndex = _this.attackActions[dgmnId].targetIndex.length === 1 ? _this.attackActions[dgmnId].targetIndex[0] : 'all';
    }
  });
  _defineProperty(this, "removeAction", function (dgmnId) {
    _this.attackActions[dgmnId] = {};
  });
  _defineProperty(this, "attackLoop", function (turnOrder) {
    debugLog("Attack Loop...");
    var i = 0;
    var attackInterval = setInterval(function () {
      var attacker = turnOrder[i];
      var action = _this.attackActions[attacker];
      if (action && (action.isDefend || action.targets.length === 1 && !_this.dgmnAH.getIsDead(action.targets[0]) || action.targets.length !== 1) &&
      !_this.dgmnAH.getIsDead(attacker)) {
        if (action.status === 'pending') {
          _this.takeAction(attacker, action);
        } else if (action.status === 'done') {
          i++;
        }
      } else {
        debugLog("No Action for " + attacker);
        i++;
      }
      if (_this.battleAH.checkBattleCondition() !== 'ongoing' || i >= turnOrder.length) {
        clearInterval(attackInterval);
        setTimeout(function () {
          if (_this.battleAH.checkBattleCondition() === 'win') {
            _this.battleAH.battleWin();
          } else if (_this.battleAH.checkBattleCondition() === 'lose') {
            _this.battleAH.battleLose();
          } else {
            _this.battleAH.newTurn();
          }
        }, 2000);
      }
    }, 1000);
  });
  _defineProperty(this, "buildAttackImageList", function (attackName) {
    var images = [];
    for (var i = 0; i < attacksDB[attackName].animationFrameCount; i++) {
      images.push("Attacks/" + attackName + "" + (i + 1));
    }
    return images;
  });
  _defineProperty(this, "triggerAnimation", function (attacker, attackName, targets) {
    var images = _this.buildAttackImageList(attackName);
    var loadedImages = [];
    _this.systemAH.loadImages(images, function () {
      var frames = attacksDB[attackName].animationFrames;
      for (var i = 0; i < frames.length; i++) {
        loadedImages.push({
          img: _this.systemAH.fetchImage(frames[i][0]),
          frameCount: frames[i][1]
        });
      }
      _this.attackCanvas.animateAttack(_this.attackActions[attacker].targetIndex, !_this.dgmnUtility.isEnemy(attacker), loadedImages, function () {
        _this.animationDone(attacker, targets);
      });
    });
  });
  _defineProperty(this, "animationDone", function (attacker, targets) {
    var targetData;
    _this.dgmnAH.idleDgmn(attacker);
    var _iterator = _createForOfIteratorHelper(targets),
        _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _target = _step.value;
        if (!_this.dgmnAH.getIsDead(_target)) _this.dgmnAH.idleDgmn(_target);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (_this.attackActions[attacker].targetIndex === 'all') {
      var _iterator2 = _createForOfIteratorHelper(_this.attackActions[attacker].targets),
          _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var target = _step2.value;
          if (_this.dgmnAH.checkKO(target)) {
            targetData = _this.dgmnAH.getDgmnData(target, ['speciesName', 'stage'], true);
            _this.battleAH.addRewards(targetData.speciesName);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    } else {
      if (_this.dgmnAH.checkKO(_this.attackActions[attacker].targets[0])) {
        targetData = _this.dgmnAH.getDgmnData(_this.attackActions[attacker].targets[0], ['speciesName', 'stage'], true);
        _this.battleAH.addRewards(targetData.speciesName);
      }
    }
    _this.battleAH.drawAllStatuses();
    _this.attackCanvas.clearCanvas();
    setTimeout(function () {
      _this.attackActions[attacker].status = 'done';
    }, 500);
  });
  _defineProperty(this, "takeAction", function (attacker, action) {
    _this.attackActions[attacker].status = 'acting';
    var dgmnData = _this.dgmnAH.getDgmnData(attacker, ['nickname', 'speciesName'], attacker.charAt(0) === 'e');
    var species = dgmnData.speciesName;
    var message = "";
    if (!action.isDefend) {
      _this.takeAttack(attacker, action, function (attackMessage) {
        message = attackMessage;
      });
    } else {
      message = _this.dgmnAH.getDgmnData(attacker, ['nickname'], attacker.charAt(0) === 'e').nickname + ' defends';
    }
    _this.battleAH.drawActionText(species, message);
    setTimeout(function () {
      if (!action.isDefend) {
        _this.dgmnAH.showDgmnFrame(attacker, 'Attack');
        var _iterator3 = _createForOfIteratorHelper(action.targets),
            _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var target = _step3.value;
            if (!_this.dgmnAH.getIsDead(target)) {
              _this.dgmnAH.showDgmnFrame(target, 'Hurt');
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        _this.triggerAnimation(attacker, action.attackName, action.targets);
      } else {
        _this.attackActions[attacker].status = 'done';
      }
    }, 1200);
  });
  _defineProperty(this, "buildActionMessage", function (nickname, attackName, accuracy) {
    var message = '';
    if (accuracy === 1) {
      message = nickname + " used " + _this.attackUtility.getDisplayName(attackName) + "!";
    } else if (accuracy === 2) {
      message = nickname + " used " + _this.attackUtility.getDisplayName(attackName) + "! CRITICAL HIT!";
    } else if (accuracy === 0) {
      message = nickname + " used " + _this.attackUtility.getDisplayName(attackName) + "... But missed.";
    }
    return message;
  });
  _defineProperty(this, "takeAttack", function (attacker, action, messageCB) {
    debugLog("".concat(attacker, " using ").concat(action.attackName, " on ").concat(action.targets));
    _this.drainEnergy(attacker, action.attackName);
    for (var i in action.targets) {
      for (var h = 0; h < action.hits; h++) {
        var attackerData = _this.dgmnAH.getDgmnData(attacker, ['currentStats', 'currentLevel', 'nickname'], attacker.charAt(0) === 'e');
        var targetData = _this.dgmnAH.getDgmnData(action.targets[i], ['currentStats', 'combo', 'speciesName', 'weak', 'isDead'], action.targets[i].charAt(0) === 'e');
        if (!targetData.isDead) {
          var attackerATK = _this.attackUtility.getStat(action.attackName) === 'physical' ? attackerData.currentStats.ATK : attackerData.currentStats.INT;
          var targetDEF = _this.attackUtility.getStat(action.attackName) === 'physical' ? targetData.currentStats.DEF : targetData.currentStats.RES;
          var baseDMG = _this.calcBaseDMG(attackerATK, attackerData.currentLevel, powerRanks[action.power], action.hits, targetDEF);
          var modTotal = 1;
          var accuracyMod = _this.calculateAccuracy(attackerData.currentStats.HIT, targetData.currentStats.AVO);
          if (accuracyMod !== 0) {
            var typeMod = _this.dgmnUtility.getTypeMod(action.type, targetData.speciesName);
            if (typeMod > 1 && !_this.isDgmnDefending(action.targets[i])) {
              _this.dgmnAH.modifyWeak(action.targets[i], 1);
            }
            var weakMod = targetData.weak > 0 ? 1.125 : 1;
            _this.dgmnAH.modifyCombo(action.targets[i], _this.getComboDelta());
            var comboLetter = _this.attackUtility.getComboLetter(_this.calculateCombo(targetData.combo, typeMod, weakMod > 1));
            var comboMod = _this.attackUtility.getComboMod(comboLetter);
            var defendMod = _this.isDgmnDefending(action.targets[i]) ? .5 : 1;
            var earlyStageMod = _this.dgmnUtility.isEnemy(attacker) ? _this.calcEarlyStageMod(targetData.speciesName) : 1;
            modTotal = comboMod * typeMod * weakMod * accuracyMod * defendMod * earlyStageMod;
            debugLog("    MODS = ".concat(comboMod, " x ").concat(typeMod, " x ").concat(weakMod, " x ").concat(accuracyMod, " x ").concat(defendMod, " x ").concat(earlyStageMod, " = ").concat(modTotal));
          }
          var rand = Math.floor(Math.random() * (3 - 1) + 1);
          var finalDMG = accuracyMod === 0 ? 0 : Math.round(baseDMG * modTotal) + rand;
          _this.dealDMG(action.targets[i], finalDMG);
          var message = _this.buildActionMessage(attackerData.nickname, action.attackName, accuracyMod);
          messageCB(message);
        } else {
          i++;
        }
      }
    }
  });
  _defineProperty(this, "drainEnergy", function (attacker, attackName) {
    var reduceBy = Math.ceil(100 / 4 / _this.attackUtility.getMaxCost(attackName));
    _this.dgmnAH.useAttack(attacker, reduceBy, attackName);
  });
  _defineProperty(this, "calcEarlyStageMod", function (targetSpecies) {
    return _this.dgmnUtility.getStage(targetSpecies) < 3 ? .5 : 1;
  });
  _defineProperty(this, "calculateAccuracy", function (attackerHIT, targetAVO) {
    var accuracyMod = 1;
    var missRange = targetAVO / attackerHIT;
    var critRange = attackerHIT / targetAVO;
    if (missRange !== 1) {
      missRange = missRange < 1 ? missRange * .5 : missRange * 2;
      critRange = critRange < 1 ? critRange * .5 : critRange * 2;
    }
    missRange *= 10;
    critRange *= 10;
    var rand = Math.floor(Math.random() * (1000 - 1) + 1);
    if (rand <= missRange) {
      debugLog("    Attack missed...");
      accuracyMod = 0;
    } else if (rand >= 1000 - critRange) {
      debugLog("    CRITICAL HIT!");
      accuracyMod = 2;
    }
    return accuracyMod;
  });
  _defineProperty(this, "calculateCombo", function (prevCombo) {
    var typeMod = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var isWEAK = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    return prevCombo + _this.getComboDelta(typeMod, isWEAK);
  });
  _defineProperty(this, "getComboDelta", function () {
    var typeMod = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var isWEAK = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var delta = 1;
    if (isWEAK) delta++;
    if (typeMod > 1) {
      delta++;
    } else if (typeMod < 1) {
      delta = 0;
    }
    return delta;
  });
  _defineProperty(this, "calcBaseDMG", function (attackerATK, attackerLV, attackPWR, attackHits, targetDEF) {
    var baseDMG = Math.ceil(attackerATK / targetDEF * (attackerLV / 4) * attackPWR / attackHits);
    debugLog("  BASE DMG = \u2308( ( (".concat(attackerATK, "/").concat(targetDEF, ") x (").concat(attackerLV, "/2) ) x ").concat(attackPWR, ") / ").concat(attackHits, "\u2309 = ").concat(baseDMG, " "));
    return baseDMG;
  });
  _defineProperty(this, "dealDMG", function (target, dmg) {
    debugLog("  Dealt " + dmg + "DMG to " + target);
    _this.dgmnAH.dealDMG(target, dmg);
  });
  _defineProperty(this, "isDgmnDefending", function (dgmnId) {
    if (_this.attackActions[dgmnId]) return _this.attackActions[dgmnId].isDefending;
    return false;
  });
  this.attackActions = {};
  this.attackCanvas;
  this.attackUtility = new AttackUtility();
  this.dgmnUtility = new DgmnUtility();
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
      var barHex = meterLength >= 5 ? "#6CA66C" : "#1D5A4A";
      var borderImg = meterLength >= 5 ? images[0] : images[1];
      _this.ctx.clearRect(xPosition * config.screenSize, yPosition * config.screenSize, 16 * config.screenSize, 8 * config.screenSize);
      _this.ctx.drawImage(borderImg, xPosition * config.screenSize, yPosition * config.screenSize, 16 * config.screenSize, 8 * config.screenSize);
      _this.ctx.fillStyle = barHex;
      _this.ctx.fillRect((xPosition + 4) * config.screenSize, (yPosition + 2) * config.screenSize, meterLength * config.screenSize, 3 * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnCombo", function (coord, image) {
      _this.ctx.clearRect(coord[0] * config.tileSize, coord[1] * config.tileSize, config.tileSize, config.tileSize);
      _this.ctx.drawImage(image, coord[0] * config.tileSize, coord[1] * config.tileSize, config.tileSize, config.tileSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnWeak", function (coord, image) {
      _this.ctx.clearRect(coord[0] * config.tileSize, coord[1] * config.tileSize, config.tileSize, config.tileSize);
      _this.ctx.drawImage(image, coord[0] * config.tileSize, coord[1] * config.tileSize, config.tileSize, config.tileSize);
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
    _this.attackManager.battleMenuAH = _this.battleMenu.battleMenuAH;
    _this.yourParty = _this.gameAH.getDgmnParty();
    _this.generateEnemyParty();
    _this.initCanvas();
    _this.loadBattleImages();
  });
  _defineProperty(this, "initCanvas", function () {
    _this.battleCanvas = new BattleCanvas('battle-canvas', 160, 144);
  });
  _defineProperty(this, "initAH", function (systemAH, gameAH, dgmnAH, dungeonAH, digiBeetleAH) {
    _this.systemAH = systemAH;
    _this.gameAH = gameAH;
    _this.dgmnAH = dgmnAH;
    _this.dungeonAH = dungeonAH;
    _this.digiBeetleAH = digiBeetleAH;
    _this.attackManager.initAH(_this.systemAH, _this.battleAH, _this.dgmnAH);
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
      setTimeout(function () {
        _this.systemAH.stopLoading();
        _this.battleState = 'battle';
      }, 2000);
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
  _defineProperty(this, "newTurn", function () {
    _this.turn++;
    _this.effectDecay(_this.yourParty);
    _this.effectDecay(_this.enemyParty);
    _this.drawAllStatuses();
    _this.battleMenu.newTurn();
  });
  _defineProperty(this, "effectDecay", function (party) {
    for (var i = 0; i < party.length; i++) {
      var dgmnWeak = _this.getDgmnDataByIndex(i, ['weak'], party[i].charAt(0) === 'e').weak;
      _this.dgmnAH.modifyWeak(party[i], -1);
      _this.dgmnAH.modifyCombo(party[i], -2 + dgmnWeak);
    }
  });
  _defineProperty(this, "generateEnemyParty", function () {
    var currentFloor = _this.dungeonAH ? _this.dungeonAH.getCurrentFloor() : 1;
    _this.dgmnAH.generateEnemies(currentFloor, 3);
  });
  _defineProperty(this, "calcTurnOrder", function () {
    var order = _this.yourParty.concat(_this.enemyParty);
    for (var i = 0; i < order.length; i++) {
      for (var r = 0; r < order.length - 1; r++) {
        var temp = order[r];
        var currSPD = _this.dgmnAH.getDgmnData(order[r], ['currentStats'], order[r].charAt(0) === 'e').currentStats.SPD;
        var nextSPD = _this.dgmnAH.getDgmnData(order[r + 1], ['currentStats'], order[r + 1].charAt(0) === 'e').currentStats.SPD;
        if (currSPD < nextSPD) {
          order[r] = order[r + 1];
          order[r + 1] = temp;
        }
      }
    }
    return order;
  });
  _defineProperty(this, "drawAllStatuses", function () {
    for (var i = 0; i < 3; i++) {
      _this.updateDgmnStatus(false, i);
      _this.updateDgmnStatus(true, i);
    }
  });
  _defineProperty(this, "updateDgmnStatus", function (isEnemy, dgmnIndex) {
    var dgmnData = isEnemy ? _this.dgmnAH.getDgmnData(_this.enemyParty[dgmnIndex], ['combo', 'weak', 'isDead'], true) : _this.dgmnAH.getDgmnData(_this.yourParty[dgmnIndex], ['combo', 'weak', 'isDead'], false);
    _this.drawDgmnStatusMeter(isEnemy, dgmnIndex, 'hp');
    _this.drawDgmnStatusMeter(isEnemy, dgmnIndex, 'en');
    _this.drawDgmnStatusCombo(isEnemy, dgmnIndex, dgmnData.combo);
    _this.drawDgmnStatusWeak(isEnemy, dgmnIndex, dgmnData.weak);
  });
  _defineProperty(this, "drawDgmnStatusMeter", function (isEnemy, dgmnIndex, stat) {
    var dgmnData = !isEnemy ? _this.dgmnAH.getDgmnData(_this.yourParty[dgmnIndex], ["current".concat(stat.toUpperCase()), 'currentStats']) : _this.dgmnAH.getDgmnData(_this.enemyParty[dgmnIndex], ["current".concat(stat.toUpperCase()), 'currentStats'], true);
    var coord = [];
    coord[0] = isEnemy ? 1 : 18;
    coord[1] = dgmnIndex * 4 + 2 + (stat === 'hp' ? 0 : 1);
    var currStat = dgmnData["current".concat(stat.toUpperCase())];
    var maxStat = stat === 'hp' ? dgmnData.currentStats.HP : 100;
    _this.dgmnStatusCanvas.drawDgmnStatusMeter(coord, [_this.systemAH.fetchImage('dgmnBarLightGreen'), _this.systemAH.fetchImage('dgmnBarDarkGreen')], _this.battleUtility.calculateMeterLength(currStat, maxStat));
  });
  _defineProperty(this, "drawDgmnStatusCombo", function (isEnemy, dgmnIndex, combo) {
    var comboLetter = _this.attackUtility.getComboLetter(combo);
    var comboImg = comboLetter === 'F' ? _this.systemAH.fetchImage('comboFIcon') : _this.systemAH.fetchImage("pwr".concat(comboLetter, "Icon"));
    var partyOffset = isEnemy ? 0 : 17;
    var coord = [1 + partyOffset, 4 + dgmnIndex * 4];
    _this.dgmnStatusCanvas.drawDgmnCombo(coord, comboImg);
  });
  _defineProperty(this, "drawDgmnStatusWeak", function (isEnemy, dgmnIndex, weak) {
    var partyOffset = isEnemy ? 0 : 17;
    var coord = [2 + partyOffset, 4 + dgmnIndex * 4];
    _this.dgmnStatusCanvas.drawDgmnWeak(coord, _this.systemAH.fetchImage('weak' + weak));
  });
  _defineProperty(this, "drawActionText", function (species, message) {
    _this.battleMenu.drawActionText(species, message);
  });
  _defineProperty(this, "drawBattleCanvas", function () {
    _this.battleCanvas.drawBattleBase(_this.systemAH.fetchImage('battleBackground'));
    _this.battleCanvas.paintCanvas(_this.dgmnStatusCanvas);
    if (_this.battleMenu) {
      for (var i = 0; i < 3; i++) {
        if (_this.dgmnAH.getCanvas(_this.yourParty[i])) _this.battleCanvas.drawDgmnCanvas(_this.dgmnAH.getCanvas(_this.yourParty[i]));
        if (_this.dgmnAH.getCanvas(_this.enemyParty[i])) _this.battleCanvas.drawDgmnCanvas(_this.dgmnAH.getCanvas(_this.enemyParty[i]));
      }
      _this.battleCanvas.paintCanvas(_this.battleMenu.menuCanvas);
    } else if (_this.victoryMenu) {
      _this.battleCanvas.paintCanvas(_this.victoryMenu.menuCanvas);
      for (var _i = 0; _i < 3; _i++) {
        _this.battleCanvas.drawDgmnCanvas(_this.dgmnAH.getCanvas(_this.yourParty[_i]));
      }
    }
    if (_this.attackManager.attackCanvas) _this.battleCanvas.paintCanvas(_this.attackManager.attackCanvas);
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
  _defineProperty(this, "checkBattleCondition", function () {
    if (_this.dgmnAH.checkAllDead(true)) {
      return 'win';
    } else if (_this.dgmnAH.checkAllDead(false)) {
      return 'lose';
    }
    return 'ongoing';
  });
  _defineProperty(this, "battleWin", function () {
    debugLog("BATTLE WON!");
    _this.giveDgmnRewards();
    _this.battleMenu.drawVictoryMessage();
    _this.battleMenu.endBattle(_this.battleRewards, _this.battleBaseXP);
  });
  _defineProperty(this, "giveDgmnRewards", function () {
    var levelUps = [];
    var _iterator4 = _createForOfIteratorHelper(_this.yourParty),
        _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var dgmn = _step4.value;
        var leveledUp = _this.dgmnAH.battleWrapUp(dgmn, _this.battleRewards);
        if (leveledUp) levelUps.push(dgmn);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    if (levelUps.length > 0) {
      console.log("SOMEONE LEVELD UP!");
    }
  });
  _defineProperty(this, "rewardWrapUp", function () {
    var levelUps = [];
    _this.giveDgmnBaseXP();
    for (var i = 0; i < 3; i++) {
      if (_this.dgmnAH.checkLevelUp(_this.yourParty[i])) {
        levelUps.push(_this.yourParty[i]);
      }
    }
    if (levelUps.length > 0) {
      _this.gotoLevelUp(levelUps);
    } else {
      _this.end();
    }
  });
  _defineProperty(this, "giveDgmnBaseXP", function () {
    console.log("Battle Base XP = ", _this.battleBaseXP);
    for (var i = 0; i < 3; i++) {
      _this.dgmnAH.giveDgmnXP(_this.yourParty[i], _this.battleBaseXP);
    }
  });
  _defineProperty(this, "battleLose", function () {
    debugLog("BATTLE LOST...");
    _this.battleMenu.endBattle();
  });
  _defineProperty(this, "end", function () {
    _this.battleState = 'loading';
    _this.systemAH.startLoading(function () {
      _this.gameAH.endBattle();
    });
  });
  _defineProperty(this, "stopDgmnBattleCanvas", function () {
    for (var i = 0; i < 3; i++) {
      _this.dgmnAH.stopDgmnCanvas(_this.yourParty[i]);
    }
  });
  _defineProperty(this, "gotoRewards", function () {
    _this.battleState = 'victory';
    _this.battleMenu.menuCanvas.clearCanvas();
    _this.battleMenu = null;
    _this.victoryMenu = new VictoryMenu(_this.battleBaseXP, _this.battleRewards, _this.systemAH, _this.gameAH, _this.battleAH);
    _this.battleIO.setMenuAH(_this.victoryMenu.victoryMenuAH);
    _this.victoryMenu.gotoRewards(_this.battleRewards);
    for (var i = 0; i < 3; i++) {
      _this.dgmnAH.moveDgmnCanvas(_this.yourParty[i], (6 * i + 2) * 8 * config.screenSize, 72 * config.screenSize);
    }
  });
  _defineProperty(this, "gotoLevelUp", function (levelUps) {
    var dgmnData = [];
    var _iterator5 = _createForOfIteratorHelper(levelUps),
        _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var dgmn = _step5.value;
        var data = _this.dgmnAH.getDgmnData(dgmn, ['nickname', 'currentStats', 'speciesName', 'currentLevel'], false);
        data.dgmnId = dgmn;
        dgmnData.push(data);
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    _this.stopDgmnBattleCanvas();
    _this.victoryMenu.removeSubMenu('rewards');
    _this.victoryMenu.setLevelUpList(dgmnData);
    _this.victoryMenu.gotoLevelUp();
  });
  _defineProperty(this, "levelUpNext", function () {
    var currDgmn = _this.victoryMenu.levelUpDgmn[_this.victoryMenu.levelUpIndex].dgmnId;
    var currDgmnData = _this.dgmnAH.getDgmnData(currDgmn, ['speciesName', 'currentFP'], false);
    currDgmnData.dgmnId = currDgmn;
    if (_this.dgmnUtility.checkEvolution(currDgmnData)) {
      var evoImages = _this.dgmnUtility.getAllEvoImages(currDgmnData.speciesName);
      _this.systemAH.loadImages(evoImages, function () {
        _this.victoryMenu.gotoEvolution(currDgmnData);
      });
    } else if (_this.victoryMenu.levelUpDgmn.length > 1 && _this.victoryMenu.levelUpIndex < _this.victoryMenu.levelUpDgmn.length - 1) {
      _this.victoryMenu.removeSubMenu('level');
      _this.victoryMenu.gotoNextLevelUp();
    } else {
      _this.end();
    }
  });
  _defineProperty(this, "evolveCurrDgmn", function () {
    var currDgmn = _this.victoryMenu.levelUpDgmn[_this.victoryMenu.levelUpIndex];
    var evoChoice = _this.victoryMenu.subMenus.evolution.selectedDgmn;
    _this.dgmnAH.evolve(currDgmn.dgmnId, evoChoice);
    _this.victoryMenu.selectIcon();
    if (_this.victoryMenu.levelUpDgmn.length > 1 && _this.victoryMenu.levelUpIndex < _this.victoryMenu.levelUpDgmn.length - 1) {
      _this.victoryMenu.removeSubMenu('evolution');
      _this.victoryMenu.gotoNextLevelUp();
    } else {
      _this.end();
    }
  });
  _defineProperty(this, "giveCurrReward", function (dir) {
    var dgmnId;
    var reward = _this.battleRewards[_this.victoryMenu.subMenus.rewards.currIndex];
    if (dir === 'left') {
      dgmnId = _this.yourParty[0];
    } else if (dir === 'up') {
      dgmnId = _this.yourParty[1];
    } else if (dir === 'right') {
      dgmnId = _this.yourParty[2];
    }
    _this.dgmnAH.giveDgmnReward(dgmnId, reward);
    _this.victoryMenu.updateRewardsList(_this.battleRewards, _this.rewardWrapUp);
  });
  _defineProperty(this, "getDgmnValueByIndex", function (isEnemy, dgmnIndex, value) {
    var returnValue;
    if (!isEnemy) {
      returnValue = _this.yourParty[dgmnIndex][value];
    }
    return returnValue;
  });
  _defineProperty(this, "getDgmnDataByIndex", function (dgmnIndex, data) {
    var isEnemy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var dgmnId = isEnemy ? _this.enemyParty[dgmnIndex] : _this.yourParty[dgmnIndex];
    return _this.dgmnAH.getDgmnData(dgmnId, data, isEnemy);
  });
  _defineProperty(this, "getDgmnAttackData", function (dgmnIndex, data) {
    return _this.dgmnAH.getDgmnAttackData(_this.yourParty[dgmnIndex], data);
  });
  _defineProperty(this, "buildEnemyActions", function () {
    for (var enemy in _this.enemyParty) {
      var action = _this.attackUtility.getAttackData('bubbles', ['type', 'hits', 'targets', 'power', 'type', 'maxCost']);
      action.attackName = 'bubbles';
      action.targetIndex = [Math.floor(Math.random() * 3)];
      action.attacker = enemy;
      _this.addAction(enemy, true, action);
    }
  });
  _defineProperty(this, "addAction", function (dgmnIndex, isEnemy, actionData) {
    var convertedTargets;
    var actor = isEnemy ? _this.enemyParty[dgmnIndex] : _this.yourParty[dgmnIndex];
    var tempAction = actionData;
    if (!actionData.isDefend) {
      if (isEnemy) {
        convertedTargets = actionData.targetIndex.length === 1 ? [_this.yourParty[actionData.targetIndex[0]]] : _this.yourParty;
      } else {
        convertedTargets = actionData.targetIndex.length === 1 ? [_this.enemyParty[actionData.targetIndex[0]]] : _this.enemyParty;
      }
      tempAction.targets = convertedTargets;
    }
    _this.attackManager.addAction(actor, tempAction);
  });
  _defineProperty(this, "addRewards", function (speciesName) {
    _this.battleRewards = _this.battleRewards.concat(_this.battleUtility.getRewards(speciesName));
    _this.battleBaseXP += _this.battleUtility.getXP(speciesName);
  });
  _defineProperty(this, "beginCombat", function () {
    debugLog("+ Begin Combat...");
    _this.buildEnemyActions();
    debugLog("++ Action List = ", _this.attackManager.attackActions);
    _this.attackManager.attackLoop(_this.calcTurnOrder());
  });
  _defineProperty(this, "getBattleState", function () {
    return _this.battleState;
  });
  this.battleActive = true;
  this.turn = 0;
  this.yourParty;
  this.enemyParty = ['edId0', 'edId1', 'edId2'];
  this.battleState = 'loading';
  this.battleRewards = [];
  this.battleBaseXP = 0;
  this.attackChoice;
  this.systemAH;
  this.gameAH;
  this.digiBeetleAH;
  this.dungeonAH;
  this.battleAH = new BattleAH({
    getBattleStateCB: this.getBattleState,
    drawBattleCanvasCB: this.drawBattleCanvas,
    getDgmnDataByIndexCB: this.getDgmnDataByIndex,
    addActionCB: this.addAction,
    getDgmnAttackDataCB: this.getDgmnAttackData,
    beginCombatCB: this.beginCombat,
    drawActionTextCB: this.drawActionText,
    drawAllStatusesCB: this.drawAllStatuses,
    newTurnCB: this.newTurn,
    checkBattleConditionCB: this.checkBattleCondition,
    battleWinCB: this.battleWin,
    battleLoseCB: this.battleLose,
    addRewardsCB: this.addRewards,
    gotoRewardsCB: this.gotoRewards,
    giveCurrRewardCB: this.giveCurrReward,
    levelUpNextCB: this.levelUpNext,
    evolveCurrDgmnCB: this.evolveCurrDgmn
  });
  this.battleIO = new BattleIO(this.battleAH);
  this.battleUtility = new BattleUtility();
  this.dgmnUtility = new DgmnUtility();
  this.attackUtility = new AttackUtility();
  this.attackManager = new AttackManager();
  this.battleCanvas;
  this.dgmnStatusCanvas;
  this.battleMenu;
  this.victoryMenu;
}
;

var dungeonFloorsDB = {
  twoByTwo: [[[5, 6], [7, 8]], [[5, 6], [3, 3]]]
};
var dungeonRoomsDB = [[[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0],
[0, 1, 16, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 5, 1, 6, 1, 7, 1, 0], [0, 16, 1, 1, 1, 9, 10, 1], [0, 1, 1, 1, 6, 1, 1, 0], [0, 4, 1, 1, 5, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0],
[0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 1, 0, 0, 0, 0],
[0, 1, 6, 1, 6, 1, 1, 0], [0, 1, 1, 1, 1, 8, 1, 0], [0, 1, 7, 1, 1, 1, 1, 0], [0, 5, 1, 15, 1, 1, 4, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 5, 16, 5, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0],
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
    var selectedFloor = Math.floor(Math.random() * floorOptions.length);
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
    var arrayRef = _this.mapUtility.getTileLayout(_this.roomId);
    for (var r = 0; r < arrayRef.length; r++) {
      var row = [];
      for (var c = 0; c < arrayRef[r].length; c++) {
        row.push(arrayRef[r][c]);
      }
      _this.tileMatrix.push(row);
    }
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

var itemsDB = {
  smallMeat: {
    displayName: 'Meat S'
  },
  atkPluginC: {
    displayName: 'ATK Plugin C'
  },
  boosterDRs: {
    displayName: '1 DR FP'
  }
};
var itemChart = {
  meat: {
    common: ['smallMeat']
  },
  beetle: {
    common: ['atkPluginC']
  },
  booster: {
    common: ['boosterDRs']
  }
};
var rarityChartDB = ['common', 'uncommon', 'rare', 'extraRare'];

var TreasureUtility = function TreasureUtility() {
  var _this = this;
  _classCallCheck(this, TreasureUtility);
  _defineProperty(this, "getRarity", function (floorNumber) {
    var isRarityBoosted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var rarity = 'common';
    if (floorNumber > 5) {
      if (floorNumber > 50) {
        var rando = Math.floor(Math.random() * 100);
        if (rando >= 85) {
          rarity = 'extraRare';
        } else if (rando >= 60) {
          rarity = 'rare';
        } else if (rando >= 20) {
          rarity = 'uncommon';
        }
      } else if (floorNumber > 40) {
        var _rando = Math.floor(Math.random() * 100);
        if (_rando >= 90) {
          rarity = 'extraRare';
        } else if (_rando >= 70) {
          rarity = 'rare';
        } else if (_rando >= 40) {
          rarity = 'uncommon';
        }
      } else if (floorNumber > 30) {
        var _rando2 = Math.floor(Math.random() * 100);
        if (_rando2 >= 95) {
          rarity = 'extraRare';
        } else if (_rando2 >= 85) {
          rarity = 'rare';
        } else if (_rando2 >= 60) {
          rarity = 'uncommon';
        }
      } else if (floorNumber > 20) {
        var _rando3 = Math.floor(Math.random() * 100);
        if (_rando3 >= 90) {
          rarity = 'rare';
        } else if (_rando3 >= 70) {
          rarity = 'uncommon';
        }
      } else if (floorNumber > 10) {
        var _rando4 = Math.floor(Math.random() * 100);
        if (_rando4 >= 95) {
          rarity = 'rare';
        } else if (_rando4 >= 80) {
          rarity = 'uncommon';
        }
      } else {
        if (Math.floor(Math.random() * 10) === 9) {
          rarity = 'uncommon';
        }
      }
    }
    rarity = isRarityBoosted ? _this.boostRarity(rarity) : rarity;
    return rarity;
  });
  _defineProperty(this, "boostRarity", function (rarity) {
    if (Math.floor(Math.random() * 2) === 1 && rarity !== 'extraRare') {
      return rarityChartDB[rarityChartDB.indexOf(rarity) + 1];
    }
    return rarity;
  });
  _defineProperty(this, "getItemType", function () {
    var modifier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'none';
    var itemType = 'none';
    var rando = Math.floor(Math.random() * 100);
    if (modifier !== 'none' && Math.floor(Math.random() * 10) > 6) {
      return modifier;
    }
    if (rando >= 90) {
      itemType = 'booster';
    } else if (rando >= 45) {
      itemType = 'beetle';
    } else if (rando < 45) {
      itemType = 'meat';
    }
    return itemType;
  });
  _defineProperty(this, "getItem", function (rarity, type) {
    var itemOptions = itemChart[type][rarity];
    var rando = Math.floor(Math.random() * itemOptions.length);
    return itemOptions[rando];
  });
  _defineProperty(this, "getTreasureById", function (id, treasures) {
    var _iterator = _createForOfIteratorHelper(treasures),
        _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var treasure = _step.value;
        if ((treasure === null || treasure === void 0 ? void 0 : treasure.id) === parseInt(id)) return treasure;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return {};
  });
  _defineProperty(this, "getTreasureName", function (treasure) {
    return itemsDB[treasure].displayName;
  });
}
;

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
    console.log("END ? ", end);
    _this.roomMatrix[end.room[0]][end.room[1]].changeTile([end.tile[0], end.tile[1]], 102);
    console.log("LOOK FOR END ? ", _this.roomMatrix);
    return end;
  });
  _defineProperty(this, "generateEvents", function () {
    var eventOrder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ["enemy", "trap", "treasure"];
    for (var i = 0; i < eventOrder.length; i++) {
      if (eventOrder[i] === 'enemy') {
        _this.generateEnemies();
      } else if (eventOrder[i] === 'trap') ; else if (eventOrder[i] === 'treasure') {
        _this.generateTreasure();
      }
    }
  });
  _defineProperty(this, "generateEnemies", function () {
    var potentialSpots = _this.findAllTilesOnFloor([6, 8, 10, 11, 12, 14, 15]);
    var enemyChance = _this.floorEventMod === 'enemy' ? 30 : 15;
    var encounterCount = 1;
    var maxEncounters = 4;
    var minEncounters = 2;
    for (var i = 0; i < maxEncounters; i++) {
      var rando = Math.floor(Math.random() * potentialSpots.length);
      if (potentialSpots.length === 0) break;
      if (encounterCount <= minEncounters) {
        _this.addEncounter(potentialSpots[rando], encounterCount);
        encounterCount++;
      } else if (Math.floor(Math.random() * 100) <= enemyChance) {
        _this.addEncounter(potentialSpots[rando], encounterCount);
        encounterCount++;
      }
      potentialSpots.splice(rando, 1);
    }
    debugLog("ENCOUNTERS = ", _this.encounters);
  });
  _defineProperty(this, "generateTreasure", function () {
    var potentialSpots = _this.findAllTilesOnFloor([5, 8, 9, 11, 12, 14, 15, 16]);
    var treasureChance = _this.floorEventMod === 'treasure' ? 20 : 5;
    var treasureCount = 1;
    var maxTreasure = 3;
    var minTreasure = 1;
    for (var i = 0; i < maxTreasure; i++) {
      var rando = Math.floor(Math.random() * potentialSpots.length);
      if (potentialSpots.length === 0) break;
      if (treasureCount <= minTreasure) {
        _this.addTreasure(potentialSpots[rando], treasureCount);
        treasureCount++;
      } else if (Math.floor(Math.random() * 100) <= treasureChance) {
        _this.addTreasure(potentialSpots[rando], treasureCount);
        treasureCount++;
      }
      potentialSpots.splice(rando, 1);
    }
    debugLog("TREASURES = ", _this.treasures);
  });
  _defineProperty(this, "addEncounter", function (tile, encounterId) {
    var tileNumber = 105 + encounterId / 100;
    _this.roomMatrix[tile.room[0]][tile.room[1]].changeTile([tile.tile[0], tile.tile[1]], tileNumber);
    _this.encounters.push({
      id: encounterId
    });
    _this.createEncounterRange(tile, encounterId);
  });
  _defineProperty(this, "addTreasure", function (tile, treasureId) {
    var tileNumber = 103 + treasureId / 100;
    _this.roomMatrix[tile.room[0]][tile.room[1]].changeTile([tile.tile[0], tile.tile[1]], tileNumber);
    var treasureRarity = _this.treasureUtility.getRarity(_this.number);
    var treasureType = _this.treasureUtility.getItemType();
    var treasure = _this.treasureUtility.getItem(treasureRarity, treasureType);
    _this.treasures.push({
      id: treasureId,
      tile: tile,
      itemName: treasure
    });
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
      _this.clearEncounter((tile + "").split(".")[1]);
      _this.dungeonAH.startBattle();
      return true;
    } else if (Math.floor(tile) === 103) {
      _this.clearTreasure((tile + "").split(".")[1]);
      console.log(_this.treasureUtility.getTreasureById((tile + "").split(".")[1], _this.treasures));
      _this.dungeonAH.getTreasure(_this.treasureUtility.getTreasureById((tile + "").split(".")[1], _this.treasures).itemName);
      return true;
    }
    return false;
  });
  _defineProperty(this, "clearEncounter", function (encounterNumber) {
    var encounterTiles = _this.findAllTilesOnFloor([parseFloat("105." + encounterNumber), parseFloat("106." + encounterNumber)]);
    var _iterator = _createForOfIteratorHelper(encounterTiles),
        _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var tile = _step.value;
        var room = _this.roomMatrix[tile.room[0]][tile.room[1]];
        room.changeTile([tile.tile[0], tile.tile[1]], 1);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
  _defineProperty(this, "clearTreasure", function (treasureNumber) {
    var treasureTile = _this.findAllTilesOnFloor([parseFloat("103." + treasureNumber)])[0];
    var room = _this.roomMatrix[treasureTile.room[0]][treasureTile.room[1]];
    room.changeTile[([treasureTile.tile[0], treasureTile.tile[1]], 1)];
    _this.floorCanvas.drawTile(_this.systemAH.fetchImage('treasureTileOpen'), treasureTile.room, treasureTile.tile);
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
    _this.drawTreasures();
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
  _defineProperty(this, "drawTreasures", function () {
    var _iterator2 = _createForOfIteratorHelper(_this.treasures),
        _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var treasure = _step2.value;
        if (treasure) _this.floorCanvas.drawTile(_this.systemAH.fetchImage('treasureTile'), treasure.tile.room, treasure.tile.tile);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
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
  this.treasureUtility = new TreasureUtility();
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
  this.treasures = [null];
  this.activeEncounterIndex = 0;
  this.currentTile = {
    room: [],
    tile: []
  };
}
;

var DungeonAH = function DungeonAH(cbObj) {
  _classCallCheck(this, DungeonAH);
  this.getCurrentDirection = function () {
    return cbObj.getCurrentDirectionCB();
  };
  this.setCurrentDirection = function (newValue) {
    cbObj.setCurrentDirectionCB(newValue);
  };
  this.drawDungeon = function () {
    return cbObj.drawDungeonCB();
  };
  this.paintFloorCanvas = function (canvas) {
    cbObj.paintFloorCanvasCB(canvas);
  };
  this.getDungeonState = function () {
    return cbObj.getDungeonStateCB();
  };
  this.getMoving = function () {
    return cbObj.getMovingCB();
  };
  this.setMoving = function (newValue) {
    cbObj.setMovingCB(newValue);
  };
  this.getCollision = function () {
    return cbObj.getCollisionCB();
  };
  this.setCollision = function (dir, newValue) {
    cbObj.setCollisionCB(dir, newValue);
  };
  this.moveFloor = function (dir, upDown) {
    cbObj.moveFloorCB(dir, upDown);
  };
  this.goUpFloor = function () {
    cbObj.goUpFloorCB();
  };
  this.startBattle = function () {
    cbObj.startBattleCB();
  };
  this.getCurrentFloor = function () {
    return cbObj.getCurrentFloorCB();
  };
  this.giveCurrReward = function (dir) {
    return cbObj.giveCurrRewardCB(dir);
  };
  this.hatchEgg = function () {
    return cbObj.hatchEggCB();
  };
  this.getTreasure = function (treasure) {
    return cbObj.getTreasureCB(treasure);
  };
  this.closeTextBox = function () {
    return cbObj.closeTextBoxCB();
  };
  this.bringUpMenu = function () {
    return cbObj.bringUpMenuCB();
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
    _defineProperty(_assertThisInitialized(_this), "setMenuAH", function (ah) {
      _this.hatchMenuAH = ah;
    });
    _defineProperty(_assertThisInitialized(_this), "cancelKeyHandler", function (upDown) {
      console.log("DOWN");
    });
    _defineProperty(_assertThisInitialized(_this), "actionKeyHandler", function (upDown) {
      if (_this.dungeonAH.getDungeonState() === 'hatch') {
        if (_this.hatchMenuAH.getState() === 'hatch-choice') {
          _this.dungeonAH.hatchEgg();
        }
      } else if (_this.dungeonAH.getDungeonState() === 'text-box-next') {
        _this.dungeonAH.closeTextBox();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "startKeyHandler", function (upDown) {
      if (_this.dungeonAH.getDungeonState() === 'free') {
        _this.dungeonAH.bringUpMenu();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "upKeyHandler", function (upDown) {
      if (_this.dungeonAH.getDungeonState() === 'hatch' && upDown === 'down') {
        if (_this.hatchMenuAH.getState() === 'rewards') _this.dungeonAH.giveCurrReward('up');
      } else if (_this.dungeonAH.getDungeonState() === 'free') {
        _this.movingInDirection('up', upDown);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "rightKeyHandler", function (upDown) {
      if (_this.dungeonAH.getDungeonState() === 'hatch' && upDown === 'down') {
        if (_this.hatchMenuAH.getState() === 'rewards') {
          _this.dungeonAH.giveCurrReward('right');
        } else if (_this.hatchMenuAH.getState() === 'hatch-choice') {
          _this.hatchMenuAH.nextHatch();
        }
      } else if (_this.dungeonAH.getDungeonState() === 'free') {
        _this.movingInDirection('right', upDown);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "downKeyHandler", function (upDown) {
      if (_this.dungeonAH.getDungeonState() === 'free') {
        _this.movingInDirection('down', upDown);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "leftKeyHandler", function (upDown) {
      if (_this.dungeonAH.getDungeonState() === 'hatch' && upDown === 'down') {
        if (_this.hatchMenuAH.getState() === 'rewards') {
          _this.dungeonAH.giveCurrReward('left');
        } else if (_this.hatchMenuAH.getState() === 'hatch-choice') {
          _this.hatchMenuAH.prevHatch();
        }
      } else if (_this.dungeonAH.getDungeonState() === 'free') {
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
    _this.hatchMenuAH;
    return _this;
  }
  return DungeonIO;
}(IO);

var HatchingEggMenu = function (_IconMenu) {
  _inherits(HatchingEggMenu, _IconMenu);
  var _super = _createSuper(HatchingEggMenu);
  function HatchingEggMenu() {
    var _this;
    _classCallCheck(this, HatchingEggMenu);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "buildHatchingScreen", function (eggData, redrawCB) {
      debugLog("Hatching DGMN...");
      _this.eggData = eggData;
      _this.hatches = _this.dgmnUtility.getEggHatches(eggData.eggField);
      _this.selectedDgmn = _this.hatches[0];
      _this.redrawCB = redrawCB;
      debugLog("  - Hatch Options : ", _this.hatches);
      _this.drawHatchScreen();
      _this.redrawParentCB();
    });
    _defineProperty(_assertThisInitialized(_this), "drawHatchScreen", function () {
      _this.drawDgmnCanvas(_this.hatches[_this.currSelection], _this.redrawCB);
      _this.drawDgmnStats(_this.dgmnUtility.buildInitialStats(_this.hatches[_this.currSelection]));
      _this.drawDgmnInfo(_this.hatches[_this.currSelection]);
      _this.drawHatchRequirements(_this.hatches[_this.currSelection]);
      _this.drawIcons(_this.eggData.currentFP, _this.hatches, _this.currSelection);
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnInfo", function (species) {
      _this.menuCanvas.ctx.fillStyle = "#00131A";
      _this.menuCanvas.ctx.fillRect(0 * config.tileSize, 14 * config.tileSize, 20 * config.tileSize, 4 * config.tileSize);
      _this.drawEvoPortrait(_this.fetchImgCB("".concat(species.toLowerCase(), "Portrait")));
      _this.evoNameTxt.instantText(_this.menuCanvas.ctx, "".concat(species, ".MON"), 'white');
      _this.evoAttributeTxt.instantText(_this.menuCanvas.ctx, _this.dgmnUtility.getAttribute(species), 'green');
      _this.evoWeakTxt.instantText(_this.menuCanvas.ctx, 'WEAK', 'green');
      _this.evoResTxt.instantText(_this.menuCanvas.ctx, 'RES', 'green');
      for (var field in _this.dgmnUtility.getBaseFP(species)) {
        _this.menuCanvas.paintImage(_this.fetchImgCB("field".concat(field, "Icon")), (5 + _this.dgmnUtility.getAttribute(species).length) * config.tileSize, 15 * config.tileSize);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "drawEvoPortrait", function (portraitImg) {
      _this.menuCanvas.ctx.drawImage(portraitImg, 0, 0, 256, 248, 0, 112 * config.screenSize, 32 * config.screenSize, (32 - 1) * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnStats", function (stats) {
      _this.menuCanvas.ctx.fillStyle = "#00131A";
      _this.menuCanvas.ctx.fillRect(16 * config.tileSize, 3 * config.tileSize, 3 * config.tileSize, 8 * config.tileSize);
      for (var stat in stats) {
        _this.statTxtAreas[stat].instantText(_this.menuCanvas.ctx, _this.menuUtility.prependZeros(stats[stat], 3), 'white');
      }
    });
    _defineProperty(_assertThisInitialized(_this), "drawHatchRequirements", function (species) {
      console.log("FP = ", _this.eggData.currentFP);
      _this.menuCanvas.ctx.fillStyle = "#00131A";
      _this.menuCanvas.ctx.fillRect(1 * config.tileSize, 11 * config.tileSize, 10 * config.tileSize, 1 * config.tileSize);
      var fpReqs = _this.dgmnUtility.getHatchFP(species);
      var i = 0;
      for (var req in fpReqs) {
        var color = _this.eggData.currentFP[req] >= fpReqs[req] ? 'white' : 'darkGreen';
        var img = _this.fetchImgCB("field".concat(req, "Icon"));
        _this.menuCanvas.paintImage(img, (1 + i * 5) * config.tileSize, 11 * config.tileSize);
        _this.hatchReqsTxt[i].instantText(_this.menuCanvas.ctx, _this.menuUtility.prependZeros(fpReqs[req], 3), color);
        i++;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnCanvas", function (species, redrawCB) {
      var coord = [4, 5];
      _this.hatchCanvas = new DgmnCanvas(function () {
        _this.redrawDgmn(_this.hatchCanvas, coord, redrawCB);
      }, species, 'dgmn-canvas', 32, 32);
      _this.hatchCanvas.x = coord[0] * config.tileSize;
      _this.hatchCanvas.y = coord[1] * config.tileSize;
      _this.hatchCanvas.frames = [_this.fetchImgCB("".concat(species.toLowerCase(), "Idle0")), _this.fetchImgCB("".concat(species.toLowerCase(), "Idle1"))];
      _this.hatchCanvas.animate(500);
    });
    _defineProperty(_assertThisInitialized(_this), "redrawDgmn", function (canvas, coord, redrawCB) {
      _this.menuCanvas.ctx.fillStyle = "#00131A";
      _this.menuCanvas.ctx.fillRect(coord[0] * config.tileSize, coord[1] * config.tileSize, 32 * config.screenSize, 32 * config.screenSize);
      _this.menuCanvas.paintCanvas(canvas);
      redrawCB();
    });
    _defineProperty(_assertThisInitialized(_this), "drawIcons", function (dgmnFP, hatchList, selected) {
      var possibleHatches = [];
      var iconsOffset = [1 * config.tileSize, 13 * config.tileSize];
      _this.menuCanvas.ctx.fillStyle = "#00131A";
      _this.menuCanvas.ctx.fillRect(iconsOffset[0], iconsOffset[1], 11 * config.tileSize, 7 * config.screenSize);
      for (var i = 0; i < hatchList.length; i++) {
        var img = void 0;
        if (_this.dgmnUtility.canHatchInto(dgmnFP, hatchList[i])) {
          possibleHatches.push(hatchList[i]);
          img = _this.fetchImgCB('evoIconPositive');
        } else {
          img = _this.fetchImgCB('evoIconNegative');
        }
        _this.menuCanvas.paintImage(img, iconsOffset[0] + i * config.tileSize, iconsOffset[1]);
      }
      _this.menuCanvas.ctx.fillStyle = _this.dgmnUtility.canHatchInto(dgmnFP, hatchList[selected]) ? "#C4CFA1" : "#1D5A4A";
      _this.menuCanvas.ctx.fillRect(iconsOffset[0] + selected * config.tileSize + 3, iconsOffset[1] + 3, 5 * config.screenSize, 4 * config.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "canHatch", function () {
      return _this.dgmnUtility.canHatchInto(_this.eggData.currentFP, _this.hatches[_this.currSelection]);
    });
    _defineProperty(_assertThisInitialized(_this), "nextHatch", function () {
      if (_this.currSelection < _this.hatches.length - 1) {
        _this.currSelection++;
        _this.selectedDgmn = _this.hatches[_this.currSelection];
        _this.drawIcons(_this.eggData, _this.hatches, _this.currSelection);
        _this.drawHatchScreen();
        _this.redrawParentCB();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "prevHatch", function () {
      if (_this.currSelection > 0) {
        _this.currSelection--;
        _this.selectedDgmn = _this.hatches[_this.currSelection];
        _this.drawIcons(_this.eggData, _this.hatches, _this.currSelection);
        _this.drawHatchScreen();
        _this.redrawParentCB();
      }
    });
    _this.fetchImgCB;
    _this.redrawParentCB;
    _this.currSelection = 0;
    _this.selectedDgmn = '';
    _this.hatches;
    _this.eggData;
    _this.redrawCB;
    _this.menuCanvas = new GameCanvas("".concat(_this.label, "-menu"), 160, 144);
    _this.menuCanvas.x = 0;
    _this.menuCanvas.y = 0;
    _this.hatchCanvas;
    _this.statTxtAreas = {
      HP: new TextArea(16, 3, 3, 1, _this.baseXPTxtColorize),
      ATK: new TextArea(16, 4, 3, 1, _this.baseXPTxtColorize),
      DEF: new TextArea(16, 5, 3, 1, _this.baseXPTxtColorize),
      INT: new TextArea(16, 6, 3, 1, _this.baseXPTxtColorize),
      RES: new TextArea(16, 7, 3, 1, _this.baseXPTxtColorize),
      HIT: new TextArea(16, 8, 3, 1, _this.baseXPTxtColorize),
      AVO: new TextArea(16, 9, 3, 1, _this.baseXPTxtColorize),
      SPD: new TextArea(16, 10, 3, 1, _this.baseXPTxtColorize)
    };
    _this.hatchReqsTxt = [new TextArea(2, 11, 3, 1, _this.baseXPTxtColorize), new TextArea(7, 11, 3, 1, _this.baseXPTxtColorize)];
    _this.evoNameTxt = new TextArea(4, 14, 12, 1, _this.baseXPTxtColorize);
    _this.evoAttributeTxt = new TextArea(4, 15, 7, 1, _this.baseXPTxtColorize);
    _this.evoWeakTxt = new TextArea(4, 16, 4, 1, _this.baseXPTxtColorize);
    _this.evoResTxt = new TextArea(12, 16, 3, 1, _this.baseXPTxtColorize);
    _this.dgmnUtility = new DgmnUtility();
    return _this;
  }
  return HatchingEggMenu;
}(IconMenu);

var HatchMenuAH = function HatchMenuAH(cbObj) {
  _classCallCheck(this, HatchMenuAH);
  this.getState = function () {
    return cbObj.getStateCB();
  };
  this.nextHatch = function () {
    return cbObj.nextHatchCB();
  };
  this.prevHatch = function () {
    return cbObj.prevHatchCB();
  };
};

var HatchingMenu = function (_Menu) {
  _inherits(HatchingMenu, _Menu);
  var _super = _createSuper(HatchingMenu);
  function HatchingMenu() {
    var _this;
    _classCallCheck(this, HatchingMenu);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "gotoRewards", function (rewards) {
      _this.currState = 'loading';
      _this.menuCanvas.paintImage(_this.systemAH.fetchImage('battleVictoryRewardsOverlay'), 0, 0);
      _this.actionTxt.timedText(_this.menuCanvas.ctx, 'Choose DGMN Egg to get Rewards!', _this.drawMenu);
      _this.addSubMenu('rewards', new RewardsMenu('rewards'));
      _this.subMenus.rewards.isVisible = true;
      _this.subMenus.rewards.isActive = true;
      _this.subMenus.rewards.fetchImageCB = function (img) {
        return _this.systemAH.fetchImage(img);
      };
      _this.subMenus.rewards.redrawParentCB = function () {
        _this.drawMenu();
      };
      _this.drawEggs();
      _this.subMenus.rewards.drawRewardsList(rewards);
      setTimeout(function () {
        _this.currState = 'rewards';
      }, 1500);
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "drawMenu", function () {
      for (var key in _this.subMenus) {
        if (_this.subMenus[key].isVisible) {
          _this.menuCanvas.paintCanvas(_this.subMenus[key].menuCanvas);
        }
      }
      _this.parentAH.drawDungeon();
    });
    _defineProperty(_assertThisInitialized(_this), "drawEggs", function () {
      _this.menuCanvas.paintImage(_this.systemAH.fetchImage('eggDR'), 2 * config.tileSize, 8 * config.tileSize);
      _this.menuCanvas.paintImage(_this.systemAH.fetchImage('eggJT'), 8 * config.tileSize, 8 * config.tileSize);
      _this.menuCanvas.paintImage(_this.systemAH.fetchImage('eggME'), 14 * config.tileSize, 8 * config.tileSize);
    });
    _defineProperty(_assertThisInitialized(_this), "updateRewardsList", function (rewards, callback) {
      callback();
    });
    _defineProperty(_assertThisInitialized(_this), "gotoHatchEggs", function (eggData) {
      _this.removeSubMenu('rewards');
      _this.currState = 'loading';
      _this.menuCanvas.paintImage(_this.systemAH.fetchImage('hatchingEggOverlay'), 0, 0);
      _this.menuCanvas.ctx.fillStyle = "#00131A";
      _this.menuCanvas.ctx.fillRect(0, 14 * config.tileSize, 20 * config.tileSize, 4 * config.tileSize);
      _this.addSubMenu('hatchEgg', new HatchingEggMenu([1, 13], [], 'hatching-egg'));
      _this.subMenus.hatchEgg.isVisible = true;
      _this.subMenus.hatchEgg.isActive = true;
      _this.subMenus.hatchEgg.fetchImgCB = function (img) {
        return _this.systemAH.fetchImage(img);
      };
      _this.subMenus.hatchEgg.redrawParentCB = function () {
        _this.drawMenu();
      };
      _this.subMenus.hatchEgg.buildHatchingScreen(eggData, _this.parentAH.drawDungeon);
      setTimeout(function () {
        _this.drawContinueCursor(_this.systemAH.fetchImage('continueCursor'), _this.drawMenu);
        _this.currState = 'hatch-choice';
      }, 1000);
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "nextIcon", function () {
      _this.subMenus.hatchEgg.nextHatch();
    });
    _defineProperty(_assertThisInitialized(_this), "prevIcon", function () {
      _this.subMenus.hatchEgg.prevHatch();
    });
    _defineProperty(_assertThisInitialized(_this), "getState", function () {
      return _this.currState;
    });
    _this.currState = '';
    _this.hatchMenuAH = new HatchMenuAH({
      getStateCB: function getStateCB() {
        return _this.getState();
      },
      nextHatchCB: function nextHatchCB() {
        return _this.nextIcon();
      },
      prevHatchCB: function prevHatchCB() {
        return _this.prevIcon();
      }
    });
    _this.hatchingIndex = 0;
    _this.actionTxt = new TextArea(2, 14, 16, 4);
    _this.menuCanvas = new MenuCanvas('hatching', 160, 144);
    return _this;
  }
  return HatchingMenu;
}(Menu);

var DungeonTextCanvas = function (_GameCanvas) {
  _inherits(DungeonTextCanvas, _GameCanvas);
  var _super = _createSuper(DungeonTextCanvas);
  function DungeonTextCanvas() {
    var _this;
    _classCallCheck(this, DungeonTextCanvas);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "drawContinueCursor", function (continueCursorImg, drawCB) {
      _this.continueCursor = new ContinueCursor(continueCursorImg, _this.paintCanvas, drawCB);
      _this.continueCursor.blink();
    });
    _this.dungeonTxt = new TextArea(0, 14, 20, 4);
    return _this;
  }
  return DungeonTextCanvas;
}(GameCanvas);

var Dungeon = function Dungeon(isNewDungeon, loadedCallback) {
  var _this = this;
  _classCallCheck(this, Dungeon);
  _defineProperty(this, "init", function () {
    _this.yourParty = _this.gameAH.getDgmnParty();
    _this.systemAH.startLoading(function () {
      _this.gameAH.addCanvasObject(_this.dungeonCanvas);
      _this.hatchingMenu = new HatchingMenu(_this.systemAH, _this.gameAH, _this.dungeonAH);
      _this.dungeonIO.setMenuAH(_this.hatchingMenu.hatchMenuAH);
      _this.systemAH.loadImages(fieldIcons, function () {
        _this.hatchingMenu.gotoRewards(['DR']);
        _this.drawDungeon();
        _this.systemAH.stopLoading();
      });
    });
  });
  _defineProperty(this, "drawDungeon", function () {
    if (_this.dungeonState === 'hatch') {
      _this.dungeonCanvas.paintCanvas(_this.hatchingMenu.menuCanvas);
    } else if (_this.dungeonState === 'text-box' || _this.dungeonState === 'text-box-next') {
      _this.dungeonCanvas.paintCanvas(_this.textBoxCanvas);
    } else ;
    _this.gameAH.refreshScreen();
  });
  _defineProperty(this, "giveCurrReward", function (dir) {
    var dgmnId;
    var reward = ['DR'];
    if (dir === 'left') {
      dgmnId = _this.yourParty[0];
    } else if (dir === 'up') {
      dgmnId = _this.yourParty[1];
    } else if (dir === 'right') {
      dgmnId = _this.yourParty[2];
    }
    _this.dgmnAH.giveDgmnReward(dgmnId, reward);
    _this.hatchingMenu.updateRewardsList(['DR'], _this.rewardWrapUp);
  });
  _defineProperty(this, "rewardWrapUp", function () {
    var currDgmn = _this.yourParty[_this.hatchingMenu.hatchingIndex];
    var currDgmnData = _this.dgmnAH.getDgmnData(currDgmn, ['eggField', 'currentFP'], false);
    currDgmnData.dgmnId = currDgmn;
    var hatchImages = _this.dgmnUtility.getAllHatchImages(currDgmnData.eggField);
    _this.systemAH.loadImages(hatchImages, function () {
      _this.hatchingMenu.gotoHatchEggs(currDgmnData);
    });
  });
  _defineProperty(this, "hatchEgg", function () {
    if (_this.hatchingMenu.subMenus.hatchEgg.canHatch()) {
      var hatchDgmn = _this.hatchingMenu.subMenus.hatchEgg.selectedDgmn;
      _this.dgmnAH.hatchEgg(_this.yourParty[_this.hatchingMenu.hatchingIndex], hatchDgmn);
      if (_this.hatchingMenu.hatchingIndex == 2) {
        _this.dungeonState = 'loading';
        _this.systemAH.startLoading(function () {
          _this.buildFloor();
          _this.loadDungeonImages(_this.floor.roomMatrix);
        });
      } else {
        _this.hatchingMenu.hatchingIndex++;
        _this.rewardWrapUp();
      }
    }
  });
  _defineProperty(this, "initAH", function (system, game, beetle, dgmn) {
    _this.systemAH = system;
    _this.gameAH = game;
    _this.digiBeetleAH = beetle;
    _this.dgmnAH = dgmn;
  });
  _defineProperty(this, "buildFloor", function () {
    debugLog('Building Floor...');
    _this.floor = new Floor(_this.floorNumber);
    _this.floor.initAH(_this.systemAH, _this.gameAH, _this.dungeonAH);
    _this.floor.generateFloor();
  });
  _defineProperty(this, "loadDungeonImages", function (roomMatrix) {
    var allImages = _this.getRoomImages(roomMatrix);
    for (var img = 0; img < dungeonImages.length; img++) {
      allImages.push(dungeonImages[img]);
    }
    _this.systemAH.loadImages(allImages, function () {
      _this.onDungeonImagesLoaded();
    });
  });
  _defineProperty(this, "getRoomImages", function (roomMatrix) {
    var rooms = [];
    var allImages = [];
    for (var r = 0; r < roomMatrix.length; r++) {
      for (var c = 0; c < roomMatrix[r].length; c++) {
        if (rooms.indexOf(roomMatrix[r][c].roomId) === -1) {
          allImages.push("Dungeon/Rooms/room".concat(roomMatrix[r][c].roomId));
        }
      }
    }
    return allImages;
  });
  _defineProperty(this, "onDungeonImagesLoaded", function () {
    _this.hatchingMenu = null;
    _this.gameAH.addCanvasObject(_this.dungeonCanvas);
    _this.floor.drawFloor();
    _this.floor.checkCollision();
    _this.floor.setFloorToStart();
    _this.digiBeetleAH.init();
    setTimeout(function () {
      _this.systemAH.stopLoading();
      _this.dungeonState = 'free';
    }, 1000);
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
    _this.systemAH.startLoading(function () {
      _this.floorNumber++;
      _this.floor = null;
      _this.buildFloor();
      _this.systemAH.loadImages(_this.getRoomImages(_this.floor.roomMatrix), function () {
        _this.floor.drawFloor();
        _this.floor.checkCollision();
        _this.floor.setFloorToStart();
        setTimeout(function () {
          _this.systemAH.stopLoading();
          _this.dungeonState = 'free';
        }, 1000);
        _this.onLoaded();
      });
    });
  });
  _defineProperty(this, "startBattle", function () {
    debugLog("Starting Battle...");
    _this.moving = 'none';
    _this.dungeonState = 'loading';
    setTimeout(function () {
      _this.systemAH.startLoading(function () {
        _this.gameAH.startBattle();
      });
    }, 500);
  });
  _defineProperty(this, "getTreasure", function (treasure) {
    debugLog("Getting Treasure : ", treasure);
    _this.moving = 'none';
    _this.dungeonState = 'text-box';
    _this.textBoxCanvas.paintImage(_this.systemAH.fetchImage('textBox'));
    var message = 'Found ' + _this.treasureUtility.getTreasureName(treasure) + '!';
    _this.textBoxCanvas.dungeonTxt.instantText(_this.textBoxCanvas.ctx, message, 'white');
    setTimeout(function () {
      _this.digiBeetleAH.addItemToToolBox(treasure);
      _this.dungeonState = 'text-box-next';
      _this.textBoxCanvas.drawContinueCursor(_this.systemAH.fetchImage('continueCursor'), function () {});
      _this.drawDungeon();
    }, 800);
  });
  _defineProperty(this, "closeTextBox", function () {
    _this.textBoxCanvas.clearCanvas();
    _this.dungeonState = 'free';
    _this.floor.redrawFloor();
    _this.drawDungeon();
  });
  _defineProperty(this, "bringUpMenu", function () {
    console.log("MENU TIME");
  });
  _defineProperty(this, "getCurrentFloor", function () {
    return _this.floorNumber;
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
  this.dgmnAH;
  this.dungeonAH = new DungeonAH({
    getCurrentDirectionCB: this.getCurrentDirection,
    setCurrentDirectionCB: this.setCurrentDirection,
    drawDungeonCB: this.drawDungeon,
    paintFloorCanvasCB: this.paintFloorCanvas,
    getDungeonStateCB: this.getDungeonState,
    getMovingCB: this.getMoving,
    setMovingCB: this.setMoving,
    getCollisionCB: this.getCollision,
    setCollisionCB: this.setCollision,
    moveFloorCB: this.moveFloor,
    goUpFloorCB: this.goUpFloor,
    startBattleCB: this.startBattle,
    getCurrentFloorCB: this.getCurrentFloor,
    giveCurrRewardCB: this.giveCurrReward,
    hatchEggCB: this.hatchEgg,
    getTreasureCB: this.getTreasure,
    closeTextBoxCB: this.closeTextBox,
    bringUpMenuCB: this.bringUpMenu
  });
  this.dungeonCanvas = new GameCanvas('dungeon-canvas', 160, 144);
  this.dungeonIO = new DungeonIO(this.dungeonAH);
  this.dgmnUtility = new DgmnUtility();
  this.treasureUtility = new TreasureUtility();
  this.yourParty = [];
  this.floor;
  this.floorNumber = isNewDungeon ? 1 : 0;
  this.dungeonState = 'hatch';
  this.facing = 'down';
  this.moving = 'none';
  this.collision = {
    up: false,
    right: false,
    down: false,
    left: false
  };
  this.hatchingMenu;
  this.textBoxCanvas = new DungeonTextCanvas('dungeon-text', 160, 144);
  this.onLoaded = function () {
    loadedCallback();
  };
}
;

var GameAH = function GameAH(addToObjectListCB, drawGameScreenCB, startBattleCB, getDgmnPartyCB, endBattleCB) {
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
  this.endBattle = function () {
    return endBattleCB();
  };
};

var Game = function Game(systemAH) {
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
    if (keyState[config.keyBindings.start]) {
      _this.keyManager('start');
    } else {
      _this.keyTimers.start = 0;
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
    var _this$battle, _this$dungeon, _this$dungeon2, _this$dungeon3;
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
      if (key === 'start') {
        if (_this.keyTimers[key] === 2) {
          _this.dungeon.dungeonIO.keyTriage(key, upDown);
        }
      } else {
        _this.dungeon.dungeonIO.keyTriage(key, upDown);
      }
    } else if (((_this$dungeon2 = _this.dungeon) === null || _this$dungeon2 === void 0 ? void 0 : _this$dungeon2.dungeonState) === 'hatch' || ((_this$dungeon3 = _this.dungeon) === null || _this$dungeon3 === void 0 ? void 0 : _this$dungeon3.dungeonState) === 'text-box-next') {
      if (_this.keyTimers[key] === 2) {
        _this.dungeon.dungeonIO.keyTriage(key, upDown);
      }
    }
  });
  _defineProperty(this, "startBattle", function () {
    var _this$dungeon4;
    debugLog("Starting Battle...");
    _this.battle = new Battle();
    _this.battle.initAH(_this.systemAH, _this.gameAH, _this.yourDgmn.dgmnAH, (_this$dungeon4 = _this.dungeon) === null || _this$dungeon4 === void 0 ? void 0 : _this$dungeon4.dungeonAH, function () {});
    _this.battle.init();
  });
  _defineProperty(this, "buildDungeon", function () {
    debugLog("Building Dungeon...");
    _this.setupPartyDgmn();
    _this.dungeon = new Dungeon(true, _this.onDungeonLoad);
    _this.digiBeetle = new DigiBeetle();
    _this.digiBeetle.initDungeonAH(_this.dungeon.dungeonAH);
    _this.digiBeetle.initGameAH(_this.gameAH);
    _this.digiBeetle.initSystemAH(_this.systemAH);
    _this.dungeon.initAH(_this.systemAH, _this.gameAH, _this.digiBeetle.digiBeetleAH, _this.yourDgmn.dgmnAH);
    _this.dungeon.init();
  });
  _defineProperty(this, "setupPartyDgmn", function () {
    _this.yourDgmn.buildPartyEggs();
  });
  _defineProperty(this, "onBattleLoad", function () {
    console.log("Battle Loaded...");
    _this.drawGameScreen();
  });
  _defineProperty(this, "onDungeonLoad", function () {
    console.log("Dungeon Loaded...");
    _this.drawGameScreen();
  });
  _defineProperty(this, "endBattle", function () {
    debugLog("Ending Battle...");
    _this.removeFromObjectList(_this.battle.battleCanvas);
    _this.battle = null;
    setTimeout(function () {
      _this.systemAH.stopLoading();
    }, 1000);
    setTimeout(function () {
      _this.dungeon.dungeonState = 'free';
    }, 2000);
  });
  _defineProperty(this, "addToObjectList", function (newObject) {
    if (_this.objectList.indexOf(newObject) === -1) {
      _this.objectList.push(newObject);
    }
  });
  _defineProperty(this, "removeFromObjectList", function (removeObject) {
    if (_this.objectList.indexOf(removeObject) !== -1) {
      _this.objectList.splice(_this.objectList.indexOf(removeObject), 1);
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
  this.gameAH = new GameAH(this.addToObjectList, this.drawGameScreen, this.startBattle, this.getDgmnParty, this.endBattle);
  this.systemAH = systemAH;
  this.yourDgmn = new DgmnManager(this.systemAH);
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
      if (!_this.loadedImages[modName]) {
        loadedImages[modName] = new Image();
        loadedImages[modName].src = "./sprites/".concat(config.pixelKidMode, "/").concat(imageList[i], ".png");
        loadedImages[modName].onload = function () {
          if (++loadedCount >= totalImages) {
            _this.loadedImages = Object.assign(_this.loadedImages, loadedImages);
            callback();
          }
        };
      } else {
        if (++loadedCount >= totalImages) {
          _this.loadedImages = Object.assign(_this.loadedImages, loadedImages);
          callback();
        }
      }
    }
  });
  _defineProperty(this, "modImageName", function (fileName) {
    var modName = fileName.substring(fileName.lastIndexOf('/') + 1);
    return modName;
  });
  _defineProperty(this, "fetchImage", function (imgName) {
    return _this.loadedImages[imgName];
  });
  this.loadQueue = [];
  this.loadedImages = {};
};

var SystemAH = function SystemAH(loadImagesCB, fetchImageCB, startLoadingCB, stopLoadingCB) {
  _classCallCheck(this, SystemAH);
  this.loadImages = function (images, callback) {
    loadImagesCB(images, callback);
  };
  this.fetchImage = function (image) {
    return fetchImageCB(image);
  };
  this.startLoading = function (callback) {
    return startLoadingCB(callback);
  };
  this.stopLoading = function () {
    return stopLoadingCB();
  };
};

var LoadManager = function LoadManager(systemAH) {
  var _this = this;
  _classCallCheck(this, LoadManager);
  _defineProperty(this, "load", function (callback) {
    _this.isLoading = true;
    var frame = 0;
    var loadingInterval = setInterval(function () {
      if (frame >= 9) {
        clearInterval(loadingInterval);
        callback();
      } else {
        frame++;
      }
      _this.loadCanvas.paintImage(_this.systemAH.fetchImage('loading' + frame, 0, 0));
    }, 33);
  });
  _defineProperty(this, "stop", function () {
    var frame = 9;
    var loadingInterval = setInterval(function () {
      if (frame <= 0) {
        _this.isLoading = false;
        clearInterval(loadingInterval);
      } else {
        frame--;
      }
      _this.loadCanvas.clearCanvas();
      _this.loadCanvas.paintImage(_this.systemAH.fetchImage('loading' + frame, 0, 0));
    }, 33);
  });
  this.state = 'inactive';
  this.isLoading = false;
  this.systemAH = systemAH;
  this.loadCanvas = new GameCanvas('load', 160, 144);
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
    _this.imageHandler.addToQueue(genericImages.concat(fontImages$1).concat(loadingImages), function () {
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
  _defineProperty(this, "startLoading", function (callback) {
    _this.loadManager.load(callback);
  });
  _defineProperty(this, "stopLoading", function () {
    _this.loadManager.stop();
  });
  _defineProperty(this, "startGameTimer", function () {
    _this.gameTimer = setInterval(function () {
      _this.systemCount++;
      _this.game.keyHandler(_this.keyState);
      _this.screenCanvas.paintCanvas(_this.game.gameCanvas);
      if (_this.loadManager.isLoading) _this.screenCanvas.paintCanvas(_this.loadManager.loadCanvas);
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
        image.src = "./sprites/".concat(config.pixelKidMode, "/").concat(imgURL, ".png");
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
  this.systemAH = new SystemAH(this.loadImage, this.fetchImage, this.startLoading, this.stopLoading);
  this.controllers = [];
  this.keyState = {};
  this.systemScreen = document.getElementById('game-screen');
  this.systemScreen.style.width = 160 * config.screenSize + 'px';
  this.systemScreen.style.height = 144 * config.screenSize + 'px';
  this.debugMenu;
  this.imageHandler = new ImageHandler();
  this.loadManager = new LoadManager(this.systemAH);
  this.gameTimer;
  this.systemCount = 0;
  this.actionQueue = [];
  this.screenCanvas = new GameCanvas('screen-canvas', 160, 144);
  this.game = new Game(this.systemAH);
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
