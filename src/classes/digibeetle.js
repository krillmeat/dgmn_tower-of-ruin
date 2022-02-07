import DigiBeetleCanvas from "./digibeetle-canvas"

class DigiBeetle{
  constructor(directionCallback,gameScreenRedrawCallback){
    this.triggerGameScreenRedraw = () => { gameScreenRedrawCallback() }
    this.sendCurrentDirection = () => { return directionCallback() }

    this.digiBeetleCanvas = new DigiBeetleCanvas(this.sendCurrentDirection,'digibeetle-canvas',16,16,64,64, false, this.triggerGameScreenRedraw);
  }
}

export default DigiBeetle;