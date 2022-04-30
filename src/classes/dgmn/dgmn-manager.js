import DgmnAH from "../action-handlers/dgmn.ah";
import Dgmn from "./dgmn";
import DgmnParty from "./dgmn-party";

import Attack from "./attack";
import { partyMock, enemyPartyMock } from "../../mock/dgmn.mock";
import EnemyGenerator from "./enemy-generator";

// TODO - THIS CLASS WILL NEVER WORK LIKE THIS. IT WILL INTERACT HEAVILY WITH THE SAVE DATA TO BUILD OUT THE allDgmn OBJECT
// TODO - RENAME TO ALL DGMN
class DgmnManager{
  constructor(){
    // TODO - In the future, dIdX should probably be generated. If I ever want to do a cool online thing, you might need very unique IDs
    this.allDgmn = {
      dId0: new Dgmn(0,"FLARE","Agu"),
      dId1: new Dgmn(1,"SPROUT","Lala"),
      dId2: new Dgmn(2,"GEAR","Haguru")
    }

    this.dgmnAH = new DgmnAH({
      getDgmnDataCB: this.getDgmnData,
      getDgmnAttackDataCB: this.getDgmnAttackData,
      initDgmnCanvasCB: this.initDgmnCanvas,
      getCanvasCB: this.getCanvas,
      animateDgmnCB: this.animateDgmn,
      dealDMGCB: this.dealDMG,
      checkKOCB: this.checkKO,
      checkAllDeadCB: this.checkAllDead,
      createDgmnCB: this.createDgmn,
      generateEnemiesCB: this.generateEnemies
    });

    this.enemyGenerator = new EnemyGenerator(this.dgmnAH);

    this.enemyDgmn = { };

    this.party = this.mockParty();
  }

  // FOR NOW
  mockParty = () => {
    // this.enemyDgmn.edId0.isEnemy = true; this.enemyDgmn.edId1.isEnemy = true; this.enemyDgmn.edId2.isEnemy = true;
    for(let i = 0; i < 3; i++){
      this.allDgmn[`dId${i}`].currentLevel = partyMock[`dId${i}`].currentLevel;
      this.allDgmn[`dId${i}`].attacks = partyMock[`dId${i}`].attacks;
      this.allDgmn[`dId${i}`].currentStats = partyMock[`dId${i}`].currentStats;

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
      this.enemyDgmn[`edId${index}`].currentHP = this.enemyDgmn[`edId${index}`].currentStats.HP
    }
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
  generateEnemies = data => {
    this.enemyGenerator.generate(data);
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

  /**------------------------------------------------------------------------
   * TITLE
   * ------------------------------------------------------------------------
   * Description
   * ------------------------------------------------------------------------
   * ----------------------------------------------------------------------*/
  dealDMG = (target,dmg) => {
    if(target.charAt(0) === 'e'){
      this.enemyDgmn[target].currentHP -= dmg;
    } else{
      // TODO - Deal DMG to you
    }
  }

  /**------------------------------------------------------------------------
   * TITLE
   * ------------------------------------------------------------------------
   * Description
   * ------------------------------------------------------------------------
   * ----------------------------------------------------------------------*/
  checkKO = target => {
    if(this.isEnemy(target)){
      if(this.enemyDgmn[target].isDead) return true;
      if(this.enemyDgmn[target].currentHP <= 0){
        this.enemyDgmn[target].isDead = true;
        return true;
      }
    }
    return false
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

  /**------------------------------------------------------------------------
   * TITLE
   * ------------------------------------------------------------------------
   * Description
   * ------------------------------------------------------------------------
   * ----------------------------------------------------------------------*/
  animateDgmn = dgmnId => { !this.isEnemy(dgmnId) ? this.allDgmn[dgmnId].startIdleAnimation() : this.enemyDgmn[dgmnId].startIdleAnimation() }

  /**------------------------------------------------------------------------
   * TITLE
   * ------------------------------------------------------------------------
   * Description
   * ------------------------------------------------------------------------
   * ----------------------------------------------------------------------*/
  getCanvas = dgmnId => { return !this.isEnemy(dgmnId) ? this.allDgmn[dgmnId].dgmnCanvas : this.enemyDgmn[dgmnId].dgmnCanvas }
}

export default DgmnManager;