import GameCanvas from "../canvas";
import SubMenu from "./sub-menu";
import DgmnUtility from "../dgmn/utility/dgmn.util";
import TextArea from "../text-area";
import DgmnCanvas from "../dgmn/canvas/dgmn-canvas";
import config from "../../config";
import { debugLog } from "../../utils/log-utils";

class LevelUpMenu extends SubMenu{
  constructor(...args){
    super(...args);

    this.menuCanvas = new GameCanvas('level-up',160,144);

    this.dgmnUtility = new DgmnUtility();

    this.dgmnCanvas;
    this.levelUpTxt = new TextArea(3,5,4,1,this.baseXPTxtColorize);

    this.statTxtAreas = {
      HP:  {original: new TextArea(13,3,3,1,this.baseXPTxtColorize),
            plus: new TextArea(17,3,2,1,this.baseXPTxtColorize) },
      ATK: {original: new TextArea(13,4,3,1,this.baseXPTxtColorize),
            plus: new TextArea(17,4,2,1,this.baseXPTxtColorize) },
      DEF: {original: new TextArea(13,5,3,1,this.baseXPTxtColorize),
            plus: new TextArea(17,5,2,1,this.baseXPTxtColorize) },
      INT: {original: new TextArea(13,6,3,1,this.baseXPTxtColorize),
            plus: new TextArea(17,6,2,1,this.baseXPTxtColorize) },
      RES: {original: new TextArea(13,7,3,1,this.baseXPTxtColorize),
            plus: new TextArea(17,7,2,1,this.baseXPTxtColorize) },
      HIT: {original: new TextArea(13,8,3,1,this.baseXPTxtColorize),
            plus: new TextArea(17,8,2,1,this.baseXPTxtColorize) },
      AVO: {original: new TextArea(13,9,3,1,this.baseXPTxtColorize),
            plus: new TextArea(17,9,2,1,this.baseXPTxtColorize) },
      SPD: {original: new TextArea(13,10,3,1,this.baseXPTxtColorize),
            plus: new TextArea(17,10,2,1,this.baseXPTxtColorize) }
    }
  }

  buildLevelUpScreen = dgmnData => {
    for(let stat in dgmnData.currentStats){
      let growth = this.dgmnUtility.getBaseStat(dgmnData.speciesName,stat);
      this.statTxtAreas[stat].original.instantText(this.menuCanvas.ctx, this.menuUtility.prependZeros(dgmnData.currentStats[stat],3),'white');
      this.statTxtAreas[stat].plus.instantText(this.menuCanvas.ctx, this.menuUtility.prependZeros(growth,2),'green');
    }
  }

  // TODO - Find a way to make more Modular
  drawDgmnCanvas = (species,redrawCB) => {
    this.dgmnCanvas = new DgmnCanvas(()=>{},species,'dgmn-canvas',32,32);
    this.dgmnCanvas.x = 3*config.tileSize;
    this.dgmnCanvas.y = 8*config.tileSize;
    this.dgmnCanvas.frames = [this.fetchImgCB(`${species.toLowerCase()}Idle0`),
                              this.fetchImgCB(`${species.toLowerCase()}Idle1`)];
    this.dgmnCanvas.refreshScreen = () => this.redrawDgmn(redrawCB);
    this.dgmnCanvas.animate(100);
  }

  redrawDgmn = redrawCB => {
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(3*config.tileSize,8*config.tileSize,32*config.screenSize,32*config.screenSize);
    this.menuCanvas.paintCanvas(this.dgmnCanvas);
    
    redrawCB();
  }
}

export default LevelUpMenu;