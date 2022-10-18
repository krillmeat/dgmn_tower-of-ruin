import CFG from "../../../config";
import { debugLog } from "../../../utils/log-utils";

import Menu from "../../menu";
import IconMenu from "../../menu/icon-menu";
import AttackMenu from "../../menu/attack-menu";
import BattleMenuAH from "../battle-menu.ah";
import BattleMenuCanvas from "../canvas/battle-menu-canvas";
import TargetSelect from "./target-select";
import TextArea from "../../text-area";
import BattleCannonMenu from "./battle-cannon.menu";

/**------------------------------------------------------------------------
 * BATTLE MENU 
 * ------------------------------------------------------------------------
 * Menu that handles all of the logic during a Battle 
 * ----------------------------------------------------------------------*/
class BattleMenu extends Menu{
  constructor(...args){
    super(...args);
    this.battleAH = this.parentAH;            // Battle AH
    this.actionTxt = new TextArea(4,14,16,4); // Text at bottom of screen

    this.currDgmnIndex = 0;                   // Currently Selected DGMN
    this.currAttackAction = {};               // Temporary Action

    this.currState = 'default';               // Active State of the Menu

    this.battleMenuAH = new BattleMenuAH({
      nextIconCB: this.nextIcon,
      prevIconCB: this.prevIcon,
      getCurrMenuTypeCB: this.getCurrMenuType,
      selectIconCB: this.selectIcon,
      nextListItemCB: this.nextListItem,
      prevListItemCB: this.prevListItem,
      selectListItemCB: this.selectListItem,
      setTopMessageCB: message => { this.menuCanvas.setTopMessage(message) },
      getStateCB: this.getState,
      levelUpNextCB: this.levelUpNext
    });

    this.menuCanvas = new BattleMenuCanvas('battle-menu-canvas',160,144);
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
   * BUILD DIGIBEETLE MENU 
   * ------------------------------------------------------------------------
   * Creates the Icon Menu for when you're selecting DigiBeetle Actions 
   * ----------------------------------------------------------------------*/
  buildDigiBeetleMenu = () => {
    this.menuCanvas.setTopMessage("DGMN");

    this.addSubMenu('beetle',new IconMenu([14,16],['dgmn','cannon','run'],'beetle'));
    this.subMenus.beetle.isVisible = true;
    this.subMenus.beetle.images = this.buildIconImages( this.subMenus.beetle.iconList );
    this.subMenus.beetle.drawIcons(0);
    this.currSubMenu = 'beetle';

    this.menuCanvas.beetleNicknameTxt.instantText(this.menuCanvas.ctx,'GUNNER','white'); // TODO - Actual Nickname
    this.menuCanvas.beetleTxt.instantText(this.menuCanvas.ctx,'DigiBeetle','green'); // TODO - Beetle "Rank"
  }

  /**------------------------------------------------------------------------
   * BUILD DGMN MENU
   * ------------------------------------------------------------------------
   * Creates the Icon Menu for when you're selecting Dgmn Actions
   * ----------------------------------------------------------------------*/
  buildDgmnMenu = () => {
    this.menuCanvas.setTopMessage("Attack");
    this.setCurrentDgmn(this.currDgmnIndex);

    this.addSubMenu('dgmn',new IconMenu([14,16],['attack','defend','stats'],'dgmn'));
    this.subMenus.dgmn.isVisible = true;
    this.subMenus.dgmn.images = this.buildIconImages( this.subMenus.dgmn.iconList )
    this.subMenus.dgmn.drawIcons(0);
    this.currSubMenu = 'dgmn';
    this.drawMenu();
  }

  /**------------------------------------------------------------------------
   * NEW TURN 
   * ------------------------------------------------------------------------
   * Gets things ready for a new Turn in Battle 
   * ----------------------------------------------------------------------*/
  newTurn = () => {
    this.buildDigiBeetleMenu();
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
    this.subMenus.attack.drawMenu();
  }

  /**------------------------------------------------------------------------
   * BUILD TARGET SELECT
   * ------------------------------------------------------------------------
   * Creates the List Menu for selecting an Enemy to hit with an attack
   * ----------------------------------------------------------------------*/
  buildTargetSelect = () => {
    debugLog("++ Selecting Target...");
    let hitsAll = this.currAttackAction.targets === 'all';
    this.addSubMenu('target',new TargetSelect(hitsAll,
      index => { return this.battleAH.getDgmnDataByIndex(index,['isDead'],true).isDead },
      this.menuCanvas.ctx,[8,2],3,3,4,['one','two','three'],this.systemAH.fetchImage('cursorLeft'),null,'target'));
    this.subMenus.target.currIndex = this.getStartingTarget();
    this.subMenus.target.drawMenu(this.getStartingTarget());
  }

  /**------------------------------------------------------------------------
   * BUILD CANNON LIST 
   * ------------------------------------------------------------------------
   * Creates the List Menu for the Cannon Items 
   * ----------------------------------------------------------------------*/
  buildCannonList = () => {
    debugLog("  - Selecting Ammo...");
    this.addSubMenu('cannon',new BattleCannonMenu([4,2],5,16,1,['meat','damage'],this.systemAH.fetchImage('miniCursor'),this.systemAH.fetchImage('battleOptionSelectBaseRight'),'cannon'));
    this.subMenus.cannon.drawMenu();
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
    this.menuCanvas.ctx.clearRect(10*CFG.tileSize,2*CFG.tileSize,2*CFG.tileSize,12*CFG.tileSize);
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
      this.menuCanvas.ctx.clearRect(32*CFG.screenSize,16*CFG.screenSize,128*CFG.screenSize,96*CFG.screenSize);
    }
    this.removeSubMenu(this.currSubMenu);
    this.currSubMenu = 'target';
    this.subMenus[this.currSubMenu].isVisible = true;
    this.menuCanvas.paintCurrentCursor(this.currDgmnIndex,this.systemAH.fetchImage('cursor'));  // Redraw your current DGMN's Cursor
    this.drawMenu();
  }

