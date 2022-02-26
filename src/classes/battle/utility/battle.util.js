import {battleImages} from '../../../data/images.db';

class BattleUtility{
  constructor(){

  }

  getDefaultBattleImages = () => {
    return battleImages;
  }
}

export default BattleUtility;