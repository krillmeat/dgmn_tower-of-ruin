import config from "../../../config";
import ListMenu from "../../menu/list-menu";

class TargetSelect extends ListMenu{
  constructor(hitsAll,parentCTX,...args){
    super(...args);
    this.parentCTX = parentCTX; // Used to clear the Cursors off of the canvas
    this.hitsAll = hitsAll;
  }

  drawMenu = () => {
    this.menuCanvas.clearCanvas();
    this.drawCursor();
  }

  clearAllCursors = isEnemy => {
    if(isEnemy){
      this.parentCTX.clearRect(8*8*config.screenSize,2*8*config.screenSize,2*8*config.screenSize,12*8*config.screenSize);
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
    if(this.currIndex < this.listItems.length-1) {
      this.clearAllCursors(true);
      if(this.currIndex % this.itemAmount === this.itemAmount - 1 && this.currIndex !== 0) this.currPage++; 
      this.currIndex++;
      this.drawMenu();
    }
  }

  prevListItem = () => {
    if(this.currIndex > 0){
      this.clearAllCursors(true);
      if(this.currIndex % this.itemAmount === 0) this.currPage--;
      this.currIndex--;
      this.drawMenu();
    }
  }
}

export default TargetSelect;