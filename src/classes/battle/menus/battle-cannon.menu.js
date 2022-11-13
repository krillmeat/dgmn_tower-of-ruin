import ListMenu from "../../menu/list-menu";
import CFG from "../../../config";

class BattleCannonMenu extends ListMenu{
  constructor(...args){
    super(...args);
  }

  // Overwrite to avoid black box behind cursor
  drawCursor = index => {
    let spotIndex = index ? index : this.currIndex;
    this.menuCanvas.paintImage(this.cursorImg,0,(spotIndex % this.itemAmount) * (8 * this.itemHeight) * CFG.screenSize);
  }
}

export default BattleCannonMenu;
