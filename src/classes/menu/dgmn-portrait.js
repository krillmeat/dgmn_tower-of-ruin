import CFG from "../../config";

class DgmnPortrait{
  constructor(dgmnList, size){
    this.dgmnList = dgmnList;
    this.size = size; // sm | lg

    this.images = {};
  }

  drawPortrait = (canvas,name,x,y) => {
    let ctx = canvas.ctx;
    let portraitHeight = this.size === 'sm' ? 32 : 64;
    // image, sX, sY, sW, sH, dX, dY, dW, dH || s = source | d = destination
    ctx.drawImage(this.images[name],0,0, 32 * 8, (portraitHeight - 1) * 8, x * 8 * CFG.screenSize, y * 8 * CFG.screenSize, 32 * CFG.screenSize, (portraitHeight - 1) * CFG.screenSize);
  }
}

export default DgmnPortrait;