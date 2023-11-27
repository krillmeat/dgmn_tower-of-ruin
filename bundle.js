'use strict';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
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

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

var CFG = {
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
var hasFastBattles = function hasFastBattles() {
  return getAllQueryParams().fastbattle === 'true';
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

var SystemAH = function SystemAH(cbObj) {
  _classCallCheck(this, SystemAH);
  this.loadImages = function (images, callback) {
    return cbObj.loadImageCB(images, callback);
  };
  this.fetchImage = function (image) {
    return cbObj.fetchImageCB(image);
  };
  this.startLoading = function (callback) {
    return cbObj.startLoadingCB(callback);
  };
  this.stopLoading = function () {
    return cbObj.stopLoadingCB();
  };
};

var GameAH = function GameAH(cbObj) {
  _classCallCheck(this, GameAH);
  this.addCanvasObject = function (canvas) {
    cbObj.addToObjectListCB(canvas);
  };
  this.refreshScreen = function () {
    cbObj.drawGameScreenCB();
  };
  this.startBattle = function () {
    cbObj.startBattleCB();
  };
  this.getDgmnParty = function () {
    return cbObj.getDgmnPartyCB();
  };
  this.endBattle = function () {
    return cbObj.endBattleCB();
  };
  this.buildDungeon = function () {
    return cbObj.buildDungeonCB();
  };
  this.clearDungeon = function () {
    return cbObj.clearDungeonCB();
  };
  this.startNewGame = function () {
    return cbObj.startNewGameCB();
  };
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
  this.useItemOn = function (dgmnId, item) {
    return cbObj.useItemOnCB(dgmnId, item);
  };
  this.giveUpgrade = function (dgmnId, upgrade, FP) {
    return cbObj.giveUpgradeCB(dgmnId, upgrade, FP);
  };
  this.getDgmnParty = function () {
    return cbObj.getDgmnPartyCB();
  };
  this.buffDgmnStat = function (dgmnId, stat, amount) {
    return cbObj.buffDgmnStatCB(dgmnId, stat, amount);
  };
  this.deBuffDgmnStat = function (dgmnId, stat, amount) {
    return cbObj.deBuffDgmnStatCB(dgmnId, stat, amount);
  };
  this.giveCondition = function (dgmnId, condition) {
    return cbObj.giveConditionCB(dgmnId, condition);
  };
};

var BABY_I_DB = {
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
    evolutions: ['Koro'],
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
      DR: 1,
      NA: 1
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
    attack: 'bubbles',
    hatchFields: {
      JT: 1
    }
  },
  Bubb: {
    stage: 1,
    attr: 'Free',
    stats: {
      HP: 2,
      ATK: 0,
      DEF: 1,
      INT: 1,
      RES: 0,
      HIT: 0,
      AVO: 0,
      SPD: 1
    },
    evolutions: [],
    types: {},
    fields: {
      JT: 1,
      ME: 0
    },
    attack: 'bubbles',
    hatchFields: {
      JT: 1,
      ME: 1
    }
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
  Moku: {
    stage: 1,
    attr: 'Free',
    stats: {
      HP: 2,
      ATK: 0,
      DEF: 0,
      INT: 1,
      RES: 1,
      HIT: 0,
      AVO: 1,
      SPD: 0
    },
    evolutions: ['PetiMera'],
    types: {},
    fields: {
      NA: 1,
      DR: 1
    },
    attack: 'bubbles',
    hatchFields: {
      NA: 1,
      DR: 1
    }
  },
  Pururu: {
    stage: 1,
    attr: 'Free',
    stats: [2, 1, 0, 0, 0, 1, 1, 0],
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
    attack: 'bubbles',
    hatchFields: {
      ME: 1
    }
  },
  Bom: {
    stage: 1,
    attr: 'Free',
    stats: {
      HP: 2,
      ATK: 2,
      DEF: 1,
      INT: 0,
      RES: 0,
      HIT: 0,
      AVO: 0,
      SPD: 0
    },
    evolutions: [],
    types: {},
    fields: {
      ME: 1
    },
    attack: 'bubbles',
    hatchFields: {
      ME: 2
    }
  },
  Pitch: {
    stage: 1,
    attr: 'Free',
    stats: {
      HP: 2,
      ATK: 0,
      DEF: 1,
      INT: 0,
      RES: 1,
      HIT: 0,
      AVO: 1,
      SPD: 0
    },
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
    evolutions: [],
    types: {},
    fields: {
      VB: 1
    },
    attack: 'bubbles'
  }
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

var dgmnDB = _objectSpread2(_objectSpread2({}, BABY_I_DB), {}, {
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
    evolutions: ['Agu', 'ToyAgu'],
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
  Bibi: {
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
    evolutions: ['Pulse'],
    types: {},
    fields: {
      NS: 2
    },
    evoFields: {
      NS: 2
    }
  },
  Pagu: {},
  Poro: {
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
    evolutions: ['Hawk'],
    types: {},
    fields: {
      WG: 2
    },
    evoFields: {
      WG: 2
    }
  },
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
    evolutions: ['Haguru', 'ToyAgu', 'Kote'],
    types: {},
    fields: {
      ME: 2
    },
    evoFields: {
      ME: 2
    }
  },
  Puka: {
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
    evolutions: ['Gani'],
    types: {},
    fields: {
      DS: 2
    },
    evoFields: {
      DS: 2
    }
  },
  Toko: {
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
    evolutions: ['Pata'],
    types: {},
    fields: {
      VB: 2
    },
    evoFields: {
      VB: 2
    }
  },
  PetiMera: {
    stage: 2,
    attr: 'Free',
    stats: {
      HP: 4,
      ATK: 1,
      DEF: 1,
      INT: 2,
      RES: 2,
      HIT: 1,
      AVO: 2,
      SPD: 1
    },
    evolutions: ['Agu'],
    types: {},
    fields: {
      DR: 1,
      NA: 1
    },
    evoFields: {
      DR: 1,
      NA: 2
    }
  },
  Agu: {
    stage: 3,
    attr: 'Vaccine',
    stats: {
      HP: 6,
      ATK: 3,
      DEF: 2,
      INT: 2,
      RES: 2,
      HIT: 3,
      AVO: 2,
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
    "class": 'Data',
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
    "class": 'Vaccine',
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
    "class": 'Vaccine',
    stats: [5, 6, 4, 4, 4, 5, 5, 6],
    evolutions: evolutions['agu'],
    types: {
      earth: 2,
      water: .5
    }
  },
  Lala: {
    stage: 3,
    attr: 'Data',
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
    attr: 'Virus',
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
  ToyAgu: {
    stage: 3,
    attr: 'Vaccine',
    stats: {
      HP: 5,
      ATK: 5,
      DEF: 5,
      INT: 5,
      RES: 5,
      HIT: 5,
      AVO: 5,
      SPD: 5
    },
    evolutions: [],
    types: {},
    fields: {
      ME: 2,
      DR: 1
    },
    evoFields: {
      ME: 3,
      DR: 2
    },
    attack: 'toyFlame'
  },
  Kote: {
    stage: 3,
    attr: 'Data',
    stats: {
      HP: 5,
      ATK: 5,
      DEF: 5,
      INT: 5,
      RES: 5,
      HIT: 5,
      AVO: 5,
      SPD: 5
    },
    evolutions: [],
    types: {},
    fields: {
      ME: 2,
      VB: 1
    },
    evoFields: {
      ME: 3,
      VB: 2
    },
    attack: 'bubbles'
  },
  PicoDevi: {
    stage: 3,
    "class": 'Virus',
    stats: [5, 5, 5, 5, 5, 5, 5, 8],
    evolutions: evolutions['agu'],
    types: {
      holy: 2,
      fire: 1.5
    }
  },
  Grey: {
    stage: 4,
    "class": 'Vaccine',
    stats: [6, 5, 5, 5, 5, 5, 5, 6],
    evolutions: evolutions['agu'],
    types: {
      fire: .5,
      water: 1.5,
      plant: .75,
      evil: 2
    }
  }
});

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
    var imgHeight = image.height / 8 * CFG.screenSize;
    var imgWidth = image.width / 8 * CFG.screenSize;
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
    _this.ctx.clearRect(0, 14 * 8 * CFG.screenSize, 20 * 8 * CFG.screenSize, 4 * 8 * CFG.screenSize);
  });
  this.canvasClass = canvasClass;
  this.x = _x * CFG.screenSize || 0;
  this.y = _y * CFG.screenSize || 0;
  this.width = width * CFG.screenSize;
  this.height = height * CFG.screenSize;
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
      _this.paintImage(_this.frames[0]);
    });
    _defineProperty(_assertThisInitialized(_this), "showFrame", function (frame) {
      _this.isIdle = false;
      _this.clearCanvas();
      _this.paintImage(frame);
    });
    _defineProperty(_assertThisInitialized(_this), "idle", function () {
      _this.isIdle = true;
      _this.showFrame(_this.frames[0]);
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
    animationFrames: [['bubbles1', 1], ['bubbles2', 1], ['bubbles3', 1], ['bubbles4', 1], ['bubbles5', 3], ['bubbles6', 1], ['bubbles7', 1], ['bubbles8', 1], ['blankAttack', 2]],
    animationFrameCount: 8
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
    effect: {
      type: 'buff',
      target: 'self',
      stat: 'SPD',
      amount: 1,
      accuracy: 50
    }
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
  },
  toyFlame: {
    displayName: 'Toy Flame',
    power: 'F',
    maxCost: 8,
    type: 'fire',
    stat: 'physical',
    targets: 'single',
    hits: 1,
    animationFrames: [['toyFlame1', 1], ['toyFlame2', 1], ['toyFlame3', 1], ['toyFlame4', 1]],
    animationFrameCount: 4,
    effect: {
      type: 'buff',
      target: 'self',
      stat: 'DEF',
      amount: 1,
      accuracy: 25
    }
  },
  thunderKote: {
    displayName: 'ThunderKote',
    power: 'F',
    maxCost: 8,
    type: 'elec',
    targets: 'single',
    hits: 1,
    animationFrames: [['thunderKote1', 2], ['thunderKote2', 2], ['thunderKote3', 2], ['thunderKote4', 2], ['thunderKote5', 2], ['thunderKote6', 1], ['thunderKote7', 1], ['thunderKote8', 1], ['thunderKote9', 1], ['thunderKote10', 1], ['thunderKote11', 1], ['thunderKote12', 1]],
    animationFrameCount: 12,
    effect: {
      type: 'buff',
      target: 'self',
      stat: 'HIT',
      amount: 1,
      accuracy: 25
    }
  }
};
var FULL_CONDITION_TEXT = {
  overheat: 'Overheat',
  freeze: 'Freeze',
  virus: 'Virus',
  surge: 'Surge'
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
  _defineProperty(this, "getBuffMessage", function (stat, amount) {
    var AMOUNT = ['', 'a bit.', 'a lot!'];
    return "DGMN ".concat(stat, " went up ").concat(AMOUNT[amount]);
  });
  _defineProperty(this, "getDeBuffMessage", function (stat, amount) {
    var AMOUNT = ['.', 'a bit.', 'a lot!'];
    return "DGMN ".concat(stat, " went down ").concat(AMOUNT[amount]);
  });
  _defineProperty(this, "getConditionMessage", function (condition) {
    return "DGMN was inflicted with ".concat(FULL_CONDITION_TEXT[condition]);
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
  DR: ['Bota', 'Jyari', 'Moku'],
  NS: ['Doki'],
  WG: ['Pururu'],
  ME: ['Choro', 'Bom', 'Bubb'],
  VB: ['Poyo'],
  NA: ['Zuru'],
  JT: ['Yura', 'Bubb'],
  DS: ['Pitch']
};

var FIELD_STATS = {
  DR: 'ATK',
  NS: 'SPD',
  WG: 'HIT',
  DS: 'AVO',
  JT: 'RES',
  ME: 'DEF',
  VB: 'HP',
  NA: 'INT',
  HP: 'VB',
  ATK: 'DR',
  DEF: 'ME',
  INT: 'NA',
  RES: 'JT',
  HIT: 'WG',
  AVO: 'DS',
  SPD: 'NS'
};
var FIELD_LABELS = ['DR', 'NS', 'DS', 'JT', 'NA', 'ME', 'WG', 'VB'];

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
  _defineProperty(this, "getTypeAffinities", function (speciesName) {
    return dgmnDB[speciesName].types;
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
  _defineProperty(this, "getRandomField", function () {
    var FIELDS = ['DR', 'NS', 'WG', 'JT', 'DS', 'ME', 'VB', 'NA'];
    return FIELDS[Math.floor(Math.random() * FIELDS.length)];
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
  _defineProperty(this, "canEvolveIntoAny", function (dgmnFP, currSpecies) {
    var evolutions = _this.getEvolutions(currSpecies);
    var _iterator4 = _createForOfIteratorHelper(evolutions),
        _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var evo = _step4.value;
        if (_this.canEvolveInto(dgmnFP, evo)) return true;
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    return false;
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
  _defineProperty(this, "calcFPStatBoost", function (currentFP, stat) {
    var field = FIELD_STATS[stat];
    return Math.floor(Math.pow(currentFP[field], 1 / 2));
  });
  _defineProperty(this, "getConditionMessage", function (condition) {
    switch (condition) {
      case 'overheat':
        return ' is Overheating';
      default:
        return '';
    }
  });
};

var Dgmn = function Dgmn(id, nickname, speciesName, eggField) {
  var _this = this;
  _classCallCheck(this, Dgmn);
  _defineProperty(this, "initCanvas", function (refreshScreenCB, dgmnImageList, battlePosition) {
    _this.dgmnCanvas = new DgmnCanvas(refreshScreenCB, _this.speciesName, 'dgmn-canvas', 32, 32);
    _this.dgmnCanvas.x = (24 + (_this.isEnemy ? 8 : 72)) * CFG.screenSize;
    _this.dgmnCanvas.y = (16 + battlePosition * 32) * CFG.screenSize;
    _this.dgmnCanvas.frames = dgmnImageList;
    if (_this.isEnemy) {
      _this.dgmnCanvas.flip();
    }
  });
  _defineProperty(this, "startIdleAnimation", function () {
    _this.dgmnCanvas.animate();
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
    _this.currentStats = _this.dgmnUtility.buildInitialStats(_this.speciesName);
    _this.currentHP = _this.currentStats.HP;
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
    var isEvo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    for (var stat in _this.currentStats) {
      var growth = isEvo ? _this.dgmnUtility.getBaseStat(_this.speciesName, stat) : _this.dgmnUtility.getBaseStat(_this.speciesName, stat) + _this.dgmnUtility.calcFPStatBoost(_this.currentFP, stat);
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
  _defineProperty(this, "addFP", function (field, amount) {
    _this.currentFP[field] += amount;
  });
  _defineProperty(this, "learnAttack", function () {
    var newAttack = _this.dgmnUtility.getAttack(_this.speciesName);
    if (newAttack) _this.attacks.unshift(new Attack(newAttack));
  });
  _defineProperty(this, "getAllAttacks", function () {
    return _this.attacks;
  });
  _defineProperty(this, "giveCondition", function (condition) {
    _this.condition = {
      type: condition,
      turns: 0
    };
  });
  _defineProperty(this, "healCondition", function () {
    _this.condition = undefined;
  });
  _defineProperty(this, "buffStat", function (stat, amount) {
    _this.statMods[stat] += amount;
  });
  _defineProperty(this, "debuffStat", function (stat, amount) {
    _this.statMods[stat] -= amount;
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
  this.upgrades = {
    FP: 0,
    EN: 0,
    XP: 0
  };
  this.maxEnergy = 100;
  this.currentLevel = 1;
  this.currentHP = 23;
  this.currentEN = this.maxEnergy;
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
  this.statMods = {
    HP: 1,
    ATK: 1,
    DEF: 1,
    INT: 1,
    RES: 1,
    HIT: 1,
    AVO: 1,
    SPD: 1
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
  this.condition;
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
      dgmnList: ['Poyo']
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
    },
    NS: {
      pre10: 1,
      dgmnList: ['Bibi']
    },
    WG: {
      pre10: 1,
      dgmnList: ['Poro']
    },
    DS: {
      pre10: 1,
      dgmnList: ['Puka']
    },
    JT: {
      pre10: 1,
      dgmnList: ['Bud']
    },
    ME: {
      pre10: 1,
      dgmnList: ['Capri']
    },
    VB: {
      pre10: 1,
      dgmnList: ['Toko']
    },
    NA: {
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
var bossEncoutnersMapDB = [5];
var bossEncountersChartDB = [['Koro', 'Agu', 'Bota']];
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
  Poyo: {
    speciesName: 'Poyo',
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
  Koro: {
    speciesName: 'Koro',
    currentLevel: 3,
    currentStats: {
      HP: 10,
      ATK: 7,
      DEF: 3,
      INT: 3,
      RES: 3,
      HIT: 7,
      AVO: 3,
      SPD: 7
    },
    attacks: [new Attack('bubbles')]
  },
  Capri: {
    speciesName: 'Capri',
    currentLevel: 3,
    currentStats: {
      HP: 10,
      ATK: 7,
      DEF: 7,
      INT: 3,
      RES: 7,
      HIT: 3,
      AVO: 3,
      SPD: 3
    },
    attacks: [new Attack('bubbles')]
  },
  Bud: {
    speciesName: 'Bud',
    currentLevel: 3,
    currentStats: {
      HP: 10,
      ATK: 7,
      DEF: 3,
      INT: 7,
      RES: 7,
      HIT: 3,
      AVO: 3,
      SPD: 3
    },
    attacks: [new Attack('bubbles')]
  },
  Puka: {
    speciesName: 'Puka',
    currentLevel: 3,
    currentStats: {
      HP: 10,
      ATK: 3,
      DEF: 7,
      INT: 3,
      RES: 7,
      HIT: 3,
      AVO: 7,
      SPD: 3
    },
    attacks: [new Attack('bubbles')]
  },
  Bibi: {
    speciesName: 'Bibi',
    currentLevel: 3,
    currentStats: {
      HP: 10,
      ATK: 7,
      DEF: 3,
      INT: 3,
      RES: 3,
      HIT: 3,
      AVO: 7,
      SPD: 7
    },
    attacks: [new Attack('bubbles')]
  },
  Poro: {
    speciesName: 'Poro',
    currentLevel: 3,
    currentStats: {
      HP: 10,
      ATK: 7,
      DEF: 3,
      INT: 3,
      RES: 3,
      HIT: 7,
      AVO: 3,
      SPD: 7
    },
    attacks: [new Attack('bubbles')]
  },
  Toko: {
    speciesName: 'Toko',
    currentLevel: 3,
    currentStats: {
      HP: 10,
      ATK: 7,
      DEF: 3,
      INT: 7,
      RES: 7,
      HIT: 3,
      AVO: 3,
      SPD: 3
    },
    attacks: [new Attack('bubbles')]
  },
  Pagu: {
    speciesName: 'Pagu',
    currentLevel: 3,
    currentStats: {
      HP: 10,
      ATK: 7,
      DEF: 3,
      INT: 7,
      RES: 3,
      HIT: 3,
      AVO: 7,
      SPD: 3
    },
    attacks: [new Attack('bubbles')]
  },
  Agu: {
    speciesName: 'Agu',
    currentLevel: 4,
    currentStats: {
      HP: 102,
      ATK: 12,
      DEF: 6,
      INT: 6,
      RES: 6,
      HIT: 12,
      AVO: 6,
      SPD: 12
    }
  }
};
var bossEncountersDB = {
  Bota: {
    speciesName: 'Bota',
    currentLevel: 3,
    currentStats: {
      HP: 16,
      ATK: 4,
      DEF: 1,
      INT: 1,
      RES: 1,
      HIT: 4,
      AVO: 1,
      SPD: 4
    },
    attacks: [new Attack('bubbles')]
  },
  Koro: {
    speciesName: 'Koro',
    currentLevel: 4,
    currentStats: {
      HP: 56,
      ATK: 9,
      DEF: 4,
      INT: 4,
      RES: 4,
      HIT: 9,
      AVO: 4,
      SPD: 9
    },
    attacks: [new Attack('bubbles')]
  },
  Agu: {
    speciesName: 'Agu',
    currentLevel: 5,
    currentStats: {
      HP: 108,
      ATK: 15,
      DEF: 8,
      INT: 8,
      RES: 8,
      HIT: 15,
      AVO: 8,
      SPD: 15
    },
    attacks: [new Attack('babyFlame')]
  }
};

var dungeonFloorsDB = {
  twoByTwo: [[[5, 6], [7, 8]], [[5, 6], [3, 3]], [[1, 6], [1, 8]], [[5, 13], [7, 2]], [[14, 2], [10, 2]], [[5, 6], [10, 9]], [[4, 4], [10, 9]], [[4, 4], [7, 9]], [[14, 6], [3, 3]]],
  boss: [[[20], [19]]]
};
var dungeonFloorsBossMapDB = [5];
var dungeonRoomsDB = [[[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0],
[0, 1, 16, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 5, 1, 6, 1, 7, 1, 0], [0, 16, 1, 1, 1, 9, 10, 1], [0, 1, 1, 1, 6, 1, 1, 0], [0, 4, 1, 1, 5, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0],
[0, 5, 4, 1, 1, 1, 16, 0], [0, 10, 11, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 5, 1, 0], [1, 1, 1, 7, 1, 1, 16, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 5, 1, 2, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 1, 0, 0, 0, 0],
[0, 1, 6, 1, 6, 1, 1, 0], [0, 1, 1, 1, 1, 8, 1, 0], [0, 1, 7, 1, 1, 1, 1, 0], [0, 5, 1, 15, 1, 1, 4, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 5, 16, 5, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0],
[0, 1, 16, 1, 7, 5, 1, 0], [0, 5, 1, 1, 6, 7, 4, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 11, 1, 1, 1, 1, 0], [0, 1, 1, 6, 1, 1, 5, 0], [0, 1, 1, 1, 1, 11, 1, 0], [0, 0, 0, 1, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0],
[0, 16, 1, 1, 4, 1, 5, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 6, 1, 0], [0, 5, 1, 1, 1, 1, 10, 1], [0, 1, 1, 7, 1, 1, 1, 0], [0, 1, 8, 1, 1, 2, 1, 0], [0, 0, 0, 1, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0],
[0, 16, 1, 2, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 15, 0], [0, 1, 1, 1, 9, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 6, 1, 1, 1, 1, 0], [0, 1, 1, 1, 10, 5, 1, 0], [0, 0, 0, 1, 0, 0, 0, 0]], [[0, 0, 0, 1, 0, 0, 0, 0],
[0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 3, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 5, 1, 1], [0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 2, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 1, 0, 0, 0, 0],
[0, 8, 1, 1, 1, 1, 1, 0], [0, 1, 1, 7, 1, 1, 11, 0], [0, 1, 1, 1, 1, 1, 11, 0], [1, 1, 1, 5, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 8, 1, 15, 1, 1, 4, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 1, 0, 0, 0, 0],
[0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [1, 1, 1, 2, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 1, 0, 0, 0, 0],
[0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 2, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 1, 0, 0, 0, 0],
[0, 8, 1, 1, 1, 1, 1, 0], [0, 1, 1, 7, 1, 1, 11, 0], [0, 1, 1, 1, 1, 1, 11, 0], [1, 1, 1, 5, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 8, 1, 15, 1, 1, 4, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 1, 0, 0, 0, 0],
[0, 8, 1, 1, 1, 1, 1, 0], [0, 1, 1, 7, 1, 1, 11, 0], [0, 1, 1, 1, 1, 1, 11, 0], [1, 1, 1, 5, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0], [0, 8, 1, 15, 1, 1, 4, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 1, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 2, 5], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 11, 1, 1, 1, 1], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 5, 0, 0, 0, 0]], [], [], [], [], [[0, 0, 0, 1, 0, 0, 0, 0],
[0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 2, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 3, 1, 0, 0, 0], [0, 0, 1, 6, 1, 0, 0, 0], [0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0],
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
    var floorNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var floorOptions = dimensions === 'boss' ? dungeonFloorsDB.boss : dungeonFloorsDB[dimensions];
    var selectedFloor = dimensions === 'boss' ? dungeonFloorsBossMapDB.indexOf(floorNumber) : Math.floor(Math.random() * floorOptions.length);
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
    return roomCount * 128 * CFG.screenSize;
  });
  _defineProperty(this, "getTileOffset", function (tileCount) {
    return tileCount * 16 * CFG.screenSize;
  });
  _defineProperty(this, "isOnExactTile", function (dir, canvasX, canvasY) {
    var coord = dir === 'down' || dir === 'up' ? canvasY : canvasX;
    return coord % (16 * CFG.screenSize) === 0 || coord === 0;
  });
  _defineProperty(this, "isOpenTile", function (tileValue) {
    var possibleValues = [1];
    return possibleValues.indexOf(tileValue) !== -1;
  });
  _defineProperty(this, "isBossFloor", function (floorNumber) {
    return floorNumber === 5;
  });
  _defineProperty(this, "getBossRewardLevel", function (floorNumber) {
    if (floorNumber === 10) {
      return 1;
    }
    return 0;
  });
  _defineProperty(this, "getBossAttackLevel", function (floorNumber) {
    switch (floorNumber) {
      case 5:
        return 3;
      case 10:
        return 4;
      default:
        return 1;
    }
  });
};

var FREE_TEAM = [{
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
}, {
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
}, {
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
}];
var DEBUG_DGMN = FREE_TEAM;
var DEBUG_YOUR_TEAM = [{
  speciesName: 'Bota',
  currentStats: {
    HP: 500,
    ATK: 200,
    DEF: 100,
    INT: 200,
    RES: 100,
    HIT: 100,
    AVO: 200,
    SPD: 100
  }
}, {
  speciesName: 'Yura',
  currentStats: {
    HP: 500,
    ATK: 200,
    DEF: 100,
    INT: 200,
    RES: 100,
    HIT: 100,
    AVO: 200,
    SPD: 100
  }
}, {
  speciesName: 'Choro',
  currentStats: {
    HP: 500,
    ATK: 200,
    DEF: 100,
    INT: 200,
    RES: 100,
    HIT: 100,
    AVO: 200,
    SPD: 100
  }
}];

var DEBUG_EASY_WINS = true;
var EnemyGenerator = function EnemyGenerator(dgmnAH) {
  var _this = this;
  _classCallCheck(this, EnemyGenerator);
  _defineProperty(this, "generate", function (currFloor, maxFloor) {
    var enemies = {};
    console.log("Generating Enemies on Floor ", currFloor);
    if (currFloor === 0 && inDebug()) {
      for (var i = 0; i < 3; i++) {
        _this.dgmnAH.createDgmn(i, DEBUG_DGMN[i], true);
      }
      return;
    }
    for (var _i = 0; _i < 3; _i++) {
      var stage = _this.calcDgmnStage(currFloor);
      var field = _this.calcDgmnField();
      var dgmnName = _this.mapUtility.isBossFloor(currFloor) ? bossEncountersChartDB[bossEncoutnersMapDB.indexOf(currFloor)][_i] : _this.calcDgmnName(stage, field);
      var dgmnData = _this.mapUtility.isBossFloor(currFloor) ? bossEncountersDB[dgmnName] : dgmnEncounterDB[dgmnName];
      if (hasFastBattles() && DEBUG_EASY_WINS) dgmnData.currentStats.HP = 1;
      _this.dgmnAH.createDgmn(_i, dgmnData, true);
    }
    return enemies;
  });
  _defineProperty(this, "calcDgmnStage", function (currFloor) {
    if (currFloor < 2) {
      return 1;
    } else if (currFloor === 2 || currFloor === 3) {
      return Math.floor(Math.random() * 100) < 80 ? 1 : 2;
    } else if (currFloor === 4) {
      return Math.floor(Math.random() * 100) < 60 ? 2 : 1;
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
  this.mapUtility = new MapUtility();
};

var itemsDB = {
  smallMeat: {
    displayName: 'Meat S',
    usable: ['battle', 'dungeon'],
    target: 'party',
    hitsAll: false,
    description: 'Heal HP of 1 DGMN by 10',
    effect: {
      type: 'heal',
      stat: 'HP',
      amount: 10
    }
  },
  atkPluginC: {
    displayName: 'ATK+ C',
    usable: ['battle'],
    target: 'party',
    hitsAll: false,
    description: 'Boost 1 DGMN ATK by 1 in Battle'
  },
  boosterDRs: {
    displayName: '1 DR FP',
    usable: ['dungeon'],
    target: 'party',
    hitsAll: false,
    description: 'Give 1 DGMN 1 Dragon Roar Field Point',
    effect: {
      type: 'booster',
      field: 'DR',
      amount: 1
    }
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
var itemByName = {
  "Meat S": 'smallMeat',
  "ATK+ C": 'atkPluginC',
  "1 DR FP": 'boosterDRs'
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
  _defineProperty(this, "getItemEffect", function (item) {
    return itemsDB[item].effect;
  });
  _defineProperty(this, "getTreasureName", function (treasure) {
    return itemsDB[treasure].displayName;
  });
  _defineProperty(this, "isTreasureUsable", function (treasure, location) {
    return itemsDB[treasure].usable.indexOf(location) !== -1;
  });
  _defineProperty(this, "getItemTarget", function (treasure) {
    return itemsDB[treasure].target;
  });
  _defineProperty(this, "getItemDescription", function (treasure) {
    return itemsDB[treasure].description;
  });
}
;

var DgmnManager = function DgmnManager(systemAH) {
  var _this = this;
  _classCallCheck(this, DgmnManager);
  _defineProperty(this, "mockParty", function () {
    return ['dId0', 'dId1', 'dId2'];
  });
  _defineProperty(this, "createDgmn", function (index, data, isEnemy) {
    if (isEnemy) {
      _this.enemyDgmn["edId".concat(index)] = new Dgmn(index, "Enemy", data.speciesName);
      _this.enemyDgmn["edId".concat(index)].isEnemy = true;
      _this.enemyDgmn["edId".concat(index)].currentLevel = data.currentLevel;
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
      if (_this[party][target].currentHP <= 0) {
        _this.killDgmn(party, target);
        return true;
      }
    }
    return false;
  });
  _defineProperty(this, "killDgmn", function (party, target) {
    _this.showDgmnFrame(target, 'dead');
    _this[party][target].isDead = true;
    _this[party][target].currentHP = 0;
    _this[party][target].currentEN = 0;
    _this[party][target].combo = 0;
    _this[party][target].weak = 0;
  });
  _defineProperty(this, "battleWrapUp", function (dgmnId) {
    var leveledUp = _this.checkLevelUp(dgmnId);
    return leveledUp;
  });
  _defineProperty(this, "giveDgmnReward", function (dgmnId, reward) {
    debugLog('  - Give ' + dgmnId + ' reward: ' + reward);
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
    _this.allDgmn[dgmnId].currentXP = _this.allDgmn[dgmnId].currentXP - _this.dgmnUtility.checkLevelReq(_this.allDgmn[dgmnId].currentLevel);
    _this.allDgmn[dgmnId].currentLevel++;
    _this.allDgmn[dgmnId].levelUpStats();
    _this.allDgmn[dgmnId].levelUpFP();
    debugLog(_this.allDgmn[dgmnId].nickname + " Leveled Up!");
    debugLog("  - New FP: ", _this.allDgmn[dgmnId].currentFP);
  });
  _defineProperty(this, "evolve", function (dgmnId, evoSpecies) {
    console.log(dgmnId + " is Evolving into " + evoSpecies);
    _this.allDgmn[dgmnId].speciesName = evoSpecies;
    _this.allDgmn[dgmnId].levelUpStats(true);
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
  _defineProperty(this, "useItemOn", function (dgmnId, item) {
    debugLog('Using ' + item + ' on ' + dgmnId);
    var itemEffect = _this.itemUtility.getItemEffect(item);
    if (itemEffect.type === 'heal') {
      if (itemEffect.stat === 'HP') {
        debugLog('  - Healing ' + dgmnId + ' by ' + itemEffect.amount);
        _this.allDgmn[dgmnId].heal(itemEffect.amount);
      }
    } else if (itemEffect.type === 'booster') {
      _this.allDgmn[dgmnId].addFP(itemEffect.field, itemEffect.amount);
    }
  });
  _defineProperty(this, "giveUpgrade", function (dgmnId, upgrade) {
    var FP = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    _this['upgrade' + upgrade](dgmnId, FP);
  });
  _defineProperty(this, "buffDgmnStat", function (dgmnId, stat, amount) {
    _this.dgmnUtility.isEnemy(dgmnId) ? _this.enemyDgmn[dgmnId].buffStat(stat, amount) : _this.allDgmn[dgmnId].buffStat(stat, amount);
  });
  _defineProperty(this, "deBuffDgmnStat", function (dgmnId, stat, amount) {
    _this.dgmnUtility.isEnemy(dgmnId) ? _this.enemyDgmn[dgmnId].debuffStat(stat, amount) : _this.allDgmn[dgmnId].debuffStat(stat, amount);
  });
  _defineProperty(this, "upgradeFP", function (dgmnId, FP) {
    debugLog("  Upgrade FP: ", FP);
    _this.allDgmn[dgmnId].upgrades.FP++;
    _this.allDgmn[dgmnId].permFP[FP]++;
  });
  _defineProperty(this, "upgradeXP", function (dgmnId) {
    debugLog("  Upgrading XP");
    _this.allDgmn[dgmnId].upgrades.XP++;
  });
  _defineProperty(this, "upgradeEN", function (dgmnId) {
    debugLog("  Upgrading EN");
    _this.allDgmn[dgmnId].upgrades.EN++;
    _this.allDgmn[dgmnId].maxEnergy += 5;
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
  _defineProperty(this, "getDgmnParty", function () {
    return _this.party;
  });
  _defineProperty(this, "getTempDgmn", function () {
    return _this.tempDgmn;
  });
  _defineProperty(this, "giveCondition", function (dgmnId, condition) {
    return _this[_this.getParty(dgmnId)][dgmnId].giveCondition(condition);
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
    hatchEggCB: this.hatchEgg,
    useItemOnCB: this.useItemOn,
    giveUpgradeCB: this.giveUpgrade,
    getDgmnPartyCB: this.getDgmnParty,
    buffDgmnStatCB: this.buffDgmnStat,
    deBuffDgmnStatCB: this.deBuffDgmnStat,
    giveConditionCB: this.giveCondition
  });
  this.systemAH = systemAH;
  this.enemyGenerator = new EnemyGenerator(this.dgmnAH);
  this.enemyDgmn = {};
  this.party = this.mockParty();
  this.tempDgmn = new Dgmn(0, 'EVO', 'Bota');
  this.dgmnUtility = new DgmnUtility();
  this.itemUtility = new TreasureUtility();
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
  this.removeItemFromToolBox = function (index) {
    return cbObj.removeItemFromToolBoxCB(index);
  };
  this.getToolBoxItems = function () {
    return cbObj.getToolBoxItemsCB();
  };
  this.getToolBoxType = function () {
    return cbObj.getToolBoxTypeCB();
  };
  this.hideCanvas = function () {
    return cbObj.hideCanvasCB();
  };
  this.showCanvas = function () {
    return cbObj.showCanvasCB();
  };
  this.isToolBoxFull = function () {
    return cbObj.isToolBoxFullCB();
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
var genericImages = ['Menus/miniCursor', 'Menus/cursor', 'Menus/cursorLeft', 'Menus/cursorRight', 'Icons/targetAll', 'Icons/targetOne', 'Icons/comboFIcon', 'Icons/pwrFIcon', 'Icons/pwrEIcon', 'Icons/pwrDIcon', 'Icons/pwrCIcon', 'Icons/oneHitIcon', 'Icons/costMeter100', 'Icons/costMeter75', 'Icons/costMeter50', 'Icons/costMeter25', 'Icons/costMeter0', 'Menus/continueCursor', 'Battle/Menus/evoIconPositive', 'Battle/Menus/evoIconNegative', 'Battle/Menus/battleLevelUpOverlay', 'Battle/Menus/battleEvolutionOverlay', 'Battle/Menus/battleVictoryRewardsOverlay', 'Eggs/eggDR', 'Eggs/eggJT', 'Eggs/eggME', 'Menus/hatchingEggOverlay', 'Menus/textBox', 'Menus/basicMenu', 'Icons/Pause/itemsSelected', 'Icons/Pause/itemsDeselected', 'Icons/Pause/itemsDisabled', 'Icons/Pause/beetleDeselected', 'Icons/Pause/beetleSelected', 'Menus/itemsTargetOverlay', 'Icons/rewardIconDeselected', 'Icons/rewardIconSelected', 'Icons/rewardIconNull', 'Icons/rewardIconFull', 'Menus/bossRewardFieldChoice', 'Menus/titleScreen', 'DGMN/beetlePortrait', 'Menus/bossRewardMenu'];
var loadingImages = ['Loading/loading0', 'Loading/loading1', 'Loading/loading2', 'Loading/loading3', 'Loading/loading4', 'Loading/loading5', 'Loading/loading6', 'Loading/loading7', 'Loading/loading8', 'Loading/loading9', 'Loading/loading10'];
var fontImages$1 = ['Fonts/fontsBlack', 'Fonts/fontsWhite', 'Fonts/fontsLightGreen', 'Fonts/fontsDarkGreen'];
var typeIcons = ['Icons/Types/noneTypeIcon', 'Icons/Types/fireTypeIcon', 'Icons/Types/windTypeIcon', 'Icons/Types/plantTypeIcon', 'Icons/Types/elecTypeIcon', 'Icons/Types/evilTypeIcon', 'Icons/Types/metalTypeIcon', 'Icons/Types/waterTypeIcon'];
var fieldIcons = ['Icons/Fields/fieldDRIcon', 'Icons/Fields/fieldNSIcon', 'Icons/Fields/fieldWGIcon', 'Icons/Fields/fieldVBIcon', 'Icons/Fields/fieldMEIcon', 'Icons/Fields/fieldJTIcon', 'Icons/Fields/fieldNAIcon', 'Icons/Fields/fieldDSIcon'];
var battleImages = ['Attacks/blankAttack', 'Battle/battleBackground', 'Battle/Menus/attackDeselected', 'Battle/Menus/attackSelected', 'Battle/Menus/defendDeselected', 'Battle/Menus/defendSelected', 'Battle/Menus/statsDeselected', 'Battle/Menus/statsSelected', 'Icons/Battle/weak0', 'Icons/Battle/weak1', 'Icons/Battle/weak2', 'Icons/Battle/weak3', 'DGMN/dgmnDead', 'Battle/Menus/dgmnBarLightGreen', 'Battle/Menus/dgmnBarDarkGreen', 'Battle/Menus/battleOptionSelectBaseRight', 'Battle/Menus/battleVictoryOverlay', 'Icons/xpIconSmall', 'Icons/xpIconLarge', 'Menus/bossRewardMenu', 'Battle/Menus/dgmnDeselected', 'Battle/Menus/dgmnSelected', 'Battle/Menus/cannonDeselected', 'Battle/Menus/cannonSelected', 'Battle/Menus/runDeselected', 'Battle/Menus/runSelected', 'Battle/Menus/battleCannonOverlay', 'Battle/Menus/cannonDisabled', 'Icons/Battle/statBuff', 'Icons/Battle/statDebuff', 'Icons/Battle/overheatCondition'];
var townImages = ['Town/Menus/town_menu_background'];
var townDgmnPortraits = ['DGMN/tokoPortrait'];

var toolBoxDB = {
  dodo: {
    size: 4
  }
};

var DigiBeetleUtility = function DigiBeetleUtility() {
  _classCallCheck(this, DigiBeetleUtility);
  _defineProperty(this, "getToolBoxMax", function (box) {
    return toolBoxDB[box].size;
  });
};

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
  _defineProperty(this, "hideCanvas", function () {
    _this.digiBeetleCanvas.x = -1000;
  });
  _defineProperty(this, "showCanvas", function () {
    _this.digiBeetleCanvas.x = 64 * CFG.screenSize;
  });
  _defineProperty(this, "addItemToToolBox", function (item) {
    _this.toolBox.items.push(item);
    debugLog("Toolbox : ", _this.toolBox.items);
  });
  _defineProperty(this, "removeItemFromToolBox", function (index) {
    _this.toolBox.items.splice(index, 1);
    debugLog("Removed Item || Toolbox : ", _this.toolBox.items);
  });
  _defineProperty(this, "isToolBoxFull", function () {
    var maxItems = _this.digiBeetleUtility.getToolBoxMax(_this.toolBox.version);
    return _this.toolBox.items.length >= maxItems;
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
  _defineProperty(this, "getToolBoxItems", function () {
    return _this.toolBox.items;
  });
  _defineProperty(this, "getToolBoxType", function () {
    return _this.toolBox.version;
  });
  _defineProperty(this, "onLoaded", function () {});
  this.digiBeetleAH = new DigiBeetleAH({
    initCB: this.init,
    addItemToToolBoxCB: this.addItemToToolBox,
    getToolBoxItemsCB: this.getToolBoxItems,
    hideCanvasCB: this.hideCanvas,
    showCanvasCB: this.showCanvas,
    getToolBoxTypeCB: this.getToolBoxType,
    removeItemFromToolBoxCB: this.removeItemFromToolBox,
    isToolBoxFullCB: this.isToolBoxFull
  });
  this.dungeonAH;
  this.gameAH;
  this.systemAH;
  this.digiBeetleCanvas;
  this.digiBeetleUtility = new DigiBeetleUtility();
  this.toolBox = {
    version: 'dodo',
    items: ['smallMeat']
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
  this.drawActionText = function (species, message, eMessage) {
    cbObj.drawActionTextCB(species, message, eMessage);
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
  this.selectBossReward = function () {
    return cbObj.selectBossRewardCB();
  };
  this.closeGrowthMenu = function () {
    return cbObj.closeGrowthMenuCB();
  };
  this.shootCannon = function (item, target) {
    return cbObj.shootCannonCB(item, target);
  };
};

var BattleUtility = function BattleUtility() {
  _classCallCheck(this, BattleUtility);
  _defineProperty(this, "getDefaultBattleImages", function () {
    return battleImages.concat(fieldIcons);
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
  _defineProperty(this, "hasBuffedStat", function (statMods) {
    for (var statMod in statMods) {
      if (statMods[statMod] > 1) return true;
    }
    return false;
  });
  _defineProperty(this, "hasDebuffedStat", function (statMods) {
    for (var statMod in statMods) {
      if (statMods[statMod] < 1) return true;
    }
    return false;
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
  _defineProperty(this, "dimLeadingZeros", function (_char, message, index) {
    if (_char !== '0') return 'none';
    if (index === 0 && _char === '0') return 'darkGreen';
    for (var i = 0; i <= index; i++) {
      if (message[i] !== '0') return 'none';
      if (i === index) return 'darkGreen';
    }
    return 'none';
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
      _this.menuAH = ah;
    });
    _defineProperty(_assertThisInitialized(_this), "actionKeyHandler", function (upDown) {
      if (_this.battleAH.getBattleState() === 'battle') {
        if (_this.menuAH.getCurrMenuType() === 'icon') {
          _this.menuAH.selectIcon();
        } else if (_this.menuAH.getCurrMenuType() === 'list') {
          _this.menuAH.selectListItem();
        } else if (_this.menuAH.getState() === 'victory') {
          _this.battleAH.gotoRewards();
        }
      } else if (_this.battleAH.getBattleState() === 'victory') {
        if (_this.menuAH.getState() === 'level-next') {
          _this.menuAH.confirmLevelUp();
        } else if (_this.menuAH.getState() === 'evo-choice') {
          _this.menuAH.selectEvo();
        } else if (_this.menuAH.getState() === 'boss-reward') {
          _this.menuAH.selectBossReward();
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "cancelKeyHandler", function (upDown) {
      _this.menuAH.goBack();
    });
    _defineProperty(_assertThisInitialized(_this), "upKeyHandler", function (upDown) {
      if (upDown === 'down') {
        if (_this.battleAH.getBattleState() === 'battle') {
          if (_this.menuAH.getCurrMenuType() === 'list') {
            _this.menuAH.prevListItem();
          }
        } else if (_this.battleAH.getBattleState() === 'victory') {
          if (_this.menuAH.getState() === 'rewards') {
            _this.menuAH.giveCurrReward('up');
          } else if (_this.menuAH.getState() === 'boss-reward') {
            _this.menuAH.prevBossReward();
          }
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "rightKeyHandler", function (upDown) {
      if (upDown === 'down') {
        if (_this.battleAH.getBattleState() === 'battle') {
          if (_this.menuAH.getCurrMenuType() === 'icon') {
            _this.menuAH.nextIcon();
          }
        } else if (_this.battleAH.getBattleState() === 'victory') {
          if (_this.menuAH.getState() === 'rewards') {
            _this.menuAH.giveCurrReward('right');
          } else if (_this.menuAH.getState() === 'evo-choice') _this.menuAH.nextEvo();
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "downKeyHandler", function (upDown) {
      if (upDown === 'down') {
        if (_this.battleAH.getBattleState() === 'battle') {
          if (_this.menuAH.getCurrMenuType() === 'list') {
            _this.menuAH.nextListItem();
          }
        } else if (_this.battleAH.getBattleState() === 'victory') {
          if (_this.menuAH.getState() === 'boss-reward') _this.menuAH.nextBossReward();
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "leftKeyHandler", function (upDown) {
      if (upDown === 'down') {
        if (_this.battleAH.getBattleState() === 'battle') {
          if (_this.menuAH.getCurrMenuType() === 'icon') {
            _this.menuAH.prevIcon();
          }
        } else if (_this.battleAH.getBattleState() === 'victory') {
          if (_this.menuAH.getState() === 'rewards') {
            _this.menuAH.giveCurrReward('left');
          } else if (_this.menuAH.getState() === 'evo-choice') _this.menuAH.prevEvo();
        }
      }
    });
    _this.battleAH = battleAH;
    _this.menuAH;
    _this.victoryMenuAH;
    _this.menuAH;
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

var Menu = function Menu(systemAH, gameAH, parentAH, menuLabel) {
  var _this = this;
  _classCallCheck(this, Menu);
  _defineProperty(this, "init", function (backImage) {
    if (backImage) _this.menuCanvas.paintImage(_this.systemAH.fetchImage(backImage), 0, 0);
  });
  _defineProperty(this, "addSubMenu", function (label, menu) {
    _this.subMenus[label] = menu;
  });
  _defineProperty(this, "removeSubMenu", function (label) {
    if (_this.subMenus[label]) delete _this.subMenus[label];
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
          deselected: _this.systemAH.fetchImage("".concat(label, "Deselected")),
          disabled: _this.systemAH.fetchImage("".concat(label, "Disabled"))
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
  _defineProperty(this, "attachImageCallbacks", function (label) {
    _this.subMenus[label].fetchImageCB = function (img) {
      return _this.systemAH.fetchImage(img);
    };
    _this.subMenus[label].redrawParentCB = function () {
      _this.drawMenu();
    };
  });
  _defineProperty(this, "drawBackground", function (imageName) {
    _this.menuCanvas.paintImage(_this.systemAH.fetchImage(imageName), 0, 0);
  });
  _defineProperty(this, "getState", function () {
    return _this.currState;
  });
  this.currState = 'loading';
  this.currSubMenu;
  this.subMenus = {};
  this.menuLabel = menuLabel;
  this.systemAH = systemAH;
  this.gameAH = gameAH;
  this.parentAH = parentAH;
  this.menuCanvas = new GameCanvas(menuLabel, 160, 144);
  this.menuUtility = new MenuUtility();
}
;

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
        if (_this.disabledIcons.indexOf(_this.iconList[i]) !== -1) img = _this.images[_this.iconList[i]].disabled;
        _this.menuCanvas.paintImage(img, i * 16 * CFG.screenSize, 0);
      }
    });
    _this.currIcon = 0;
    _this.menuChart;
    _this.iconList = iconList;
    _this.images;
    _this.coord = coord;
    _this.disabledIcons = [];
    _this.menuCanvas = new GameCanvas("".concat(_this.label, "-menu"), _this.iconList.length * 16, 16);
    _this.menuCanvas.x = coord[0] * 8 * CFG.screenSize;
    _this.menuCanvas.y = coord[1] * 8 * CFG.screenSize;
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
  period: [14, 4],
  dash: [8, 3],
  plus: [10, 3]
};
var fontImages = [];

var TextArea = function TextArea(x, y, width) {
  var _this = this;
  var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var colorizeCB = arguments.length > 4 ? arguments[4] : undefined;
  _classCallCheck(this, TextArea);
  _defineProperty(this, "instantText", function (ctx, message, color) {
    var wordArray = message.split(" ");
    var row = 0;
    var col = 0;
    for (var w = 0; w < wordArray.length; w++) {
      var charArray = _this.createCharArray(wordArray[w]);
      for (var c = 0; c < charArray.length; c++) {
        var modColor = _this.colorizeCB ? _this.colorizeCB(charArray[c], wordArray[w], c) : color;
        modColor = modColor === undefined || modColor === 'none' ? color : modColor;
        _this.drawChar(ctx, charArray[c], col, row, modColor);
        row = col + 1 >= _this.width ? row + 1 : row;
        col = col + 1 >= _this.width ? 0 : col + 1;
      }
      if (col !== 0) {
        _this.drawChar(ctx, 'space', col, row, color);
        col++;
        if (col >= _this.width) row = 0;
      }
      if (wordArray[w] < wordArray.length && wordArray[w].length + col > _this.width) {
        row++;
        col = 0;
      }
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
    }, CFG.textSpeed * 33);
  });
  _defineProperty(this, "multiText", function (ctx, messages, drawCB, beforeEach) {
    beforeEach();
    var currentMessage = messages[0];
    _this.timedText(ctx, currentMessage, drawCB);
    messages.splice(0, 1);
    setTimeout(function () {
      if (messages && messages.length !== 0 && messages[0]) _this.multiText(ctx, messages, drawCB, beforeEach);
    }, (currentMessage.length + 10) * 50);
  });
  _defineProperty(this, "drawChar", function (ctx, _char2) {
    var col = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var row = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'white';
    if (!ctx || !_char2) {
      warningLog('drawChar is missing a parameter');
      return;
    }
    var coord = _this.getCharCoordinates(_char2);
    ctx.drawImage(_this.colorImages[color], coord[0] * 64, coord[1] * 64, 64, 64, (col + _this.x) * CFG.tileSize, (row + _this.y) * CFG.tileSize, CFG.tileSize, CFG.tileSize);
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
      } else if (_char3 === "-") {
        modifiedCharArray[i] = "dash";
      } else if (_char3 === '+') {
        modifiedCharArray[i] = "plus";
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
  } : undefined;
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
      for (var i = 0; i < _this.listItems.length; i++) {
        var listItemTxt = new TextArea(1 + _this.cursorOffset, i, _this.width - 1, 1);
        listItemTxt.instantText(_this.menuCanvas.ctx, _this.listItems[i], 'white');
      }
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
      _this.menuCanvas.ctx.fillStyle = "#00131A";
      _this.menuCanvas.ctx.fillRect(0, 0, CFG.tileSize, _this.itemAmount * _this.itemHeight * CFG.tileSize);
      _this.menuCanvas.paintImage(_this.cursorImg, 0, spotIndex % _this.itemAmount * (8 * _this.itemHeight) * CFG.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawMenu", function () {
      _this.drawBackImg();
      _this.drawList();
      _this.drawCursor();
    });
    _defineProperty(_assertThisInitialized(_this), "drawScrollBar", function () {
      var barMax = 8 * CFG.screenSize * _this.itemHeight * _this.itemAmount;
      var barHeight = barMax / Math.ceil(_this.listItems.length / _this.itemAmount);
      var barX = _this.menuCanvas.width - 8 * CFG.screenSize;
      var barY = barHeight * (Math.ceil((_this.currIndex + 1) / _this.itemAmount) - 1);
      barY = barY < 0 ? 0 : barY;
      _this.menuCanvas.ctx.fillStyle = "#6CA66C";
      _this.menuCanvas.ctx.fillRect(barX + 2 * CFG.screenSize, barY + 1 * CFG.screenSize, 5 * CFG.screenSize, barHeight - 3 * CFG.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "getYOffsetForIndex", function (listIndex) {
      return _this.itemHeight * listIndex * 8 * CFG.screenSize;
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
    _this.cursorOffset = 0;
    _this.menuCanvas = new GameCanvas("".concat(_this.label, "-menu"), listWidth * 8, itemAmount * (itemHeight * 8));
    _this.menuCanvas.x = (coord === null || coord === void 0 ? void 0 : coord[0]) * 8 * CFG.screenSize || 0;
    _this.menuCanvas.y = (coord === null || coord === void 0 ? void 0 : coord[1]) * 8 * CFG.screenSize || 0;
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
        attack.textArea = new TextArea(1, i * 2, 14, 1);
        attack.textArea.instantText(_this.menuCanvas.ctx, attack.displayName, "white");
        _this.drawCostMeter(i, attack.maxCost, attack.currCost);
        _this.drawTypeIcon(i, attack.type);
        _this.drawPowerIcon(i, attack.power);
        _this.drawTargetsIcon(i, attack.targets);
        _this.drawHitsIcon(i, attack.hits);
      }
      _this.drawScrollBar();
    });
    _defineProperty(_assertThisInitialized(_this), "drawCursor", function (index) {
      var spotIndex = index ? index : _this.currIndex;
      _this.menuCanvas.paintImage(_this.cursorImg, 0, spotIndex % _this.itemAmount * (8 * _this.itemHeight) * CFG.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawTypeIcon", function (listIndex, type) {
      _this.menuCanvas.paintImage(_this.fetchImage("".concat(type, "TypeIcon")), 88 * CFG.screenSize, _this.getYOffsetForIndex(listIndex) + 8 * CFG.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawPowerIcon", function (listIndex, power) {
      _this.menuCanvas.paintImage(_this.fetchImage("pwr".concat(power, "Icon")), 96 * CFG.screenSize, _this.getYOffsetForIndex(listIndex) + 8 * CFG.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawTargetsIcon", function (listIndex, targets) {
      var imageName = targets === 'single' ? 'targetOne' : 'targetAll';
      _this.menuCanvas.paintImage(_this.fetchImage(imageName), 104 * CFG.screenSize, _this.getYOffsetForIndex(listIndex) + 8 * CFG.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawHitsIcon", function (listIndex, hits) {
      _this.menuCanvas.paintImage(_this.fetchImage('oneHitIcon'),
      112 * CFG.screenSize, _this.getYOffsetForIndex(listIndex) + 8 * CFG.screenSize);
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
        _this.menuCanvas.ctx.drawImage(_this.fetchImage("costMeter".concat(100 + _final)), (1 + i) * (8 * CFG.screenSize), (1 + listIndex * 2) * (8 * CFG.screenSize), 8 * CFG.screenSize, 8 * CFG.screenSize);
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
  this.getMenuLabel = function () {
    return cbObj.getMenuLabelCB();
  };
  this.goBack = function () {
    return cbObj.goBackCB();
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
      _this.ctx.clearRect(0, 8 * CFG.screenSize, 160 * CFG.screenSize, 8 * CFG.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "setTopMessage", function (message) {
      _this.clearTopMessage();
      _this.topTxt.instantText(_this.ctx, message, 'white');
    });
    _defineProperty(_assertThisInitialized(_this), "clearBottomSection", function () {
      _this.ctx.clearRect(0, 14 * 8 * CFG.screenSize, 20 * 8 * CFG.screenSize, 4 * 8 * CFG.screenSize);
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
      _this.ctx.drawImage(portraitImg, 0, 0, 256, 248, 0, 112 * CFG.screenSize, 32 * CFG.screenSize, (32 - 1) * CFG.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawMenuButtons", function (selected, images, coord) {
      var buttonCount = Object.keys(images).length;
      _this.ctx.clearRect(coord[0] * 8 * CFG.screenSize, coord[1] * 8 * CFG.screenSize, buttonCount * 16 * CFG.screenSize, 16 * CFG.screenSize);
      var offset = 0;
      for (var image in images) {
        var img = image === selected ? images[image].selected : images[image].deselected;
        _this.ctx.drawImage(img, (offset * 16 + coord[0] * 8) * CFG.screenSize, coord[1] * 8 * CFG.screenSize, 16 * CFG.screenSize, 16 * CFG.screenSize);
        offset++;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "paintCurrentCursor", function (battleIndex, image) {
      _this.paintImage(image, 80 * CFG.screenSize, (24 + battleIndex * 32) * CFG.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "clearCurrentCursors", function (isEnemy) {
      var xOffset = !isEnemy ? 72 : 56;
      _this.ctx.clearRect(xOffset * CFG.screenSize, 16 * CFG.screenSize, 24 * CFG.screenSize, 96 * CFG.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "setCurrentTargetCursor", function (battleIndex, image) {
      _this.clearCurrentCursors(true);
      _this.paintImage(image, 64 * CFG.screenSize, (battleIndex * 32 + 24) * CFG.screenSize);
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
    _this.beetleNicknameTxt = new TextArea(4, 14, 10);
    _this.beetleTxt = new TextArea(4, 15, 10);
    return _this;
  }
  return BattleMenuCanvas;
}(GameCanvas);

var TargetSelect = function (_ListMenu) {
  _inherits(TargetSelect, _ListMenu);
  var _super = _createSuper(TargetSelect);
  function TargetSelect(side, hitsAll, dgmnIsDeadCB, parentCTX) {
    var _this;
    _classCallCheck(this, TargetSelect);
    for (var _len = arguments.length, args = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
      args[_key - 4] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "drawCursor", function (index) {
      var spotIndex = index ? index : _this.currIndex;
      _this.menuCanvas.paintImage(_this.cursorImg, 0, spotIndex % _this.itemAmount * (8 * _this.itemHeight) * CFG.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawMenu", function () {
      var startingIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      _this.menuCanvas.clearCanvas();
      if (_this.hitsAll) {
        _this.drawAllCursors(true);
      } else {
        _this.drawCursor(startingIndex);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "clearAllCursors", function () {
      if (_this.side === 'enemy') {
        _this.parentCTX.clearRect(8 * 8 * CFG.screenSize, 2 * 8 * CFG.screenSize, 2 * 8 * CFG.screenSize, 12 * 8 * CFG.screenSize);
      } else {
        _this.parentCTX.clearRect(10 * 8 * CFG.screenSize, 2 * 8 * CFG.screenSize, 2 * 8 * CFG.screenSize, 12 * 8 * CFG.screenSize);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "drawAllCursors", function () {
      _this.drawCursor(0);
      _this.drawCursor(1);
      _this.drawCursor(2);
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
    _this.side = side;
    return _this;
  }
  return TargetSelect;
}(ListMenu);

var BattleCannonMenu = function (_ListMenu) {
  _inherits(BattleCannonMenu, _ListMenu);
  var _super = _createSuper(BattleCannonMenu);
  function BattleCannonMenu() {
    var _this;
    _classCallCheck(this, BattleCannonMenu);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "drawCursor", function (index) {
      var spotIndex = index ? index : _this.currIndex;
      _this.menuCanvas.paintImage(_this.cursorImg, 0, spotIndex % _this.itemAmount * (8 * _this.itemHeight) * CFG.screenSize);
    });
    return _this;
  }
  return BattleCannonMenu;
}(ListMenu);

var BattleMenu = function (_Menu) {
  _inherits(BattleMenu, _Menu);
  var _super = _createSuper(BattleMenu);
  function BattleMenu(digiBeetleAH) {
    var _this;
    _classCallCheck(this, BattleMenu);
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "init", function () {
      debugLog("+ Battle Menu");
      _this.newTurn();
    });
    _defineProperty(_assertThisInitialized(_this), "buildDigiBeetleMenu", function () {
      _this.menuCanvas.setTopMessage("DGMN");
      _this.currIconMenu = 'beetle';
      _this.menuCanvas.clearBottomSection();
      _this.addSubMenu('beetle', new IconMenu([14, 16], ['dgmn', 'cannon', 'run'], 'beetle'));
      _this.subMenus.beetle.isVisible = true;
      if (_this.digiBeetleAH.getToolBoxItems().length === 0) _this.subMenus.beetle.disabledIcons.push('cannon');
      _this.subMenus.beetle.images = _this.buildIconImages(_this.subMenus.beetle.iconList);
      _this.subMenus.beetle.drawIcons(0);
      _this.currSubMenu = 'beetle';
      _this.menuCanvas.beetleNicknameTxt.instantText(_this.menuCanvas.ctx, 'GUNNER', 'white');
      _this.menuCanvas.beetleTxt.instantText(_this.menuCanvas.ctx, 'DigiBeetle', 'green');
      _this.menuCanvas.drawDgmnPortrait(_this.systemAH.fetchImage('beetlePortrait'));
    });
    _defineProperty(_assertThisInitialized(_this), "buildDgmnMenu", function () {
      _this.menuCanvas.setTopMessage("Attack");
      _this.setCurrentDgmn(_this.currDgmnIndex);
      _this.currIconMenu = 'dgmn';
      _this.addSubMenu('dgmn', new IconMenu([14, 16], ['attack', 'defend', 'stats'], 'dgmn'));
      _this.subMenus.dgmn.isVisible = true;
      _this.subMenus.dgmn.images = _this.buildIconImages(_this.subMenus.dgmn.iconList);
      _this.subMenus.dgmn.drawIcons(0);
      _this.currSubMenu = 'dgmn';
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "newTurn", function () {
      _this.buildDigiBeetleMenu();
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "buildAttackMenu", function () {
      var currDgmnAttackData = _this.battleAH.getDgmnAttackData(_this.currDgmnIndex, ['displayName', 'currCost', 'maxCost', 'type', 'power', 'hits', 'targets']);
      debugLog("++ Build Attack List | Data = ", currDgmnAttackData);
      _this.addSubMenu('attack', new AttackMenu(_this.systemAH.fetchImage, [4, 2], 6, 16, 2, currDgmnAttackData, _this.systemAH.fetchImage('miniCursor'), _this.systemAH.fetchImage('battleOptionSelectBaseRight'), 'attack'));
      _this.subMenus.attack.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "buildTargetSelect", function (flow) {
      debugLog("++ Selecting Target...");
      var side = flow === 'attack' ? 'enemy' : itemsDB[itemByName[_this.currItem.name]].target;
      var hitsAll = flow === 'attack' ? _this.currAttackAction.targets === 'all' : itemsDB[itemByName[_this.currItem.name]].hitsAll;
      var xOffset = side === 'enemy' ? 0 : 2;
      var cursorImg = side === 'enemy' ? _this.systemAH.fetchImage('cursorLeft') : _this.systemAH.fetchImage('cursorRight');
      _this.addSubMenu('target', new TargetSelect(side, hitsAll, _this.dgmnIsDeadCB, _this.menuCanvas.ctx, [8 + xOffset, 2], 3, 3, 4, ['one', 'two', 'three'], cursorImg, null, 'target'));
      _this.subMenus.target.currIndex = _this.getStartingTarget();
      _this.subMenus.target.drawMenu(_this.getStartingTarget());
    });
    _defineProperty(_assertThisInitialized(_this), "dgmnIsDeadCB", function (index, side) {
      return _this.battleAH.getDgmnDataByIndex(index, ['isDead'], side === 'enemy').isDead;
    });
    _defineProperty(_assertThisInitialized(_this), "buildCannonList", function () {
      debugLog("  - Selecting Ammo...");
      var items = _this.digiBeetleAH.getToolBoxItems().map(function (item) {
        return _this.treasureUtility.getTreasureName(item);
      });
      _this.addSubMenu('cannon', new BattleCannonMenu([9, 2], 12, 16, 1, items, _this.systemAH.fetchImage('miniCursor'), _this.systemAH.fetchImage('battleCannonOverlay'), 'cannon'));
      _this.subMenus.cannon.drawMenu();
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
      _this.menuCanvas.ctx.clearRect(10 * CFG.tileSize, 2 * CFG.tileSize, 2 * CFG.tileSize, 12 * CFG.tileSize);
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
    _defineProperty(_assertThisInitialized(_this), "clearAttackList", function (dir) {
      _this.removeSubMenu('attack');
      _this.menuCanvas.ctx.clearRect(32 * CFG.screenSize, 16 * CFG.screenSize, 128 * CFG.screenSize, 96 * CFG.screenSize);
      if (dir === 'back') _this.buildDgmnMenu();
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "drawActionText", function (species, messages) {
      _this.actionTxt.multiText(_this.menuCanvas.ctx, messages, _this.drawMenu, function () {
        _this.menuCanvas.clearBottomSection();
        _this.menuCanvas.drawDgmnPortrait(_this.systemAH.fetchImage(species.toLowerCase() + 'Portrait'));
      });
    });
    _defineProperty(_assertThisInitialized(_this), "launchTargetSelect", function (flow) {
      _this.buildTargetSelect(flow);
      _this.removeSubMenu(_this.currSubMenu);
      _this.currSubMenu = 'target';
      _this.subMenus[_this.currSubMenu].isVisible = true;
      if (flow === 'attack') {
        _this.menuCanvas.paintCurrentCursor(_this.currDgmnIndex, _this.systemAH.fetchImage('cursor'));
      }
      _this.menuCanvas.ctx.clearRect(32 * CFG.screenSize, 16 * CFG.screenSize, 128 * CFG.screenSize, 96 * CFG.screenSize);
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "clearTargetSelect", function (dir) {
      _this.subMenus.target.clearAllCursors(true);
      _this.removeSubMenu('target');
      if (dir === 'back') _this.currIconMenu === 'dgmn' ? _this.launchAttackList() : _this.launchCannonList();
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "launchCannonList", function () {
      _this.buildCannonList();
      _this.currSubMenu = 'cannon';
      _this.subMenus.cannon.isVisible = true;
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "clearCannonList", function (dir) {
      _this.removeSubMenu('cannon');
      _this.menuCanvas.ctx.clearRect(32 * CFG.screenSize, 16 * CFG.screenSize, 128 * CFG.screenSize, 96 * CFG.screenSize);
      if (dir === 'back') _this.buildDigiBeetleMenu();
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
      if (_this.currSubMenu === 'beetle') {
        _this.selectBeetleIcon(selected);
      } else {
        _this.selectDgmnIcon(selected);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "selectBeetleIcon", function (selected) {
      if (selected === 'dgmn') {
        _this.removeSubMenu('beetle');
        _this.currDgmnIndex = _this.getInitialDgmn();
        _this.buildDgmnMenu();
      } else if (selected === 'cannon' && _this.digiBeetleAH.getToolBoxItems().length !== 0) {
        _this.launchCannonList();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "selectDgmnIcon", function (selected) {
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
        _this.launchTargetSelect('attack');
      } else if (currSubMenuLabel === 'target') {
        var targets = _this.subMenus.target.hitsAll ? [0, 1, 2] : [_this.subMenus.target.currIndex];
        _this.subMenus.target.clearAllCursors(true);
        if (_this.currIconMenu === 'beetle') {
          _this.setCurrentCannonTargets(targets, _this.subMenus.target.side === 'enemy');
        } else {
          _this.setCurrentTargets(targets);
        }
        _this.drawMenu();
      } else if (currSubMenuLabel === 'cannon') {
        _this.setCurrentItem();
        _this.launchTargetSelect('cannon');
      }
    });
    _defineProperty(_assertThisInitialized(_this), "goBack", function () {
      switch (_this.currSubMenu) {
        case 'cannon':
          _this.clearCannonList('back');
          break;
        case 'attack':
          _this.clearAttackList('back');
          break;
        case 'target':
          _this.clearTargetSelect('back');
          break;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "setCurrentAttack", function () {
      var attackData = _this.subMenus.attack.listItems[_this.subMenus.attack.currIndex];
      _this.currAttackAction.attackName = attackData.attackName;
      _this.currAttackAction.hits = attackData.hits;
      _this.currAttackAction.targets = attackData.targets;
      _this.currAttackAction.power = attackData.power;
      _this.currAttackAction.type = attackData.type;
      debugLog('    - Attack Selected: ', _this.currAttackAction.attackName);
    });
    _defineProperty(_assertThisInitialized(_this), "setCurrentItem", function () {
      _this.currItem = {
        index: _this.subMenus.cannon.currIndex,
        name: _this.subMenus.cannon.listItems[_this.subMenus.cannon.currIndex]
      };
      debugLog('    - Item Selected: ', _this.currItem.name);
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
    _defineProperty(_assertThisInitialized(_this), "setCurrentCannonTargets", function (targets, isEnemy) {
      _this.removeSubMenu(_this.currSubMenu);
      _this.removeSubMenu('beetle');
      _this.drawMenu();
      _this.digiBeetleAH.removeItemFromToolBox(_this.currItem.index);
      _this.battleAH.shootCannon(_this.currItem, targets);
    });
    _defineProperty(_assertThisInitialized(_this), "gotoNextChoice", function () {
      debugLog("  - Next Dgmn...");
      _this.currDgmnIndex++;
      if (_this.currDgmnIndex < 3) {
        if (_this.battleAH.getDgmnDataByIndex(_this.currDgmnIndex, ['currentHP'], false).currentHP > 0) {
          _this.setCurrentDgmn(_this.currDgmnIndex);
          if (_this.currSubMenu !== 'dgmn') {
            _this.buildDgmnMenu();
            _this.currSubMenu = 'dgmn';
          } else {
            _this.subMenus.dgmn.drawIcons(0);
            _this.drawMenu();
          }
        } else {
          _this.gotoNextChoice();
        }
      } else {
        _this.beginCombat();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "beginCombat", function () {
      debugLog("+ BEGIN COMBAT!");
      _this.menuCanvas.ctx.clearRect(10 * CFG.tileSize, 2 * CFG.tileSize, 2 * CFG.tileSize, 12 * CFG.tileSize);
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
        _this.menuCanvas.paintImage(_this.systemAH.fetchImage(image), (2 + i) * CFG.tileSize, 5 * CFG.tileSize);
        _this.drawMenu();
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
    _defineProperty(_assertThisInitialized(_this), "getInitialDgmn", function () {
      for (var i = 0; i < 3; i++) {
        var dgmnHP = _this.battleAH.getDgmnDataByIndex(i, ['currentHP', false]).currentHP;
        if (dgmnHP > 0) return i;
      }
      return -1;
    });
    _defineProperty(_assertThisInitialized(_this), "getState", function () {
      return _this.currState;
    });
    _defineProperty(_assertThisInitialized(_this), "getMenuLabel", function () {
      return _this.currSubMenu;
    });
    _this.battleAH = _this.parentAH;
    _this.actionTxt = new TextArea(4, 14, 16, 4);
    _this.currDgmnIndex = 0;
    _this.currAttackAction = {};
    _this.currItem = [];
    _this.currState = 'default';
    _this.currIconMenu = 'beetle';
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
      getMenuLabelCB: _this.getMenuLabel,
      levelUpNextCB: _this.levelUpNext,
      goBackCB: _this.goBack
    });
    _this.menuCanvas = new BattleMenuCanvas('battle-menu-canvas', 160, 144);
    _this.digiBeetleAH = digiBeetleAH;
    _this.treasureUtility = new TreasureUtility();
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
            _this.clearCanvas();
            _this.drawCB();
            clearInterval(animationInterval);
            callback();
          } else {
            t++;
            f = 0;
            i = 0;
          }
        }
      }, 50);
    });
    _defineProperty(_assertThisInitialized(_this), "paintAttackFrame", function (targetIndex, frame) {
      _this.clearCanvas();
      _this.paintImage(frame, 0, 4 * targetIndex * CFG.tileSize);
      _this.drawCB();
    });
    _this.drawCB = function () {
      return drawCB();
    };
    return _this;
  }
  return AttackCanvas;
}(GameCanvas);

var getFullMessageLength = function getFullMessageLength(messages) {
  return messages.join(" ").length;
};

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
      } else if (action.status === 'pending') {
        debugLog("No Action for " + attacker);
        i++;
      } else if (action.status === 'done') {
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
        }, 1000);
      }
    }, 200);
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
        var isTargetEnemy = _this.dgmnUtility.isEnemy(_this.attackActions[attacker].targets[0]);
        if (isTargetEnemy) {
          targetData = _this.dgmnAH.getDgmnData(_this.attackActions[attacker].targets[0], ['speciesName', 'stage'], isTargetEnemy);
          _this.battleAH.addRewards(targetData.speciesName);
        } else {
          debugLog("Your DGMN Died");
        }
      }
    }
    _this.battleAH.drawAllStatuses();
    _this.attackCanvas.clearCanvas();
    setTimeout(function () {
      _this.attackActions[attacker].status = 'done';
    }, 1000);
  });
  _defineProperty(this, "takeAction", function (attacker, action) {
    _this.attackActions[attacker].status = 'acting';
    var dgmnData = _this.dgmnAH.getDgmnData(attacker, ['nickname', 'speciesName'], attacker.charAt(0) === 'e');
    var species = dgmnData.speciesName;
    var allMessages = [];
    if (!action.isDefend) {
      _this.takeAttack(attacker, action, function (messages) {
        allMessages = _toConsumableArray(messages);
      });
    } else {
      allMessages = [_this.dgmnAH.getDgmnData(attacker, ['nickname'], attacker.charAt(0) === 'e').nickname + ' defends'];
    }
    if (allMessages.length > 0) _this.battleAH.drawActionText(species, allMessages);
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
        setTimeout(function () {
          _this.attackActions[attacker].status = 'done';
        }, 1000);
      }
    }, (getFullMessageLength(allMessages) + 15 * allMessages.length) * 50);
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
    var allMessages = [_this.doAttackEffect(action.attackName, attacker, action.targets)];
    allMessages = allMessages[0] !== ' ' && allMessages[0] ? allMessages : [];
    for (var i in action.targets) {
      for (var h = 0; h < action.hits; h++) {
        var attackerData = _this.dgmnAH.getDgmnData(attacker, ['speciesName', 'currentStats', 'currentLevel', 'nickname', 'statMods', 'condition'], attacker.charAt(0) === 'e');
        var targetData = _this.dgmnAH.getDgmnData(action.targets[i], ['currentStats', 'combo', 'speciesName', 'weak', 'isDead', 'statMods'], action.targets[i].charAt(0) === 'e');
        if (!targetData.isDead) {
          var _attackerData$conditi2, _attackerData$conditi3;
          var attackerATK = _this.attackUtility.getStat(action.attackName) === 'physical' ? attackerData.currentStats.ATK * attackerData.statMods.ATK : attackerData.currentStats.INT * attackerData.statMods.INT;
          var targetDEF = _this.attackUtility.getStat(action.attackName) === 'physical' ? targetData.currentStats.DEF * targetData.statMods.DEF : targetData.currentStats.RES * targetData.statMods.RES;
          var baseDMG = _this.calcBaseDMG(attackerATK, attackerData.currentLevel, powerRanks[action.power], action.hits, targetDEF);
          var modTotal = 1;
          var accuracyMod = _this.calculateAccuracy(attackerData.currentStats.HIT * attackerData.statMods.HIT, targetData.currentStats.AVO * targetData.statMods.AVO);
          if (accuracyMod !== 0) {
            var _attackerData$conditi;
            var typeMod = _this.dgmnUtility.getTypeMod(action.type, targetData.speciesName);
            if (typeMod > 1 && !_this.isDgmnDefending(action.targets[i])) {
              _this.dgmnAH.modifyWeak(action.targets[i], 1);
            }
            var weakMod = targetData.weak > 0 ? 1.125 : 1;
            if (((_attackerData$conditi = attackerData.condition) === null || _attackerData$conditi === void 0 ? void 0 : _attackerData$conditi.type) !== 'overheat') _this.dgmnAH.modifyCombo(action.targets[i], _this.getComboDelta());
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
          var compiledName = attackerData.nickname !== 'Enemy' ? attackerData.nickname : 'Enemy ' + attackerData.speciesName + '.MON';
          var nextMessage = _this.buildActionMessage(compiledName, action.attackName, accuracyMod);
          if (i == 0 && h == 0) {
            allMessages.unshift(nextMessage);
          } else if (i !== 0 || h !== 0) {
            if (nextMessage.indexOf("CRIT") !== -1 || nextMessage.indexOf("missed") !== -1) {
              allMessages.push(nextMessage.indexOf("CRIT") !== -1 ? "One was a CRITICAL HIT!" : "One missed...");
            }
          }
          if ((_attackerData$conditi2 = attackerData.condition) !== null && _attackerData$conditi2 !== void 0 && _attackerData$conditi2.type) allMessages.unshift(attackerData.nickname + "" + _this.dgmnUtility.getConditionMessage((_attackerData$conditi3 = attackerData.condition) === null || _attackerData$conditi3 === void 0 ? void 0 : _attackerData$conditi3.type));
          messageCB(allMessages);
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
    debugLog("  BASE DMG = \u2308( ( (".concat(attackerATK, "/").concat(targetDEF, ") x (").concat(attackerLV, "/4) ) x ").concat(attackPWR, ") / ").concat(attackHits, "\u2309 = ").concat(baseDMG, " "));
    return baseDMG;
  });
  _defineProperty(this, "doAttackEffect", function (attackName, attacker, targets) {
    var effect = attacksDB[attackName].effect;
    if (!effect) return;
    var effectTargets = _this.getEffectTarget(effect.target, attacker, targets);
    var effectMessage = "";
    var statMods;
    var _iterator4 = _createForOfIteratorHelper(effectTargets),
        _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var effectTarget = _step4.value;
        var shouldActivate = Math.random() * 100 >= 100 - effect.accuracy;
        if (effect && shouldActivate) {
          switch (effect.type) {
            case 'buff':
              debugLog("Buffing ".concat(effect.target, " ").concat(effect.stat, " by ").concat(effect.amount));
              statMods = _this.dgmnAH.getDgmnData(effectTarget, ['statMods'], _this.dgmnUtility.isEnemy(effectTarget));
              if (statMods[effect.stat] >= 3) continue;
              _this.dgmnAH.buffDgmnStat(effectTarget, effect.stat, effect.amount);
              effectMessage = _this.attackUtility.getBuffMessage(effect.stat, effect.amount);
              break;
            case 'debuff':
              debugLog("DeBuffing ".concat(effect.target, " ").concat(effect.stat, " by ").concat(effect.amount));
              statMods = _this.dgmnAH.getDgmnData(effectTarget, ['statMods'], _this.dgmnUtility.isEnemy(effectTarget));
              if (statMods[effect.stat] <= -3) continue;
              _this.dgmnAH.debuffDgmnStat(effectTarget, effect.stat, effect.amount);
              effectMessage = _this.attackUtility.getDeBuffMessage(effect.stat, effect.amount);
              break;
            case 'status':
              debugLog("Hitting ".concat(effect.target, " with ").concat(effect.status));
              _this.dgmnAH.giveCondition(effectTarget, effect.status);
              effectMessage = _this.attackUtility.getConditionMessage(effect.status);
              console.log("Effect message ? ", effectMessage);
              break;
            default:
              warningLog("Effect Type Unknown - Check attacks.db.js");
              continue;
          }
        } else {
          continue;
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    return effectMessage;
  });
  _defineProperty(this, "getEffectTarget", function (effectTarget, attacker, attackTargets) {
    if (effectTarget === 'self') return [attacker];
    if (effectTarget === 'target') return [attackTargets[0]];
    return [];
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
      _this.ctx.clearRect(xPosition * CFG.screenSize, yPosition * CFG.screenSize, 16 * CFG.screenSize, 8 * CFG.screenSize);
      _this.ctx.drawImage(borderImg, xPosition * CFG.screenSize, yPosition * CFG.screenSize, 16 * CFG.screenSize, 8 * CFG.screenSize);
      _this.ctx.fillStyle = barHex;
      _this.ctx.fillRect((xPosition + 4) * CFG.screenSize, (yPosition + 2) * CFG.screenSize, meterLength * CFG.screenSize, 3 * CFG.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "getIconX", function (isEnemy, offset) {
      return ((isEnemy ? 0 : 17) + offset) * CFG.tileSize;
    });
    _defineProperty(_assertThisInitialized(_this), "getIconY", function (dgmnIndex, offset) {
      return (offset + dgmnIndex * 4) * CFG.tileSize;
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnCombo", function (coord, image) {
      _this.ctx.clearRect(coord[0] * CFG.tileSize, coord[1] * CFG.tileSize, CFG.tileSize, CFG.tileSize);
      _this.ctx.drawImage(image, coord[0] * CFG.tileSize, coord[1] * CFG.tileSize, CFG.tileSize, CFG.tileSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnWeak", function (coord, image) {
      _this.ctx.clearRect(coord[0] * CFG.tileSize, coord[1] * CFG.tileSize, CFG.tileSize, CFG.tileSize);
      _this.ctx.drawImage(image, coord[0] * CFG.tileSize, coord[1] * CFG.tileSize, CFG.tileSize, CFG.tileSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnStatBuff", function (isEnemy, dgmnIndex, image) {
      var iconX = _this.getIconX(isEnemy, 0);
      var iconY = _this.getIconY(dgmnIndex, 5);
      _this.ctx.clearRect(iconX, iconY, CFG.tileSize, CFG.tileSize);
      _this.ctx.drawImage(image, iconX, iconY, CFG.tileSize, CFG.tileSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnCondition", function (isEnemy, dgmnIndex, image) {
      var iconX = _this.getIconX(isEnemy, 1);
      var iconY = _this.getIconY(dgmnIndex, 5);
      _this.ctx.clearRect(iconX, iconY, CFG.tileSize, CFG.tileSize);
      _this.ctx.drawImage(image, iconX, iconY, CFG.tileSize, CFG.tileSize);
    });
    return _this;
  }
  return BattleDgmnStatusCanvas;
}(GameCanvas);

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
      _this.menuCanvas.paintImage(_this.fetchImageCB("field".concat(rewards[_this.currIndex], "Icon")), 1 * CFG.tileSize, 2 * CFG.tileSize);
      for (var i = _this.currIndex + 1; i < rewards.length; i++) {
        var img = rewards[i] === 'XP' ? 'xpIconSmall' : "field".concat(rewards[i], "Icon");
        _this.menuCanvas.paintImage(_this.fetchImageCB(img), (2 + (i - _this.currIndex)) * CFG.tileSize, 2 * CFG.tileSize);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "updateRewardsList", function (rewards, onDoneCB) {
      _this.menuCanvas.clearCanvas();
      _this.currIndex++;
      if (_this.currIndex >= rewards.length) {
        _this.redrawParentCB();
        onDoneCB();
      } else {
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

var DgmnGrowthMenuAH = function DgmnGrowthMenuAH(cbObj) {
  _classCallCheck(this, DgmnGrowthMenuAH);
  this.getState = function () {
    return cbObj.getStateCB();
  };
  this.giveCurrReward = function (dir) {
    cbObj.giveCurrRewardCB(dir);
  };
  this.prevHatch = function () {
    cbObj.prevHatchCB();
  };
  this.nextHatch = function () {
    cbObj.nextHatchCB();
  };
  this.prevEvo = function () {
    cbObj.prevEvoCB();
  };
  this.nextEvo = function () {
    cbObj.nextEvoCB();
  };
  this.selectHatch = function () {
    cbObj.selectHatchCB();
  };
  this.selectEvo = function () {
    cbObj.selectEvoCB();
  };
  this.confirmLevelUp = function () {
    cbObj.confirmLevelUpCB();
  };
  this.nextBossReward = function () {
    cbObj.nextBossRewardCB();
  };
  this.prevBossReward = function () {
    cbObj.prevBossRewardCB();
  };
  this.selectBossReward = function () {
    cbObj.selectBossRewardCB();
  };
  this.skipEvo = function () {
    cbObj.skipEvoCB();
  };
};

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
      _this.ctx.clearRect(0, 8 * CFG.screenSize, 160 * CFG.screenSize, 8 * CFG.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "clearBottomSection", function () {
      _this.ctx.fillStyle = "#00131A";
      _this.ctx.fillRect(0, 14 * CFG.tileSize, 20 * CFG.tileSize, 4 * CFG.tileSize);
    });
    _defineProperty(_assertThisInitialized(_this), "clearBottomSectionIgnoreCursor", function () {
      _this.ctx.fillStyle = "#00131A";
      _this.ctx.fillRect(0, 14 * CFG.tileSize, 20 * CFG.tileSize, 3 * CFG.tileSize);
      _this.ctx.fillRect(0, 17 * CFG.tileSize, 18 * CFG.tileSize, 1 * CFG.tileSize);
    });
    _defineProperty(_assertThisInitialized(_this), "setTopMessage", function (message) {
      _this.clearTopMessage();
      _this.topTxt.instantText(_this.ctx, message, 'white');
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnPortrait", function (portraitImg) {
      _this.ctx.drawImage(portraitImg, 0, 0, 256, 248, 0, 112 * CFG.screenSize, 32 * CFG.screenSize, (32 - 1) * CFG.screenSize);
    });
    _this.topTxt = new TextArea(0, 1, 20);
    return _this;
  }
  return MenuCanvas;
}(GameCanvas);

var EvoMenu = function (_IconMenu) {
  _inherits(EvoMenu, _IconMenu);
  var _super = _createSuper(EvoMenu);
  function EvoMenu(_type) {
    var _this;
    _classCallCheck(this, EvoMenu);
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "buildHatchingScreen", function (dgmnData) {
      debugLog("Hatching DGMN...");
      _this.dgmnData = dgmnData;
      _this.choices = _this.dgmnUtility.getEggHatches(dgmnData.eggField);
      debugLog("  - Hatch Options : ", _this.choices);
      _this.selectedDgmn = _this.choices[0];
      _this.drawHatchScreen();
    });
    _defineProperty(_assertThisInitialized(_this), "buildEvoScreen", function (dgmnData) {
      debugLog("Evolving DGMN...");
      _this.dgmnData = dgmnData;
      _this.choices = _this.dgmnUtility.getEvolutions(dgmnData.speciesName);
      debugLog("  - Evo Options : ", _this.choices);
      _this.selectedDgmn = _this.choices[0];
      _this.drawEvoScreen();
    });
    _defineProperty(_assertThisInitialized(_this), "drawHatchScreen", function () {
      _this.drawDgmnCanvas(_this.choices[_this.currChoice], [5, 4]);
      _this.drawEvoRequirements('hatch', _this.choices[_this.currChoice]);
      _this.drawHatchStats(_this.dgmnUtility.buildInitialStats(_this.choices[_this.currChoice]));
      _this.drawEvoChoiceIcons();
      _this.drawDgmnInfo(_this.choices[_this.currChoice]);
      _this.redrawParentCB();
    });
    _defineProperty(_assertThisInitialized(_this), "drawEvoScreen", function () {
      _this.drawDgmnCanvas(_this.dgmnData.speciesName, [1, 4]);
      _this.drawDgmnCanvas(_this.choices[_this.currChoice], [8, 4]);
      _this.drawEvoRequirements('evo', _this.choices[_this.currChoice]);
      _this.drawEvoStats(_this.dgmnUtility.getAllBaseStats(_this.choices[_this.currChoice]));
      _this.drawEvoChoiceIcons();
      _this.drawDgmnInfo(_this.choices[_this.currChoice]);
      _this.redrawParentCB();
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnCanvas", function (species, coord) {
      _this.menuCanvas.ctx.fillStyle = "#00131A";
      _this.menuCanvas.ctx.fillRect(coord[0] * CFG.tileSize, coord[1] * CFG.tileSize, 4 * CFG.tileSize, 4 * CFG.tileSize);
      _this.menuCanvas.paintImage(_this.fetchImageCB("".concat(species.toLowerCase(), "Idle0")), coord[0] * CFG.tileSize, coord[1] * CFG.tileSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawEvoRequirements", function (origin, species) {
      _this.menuCanvas.ctx.fillStyle = "#00131A";
      _this.menuCanvas.ctx.fillRect(1 * CFG.tileSize, 10 * CFG.tileSize, 11 * CFG.tileSize, 2 * CFG.tileSize);
      var fpReqs = origin === 'hatch' ? _this.dgmnUtility.getHatchFP(species) : _this.dgmnUtility.getEvoFP(species);
      var i = 0;
      for (var req in fpReqs) {
        var color = _this.dgmnData.currentFP[req] >= fpReqs[req] ? 'white' : 'darkGreen';
        var img = _this.fetchImageCB("field".concat(req, "Icon"));
        _this.menuCanvas.paintImage(img, (1 + i * 5) * CFG.tileSize, 10 * CFG.tileSize);
        _this.evoReqsTxt[i].instantText(_this.menuCanvas.ctx, _this.menuUtility.prependZeros(fpReqs[req], 3), color);
        i++;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "drawEvoChoiceIcons", function () {
      var dgmnFP = _this.dgmnData.currentFP;
      var possibleHatches = [];
      var iconsOffset = [1 * CFG.tileSize, 13 * CFG.tileSize];
      _this.menuCanvas.ctx.fillStyle = "#00131A";
      _this.menuCanvas.ctx.fillRect(iconsOffset[0], iconsOffset[1], 11 * CFG.tileSize, 7 * CFG.screenSize);
      for (var i = 0; i < _this.choices.length; i++) {
        var img = void 0;
        var available = _this.type === 'hatch' ? _this.dgmnUtility.canHatchInto(dgmnFP, _this.choices[i]) : _this.dgmnUtility.canEvolveInto(dgmnFP, _this.choices[i]);
        if (available) {
          possibleHatches.push(_this.choices[i]);
          img = _this.fetchImageCB('evoIconPositive');
        } else {
          img = _this.fetchImageCB('evoIconNegative');
        }
        _this.menuCanvas.paintImage(img, iconsOffset[0] + i * CFG.tileSize, iconsOffset[1]);
      }
      var currAvailable = _this.type === 'hatch' ? _this.dgmnUtility.canHatchInto(dgmnFP, _this.choices[_this.currChoice]) : _this.dgmnUtility.canEvolveInto(dgmnFP, _this.choices[_this.currChoice]);
      _this.menuCanvas.ctx.fillStyle = currAvailable ? "#C4CFA1" : "#1D5A4A";
      _this.menuCanvas.ctx.fillRect(iconsOffset[0] + _this.currChoice * CFG.tileSize + 3, iconsOffset[1] + 3, 5 * CFG.screenSize, 4 * CFG.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawHatchStats", function (stats) {
      _this.menuCanvas.ctx.fillStyle = "#00131A";
      _this.menuCanvas.ctx.fillRect(16 * CFG.tileSize, 2 * CFG.tileSize, 3 * CFG.tileSize, 8 * CFG.tileSize);
      for (var stat in stats) {
        _this.hatchStatTxtAreas[stat].instantText(_this.menuCanvas.ctx, _this.menuUtility.prependZeros(stats[stat], 3), 'white');
      }
    });
    _defineProperty(_assertThisInitialized(_this), "drawEvoStats", function (stats) {
      _this.menuCanvas.ctx.fillStyle = "#00131A";
      _this.menuCanvas.ctx.fillRect(17 * CFG.tileSize, 2 * CFG.tileSize, 2 * CFG.tileSize, 8 * CFG.tileSize);
      for (var stat in stats) {
        _this.evoStatTxtAreas[stat].instantText(_this.menuCanvas.ctx, _this.menuUtility.prependZeros(stats[stat], 2), 'white');
      }
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnInfo", function (species) {
      _this.menuCanvas.clearBottomSectionIgnoreCursor();
      _this.menuCanvas.drawDgmnPortrait(_this.fetchImageCB("".concat(species.toLowerCase(), "Portrait")));
      _this.evoNameTxt.instantText(_this.menuCanvas.ctx, "".concat(species, ".MON"), 'white');
      _this.evoAttributeTxt.instantText(_this.menuCanvas.ctx, _this.dgmnUtility.getAttribute(species), 'green');
      _this.evoWeakTxt.instantText(_this.menuCanvas.ctx, 'WEAK', 'green');
      _this.evoResTxt.instantText(_this.menuCanvas.ctx, 'RES', 'green');
      var i = 0;
      for (var field in _this.dgmnUtility.getBaseFP(species)) {
        _this.menuCanvas.paintImage(_this.fetchImageCB("field".concat(field, "Icon")), (5 + _this.dgmnUtility.getAttribute(species).length + i * 1) * CFG.tileSize, 15 * CFG.tileSize);
        i++;
      }
      var typeAffinities = _this.dgmnUtility.getTypeAffinities(species);
      var w = 0;
      var r = 0;
      for (var type in typeAffinities) {
        if (typeAffinities[type] < 1) {
          _this.menuCanvas.paintImage(_this.fetchImageCB("".concat(type, "TypeIcon")), (8 + r) * CFG.tileSize, 16 * CFG.tileSize);
          r++;
        } else if (typeAffinities[type] > 1) {
          _this.menuCanvas.paintImage(_this.fetchImageCB("".concat(type, "TypeIcon")), (15 + w) * CFG.tileSize, 16 * CFG.tileSize);
          w++;
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "canHatch", function () {
      return _this.dgmnUtility.canHatchInto(_this.dgmnData.currentFP, _this.choices[_this.currChoice]);
    });
    _defineProperty(_assertThisInitialized(_this), "canEvolve", function () {
      return _this.dgmnUtility.canEvolveInto(_this.dgmnData.currentFP, _this.choices[_this.currChoice]);
    });
    _defineProperty(_assertThisInitialized(_this), "nextChoice", function () {
      if (_this.currChoice < _this.choices.length - 1) {
        _this.currChoice++;
        _this.selectedDgmn = _this.choices[_this.currChoice];
        _this.type === 'hatch' ? _this.drawHatchScreen() : _this.drawEvoScreen();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "prevChoice", function () {
      if (_this.currChoice > 0) {
        _this.currChoice--;
        _this.selectedDgmn = _this.choices[_this.currChoice];
        _this.type === 'hatch' ? _this.drawHatchScreen() : _this.drawEvoScreen();
      }
    });
    _this.type = _type;
    _this.currChoice = 0;
    _this.dgmnData;
    _this.choices = [];
    _this.selectedDgmn;
    _this.menuCanvas = new MenuCanvas("".concat(_this.label, "-menu"), 160, 144);
    _this.menuCanvas.x = 0;
    _this.menuCanvas.y = 0;
    _this.evoNameTxt = new TextArea(4, 14, 12, 1);
    _this.evoAttributeTxt = new TextArea(4, 15, 7, 1);
    _this.evoWeakTxt = new TextArea(4, 16, 4, 1);
    _this.evoResTxt = new TextArea(12, 16, 3, 1);
    _this.evoReqsTxt = [new TextArea(2, 10, 3, 1, _this.menuUtility.dimLeadingZeros), new TextArea(7, 10, 3, 1, _this.menuUtility.dimLeadingZeros)];
    _this.hatchStatTxtAreas = {
      HP: new TextArea(16, 2, 3, 1, _this.menuUtility.dimLeadingZeros),
      ATK: new TextArea(16, 3, 3, 1, _this.menuUtility.dimLeadingZeros),
      DEF: new TextArea(16, 4, 3, 1, _this.menuUtility.dimLeadingZeros),
      INT: new TextArea(16, 5, 3, 1, _this.menuUtility.dimLeadingZeros),
      RES: new TextArea(16, 6, 3, 1, _this.menuUtility.dimLeadingZeros),
      HIT: new TextArea(16, 7, 3, 1, _this.menuUtility.dimLeadingZeros),
      AVO: new TextArea(16, 8, 3, 1, _this.menuUtility.dimLeadingZeros),
      SPD: new TextArea(16, 9, 3, 1, _this.menuUtility.dimLeadingZeros)
    };
    _this.evoStatTxtAreas = {
      HP: new TextArea(17, 2, 3, 1, _this.menuUtility.dimLeadingZeros),
      ATK: new TextArea(17, 3, 3, 1, _this.menuUtility.dimLeadingZeros),
      DEF: new TextArea(17, 4, 3, 1, _this.menuUtility.dimLeadingZeros),
      INT: new TextArea(17, 5, 3, 1, _this.menuUtility.dimLeadingZeros),
      RES: new TextArea(17, 6, 3, 1, _this.menuUtility.dimLeadingZeros),
      HIT: new TextArea(17, 7, 3, 1, _this.menuUtility.dimLeadingZeros),
      AVO: new TextArea(17, 8, 3, 1, _this.menuUtility.dimLeadingZeros),
      SPD: new TextArea(17, 9, 3, 1, _this.menuUtility.dimLeadingZeros)
    };
    _this.dgmnUtility = new DgmnUtility();
    return _this;
  }
  return EvoMenu;
}(IconMenu);

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
    _defineProperty(_assertThisInitialized(_this), "buildLevelUpScreen", function (dgmnData) {
      for (var stat in dgmnData.currentStats) {
        var growth = _this.dgmnUtility.getBaseStat(dgmnData.speciesName, stat) + _this.dgmnUtility.calcFPStatBoost(dgmnData.currentFP, stat);
        _this.statTxtAreas[stat].original.instantText(_this.menuCanvas.ctx, _this.menuUtility.prependZeros(dgmnData.currentStats[stat], 3), 'white');
        _this.statTxtAreas[stat].plus.instantText(_this.menuCanvas.ctx, _this.menuUtility.prependZeros(growth, 2), 'green');
      }
      _this.levelUpTxt.instantText(_this.menuCanvas.ctx, "LV ".concat(_this.menuUtility.prependZeros(dgmnData.currentLevel + 1, 3)), 'white');
      _this.menuCanvas.paintImage(_this.fetchImageCB("".concat(dgmnData.speciesName.toLowerCase(), "Idle0")), 3 * CFG.tileSize, 8 * CFG.tileSize);
    });
    _this.menuCanvas = new GameCanvas('level-up', 160, 144);
    _this.dgmnUtility = new DgmnUtility();
    _this.dgmnCanvas;
    _this.levelUpTxt = new TextArea(2, 5, 6, 1);
    _this.statTxtAreas = {
      HP: {
        original: new TextArea(13, 3, 3, 1, _this.menuUtility.dimLeadingZeros),
        plus: new TextArea(17, 3, 2, 1, _this.menuUtility.dimLeadingZeros)
      },
      ATK: {
        original: new TextArea(13, 4, 3, 1, _this.menuUtility.dimLeadingZeros),
        plus: new TextArea(17, 4, 2, 1, _this.menuUtility.dimLeadingZeros)
      },
      DEF: {
        original: new TextArea(13, 5, 3, 1, _this.menuUtility.dimLeadingZeros),
        plus: new TextArea(17, 5, 2, 1, _this.menuUtility.dimLeadingZeros)
      },
      INT: {
        original: new TextArea(13, 6, 3, 1, _this.menuUtility.dimLeadingZeros),
        plus: new TextArea(17, 6, 2, 1, _this.menuUtility.dimLeadingZeros)
      },
      RES: {
        original: new TextArea(13, 7, 3, 1, _this.menuUtility.dimLeadingZeros),
        plus: new TextArea(17, 7, 2, 1, _this.menuUtility.dimLeadingZeros)
      },
      HIT: {
        original: new TextArea(13, 8, 3, 1, _this.menuUtility.dimLeadingZeros),
        plus: new TextArea(17, 8, 2, 1, _this.menuUtility.dimLeadingZeros)
      },
      AVO: {
        original: new TextArea(13, 9, 3, 1, _this.menuUtility.dimLeadingZeros),
        plus: new TextArea(17, 9, 2, 1, _this.menuUtility.dimLeadingZeros)
      },
      SPD: {
        original: new TextArea(13, 10, 3, 1, _this.menuUtility.dimLeadingZeros),
        plus: new TextArea(17, 10, 2, 1, _this.menuUtility.dimLeadingZeros)
      }
    };
    return _this;
  }
  return LevelUpMenu;
}(SubMenu);

var AUTO_ADVANCE_DELAY_DEFAULT = 1000;
var AUTO_ADVANCE_DELAY_PER_CHAR = 50;
var WARNING_TXT_MESSAGE_MISSING = 'WARNING: message is missing or empty';
var getAutoAdvanceDelay = function getAutoAdvanceDelay(message) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : AUTO_ADVANCE_DELAY_DEFAULT;
  if (!message || (message === null || message === void 0 ? void 0 : message.length) === 0) {
    warningLog(WARNING_TXT_MESSAGE_MISSING);
    return delay;
  }
  return message.length * AUTO_ADVANCE_DELAY_PER_CHAR + delay;
};

var FP_LIST = ['DR', 'NS', 'DS', 'JT', 'NA', 'ME', 'WG', 'VB'];

var REWARD_MESSAGES = ["Permanently upgrade FP", "Permanently upgrade XP", "Permanently upgrade EN"
];
var REWARD_SELECTED_MESSAGES = ["Select an FP to upgrade.", "XP Permanently upgraded!", "EN Permanently upgraded!"];
var BossVictoryMenu = function (_ListMenu) {
  _inherits(BossVictoryMenu, _ListMenu);
  var _super = _createSuper(BossVictoryMenu);
  function BossVictoryMenu(currFloor) {
    var _this;
    _classCallCheck(this, BossVictoryMenu);
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "init", function () {
      _this.infoTxt.instantText(_this.menuCanvas.ctx, REWARD_MESSAGES[0]);
    });
    _defineProperty(_assertThisInitialized(_this), "clearInfoTxt", function () {
      _this.menuCanvas.ctx.fillStyle = "#00131A";
      _this.menuCanvas.ctx.fillRect(4 * CFG.tileSize, 14 * CFG.tileSize, 16 * CFG.tileSize, 4 * CFG.tileSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawList", function () {
      for (var i = 0; i < _this.listItems.length; i++) {
        for (var r = 0; r < 8; r++) {
          var image = 'rewardIconDeselected';
          if (r > _this.mapUtility.getBossRewardLevel(_this.currFloor)) image = 'rewardIconNull';
          _this.drawIcon(i, r, image);
        }
      }
      _this.drawIcon(_this.currIndex, _this.currUpgradeIndex, 'rewardIconSelected');
    });
    _defineProperty(_assertThisInitialized(_this), "drawMenu", function () {
      _this.drawList();
      if (_this.inFPSelection) {
        _this.drawFPMenu();
      }
      _this.redrawParentCB();
    });
    _defineProperty(_assertThisInitialized(_this), "drawFPMenu", function () {
      _this.menuCanvas.paintImage(_this.fetchImageCB('bossRewardFieldChoice'), 0, 0);
      _this.menuCanvas.paintImage(_this.fetchImageCB('miniCursor'), 7 * CFG.tileSize, (_this.FPIndex + 3) * CFG.tileSize);
      for (var i in _this.FPText) {
        _this.FPText[i].instantText(_this.menuCanvas.ctx, FIELD_LABELS[i], 'white');
      }
    });
    _defineProperty(_assertThisInitialized(_this), "drawIcon", function (row, col, image) {
      _this.menuCanvas.paintImage(_this.fetchImageCB(image), (col + 11) * CFG.tileSize, (2 * row + 2) * CFG.tileSize);
    });
    _defineProperty(_assertThisInitialized(_this), "launchFPSelection", function () {
      _this.inFPSelection = true;
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "prevChoice", function () {
      if (!_this.inFPSelection) {
        if (_this.currIndex > 0) {
          _this.currIndex--;
          _this.clearInfoTxt();
          _this.infoTxt.instantText(_this.menuCanvas.ctx, REWARD_MESSAGES[_this.currIndex]);
        }
      } else {
        if (_this.FPIndex > 0) _this.FPIndex--;
      }
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "nextChoice", function () {
      if (!_this.inFPSelection) {
        if (_this.currIndex < _this.listItems.length - 1) {
          _this.currIndex++;
          _this.clearInfoTxt();
          _this.infoTxt.instantText(_this.menuCanvas.ctx, REWARD_MESSAGES[_this.currIndex]);
        }
      } else {
        if (_this.FPIndex < 7) _this.FPIndex++;
      }
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "selectChoice", function (onDone) {
      debugLog("Selecting Upgrade: ", _this.currIndex);
      var message = REWARD_SELECTED_MESSAGES[_this.currIndex];
      if (!_this.inFPSelection) {
        if (_this.currIndex === 0) {
          _this.launchFPSelection();
          return;
        }
      } else {
        message = "Permanently gained 1 ".concat(FP_LIST[_this.FPIndex], " FP!");
      }
      _this.clearInfoTxt();
      _this.infoTxt.timedText(_this.menuCanvas.ctx, message, _this.drawMenu);
      setTimeout(function () {
        onDone();
      }, getAutoAdvanceDelay(message, 2000));
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnPortrait", function (portraitImg) {
      _this.menuCanvas.ctx.drawImage(portraitImg, 0, 0, 256, 248, 0, 112 * CFG.screenSize, 32 * CFG.screenSize, (32 - 1) * CFG.screenSize);
    });
    _this.currFloor = currFloor;
    _this.dgmnIndex = 0;
    _this.currUpgradeIndex = 0;
    _this.mapUtility = new MapUtility();
    _this.menuCanvas = new MenuCanvas("".concat(_this.label, "-menu"), 160, 144);
    _this.inFPSelection = false;
    _this.FPIndex = 0;
    _this.FPText = [new TextArea(10, 3, 2, 1), new TextArea(10, 4, 2, 1), new TextArea(10, 5, 2, 1), new TextArea(10, 6, 2, 1), new TextArea(10, 7, 2, 1), new TextArea(10, 8, 2, 1), new TextArea(10, 9, 2, 1), new TextArea(10, 10, 2, 1)];
    _this.infoTxt = new TextArea(4, 14, 16, 4);
    _this.learnedAttackTxt = new TextArea(1, 12, 18, 1);
    _this.fetchImageCB;
    _this.redrawParentCB;
    _this.onDone;
    _this.init();
    return _this;
  }
  return BossVictoryMenu;
}(ListMenu);

var DgmnGrowthMenu = function (_Menu) {
  _inherits(DgmnGrowthMenu, _Menu);
  var _super = _createSuper(DgmnGrowthMenu);
  function DgmnGrowthMenu(origin, dgmnAH, isBoss) {
    var _this;
    _classCallCheck(this, DgmnGrowthMenu);
    for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "gotoRewards", function (rewards) {
      _this.currState = 'loading';
      _this.rewards = rewards;
      _this.drawBackground('battleVictoryRewardsOverlay');
      if (_this.origin === 'hatch') _this.topTxt.instantText(_this.menuCanvas.ctx, 'Use D Pad to choose', 'white');
      _this.actionTxt.timedText(_this.menuCanvas.ctx, _this.origin === 'hatch' ? 'Choose DGMN Egg to get Rewards!' : 'Choose DGMN to get Rewards!', _this.drawMenu);
      _this.addSubMenu('rewards', new RewardsMenu('rewards'));
      _this.subMenus.rewards.isVisible = true;
      _this.attachImageCallbacks('rewards');
      _this.origin === 'hatch' ? _this.drawEggs() : _this.drawDgmn();
      _this.subMenus.rewards.drawRewardsList(rewards);
      _this.drawMenu();
      setTimeout(function () {
        _this.currState = 'rewards';
      }, 500);
    });
    _defineProperty(_assertThisInitialized(_this), "gotoHatch", function (dgmnData) {
      _this.currState = 'loading';
      _this.drawBackground('hatchingEggOverlay');
      _this.topTxt.instantText(_this.menuCanvas.ctx, 'Choose DGMN to hatch', 'white');
      _this.addSubMenu('hatch', new EvoMenu('hatch', [1, 13], [], 'hatching'));
      _this.subMenus.hatch.isVisible = true;
      _this.attachImageCallbacks('hatch');
      _this.subMenus.hatch.buildHatchingScreen(dgmnData, _this.parentAH.drawDungeon);
      _this.drawMenu();
      setTimeout(function () {
        _this.drawContinueCursor(_this.systemAH.fetchImage('continueCursor'), _this.drawMenu);
        _this.currState = 'hatch-choice';
      }, 500);
    });
    _defineProperty(_assertThisInitialized(_this), "gotoLevelUp", function (dgmnData) {
      _this.currState = 'loading';
      _this.drawBackground('battleLevelUpOverlay');
      _this.actionTxt.timedText(_this.menuCanvas.ctx, "".concat(dgmnData.nickname, " Leveled Up!"), _this.drawMenu);
      _this.addSubMenu('level', new LevelUpMenu('level'));
      _this.subMenus.level.isVisible = true;
      _this.attachImageCallbacks('level');
      _this.subMenus.level.buildLevelUpScreen(dgmnData, _this.parentAH.drawBattleCanvas);
      _this.drawMenu();
      setTimeout(function () {
        _this.drawContinueCursor(_this.systemAH.fetchImage('continueCursor'), _this.drawMenu);
        _this.currState = 'level-next';
      }, 500);
    });
    _defineProperty(_assertThisInitialized(_this), "gotoEvolution", function (dgmnData) {
      _this.currState = 'loading';
      _this.drawBackground('battleEvolutionOverlay');
      _this.topTxt.instantText(_this.menuCanvas.ctx, 'Choose Evolution');
      _this.addSubMenu('evolve', new EvoMenu('evolve', [1, 13], [], 'evolving'));
      _this.subMenus.evolve.isVisible = true;
      _this.attachImageCallbacks('evolve');
      _this.subMenus.evolve.buildEvoScreen(dgmnData);
      _this.drawMenu();
      setTimeout(function () {
        _this.drawContinueCursor(_this.systemAH.fetchImage('continueCursor'), _this.drawMenu);
        _this.currState = 'evo-choice';
      }, 500);
    });
    _defineProperty(_assertThisInitialized(_this), "gotoBossRewards", function (dgmnData) {
      _this.currState = 'boss-reward';
      _this.drawBackground('bossRewardMenu');
      _this.topTxt.instantText(_this.menuCanvas.ctx, 'Choose Boss Reward!');
      _this.addSubMenu('bossReward', new BossVictoryMenu(5, [0, 0], 3, 8, 2, ['fp', 'xp', 'en'], _this.systemAH.fetchImage('miniCursor'), null, 'bossReward'));
      _this.subMenus.bossReward.isVisible = true;
      _this.attachImageCallbacks('bossReward');
      _this.subMenus.bossReward.drawList();
      _this.subMenus.bossReward.drawDgmnPortrait(_this.systemAH.fetchImage("".concat(dgmnData.speciesName.toLowerCase(), "Portrait")));
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "updateRewardsList", function () {
      var currDgmnData = _this.getCurrDgmnData();
      var nextImages = _this.origin === 'hatch' ? _this.dgmnUtility.getAllHatchImages(currDgmnData.eggField) : [];
      _this.drawBackground('battleVictoryRewardsOverlay');
      _this.origin === 'hatch' ? _this.drawEggs() : _this.drawDgmn();
      _this.subMenus.rewards.updateRewardsList(_this.rewards, function () {
        if (nextImages.length === 0) {
          _this.gotoNextScreen();
          return;
        } else {
          _this.systemAH.loadImages(nextImages, function () {
            _this.gotoNextScreen();
          });
        }
      });
    });
    _defineProperty(_assertThisInitialized(_this), "giveCurrReward", function (dir) {
      var dgmnParty = _this.dgmnAH.getDgmnParty();
      var dirMap = {
        left: dgmnParty[0],
        up: dgmnParty[1],
        right: dgmnParty[2]
      };
      var dgmnId = dirMap[dir];
      _this.dgmnAH.giveDgmnReward(dgmnId, _this.rewards[_this.subMenus.rewards.currIndex]);
      _this.updateRewardsList();
    });
    _defineProperty(_assertThisInitialized(_this), "wrapUpRewards", function () {
      _this.removeSubMenu('rewards');
      var currDgmn = _this.dgmnAH.getDgmnParty()[_this.currDgmnIndex];
      var currDgmnData = _this.getCurrDgmnData();
      _this.checkAllLevelUps();
      if (_this.origin === 'victory' && _this.isBoss) {
        _this.gotoBossRewards(currDgmnData);
      } else if (_this.origin === 'hatch') {
        _this.gotoHatch(currDgmnData);
      } else if (_this.levelUps[currDgmn]) {
        _this.gotoLevelUp(currDgmnData);
      } else {
        _this.wrapUpLevelUp(true);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "wrapUpLevelUp", function () {
      var _this$continueCursor;
      var skipEvolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      (_this$continueCursor = _this.continueCursor) === null || _this$continueCursor === void 0 ? void 0 : _this$continueCursor.remove();
      _this.removeSubMenu('level');
      var currDgmnData = _this.getCurrDgmnData();
      var canEvolve = !skipEvolve ? _this.dgmnUtility.canEvolveIntoAny(currDgmnData.currentFP, currDgmnData.speciesName) : false;
      var direction = canEvolve ? 'evolve' : 'level';
      if (!canEvolve) _this.currDgmnIndex++;
      var nextDgmn = _this.dgmnAH.getDgmnParty()[_this.currDgmnIndex];
      if (_this.currDgmnIndex > 2) {
        _this.parentAH.closeGrowthMenu();
      } else {
        if (direction === 'level') {
          var nextDgmnData = _this.getCurrDgmnData();
          if (_this.origin === 'victory' && _this.isBoss) {
            _this.gotoBossRewards(nextDgmnData);
          } else if (_this.levelUps[nextDgmn]) {
            _this.gotoLevelUp(nextDgmnData);
          } else {
            _this.wrapUpLevelUp();
          }
        } else {
          var evoImages = _this.dgmnUtility.getAllEvoImages(currDgmnData.speciesName);
          _this.systemAH.loadImages(evoImages, function () {
            _this.gotoEvolution(currDgmnData);
          });
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "wrapUpHatch", function () {
      var _this$continueCursor2;
      (_this$continueCursor2 = _this.continueCursor) === null || _this$continueCursor2 === void 0 ? void 0 : _this$continueCursor2.remove();
      var currDgmnData = _this.getCurrDgmnData();
      var canEvolve = _this.dgmnUtility.canEvolveIntoAny(currDgmnData.currentFP, currDgmnData.speciesName);
      var direction = canEvolve ? 'evolve' : 'hatch';
      if (!canEvolve) {
        _this.currDgmnIndex++;
        currDgmnData = _this.currDgmnIndex <= 2 ? _this.getCurrDgmnData() : currDgmnData;
      }
      if (_this.currDgmnIndex > 2) {
        _this.parentAH.closeGrowthMenu();
      } else {
        var nextImages = direction === 'hatch' ? _this.dgmnUtility.getAllHatchImages(currDgmnData.eggField) : _this.dgmnUtility.getAllEvoImages(currDgmnData.speciesName);
        _this.systemAH.loadImages(nextImages, function () {
          if (direction === 'evolve') {
            _this.removeSubMenu('hatch');
            _this.gotoEvolution(currDgmnData);
          } else {
            _this.removeSubMenu('hatch');
            _this.gotoHatch(currDgmnData);
          }
        });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "wrapUpEvolution", function () {
      _this.currDgmnIndex++;
      if (_this.currDgmnIndex > 2) {
        _this.parentAH.closeGrowthMenu();
      } else {
        var currDgmnData = _this.getCurrDgmnData();
        var nextImages = _this.dgmnUtility.getAllHatchImages(currDgmnData.eggField);
        _this.systemAH.loadImages(nextImages, function () {
          _this.removeSubMenu('evolve');
          if (_this.origin === 'hatch') _this.gotoHatch(currDgmnData);
          if (_this.origin === 'victory') {
            if (_this.isBoss) {
              _this.gotoBossRewards(currDgmnData);
            } else {
              _this.currDgmnIndex--;
              _this.wrapUpLevelUp();
            }
          }
        });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "wrapUpBossReward", function () {
      _this.removeSubMenu('bossReward');
      var currDgmn = _this.dgmnAH.getDgmnParty()[_this.currDgmnIndex];
      var currDgmnData = _this.getCurrDgmnData();
      console.log("All Level Ups ? ", _this.levelUps);
      console.log("Can Level Up ? ", _this.levelUps[currDgmn]);
      if (_this.levelUps[currDgmn]) {
        _this.gotoLevelUp(currDgmnData);
      } else {
        _this.wrapUpLevelUp(false);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "gotoNextScreen", function () {
      if (_this.origin === 'hatch') {
        if (_this.subMenus.rewards) {
          _this.wrapUpRewards();
        } else if (_this.subMenus.hatch) {
          _this.wrapUpHatch();
        } else if (_this.subMenus.evolve) {
          _this.wrapUpEvolution();
        }
      } else if (_this.origin === 'victory') {
        if (_this.subMenus.rewards) {
          _this.wrapUpRewards();
        } else if (_this.subMenus.level) {
          _this.wrapUpLevelUp();
        } else if (_this.subMenus.evolve) {
          _this.wrapUpEvolution();
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "checkAllLevelUps", function () {
      var _iterator = _createForOfIteratorHelper(_this.dgmnAH.getDgmnParty()),
          _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var dgmn = _step.value;
          if (_this.dgmnAH.checkLevelUp(dgmn)) _this.levelUps[dgmn] = true;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "getCurrDgmnData", function () {
      var currDgmn = _this.dgmnAH.getDgmnParty()[_this.currDgmnIndex];
      var currDgmnData = _this.dgmnAH.getDgmnData(currDgmn, ['eggField', 'currentFP', 'nickname', 'speciesName', 'currentStats', 'currentLevel', 'currentXP'], false);
      currDgmnData.dgmnId = currDgmn;
      return currDgmnData;
    });
    _defineProperty(_assertThisInitialized(_this), "hatchDgmn", function () {
      var hatchIntoDgmn = _this.subMenus.hatch.selectedDgmn;
      _this.dgmnAH.hatchEgg(_this.dgmnAH.getDgmnParty()[_this.currDgmnIndex], hatchIntoDgmn);
    });
    _defineProperty(_assertThisInitialized(_this), "evolveIntoDgmn", function () {
      var evolution = _this.subMenus.evolve.selectedDgmn;
      _this.dgmnAH.evolve(_this.dgmnAH.getDgmnParty()[_this.currDgmnIndex], evolution);
    });
    _defineProperty(_assertThisInitialized(_this), "drawMenu", function () {
      for (var key in _this.subMenus) {
        if (_this.subMenus[key].isVisible) {
          _this.menuCanvas.paintCanvas(_this.subMenus[key].menuCanvas);
        }
      }
      _this.origin === 'hatch' ? _this.parentAH.drawDungeon() : _this.parentAH.drawBattleCanvas();
    });
    _defineProperty(_assertThisInitialized(_this), "drawEggs", function () {
      _this.menuCanvas.paintImage(_this.systemAH.fetchImage('eggDR'), 2 * CFG.tileSize, 8 * CFG.tileSize);
      _this.menuCanvas.paintImage(_this.systemAH.fetchImage('eggJT'), 8 * CFG.tileSize, 8 * CFG.tileSize);
      _this.menuCanvas.paintImage(_this.systemAH.fetchImage('eggME'), 14 * CFG.tileSize, 8 * CFG.tileSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmn", function () {
      var i = 0;
      var _iterator2 = _createForOfIteratorHelper(_this.dgmnAH.getDgmnParty()),
          _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var dgmn = _step2.value;
          var species = _this.dgmnAH.getDgmnData(dgmn, ['speciesName']).speciesName;
          _this.menuCanvas.paintImage(_this.systemAH.fetchImage("".concat(species.toLowerCase(), "Idle0")), (2 + i * 6) * CFG.tileSize, 8 * CFG.tileSize);
          i++;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "nextHatch", function () {
      _this.subMenus.hatch.nextChoice();
    });
    _defineProperty(_assertThisInitialized(_this), "prevHatch", function () {
      _this.subMenus.hatch.prevChoice();
    });
    _defineProperty(_assertThisInitialized(_this), "selectHatch", function () {
      if (_this.subMenus.hatch.canHatch()) {
        _this.hatchDgmn();
        _this.gotoNextScreen();
      } else {
        debugLog('Cannot Hatch That One');
      }
    });
    _defineProperty(_assertThisInitialized(_this), "nextEvo", function () {
      _this.subMenus.evolve.nextChoice();
    });
    _defineProperty(_assertThisInitialized(_this), "prevEvo", function () {
      _this.subMenus.evolve.prevChoice();
    });
    _defineProperty(_assertThisInitialized(_this), "selectEvo", function () {
      if (_this.subMenus.evolve.canEvolve()) {
        _this.evolveIntoDgmn();
        _this.gotoNextScreen();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "skipEvo", function () {
      _this.gotoNextScreen();
    });
    _defineProperty(_assertThisInitialized(_this), "updateBossRewardText", function (message, timing) {
      if (timing === 'instant') {
        _this.bossRewardActionTxt.instantText(_this.menuCanvas.ctx, message);
      } else {
        _this.bossRewardActionTxt.instantText(_this.menuCanvas.ctx, message, _this.drawMenu);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "prevBossReward", function () {
      _this.subMenus.bossReward.prevChoice(_this.updateBossRewardText);
    });
    _defineProperty(_assertThisInitialized(_this), "nextBossReward", function () {
      _this.subMenus.bossReward.nextChoice(_this.updateBossRewardText);
    });
    _defineProperty(_assertThisInitialized(_this), "selectBossReward", function () {
      if (_this.currState === 'loading') return;
      var currBossReward = _this.subMenus.bossReward.listItems[_this.subMenus.bossReward.currIndex];
      var currDgmn = _this.dgmnAH.getDgmnParty()[_this.currDgmnIndex];
      var onDoneCallbacks = {
        fp: function fp() {
          if (_this.subMenus.bossReward.inFPSelection) {
            _this.dgmnAH.giveUpgrade(currDgmn, 'FP', FIELD_LABELS[_this.subMenus.bossReward.FPIndex]);
            _this.wrapUpBossReward();
          }
        },
        xp: function xp() {
          _this.dgmnAH.giveUpgrade(currDgmn, 'XP');
          _this.wrapUpBossReward();
        },
        en: function en() {
          _this.dgmnAH.giveUpgrade(currDgmn, 'EN');
          _this.wrapUpBossReward();
        }
      };
      var isMovingForward = currBossReward === 'xp' || currBossReward === 'en' || currBossReward === 'fp' && _this.subMenus.bossReward.inFPSelection;
      if (isMovingForward) _this.currState = 'loading';
      _this.subMenus.bossReward.selectChoice(onDoneCallbacks[currBossReward]);
    });
    _defineProperty(_assertThisInitialized(_this), "confirmLevelUp", function () {
      _this.gotoNextScreen();
    });
    _this.origin = origin;
    _this.currDgmnIndex = 0;
    _this.rewards = [];
    _this.isBoss = isBoss;
    _this.levelUps = {};
    _this.topTxt = new TextArea(0, 0, 20, 1);
    _this.subTopTxt = new TextArea(0, 1, 20, 1);
    _this.actionTxt = new TextArea(2, 15, 16, 2);
    _this.bossRewardActionTxt = new TextArea(4, 14, 14, 4);
    _this.dgmnUtility = new DgmnUtility();
    _this.dgmnAH = dgmnAH;
    _this.dgmnGrowthMenuAH = new DgmnGrowthMenuAH({
      getStateCB: _this.getState,
      giveCurrRewardCB: _this.giveCurrReward,
      nextHatchCB: _this.nextHatch,
      prevHatchCB: _this.prevHatch,
      prevEvoCB: _this.prevEvo,
      nextEvoCB: _this.nextEvo,
      prevBossRewardCB: _this.prevBossReward,
      nextBossRewardCB: _this.nextBossReward,
      selectBossRewardCB: _this.selectBossReward,
      selectHatchCB: _this.selectHatch,
      selectEvoCB: _this.selectEvo,
      confirmLevelUpCB: _this.confirmLevelUp,
      skipEvoCB: _this.skipEvo
    });
    return _this;
  }
  return DgmnGrowthMenu;
}(Menu);

var CannonCanvas = function (_GameCanvas) {
  _inherits(CannonCanvas, _GameCanvas);
  var _super = _createSuper(CannonCanvas);
  function CannonCanvas(drawCB) {
    _classCallCheck(this, CannonCanvas);
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return _super.call.apply(_super, [this].concat(args));
  }
  return CannonCanvas;
}(GameCanvas);

var CannonManager = function CannonManager() {
  var _this = this;
  _classCallCheck(this, CannonManager);
  _defineProperty(this, "initAH", function (dgmnAH, battleAH) {
    _this.dgmnAH = dgmnAH;
    _this.battleAH = battleAH;
    _this.cannonCanvas = new CannonCanvas(_this.battleAH.drawBattleCanvas, 'cannon', 96, 96, 32, 16);
  });
  _defineProperty(this, "shoot", function (item, side, target, onDone) {
    var effect = itemsDB[itemByName[item.name]].effect;
    var effectMessage = '';
    switch (effect.type) {
      case 'heal':
        _this.dgmnAH.useItemOn(_this.dgmnAH.getDgmnParty()[target[0]], itemByName[item.name]);
        effectMessage = "Healed DGMN ".concat(effect.amount).concat(effect.stat, "!");
        break;
      default:
        effectMessage = 'Used an Item but it did bad';
        break;
    }
    _this.runCannonAnimation(item.name, [effectMessage], onDone);
  });
  _defineProperty(this, "runCannonAnimation", function (item, effectMessage, onDone) {
    _this.battleAH.drawActionText('beetle', ["Gunnar fired ".concat(item, "!")]);
    setTimeout(function () {
      _this.battleAH.drawActionText('beetle', effectMessage);
    }, 1600);
    setTimeout(function () {
      _this.battleAH.drawAllStatuses();
      onDone('dgmn');
    }, 3200);
  });
  this.dgmnAH;
  this.battleAH;
  this.cannonCanvas;
  this.attackUtility = new AttackUtility();
  this.dgmnUtility = new DgmnUtility();
};

var Battle = function Battle(isBoss, isDebug) {
  var _this = this;
  _classCallCheck(this, Battle);
  _defineProperty(this, "init", function () {
    debugLog("Building New Battle...");
    _this.battleMenu = new BattleMenu(_this.digiBeetleAH, _this.systemAH, _this.gameAH, _this.battleAH);
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
    _this.cannonManager.initAH(_this.dgmnAH, _this.battleAH);
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
    var currentFloor = !_this.isDebug ? _this.dungeonAH.getCurrentFloor() : 0;
    _this.dgmnAH.generateEnemies(currentFloor, 3);
  });
  _defineProperty(this, "calcTurnOrder", function () {
    var order = _this.yourParty.concat(_this.enemyParty);
    for (var i = 0; i < order.length; i++) {
      for (var r = 0; r < order.length - 1; r++) {
        var temp = order[r];
        var currSPD = _this.dgmnAH.getDgmnData(order[r], ['currentStats'], order[r].charAt(0) === 'e').currentStats.SPD * _this.dgmnAH.getDgmnData(order[r], ['statMods'], order[r].charAt(0) === 'e').statMods.SPD;
        var nextSPD = _this.dgmnAH.getDgmnData(order[r + 1], ['currentStats'], order[r + 1].charAt(0) === 'e').currentStats.SPD * _this.dgmnAH.getDgmnData(order[r + 1], ['statMods'], order[r + 1].charAt(0) === 'e').statMods.SPD;
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
    var dgmnData = isEnemy ? _this.dgmnAH.getDgmnData(_this.enemyParty[dgmnIndex], ['combo', 'weak', 'isDead', 'statMods', 'condition'], true) : _this.dgmnAH.getDgmnData(_this.yourParty[dgmnIndex], ['combo', 'weak', 'isDead', 'statMods', 'condition'], false);
    _this.drawDgmnStatusMeter(isEnemy, dgmnIndex, 'hp');
    _this.drawDgmnStatusMeter(isEnemy, dgmnIndex, 'en');
    _this.drawDgmnStatusCombo(isEnemy, dgmnIndex, dgmnData.combo);
    _this.drawDgmnStatusWeak(isEnemy, dgmnIndex, dgmnData.weak);
    if (!dgmnData.isDead) {
      var _dgmnData$condition;
      _this.drawDgmnStatBuff(isEnemy, dgmnIndex, dgmnData.statMods);
      _this.drawDgmnCondition(isEnemy, dgmnIndex, (_dgmnData$condition = dgmnData.condition) === null || _dgmnData$condition === void 0 ? void 0 : _dgmnData$condition.type);
    }
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
  _defineProperty(this, "drawDgmnStatBuff", function (isEnemy, dgmnIndex, statMods) {
    if (!_this.battleUtility.hasBuffedStat(statMods)) return;
    _this.dgmnStatusCanvas.drawDgmnStatBuff(isEnemy, dgmnIndex, _this.systemAH.fetchImage('statBuff'));
  });
  _defineProperty(this, "drawDgmnStatDebuff", function (isEnemy, dgmnIndex, statMods) {
    if (!_this.battleUtility.hasdeBuffedStat(statMods)) return;
    _this.dgmnStatusCanvas.drawDgmnStatDebuff(isEnemy, dgmnIndex, _this.systemAH.fetchImage('statDebuff'));
  });
  _defineProperty(this, "drawDgmnCondition", function (isEnemy, dgmnIndex, condition) {
    if (!condition) return;
    _this.dgmnStatusCanvas.drawDgmnCondition(isEnemy, dgmnIndex, _this.systemAH.fetchImage(condition + 'Condition'));
  });
  _defineProperty(this, "drawActionText", function (species, messages) {
    _this.battleMenu.drawActionText(species, messages);
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
    } else if (_this.dgmnGrowthMenu) {
      _this.battleCanvas.paintCanvas(_this.dgmnGrowthMenu.menuCanvas);
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
    _this.giveDgmnBaseXP();
    _this.battleMenu.drawVictoryMessage();
    _this.battleMenu.endBattle(_this.battleRewards, _this.battleBaseXP);
  });
  _defineProperty(this, "giveDgmnBaseXP", function () {
    for (var i = 0; i < 3; i++) {
      if (!_this.getDgmnDataByIndex(i, ['isDead'], false).isDead) {
        _this.dgmnAH.giveDgmnXP(_this.yourParty[i], _this.battleBaseXP);
      }
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
  _defineProperty(this, "closeGrowthMenu", function () {
    _this.end();
  });
  _defineProperty(this, "gotoRewards", function () {
    _this.battleState = 'victory';
    _this.battleMenu.menuCanvas.clearCanvas();
    _this.battleMenu = null;
    _this.stopDgmnBattleCanvas();
    _this.dgmnGrowthMenu = new DgmnGrowthMenu('victory', _this.dgmnAH, _this.isBoss, _this.systemAH, _this.gameAH, _this.battleAH, 'victory');
    _this.battleIO.setMenuAH(_this.dgmnGrowthMenu.dgmnGrowthMenuAH);
    _this.dgmnGrowthMenu.gotoRewards(_this.battleRewards);
  });
  _defineProperty(this, "shootCannon", function (item, target) {
    _this.cannonManager.shoot(item, 'party', target, _this.battleMenu.selectBeetleIcon);
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
      var possibleAttacks = _this.dgmnAH.getDgmnData(_this.enemyParty[enemy], ['attacks'], true).attacks;
      var attackChoice = possibleAttacks[Math.floor(Math.random() * possibleAttacks.length)].attackName;
      var action = _this.attackUtility.getAttackData(attackChoice, ['type', 'hits', 'targets', 'power', 'type', 'maxCost']);
      action.attackName = attackChoice;
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
  _defineProperty(this, "getIsBoss", function () {
    return _this.isBoss;
  });
  this.isDebug = isDebug;
  this.battleActive = true;
  this.turn = 0;
  this.yourParty;
  this.enemyParty = ['edId0', 'edId1', 'edId2'];
  this.isBoss = isBoss;
  this.battleState = 'loading';
  this.battleRewards = [];
  this.battleBaseXP = 0;
  this.attackChoice;
  this.systemAH;
  this.gameAH;
  this.digiBeetleAH;
  this.dgmnAH;
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
    closeGrowthMenuCB: this.closeGrowthMenu,
    shootCannonCB: this.shootCannon
  });
  this.battleIO = new BattleIO(this.battleAH);
  this.battleUtility = new BattleUtility();
  this.dgmnUtility = new DgmnUtility();
  this.attackUtility = new AttackUtility();
  this.attackManager = new AttackManager();
  this.cannonManager = new CannonManager();
  this.battleCanvas;
  this.dgmnStatusCanvas;
  this.battleMenu;
  this.victoryMenu;
  this.dgmnGrowthMenu;
}
;

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
      _this.paintImage(image, roomX * CFG.screenSize, roomY * CFG.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "drawTile", function (image, room, tile) {
      var roomXOffset = room[1] * 16 * 8;
      var roomYOffset = room[0] * 16 * 8;
      var tileXOffset = tile[1] * 16;
      var tileYOffset = tile[0] * 16;
      _this.paintImage(image, (roomXOffset + tileXOffset) * CFG.screenSize, (roomYOffset + tileYOffset) * CFG.screenSize);
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
    _this.floorCanvas = new FloorCanvas('floor-canvas', _this.roomMatrix[0].length * 128, _this.roomMatrix.length * 128);
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
    var floorDimensions = _this.mapUtility.isBossFloor(floorNumber) ? 'boss' : _this.mapUtility.calculateDungeonDimensions(floorNumber);
    var roomNumbers = _this.mapUtility.getFloorLayout(floorDimensions, floorNumber);
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
      } else if (eventOrder[i] === 'trap') ; else if (eventOrder[i] === 'treasure') {
        _this.generateTreasure();
      }
    }
  });
  _defineProperty(this, "generateEnemies", function () {
    var potentialSpots = _this.findAllTilesOnFloor([6, 8, 10, 11, 12, 14, 15]);
    var enemyChance = _this.floorEventMod === 'enemy' ? 30 : 15;
    var encounterCount = 1;
    var maxEncounters = _this.mapUtility.isBossFloor(_this.number) ? 1 : 4;
    var minEncounters = _this.mapUtility.isBossFloor(_this.number) ? 1 : 2;
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
    debugLog("  - Encounters : ", _this.encounters);
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
    debugLog("  - Treasures : ", _this.treasures);
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
    var moveX = dir === 'down' || dir === 'up' ? null : _this.floorCanvas.x + delta * CFG.screenSize;
    var moveY = dir === 'right' || dir === 'left' ? null : _this.floorCanvas.y + delta * CFG.screenSize;
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
    room.changeTile([treasureTile.tile[0], treasureTile.tile[1]], 1);
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
    var xOffset = 64 * CFG.screenSize - _this.mapUtility.getTotalOffset(_this.start.room[1], _this.start.tile[1]);
    var yOffset = 64 * CFG.screenSize - _this.mapUtility.getTotalOffset(_this.start.room[0], _this.start.tile[0]);
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
  this.isBossFloor = this.mapUtility.isBossFloor(_floorNumber);
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
  this.getTreasure = function (treasure) {
    return cbObj.getTreasureCB(treasure);
  };
  this.closeTextBox = function () {
    return cbObj.closeTextBoxCB();
  };
  this.bringUpMenu = function () {
    return cbObj.bringUpMenuCB();
  };
  this.closeGrowthMenu = function () {
    cbObj.closeGrowthMenuCB();
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
      _this.menuAH = ah;
    });
    _defineProperty(_assertThisInitialized(_this), "cancelKeyHandler", function (upDown) {
      var cancelStates = ['items', 'items-target', 'items-done'];
      if (_this.dungeonAH.getDungeonState() === 'main-menu' && cancelStates.indexOf(_this.menuAH.getState()) !== -1) {
        _this.menuAH.backMenu();
      } else if (_this.dungeonAH.getDungeonState() === 'main-menu' && _this.menuAH.getState() === 'main') {
        _this.dungeonAH.bringUpMenu();
      } else if (_this.dungeonAH.getDungeonState() === 'hatch') {
        if (_this.menuAH.getState() === 'evo-choice') {
          _this.menuAH.skipEvo();
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "actionKeyHandler", function (upDown) {
      if (_this.dungeonAH.getDungeonState() === 'hatch') {
        if (_this.menuAH.getState() === 'hatch-choice') {
          _this.menuAH.selectHatch();
        } else if (_this.menuAH.getState() === 'evo-choice') {
          _this.menuAH.selectEvo();
        }
      } else if (_this.dungeonAH.getDungeonState() === 'main-menu') {
        if (_this.menuAH.getState() === 'main') {
          _this.menuAH.selectIcon();
        } else if (_this.menuAH.getState() === 'items' || _this.menuAH.getState() === 'items-target' || _this.menuAH.getState() === 'items-done') {
          _this.menuAH.selectListItem();
        }
      } else if (_this.dungeonAH.getDungeonState() === 'text-box-next') {
        _this.dungeonAH.closeTextBox();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "startKeyHandler", function (upDown) {
      if (_this.dungeonAH.getDungeonState() === 'free' || _this.dungeonAH.getDungeonState() === 'main-menu') {
        _this.dungeonAH.bringUpMenu();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "upKeyHandler", function (upDown) {
      if (_this.dungeonAH.getDungeonState() === 'hatch' && upDown === 'down') {
        if (_this.menuAH.getState() === 'rewards') _this.menuAH.giveCurrReward('up');
      } else if (_this.dungeonAH.getDungeonState() === 'free') {
        _this.movingInDirection('up', upDown);
      } else if (_this.dungeonAH.getDungeonState() === 'main-menu') {
        if (_this.menuAH.getState() === 'items' || _this.menuAH.getState() === 'items-target') {
          _this.menuAH.upListItem();
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "rightKeyHandler", function (upDown) {
      if (_this.dungeonAH.getDungeonState() === 'hatch' && upDown === 'down') {
        if (_this.menuAH.getState() === 'rewards') {
          _this.menuAH.giveCurrReward('right');
        } else if (_this.menuAH.getState() === 'hatch-choice') {
          _this.menuAH.nextHatch();
        } else if (_this.menuAH.getState() === 'evo-choice') {
          _this.menuAH.nextEvo();
        }
      } else if (_this.dungeonAH.getDungeonState() === 'main-menu') {
        if (_this.menuAH.getState() === 'main') {
          _this.menuAH.nextIcon();
        } else if (_this.menuAH.getState() === 'items') {
          _this.menuAH.rightListItem();
        }
      } else if (_this.dungeonAH.getDungeonState() === 'free') {
        _this.movingInDirection('right', upDown);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "downKeyHandler", function (upDown) {
      if (_this.dungeonAH.getDungeonState() === 'free') {
        _this.movingInDirection('down', upDown);
      } else if (_this.dungeonAH.getDungeonState() === 'main-menu') {
        if (_this.menuAH.getState() === 'items' || _this.menuAH.getState() === 'items-target') {
          _this.menuAH.downListItem();
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "leftKeyHandler", function (upDown) {
      if (_this.dungeonAH.getDungeonState() === 'hatch' && upDown === 'down') {
        if (_this.menuAH.getState() === 'rewards') {
          _this.menuAH.giveCurrReward('left');
        } else if (_this.menuAH.getState() === 'hatch-choice') {
          _this.menuAH.prevHatch();
        } else if (_this.menuAH.getState() === 'evo-choice') {
          _this.menuAH.prevEvo();
        }
      } else if (_this.dungeonAH.getDungeonState() === 'main-menu') {
        if (_this.menuAH.getState() === 'main') {
          _this.menuAH.prevIcon();
        } else if (_this.menuAH.getState() === 'items') {
          _this.menuAH.leftListItem();
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
    _this.menuAH;
    return _this;
  }
  return DungeonIO;
}(IO);

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

var PauseMenuAH = function PauseMenuAH(cbObj) {
  _classCallCheck(this, PauseMenuAH);
  this.getState = function () {
    return cbObj.getStateCB();
  };
  this.nextIcon = function () {
    return cbObj.nextIconCB();
  };
  this.prevIcon = function () {
    return cbObj.prevIconCB();
  };
  this.selectIcon = function () {
    return cbObj.selectIconCB();
  };
  this.upListItem = function () {
    return cbObj.upListItemCB();
  };
  this.rightListItem = function () {
    return cbObj.rightListItemCB();
  };
  this.downListItem = function () {
    return cbObj.downListItemCB();
  };
  this.leftListItem = function () {
    return cbObj.leftListItemCB();
  };
  this.selectListItem = function () {
    return cbObj.selectListItemCB();
  };
  this.backMenu = function () {
    return cbObj.backMenuCB();
  };
};

var ItemsMenu = function (_ListMenu) {
  _inherits(ItemsMenu, _ListMenu);
  var _super = _createSuper(ItemsMenu);
  function ItemsMenu(drawTopText, drawBottomSection, digiBeetleBox) {
    var _this;
    _classCallCheck(this, ItemsMenu);
    for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "drawList", function () {
      var boxSize = _this.digiBeetleUtility.getToolBoxMax(_this.digiBeetleBoxType);
      for (var i = 0; i < boxSize; i++) {
        var columnOffset = (i + 1) % 2 === 0 ? 9 : 0;
        var item = i < _this.listItems.length ? _this.treasureUtility.getTreasureName(_this.listItems[i]) : '---';
        var color = item === '---' ? 'darkGreen' : 'white';
        var itemNameTxt = new TextArea(1 + columnOffset, Math.floor(i / 2), 8, 1);
        itemNameTxt.instantText(_this.menuCanvas.ctx, item, color);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "drawMenu", function () {
      _this.menuCanvas.blackFill();
      _this.drawList();
      _this.drawCursor();
      _this.drawBottomSection('item', {
        itemName: _this.listItems[_this.currIndex]
      });
    });
    _defineProperty(_assertThisInitialized(_this), "drawCursor", function (index) {
      var spotIndex = index ? index : _this.currIndex;
      var columnOffset = (spotIndex + 1) % 2 === 0 ? 9 : 0;
      _this.menuCanvas.paintImage(_this.cursorImg, columnOffset * CFG.tileSize, Math.floor(spotIndex / 2) % _this.itemAmount * (8 * _this.itemHeight) * CFG.screenSize);
    });
    _defineProperty(_assertThisInitialized(_this), "upListItem", function () {
      if (_this.currIndex - 2 >= 0) {
        _this.currIndex -= 2;
        _this.drawMenu();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "rightListItem", function () {
      if ((_this.currIndex + 1) % 2 !== 0 && _this.currIndex + 1 < _this.listItems.length) {
        _this.currIndex++;
        _this.drawMenu();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "downListItem", function () {
      if (_this.currIndex + 2 < _this.listItems.length) {
        _this.currIndex += 2;
        _this.drawMenu();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "leftListItem", function () {
      if ((_this.currIndex + 1) % 2 === 0) {
        _this.currIndex--;
        _this.drawMenu();
      }
    });
    _this.digiBeetleBoxType = digiBeetleBox;
    _this.treasureUtility = new TreasureUtility();
    _this.digiBeetleUtility = new DigiBeetleUtility();
    _this.drawTopText = drawTopText;
    _this.drawBottomSection = drawBottomSection;
    return _this;
  }
  return ItemsMenu;
}(ListMenu);

var PauseMenu = function (_Menu) {
  _inherits(PauseMenu, _Menu);
  var _super = _createSuper(PauseMenu);
  function PauseMenu(party, dgmnAH, digiBeetleAH) {
    var _this;
    _classCallCheck(this, PauseMenu);
    for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "launchMenu", function () {
      _this.menuCanvas.paintImage(_this.systemAH.fetchImage('dungeonPauseOverlay'), 0, 0);
      _this.addSubMenu('main', new IconMenu([16, 16], ['items', 'beetle'], 'pause-main'));
      _this.currSubMenu = 'main';
      _this.subMenus.main.isVisible = true;
      if (_this.digiBeetleAH.getToolBoxItems().length === 0) _this.subMenus.main.disabledIcons.push('items');
      _this.subMenus.main.images = _this.buildIconImages(_this.subMenus.main.iconList);
      _this.subMenus.main.drawIcons(0);
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "closeMenu", function () {
      _this.removeSubMenu('main');
      _this.currSubMenu = '';
      _this.menuCanvas.clearCanvas();
      _this.digiBeetleAH.showCanvas();
    });
    _defineProperty(_assertThisInitialized(_this), "nextIcon", function () {
      _this.subMenus[_this.currSubMenu].nextIcon();
      _this.subMenus[_this.currSubMenu].getCurrLabel();
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "prevIcon", function () {
      _this.subMenus[_this.currSubMenu].prevIcon();
      _this.subMenus[_this.currSubMenu].getCurrLabel();
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "selectIcon", function () {
      var selected = _this.subMenus[_this.currSubMenu].getCurrLabel();
      _this.subMenus[_this.currSubMenu].selectIcon();
      if (selected === 'items') {
        _this.launchItemMenu();
      } else if (selected === 'beetle') {
        warningLog('DigiBeetle Menu is not ready yet...');
      }
    });
    _defineProperty(_assertThisInitialized(_this), "launchItemMenu", function () {
      debugLog('Launch Item Menu');
      _this.removeSubMenu('main');
      _this.digiBeetleAH.hideCanvas();
      _this.menuCanvas.paintImage(_this.systemAH.fetchImage('basicMenu'), 0, 0);
      _this.addSubMenu('items', new ItemsMenu(_this.drawTopText, _this.drawBottomSection, _this.digiBeetleAH.getToolBoxType(), [0, 1], 12, 20, 1, _this.digiBeetleAH.getToolBoxItems(), _this.systemAH.fetchImage('miniCursor'), null, 'item'));
      _this.currState = 'items';
      _this.subMenus.items.isVisible = true;
      _this.refreshItemMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "refreshItemMenu", function () {
      if (_this.digiBeetleAH.getToolBoxItems().length === 0) {
        _this.closeItemMenu();
        return;
      }
      _this.drawTopText('Select an Item');
      _this.subMenus.items.currIndex = 0;
      _this.subMenus.items.drawMenu();
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "closeItemMenu", function () {
      _this.removeSubMenu('items');
      _this.currState = 'main';
      _this.menuCanvas.clearCanvas();
      _this.floorRedraw();
      _this.digiBeetleAH.showCanvas();
      _this.launchMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "launchItemTargetSelect", function () {
      _this.dgmnData = _this.buildDgmnData();
      _this.currState = 'items-target';
      _this.drawTopText('Select a Target');
      _this.addSubMenu('itemTarget', new ListMenu([5, 5], 3, 10, 1, [_this.dgmnData[0].nickname, 'SPROUT', 'GEAR'], _this.systemAH.fetchImage('miniCursor'), null, 'item-target'));
      _this.subMenus.itemTarget.isVisible = true;
      _this.subMenus.itemTarget.drawMenu();
      _this.drawBottomSection('dgmn', _this.dgmnData[0]);
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "closeItemTargetSelect", function () {
      _this.currState = 'items';
      _this.drawTopText('Select an Item');
      _this.removeSubMenu('itemTarget');
      _this.drawBottomSection('item', {
        itemName: _this.subMenus.items.listItems[_this.subMenus.items.currIndex]
      });
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "buildDgmnData", function () {
      var data = [];
      for (var i = 0; i < _this.party.length; i++) {
        data.push(_this.dgmnAH.getDgmnData(_this.party[i], ['nickname', 'speciesName', 'currentHP', 'currentEN', 'currentLevel', 'currentStats'], false));
      }
      return data;
    });
    _defineProperty(_assertThisInitialized(_this), "drawTopText", function (message) {
      _this.menuCanvas.ctx.fillStyle = "#00131A";
      _this.menuCanvas.ctx.fillRect(0, 0, 20 * CFG.tileSize, 7 * CFG.screenSize);
      _this.topTxt.instantText(_this.menuCanvas.ctx, message, 'white');
    });
    _defineProperty(_assertThisInitialized(_this), "drawBottomSection", function (type, data) {
      _this.menuCanvas.ctx.fillStyle = "#00131A";
      _this.menuCanvas.ctx.fillRect(0, 14 * CFG.tileSize, 20 * CFG.tileSize, 4 * CFG.tileSize);
      if (type === 'item') {
        _this.itemDescriptionTxt.instantText(_this.menuCanvas.ctx, _this.treasureUtility.getItemDescription(data.itemName), 'white');
      } else if (type === 'dgmn') {
        var nicknameTxt = new TextArea(4, 14, 10, 1);
        nicknameTxt.instantText(_this.menuCanvas.ctx, data.nickname, 'white');
        var speciesTxt = new TextArea(4, 15, 16, 1);
        speciesTxt.instantText(_this.menuCanvas.ctx, data.speciesName + ".MON", 'green');
        var dgmnHPTxt = new TextArea(4, 16, 10, 1);
        dgmnHPTxt.instantText(_this.menuCanvas.ctx, ".hp" + _this.menuUtility.prependZeros(data.currentHP, 3) + "-" + data.currentStats.HP, "white");
        var dgmnENTxt = new TextArea(4, 17, 10, 1);
        dgmnENTxt.instantText(_this.menuCanvas.ctx, ".en" + _this.menuUtility.prependZeros(data.currentEN, 3) + "-100", "white");
        var dgmnLVTxt = new TextArea(16, 14, 4, 1);
        dgmnLVTxt.instantText(_this.menuCanvas.ctx, ".lv" + _this.menuUtility.prependZeros(data.currentLevel, 3), "white");
        _this.menuCanvas.paintImage(_this.systemAH.fetchImage("".concat(data.speciesName.toLowerCase(), "Portrait")), 0, 14 * CFG.tileSize);
      } else if (type === 'message') {
        _this.itemDescriptionTxt.timedText(_this.menuCanvas.ctx, data.message, _this.drawMenu);
        setTimeout(function () {
          _this.currState = 'items-done';
        }, 500);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "drawMenu", function () {
      for (var key in _this.subMenus) {
        if (_this.subMenus[key].isVisible) {
          if (key === 'itemTarget') {
            _this.menuCanvas.paintImage(_this.systemAH.fetchImage('itemsTargetOverlay'), 0, 0);
          }
          _this.menuCanvas.paintCanvas(_this.subMenus[key].menuCanvas);
        }
      }
      _this.parentAH.drawDungeon();
    });
    _defineProperty(_assertThisInitialized(_this), "selectListItem", function () {
      if (_this.currState === 'items') {
        var item = _this.subMenus.items.listItems[_this.subMenus.items.currIndex];
        console.log("Selecting Item = ", item);
        if (_this.treasureUtility.isTreasureUsable(item, 'dungeon')) {
          var target = _this.treasureUtility.getItemTarget(item);
          console.log("TARGET ? ", target);
          if (target === 'party') {
            _this.launchItemTargetSelect();
          } else if (target === 'your-dgmn-all') {
            console.log("USE ITEM ON ALL DGMN");
          } else if (target === 'beetle') {
            console.log("USE ITEM ON BEETLE");
          }
        }
      } else if (_this.currState === 'items-target') {
        _this.dgmnAH.useItemOn(_this.party[_this.subMenus.itemTarget.currIndex], _this.subMenus.items.listItems[_this.subMenus.items.currIndex]);
        var message = "Used ".concat(_this.treasureUtility.getTreasureName(_this.subMenus.items.listItems[_this.subMenus.items.currIndex]), " on DGMN");
        _this.drawBottomSection('message', {
          message: message
        });
        _this.digiBeetleAH.removeItemFromToolBox(_this.subMenus.items.currIndex);
      } else if (_this.currState === 'items-done') {
        _this.currState = 'items';
        _this.removeSubMenu('itemTarget');
        _this.drawBottomSection('items', {
          itemName: _this.subMenus.items.listItems[_this.subMenus.items.currIndex]
        });
        _this.refreshItemMenu();
        _this.drawMenu();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "backMenu", function () {
      console.log("Going Back from ", _this.currState);
      if (_this.currState === 'items') {
        _this.closeItemMenu();
      } else if (_this.currState === 'items-target') {
        _this.closeItemTargetSelect();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "upListItem", function () {
      if (_this.currState === 'items') {
        _this.subMenus.items.upListItem();
        _this.drawMenu();
      } else if (_this.currState === 'items-target') {
        _this.subMenus.itemTarget.prevListItem();
        _this.drawBottomSection('dgmn', _this.dgmnData[_this.subMenus.itemTarget.currIndex]);
        _this.drawMenu();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "downListItem", function () {
      if (_this.currState === 'items') {
        _this.subMenus.items.downListItem();
        _this.drawMenu();
      } else if (_this.currState === 'items-target') {
        _this.subMenus.itemTarget.nextListItem();
        _this.drawBottomSection('dgmn', _this.dgmnData[_this.subMenus.itemTarget.currIndex]);
        _this.drawMenu();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "rightListItem", function () {
      _this.subMenus.items.rightListItem();
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "leftListItem", function () {
      _this.subMenus.items.leftListItem();
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "getState", function () {
      return _this.currState;
    });
    _this.currState = 'main';
    _this.dgmnAH = dgmnAH;
    _this.digiBeetleAH = digiBeetleAH;
    _this.treasureUtility = new TreasureUtility();
    _this.party = party;
    _this.dgmnData;
    _this.floorRedraw;
    _this.pauseMenuAH = new PauseMenuAH({
      getStateCB: _this.getState,
      nextIconCB: _this.nextIcon,
      prevIconCB: _this.prevIcon,
      selectIconCB: _this.selectIcon,
      upListItemCB: _this.upListItem,
      rightListItemCB: _this.rightListItem,
      downListItemCB: _this.downListItem,
      leftListItemCB: _this.leftListItem,
      selectListItemCB: _this.selectListItem,
      backMenuCB: _this.backMenu
    });
    _this.menuCanvas = new MenuCanvas('main-menu', 160, 144);
    _this.topTxt = new TextArea(0, 0, 20, 1);
    _this.itemDescriptionTxt = new TextArea(0, 14, 20, 4);
    return _this;
  }
  return PauseMenu;
}(Menu);

var Dungeon = function Dungeon(isNewDungeon, loadedCallback) {
  var _this = this;
  _classCallCheck(this, Dungeon);
  _defineProperty(this, "init", function () {
    _this.yourParty = _this.gameAH.getDgmnParty();
    _this.systemAH.startLoading(function () {
      _this.gameAH.addCanvasObject(_this.dungeonCanvas);
      _this.dgmnGrowthMenu = new DgmnGrowthMenu('hatch', _this.dgmnAH, false, _this.systemAH, _this.gameAH, _this.dungeonAH, 'hatching');
      _this.dungeonIO.setMenuAH(_this.dgmnGrowthMenu.dgmnGrowthMenuAH);
      _this.pauseMenu = new PauseMenu(_this.yourParty, _this.dgmnAH, _this.digiBeetleAH, _this.systemAH, _this.gameAH, _this.dungeonAH);
      _this.systemAH.loadImages(fieldIcons, function () {
        _this.dgmnGrowthMenu.gotoRewards([_this.dgmnUtility.getRandomField()]);
        _this.dungeonCanvas.blackFill();
        _this.drawDungeon();
        _this.systemAH.stopLoading();
      });
    });
  });
  _defineProperty(this, "initAH", function (system, game, beetle, dgmn) {
    _this.systemAH = system;
    _this.gameAH = game;
    _this.digiBeetleAH = beetle;
    _this.dgmnAH = dgmn;
  });
  _defineProperty(this, "drawDungeon", function () {
    if (_this.dungeonState === 'hatch') {
      _this.dungeonCanvas.paintCanvas(_this.dgmnGrowthMenu.menuCanvas);
    } else if (_this.dungeonState === 'text-box' || _this.dungeonState === 'text-box-next') {
      _this.dungeonCanvas.paintCanvas(_this.textBoxCanvas);
    } else if (_this.dungeonState === 'main-menu') {
      _this.dungeonCanvas.paintCanvas(_this.pauseMenu.menuCanvas);
    } else ;
    _this.gameAH.refreshScreen();
  });
  _defineProperty(this, "closeGrowthMenu", function () {
    _this.dungeonState = 'loading';
    _this.systemAH.startLoading(function () {
      _this.buildFloor();
      _this.loadDungeonImages(_this.floor.roomMatrix);
    });
  });
  _defineProperty(this, "buildFloor", function () {
    debugLog('Building Floor : ', _this.floorNumber);
    _this.floor = new Floor(_this.floorNumber);
    _this.floor.initAH(_this.systemAH, _this.gameAH, _this.dungeonAH);
    _this.floor.generateFloor();
    _this.pauseMenu.floorRedraw = function () {
      _this.floor.redrawFloor();
    };
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
    _this.dgmnGrowthMenu = null;
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
    if (_this.floorNumber === 5) {
      debugLog("Dungeon Clear!");
      _this.goBackToTown();
    } else {
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
    }
  });
  _defineProperty(this, "goBackToTown", function () {
    debugLog("Returning to town...");
    _this.systemAH.startLoading(function () {
      _this.gameAH.clearDungeon();
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
    var isToolBoxFull = _this.digiBeetleAH.isToolBoxFull();
    var message = isToolBoxFull ? 'Found ' + _this.treasureUtility.getTreasureName(treasure) + '... But your Item Box is full.' : 'Found ' + _this.treasureUtility.getTreasureName(treasure) + '!';
    _this.textBoxCanvas.dungeonTxt.instantText(_this.textBoxCanvas.ctx, message, 'white');
    setTimeout(function () {
      if (!isToolBoxFull) _this.digiBeetleAH.addItemToToolBox(treasure);
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
  _defineProperty(this, "handleMenu", function () {
    _this.dungeonState = _this.dungeonState === 'main-menu' ? 'free' : 'main-menu';
    if (_this.dungeonState === 'main-menu') {
      _this.launchMainMenu();
    } else if (_this.dungeonState === 'free') {
      _this.closeMainMenu();
    }
  });
  _defineProperty(this, "launchMainMenu", function () {
    _this.pauseMenu.launchMenu();
    _this.dungeonIO.setMenuAH(_this.pauseMenu.pauseMenuAH);
  });
  _defineProperty(this, "closeMainMenu", function () {
    _this.pauseMenu.closeMenu();
    _this.floor.redrawFloor();
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
    closeGrowthMenuCB: this.closeGrowthMenu,
    getTreasureCB: this.getTreasure,
    closeTextBoxCB: this.closeTextBox,
    bringUpMenuCB: this.handleMenu
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
  this.dgmnGrowthMenu;
  this.pauseMenu;
  this.textBoxCanvas = new DungeonTextCanvas('dungeon-text', 160, 144);
  this.onLoaded = function () {
    loadedCallback();
  };
}
;

var TitleAH = function TitleAH(cbObj) {
  _classCallCheck(this, TitleAH);
  this.startNewGame = function () {
    return cbObj.startNewGameCB();
  };
};

var TitleIO = function (_IO) {
  _inherits(TitleIO, _IO);
  var _super = _createSuper(TitleIO);
  function TitleIO() {
    var _this;
    _classCallCheck(this, TitleIO);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "actionKeyHandler", function (upDown) {
      _this.titleAH.startNewGame();
    });
    _this.gameAH;
    _this.titleAH;
    _this.menuUtility = new MenuUtility();
    return _this;
  }
  return TitleIO;
}(IO);

var TitleMenu = function (_Menu) {
  _inherits(TitleMenu, _Menu);
  var _super = _createSuper(TitleMenu);
  function TitleMenu() {
    var _this;
    _classCallCheck(this, TitleMenu);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "init", function () {
      _this.menuCanvas.paintImage(_this.systemAH.fetchImage('titleScreen'), 0, 0);
      _this.addSubMenu('titleMain', new ListMenu([4, 13], 1, 10, 1, ['New Game', 'Continue'], _this.systemAH.fetchImage('miniCursor'), null, 'titleMain'));
      _this.subMenus.titleMain.isVisible = true;
      _this.subMenus.titleMain.isActive = true;
      _this.subMenus.titleMain.cursorOffset = 1;
      _this.subMenus.titleMain.drawMenu();
      _this.drawMenu();
      _this.titleMenuIO.gameAH = _this.gameAH;
      _this.titleMenuIO.titleAH = _this.titleAH;
    });
    _defineProperty(_assertThisInitialized(_this), "drawMenu", function () {
      for (var key in _this.subMenus) {
        if (_this.subMenus[key].isVisible) {
          _this.menuCanvas.paintCanvas(_this.subMenus[key].menuCanvas);
        }
      }
      _this.gameAH.refreshScreen();
    });
    _defineProperty(_assertThisInitialized(_this), "startNewGame", function () {
      debugLog("Starting New Game...");
      _this.gameAH.startNewGame();
    });
    _this.menuCanvas = new MenuCanvas('titleMenu', 160, 144);
    _this.titleAH = new TitleAH({
      startNewGameCB: _this.startNewGame
    });
    _this.titleMenuIO = new TitleIO();
    _this.atTitle = true;
    return _this;
  }
  return TitleMenu;
}(Menu);

var TownAH = function TownAH(cbObj) {
  _classCallCheck(this, TownAH);
  this.drawTown = function () {
    cbObj.drawTownCB();
  };
  this.enterTower = function () {
    cbObj.enterTowerCB();
  };
};

var TOWN_SCENE_CHOICES = {
  tower: ['Enter', 'Chat', 'Leave']
};
var TOWN_DGMN_TALKER = {
  tower: ['toko']
};
var TOWN_DGMN_DIALOG = {
  tower: {
    INTRO: ['Hi there! Your DigiBeetle is prepped and ready to go!']
  }
};
var TOWN_TOP_TEXT = {
  tower: ['Enter the Tower!', 'Talk to someone', 'Back to Town Map']
};

var TownMenu = function (_Menu) {
  _inherits(TownMenu, _Menu);
  var _super = _createSuper(TownMenu);
  function TownMenu() {
    var _this;
    _classCallCheck(this, TownMenu);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "buildScene", function (currScene, locationLevel) {
      var optionCount = TOWN_SCENE_CHOICES[currScene].length;
      _this.drawBackground('town_menu_background');
      _this.topTxt.instantText(_this.menuCanvas.ctx, TOWN_TOP_TEXT[currScene][0]);
      _this.chatTxt.timedText(_this.menuCanvas.ctx, TOWN_DGMN_DIALOG[currScene].INTRO[locationLevel], _this.drawMenu);
      _this.addSubMenu(currScene, new ListMenu([12, 13 - optionCount], optionCount, 6, 1, TOWN_SCENE_CHOICES[currScene], _this.systemAH.fetchImage('miniCursor'), null, currScene));
      _this.subMenus.tower.isVisible = true;
      _this.subMenus.tower.drawMenu();
      _this.drawDgmnPortrait(_this.systemAH.fetchImage(TOWN_DGMN_TALKER[currScene][locationLevel] + 'Portrait'));
      _this.drawMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "drawMenu", function () {
      for (var key in _this.subMenus) {
        if (_this.subMenus[key].isVisible) {
          _this.menuCanvas.paintCanvas(_this.subMenus[key].menuCanvas);
        }
      }
      _this.parentAH.drawTown();
    });
    _defineProperty(_assertThisInitialized(_this), "drawDgmnPortrait", function (portraitImg) {
      _this.menuCanvas.ctx.drawImage(portraitImg, 0, 0, 256, 248, 0, 112 * CFG.screenSize, 32 * CFG.screenSize, (32 - 1) * CFG.screenSize);
    });
    _this.sceneMenu;
    _this.topTxt = new TextArea(0, 0, 20, 1);
    _this.chatTxt = new TextArea(4, 14, 16, 4);
    return _this;
  }
  return TownMenu;
}(Menu);

var TownIO = function (_IO) {
  _inherits(TownIO, _IO);
  var _super = _createSuper(TownIO);
  function TownIO(townAH) {
    var _this;
    _classCallCheck(this, TownIO);
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "actionKeyHandler", function (upDown) {
      _this.townAH.enterTower();
    });
    _this.townAH = townAH;
    _this.menuAH;
    return _this;
  }
  return TownIO;
}(IO);

var Town = function Town(systemAH, gameAH) {
  var _this = this;
  _classCallCheck(this, Town);
  _defineProperty(this, "init", function () {
    _this.systemAH.startLoading(function () {
      _this.gameAH.addCanvasObject(_this.townCanvas);
      _this.systemAH.loadImages(townImages.concat(townDgmnPortraits), function () {
        _this.inTown = true;
        _this.townMenu.buildScene('tower', _this.townLevels.tower);
        _this.drawTown();
        _this.systemAH.stopLoading();
      });
    });
  });
  _defineProperty(this, "enterTower", function () {
    debugLog("Entering Tower...");
    _this.inTown = false;
    _this.gameAH.buildDungeon();
  });
  _defineProperty(this, "drawTown", function () {
    _this.townCanvas.paintCanvas(_this.townMenu.menuCanvas);
    _this.gameAH.refreshScreen();
  });
  this.systemAH = systemAH;
  this.gameAH = gameAH;
  this.state = 'tower';
  this.inTown = false;
  this.townAH = new TownAH({
    drawTownCB: this.drawTown,
    enterTowerCB: this.enterTower
  });
  this.townIO = new TownIO(this.townAH);
  this.townCanvas = new GameCanvas('dungeon-canvas', 160, 144);
  this.townMenu = new TownMenu(systemAH, gameAH, this.townAH, 'town');
  this.townLevels = {
    tower: 0
  };
}
;

var Game = function Game(systemAH) {
  var _this = this;
  _classCallCheck(this, Game);
  _defineProperty(this, "bootGame", function () {
    _this.buildTitleScreen();
  });
  _defineProperty(this, "buildTitleScreen", function () {
    _this.titleMenu.init();
    _this.addToObjectList(_this.titleMenu.menuCanvas);
    _this.drawGameScreen();
  });
  _defineProperty(this, "startNewGame", function () {
    _this.atTitle = false;
    setTimeout(function () {
      _this.buildTown();
    }, 500);
  });
  _defineProperty(this, "startBattle", function (isDebug) {
    var _this$dungeon, _this$digiBeetle;
    debugLog("Starting Battle...");
    _this.battle = new Battle(_this.dungeon.floor.isBossFloor, isDebug);
    _this.battle.initAH(_this.systemAH, _this.gameAH, _this.yourDgmn.dgmnAH, (_this$dungeon = _this.dungeon) === null || _this$dungeon === void 0 ? void 0 : _this$dungeon.dungeonAH, (_this$digiBeetle = _this.digiBeetle) === null || _this$digiBeetle === void 0 ? void 0 : _this$digiBeetle.digiBeetleAH);
    _this.battle.init();
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
  _defineProperty(this, "buildDungeon", function () {
    debugLog("Building Dungeon...");
    _this.atTitle = false;
    _this.setupPartyDgmn();
    _this.dungeon = new Dungeon(true, _this.onDungeonLoad);
    _this.digiBeetle = new DigiBeetle();
    _this.digiBeetle.initDungeonAH(_this.dungeon.dungeonAH);
    _this.digiBeetle.initGameAH(_this.gameAH);
    _this.digiBeetle.initSystemAH(_this.systemAH);
    _this.dungeon.initAH(_this.systemAH, _this.gameAH, _this.digiBeetle.digiBeetleAH, _this.yourDgmn.dgmnAH);
    _this.dungeon.init();
  });
  _defineProperty(this, "buildTown", function () {
    _this.atTitle = false;
    _this.town = new Town(_this.systemAH, _this.gameAH);
    _this.town.init();
  });
  _defineProperty(this, "setupPartyDgmn", function () {
    _this.yourDgmn.buildPartyEggs();
  });
  _defineProperty(this, "onBattleLoad", function () {
    debugLog("Battle Loaded...");
    _this.drawGameScreen();
  });
  _defineProperty(this, "onDungeonLoad", function () {
    debugLog("Dungeon Loaded...");
    _this.drawGameScreen();
  });
  _defineProperty(this, "clearDungeon", function () {
    debugLog("Clearing Dungeon...");
    _this.dungeon = null;
    _this.buildTown();
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
  _defineProperty(this, "keyHandler", function (keyState) {
    if (keyState[CFG.keyBindings.action]) {
      _this.keyManager('action');
    } else {
      _this.keyTimers.action = 0;
    }
    if (keyState[CFG.keyBindings.cancel]) {
      _this.keyManager('cancel');
    } else {
      _this.keyTimers.cancel = 0;
    }
    if (keyState[CFG.keyBindings.start]) {
      _this.keyManager('start');
    } else {
      _this.keyTimers.start = 0;
    }
    if (keyState[CFG.keyBindings.up]) {
      _this.keyManager('up', 'down');
    } else {
      _this.keyTimers.up = 0;
      _this.keyManager('up', 'up');
    }
    if (keyState[CFG.keyBindings.right]) {
      _this.keyManager('right', 'down');
    } else {
      _this.keyTimers.right = 0;
      _this.keyManager('right', 'up');
    }
    if (keyState[CFG.keyBindings.down]) {
      _this.keyManager('down', 'down');
    } else {
      _this.keyTimers.down = 0;
      _this.keyManager('down', 'up');
    }
    if (keyState[CFG.keyBindings.left]) {
      _this.keyManager('left', 'down');
    } else {
      _this.keyTimers.left = 0;
      _this.keyManager('left', 'up');
    }
  });
  _defineProperty(this, "keyManager", function (key, upDown) {
    var _this$town, _this$battle, _this$dungeon2;
    _this.keyTimers[key]++;
    if (_this.atTitle) {
      _this.titleKeyManager(key, upDown);
      return;
    }
    if ((_this$town = _this.town) !== null && _this$town !== void 0 && _this$town.inTown) {
      _this.townKeyManager(key, upDown);
      return;
    }
    if ((_this$battle = _this.battle) !== null && _this$battle !== void 0 && _this$battle.battleActive) {
      _this.battleKeyManager(key, upDown);
      return;
    }
    if (((_this$dungeon2 = _this.dungeon) === null || _this$dungeon2 === void 0 ? void 0 : _this$dungeon2.dungeonState) !== 'loading') {
      _this.dungeonKeyManager(key, upDown);
      return;
    }
  });
  _defineProperty(this, "titleKeyManager", function (key, upDown) {
    if (_this.keyTimers[key] === 2) {
      _this.titleMenu.titleMenuIO.keyTriage(key, upDown);
    }
  });
  _defineProperty(this, "townKeyManager", function (key, upDown) {
    if (_this.keyTimers[key] == 2) {
      _this.town.townIO.keyTriage(key, upDown);
    }
  });
  _defineProperty(this, "battleKeyManager", function (key, upDown) {
    if (_this.keyTimers[key] === 2) {
      _this.battle.battleIO.keyTriage(key, upDown);
    }
    if ((key === 'right' || key === 'left' || key === 'down' || key === 'up') && _this.keyTimers[key] > 15) {
      _this.keyTimers[key] = 0;
    }
  });
  _defineProperty(this, "dungeonKeyManager", function (key, upDown) {
    var _this$dungeon3, _this$dungeon4, _this$dungeon5, _this$dungeon6;
    if (((_this$dungeon3 = _this.dungeon) === null || _this$dungeon3 === void 0 ? void 0 : _this$dungeon3.dungeonState) === 'free') {
      if (key === 'start' || key === 'select') {
        if (_this.keyTimers[key] === 2) {
          _this.dungeon.dungeonIO.keyTriage(key, upDown);
        }
      } else {
        _this.dungeon.dungeonIO.keyTriage(key, upDown);
      }
    } else if (((_this$dungeon4 = _this.dungeon) === null || _this$dungeon4 === void 0 ? void 0 : _this$dungeon4.dungeonState) === 'hatch' || ((_this$dungeon5 = _this.dungeon) === null || _this$dungeon5 === void 0 ? void 0 : _this$dungeon5.dungeonState) === 'text-box-next' || ((_this$dungeon6 = _this.dungeon) === null || _this$dungeon6 === void 0 ? void 0 : _this$dungeon6.dungeonState) === 'main-menu') {
      if (_this.keyTimers[key] === 2) {
        _this.dungeon.dungeonIO.keyTriage(key, upDown);
      }
    }
  });
  _defineProperty(this, "getDgmnParty", function () {
    return _this.yourParty;
  });
  debugLog('Game Created...');
  this.gameAH = new GameAH({
    addToObjectListCB: this.addToObjectList,
    drawGameScreenCB: this.drawGameScreen,
    startBattleCB: this.startBattle,
    getDgmnPartyCB: this.getDgmnParty,
    endBattleCB: this.endBattle,
    buildDungeonCB: this.buildDungeon,
    startNewGameCB: this.startNewGame,
    clearDungeonCB: this.clearDungeon
  });
  this.systemAH = systemAH;
  this.yourDgmn = new DgmnManager(this.systemAH);
  this.yourParty = this.yourDgmn.party;
  this.titleMenu = new TitleMenu(this.systemAH, this.gameAH);
  this.atTitle = true;
  this.battle;
  this.dungeon;
  this.town;
  this.gameCanvas = new GameCanvas('game-canvas', 160, 144);
  this.objectList = [];
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
}
;

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
    document.getElementById('action').addEventListener('touchstart', function (e) {
      _this.setKeyState('ArrowRight', true);
    });
    document.getElementById('action').addEventListener('touchend', function (e) {
      _this.setKeyState('ArrowRight', false);
    });
    document.getElementById('cancel').addEventListener('touchstart', function (e) {
      _this.setKeyState('ArrowDown', true);
    });
    document.getElementById('cancel').addEventListener('touchend', function (e) {
      _this.setKeyState('ArrowDown', false);
    });
    document.getElementById('dpad-up').addEventListener('touchstart', function (e) {
      _this.setKeyState('w', true);
    });
    document.getElementById('dpad-up').addEventListener('touchend', function (e) {
      _this.setKeyState('w', false);
    });
    document.getElementById('dpad-right').addEventListener('touchstart', function (e) {
      _this.setKeyState('d', true);
    });
    document.getElementById('dpad-right').addEventListener('touchend', function (e) {
      _this.setKeyState('d', false);
    });
    document.getElementById('dpad-down').addEventListener('touchstart', function (e) {
      _this.setKeyState('s', true);
    });
    document.getElementById('dpad-down').addEventListener('touchend', function (e) {
      _this.setKeyState('s', false);
    });
    document.getElementById('dpad-left').addEventListener('touchstart', function (e) {
      _this.setKeyState('a', true);
    });
    document.getElementById('dpad-left').addEventListener('touchend', function (e) {
      _this.setKeyState('a', false);
    });
    document.getElementById('start').addEventListener('touchstart', function (e) {
      _this.setKeyState('Shift', true);
    });
    document.getElementById('start').addEventListener('touchend', function (e) {
      _this.setKeyState('Shift', false);
    });
  });
  _defineProperty(this, "connectEventListener", function () {
    window.addEventListener("keydown", function (e) {
      _this.setKeyState(e.key, true);
    });
    window.addEventListener("keyup", function (e) {
      _this.setKeyState(e.key, false);
    });
  });
  debugLog("  - Plugged In Controller...");
  this.setKeyState = function (key, value) {
    setKeyState(key, value);
  };
  this.setupMobileController();
  this.connectEventListener();
};

var DebugMenu = function DebugMenu(game) {
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
          mobileControllerElem.style.top = "".concat(screenHeight + 80, "px");
        }
      }
    });
  });
  debugLog('  - Booting Debug Menu...');
  this.elem = document.getElementById("debug-menu");
  this.state = 'active';
  this.game = game;
  this.activate();
  this.launchBattle = function () {
    for (var i = 0; i < 3; i++) {
      _this.game.yourDgmn.allDgmn['dId' + i].hatchSetup();
      _this.game.yourDgmn.allDgmn['dId' + i].speciesName = DEBUG_YOUR_TEAM[i].speciesName;
      _this.game.yourDgmn.allDgmn['dId' + i].currentStats = DEBUG_YOUR_TEAM[i].currentStats;
      _this.game.yourDgmn.allDgmn['dId' + i].currentHP = DEBUG_YOUR_TEAM[i].currentStats.HP;
    }
    _this.game.dungeon = {
      floor: {
        isBossFloor: false,
        number: 1
      }
    };
    _this.game.digiBeetle = {
      digiBeetleAH: {
        getToolBoxItems: function getToolBoxItems() {
          return ['smallMeat'];
        },
        removeItemFromToolBox: function removeItemFromToolBox() {}
      }
    };
    _this.game.atTitle = false;
    _this.game.startBattle(true);
  };
  this.launchDungeon = function () {
    _this.game.buildDungeon();
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
        loadedImages[modName].src = "./sprites/".concat(CFG.pixelKidMode, "/").concat(imageList[i], ".png");
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
    if (inDebug()) _this.debugMenu = new DebugMenu(_this.game);
    _this.imageHandler.addToQueue(genericImages.concat(fontImages$1).concat(loadingImages).concat(typeIcons), _this.onGenericImagesLoaded);
  });
  _defineProperty(this, "onGenericImagesLoaded", function () {
    _this.game.bootGame();
    _this.systemScreen.appendChild(_this.screenCanvas.elem);
    setTimeout(function () {
      _this.startGameTimer();
    }, 1000);
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
    }, 33);
  });
  _defineProperty(this, "buildFontImages", function () {
    var _iterator = _createForOfIteratorHelper(fontImages$1),
        _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var imgURL = _step.value;
        var image = new Image();
        image.src = "./sprites/".concat(CFG.pixelKidMode, "/").concat(imgURL, ".png");
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
    return _this.imageHandler.fetchImage(imageName) || '';
  });
  this.systemAH = new SystemAH({
    loadImageCB: this.loadImage,
    fetchImageCB: this.fetchImage,
    startLoadingCB: this.startLoading,
    stopLoadingCB: this.stopLoading
  });
  this.controllers = [];
  this.keyState = {};
  this.systemScreen = document.getElementById('game-screen');
  this.systemScreen.style.width = 160 * CFG.screenSize + 'px';
  this.systemScreen.style.height = 144 * CFG.screenSize + 'px';
  this.debugMenu;
  this.imageHandler = new ImageHandler();
  this.loadManager = new LoadManager(this.systemAH);
  this.gameTimer;
  this.systemCount = 0;
  this.screenCanvas = new GameCanvas('screen-canvas', 160, 144);
  this.game = new Game(this.systemAH);
  this.subCanvases = [this.backgroundCanvas];
  this.buildFontImages();
}
;

window.onload = function () {
  init();
};
var setIsMobile = function setIsMobile() {
  if (navigator.userAgent.match(/Android/i)) {
    document.body.dataset.view = 'mobile';
    var mobileControllerElem = document.querySelector(".mobile-controls");
    var windowHeight = window.innerHeight;
    var screenHeight = document.getElementById("game-screen").offsetHeight;
    mobileControllerElem.style.height = "".concat(windowHeight - screenHeight, "px");
    mobileControllerElem.style.top = "".concat(screenHeight, "px");
  }
};
function init() {
  debugLog("Booting for ".concat(CFG.userName, "..."));
  var system = new System();
  setTimeout(function () {
    system.start();
    setIsMobile();
  }, 1000);
}
