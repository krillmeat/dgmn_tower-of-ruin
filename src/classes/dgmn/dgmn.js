import CFG from "../../config";
import { dgmnDB } from "../../data/dgmn.db";
// import BattleDgmnCanvas from "../battle/canvas/battle-dgmn-canvas";
import DgmnCanvas from "./canvas/dgmn-canvas";
import Attack from "./attack";
import DgmnUtility from "./utility/dgmn.util";
import { debugLog } from "../../utils/log-utils";

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
  constructor(id, nickname, speciesName, eggField){
    this.dgmnId = id;
    this.nickname = nickname;
    this.speciesName = speciesName;
    this.eggField = eggField || ''; // The Field the Egg Belongs to

    this.permFP = { DR:0, NS:0, WG:0, ME:0, DS:0, JT:0, VB:0, NA:0 }
    this.permAttacks = [];
    this.upgrades = { FP:0, EN:0, XP:0 }
    this.maxEnergy = 100;

    this.evoChain = []; // Keeps track of the evolutions gone through during a run

    this.currentLevel = 1;
    this.currentHP = 23;
    this.currentEN = this.maxEnergy;
    this.currentStats = { HP: 13, ATK: 0, DEF: 0, INT: 0, RES: 0, HIT: 0, AVO: 0, SPD: 0 }
    this.statMods = { HP:1, ATK:1, DEF:1, INT:1, RES:1, HIT:1, AVO:1, SPD:1 }
    this.currentFP = { DR:0, NS:0, WG:0, ME:0, DS:0, JT:0, VB:0, NA:0 }
    this.currentXP = 0;

    this.combo = 0;
    this.weak = 0;
    this.condition;

    this.attackList = ["bubbles"];
    this.attacks = [new Attack('bubbles')] // Every DGMN Starts with Bubbles

    this.isDead = false;

    this.dgmnCanvas;

    this.dgmnUtility = new DgmnUtility();
  }

  /**------------------------------------------------------------------------
   * INITIALIZE CANVAS
   * ------------------------------------------------------------------------
   * Sets up the Dgmn Canvas
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  initCanvas = (refreshScreenCB,dgmnImageList,battlePosition) => {
    this.dgmnCanvas = new DgmnCanvas(refreshScreenCB,this.speciesName,'dgmn-canvas',32,32);
    this.dgmnCanvas.x = (24 + (this.isEnemy ? 8 : 72) ) * CFG.screenSize;
    this.dgmnCanvas.y = (16 + (battlePosition * 32) ) * CFG.screenSize;
    this.dgmnCanvas.frames = dgmnImageList;
    if(this.isEnemy){ this.dgmnCanvas.flip() }
  }

  /**------------------------------------------------------------------------
   * START IDLE ANIMATION
   * ------------------------------------------------------------------------
   * Starts the Idle Animation on the DGMN Canvas
   * TODO - Leave in, but disable for now.
   * ----------------------------------------------------------------------*/
  startIdleAnimation = () => {
    // let speed = 1800 - (Math.floor(this.currentStats.SPD*2) * 33);
    //     speed = speed <= 0 ? 33 : speed;
    // this.dgmnCanvas.animate(speed);
    this.dgmnCanvas.animate();
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

  heal = amount => {
    debugLog("  - Healing: ",amount);
    this.currentHP += amount;
    this.currentHP = this.currentHP > this.currentStats.HP ? this.currentStats.HP : this.currentHP;
  }

  hatchSetup = () => {
    this.setInitialFP();
    this.setInitialAttacks();
  }

  hatch = species => {
    this.speciesName = species;
    this.currentStats = this.dgmnUtility.buildInitialStats(this.speciesName);
    this.currentHP = this.currentStats.HP;
  }

  /** -------------------------------------------------------------------------------------------
   * SET INITIAL FP
   * --------------------------------------------------------------------------------------------
   * When Hatching, sets up a DGMN's initial FP to include both the free FP from the Egg, and
   * any Permanent FP gained by Upgrades
   * ------------------------------------------------------------------------------------------*/
  setInitialFP = () => {
    debugLog("  - Egg Field : ",this.eggField);

    // Every DGMN hatches with 1 FP from the Egg it's hatching from
    this.currentFP[this.eggField] = 1;
    
    // Adds all Permanent FP Upgrades
    for(let FP of Object.keys(this.permFP)){
      this.currentFP[FP] += this.permFP[FP];
    }
  }

  /** -------------------------------------------------------------------------------------------
   * SET INITIAL ATTACKS
   * --------------------------------------------------------------------------------------------
   * Goes through the Permanent Attacks and adds them
   * ------------------------------------------------------------------------------------------*/
  setInitialAttacks = () => {
    for(let attack of this.permAttacks){
      this.attacks.unshift(new Attack(attack))
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

  levelUpStats = (isEvo=false) => {
    for(let stat in this.currentStats){
      let growth = isEvo ? 
        this.dgmnUtility.getBaseStat(this.speciesName,stat) :
        this.dgmnUtility.getBaseStat(this.speciesName,stat) + this.dgmnUtility.calcFPStatBoost(this.currentFP,stat);
      this.currentStats[stat] += growth;
    }

    this.heal(this.dgmnUtility.getBaseStat(this.speciesName,'HP') + Math.floor(this.currentStats.HP / 4));
  }

  levelUpFP = () => {
    let baseFP = this.dgmnUtility.getBaseFP(this.speciesName);
    for(let FP in baseFP){
      this.currentFP[FP] += baseFP[FP] + this.permFP[FP];
    }
  }

  addFP = (field,amount) => {
    this.currentFP[field] += amount;
  }

  learnAttack = () => {
    let newAttack = this.dgmnUtility.getAttack(this.speciesName);
    if(newAttack) this.attacks.unshift(new Attack(newAttack))
  }

  /** -------------------------------------------------------------------------------------------
   * RESET DGMN
   * --------------------------------------------------------------------------------------------
   * Clears all things from a DGMN after a Run is ended
   * 
   * ------------------------------------------------------------------------------------------*/
  resetDgmn = () => {
    this.currentLevel = 1;
    this.currentXP = 0;
    this.currentEN = this.maxEnergy;

    for(let stat of Object.keys(this.currentStats)){ this.currentStats[stat] = 0 }
    for(let FP of Object.keys(this.currentFP)){ this.currentFP[FP] = 0 }

    this.attackList = ['bubbles'];
    this.attacks = [new Attack('bubbles')];

    this.evoChain = [];
    debugLog("DGMN Reset...");
  }

  getAllAttacks = () => { return this.attacks }

  /**------------------------------------------------------------------------
   * CONDITIONS
   * ------------------------------------------------------------------------
   * Everything related to Status Conditions
   * ----------------------------------------------------------------------*/
  giveCondition = condition => { this.condition = {type: condition, turns: 0 } }
  healCondition = () => { this.condition = undefined }

  /**------------------------------------------------------------------------
   * STAT MODIFIERS
   * ------------------------------------------------------------------------
   * Everything related to Buffing and Debuffing your stats
   * ----------------------------------------------------------------------*/
  buffStat = (stat,amount) => { this.statMods[stat] += amount }
  debuffStat = (stat,amount) => { this.statMods[stat] -= amount }

  /**------------------------------------------------------------------------
   * GET STATS
   * ------------------------------------------------------------------------
   * Grab a specific Stat
   * ----------------------------------------------------------------------*/
  getMaxHP = () => { return this.currentStats.HP }
  getATK = () => { return this.currentStats.ATK }
}

export default Dgmn;
