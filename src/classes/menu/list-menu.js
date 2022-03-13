import config from "../../config";
import SubMenu from "./sub-menu";
import GameCanvas from "../canvas";
import { warningLog } from "../../utils/log-utils";

class ListMenu extends SubMenu{
  constructor(coord,itemAmount,listWidth,itemHeight=1,listItems=[],cursorImg,backImg,...args){
    super(...args);
    this.listItems = listItems;
    this.itemHeight = itemHeight;
    this.currIndex = 0;
    this.backImg = backImg;
    this.cursorImg = cursorImg;

    this.menuCanvas = new GameCanvas(`${this.label}-menu`,listWidth*8 ,itemAmount * (itemHeight * 8) )
    this.menuCanvas.x = coord[0] * 8 * config.screenSize;
    this.menuCanvas.y = coord[1] * 8 * config.screenSize;

    this.drawBackImg();
  }

  buildList = () => { warningLog(`WARNING - SubMenu ${this.label} is missing buildList Method`) }

  setMenuItem = dir => {
    warningLog(`WARNING - SubMenu ${this.label} is missing setMenuItem Method`)
  }

  drawBackImg = () => {
    this.menuCanvas.paintImage(this.backImg,0,0);
  }

  drawCursor = (listIndex,offsetX,offsetY) => {
    this.menuCanvas.paintImage(this.cursorImg,(offsetX*8) * config.screenSize,(((listIndex*this.listHeight) + offsetY)*8)*config.screenSize)
  }

  getYOffsetForIndex = listIndex => {
    return (this.itemHeight * listIndex * 8) * config.screenSize;
  }
}

export default ListMenu;