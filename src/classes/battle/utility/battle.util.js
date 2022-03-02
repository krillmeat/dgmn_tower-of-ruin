import {battleImages} from '../../../data/images.db';

class BattleUtility{
  constructor(){

  }

  getDefaultBattleImages = () => {
    return battleImages;
  }

  calculateMeterLength = (curr,max) => {
    let result = Math.floor((curr/max) * 18);

    return result;
  }
}

export default BattleUtility;