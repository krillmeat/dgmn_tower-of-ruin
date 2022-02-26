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
}

export default BattleCanvas;