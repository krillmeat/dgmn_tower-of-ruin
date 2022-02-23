import { dgmnDB } from "../data/dgmn.db";
import BattleDgmnCanvas from "./battle/canvas/battle-dgmn-canvas";

/**
 * DIGIMON
 * @param {Number}  id              Each Dgmn is assigned a basic number ID, to track
 * @param {String}  nickname        Name given to a Dgmn by the Player
 * @param {String}  name            The species name (does not include MON)
 * @param {Number}  level           Dgmn's Level, grown by EXP
 * @param {Number}  battleLocation  Where in your party they are located (0-2)
 * @param {Boolean} isEnemy         Whether the Dgmn is an Enemy or not
 */
class Dgmn {
  constructor(id, nickname, name, battleLocation, isEnemy){
    this.dgmnId = id;
    this.nickname = nickname;
    this.name = name;
    this.stage = dgmnDB[name].stage;
    this.class = dgmnDB[name].class;
    this.baseStats = dgmnDB[name].stats;
    this.crests = dgmnDB[name].crests;
    this.types = dgmnDB[name].types;

    // Permanent
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
    this.weakenedState = [false,0];
    this.currConditions = {};
    this.currBuffs = [0,1,1,1,1,1,1,1];

    this.battleCanvas;
    this.battleLocation = battleLocation || 0;
    this.isEnemy = isEnemy || false;

    this.isDead = false;
    this.isDefending = false;
  }

  loadDgmn = loadData => {
    // Go through and load in all of the data
    this.level = loadData.level || this.level;
    this.permAttacks = loadData.permAttacks || this.permAttacks;
  }

  initBattleCanvas = (gameScreenRedrawCallback, imageStack) => {
    this.battleCanvas = new BattleDgmnCanvas(this.name,'dgmn-canvas',32,32,0,0,true,gameScreenRedrawCallback);
    this.battleCanvas.imageStack = imageStack;
  }

  calcEnergyCost = maxCost => {
    let cost = 0;
        cost = Math.floor(this.currStats[1] / maxCost);
        cost = cost <= 0 ? 0 : cost;

    return cost;
  }

  /** USED MOSTLY FOR BUILDING ENEMIES
  */
  buildDgmn = () => {
    for(let i = 0; i < this.baseStats.length; i++){
      let finalStat = this.baseStats[i] * this.level;
          finalStat *= i === 0 ? 1.25 : 1;
          finalStat = Math.floor(finalStat);
      this.currStats.push(finalStat);
    }
  }
}

export default Dgmn;