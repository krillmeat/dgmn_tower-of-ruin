import config from "../../../config";
import GameCanvas from "../../canvas";

class BattleDgmnStatusCanvas extends GameCanvas{
  constructor(...args){
    super(...args);
  }

  drawDgmnStatusMeter = (coord,images,meterLength) => {
    let xPosition = coord[0] * 8;
    let yPosition = coord[1] * 8;

    let barHex = meterLength >= 5 ? "#6CA66C" : "#1D5A4A";
    let borderImg = meterLength >= 5 ? images[0] : images[1];

    this.ctx.clearRect(xPosition*config.screenSize,yPosition*config.screenSize,
                      16*config.screenSize,8*config.screenSize);

    this.ctx.drawImage(borderImg, xPosition*config.screenSize,yPosition*config.screenSize,
                      16*config.screenSize,8*config.screenSize);
                      
    this.ctx.fillStyle = barHex;
    this.ctx.fillRect((xPosition+4)*config.screenSize,(yPosition+2)*config.screenSize, meterLength*config.screenSize,(3*config.screenSize));
  }

  drawDgmnCombo = (coord,image) => {
    this.ctx.clearRect(coord[0]*config.tileSize,coord[1]*config.tileSize,config.tileSize,config.tileSize);
    this.ctx.drawImage(image,coord[0]*config.tileSize,coord[1]*config.tileSize,config.tileSize,config.tileSize)
  }

  drawDgmnWeak = (coord,image) => {
    this.ctx.clearRect(coord[0]*config.tileSize,coord[1]*config.tileSize,config.tileSize,config.tileSize);
    this.ctx.drawImage(image,coord[0]*config.tileSize,coord[1]*config.tileSize,config.tileSize,config.tileSize)
  }

}

export default BattleDgmnStatusCanvas;