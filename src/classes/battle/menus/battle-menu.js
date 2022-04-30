import config from "../../../config";
import { debugLog } from "../../../utils/log-utils";
import Menu from "../../menu";
import IconMenu from "../../menu/icon-menu";
import AttackMenu from "../../menu/attack-menu";
import BattleMenuAH from "../battle-menu.ah";
import BattleMenuCanvas from "../canvas/battle-menu-canvas";
import TargetSelect from "./target-select";
import TextArea from "../../text-area";

class BattleMenu extends Menu{
  constructor(...args){
    super(...args);
    this.battleAH = this.parentAH;
    this.menuCanvas = new BattleMenuCanvas('battle-menu-canvas',160,144);
    this.actionTxt = new TextArea(4,14,16,4);

    this.currDgmnIndex = 0;
    this.currAttackAction = {};

    this.battleMenuAH = new BattleMenuAH({
      nextIconCB: this.nextIcon,
      prevIconCB: this.prevIcon,
      getCurrMenuTypeCB: this.getCurrMenuType,
      selectIconCB: this.selectIcon,
      nextListItemCB: this.nextListItem,
      prevListItemCB: this.prevListItem,
      selectListItemCB: this.selectListItem,
      setTopMessageCB: message => { this.menuCanvas.setTopMessage(message) }
    });
  }

  /**------------------------------------------------------------------------
   * INITIALIZER
   * ------------------------------------------------------------------------
   * Sets up the Battle Menu
   * ----------------------------------------------------------------------*/
  init = () => {
    debugLog("+ Battle Menu");
    this.newTurn();
  }

  /**------------------------------------------------------------------------
   * BUILD DGMN MENU
   * ------------------------------------------------------------------------
   * Creates the Icon Menu for when you're selecting Dgmn Actions
   * ----------------------------------------------------------------------*/
  buildDgmnMenu = () => {
    this.addSubMenu('dgmn',new IconMenu([14,16],['attack','defend','stats'],'dgmn'));
    this.subMenus.dgmn.isVisible = true;
    this.subMenus.dgmn.images = this.buildIconImages( this.subMenus.dgmn.iconList )
    this.subMenus.dgmn.drawIcons(0);
  }

  newTurn = () => {
    this.menuCanvas.setTopMessage("Attack");

    this.currDgmnIndex = 0;
    this.setCurrentDgmn(this.currDgmnIndex);
    this.buildDgmnMenu();
    this.currSubMenu = 'dgmn';

    this.drawMenu();
  }

  /**------------------------------------------------------------------------
   * BUILD ATTACK MENU
   * ------------------------------------------------------------------------
   * Creates the List Menu of all of the Dgmn's Attacks
   * ----------------------------------------------------------------------*/
  buildAttackMenu = () => {
    let currDgmnAttackData = this.battleAH.getDgmnAttackData(this.currDgmnIndex,['displayName','currCost','maxCost','type','power','hits','targets']);
    debugLog("++ Build Attack List | Data = ",currDgmnAttackData);
    this.addSubMenu('attack',new AttackMenu(this.systemAH.fetchImage,[4,2],6,16,2,currDgmnAttackData,this.systemAH.fetchImage('miniCursor'),this.systemAH.fetchImage('battleOptionSelectBaseRight'),'attack'));
    this.subMenus.attack.drawList();
  }

  /**------------------------------------------------------------------------
   * BUILD TARGET SELECT
   * ------------------------------------------------------------------------
   * Creates the List Menu for selecting an Enemy to hit with an attack
   * ----------------------------------------------------------------------*/
  buildTargetSelect = () => {
    debugLog("++ Selecting Target...");
    let hitsAll = this.currAttackAction.targets === 'all';
    this.addSubMenu('target',new TargetSelect(hitsAll,this.menuCanvas.ctx,[8,2],3,3,4,['one','two','three'],this.systemAH.fetchImage('cursorLeft'),null,'target'));
    this.subMenus.target.currIndex = this.getStartingTarget();
    this.subMenus.target.drawMenu(this.getStartingTarget());
  }

  /**------------------------------------------------------------------------
   * GET STARTING TARGET
   * ------------------------------------------------------------------------
   * Checks to see if DGMN 0 or 1 are already dead to start at the correct
   *   spot on launch of Target Select
   * TODO - Your Party
   * ----------------------------------------------------------------------*/
  getStartingTarget = () => {
    let start = 0;
    
    if(this.battleAH.getDgmnDataByIndex(0,['isDead'],true).isDead){ 
      if(this.battleAH.getDgmnDataByIndex(1,['isDead'],true).isDead){ start = 2 
      } else{ start = 1 }
    }

    return start;
  }

