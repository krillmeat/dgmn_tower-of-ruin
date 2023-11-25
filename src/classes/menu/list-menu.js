import CFG from "../../config";
import SubMenu from "./sub-menu";
import GameCanvas from "../canvas";
import { warningLog } from "../../utils/log-utils";
import TextArea from "../text-area";

/**------------------------------------------------------------------------
 * LIST MENU
 * ------------------------------------------------------------------------
 * Reusable List-style Menu
 * ------------------------------------------------------------------------
 * @param {Array}   coord       Coordinates for top-left of Menu : [x,y]
 * @param {Number}  itemAmount  Number of items/rows
 * @param {Number}  listWidth   How wide the Menu is
 * @param {Number}  itemHeight  How many squares tall each item is : default 1
 * @param {Array}   listItems   List of labels for the items
 * @param {Image}   cursorImg   Which Cursor Image to use : miniCursor | cursor
 * @param {Image}   backImg     Background Image for the Menu
 * ----------------------------------------------------------------------*/
class ListMenu extends SubMenu{
  constructor(coord,itemAmount,listWidth,itemHeight=1,listItems=[],cursorImg,backImg,...args){
    super(...args);
    this.listItems = listItems;
    this.itemHeight = itemHeight;
    this.itemAmount = itemAmount;
    this.currIndex = 0;
    this.currPage = 0;
    this.backImg = backImg;
    this.cursorImg = cursorImg;
    this.cursorOffset = 0;

    this.menuCanvas = new GameCanvas(`${this.label}-menu`,listWidth*8 ,itemAmount * (itemHeight * 8) )
    this.menuCanvas.x = coord[0] * 8 * CFG.screenSize;
    this.menuCanvas.y = coord[1] * 8 * CFG.screenSize;
  }

  
  drawList = () => { // Default
    for(let i = 0; i < this.listItems.length; i++){
      let listItemTxt = new TextArea(1+this.cursorOffset,i,this.width-1,1);
          listItemTxt.instantText(this.menuCanvas.ctx,this.listItems[i],'white');
    }
  }
  buildList = () => { warningLog(`WARNING - SubMenu ${this.label} is missing buildList Method`) }


  setMenuItem = dir => {
    warningLog(`WARNING - SubMenu ${this.label} is missing setMenuItem Method`)
  }

  getCurrLabel = () => {
    return this.listItems[this.currIndex];
  }

  drawBackImg = () => {
    if(this.backImg) this.menuCanvas.paintImage(this.backImg,0,0);
  }

  drawCursor = index => {
    let spotIndex = index ? index : this.currIndex;
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(0,0,CFG.tileSize,(this.itemAmount*this.itemHeight)*CFG.tileSize);
    this.menuCanvas.paintImage(this.cursorImg,0,(spotIndex % this.itemAmount) * (8 * this.itemHeight) * CFG.screenSize);
  }

  drawMenu = () => {
    this.drawBackImg();
    this.drawList();
    this.drawCursor();
  }

  drawScrollBar = () => {
    let barMax = (8 * CFG.screenSize * this.itemHeight) * this.itemAmount;
    let barHeight = barMax / Math.ceil(this.listItems.length / this.itemAmount);
    let barX = this.menuCanvas.width - (8 * CFG.screenSize);
    let barY = barHeight * (Math.ceil((this.currIndex+1) / this.itemAmount)-1) ;
        barY = barY < 0 ? 0 : barY;

    this.menuCanvas.ctx.fillStyle = "#6CA66C";
    this.menuCanvas.ctx.fillRect(barX+(2*CFG.screenSize),barY+(1*CFG.screenSize),5*CFG.screenSize,barHeight - (3 * CFG.screenSize));
  
  }

  getYOffsetForIndex = listIndex => {
    return (this.itemHeight * listIndex * 8) * CFG.screenSize;
  }

  nextListItem = () => {
    if(this.currIndex < this.listItems.length-1) {
      if(this.currIndex % this.itemAmount === this.itemAmount - 1 && this.currIndex !== 0) this.currPage++; 
      this.currIndex++;
      this.drawMenu();
    }
  }

  prevListItem = () => {
    if(this.currIndex > 0){
      if(this.currIndex % this.itemAmount === 0) this.currPage--;
      this.currIndex--;
      this.drawMenu();
    }
  }

  // TODO - Currently doesn't get called, because so far, when you select a list item, it deletes this object altogether, no need to set to inactive
  selectListItem = () => {
    this.currIndex = 0;
    this.isActive = false;
  }
}

export default ListMenu;