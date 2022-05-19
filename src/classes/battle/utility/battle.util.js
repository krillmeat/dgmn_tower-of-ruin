import {battleImages, fieldIcons, typeIcons} from '../../../data/images.db';
import {dgmnDB} from '../../../data/dgmn.db'

class BattleUtility{
  constructor(){

  }

  getDefaultBattleImages = () => {
    return battleImages.concat(typeIcons).concat(fieldIcons);
  }

  /**------------------------------------------------------------------------
   * CALCULATE TURN ORDER                                    
   * ------------------------------------------------------------------------
   * Compares all Dgmn SPDs and sorts them in the correct order for a turn
   * ------------------------------------------------------------------------
   * @param {Array} idList  List of Objects = { dgmnId: '', SPD: 0 }
   * @returns List of just the dgmnId in the correct order
   * ----------------------------------------------------------------------*/
  calculateTurnOrder = idList => {
    let order = [];
    let sortArray = idList;
    
    for(let i = 0; i < sortArray.length; i++){
      for(let r = 0; r < sortArray.length - 1; r++){
        let store = sortArray[r];
        if(sortArray[r].SPD < sortArray[r+1].SPD){
          sortArray[r] = sortArray[r+1];
          sortArray[r+1] = store;
        }
      }
    }

    for(let dgmn of sortArray){
      order.push(dgmn.dgmnId);
    }

    return order;
  }

  calculateMeterLength = (curr,max) => {
    return Math.floor((curr/max) * 10);
  }

  getRewards = species => {
    let rewards = [];

    // Add FP
    for(let k in dgmnDB[species].fields){
      let FP = dgmnDB[species].fields[k];
      if(FP > 0){
        for(let i = 0; i < FP; i++){
          rewards.push(k);
        }
      }
    }

    // MOVING...
    // // Add XP based on LV
    // for(let r = 0; r < dgmnDB[species].stage; r++){
    //   rewards.push('XP')
    // }

    return rewards;
  }

  getXP = species => {
    return dgmnDB[species].stage;
  }
}

export default BattleUtility;