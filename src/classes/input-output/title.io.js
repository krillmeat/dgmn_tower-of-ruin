import MenuUtility from '../menu/menu.util';
import IO from './io';

class TitleIO extends IO{
  constructor(...args){
    super(...args)
    this.gameAH;
    this.titleAH;
    this.menuUtility = new MenuUtility();
  }

  actionKeyHandler = upDown => {
    // TODO - Actually check for what 
    this.titleAH.startNewGame();
  }
}

export default TitleIO
