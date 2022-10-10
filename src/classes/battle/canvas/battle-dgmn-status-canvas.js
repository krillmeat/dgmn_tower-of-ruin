import CFG from "../../../config";
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

    this.ctx.clearRect(xPosition*CFG.screenSize,yPosition*CFG.screenSize,
                      16*CFG.screenSize,8*CFG.screenSize);

    this.ctx.drawImage(borderImg, xPosition*CFG.screenSize,yPosition*CFG.screenSize,
                      16*CFG.screenSize,8*CFG.screenSize);
                      
    this.ctx.fillStyle = barHex;
    this.ctx.fillRect((xPosition+4)*CFG.screenSize,(yPosition+2)*CFG.screenSize, meterLength*CFG.screenSize,(3*CFG.screenSize));
  }

  drawDgmnCombo = (coord,image) => {
    this.ctx.clearRect(coord[0]*CFG.tileSize,coord[1]*CFG.tileSize,CFG.tileSize,CFG.tileSize);
    this.ctx.drawImage(image,coord[0]*CFG.tileSize,coord[1]*CFG.tileSize,CFG.tileSize,CFG.tileSize)
  }

  drawDgmnWeak = (coord,image) => {
    this.ctx.clearRect(coord[0]*CFG.tileSize,coord[1]*CFG.tileSize,CFG.tileSize,CFG.tileSize);
    this.ctx.drawImage(image,coord[0]*CFG.tileSize,coord[1]*CFG.tileSize,CFG.tileSize,CFG.tileSize)
  }

}

export default BattleDgmnStatusCanvas;