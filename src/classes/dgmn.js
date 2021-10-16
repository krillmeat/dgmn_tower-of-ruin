import { dgmnDB } from "../data/dgmn.db";
import BattleDgmnCanvas from "./battle-dgmn-canvas";

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
  constructor(id, nickname, name, level, battleLocation, isEnemy){
    this.dgmnId = id;
    this.nickname = nickname;
    this.name = name;
    this.stage = dgmnDB[name].stage;
    this.class = dgmnDB[name].class;
    this.baseStats = dgmnDB[name].stats;
    this.crests = dgmnDB[name].crests;

    // Permanent
    this.permAttacks = [];
    this.permCrests = {};
    this.permSync = {};

    this.fullDgmnList = []; // Every Dgmn this Dgmn has ever been

    // Temporary - Only Matters per hatch, resets on reversion to egg
    this.level = level || 1;
    this.currDgmnPath = []; // The Dgmn this Dgmn has become since it hatched

    this.currHP = 24;
    this.currEN = 10;
    this.currHunger = 0;
    this.currPoop = 0;

    this.currStats = [];

    this.battleCanvas;
    this.battleLocation = battleLocation || 0;
    this.isEnemy = isEnemy || false;
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

  /** USED MOSTLY FOR BUILDING ENEMIES
  */
  buildDgmn = () => {
    for(let i = 0; i < this.baseStats.length; i++){
      let finalStat = this.baseStats[i] * this.level;
          finalStat *= i < 2 ? 1.5 : 1;
          finalStat = Math.floor(finalStat);
      this.currStats.push(finalStat);
    }

    // TODO - Remove, only for mocking
    this.permAttacks = [];
  }
}

export default Dgmn;