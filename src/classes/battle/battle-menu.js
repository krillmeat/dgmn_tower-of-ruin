import config from "../../config";
import { debugLog } from "../../utils/log-utils";
import IconMenu from "../menu/icon-menu";
import BattleMenuCanvas from "./canvas/battle-menu-canvas";

class BattleMenu extends IconMenu{
  constructor(...args){
    super(...args);
    this.battleAH = this.parentAH;
    this.menuCanvas = new BattleMenuCanvas('battle-menu-canvas',160,144);

    this.buttonCoordinates = [14,16]

    this.menuChart = {
      level: 'dgmn',
      index: 0,
      root: ['digiBeetle','dgmn'],
      digiBeetle: [],
      dgmn: ['attack','defend','stats'] // TODO - Add Back
    }

    this.currTargetChoice = 0;
  }

  init = () => {
    debugLog("++ Initializing Battle Menu...");
    // TODO - Right now, all of this sets up to be a start on the Dgmn Menu, when it should be the DigiBeetle
    this.menuState = "dgmn";
    this.menuCanvas.setTopMessage("Attack");
    let dgmnData = this.battleAH.getDgmnDataByIndex(0,['speciesName','nickname','currentHP','currentEN','currentLevel']);
        dgmnData.portrait = this.systemAH.fetchImage(`${dgmnData.speciesName.toLowerCase()}Portrait`)
    this.menuCanvas.drawBottomSection(dgmnData);
    this.setCurrentButton("attack","dgmn");
    this.setCurrentDigimon(0);
  }

  /**------------------------------------------------------------------------
   * SET CURRENT ATTACK TARGET
   * ------------------------------------------------------------------------
   * Puts the cursor on the correct Dgmn
   * ------------------------------------------------------------------------
   * @param {String}  targets Whether to target all or one [single|all]
   * @param {String}  dir     Which direction to move in [next|prev]
   * ----------------------------------------------------------------------*/
  setCurrentAttackTarget = (targets,dir) => {
    this.clearTargetCursors();
    let spot = dir ? this.validateTarget(dir) : this.currTargetChoice;
    if(targets === 'single'){
      this.menuCanvas.paintImage(this.systemAH.fetchImage('cursorLeft'),
                                 64*config.screenSize, ((spot * 32) + 24)*config.screenSize);
      this.currTargetChoice = spot;
    } else{
      for(let i = 0; i < 3; i++){
        this.menuCanvas.paintImage(this.systemAH.fetchImage('cursorLeft'),
                                 64*config.screenSize, ((i * 32) + 24)*config.screenSize);
      }
    }
    this.battleAH.drawBattleCanvas();
  }

  validateTarget = dir => {
    let newTargetChoice = this.currTargetChoice;
    
    if(dir === 'next' && this.currTargetChoice < 2){
      newTargetChoice++;
    } else if(dir === 'prev' && this.currTargetChoice > 0){
      newTargetChoice--;
    }

    return newTargetChoice;
  }

  clearTargetCursors = () => {
    this.menuCanvas.ctx.clearRect(56*config.screenSize,16*config.screenSize,
                                  24*config.screenSize,96 * config.screenSize);
  }

  setCurrentButton = (selected) => {
    this.menuChart.index = this.menuChart[this.menuChart.level].indexOf(selected);
    let images = this.getMenuIconImages(this.menuChart.level);
    this.menuCanvas.drawMenuButtons(selected,images,this.buttonCoordinates);
    this.menuCanvas.setTopMessage(selected.charAt(0).toUpperCase()+selected.slice(1));
    this.battleAH.drawBattleCanvas();
  }

  setCurrentDigimon = battleIndex => {
    this.menuCanvas.paintCurrentCursor(battleIndex,this.systemAH.fetchImage('cursor'));
  }

  
}

export default BattleMenu;