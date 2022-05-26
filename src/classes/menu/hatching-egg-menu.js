import DgmnUtility from "../dgmn/utility/dgmn.util";
import IconMenu from "./icon-menu";
import TextArea from "../text-area";
import GameCanvas from "../canvas";
import DgmnCanvas from "../dgmn/canvas/dgmn-canvas";

import config from "../../config";

class HatchingEggMenu extends IconMenu{
  constructor(...args){
    super(...args);

    this.fetchImgCB;
    this.redrawParentCB;

    this.selectedDgmn = '';

    this.menuCanvas = new GameCanvas(`${this.label}-menu`,160,144); // TODO - Figure out the proper length
    this.menuCanvas.x = 0;
    this.menuCanvas.y = 0;

    this.hatchCanvas;
    
    this.statTxtAreas = {
      HP:  new TextArea(16,3,3,1,this.baseXPTxtColorize),
      ATK: new TextArea(16,4,3,1,this.baseXPTxtColorize),
      DEF: new TextArea(16,5,3,1,this.baseXPTxtColorize),
      INT: new TextArea(16,6,3,1,this.baseXPTxtColorize),
      RES: new TextArea(16,7,3,1,this.baseXPTxtColorize),
      HIT: new TextArea(16,8,3,1,this.baseXPTxtColorize),
      AVO: new TextArea(16,9,3,1,this.baseXPTxtColorize),
      SPD: new TextArea(16,10,3,1,this.baseXPTxtColorize)
    }

    this.evoNameTxt = new TextArea(4,14,12,1,this.baseXPTxtColorize);
    this.evoAttributeTxt = new TextArea(4,15,7,1,this.baseXPTxtColorize);
    this.evoWeakTxt = new TextArea(4,16,4,1,this.baseXPTxtColorize);
    this.evoResTxt = new TextArea(12,16,3,1,this.baseXPTxtColorize);

    this.dgmnUtility = new DgmnUtility();
  }

  
  buildHatchingScreen = (eggData,redrawCB) => {
    let hatches = this.dgmnUtility.getEggHatches(eggData.eggField);
    this.selectedDgmn = hatches[0];

    this.drawDgmnCanvas(hatches[0],redrawCB);

    this.drawDgmnStats(this.dgmnUtility.buildInitialStats(hatches[0]));
    this.drawDgmnInfo(hatches[0])

    this.redrawParentCB();
  }

  
  drawDgmnInfo = species => {
    this.drawEvoPortrait(this.fetchImgCB(`${species.toLowerCase()}Portrait`))
    this.evoNameTxt.instantText(this.menuCanvas.ctx,`${species}.MON`,'white')
    this.evoAttributeTxt.instantText(this.menuCanvas.ctx,this.dgmnUtility.getAttribute(species),'green')
    this.evoWeakTxt.instantText(this.menuCanvas.ctx,'WEAK','green');
    this.evoResTxt.instantText(this.menuCanvas.ctx,'RES','green');

    for(let field in this.dgmnUtility.getBaseFP(species)){
      this.menuCanvas.paintImage(this.fetchImgCB(`field${field}Icon`),(5+this.dgmnUtility.getAttribute(species).length)*config.tileSize,15*config.tileSize); // TODO - Set X to length of Attribute
    }
  }

  drawEvoPortrait = portraitImg => {
    this.menuCanvas.ctx.drawImage(portraitImg,0,0,256,248,
      0, 112 * config.screenSize,32*config.screenSize,(32-1)*config.screenSize);
  }
  
  drawDgmnStats = stats => {
    for(let stat in stats){
      this.statTxtAreas[stat].instantText(this.menuCanvas.ctx, this.menuUtility.prependZeros(stats[stat],3),'white');
    }
  }

  drawHatchRequirements = species => {
    let fpReqs = this.dgmnUtility.getEvoFP(species);
    let otherReqs = []; // TODO - Not doing this yet
    // LOOP THROUGH FP REQS
    let i = 0;
    for(let req in fpReqs){
      let img = this.fetchImgCB(`field${req}Icon`);
      this.menuCanvas.paintImage(img,(1+i)*config.tileSize,10*config.tileSize);
      this.evoReqsTxt[i].instantText(this.menuCanvas.ctx,this.menuUtility.prependZeros(fpReqs[req],3),'white');
      i++;
    }
  }

  drawDgmnCanvas = (species,redrawCB) => {
    let coord = [4,5];
    this.hatchCanvas = new DgmnCanvas(()=>{this.redrawDgmn(this.hatchCanvas,coord,redrawCB)},species,'dgmn-canvas',32,32);
    this.hatchCanvas.x = coord[0]*config.tileSize;
    this.hatchCanvas.y = coord[1]*config.tileSize;
    this.hatchCanvas.frames = [this.fetchImgCB(`${species.toLowerCase()}Idle0`),
                              this.fetchImgCB(`${species.toLowerCase()}Idle1`)];
    // this.hatchCanvas.refreshScreen = () => this.redrawDgmn(this.hatchCanvas,coord,redrawCB);
    this.hatchCanvas.animate(500);
  }

  redrawDgmn = (canvas,coord,redrawCB) => {
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(coord[0]*config.tileSize,coord[1]*config.tileSize,32*config.screenSize,32*config.screenSize);
    this.menuCanvas.paintCanvas(canvas);
    
    redrawCB();
  }
}

export default HatchingEggMenu;