  /**------------------------------------------------------------------------
   * LAUNCH CANNON LIST
   * ------------------------------------------------------------------------
   * Preps the Ammo List Menu for the DigiBeetle
   * ----------------------------------------------------------------------*/
  launchCannonList = () => {
    this.buildCannonList();
    this.currSubMenu = 'cannon';
    this.subMenus.cannon.isVisible = true;
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
    if(this.currSubMenu === 'beetle'){
      this.selectBeetleIcon(selected);
    } else{
      this.selectDgmnIcon(selected);
    }
  }

    selectBeetleIcon = selected => {
      if(selected === 'dgmn'){
        this.removeSubMenu('beetle');
        this.currDgmnIndex = this.getInitialDgmn();
        this.buildDgmnMenu();
      } else if(selected === 'cannon'){
        this.launchCannonList();
      }
    }

    selectDgmnIcon = selected => {
      if(selected === 'attack'){
        this.launchAttackList();
      } else if(selected === 'defend'){
        this.battleAH.addAction(this.currDgmnIndex,false,{isDefend: true}); // TODO - Need to switch the isEnemy to the beginning
        this.gotoNextChoice();
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
    console.log("CURRENT SUB LABEL ? ",currSubMenuLabel);
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
   * TODO - This seems pointless, I need to just get the data from the source
   *        and store the Name Only
   * ----------------------------------------------------------------------*/
  setCurrentAttack = () => {
    const attackData = this.subMenus.attack.listItems[this.subMenus.attack.currIndex];
    this.currAttackAction.attackName = attackData.attackName;
    this.currAttackAction.hits = attackData.hits;
    this.currAttackAction.targets = attackData.targets;
    this.currAttackAction.power = attackData.power;
    this.currAttackAction.type = attackData.type;
  }

  /**------------------------------------------------------------------------
   * SET CURRENT TARGETS
   * ------------------------------------------------------------------------
   * Adds Target Data to the current Attack Options
   * ----------------------------------------------------------------------*/
  setCurrentTargets = targets => {
    this.removeSubMenu(this.currSubMenu);

    debugLog("++ Action = ",this.currAttackAction);
    let tempAction = { }
        for(let key in this.currAttackAction){ tempAction[key] = this.currAttackAction[key] } // Build an identical Object, to avoid Referencing
        tempAction.attacker = this.currDgmnIndex;
        tempAction.targetIndex = targets;
    this.battleAH.addAction(this.currDgmnIndex,false,tempAction);

    this.gotoNextChoice();  // TODO - name should be switched for something like "wrap up turn"
  }

  /**------------------------------------------------------------------------
   * GO TO NEXT CHOICE
   * ------------------------------------------------------------------------
   * After one Digimon is done, should go to the next one
   * TODO - This logic should be somehow merged with the initial drawing
   * TODO - Getting too big, needs to be split out
   * ----------------------------------------------------------------------*/
  gotoNextChoice = () => {
    debugLog("  - Next Dgmn...");
    this.currDgmnIndex++;
    if(this.currDgmnIndex < 3) {
      if(this.battleAH.getDgmnDataByIndex(this.currDgmnIndex,['currentHP'],false).currentHP > 0){
        this.setCurrentDgmn(this.currDgmnIndex);
        if(this.currSubMenu !== 'dgmn'){
          this.buildDgmnMenu();
          this.currSubMenu = 'dgmn';
        } else { this.subMenus.dgmn.drawIcons(0); this.drawMenu() }
      } else{ this.gotoNextChoice() }
    } else {
      this.beginCombat();
    }
  }

  /**------------------------------------------------------------------------
   * BEGIN COMBAT
   * ------------------------------------------------------------------------
   * Trigger for Action Choices being done and starting the Combat Animations
   * ----------------------------------------------------------------------*/
  beginCombat = () => {
    debugLog("+ BEGIN COMBAT!");
    this.menuCanvas.ctx.clearRect(10*CFG.tileSize,2*CFG.tileSize,2*CFG.tileSize,12*CFG.tileSize);
    this.menuCanvas.clearTopMessage();
    this.menuCanvas.clearBottomSection();
    this.removeSubMenu(this.currSubMenu);
    this.removeSubMenu('dgmn');
    this.currSubMenu = null;
    this.battleAH.beginCombat();
  }

  onVictoryDisplay = () => {
    this.currState = 'victory';
    this.drawContinueCursor(this.systemAH.fetchImage('continueCursor'),this.drawMenu);
  }

  /**------------------------------------------------------------------------
   * END BATTLE 
   * ------------------------------------------------------------------------
   * Wraps up the Battle
   * ------------------------------------------------------------------------
   * @param {Array}   rewards List of Rewards from Battle
   * @param {Number}  baseXP  XP Gained from Battle
   * ----------------------------------------------------------------------*/
  endBattle = (rewards,baseXP) => {
    this.menuCanvas.clearBottomSection();

    this.menuCanvas.paintImage(this.systemAH.fetchImage('battleVictoryOverlay'),0,0);
    this.drawBaseXP(baseXP);
    this.drawVictoryRewards(rewards,this.onVictoryDisplay);

    this.drawMenu();
  }

  /**------------------------------------------------------------------------
   * DRAW VICTORY MESSAGE 
   * ------------------------------------------------------------------------
   * Paints the Message to show the battle is over 
   * ----------------------------------------------------------------------*/
  drawVictoryMessage = () => {
    this.actionTxt.x = 2;
    this.actionTxt.y = 15;
    this.actionTxt.timedText(this.menuCanvas.ctx,'You won!',this.drawMenu);
  }

  /**------------------------------------------------------------------------
   * DRAW VICTORY REWARDS 
   * ------------------------------------------------------------------------
   *  Draws the FP (and bonus XP) gained from a Battle on the Victory Screen
   * ----------------------------------------------------------------------*/
  drawVictoryRewards = (rewards,callback) => {
    let i = 0;
    let rewardInterval = setInterval(()=>{
      let image = rewards[i] === 'XP' ? 'xpIconSmall' : `field${rewards[i]}Icon`;
      this.menuCanvas.paintImage(this.systemAH.fetchImage(image),(2+i)*CFG.tileSize,5*CFG.tileSize);
      if(i >= rewards.length-1){
        clearInterval(rewardInterval);
        setTimeout(()=>{callback()},500)
      } 
      i++;
    },66);
  }

  /**------------------------------------------------------------------------
   * DRAW BASE XP 
   * ------------------------------------------------------------------------
   * Draws the XP gained from a Battle on the Victory Screen 
   * ----------------------------------------------------------------------*/
  drawBaseXP = xpTotal => {
    let baseXPTxt = new TextArea(6,11,3,1,(char,wholeString,index) => { return this.baseXPTxtColorize(char,wholeString,index) });
        baseXPTxt.instantText(this.menuCanvas.ctx,this.menuUtility.prependZeros(xpTotal,3),'white');
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

  // TEXT AREA COLORIZERS

  // TODO - This isn't working, figure it out
  /**------------------------------------------------------------------------
   * BASE XP COLORIZE 
   * ------------------------------------------------------------------------
   * TODO - This needs to go away, but it's used all over the place... 
   * ----------------------------------------------------------------------*/
  baseXPTxtColorize = (char,wholeString,index) => {
    let color = 'none';
    if(index === 0 && char === 0){
      color = 'darkGreen'
    } else if(index === 1 && char === 0 && wholeString[0] === 0){ color = 'darkGreen' }
    return color;
  }

  /**------------------------------------------------------------------------
   * GET INITIAL DGMN 
   * ------------------------------------------------------------------------
   * When starting a new Turn, gets the first non-KO'd DGMN in your party 
   * ----------------------------------------------------------------------*/
  getInitialDgmn = () => {
    for(let i = 0; i < 3; i++){
      let dgmnHP = this.battleAH.getDgmnDataByIndex(i,['currentHP',false]).currentHP;
      if(dgmnHP > 0) return i;
    }

    return -1; // This should never happen, you have lost at this point
  }

  /**------------------------------------------------------------------------
   * GET STATE                                                     [EXPORTED]
   * ------------------------------------------------------------------------
   * Gets the current state of the Menu 
   * ----------------------------------------------------------------------*/
  getState = () => { return this.currState }
}

export default BattleMenu;
