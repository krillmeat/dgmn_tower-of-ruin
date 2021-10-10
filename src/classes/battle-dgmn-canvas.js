import GameCanvas from "./canvas";

class BattleDgmnCanvas extends GameCanvas{
  constructor(dgmnName,...args){
    super(...args);

    this.dgmnName = dgmnName;
    this.frames = [];
    this.animateSpeed = 2000;

    this.loadImageStack([`./sprites/Battle/Dgmn/${this.dgmnName}_idle_0.png`,`./sprites/Battle/Dgmn/${this.dgmnName}_idle_1.png`]);
  }
}

export default BattleDgmnCanvas;