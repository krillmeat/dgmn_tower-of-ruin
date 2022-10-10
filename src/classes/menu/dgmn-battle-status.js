import CFG from "../../config";
import BattleMeter from "./battle-meter";
import { fontData } from "../../data/font.db";

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
    let meterOffset = meter === 'hp' ? 0 : 8 * CFG.screenSize;
    let leftOffset = this.dgmnData.isEnemy ? 8 * CFG.screenSize : 17 * 8 * CFG.screenSize;
    let battleLocationOffset = this.dgmnData.battleLocation * 32 * CFG.screenSize;
    let barColor;
    if(color === 'Red'){  barColor = '#F83018'
    } else if(color === 'Blue'){ barColor = '#58A0F8'
    } else {  barColor = '#6CA66C'}
    canvas.ctx.clearRect(leftOffset, (16 * CFG.screenSize) + meterOffset + battleLocationOffset,
                         24 * CFG.screenSize,8 * CFG.screenSize )
    canvas.ctx.drawImage(image,
                         leftOffset, (16 * CFG.screenSize) + meterOffset + battleLocationOffset,
                         24 * CFG.screenSize,8 * CFG.screenSize);
    canvas.ctx.fillStyle = barColor;
    canvas.ctx.fillRect(leftOffset + (4 * CFG.screenSize),(16 * CFG.screenSize) + meterOffset + battleLocationOffset + (2 * CFG.screenSize),meterLength * CFG.screenSize,3 * CFG.screenSize );
  }

  setCombo = (canvas, combo, comboImg) => {
    let tileMod = (8 * CFG.screenSize);
    let leftOffset = this.dgmnData.isEnemy ? 3 * tileMod : 19 * tileMod;
    let battleLocationOffset = ( this.dgmnData.battleLocation * 4 ) * tileMod;
    let char = combo;
    canvas.ctx.clearRect( leftOffset, (4 * tileMod) + battleLocationOffset , tileMod, tileMod);
    if(combo !== 'F'){
      canvas.ctx.drawImage(comboImg,
        fontData[char][0] * 64,fontData[char][1] * 64,
        64,64,
        leftOffset, (4 * tileMod) + battleLocationOffset , tileMod, tileMod);
    }
  }

  setWeakened = (canvas, levelImg) => {
    let tileMod = (8 * CFG.screenSize);
    let leftOffset = this.dgmnData.isEnemy ? 0 * tileMod : 16 * tileMod;
    let battleLocationOffset = ( this.dgmnData.battleLocation * 4 ) * tileMod;

    canvas.paintImage(levelImg, leftOffset, (5 * tileMod) + battleLocationOffset);
  }

  setStatusConditions = (canvas, conditionImages) => {
    
  }

  cleanAll = canvas => {
    // Clean out everything
    console.log("CLEAN AFTER KO");
  }
}

export default DgmnBattleStatus;