import GameCanvas from "../../canvas";
import SubMenu from "../../menu/sub-menu";
import DgmnUtility from "../utility/dgmn.util";
import TextArea from "../../text-area";
import CFG from "../../../config";

class LevelUpMenu extends SubMenu{
  constructor(...args){
    super(...args);

    this.menuCanvas = new GameCanvas('level-up',160,144);

    this.dgmnUtility = new DgmnUtility();

    this.dgmnCanvas;
    this.levelUpTxt = new TextArea(2,5,6,1);

    this.statTxtAreas = {
      HP:  {original: new TextArea(13,3,3,1,this.menuUtility.dimLeadingZeros),
            plus: new TextArea(17,3,2,1,this.menuUtility.dimLeadingZeros) },
      ATK: {original: new TextArea(13,4,3,1,this.menuUtility.dimLeadingZeros),
            plus: new TextArea(17,4,2,1,this.menuUtility.dimLeadingZeros) },
      DEF: {original: new TextArea(13,5,3,1,this.menuUtility.dimLeadingZeros),
            plus: new TextArea(17,5,2,1,this.menuUtility.dimLeadingZeros) },
      INT: {original: new TextArea(13,6,3,1,this.menuUtility.dimLeadingZeros),
            plus: new TextArea(17,6,2,1,this.menuUtility.dimLeadingZeros) },
      RES: {original: new TextArea(13,7,3,1,this.menuUtility.dimLeadingZeros),
            plus: new TextArea(17,7,2,1,this.menuUtility.dimLeadingZeros) },
      HIT: {original: new TextArea(13,8,3,1,this.menuUtility.dimLeadingZeros),
            plus: new TextArea(17,8,2,1,this.menuUtility.dimLeadingZeros) },
      AVO: {original: new TextArea(13,9,3,1,this.menuUtility.dimLeadingZeros),
            plus: new TextArea(17,9,2,1,this.menuUtility.dimLeadingZeros) },
      SPD: {original: new TextArea(13,10,3,1,this.menuUtility.dimLeadingZeros),
            plus: new TextArea(17,10,2,1,this.menuUtility.dimLeadingZeros) }
    }
  }

  buildLevelUpScreen = dgmnData => {
    // Draw Stats
    for(let stat in dgmnData.currentStats){
      let growth = this.dgmnUtility.getBaseStat(dgmnData.speciesName,stat) + this.dgmnUtility.calcFPStatBoost(dgmnData.currentFP,stat);
      this.statTxtAreas[stat].original.instantText(this.menuCanvas.ctx, this.menuUtility.prependZeros(dgmnData.currentStats[stat],3),'white');
      this.statTxtAreas[stat].plus.instantText(this.menuCanvas.ctx, this.menuUtility.prependZeros(growth,2),'green');
    }

    // Draw Level
    this.levelUpTxt.instantText(this.menuCanvas.ctx, `LV ${this.menuUtility.prependZeros(dgmnData.currentLevel+1,3)}`,'white');

    // Draw DGMN
    this.menuCanvas.paintImage(this.fetchImageCB(`${dgmnData.speciesName.toLowerCase()}Idle0`),3*CFG.tileSize,8*CFG.tileSize);
  }
}

export default LevelUpMenu;
