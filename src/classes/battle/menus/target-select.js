import CFG from "../../../config";
import ListMenu from "../../menu/list-menu";

class TargetSelect extends ListMenu{
  constructor(hitsAll,dgmnIsDeadCB,parentCTX,...args){
    super(...args);
    this.parentCTX = parentCTX; // Used to clear the Cursors off of the canvas
    this.isDgmnDead = index => { return dgmnIsDeadCB(index) }
    this.hitsAll = hitsAll;

    // this.drawMenu(startingIndex); // TODO - Constructors shouldn't be calling their own methods
  }

  drawCursor = index => {
    let spotIndex = index ? index : this.currIndex;
    this.menuCanvas.paintImage(this.cursorImg,0,(spotIndex % this.itemAmount) * (8 * this.itemHeight) * CFG.screenSize);
  }

  drawMenu = (startingIndex = 0) => {
    this.menuCanvas.clearCanvas();
    if(this.hitsAll){
      this.drawAllCursors(true);
    } else{ this.drawCursor(startingIndex) }
  }

  clearAllCursors = isEnemy => {
    if(isEnemy){
      this.parentCTX.clearRect(8*8*CFG.screenSize,2*8*CFG.screenSize,2*8*CFG.screenSize,12*8*CFG.screenSize);
    } else {
      // TODO - Player side
    }
  }

  drawAllCursors = isEnemy => {
    if(isEnemy){
      this.drawCursor(0);
      this.drawCursor(1);
      this.drawCursor(2);
    } else {
      // TODO - Player side
    }
  }

  nextListItem = () => {
    if(this.currIndex < this.listItems.length-1 && !this.hitsAll) { // Not at end && Single-target
      if(!this.isDgmnDead(this.currIndex + 1)){ // If the next Dgmn is NOT dead
        this.clearAllCursors(true);
        this.currIndex++;
        this.drawMenu();
      } else if(this.currIndex === 0 && this.isDgmnDead(1) && !this.isDgmnDead(2)){ // If at First Spot and only the middle guy is dead
        this.clearAllCursors(true);
        this.currIndex = 2;
        this.drawMenu();
      }
    }
  }

  prevListItem = () => {
    if(this.currIndex > 0 && !this.hitsAll){  // Not at beginning && Single-target
      if(!this.isDgmnDead(this.currIndex - 1)){ // If the next Dgmn is NOT dead
        this.clearAllCursors(true);
        this.currIndex--;
        this.drawMenu();
      } else if(this.currIndex === 2 && this.isDgmnDead(1) && !this.isDgmnDead(0)){ // If at First Spot and only the middle guy is dead
        this.clearAllCursors(true);
        this.currIndex = 0;
        this.drawMenu();
      }
    }
  }
}

export default TargetSelect;