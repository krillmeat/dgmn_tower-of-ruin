import MenuUtility from "../menu/menu.util";
import IO from "./io";

class BattleIO extends IO{
  constructor(battleAH,...args){
    super(...args);
    this.battleAH = battleAH;
    this.battleMenuAH;
    this.victoryMenuAH;
    this.menuUtility = new MenuUtility();
  }

  // TODO - Rather than do this, maybe have an event handler on the Battle side that moves through all of these actions
  setMenuAH = ah => {
    this.battleMenuAH = ah;
  }

  actionKeyHandler = upDown => {
    if(this.battleAH.getBattleState() === 'battle'){
      if(this.battleMenuAH.getCurrMenuType() === 'icon'){
        this.battleMenuAH.selectIcon();
      } else if(this.battleMenuAH.getCurrMenuType() === 'list'){
        this.battleMenuAH.selectListItem();
      } else if(this.battleMenuAH.getState() === 'victory'){
        this.battleAH.gotoRewards();
      }
    } else if(this.battleAH.getBattleState() === 'victory'){
      if(this.battleMenuAH.getState() === 'level-next'){
        this.battleAH.levelUpNext();
      } else if(this.battleMenuAH.getState() === 'evolution-choice'){
        this.battleAH.evolveCurrDgmn();
      }
    }
    
  }

  upKeyHandler = upDown => {
      if(upDown === 'down'){
        if(this.battleAH.getBattleState() === 'battle'){
          if(this.battleMenuAH.getCurrMenuType() === 'list'){
            this.battleMenuAH.prevListItem();
          }  
        } else if(this.battleAH.getBattleState() === 'victory'){
          if(this.battleMenuAH.getState() === 'rewards') this.battleAH.giveCurrReward('up');
        }
      }
  }

  rightKeyHandler = upDown => { 
    if(upDown === 'down'){
      if(this.battleAH.getBattleState() === 'battle'){
        if(this.battleMenuAH.getCurrMenuType() === 'icon'){
          this.battleMenuAH.nextIcon();
        }    
      } else if(this.battleAH.getBattleState() === 'victory'){
        if(this.battleMenuAH.getState() === 'rewards') this.battleAH.giveCurrReward('right');
      }
    }
  }

  downKeyHandler = upDown => {    
    if(upDown === 'down'){
      if(this.battleAH.getBattleState() === 'battle'){
        if(this.battleMenuAH.getCurrMenuType() === 'list'){
          this.battleMenuAH.nextListItem();
        }
      }
    }
  }

  leftKeyHandler = upDown => { 
    if(upDown === 'down'){
      if(this.battleAH.getBattleState() === 'battle'){
        if(this.battleMenuAH.getCurrMenuType() === 'icon'){
          this.battleMenuAH.prevIcon();
        }
      } else if(this.battleAH.getBattleState() === 'victory'){
        if(this.battleMenuAH.getState() === 'rewards') this.battleAH.giveCurrReward('left');
      }
    }
  }

}

export default BattleIO;