import DgmnAH from "../action-handlers/dgmn.ah";
import Dgmn from "./dgmn";
import DgmnParty from "./dgmn-party";

import Attack from "./attack";

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

    this.dgmnAH = new DgmnAH(this.getDgmnData,this.getDgmnAttackData,this.initDgmnCanvas,this.getCanvas,this.animateDgmn);

    this.enemyDgmn = {
      edId0: new Dgmn(0,"ENEMY","gabu"),
      edId1: new Dgmn(1,"ENEMY","picoDevi"),
      edId2: new Dgmn(2,"ENEMY","pulse")
    };

    this.party = this.mockParty();
  }

  // FOR NOW
  mockParty = () => {
    this.enemyDgmn.edId0.isEnemy = true; this.enemyDgmn.edId1.isEnemy = true; this.enemyDgmn.edId2.isEnemy = true;
    this.allDgmn.dId0.attacks = [new Attack('bubbles'), new Attack('babyFlame'), new Attack('magicalFire'), new Attack('darknessGear'), new Attack('petitFire'), new Attack('petitTwister'), new Attack('picoDarts')];
    return ['dId0','dId1','dId2'];
  }

  isEnemy = dgmnId => {
    return dgmnId.charAt(0) === 'e';
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

  initDgmnCanvas = (dgmnId,drawCB,imageList,battleLocation) => {
    !this.isEnemy(dgmnId) ? this.allDgmn[dgmnId].initCanvas(drawCB,imageList,battleLocation) : this.enemyDgmn[dgmnId].initCanvas(drawCB,imageList,battleLocation);
  }

  animateDgmn = dgmnId => { !this.isEnemy(dgmnId) ? this.allDgmn[dgmnId].startIdleAnimation() : this.enemyDgmn[dgmnId].startIdleAnimation() }

  getCanvas = dgmnId => { return !this.isEnemy(dgmnId) ? this.allDgmn[dgmnId].dgmnCanvas : this.enemyDgmn[dgmnId].dgmnCanvas }
}

export default DgmnManager;