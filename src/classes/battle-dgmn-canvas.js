import GameCanvas from "./canvas";

class BattleDgmnCanvas extends GameCanvas{
  constructor(...args){
    super(...args);

    this.frames = [];
    this.animateSpeed = 2000;

    this.animate(this.animateSpeed);
  }
}

export default BattleDgmnCanvas;