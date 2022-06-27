import { attacksDB } from "../../../data/attacks.db";
import { comboRanks } from '../../../data/ranks.db';

class AttackUtility{
  constructor(){}

  getComboLetter = combo =>{
    let letter = 'F';
    if(combo >= 1 && combo < 5){
      letter = 'E';
    } else if(combo > 4 && combo < 9){
      letter = 'D';
    } else if(combo > 8 && combo < 14){
      letter = 'C';
    } else if(combo > 13 && combo < 19){
      letter = 'B';
    } else if(combo > 18 && combo < 24){
      letter = 'A';
    } else if(combo >= 25){
      letter = 'S';
    }
  
    return letter;
  }

  getComboMod = letter => {
    return comboRanks[letter];
  }

  getAttackData = (attackName,attributeList) => {
    let dataObj = {};
    for(let attr of attributeList){
      dataObj[attr] = attacksDB[attackName][attr];
    }
    return dataObj;
  }

  getDisplayName = attackName => { return attacksDB[attackName].displayName }
  getMaxCost = attackName => { return attacksDB[attackName].maxCost }
  getType = attackName => { return attacksDB[attackName].type }
  getStat = attackName => { return attacksDB[attackName].stat }
  getPower = attackName => { return attacksDB[attackName].power }
  getTargets = attackName => { return attacksDB[attackName].targets }
  getHits = attackName => { return attacksDB[attackName].hits }
}

export default AttackUtility;