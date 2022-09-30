// INCLUDES BOTH EVOLUTION AND HATCHING

import IconMenu from "../../menu/icon-menu";
import MenuCanvas from "../../menu/menu-canvas";
import TextArea from "../../text-area";
import DgmnUtility from "../utility/dgmn.util";
import { debugLog } from "../../../utils/log-utils";
import config from "../../../config";

class EvoMenu extends IconMenu{
  constructor(type,...args){
    super(...args);

    this.type = type; // Which kind of action [evo|hatch]
    this.currChoice = 0;
    this.dgmnData;
    this.choices = [];
    this.selectedDgmn;

    this.menuCanvas = new MenuCanvas(`${this.label}-menu`,160,144);
    this.menuCanvas.x = 0;
    this.menuCanvas.y = 0;

    this.evoNameTxt = new TextArea(4,14,12,1,this.baseXPTxtColorize);
    this.evoAttributeTxt = new TextArea(4,15,7,1,this.baseXPTxtColorize);
    this.evoWeakTxt = new TextArea(4,16,4,1,this.baseXPTxtColorize);
    this.evoResTxt = new TextArea(12,16,3,1,this.baseXPTxtColorize);
    this.evoReqsTxt = [
      new TextArea(2,10,3,1,this.baseXPTxtColorize),
      new TextArea(7,10,3,1,this.baseXPTxtColorize) ];
    this.hatchStatTxtAreas = {
      HP:  new TextArea(16,2,3,1,this.baseXPTxtColorize),
      ATK: new TextArea(16,3,3,1,this.baseXPTxtColorize),
      DEF: new TextArea(16,4,3,1,this.baseXPTxtColorize),
      INT: new TextArea(16,5,3,1,this.baseXPTxtColorize),
      RES: new TextArea(16,6,3,1,this.baseXPTxtColorize),
      HIT: new TextArea(16,7,3,1,this.baseXPTxtColorize),
      AVO: new TextArea(16,8,3,1,this.baseXPTxtColorize),
      SPD: new TextArea(16,9,3,1,this.baseXPTxtColorize) }

    this.dgmnUtility = new DgmnUtility();
  }

  /**------------------------------------------------------------------------
   * BUILD HATCHING SCREEN
   * ------------------------------------------------------------------------
   * Set up for the Hatching Screen
   * -------------------------------------------*/ /* istanbul ignore next */
  buildHatchingScreen = (dgmnData,drawCB) => {
    debugLog("Hatching DGMN...");
    this.dgmnData = dgmnData;
    this.choices = this.dgmnUtility.getEggHatches(dgmnData.eggField);
    this.selectedDgmn = this.choices[0];
    // this.redrawCB = redrawCB;

    debugLog("  - Hatch Options : ",this.choices);

    this.drawHatchScreen();
    this.redrawParentCB();
  }

  buildEvoScreen = (dgmnData,drawCB) => {

  }

  /**------------------------------------------------------------------------
   * DRAW HATCH SCREEN
   * ------------------------------------------------------------------------
   * Handles drawing all of the necessary info on the canvas when hatching
   * -------------------------------------------*/ /* istanbul ignore next */
  drawHatchScreen = () => {
    this.drawDgmnCanvas(this.choices[this.currChoice],[5,4]);
    this.drawEvoRequirements(this.choices[this.currChoice]);
    this.drawHatchStats(this.dgmnUtility.buildInitialStats(this.choices[this.currChoice]));
    this.drawEvoChoiceIcons();
    this.drawDgmnInfo(this.choices[this.currChoice]);
  }

  /**------------------------------------------------------------------------
   * DRAW DGMN CANVAS
   * ------------------------------------------------------------------------
   * Draws the DGMN Sprite onto the Canvas
   * TODO - Maybe consider making this animate again in the future
   * -------------------------------------------*/ /* istanbul ignore next */
  drawDgmnCanvas = (species,coord) => {
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(coord[0]*config.tileSize,coord[1]*config.tileSize,4*config.tileSize,4*config.tileSize);
    this.menuCanvas.paintImage(this.fetchImageCB(`${species.toLowerCase()}Idle0`),
      coord[0]*config.tileSize,coord[1]*config.tileSize);
  }