  /**------------------------------------------------------------------------
   * SET CURRENT DGMN
   * ------------------------------------------------------------------------
   * Sets the Current Dgmn (shown at the bottom)
   * ------------------------------------------------------------------------
   * @param {Number}  battleIndex Spot of the Dgmn [0-3]
   * ----------------------------------------------------------------------*/
  setCurrentDgmn = battleIndex => {
    this.menuCanvas.ctx.clearRect(10*config.tileSize,2*config.tileSize,2*config.tileSize,12*config.tileSize);
    this.menuCanvas.paintCurrentCursor(battleIndex,this.systemAH.fetchImage('cursor'));
    let dgmnData = this.battleAH.getDgmnDataByIndex(this.currDgmnIndex,['speciesName','nickname','currentHP','currentEN','currentLevel']);
        dgmnData.portrait = this.systemAH.fetchImage(`${dgmnData.speciesName.toLowerCase()}Portrait`)
    this.menuCanvas.drawBottomSection(dgmnData);
    this.drawMenu();
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

  drawActionText = (species,message) => {
    this.menuCanvas.clearBottomSection();
    this.menuCanvas.drawDgmnPortrait(this.systemAH.fetchImage(species.toLowerCase()+'Portrait'));
    this.actionTxt.timedText(this.menuCanvas.ctx,message,this.drawMenu);
  }

  /**------------------------------------------------------------------------
   * LAUNCH TARGET SELECT
   * ------------------------------------------------------------------------
   * Launches the Target Selection
   * TODO - Add Team-facing selection also
   * ----------------------------------------------------------------------*/
  launchTargetSelect = () => {
    this.buildTargetSelect();
    if(this.currSubMenu === 'attack'){
      this.menuCanvas.ctx.clearRect(32*config.screenSize,16*config.screenSize,128*config.screenSize,96*config.screenSize);
    }
    this.removeSubMenu(this.currSubMenu);
    this.currSubMenu = 'target';
    this.subMenus[this.currSubMenu].isVisible = true;
    this.menuCanvas.paintCurrentCursor(this.currDgmnIndex,this.systemAH.fetchImage('cursor'));  // Redraw your current DGMN's Cursor
    this.drawMenu();
  }

  /**------------------------------------------------------------------------
   * GET CURRENT MENU TYPE
   * ------------------------------------------------------------------------
   * @returns  current type of Menu that is Active - [icon|list]
   * ----------------------------------------------------------------------*/
  getCurrMenuType = () => {
    if(this.currSubMenu === null) return null;
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
   * NEXT LIST ITEM
   * ------------------------------------------------------------------------
   * Moves to the next List Item
   * ----------------------------------------------------------------------*/
  nextListItem = () => {
    this.subMenus[this.currSubMenu].nextListItem();
    this.drawMenu();
  }

  /**------------------------------------------------------------------------
   * PREV LIST ITEM
   * ------------------------------------------------------------------------
   * Moves to the previous List Item
   * ----------------------------------------------------------------------*/
  prevListItem = () => {
    this.subMenus[this.currSubMenu].prevListItem();
    this.drawMenu();
  }

  /**------------------------------------------------------------------------
   * SELECT LIST ITEM
   * ------------------------------------------------------------------------
   * Takes action on the current List Item
   * TODO - I have too much logic in here for specific spots
   * ----------------------------------------------------------------------*/
  selectListItem = () => {
    let currSubMenuLabel = this.subMenus[this.currSubMenu].label;
    if(currSubMenuLabel === 'attack'){
      this.setCurrentAttack();
      this.launchTargetSelect();
    } else if(currSubMenuLabel === 'target'){
      let targets = this.subMenus.target.hitsAll ? [0,1,2] : [this.subMenus.target.currIndex];
      this.subMenus.target.clearAllCursors(true);
      this.setCurrentTargets(targets);
      this.drawMenu();
    }
  }

  /**------------------------------------------------------------------------
   * SET CURRENT ATTACK
   * ------------------------------------------------------------------------
   * Adds Data to the current Attack Options
   * TODO - Probably should just call these things in other methods
   * ----------------------------------------------------------------------*/
  setCurrentAttack = () => {
    const attackData = this.subMenus.attack.listItems[this.subMenus.attack.currIndex];
    this.currAttackAction.attackName = attackData.attackName;
    this.currAttackAction.attacker = this.currDgmnIndex;
    this.currAttackAction.targets = attackData.targets;
    this.currAttackAction.power = attackData.power;
    this.currAttackAction.isEnemy = false;
  }

  /**------------------------------------------------------------------------
   * SET CURRENT TARGETS
   * ------------------------------------------------------------------------
   * Adds Target Data to the current Attack Options
   * ----------------------------------------------------------------------*/
  setCurrentTargets = targets => {
    this.currAttackAction.targetIndex = targets;
    this.removeSubMenu(this.currSubMenu);
    debugLog("++ Action = ",this.currAttackAction);
    this.battleAH.addAction(this.currDgmnIndex,this.currAttackAction.attackName,this.currAttackAction.targetIndex,this.currAttackAction.power,this.currAttackAction.isEnemy);
    this.gotoNextChoice();  // TODO - should be switched for something like "wrap up turn"
  }

  /**------------------------------------------------------------------------
   * GO TO NEXT CHOICE
   * ------------------------------------------------------------------------
   * After one Digimon is done, should go to the next one
   * TODO - This logic should be somehow merged with the initial drawing
   * TODO - Getting too big, needs to be split out
   * ----------------------------------------------------------------------*/
  gotoNextChoice = () => {
    debugLog("+ Next Dgmn...");
    this.currDgmnIndex++;
    if(this.currDgmnIndex < 3) {
      this.setCurrentDgmn(this.currDgmnIndex);
      this.buildDgmnMenu();
      this.currSubMenu = 'dgmn';
    } else {
      this.beginCombat();
    }
  }

  beginCombat = () => {
    debugLog("+ BEGIN COMBAT!");
    this.menuCanvas.ctx.clearRect(10*config.tileSize,2*config.tileSize,2*config.tileSize,12*config.tileSize);
    this.menuCanvas.clearTopMessage();
    this.menuCanvas.clearBottomSection();
    this.removeSubMenu(this.currSubMenu);
    this.removeSubMenu('dgmn');
    this.currSubMenu = null;
    this.battleAH.beginCombat();
  }

  endBattle = () => {
    this.menuCanvas.clearBottomSection();
    // TODO - This needs to actually launch into the Victory stuff
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
