import DgmnAH from "../action-handlers/dgmn.ah";
import Dgmn from "./dgmn";
import DgmnParty from "./dgmn-party";

import Attack from "./attack";
import { partyMock, enemyPartyMock } from "../../mock/dgmn.mock";
import EnemyGenerator from "./enemy-generator";
import DgmnUtility from "./utility/dgmn.util";
import { debugLog } from "../../utils/log-utils";
import TreasureUtility from "../../dungeon/utils/treasure.util";

// TODO - THIS CLASS WILL NEVER WORK LIKE THIS. IT WILL INTERACT HEAVILY WITH THE SAVE DATA TO BUILD OUT THE allDgmn OBJECT
// TODO - RENAME TO ALL DGMN
class DgmnManager{
  constructor(systemAH){
    // TODO - In the future, dIdX should probably be generated. If I ever want to do a cool online thing, you might need very unique IDs
    this.allDgmn = {
      dId0: new Dgmn(0,"FLARE","Bota",'DR'),
      dId1: new Dgmn(1,"SPROUT","Yura",'JT'),
      dId2: new Dgmn(2,"GEAR","Choro",'ME')
    }

    // TODO - I need to clean this up BIG TIME
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
      deBuffDgmnStatCB: this.deBuffDgmnStat
    });

    this.systemAH = systemAH;

    this.enemyGenerator = new EnemyGenerator(this.dgmnAH);

    this.enemyDgmn = { };

    this.party = this.mockParty();

    this.tempDgmn = new Dgmn(0,'EVO','Bota'); // Used in various Menus to show a DGMN that doesn't exist (evos, database, etc.)

    this.dgmnUtility = new DgmnUtility;
    this.itemUtility = new TreasureUtility(); // I need to rename this Class...
  }

  // FOR NOW
  mockParty = () => {
    // this.enemyDgmn.edId0.isEnemy = true; this.enemyDgmn.edId1.isEnemy = true; this.enemyDgmn.edId2.isEnemy = true;
    for(let i = 0; i < 3; i++){
      // this.allDgmn[`dId${i}`].currentLevel = partyMock[`dId${i}`].currentLevel;
      // this.allDgmn[`dId${i}`].attacks = partyMock[`dId${i}`].attacks;
      // this.allDgmn[`dId${i}`].currentStats = partyMock[`dId${i}`].currentStats;

      // this.enemyDgmn[`eId${i}`].attacks = enemyPartyMock[`eId${i}`].attacks;
      // this.enemyDgmn[`edId${i}`].currentStats = enemyPartyMock[`edId${i}`].currentStats;
    }
    return ['dId0','dId1','dId2'];
  }

  /**------------------------------------------------------------------------
   * CREATE DGMN
   * ------------------------------------------------------------------------
   * Creates a new DGMN and loads it into the proper Object
   * ------------------------------------------------------------------------
   * @param {Number}  index DGMN's ID Number
   * @param {Object}  data  All of the DGMN's generated Data
   * @param {Boolean} isEnemy True if creating an Enemy DGMN
   * ----------------------------------------------------------------------*/
  createDgmn = (index,data,isEnemy) => {
    if(isEnemy){ // Generating a new Enemy
      this.enemyDgmn[`edId${index}`] = new Dgmn(index,"ENEMY",data.speciesName);
      this.enemyDgmn[`edId${index}`].isEnemy = true;
      this.enemyDgmn[`edId${index}`].currentLevel = data.currentLevel;
      this.enemyDgmn[`edId${index}`].currentStats = data.currentStats;
      this.enemyDgmn[`edId${index}`].currentHP = this.enemyDgmn[`edId${index}`].currentStats.HP;
      this.enemyDgmn[`edId${index}`].attacks = data.attacks;
    }
  }

  buildPartyEggs = () => {
    for(let dgmn of this.party){
      this.allDgmn[dgmn].hatchSetup();
    }
  }

  hatchEgg = (dgmnId,species) => {
    this.allDgmn[dgmnId].hatch(species);
  }

  /**------------------------------------------------------------------------
   * TITLE
   * ------------------------------------------------------------------------
   * Description
   * ------------------------------------------------------------------------
   * ----------------------------------------------------------------------*/
  isEnemy = dgmnId => {
    return dgmnId.charAt(0) === 'e';
  }

  /**------------------------------------------------------------------------
   * TITLE
   * ------------------------------------------------------------------------
   * Description
   * ------------------------------------------------------------------------
   * ----------------------------------------------------------------------*/
  generateEnemies = (currFloor,maxFloor) => {
    this.enemyGenerator.generate(currFloor,maxFloor);
  }

  /**------------------------------------------------------------------------
   * GET DGMN DATA
   * ------------------------------------------------------------------------
   * Goes into a Dgmn's data and grabs what it needs
   * ------------------------------------------------------------------------
   * @param {String}  dgmnId  Id for the Dgmn to look for
   * @param {Array}   dataList  List of Attributes needed
   * @returns List of Anonymous Objects of all requested Data  
   * ----------------------------------------------------------------------*/
  getDgmnData = (dgmnId,dataList,isEnemy) => {
    let obj = {};

    for(let i = 0; i < dataList.length; i++){
      obj[dataList[i]] = !isEnemy ? this.allDgmn[dgmnId][dataList[i]] : this.enemyDgmn[dgmnId][dataList[i]];
    }


    return obj;
  }

  /**------------------------------------------------------------------------
   * GET DGMN ATTACK DATA
   * ------------------------------------------------------------------------
   * Goes into all of a Dgmn's Attacks and pulls the requested data into a 
   * new list of anonymous Objects
   * ------------------------------------------------------------------------
   * @param {String}  dgmnId  Id for the Dgmn to look for
   * @param {Array}   dataList  List of Attack attributes needed
   * @returns List of Anonymous Objects of all requested Data  
   * ----------------------------------------------------------------------*/
  getDgmnAttackData = (dgmnId,dataList) => {
    let objList = [];

    let dgmnAttacks = this.allDgmn[dgmnId].attacks;
    for(let a = 0; a < dgmnAttacks.length; a++){
      let obj = {
        attackName: this.allDgmn[dgmnId].attacks[a].attackName
      };
      for(let i = 0; i < dataList.length; i++){
        obj[dataList[i]] = this.allDgmn[dgmnId].attacks[a][dataList[i]];
      }
      objList.push(obj);
    }

    return objList;
  }

  // TODO - Move to Utility
  getParty = dgmnId => {
    return this.isEnemy(dgmnId) ? "enemyDgmn" : "allDgmn";
  }

  useAttack = (dgmn,energyCost,attackName) => {
    this[this.getParty(dgmn)][dgmn].reduceDgmnAttackCost(attackName);
    this.reduceEnergy(dgmn,energyCost);
  }

  reduceEnergy = (dgmn,amount) => {
    this[this.getParty(dgmn)][dgmn].currentEN -= amount;
  }

  /**------------------------------------------------------------------------
   * TITLE
   * ------------------------------------------------------------------------
   * Description
   * ------------------------------------------------------------------------
   * ----------------------------------------------------------------------*/
  dealDMG = (target,dmg) => {
    let party = this.getParty(target);
    this[party][target].currentHP -= dmg;
    this[party][target].currentHP = this[party][target].currentHP < 0 ? 0 : this[party][target].currentHP;
  }

  /**------------------------------------------------------------------------
   * MODIFY COMBO
   * ------------------------------------------------------------------------
   * Changes a DGMN's Combo Value
   * ------------------------------------------------------------------------
   * @param {String}  target      DGMN ID to be changed
   * @param {Number}  comboDelta  Amount to change the Combo Value
   * ----------------------------------------------------------------------*/
  modifyCombo = (target,comboDelta) => {
    let party = this.getParty(target);
    this[party][target].combo += comboDelta;
    this[party][target].combo = this[party][target].combo < 0 ? 0 : this[party][target].combo;
  }

  /**------------------------------------------------------------------------
   * MODIFY WEAK
   * ------------------------------------------------------------------------
   * Changes a DGMN's WEAK Value
   * ------------------------------------------------------------------------
   * @param {String}  target    DGMN ID to be changed
   * @param {Number}  weakDelta Amount to change the WEAK Value
   * ----------------------------------------------------------------------*/
  modifyWeak = (target,weakDelta) => {
    let party = this.getParty(target);
    this[party][target].weak += weakDelta;
    this[party][target].weak = this[party][target].weak > 3 ? 3 : this[party][target].weak;
    this[party][target].weak = this[party][target].weak < 0 ? 0 : this[party][target].weak;
  }

  /**------------------------------------------------------------------------
   * TITLE
   * ------------------------------------------------------------------------
   * Checks if a DGMN is KOd and if they are, takes care of killing them
   * ------------------------------------------------------------------------
   * @param {String} target dgmnId of target
   * @returns True if DGMN is KO'd
   * ----------------------------------------------------------------------*/
  checkKO = target => {
    let party = this.getParty(target);
    if(!this[party][target].isDead){ // Did this to prevent already dead DGMN from KO'ing
      if(this[party][target].currentHP <= 0){ // If they're Dead...
        this.killDgmn(party,target);
        return true;
      }
    }
    return false
  }

  killDgmn = (party,target) => {
    this.showDgmnFrame(target,'dead');
    this[party][target].isDead = true;
    this[party][target].currentHP = 0;
    this[party][target].currentEN = 0;
    this[party][target].combo = 0;
    this[party][target].weak = 0;
  }

  battleWrapUp = dgmnId => {
    let leveledUp = this.checkLevelUp(dgmnId);
    return leveledUp;
  }

  /**------------------------------------------------------------------------
   * GIVE DGMN REWARD
   * ------------------------------------------------------------------------
   * Gives a DGMN a reward from a Battle
   * ------------------------------------------------------------------------
   * @param {String} dgmnId ID for the DGMN to give Reward to
   * @param {String} reward FP or XP Boost to be rewarded
   * ----------------------------------------------------------------------*/
  giveDgmnReward = (dgmnId,reward) => {
    debugLog('  - Give '+dgmnId+' reward: '+reward);
    reward === 'XP' ? this.allDgmn[dgmnId].currentXP++ : this.allDgmn[dgmnId].currentFP[reward]++; // TODO - XXP
  }

  /**------------------------------------------------------------------------
   * GIVE DGMN XP
   * ------------------------------------------------------------------------
   * Gives a DGMN a certain XP amount, usually the Battle XP Total
   * ------------------------------------------------------------------------
   * @param {String} dgmnId ID for the DGMN to give Reward to
   * @param {Number} reward Amount of XP to give
   * ----------------------------------------------------------------------*/
  giveDgmnXP = (dgmnId,xp) => {
    this.allDgmn[dgmnId].currentXP += xp;
  }

  checkLevelUp = dgmnId => {
    if(this.allDgmn[dgmnId].currentXP >= this.dgmnUtility.checkLevelReq(this.allDgmn[dgmnId].currentLevel)){
      this.levelUp(dgmnId);
      return true;
    }

    return false;
  }

  levelUp = dgmnId => {
    this.allDgmn[dgmnId].currentXP = 0;
    this.allDgmn[dgmnId].currentLevel++;
    this.allDgmn[dgmnId].levelUpStats();
    this.allDgmn[dgmnId].levelUpFP();
    debugLog(this.allDgmn[dgmnId].nickname+" Leveled Up!");
    debugLog("  - New FP: ",this.allDgmn[dgmnId].currentFP);
  }

  evolve = (dgmnId,evoSpecies) => {
    console.log(dgmnId+" is Evolving into "+evoSpecies);
    this.allDgmn[dgmnId].speciesName = evoSpecies;
    this.allDgmn[dgmnId].levelUpStats(true);
    this.allDgmn[dgmnId].learnAttack();
  }

  buildStatGrowth = (dgmnId,stat) => {
    let baseGrowth = this.dgmnUtility.getBaseStat(this.allDgmn[dgmnId].speciesName,stat);

    return baseGrowth + 0; // TODO - Look into FP bonus
  }

  /**------------------------------------------------------------------------
   * TITLE
   * ------------------------------------------------------------------------
   * Description
   * ------------------------------------------------------------------------
   * ----------------------------------------------------------------------*/
  checkAllDead = isEnemy => {
    let party = isEnemy ? this.enemyDgmn : this.party;

    for(let dgmn in party){
      if(!party[dgmn].isDead) return false
    }

    return true
  }

  /**------------------------------------------------------------------------
   * TITLE
   * ------------------------------------------------------------------------
   * Description
   * ------------------------------------------------------------------------
   * ----------------------------------------------------------------------*/
  initDgmnCanvas = (dgmnId,drawCB,imageList,battleLocation) => {
    !this.isEnemy(dgmnId) ? this.allDgmn[dgmnId].initCanvas(drawCB,imageList,battleLocation) : this.enemyDgmn[dgmnId].initCanvas(drawCB,imageList,battleLocation);
  }

  useItemOn = (dgmnId,item) => {
    debugLog('Using '+item+' on '+dgmnId);
    let itemEffect = this.itemUtility.getItemEffect(item);
    if(itemEffect.type === 'heal'){
      if(itemEffect.stat === 'HP'){
        debugLog('  - Healing '+dgmnId+' by '+itemEffect.amount);
        this.allDgmn[dgmnId].heal(itemEffect.amount);
      }
    } else if(itemEffect.type === 'booster'){
      this.allDgmn[dgmnId].addFP(itemEffect.field,itemEffect.amount);
    }
  }

  giveUpgrade = (dgmnId,upgrade,FP='') => {
    this['upgrade'+upgrade](dgmnId,FP);
  }

  buffDgmnStat = (dgmnId,stat,amount) => { this.allDgmn[dgmnId].buffStat(stat,amount) }
  deBuffDgmnStat = (dgmnId,stat,amount) => { this.allDgmn[dgmnId].debuffStat(stat,amount) }

  /**------------------------------------------------------------------------
   * UPGRADE FP
   * ------------------------------------------------------------------------
   * Permenantly Increases a DGMN's FP
   * ------------------------------------------------------------------------
   * @param {String}  dgmnId  ID for the DGMN in your Party
   * @param {String}  FP      The FP to be upgraded
   * ----------------------------------------------------------------------*/
   upgradeFP = (dgmnId, FP) => {
    debugLog("  Upgrade FP: ",FP);
    this.allDgmn[dgmnId].upgrades.FP++;
    this.allDgmn[dgmnId].permFP[FP]++;
  }
  
  /**------------------------------------------------------------------------
   * UPGRADE XP
   * ------------------------------------------------------------------------
   * Permenantly Increases a DGMN's Energy (EN)
   * ------------------------------------------------------------------------
   * @param {String}  dgmnId  ID for the DGMN in your Party
   * ----------------------------------------------------------------------*/
   upgradeXP = dgmnId => {
    debugLog("  Upgrading XP")
    this.allDgmn[dgmnId].upgrades.XP++;
  }
  
  /**------------------------------------------------------------------------
   * UPGRADE ENERGY
   * ------------------------------------------------------------------------
   * Permenantly Increases a DGMN's Energy (EN)
   * ------------------------------------------------------------------------
   * @param {String}  dgmnId  ID for the DGMN in your Party
   * ----------------------------------------------------------------------*/
  upgradeEN = dgmnId => {
    debugLog("  Upgrading EN");
    this.allDgmn[dgmnId].upgrades.EN++;
    this.allDgmn[dgmnId].maxEnergy += 5;
  }

  /**------------------------------------------------------------------------
   * TITLE
   * ------------------------------------------------------------------------
   * Description
   * ------------------------------------------------------------------------
   * ----------------------------------------------------------------------*/
  animateDgmn = dgmnId => { !this.isEnemy(dgmnId) ? this.allDgmn[dgmnId].startIdleAnimation() : this.enemyDgmn[dgmnId].startIdleAnimation() }

  showDgmnFrame = (dgmnId,frame) => {
    let dgmnSpecies = this.isEnemy(dgmnId) ? this.enemyDgmn[dgmnId].speciesName.toLowerCase() : this.allDgmn[dgmnId].speciesName.toLowerCase();
    let frameImage = frame === 'dead' ? this.systemAH.fetchImage('dgmnDead') : this.systemAH.fetchImage(dgmnSpecies+frame);

    this.isEnemy(dgmnId) ? this.enemyDgmn[dgmnId].showFrame(frameImage) : this.allDgmn[dgmnId].showFrame(frameImage);
  }

  idleDgmn = dgmnId => { !this.isEnemy(dgmnId) ? this.allDgmn[dgmnId].idle() : this.enemyDgmn[dgmnId].idle() }

  moveDgmnCanvas = (dgmnId,newX,newY) => {
    this[this.getParty(dgmnId)][dgmnId].dgmnCanvas.x = newX;
    this[this.getParty(dgmnId)][dgmnId].dgmnCanvas.y = newY;
  }

  stopDgmnCanvas = dgmnId => { this[this.getParty(dgmnId)][dgmnId].dgmnCanvas.stop(); }

  getDgmnParty = () => this.party
  getTempDgmn = () => { return this.tempDgmn }

  /**------------------------------------------------------------------------
   * TITLE
   * ------------------------------------------------------------------------
   * Description
   * ------------------------------------------------------------------------
   * ----------------------------------------------------------------------*/
  getCanvas = dgmnId => { return !this.isEnemy(dgmnId) ? this.allDgmn[dgmnId].dgmnCanvas : this.enemyDgmn[dgmnId].dgmnCanvas }

  getIsDead = dgmnId => { return this.isEnemy(dgmnId) ? this.enemyDgmn[dgmnId].isDead : this.allDgmn[dgmnId].isDead }
}

export default DgmnManager;