import GameCanvas from "../../canvas";

class DgmnCanvas extends GameCanvas{
  constructor(refreshScreenCB,dgmnName,...args){
    super(...args);

    this.dgmnName = dgmnName;
    this.frames = [];
    this.animateSpeed = 2000;

    this.idleInterval;

    this.refreshScreen = () => { refreshScreenCB() }
  }

  animate = speed => {
    let counter = 0;
    let currentFrame = 0;
    this.idleInterval = setInterval( () => {
      if(this.isIdle){
        this.clearCanvas();
        // if(counter % 4 === 0){
          this.paintImage(this.frames[currentFrame]);
          currentFrame++;
          if(currentFrame > 1) currentFrame = 0;
        // }
      }
      counter++;
      this.refreshScreen();
    },speed);
  }

  showFrame = frame => {
    this.isIdle = false;
    this.clearCanvas();
    this.paintImage(frame);
  }

  idle = () => { this.isIdle = true }

  stop = () => {
    clearInterval(this.idleInterval);
    this.clearCanvas();
    this.refreshScreen();
    this.refreshScreen = null;
  }
}

export default DgmnCanvas;