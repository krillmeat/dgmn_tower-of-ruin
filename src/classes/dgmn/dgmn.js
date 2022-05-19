import config from "../../config";
import { dgmnDB } from "../../data/dgmn.db";
// import BattleDgmnCanvas from "../battle/canvas/battle-dgmn-canvas";
import DgmnCanvas from "./canvas/dgmn-canvas";
import Attack from "./attack";
import DgmnUtility from "./utility/dgmn.util";

const mockStats1 = {
  ATK: 10, DEF: 10, INT: 10, RES: 10, HIT: 10, AVO: 10, SPD: 10
}

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
  constructor(id, nickname, speciesName){
    this.dgmnId = id;
    this.nickname = nickname;
    this.speciesName = speciesName;
    this.eggField = ""; // The Field the Egg Belongs to

    this.permFP = { DR:0, NS:0, WG:0, ME:0, DS:0, JT:0, VB:0, NA:0 }
    this.permAttacks = [];

    this.currentLevel = 6;
    this.currentHP = 23;
    this.currentEN = 100;
    this.currentStats = { HP: 13, ATK: 0, DEF: 0, INT: 0, RES: 0, HIT: 0, AVO: 0, SPD: 0 }
    this.currentFP = { DR:0, NS:0, WG:0, ME:0, DS:0, JT:0, VB:0, NA:0 }
    this.currentXP = 0;

    this.combo = 0;
    this.weak = 0;

    this.attackList = ["bubbles","babyFlame"];
    this.attacks = [] // TODO - this needs to be "built"

    this.isDead = false;

    this.dgmnCanvas;

    this.dgmnUtility = new DgmnUtility();
  }

  initializeStats = () => {
    console.log("STATS");
  }

  /**------------------------------------------------------------------------
   * INITIALIZE CANVAS
   * ------------------------------------------------------------------------
   * Sets up the Dgmn Canvas
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  initCanvas = (refreshScreenCB,dgmnImageList,battlePosition) => {
    this.dgmnCanvas = new DgmnCanvas(refreshScreenCB,this.speciesName,'dgmn-canvas',32,32);
    this.dgmnCanvas.x = (24 + (this.isEnemy ? 8 : 72) ) * config.screenSize;
    this.dgmnCanvas.y = (16 + (battlePosition * 32) ) * config.screenSize;
    this.dgmnCanvas.frames = dgmnImageList;
    if(this.isEnemy){ this.dgmnCanvas.flip() }
  }

  /**------------------------------------------------------------------------
   * START IDLE ANIMATION
   * ------------------------------------------------------------------------
   * Starts the Idle Animation on the DGMN Canvas
   * ----------------------------------------------------------------------*/
  startIdleAnimation = () => {
    let speed = 1800 - (Math.floor(this.currentStats.SPD*2) * 33);
        speed = speed <= 0 ? 33 : speed;
    this.dgmnCanvas.animate(speed);
  }

  showFrame = frame => {
    this.dgmnCanvas.showFrame(frame);
  }

  idle = () => { this.dgmnCanvas.idle() }

  /**------------------------------------------------------------------------
   * DRAW DGMN TO CANVAS
   * ------------------------------------------------------------------------
   * Draws a Specific Image to the DGMN Canvas
   * ------------------------------------------------------------------------
   * @param {Image} image Image Object to be drawn to the Canvas
   * ----------------------------------------------------------------------*/
  drawDgmnToCanvas = image => {
    this.dgmnCanvas.paintImage(image);
  }

  hatchSetup = () => {
    this.setInitialFP();
  }

  setInitialFP = () => {
    let baseFP = this.dgmnUtility.getBaseFP(this.speciesName);
    console.log("BASE FP = ",baseFP);
    for(let FP in baseFP){
      this.currentFP[FP] = baseFP[FP]; // TODO - Also add permanent FP
    }
  }

  getDgmnAttackByName = attackName => {
    for(let i = 0; i < this.attacks.length; i++){
      if(this.attacks[i].attackName === attackName) return i;
    }

    return -1;
  }

  reduceDgmnAttackCost = attackName => {
    let attack = this.getDgmnAttackByName(attackName);
    this.attacks[attack].currCost--;
    if(this.attacks[attack].currCost < 0){
      // TODO - Logic for if Current Cost is already 0 (Take Extra Energy Lost)
    }
  }

  levelUpStats = () => {
    for(let stat in this.currentStats){
      let growth = this.dgmnUtility.getBaseStat(this.speciesName,stat);
      this.currentStats[stat] += growth;
    }
  }

  levelUpFP = () => {
    let baseFP = this.dgmnUtility.getBaseFP(this.speciesName);
    for(let FP in baseFP){
      this.currentFP[FP] += baseFP[FP]; // TODO - Also add Perm FP
    }
  }

  getAllAttacks = () => { return this.attacks }

  getMaxHP = () => { return this.currentStats.HP }
  getATK = () => { return this.currentStats.ATK }
}

export default Dgmn;