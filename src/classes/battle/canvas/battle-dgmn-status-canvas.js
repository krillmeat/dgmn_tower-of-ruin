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

  getIconX = (isEnemy,offset) => ((isEnemy ? 0 : 17) + offset) * CFG.tileSize;
  getIconY = (dgmnIndex,offset) => (offset + (dgmnIndex * 4)) * CFG.tileSize;

  drawDgmnCombo = (coord,image) => {
    this.ctx.clearRect(coord[0]*CFG.tileSize,coord[1]*CFG.tileSize,CFG.tileSize,CFG.tileSize);
    this.ctx.drawImage(image,coord[0]*CFG.tileSize,coord[1]*CFG.tileSize,CFG.tileSize,CFG.tileSize)
  }

  drawDgmnWeak = (coord,image) => {
    this.ctx.clearRect(coord[0]*CFG.tileSize,coord[1]*CFG.tileSize,CFG.tileSize,CFG.tileSize);
    this.ctx.drawImage(image,coord[0]*CFG.tileSize,coord[1]*CFG.tileSize,CFG.tileSize,CFG.tileSize)
  }

  drawDgmnStatBuff = (isEnemy,dgmnIndex,image) => {
    let iconX = this.getIconX(isEnemy,0);
    let iconY = this.getIconY(dgmnIndex,5);
    this.ctx.clearRect(iconX,iconY,CFG.tileSize,CFG.tileSize);
    this.ctx.drawImage(image,iconX,iconY,CFG.tileSize,CFG.tileSize);
  }

  drawDgmnCondition = (isEnemy,dgmnIndex,image) => {
    let iconX = this.getIconX(isEnemy,1);
    let iconY = this.getIconY(dgmnIndex,5);
    this.ctx.clearRect(iconX,iconY,CFG.tileSize,CFG.tileSize);
    this.ctx.drawImage(image,iconX,iconY,CFG.tileSize,CFG.tileSize);
  }

}

export default BattleDgmnStatusCanvas;