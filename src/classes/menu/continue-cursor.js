import CFG from "../../config";
import GameCanvas from "../canvas";

class ContinueCursor{
  constructor(cursorImg,parentCanvasCB,drawCB){
    this.cursorCanvas = new GameCanvas('cursor',16,16,8*18,8*16);
    this.cursorImg = cursorImg;
    this.paintToParent = canvas => { parentCanvasCB(canvas) };
    this.drawCB = () => { drawCB() }
    this.blinkInterval;
  }

  
  blink = () => {
    let count = 0;
    this.blinkInterval = setInterval(()=>{
      count++;
      if(count % 2 === 0){
        this.cursorCanvas.paintImage(this.cursorImg,0,0);
      } else{
        this.cursorCanvas.blackFill();
      }

      this.paintToParent(this.cursorCanvas);
      this.drawCB();
    },500);
  }

  remove = () => { 
    this.cursorCanvas.blackFill(); 
    this.paintToParent(this.cursorCanvas);
    this.drawCB(); 
    clearInterval(this.blinkInterval) 
  }
}

export default ContinueCursor;
