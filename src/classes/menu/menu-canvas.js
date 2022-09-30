import GameCanvas from "../canvas";
import TextArea from "../text-area";
import config from "../../config";

class  MenuCanvas extends GameCanvas{
  constructor(...args){
    super(...args);

    this.topTxt = new TextArea(0,1,20);
  }

  clearTopMessage = () => {
    this.ctx.clearRect(0,8*config.screenSize, 160*config.screenSize,8*config.screenSize);
  }

  clearBottomSection = () => {
    this.ctx.fillStyle = "#00131A";
    this.ctx.fillRect(0,14*config.tileSize,20*config.tileSize,4*config.tileSize);
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
      0, 112 * config.screenSize,32*config.screenSize,(32-1)*config.screenSize);
  }
}

export default MenuCanvas;
