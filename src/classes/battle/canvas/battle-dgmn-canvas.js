import GameCanvas from "../../canvas";

class BattleDgmnCanvas extends GameCanvas{
  constructor(dgmnName,...args){
    super(...args);

    this.dgmnName = dgmnName;
    this.frames = [];
    this.animateSpeed = 2000;
  }

  attackAnimation = () => {
    this.isIdle = false;
    this.clearCanvas();
    this.paintImage(this.imageStack[2]);
    this.triggerGameScreenRedraw();
  }

  hurtAnimation = () => {
    this.isIdle = false;
    this.clearCanvas();
    this.paintImage(this.imageStack[3]);
    this.triggerGameScreenRedraw();
  }
}

export default BattleDgmnCanvas;