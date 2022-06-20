import { debugLog } from "../../utils/log-utils";
import DgmnUtility from "../dgmn/utility/dgmn.util";
import IconMenu from "./icon-menu";
import TextArea from "../text-area";
import GameCanvas from "../canvas";
import DgmnCanvas from "../dgmn/canvas/dgmn-canvas";

import config from "../../config";

// TODO - So much is shared between this and Evolution Menu, it feels like I should make a new Class for the shared elements
class HatchingEggMenu extends IconMenu{
  constructor(...args){
    super(...args);

    this.fetchImgCB;
    this.redrawParentCB;

    this.currSelection = 0;
    this.selectedDgmn = '';
    this.hatches;
    this.eggData;
    this.redrawCB;

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

    this.hatchReqsTxt = [
      new TextArea(2,11,3,1,this.baseXPTxtColorize),
      new TextArea(7,11,3,1,this.baseXPTxtColorize)
    ];

    this.evoNameTxt = new TextArea(4,14,12,1,this.baseXPTxtColorize);
    this.evoAttributeTxt = new TextArea(4,15,7,1,this.baseXPTxtColorize);
    this.evoWeakTxt = new TextArea(4,16,4,1,this.baseXPTxtColorize);
    this.evoResTxt = new TextArea(12,16,3,1,this.baseXPTxtColorize);

    this.dgmnUtility = new DgmnUtility();
  }

  
  /**------------------------------------------------------------------------
   * BUILD HATCHING SCREEN
   * ------------------------------------------------------------------------
   * Sets up the Hatching Screen
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  buildHatchingScreen = (eggData,redrawCB) => {
    debugLog("Hatching DGMN...");
    this.eggData = eggData;
    this.hatches = this.dgmnUtility.getEggHatches(eggData.eggField);
    this.selectedDgmn = this.hatches[0];
    this.redrawCB = redrawCB;

    debugLog("  - Hatch Options : ",this.hatches);

    this.drawHatchScreen();
    this.redrawParentCB();
  }

  drawHatchScreen = () => {
    this.drawDgmnCanvas(this.hatches[this.currSelection],this.redrawCB);

    this.drawDgmnStats(this.dgmnUtility.buildInitialStats(this.hatches[this.currSelection]));
    this.drawDgmnInfo(this.hatches[this.currSelection]);
    this.drawHatchRequirements(this.hatches[this.currSelection]);
    this.drawIcons(this.eggData.currentFP,this.hatches,this.currSelection);
  }

  /**------------------------------------------------------------------------
   * DRAW DGMN INFO
   * ------------------------------------------------------------------------
   * Draws the DGMN Information to the bottom Panel
   * ------------------------------------------------------------------------
   * @param {String} species  Name of the DGMN Species
   * ----------------------------------------------------------------------*/
  drawDgmnInfo = species => {
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(0*config.tileSize,14*config.tileSize,20*config.tileSize,4*config.tileSize);

    this.drawEvoPortrait(this.fetchImgCB(`${species.toLowerCase()}Portrait`))
    this.evoNameTxt.instantText(this.menuCanvas.ctx,`${species}.MON`,'white')
    this.evoAttributeTxt.instantText(this.menuCanvas.ctx,this.dgmnUtility.getAttribute(species),'green')
    this.evoWeakTxt.instantText(this.menuCanvas.ctx,'WEAK','green');
    this.evoResTxt.instantText(this.menuCanvas.ctx,'RES','green');

    for(let field in this.dgmnUtility.getBaseFP(species)){
      this.menuCanvas.paintImage(this.fetchImgCB(`field${field}Icon`),(5+this.dgmnUtility.getAttribute(species).length)*config.tileSize,15*config.tileSize);
    }
  }

  /**------------------------------------------------------------------------
   * DRAW EVO PORTRAIT
   * ------------------------------------------------------------------------
   * Draw the DGMN Portrait in the Bottom Section
   * TODO - This is used in so many places (maybe make a Canvas Utility?)
   * ------------------------------------------------------------------------
   * @param {String} portraitImage Image of the DGMN Portrait
   * ----------------------------------------------------------------------*/
  drawEvoPortrait = portraitImg => {
    this.menuCanvas.ctx.drawImage(portraitImg,0,0,256,248,
      0, 112 * config.screenSize,32*config.screenSize,(32-1)*config.screenSize);
  }
  
  drawDgmnStats = stats => {
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(16*config.tileSize,3*config.tileSize,3*config.tileSize,8*config.tileSize);
    for(let stat in stats){
      this.statTxtAreas[stat].instantText(this.menuCanvas.ctx, this.menuUtility.prependZeros(stats[stat],3),'white');
    }
  }

  drawHatchRequirements = species => {
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(1*config.tileSize,11*config.tileSize,10*config.tileSize,1*config.tileSize);
    let fpReqs = this.dgmnUtility.getHatchFP(species);
    let i = 0;
    for(let req in fpReqs){
      let color = this.eggData.currentFP[req] >= fpReqs[req] ? 'white' : 'darkGreen';
      let img = this.fetchImgCB(`field${req}Icon`);
      this.menuCanvas.paintImage(img,(1+(i * 5))*config.tileSize,11*config.tileSize);
      this.hatchReqsTxt[i].instantText(this.menuCanvas.ctx,this.menuUtility.prependZeros(fpReqs[req],3),color);
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

  drawIcons = (dgmnFP,hatchList,selected) => {
    let possibleHatches = [];

    let iconsOffset = [1*config.tileSize,13*config.tileSize];

    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(iconsOffset[0],iconsOffset[1],11*config.tileSize,7*config.screenSize);

    for(let i = 0; i < hatchList.length; i++){
      let img;
      if( this.dgmnUtility.canHatchInto(dgmnFP,hatchList[i]) ){
        possibleHatches.push(hatchList[i]);
        img = this.fetchImgCB('evoIconPositive');
      } else{ img = this.fetchImgCB('evoIconNegative') }
      this.menuCanvas.paintImage(img,iconsOffset[0]+(i*config.tileSize),iconsOffset[1]);
    }

    this.menuCanvas.ctx.fillStyle = this.dgmnUtility.canHatchInto(dgmnFP,hatchList[selected]) ? "#C4CFA1" : "#1D5A4A";
    this.menuCanvas.ctx.fillRect(iconsOffset[0]+(selected*config.tileSize)+3,iconsOffset[1]+3,5*config.screenSize,4*config.screenSize);
  }

  canHatch = () => {
    return this.dgmnUtility.canHatchInto(this.eggData.currentFP,this.hatches[this.currSelection])
  }


  nextHatch = () => {
    if(this.currSelection < this.hatches.length - 1){
      this.currSelection++;
      this.selectedDgmn = this.hatches[this.currSelection];
      this.drawIcons(this.eggData,this.hatches,this.currSelection);
      this.drawHatchScreen();
      this.redrawParentCB();
    }
  }

  prevHatch = () => {
    if(this.currSelection > 0){
      this.currSelection--;
      this.selectedDgmn = this.hatches[this.currSelection];
      this.drawIcons(this.eggData,this.hatches,this.currSelection);
      this.drawHatchScreen();
      this.redrawParentCB();
    }
  }
}

export default HatchingEggMenu;