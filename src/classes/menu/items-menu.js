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

  // selectListItem = () => {
  //   let item = this.listItems[this.currIndex];
  //   console.log("Selecting Item = ",item);
  //   if(this.treasureUtility.isTreasureUsable(item,'dungeon')){ // TODO - This needs to not be hard-coded to dungeon
  //     let target = this.treasureUtility.getItemTarget(item);
  //     if(target === 'your-dgmn'){
  //       console.log("LAUNCH PARTY SELECT");
  //     } else if(target === 'your-dgmn-all'){
  //       console.log("USE ITEM ON ALL DGMN");
  //     }else if(target === 'beetle'){
  //       console.log("USE ITEM ON BEETLE");
  //     }
  //   }
  // }
}

export default ItemsMenu;
