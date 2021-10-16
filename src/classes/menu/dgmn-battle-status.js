import config from "../../config";
import BattleMeter from "./battle-meter";

class DgmnBattleStatus{
  constructor(listIndex, dgmnData){
    this.listIndex = listIndex;
    this.dgmnData = dgmnData;
    this.currHP = new BattleMeter();
    this.currEN = new BattleMeter();

    this.statuses = [];
  }

  drawMeter = (canvas,meter,image, meterLength, color) => {
    // TODO - Clear the original
    let meterOffset = meter === 'hp' ? 0 : 8 * config.screenSize;
    let leftOffset = this.dgmnData.isEnemy ? 8 * config.screenSize : 17 * 8 * config.screenSize;
    let battleLocationOffset = this.dgmnData.battleLocation * 32 * config.screenSize;
    canvas.ctx.clearRect(leftOffset, (16 * config.screenSize) + meterOffset + battleLocationOffset,
                         24 * config.screenSize,8 * config.screenSize )
    canvas.ctx.drawImage(image,
                         leftOffset, (16 * config.screenSize) + meterOffset + battleLocationOffset,
                         24 * config.screenSize,8 * config.screenSize);
    canvas.ctx.fillStyle = color === 'White' ? "#c4cfa1" : "#6ca66c";
    canvas.ctx.fillRect(leftOffset + (4 * config.screenSize),(16 * config.screenSize) + meterOffset + battleLocationOffset + (2 * config.screenSize),meterLength * config.screenSize,3 * config.screenSize );
  }
}

export default DgmnBattleStatus;