  /**------------------------------------------------------------------------
   * DRAW EVO REQUIREMENTS
   * ------------------------------------------------------------------------
   * Draws all of the FP Requirements for a DGMN Species
   * ------------------------------------------------------------------------
   * @param {String} species  Name of the DGMN Species
   * -------------------------------------------*/ /* istanbul ignore next */
  drawEvoRequirements = species => {
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(1*config.tileSize,11*config.tileSize,10*config.tileSize,1*config.tileSize);
    let fpReqs = this.dgmnUtility.getHatchFP(species);
    let i = 0;
    for(let req in fpReqs){
      let color = this.dgmnData.currentFP[req] >= fpReqs[req] ? 'white' : 'darkGreen';
      let img = this.fetchImageCB(`field${req}Icon`);
      this.menuCanvas.paintImage(img,(1+(i * 5))*config.tileSize,10*config.tileSize);
      this.evoReqsTxt[i].instantText(this.menuCanvas.ctx,this.menuUtility.prependZeros(fpReqs[req],3),color);
      i++;
    }
  }
  
  /**------------------------------------------------------------------------
   * DRAW EVO CHOICE ICONS
   * ------------------------------------------------------------------------
   * Draws the icons that show the different Evo/Hatch choices
   * TODO - Should I be writing methods that use passed-in params or
   *        attributes
   * -------------------------------------------*/ /* istanbul ignore next */
   drawEvoChoiceIcons = () => {
    let dgmnFP = this.dgmnData.currentFP;
    let possibleHatches = [];
    let iconsOffset = [1*config.tileSize,13*config.tileSize];

    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(iconsOffset[0],iconsOffset[1],11*config.tileSize,7*config.screenSize);

    for(let i = 0; i < this.choices.length; i++){
      let img;
      if( this.dgmnUtility.canHatchInto(dgmnFP,this.choices[i]) ){
        possibleHatches.push(this.choices[i]);
        img = this.fetchImageCB('evoIconPositive');
      } else{ img = this.fetchImageCB('evoIconNegative') }
      this.menuCanvas.paintImage(img,iconsOffset[0]+(i*config.tileSize),iconsOffset[1]);
    }

    this.menuCanvas.ctx.fillStyle = this.dgmnUtility.canHatchInto(dgmnFP,this.choices[this.currChoice]) ? "#C4CFA1" : "#1D5A4A";
    this.menuCanvas.ctx.fillRect(iconsOffset[0]+(this.currChoice*config.tileSize)+3,iconsOffset[1]+3,5*config.screenSize,4*config.screenSize);
  }

  /**------------------------------------------------------------------------
   * DRAW HATCH STATS
   * ------------------------------------------------------------------------
   * Draws the stats of the freshly-hatched DGMN
   * ------------------------------------------------------------------------
   * @param {Array} stats  List of DGMN Egg Stats
   * -------------------------------------------*/ /* istanbul ignore next */
  drawHatchStats = stats => {
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(16*config.tileSize,3*config.tileSize,3*config.tileSize,8*config.tileSize);
    for(let stat in stats){
      this.hatchStatTxtAreas[stat].instantText(this.menuCanvas.ctx, this.menuUtility.prependZeros(stats[stat],3),'white');
    }
  }

  /**------------------------------------------------------------------------
   * DRAW DGMN INFORMATION
   * ------------------------------------------------------------------------
   * Draws the Bottom Section with the DGMN's information
   * ------------------------------------------------------------------------
   * @param {String} species  Name of the DGMN Species
   * -------------------------------------------*/ /* istanbul ignore next */
  drawDgmnInfo = species => {
    this.menuCanvas.clearBottomSection();
    this.menuCanvas.drawDgmnPortrait(this.fetchImageCB(`${species.toLowerCase()}Portrait`));

    this.evoNameTxt.instantText(this.menuCanvas.ctx, `${species}.MON`,'white');
    this.evoAttributeTxt.instantText(this.menuCanvas.ctx,this.dgmnUtility.getAttribute(species),'green');
    this.evoWeakTxt.instantText(this.menuCanvas.ctx,'WEAK','green');
    this.evoResTxt.instantText(this.menuCanvas.ctx,'RES','green');

    for(let field in this.dgmnUtility.getBaseFP(species)){
      this.menuCanvas.paintImage(this.fetchImageCB(`field${field}Icon`),(5+this.dgmnUtility.getAttribute(species).length)*config.tileSize,15*config.tileSize);
    }
  }

  nextChoice = () => {}
  prevChoice = () => {}
  selectChoice = () => {}
}

export default EvoMenu;
