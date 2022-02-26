import GameCanvas from "../../canvas";

class DgmnCanvas extends GameCanvas{
  constructor(refreshScreenCB,dgmnName,...args){
    super(...args);

    this.dgmnName = dgmnName;
    this.frames = [];
    this.animateSpeed = 2000;

    this.refreshScreen = () => { refreshScreenCB() }
  }

  animate = speed => {
    let counter = 0;
    let currentFrame = 0;
    setInterval( () => {
      if(this.isIdle){
        this.clearCanvas();
        // if(counter % 4 === 0){
          this.paintImage(this.imageStack[currentFrame]);
          currentFrame++;
          if(currentFrame > 1) currentFrame = 0;
        // }
      }
      counter++;
    },speed);
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

export default DgmnCanvas;