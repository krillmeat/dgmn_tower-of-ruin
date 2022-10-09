import IO from "./io";

class DungeonIO extends IO{
  constructor(dungeonAH,...args){
    super(...args);
    this.dungeonAH = dungeonAH;
    this.menuAH;
  }

  setMenuAH = ah => {
    this.menuAH = ah;
  }

  cancelKeyHandler = upDown => {
    let cancelStates = ['items','items-target','items-done'];
    if(this.dungeonAH.getDungeonState() === 'main-menu' && cancelStates.indexOf(this.menuAH.getState()) !== -1){
      this.menuAH.backMenu();
    } else if(this.dungeonAH.getDungeonState() === 'main-menu' && this.menuAH.getState() === 'main'){ this.dungeonAH.bringUpMenu()
    }
  }

  actionKeyHandler = upDown => {
    if(this.dungeonAH.getDungeonState() === 'hatch'){
      if(this.menuAH.getState() === 'hatch-choice'){
        this.menuAH.selectHatch();
      } else if(this.menuAH.getState() === 'evo-choice'){
        this.menuAH.selectEvo();
      }
    } else if(this.dungeonAH.getDungeonState() === 'main-menu'){
      if(this.menuAH.getState() === 'main'){
        this.menuAH.selectIcon();
      } else if(this.menuAH.getState() === 'items' || this.menuAH.getState() === 'items-target' || this.menuAH.getState() === 'items-done'){
        this.menuAH.selectListItem();
      }
    } else if(this.dungeonAH.getDungeonState() === 'text-box-next'){
      this.dungeonAH.closeTextBox();
    }
  }

  startKeyHandler = upDown => {
    if(this.dungeonAH.getDungeonState() === 'free' || this.dungeonAH.getDungeonState() === 'main-menu'){
      this.dungeonAH.bringUpMenu();
    }
  }

  upKeyHandler = upDown => {
    if(this.dungeonAH.getDungeonState() === 'hatch' && upDown === 'down'){ // Start Menu
      if(this.menuAH.getState() === 'rewards') this.menuAH.giveCurrReward('up');
    } else if(this.dungeonAH.getDungeonState() === 'free'){ // In Dungeon
      this.movingInDirection('up',upDown);
    } else if(this.dungeonAH.getDungeonState() === 'main-menu'){
      if(this.menuAH.getState() === 'items' || this.menuAH.getState() === 'items-target'){
        this.menuAH.upListItem();
      }
    }
  }

  rightKeyHandler = upDown => {
    if(this.dungeonAH.getDungeonState() === 'hatch' && upDown === 'down'){
      if(this.menuAH.getState() === 'rewards'){
        this.dungeonAH.giveCurrReward('right');
      } else if(this.menuAH.getState() === 'hatch-choice'){
        this.menuAH.nextHatch();
      }
    } else if(this.dungeonAH.getDungeonState() === 'main-menu'){
      if(this.menuAH.getState() === 'main'){
        this.menuAH.nextIcon();
      } else if(this.menuAH.getState() === 'items'){
        this.menuAH.rightListItem();
      }
    } else if(this.dungeonAH.getDungeonState() === 'free'){
      this.movingInDirection('right',upDown);
    }
  }

  downKeyHandler = upDown => {
    if(this.dungeonAH.getDungeonState() === 'free'){
      this.movingInDirection('down',upDown);
    } else if(this.dungeonAH.getDungeonState() === 'main-menu'){
      if(this.menuAH.getState() === 'items' || this.menuAH.getState() === 'items-target'){
        this.menuAH.downListItem();
      }
    }
  }

  leftKeyHandler = upDown => {
    if(this.dungeonAH.getDungeonState() === 'hatch' && upDown === 'down'){
      if(this.menuAH.getState() === 'rewards'){
        //  this.dungeonAH.giveCurrReward('left');
        this.menuAH.giveCurrReward('left');
      } else if(this.menuAH.getState() === 'hatch-choice'){
        this.menuAH.prevHatch();
      }
    } else if(this.dungeonAH.getDungeonState() === 'main-menu'){
      if(this.menuAH.getState() === 'main'){
        this.menuAH.prevIcon();
      } else if(this.menuAH.getState() === 'items'){
        this.menuAH.leftListItem();
      }
    } else if(this.dungeonAH.getDungeonState() === 'free'){
      this.movingInDirection('left',upDown);
    }
  }

  isNotAlreadyMoving = (dir,moving) => {
    if(dir === 'up'){ return ( moving !== 'right' && moving !== 'down' && moving !== 'left' )
    } else if(dir === 'right'){ return ( moving !== 'up' && moving !== 'down' && moving !== 'left' ) 
    } else if(dir === 'down'){ return ( moving !== 'up' && moving !== 'right' && moving !== 'left' ) 
    } else if(dir === 'left'){ return ( moving !== 'up' && moving !== 'right' && moving !== 'down' ) }

    return false; // TODO - Not sure this is the right way to do this, but I think it's fine
  }

  movingInDirection = (dir,upDown) => {
    let moving = this.dungeonAH.getMoving();
    let collision = this.dungeonAH.getCollision();

    if(this.isNotAlreadyMoving(dir,moving)){
      if(!collision[dir] && (upDown === 'down' || (upDown === 'up' && moving === dir))){
        this.dungeonAH.moveFloor(dir,upDown);
      } else if(collision[dir] && moving === dir){
        this.dungeonAH.setMoving('none');
      } else if(collision[dir] && upDown === 'down'){
        this.dungeonAH.setCurrentDirection(dir);
      }
    }
    
  }
}

export default DungeonIO;