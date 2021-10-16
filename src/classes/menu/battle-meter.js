import {fontData} from '../../data/font.db';

class BattleMeter {
  constructor(stat){
    this.stat = stat;
    this.currentValue = 0;
    this.maxValue = 100;
  }

  paintBase = () => {
    
  }
}

export default BattleMeter;