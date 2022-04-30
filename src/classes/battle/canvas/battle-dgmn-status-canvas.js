import config from "../../../config";
import GameCanvas from "../../canvas";

class BattleDgmnStatusCanvas extends GameCanvas{
  constructor(...args){
    super(...args);
  }

  drawDgmnStatusMeter = (coord,images,meterLength) => {
    let xPosition = coord[0] * 8;
    let yPosition = coord[1] * 8;

    let barHex = meterLength >= 9 ? "#6CA66C" : "#1D5A4A";
    let borderImg = meterLength >= 9 ? images[0] : images[1];

    this.ctx.clearRect(xPosition*config.screenSize,yPosition*config.screenSize,
                      24*config.screenSize,8*config.screenSize);

    this.ctx.drawImage(borderImg, xPosition*config.screenSize,yPosition*config.screenSize,
                      24*config.screenSize,8*config.screenSize);
                      
    this.ctx.fillStyle = barHex;
    this.ctx.fillRect((xPosition+4)*config.screenSize,(yPosition+2)*config.screenSize, meterLength*config.screenSize,(3*config.screenSize));
  }

}

export default BattleDgmnStatusCanvas;