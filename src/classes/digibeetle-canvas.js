import GameCanvas from "./canvas";

class DigiBeetleCanvas extends GameCanvas{
  constructor(currentDirectionCallback,...args){
    super(...args);

    this.direction = 'down';
    this.frames = {
      down: [],
      up: [],
      left: [],
      right: []
    };
    this.animateSpeed = 2000;
    this.animationCounter = 0;

    this.animateTimer;

    this.prevDirection = 'down';

    this.getDirection = () => { return currentDirectionCallback() }
  }

  animateBeetle = () =>{
    let frame = 0;
    this.animateTimer = setInterval( () => {
      this.animationCounter++;
      if(this.animationCounter % 8 === 0 || this.getDirection() !== this.prevDirection){
        this.prevDirection = this.getDirection();
        this.animationCounter = 0;
        if(frame === 0){ frame = 1; } else{ frame = 0; }
        this.clearCanvas();
        this.paintImage(this.frames[this.getDirection()][frame]);
        this.triggerGameScreenRedraw();
      }
    },66);
  }

  stopAnimatingBeetle = () => {
    clearInterval(this.animateTimer);
  }
}

export default DigiBeetleCanvas;