import { dgmnDB } from "../data/dgmn.db";
import BattleDgmnCanvas from "./battle-dgmn-canvas";

class Dgmn {
  constructor(id, name, level){
    this.dgmnId = id;
    this.name = name;
    this.stage = dgmnDB[name].stage;
    this.class = dgmnDB[name].class;
    this.baseStats = dgmnDB[name].stats;
    this.crests = dgmnDB[name].crests;

    // Permanent
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
  }

  loadDgmn = (dgmnData) => {
    // This how the data will be loaded into a DGMN when a new instance is created
  }

  initBattleCanvas = gameScreenRedrawCallback => {
    this.battleCanvas = new BattleDgmnCanvas(this.name,'dgmn-canvas',32,32,0,0,true,gameScreenRedrawCallback);
  }
}

export default Dgmn;