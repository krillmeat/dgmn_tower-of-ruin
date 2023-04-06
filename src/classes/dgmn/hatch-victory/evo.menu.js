// INCLUDES BOTH EVOLUTION AND HATCHING

import IconMenu from "../../menu/icon-menu";
import MenuCanvas from "../../menu/menu-canvas";
import TextArea from "../../text-area";
import DgmnUtility from "../utility/dgmn.util";
import { debugLog } from "../../../utils/log-utils";
import CFG from "../../../config";

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

    this.evoNameTxt = new TextArea(4,14,12,1);
    this.evoAttributeTxt = new TextArea(4,15,7,1);
    this.evoWeakTxt = new TextArea(4,16,4,1);
    this.evoResTxt = new TextArea(12,16,3,1);
    this.evoReqsTxt = [
      new TextArea(2,10,3,1,this.menuUtility.dimLeadingZeros),
      new TextArea(7,10,3,1,this.menuUtility.dimLeadingZeros) ];
    this.hatchStatTxtAreas = {
      HP:  new TextArea(16,2,3,1,this.menuUtility.dimLeadingZeros),
      ATK: new TextArea(16,3,3,1,this.menuUtility.dimLeadingZeros),
      DEF: new TextArea(16,4,3,1,this.menuUtility.dimLeadingZeros),
      INT: new TextArea(16,5,3,1,this.menuUtility.dimLeadingZeros),
      RES: new TextArea(16,6,3,1,this.menuUtility.dimLeadingZeros),
      HIT: new TextArea(16,7,3,1,this.menuUtility.dimLeadingZeros),
      AVO: new TextArea(16,8,3,1,this.menuUtility.dimLeadingZeros),
      SPD: new TextArea(16,9,3,1,this.menuUtility.dimLeadingZeros) }
    this.evoStatTxtAreas = {
      HP:  new TextArea(17,2,3,1,this.menuUtility.dimLeadingZeros),
      ATK: new TextArea(17,3,3,1,this.menuUtility.dimLeadingZeros),
      DEF: new TextArea(17,4,3,1,this.menuUtility.dimLeadingZeros),
      INT: new TextArea(17,5,3,1,this.menuUtility.dimLeadingZeros),
      RES: new TextArea(17,6,3,1,this.menuUtility.dimLeadingZeros),
      HIT: new TextArea(17,7,3,1,this.menuUtility.dimLeadingZeros),
      AVO: new TextArea(17,8,3,1,this.menuUtility.dimLeadingZeros),
      SPD: new TextArea(17,9,3,1,this.menuUtility.dimLeadingZeros) }

    this.dgmnUtility = new DgmnUtility();
  }

  /**------------------------------------------------------------------------
   * BUILD HATCHING SCREEN
   * ------------------------------------------------------------------------
   * Set up for the Hatching Screen
   * ------------------------------------------------------------------------
   * @param {Object} dgmnData All the necessary info for a DGMN
   * -------------------------------------------*/ /* istanbul ignore next */
  buildHatchingScreen = (dgmnData) => {
    debugLog("Hatching DGMN...");
    this.dgmnData = dgmnData;
    this.choices = this.dgmnUtility.getEggHatches(dgmnData.eggField);
      debugLog("  - Hatch Options : ",this.choices);
    this.selectedDgmn = this.choices[0];
    
    this.drawHatchScreen();
  }

  buildEvoScreen = (dgmnData) => {
    debugLog("Evolving DGMN...");
    this.dgmnData = dgmnData;
    this.choices = this.dgmnUtility.getEvolutions(dgmnData.speciesName);
      debugLog("  - Evo Options : ",this.choices);
    this.selectedDgmn = this.choices[0];

    this.drawEvoScreen();
  }

  /**------------------------------------------------------------------------
   * DRAW HATCH SCREEN
   * ------------------------------------------------------------------------
   * Handles drawing all of the necessary info on the canvas when hatching
   * -------------------------------------------*/ /* istanbul ignore next */
  drawHatchScreen = () => {
    this.drawDgmnCanvas(this.choices[this.currChoice],[5,4]);
    this.drawEvoRequirements('hatch',this.choices[this.currChoice]);
    this.drawHatchStats(this.dgmnUtility.buildInitialStats(this.choices[this.currChoice]));
    this.drawEvoChoiceIcons();
    this.drawDgmnInfo(this.choices[this.currChoice]);
    
    this.redrawParentCB();
  }

  
  /**------------------------------------------------------------------------
   * DRAW EVO SCREEN
   * ------------------------------------------------------------------------
   * Handles drawing all of the necessary info on the canvas when evolving
   * -------------------------------------------*/ /* istanbul ignore next */
   drawEvoScreen = () => {
    this.drawDgmnCanvas(this.dgmnData.speciesName,[1,4]);
    this.drawDgmnCanvas(this.choices[this.currChoice],[8,4]);
    this.drawEvoRequirements('evo',this.choices[this.currChoice]);
    this.drawEvoStats(this.dgmnUtility.getAllBaseStats(this.choices[this.currChoice]));
    this.drawEvoChoiceIcons();
    this.drawDgmnInfo(this.choices[this.currChoice]);
    
    this.redrawParentCB();
  }

  /**------------------------------------------------------------------------
   * DRAW DGMN CANVAS
   * ------------------------------------------------------------------------
   * Draws the DGMN Sprite onto the Canvas
   * TODO - Maybe consider making this animate again in the future
   * -------------------------------------------*/ /* istanbul ignore next */
  drawDgmnCanvas = (species,coord) => {
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(coord[0]*CFG.tileSize,coord[1]*CFG.tileSize,4*CFG.tileSize,4*CFG.tileSize);
    this.menuCanvas.paintImage(this.fetchImageCB(`${species.toLowerCase()}Idle0`),
      coord[0]*CFG.tileSize,coord[1]*CFG.tileSize);
  }

  /**------------------------------------------------------------------------
   * DRAW EVO REQUIREMENTS
   * ------------------------------------------------------------------------
   * Draws all of the FP Requirements for a DGMN Species
   * ------------------------------------------------------------------------
   * @param {String} species  Name of the DGMN Species
   * -------------------------------------------*/ /* istanbul ignore next */
  drawEvoRequirements = (origin,species) => {
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(1*CFG.tileSize,10*CFG.tileSize,11*CFG.tileSize,2*CFG.tileSize);
    let fpReqs = origin === 'hatch' ? this.dgmnUtility.getHatchFP(species) : this.dgmnUtility.getEvoFP(species);
    let i = 0;
    for(let req in fpReqs){
      let color = this.dgmnData.currentFP[req] >= fpReqs[req] ? 'white' : 'darkGreen';
      let img = this.fetchImageCB(`field${req}Icon`);
      this.menuCanvas.paintImage(img,(1+(i * 5))*CFG.tileSize,10*CFG.tileSize);
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
    let iconsOffset = [1*CFG.tileSize,13*CFG.tileSize];

    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(iconsOffset[0],iconsOffset[1],11*CFG.tileSize,7*CFG.screenSize);

    for(let i = 0; i < this.choices.length; i++){
      let img;
      let available = this.type === 'hatch' ? 
        this.dgmnUtility.canHatchInto(dgmnFP,this.choices[i]) : 
        this.dgmnUtility.canEvolveInto(dgmnFP,this.choices[i]);
      if( available ){
        possibleHatches.push(this.choices[i]);
        img = this.fetchImageCB('evoIconPositive');
      } else{ img = this.fetchImageCB('evoIconNegative') }
      this.menuCanvas.paintImage(img,iconsOffset[0]+(i*CFG.tileSize),iconsOffset[1]);
    }

    let currAvailable = this.type === 'hatch' ? 
      this.dgmnUtility.canHatchInto(dgmnFP,this.choices[this.currChoice]) : 
      this.dgmnUtility.canEvolveInto(dgmnFP,this.choices[this.currChoice]);
    this.menuCanvas.ctx.fillStyle = currAvailable ? "#C4CFA1" : "#1D5A4A";
    this.menuCanvas.ctx.fillRect(iconsOffset[0]+(this.currChoice*CFG.tileSize)+3,iconsOffset[1]+3,5*CFG.screenSize,4*CFG.screenSize);
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
    this.menuCanvas.ctx.fillRect(16*CFG.tileSize,2*CFG.tileSize,3*CFG.tileSize,8*CFG.tileSize);
    for(let stat in stats){
      this.hatchStatTxtAreas[stat].instantText(this.menuCanvas.ctx, this.menuUtility.prependZeros(stats[stat],3),'white');
    }
  }
  
  /**------------------------------------------------------------------------
   * DRAW EVO STATS
   * ------------------------------------------------------------------------
   * Draws the Growth Stats of a DGMN
   * ------------------------------------------------------------------------
   * @param {Array} stats  List of DGMN Stats
   * -------------------------------------------*/ /* istanbul ignore next */
   drawEvoStats = stats => {
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(17*CFG.tileSize,2*CFG.tileSize,2*CFG.tileSize,8*CFG.tileSize);
    for(let stat in stats){
      this.evoStatTxtAreas[stat].instantText(this.menuCanvas.ctx, this.menuUtility.prependZeros(stats[stat],2),'white');
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
    // this.menuCanvas.clearBottomSection(); TODO - This colors OVER the parent's bottom section (used for continue cursor)
    this.menuCanvas.drawDgmnPortrait(this.fetchImageCB(`${species.toLowerCase()}Portrait`));

    this.evoNameTxt.instantText(this.menuCanvas.ctx, `${species}.MON`,'white');
    this.evoAttributeTxt.instantText(this.menuCanvas.ctx,this.dgmnUtility.getAttribute(species),'green');
    this.evoWeakTxt.instantText(this.menuCanvas.ctx,'WEAK','green');
    this.evoResTxt.instantText(this.menuCanvas.ctx,'RES','green');

    // FIELDS
    let i = 0;
    for(let field in this.dgmnUtility.getBaseFP(species)){
      this.menuCanvas.paintImage(this.fetchImageCB(`field${field}Icon`),
        ((5+this.dgmnUtility.getAttribute(species).length)+(i*1))*CFG.tileSize,15*CFG.tileSize);
      i++;
    }

    // WEAK / RESIST
    let typeAffinities = this.dgmnUtility.getTypeAffinities(species);
    let w = 0; let r = 0; // Tracks how many W/R there are, so they move over
    for(let type in typeAffinities){
      if(typeAffinities[type] < 1){
        this.menuCanvas.paintImage(this.fetchImageCB(`${type}TypeIcon`),
          (8+r)*CFG.tileSize,16*CFG.tileSize ); r++;
      } else if(typeAffinities[type] > 1){ this.menuCanvas.paintImage(this.fetchImageCB(`${type}TypeIcon`),
          (15+w)*CFG.tileSize,16*CFG.tileSize ); w++; }
    }
  }

  /**------------------------------------------------------------------------
   * CAN HATCH + EVOLVE
   * ------------------------------------------------------------------------
   * Check to see if the current DGMN Selection is able to Hatch/Evolve
   * ----------------------------------------------------------------------*/
  canHatch = () => { return this.dgmnUtility.canHatchInto(this.dgmnData.currentFP,this.choices[this.currChoice]) }
  canEvolve = () => { return this.dgmnUtility.canEvolveInto(this.dgmnData.currentFP,this.choices[this.currChoice]) }

  nextChoice = () => {
    if(this.currChoice < this.choices.length - 1){
      this.currChoice++;
      this.selectedDgmn = this.choices[this.currChoice];
      this.type === 'hatch' ? this.drawHatchScreen() : this.drawEvoScreen();
    }
  }
  prevChoice = () => {
    if(this.currChoice > 0){
      this.currChoice--;
      this.selectedDgmn = this.choices[this.currChoice];
      this.type === 'hatch' ? this.drawHatchScreen() : this.drawEvoScreen();
    }
  }
}

export default EvoMenu;
