import GameCanvas from "../../canvas";
import TextArea from "../../text-area";
import ContinueCursor from "../../menu/continue-cursor";

class DungeonTextCanvas extends GameCanvas{
  constructor(...args){
    super(...args);

    this.dungeonTxt = new TextArea(0,14,20,4);
  }

  drawContinueCursor = (continueCursorImg,drawCB) => {
    this.continueCursor = new ContinueCursor(continueCursorImg,this.paintCanvas,drawCB);
    this.continueCursor.blink();
  }
}

export default DungeonTextCanvas;