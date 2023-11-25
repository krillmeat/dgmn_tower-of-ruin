import GameCanvas from "../canvas";
import TextArea from "../text-area";
import CFG from "../../config";

class  MenuCanvas extends GameCanvas{
  constructor(...args){
    super(...args);

    this.topTxt = new TextArea(0,1,20);
  }

  clearTopMessage = () => {
    this.ctx.clearRect(0,8*CFG.screenSize, 160*CFG.screenSize,8*CFG.screenSize);
  }

  // This has issues in Sub Menus, because it covers up the Continue Cursor
  clearBottomSection = () => {
    this.ctx.fillStyle = "#00131A";
    this.ctx.fillRect(0,14*CFG.tileSize,20*CFG.tileSize,4*CFG.tileSize);
  }

  clearBottomSectionIgnoreCursor = () => {
    this.ctx.fillStyle = "#00131A";
    this.ctx.fillRect(0,14*CFG.tileSize,20*CFG.tileSize,3*CFG.tileSize);
    this.ctx.fillRect(0,17*CFG.tileSize,18*CFG.tileSize,1*CFG.tileSize);
  }

  setTopMessage = message => {
    this.clearTopMessage();
    this.topTxt.instantText(this.ctx,message,'white');
  }
  
  /**------------------------------------------------------------------------
   * DRAW DGMN PORTRAIT
   * ------------------------------------------------------------------------
   * Draw the DGMN Portrait in the Bottom Section
   * ------------------------------------------------------------------------
   * @param {String} portraitImage Image of the DGMN Portrait
   * ----------------------------------------------------------------------*/
   drawDgmnPortrait = portraitImg => {
    this.ctx.drawImage(portraitImg,0,0,256,248,
      0, 112 * CFG.screenSize,32*CFG.screenSize,(32-1)*CFG.screenSize);
  }
}

export default MenuCanvas;
