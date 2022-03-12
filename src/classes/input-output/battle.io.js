import MenuUtility from "../menu/menu.util";
import IO from "./io";

class BattleIO extends IO{
  constructor(battleAH,...args){
    super(...args);
    this.battleAH = battleAH;
    this.menuUtility = new MenuUtility();
  }

  actionKeyHandler = upDown => {
    let currAction;
    if(this.battleAH.getMenuState() === 'battle'){
      currAction = this.battleAH.getCurrentMenuButton()
      if(currAction === 'attack'){ this.battleAH.launchAttackSelect();
      } else if(currAction === 'defend'){
        // TODO - Add Defend Event to Attack Actions
      } else if(currAction === 'stats'){
        // TODO - Launch Stats Menu
      } else if(currAction === 'back'){
        // TODO - Move up a level on the Menu
      }
    } else if(this.battleAH.getMenuState() === 'attack-list'){
      this.battleAH.selectAttack();
    }
  }

  upKeyHandler = upDown => {
    if(upDown === 'down'){
      this.triageMenuMove('up',this.battleAH.getMenuState(),this.battleAH.getMenuChart());
    }
  }

  rightKeyHandler = upDown => {
    if(upDown === 'down'){
      this.triageMenuMove('right',this.battleAH.getMenuState(),this.battleAH.getMenuChart());
    }
  }

  downKeyHandler = upDown => {
    if(upDown === 'down'){
      this.triageMenuMove('down',this.battleAH.getMenuState(),this.battleAH.getMenuChart());
    }
  }



  triageMenuMove = (dir, menuState, menuChart) => {
    let newIndex = menuChart.index;

    if(dir === 'up'){
      if(menuState === 'attack-list'){
        this.battleAH.setCurrentAttackMenuItem('prev');
      } else if(menuState === 'target-select'){
        this.battleAH.setCurrentAttackTarget('prev');
      }
    }

    if(dir === 'right'){
      if(menuState === 'battle'){ // TODO - Should be more than this
        newIndex = newIndex === menuChart[menuChart.level].length - 1 ? 0 : newIndex+1;
        this.battleAH.setCurrentMenuButton(menuChart[menuChart.level][newIndex]);
      }
    }

    if(dir === 'down'){
      if(menuState === 'attack-list'){
        this.battleAH.setCurrentAttackMenuItem('next');
      } else if(menuState === 'target-select'){
        this.battleAH.setCurrentAttackTarget('next');
      }
    }
  }

}

export default BattleIO;