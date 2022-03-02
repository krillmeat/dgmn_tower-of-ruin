import config from "../../../config";
import GameCanvas from "../../canvas";

class BattleCanvas extends GameCanvas{
  constructor(...args){
    super(...args);
  }

  drawBattleBase = backgroundImage => {
    this.blackFill();
    this.paintImage(backgroundImage);
  }

  drawDgmnCanvas = dgmnCanvas => {
    this.paintCanvas(dgmnCanvas); // TODO - Flipped?
  }

  drawDgmnPortrait = dgmnPortraitImage => {
    let portraitX = 0;
    let portraitY = 0;
    this.paintImage(dgmnPortraitImage,portraitX,portraitY);
  }
}

export default BattleCanvas;