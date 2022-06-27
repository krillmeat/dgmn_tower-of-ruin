import ListMenu from './list-menu';
import {toolBoxDB} from '../../data/digibeetle.db'
import TextArea from '../text-area';
import TreasureUtility from '../dungeon/utility/treasure.util';
import config from '../../config';
import DigiBeetleUtility from '../digibeetle.util';

class ItemsMenu extends ListMenu{
  constructor(drawTopText,drawBottomSection,digiBeetleBox,...args){
    super(...args);
    this.digiBeetleBoxType = digiBeetleBox;

    this.treasureUtility = new TreasureUtility();
    this.digiBeetleUtility = new DigiBeetleUtility();

    this.drawTopText = drawTopText;
    this.drawBottomSection = drawBottomSection;
  }

  /**------------------------------------------------------------------------
   * DRAW ITEMS LIST
   * ------------------------------------------------------------------------
   * Paints the Elements needed for the Items List
   * ----------------------------------------------------------------------*/
   drawList = () => {
     let boxSize = this.digiBeetleUtility.getToolBoxMax(this.digiBeetleBoxType);
    for(let i = 0; i < boxSize; i++){
      let columnOffset = (i+1) % 2 === 0 ? 9 : 0;
      let item = i < this.listItems.length ? this.treasureUtility.getTreasureName(this.listItems[i]) : '---';
      let color = item === '---' ? 'darkGreen' : 'white';
    let itemNameTxt = new TextArea(1+columnOffset,Math.floor(i/2),8,1);
          itemNameTxt.instantText(this.menuCanvas.ctx,item,color);
    }
 }

 
  drawMenu = () => {
    this.menuCanvas.blackFill();
    this.drawList();
    this.drawCursor();
    this.drawBottomSection('item',{itemName:this.listItems[this.currIndex]})
  }

  drawCursor = index => {
    let spotIndex = index ? index : this.currIndex;
    let columnOffset = (spotIndex+1) % 2 === 0 ? 9 : 0;
    this.menuCanvas.paintImage(this.cursorImg,columnOffset * config.tileSize,(Math.floor(spotIndex/2) % this.itemAmount) * (8 * this.itemHeight) * config.screenSize);
  }

  upListItem = () => {
    if(this.currIndex - 2 >= 0){
      this.currIndex -= 2;
      this.drawMenu();
    }
  }

  rightListItem = () => {
    if((this.currIndex + 1) % 2 !== 0 && this.currIndex + 1 < this.listItems.length){
      this.currIndex++;
      this.drawMenu();
    }
  }

  downListItem = () => {
    if(this.currIndex + 2 < this.listItems.length){
      this.currIndex+=2;
      this.drawMenu();
    }
  }

  leftListItem = () => {
    if((this.currIndex + 1) % 2 === 0){
      this.currIndex--;
      this.drawMenu();
    }
  }
}

export default ItemsMenu;
