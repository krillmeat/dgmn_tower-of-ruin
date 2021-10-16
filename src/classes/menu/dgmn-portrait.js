import config from "../../config";

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
    ctx.drawImage(this.images[name],0,0, 32 * 8, (portraitHeight - 1) * 8, x * 8 * config.screenSize, y * 8 * config.screenSize, 32 * config.screenSize, (portraitHeight - 1) * config.screenSize);
  }
}

export default DgmnPortrait;