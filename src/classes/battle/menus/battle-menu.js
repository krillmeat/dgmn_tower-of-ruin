import config from "../../../config";
import { debugLog } from "../../../utils/log-utils";
import Menu from "../../menu";
import IconMenu from "../../menu/icon-menu";
import AttackMenu from "../../menu/attack-menu";
import BattleMenuAH from "../battle-menu.ah";
import BattleMenuCanvas from "../canvas/battle-menu-canvas";

class BattleMenu extends Menu{
  constructor(...args){
    super(...args);
    this.battleAH = this.parentAH;
    this.menuCanvas = new BattleMenuCanvas('battle-menu-canvas',160,144);

    this.currTargetChoice = 0;

    this.battleMenuAH = new BattleMenuAH({
      nextIconCB: this.nextIcon,
      prevIconCB: this.prevIcon,
      getCurrMenuTypeCB: this.getCurrMenuType,
      selectIconCB: this.selectIcon
    });
  }

  init = () => {
    debugLog("+ Battle Menu");
    this.menuCanvas.setTopMessage("Attack");
    this.setCurrentDgmn(0);

    this.buildDgmnMenu();
    this.currSubMenu = 'dgmn';

    this.drawMenu();
  }

  buildDgmnMenu = () => {
    this.addSubMenu('dgmn',new IconMenu([14,16],['attack','defend','stats'],'dgmn'));
    this.subMenus.dgmn.isVisible = true;
    this.subMenus.dgmn.images = this.buildIconImages( this.subMenus.dgmn.iconList )
    this.subMenus.dgmn.drawIcons(0);
  }

  buildAttackMenu = () => {
    let currDgmnAttackData = this.battleAH.getDgmnAttackData(this.battleAH.getCurrDgmnChoice(),['displayName','currCost','maxCost','type','power','hits','targets']);
    debugLog("++ Build Attack List | Data = ",currDgmnAttackData);
    this.addSubMenu('attack',new AttackMenu(this.systemAH.fetchImage,[4,2],6,16,2,currDgmnAttackData,this.systemAH.fetchImage('miniCursor'),this.systemAH.fetchImage('battleOptionSelectBaseRight'),'attack'));
    this.subMenus.attack.drawAttackList();
  }

  setCurrentDgmn = battleIndex => {
    // NEED TO CLEAR
    this.menuCanvas.paintCurrentCursor(battleIndex,this.systemAH.fetchImage('cursor'));
    let dgmnData = this.battleAH.getDgmnDataByIndex(0,['speciesName','nickname','currentHP','currentEN','currentLevel']);
        dgmnData.portrait = this.systemAH.fetchImage(`${dgmnData.speciesName.toLowerCase()}Portrait`)
    this.menuCanvas.drawBottomSection(dgmnData);
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
    let spot = dir ? this.validateTarget(dir) : this.currTargetChoice;
    if(targets === 'single'){
      this.menuCanvas.setCurrentTargetCursor(spot,this.systemAH.fetchImage('cursorLeft'));
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

  /**------------------------------------------------------------------------
   * LAUNCH ATTACK LIST
   * ------------------------------------------------------------------------
   * Preps the Attack List Menu for the current Dgmn and launches the Menu
   * ----------------------------------------------------------------------*/
  launchAttackList = () => {
    this.buildAttackMenu();
    this.currSubMenu = 'attack';
    this.subMenus[this.currSubMenu].isVisible = true;
    this.drawMenu();
  }

  /**------------------------------------------------------------------------
   * GET CURRENT MENU TYPE
   * ------------------------------------------------------------------------
   * @returns  current type of Menu that is Active - [icon|list]
   * ----------------------------------------------------------------------*/
  getCurrMenuType = () => {
    return this.subMenus[this.currSubMenu] instanceof IconMenu ? 'icon' : 'list';
  }

  /**------------------------------------------------------------------------
   * NEXT ICON
   * ------------------------------------------------------------------------
   * Moves to the Next Icon of whichever Icon Menu is currently active
   * ----------------------------------------------------------------------*/
  nextIcon = () => {
    this.subMenus[this.currSubMenu].nextIcon();
    let message = this.subMenus[this.currSubMenu].getCurrLabel();
    this.menuCanvas.setTopMessage(message.charAt(0).toUpperCase()+message.slice(1))
    this.drawMenu();
  }

  /**------------------------------------------------------------------------
   * PREVIOUS ICON
   * ------------------------------------------------------------------------
   * Moves to the Previous Icon of whichever Icon Menu is currently active
   * ----------------------------------------------------------------------*/
  prevIcon = () => {
    this.subMenus[this.currSubMenu].prevIcon();
    let message = this.subMenus[this.currSubMenu].getCurrLabel();
    this.menuCanvas.setTopMessage(message.charAt(0).toUpperCase()+message.slice(1))
    this.drawMenu();
  }

  /**------------------------------------------------------------------------
   * SELECT ICON
   * ------------------------------------------------------------------------
   * Takes action on the current Icon
   * ----------------------------------------------------------------------*/
  selectIcon = () => {
    let selected = this.subMenus[this.currSubMenu].getCurrLabel();
    this.subMenus[this.currSubMenu].selectIcon();
    if(selected === 'attack'){
      this.launchAttackList();
    }
  }

  /**------------------------------------------------------------------------
   * DRAW MENU
   * ------------------------------------------------------------------------
   * Draws all of the currently Visible Menus' Canvases
   * ----------------------------------------------------------------------*/
  drawMenu = () => {
    for(let key in this.subMenus){
      if(this.subMenus[key].isVisible){
        this.menuCanvas.paintCanvas(this.subMenus[key].menuCanvas);
      } 
    }

    this.battleAH.drawBattleCanvas();
  }
  
}

export default BattleMenu;
