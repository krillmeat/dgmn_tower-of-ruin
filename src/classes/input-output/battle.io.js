import MenuUtility from "../menu/menu.util";
import IO from "./io";

class BattleIO extends IO{
  constructor(battleAH,...args){
    super(...args);
    this.battleAH = battleAH;
    this.battleMenuAH;
    this.menuUtility = new MenuUtility();
  }

  setMenuAH = ah => {
    this.battleMenuAH = ah;
  }

  actionKeyHandler = upDown => {
    if(this.battleMenuAH.getCurrMenuType() === 'icon'){
      this.battleMenuAH.selectIcon();
    } else if(this.battleMenuAH.getCurrMenuType() === 'list'){
      this.battleMenuAH.selectListItem();
    }
  }

  upKeyHandler = upDown => {
    if(upDown === 'down'){
      if(this.battleMenuAH.getCurrMenuType() === 'list'){
        this.battleMenuAH.prevListItem();
      }
    }
  }

  rightKeyHandler = upDown => {
    if(upDown === 'down'){
      if(this.battleMenuAH.getCurrMenuType() === 'icon'){
        this.battleMenuAH.nextIcon();
      }      
    }
  }

  downKeyHandler = upDown => {
    if(upDown === 'down'){
      if(this.battleMenuAH.getCurrMenuType() === 'list'){
        this.battleMenuAH.nextListItem();
      }
    }
  }

  leftKeyHandler = upDown => {
    if(upDown === 'down'){
      if(this.battleMenuAH.getCurrMenuType() === 'icon'){
        this.battleMenuAH.prevIcon();
      }
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