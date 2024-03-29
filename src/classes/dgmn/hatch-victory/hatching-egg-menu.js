import { debugLog } from "../../../utils/log-utils";
import DgmnUtility from "../utility/dgmn.util";
import IconMenu from "../../menu/icon-menu";
import TextArea from "../../text-area";
import GameCanvas from "../../canvas";
import DgmnCanvas from "../canvas/dgmn-canvas";

import CFG from "../../../config";

// TODO - So much is shared between this and Evolution Menu, it feels like I should make a new Class for the shared elements
class HatchingEggMenu extends IconMenu{
  constructor(...args){
    super(...args);

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
    console.log("DRAWING DGMN INFO?");
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(0*CFG.tileSize,14*CFG.tileSize,20*CFG.tileSize,4*CFG.tileSize);

    this.drawEvoPortrait(this.fetchImageCB(`${species.toLowerCase()}Portrait`))
    this.evoNameTxt.instantText(this.menuCanvas.ctx,`${species}.MON`,'white')
    this.evoAttributeTxt.instantText(this.menuCanvas.ctx,this.dgmnUtility.getAttribute(species),'green')
    this.evoWeakTxt.instantText(this.menuCanvas.ctx,'WEAK','green');
    this.evoResTxt.instantText(this.menuCanvas.ctx,'RES','green');

    for(let field in this.dgmnUtility.getBaseFP(species)){
      this.menuCanvas.paintImage(this.fetchImageCB(`field${field}Icon`),(5+this.dgmnUtility.getAttribute(species).length)*CFG.tileSize,15*CFG.tileSize);
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
      0, 112 * CFG.screenSize,32*CFG.screenSize,(32-1)*CFG.screenSize);
  }
  
  drawDgmnStats = stats => {
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(16*CFG.tileSize,3*CFG.tileSize,3*CFG.tileSize,8*CFG.tileSize);
    for(let stat in stats){
      this.statTxtAreas[stat].instantText(this.menuCanvas.ctx, this.menuUtility.prependZeros(stats[stat],3),'white');
    }
  }

  drawHatchRequirements = species => {
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(1*CFG.tileSize,11*CFG.tileSize,10*CFG.tileSize,1*CFG.tileSize);
    let fpReqs = this.dgmnUtility.getHatchFP(species);
    let i = 0;
    for(let req in fpReqs){
      let color = this.eggData.currentFP[req] >= fpReqs[req] ? 'white' : 'darkGreen';
      let img = this.fetchImageCB(`field${req}Icon`);
      this.menuCanvas.paintImage(img,(1+(i * 5))*CFG.tileSize,11*CFG.tileSize);
      this.hatchReqsTxt[i].instantText(this.menuCanvas.ctx,this.menuUtility.prependZeros(fpReqs[req],3),color);
      i++;
    }
  }

  drawDgmnCanvas = (species,redrawCB) => {
    let coord = [4,5];
    this.hatchCanvas = new DgmnCanvas(()=>{this.redrawDgmn(this.hatchCanvas,coord,redrawCB)},species,'dgmn-canvas',32,32);
    this.hatchCanvas.x = coord[0]*CFG.tileSize;
    this.hatchCanvas.y = coord[1]*CFG.tileSize;
    this.hatchCanvas.frames = [this.fetchImageCB(`${species.toLowerCase()}Idle0`),
                              this.fetchImageCB(`${species.toLowerCase()}Idle1`)];
    // this.hatchCanvas.refreshScreen = () => this.redrawDgmn(this.hatchCanvas,coord,redrawCB);
    this.hatchCanvas.animate(500);
  }

  redrawDgmn = (canvas,coord,redrawCB) => {
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(coord[0]*CFG.tileSize,coord[1]*CFG.tileSize,32*CFG.screenSize,32*CFG.screenSize);
    this.menuCanvas.paintCanvas(canvas);
    
    redrawCB();
  }

  drawIcons = (dgmnFP,hatchList,selected) => {
    let possibleHatches = [];

    let iconsOffset = [1*CFG.tileSize,13*CFG.tileSize];

    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(iconsOffset[0],iconsOffset[1],11*CFG.tileSize,7*CFG.screenSize);

    for(let i = 0; i < hatchList.length; i++){
      let img;
      if( this.dgmnUtility.canHatchInto(dgmnFP,hatchList[i]) ){
        possibleHatches.push(hatchList[i]);
        img = this.fetchImageCB('evoIconPositive');
      } else{ img = this.fetchImageCB('evoIconNegative') }
      this.menuCanvas.paintImage(img,iconsOffset[0]+(i*CFG.tileSize),iconsOffset[1]);
    }

    this.menuCanvas.ctx.fillStyle = this.dgmnUtility.canHatchInto(dgmnFP,hatchList[selected]) ? "#C4CFA1" : "#1D5A4A";
    this.menuCanvas.ctx.fillRect(iconsOffset[0]+(selected*CFG.tileSize)+3,iconsOffset[1]+3,5*CFG.screenSize,4*CFG.screenSize);
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