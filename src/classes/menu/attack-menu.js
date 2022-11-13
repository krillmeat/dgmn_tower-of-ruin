import CFG from "../../config";
import TextArea from "../text-area";
import ListMenu from "./list-menu";
// import ListMenuCanvas from "./list-menu-canvas";

class AttackMenu extends ListMenu{
  constructor(fetchImageCB,...args){
    super(...args);
    this.fetchImage = imgName => fetchImageCB(imgName);
  }

  /**------------------------------------------------------------------------
   * DRAW ATTACK LIST
   * ------------------------------------------------------------------------
   * Paints the Elements needed for the Attack List
   * ----------------------------------------------------------------------*/
  drawList = () => {
    for(let i = 0; i < this.itemAmount; i++){
      let pageOffset = i+(this.currPage * this.itemAmount);
      if(pageOffset >= this.listItems.length) break;
      let attack = this.listItems[pageOffset];
      attack.textArea = new TextArea(1,(i*2),14,1);
      attack.textArea.instantText(this.menuCanvas.ctx,attack.displayName,"white");
      this.drawCostMeter(i,attack.maxCost,attack.currCost);
      this.drawTypeIcon(i,attack.type);
      this.drawPowerIcon(i,attack.power);
      this.drawTargetsIcon(i,attack.targets);
      this.drawHitsIcon(i,attack.hits);
    }
    this.drawScrollBar();
  }

  // Overwrite to avoid black box behind cursor
  drawCursor = index => {
    let spotIndex = index ? index : this.currIndex;
    this.menuCanvas.paintImage(this.cursorImg,0,(spotIndex % this.itemAmount) * (8 * this.itemHeight) * CFG.screenSize);
  }

  drawTypeIcon = (listIndex,type) => {
    this.menuCanvas.paintImage(this.fetchImage(`${type}TypeIcon`), 
                              ( 88 )*CFG.screenSize ,this.getYOffsetForIndex(listIndex) + ( 8 * CFG.screenSize ));
  }

  drawPowerIcon = (listIndex,power) => {
    this.menuCanvas.paintImage(this.fetchImage(`pwr${power}Icon`), 
                              ( 96 )*CFG.screenSize ,this.getYOffsetForIndex(listIndex) + ( 8 * CFG.screenSize ));
  }

  drawTargetsIcon = (listIndex,targets) => {
    let imageName = targets === 'single' ? 'targetOne' : 'targetAll';
    this.menuCanvas.paintImage(this.fetchImage(imageName), 
                              ( 104 )*CFG.screenSize ,this.getYOffsetForIndex(listIndex) + ( 8 * CFG.screenSize ));
  }

  drawHitsIcon = (listIndex,hits) => {
    let hitCount = 'one';
        hitCount = hits === 2 ? 'two' : hitCount;
        hitCount = hits === 3 ? 'three' : hitCount;

    this.menuCanvas.paintImage(this.fetchImage('oneHitIcon'), // TODO - Create the remaining icons 
                              ( 112 )*CFG.screenSize ,this.getYOffsetForIndex(listIndex) + ( 8 * CFG.screenSize ));
  }

  /**------------------------------------------------------------------------
   * DRAW COST METER
   * ------------------------------------------------------------------------
   * Draws the Cost Meter to show how many uses an Attack has left
   * TODO - Do a comment write-up on how this works
   * ----------------------------------------------------------------------*/
  drawCostMeter = (listIndex,maxCost,currCost) => {
    let blockCount = maxCost / 4;
    let remCount = currCost;
    for(let i = 0; i < blockCount; i++){
      let remove = maxCost - ((i+1) * 4);
      let check = maxCost - remove - (i * 4);
      let final = 25 * (remCount - check);
          final = final >= 0 ? 0 : final;
          final = final/25 < -3 ? -100 : final;
      this.menuCanvas.ctx.drawImage(this.fetchImage(`costMeter${100+final}`),
                                 ((1 + i) * (8 * CFG.screenSize)), (1+(listIndex*2))*(8*CFG.screenSize),
                                 (8*CFG.screenSize),(8*CFG.screenSize));
      remCount -= 4;
    }
  }
}

export default AttackMenu;