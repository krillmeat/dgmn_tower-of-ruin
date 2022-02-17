import IO from "./io";

class DungeonIO extends IO{
  constructor(dungeonAH,...args){
    super(...args);
    this.dungeonAH = dungeonAH;
  }

  cancelKeyHandler = upDown => {
    console.log("DOWN");
  }

  upKeyHandler = upDown => {
    if(this.dungeonAH.getDungeonState() === 'free'){
      this.movingInDirection('up',upDown);
    }
  }

  rightKeyHandler = upDown => {
    if(this.dungeonAH.getDungeonState() === 'free'){
      this.movingInDirection('right',upDown);
    }
  }

  downKeyHandler = upDown => {
    if(this.dungeonAH.getDungeonState() === 'free'){
      this.movingInDirection('down',upDown);
    }
  }

  leftKeyHandler = upDown => {
    if(this.dungeonAH.getDungeonState() === 'free'){
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