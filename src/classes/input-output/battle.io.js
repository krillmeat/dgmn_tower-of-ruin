import MenuUtility from "../menu/menu.util";
import IO from "./io";

class BattleIO extends IO{
  constructor(battleAH,...args){
    super(...args);
    this.battleAH = battleAH;
    this.menuAH;
    this.victoryMenuAH;
    this.menuAH;
    this.menuUtility = new MenuUtility();
  }

  // TODO - Rather than do this, maybe have an event handler on the Battle side that moves through all of these actions
  setMenuAH = ah => {
    this.menuAH = ah;
  }

  actionKeyHandler = upDown => {
    if(this.battleAH.getBattleState() === 'battle'){
      if(this.menuAH.getCurrMenuType() === 'icon'){
        this.menuAH.selectIcon();
      } else if(this.menuAH.getCurrMenuType() === 'list'){
        this.menuAH.selectListItem();
      } else if(this.menuAH.getState() === 'victory'){
        this.battleAH.gotoRewards();
      }
    } else if(this.battleAH.getBattleState() === 'victory'){
      if(this.menuAH.getState() === 'level-next'){
        this.menuAH.confirmLevelUp();
      } else if(this.menuAH.getState() === 'evo-choice'){
        this.menuAH.selectEvo();
      } else if(this.menuAH.getState() === 'boss-reward'){
        // this.battleAH.selectBossReward();
      }
    }
  }

  cancelKeyHandler = upDown => {
    this.menuAH.goBack();
  }

  upKeyHandler = upDown => {
      if(upDown === 'down'){
        if(this.battleAH.getBattleState() === 'battle'){
          if(this.menuAH.getCurrMenuType() === 'list'){
            this.menuAH.prevListItem();
          }  
        } else if(this.battleAH.getBattleState() === 'victory'){
          if(this.menuAH.getState() === 'rewards'){
            this.menuAH.giveCurrReward('up');
          } else if(this.menuAH.getState() === 'boss-reward'){ this.menuAH.navUp() }
        }
      }
  }

  rightKeyHandler = upDown => { 
    if(upDown === 'down'){
      if(this.battleAH.getBattleState() === 'battle'){
        if(this.menuAH.getCurrMenuType() === 'icon'){
          this.menuAH.nextIcon();
        }    
      } else if(this.battleAH.getBattleState() === 'victory'){
        if(this.menuAH.getState() === 'rewards') this.menuAH.giveCurrReward('right');
      }
    }
  }

  downKeyHandler = upDown => {    
    if(upDown === 'down'){
      if(this.battleAH.getBattleState() === 'battle'){
        if(this.menuAH.getCurrMenuType() === 'list'){
          this.menuAH.nextListItem();
        }
      } else if(this.battleAH.getBattleState() === 'victory'){
        if(this.menuAH.getState() === 'boss-reward') this.menuAH.navDown()
      }
    }
  }

  leftKeyHandler = upDown => { 
    if(upDown === 'down'){
      if(this.battleAH.getBattleState() === 'battle'){
        if(this.menuAH.getCurrMenuType() === 'icon'){
          this.menuAH.prevIcon();
        }
      } else if(this.battleAH.getBattleState() === 'victory'){
        if(this.menuAH.getState() === 'rewards') this.menuAH.giveCurrReward('left');
      }
    }
  }

}

export default BattleIO;
