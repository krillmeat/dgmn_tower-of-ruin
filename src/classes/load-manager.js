import SystemAH from "./action-handlers/system.ah";
import GameCanvas from "./canvas";

class LoadManager{
  constructor(systemAH){
    this.state = 'inactive';
    this.isLoading = false;
    this.systemAH = systemAH;
    this.loadCanvas = new GameCanvas('load',160,144);
  }

  load = callback => {
    this.isLoading = true;
    let frame = 0;
    let loadingInterval = setInterval(()=>{
      if(frame >= 9){
        clearInterval(loadingInterval);
        callback();
      } else{ frame++ }
      this.loadCanvas.paintImage(this.systemAH.fetchImage('loading'+frame,0,0));
    },33);
  }

  stop = () => {
    let frame = 9;
    let loadingInterval = setInterval(()=>{
      if(frame <= 0){
        this.isLoading = false;
        clearInterval(loadingInterval);
      } else{ frame-- }
      this.loadCanvas.clearCanvas();
      this.loadCanvas.paintImage(this.systemAH.fetchImage('loading'+frame,0,0));
    },33);
  }

}

export default LoadManager;