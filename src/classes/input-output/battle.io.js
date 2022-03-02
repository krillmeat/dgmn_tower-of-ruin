import MenuUtility from "../menu/menu.util";
import IO from "./io";

class BattleIO extends IO{
  constructor(battleAH,...args){
    super(...args);
    this.battleAH = battleAH;
    this.menuUtility = new MenuUtility();
  }

  actionKeyHandler = upDown => {
    console.log("ACTION IN BATTLE");
  }

  rightKeyHandler = upDown => {
    if(upDown === 'down'){
      this.triageMenuMove('right',this.battleAH.getMenuChart());
    }
  }



  triageMenuMove = (dir, menuChart) => {
    let newIndex = menuChart.index;
    this.battleAH.setCurrentMenuButton('defend');

    if(dir === 'right'){
      newIndex = newIndex === menuChart[menuChart.level].length - 1 ? 0 : newIndex+1;
      this.battleAH.setCurrentMenuButton(menuChart[menuChart.level][newIndex]);
    }
  }

}

export default BattleIO;