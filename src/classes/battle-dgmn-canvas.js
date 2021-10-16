import GameCanvas from "./canvas";

class BattleDgmnCanvas extends GameCanvas{
  constructor(dgmnName,...args){
    super(...args);

    this.dgmnName = dgmnName;
    this.frames = [];
    this.animateSpeed = 2000;
  }
}

export default BattleDgmnCanvas;