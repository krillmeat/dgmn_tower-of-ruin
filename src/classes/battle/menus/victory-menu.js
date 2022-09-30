import config from "../../../config";
import { debugLog } from "../../../utils/log-utils";

import DgmnUtility from "../../dgmn/utility/dgmn.util";
import Menu from "../../menu";
import MenuUtility from "../../menu/menu.util";
import MenuCanvas from "../../menu/menu-canvas";
import TextArea from "../../text-area";
import VictoryMenuAH from "./victory-menu.ah";
import RewardsMenu from "../../menu/rewards-menu";
import LevelUpMenu from "../../menu/levelup-menu";
import EvolutionMenu from "../../menu/evolution-menu";
import BossVictoryMenu from "../../menu/boss-victory-menu";
import ListMenu from "../../menu/list-menu";
import AttackUtility from "../../dgmn/utility/attack.util";
import MapUtility from "../../dungeon/utility/map.util";

/**------------------------------------------------------------------------
 * VICTORY MENU
 * ------------------------------------------------------------------------
 * After the Battle is Complete, launch this Menu instead of Battle Menu
 * to handle things like Rewards, Level Up, and Evolution
 * ----------------------------------------------------------------------*/
class VictoryMenu extends Menu{
  constructor(isBoss,battleXP,battleRewards,...args){
    super(...args);
    this.currState = '';                      // Current "State" of the Menu | TODO - Look into this
    this.topTxt = new TextArea(0,0,20,1);     // Text Area at the Top of the Screen
    this.actionTxt = new TextArea(4,14,16,4); // Text Area at the Bottom of the Screen

    this.battleRewards = battleRewards;       // Rewards earned from the launching Battle
    this.battleXP = battleXP;                 // Base XP gained from the launching Battle

    this.currRewardIndex = 0;
    this.levelUpIndex = 0;
    this.bossRewardIndex = 0;
    this.levelUpDgmn = [];
    this.isBoss = isBoss;                     // True if the Victory Comes from a Boss Battle
    this.bossRewardsDgmn = [];                // Only used when there are no Level Ups

    this.victoryMenuAH = new VictoryMenuAH({
      getCurrStateCB: this.getCurrState,
      getCurrMenuTypeCB: this.getCurrMenuType,
      nextEvolutionCB: this.nextEvolution,
      prevEvolutionCB: this.prevEvolution,
      navDownCB: this.navDown,
      navUpCB: this.navUp,
      selectBossRewardCB: this.selectBossReward
    });

    this.menuUtility = new MenuUtility();
    this.dgmnUtility = new DgmnUtility();
    this.attackUtility = new AttackUtility(); // Used to get the Display Name for the learned Attack
    this.mapUtility = new MapUtility();       // Used to check the Level of Attack to Learn

    this.menuCanvas = new MenuCanvas('victory',160,144); 
    this.descriptionTxt = new TextArea(4,14,16,4);
  }

  /**------------------------------------------------------------------------
   * GO TO REWARDS
   * ------------------------------------------------------------------------
   * Sets up the Giving Rewards Screen
   * TODO - This is getting WAY too long
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  gotoRewards = (rewards) => {
    this.currState = 'loading';

    // TODO - Any reason this is here and not in the RewardsMenu?
    this.menuCanvas.paintImage(this.systemAH.fetchImage('battleVictoryRewardsOverlay'),0,0);
    this.actionTxt.timedText(this.menuCanvas.ctx,'Choose DGMN to get Rewards!',this.drawMenu);

    this.addSubMenu('rewards', new RewardsMenu('rewards'));
    this.subMenus.rewards.isVisible = true;
    this.subMenus.rewards.isActive = true;
    this.attachImageCallbacks('rewards');

    this.subMenus.rewards.drawRewardsList(rewards);
    setTimeout(()=>{ this.currState = 'rewards' },1500);
    this.drawMenu();
  }

  /**------------------------------------------------------------------------
   * GO TO LEVEL UP
   * ------------------------------------------------------------------------
   * Sets up a DGMN's Level Up Screen
   * TODO - Getting too long
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  gotoLevelUp = () => {
    this.removeSubMenu('rewards');
    this.removeSubMenu('boss');
    this.removeSubMenu('rewardFP');
    this.currState = 'level';
    this.menuCanvas.paintImage(this.systemAH.fetchImage('battleLevelUpOverlay'),0,0);
    this.menuCanvas.clearBottomSection();

    debugLog('Leveling Up : ',this.levelUpDgmn);
    
    let dgmn = this.levelUpDgmn[this.levelUpIndex];

    this.actionTxt.timedText(this.menuCanvas.ctx,`${dgmn.nickname} Leveled Up!`,this.drawMenu);
    this.drawDgmnPortrait(this.systemAH.fetchImage(dgmn.speciesName.toLowerCase()+'Portrait'));

    this.addSubMenu('level', new LevelUpMenu('level'));
    this.subMenus.level.isVisible = true;
    this.subMenus.level.isActive = true;
    this.attachImageCallbacks('level');
    this.subMenus.level.buildLevelUpScreen(dgmn,this.parentAH.drawBattleCanvas);

    setTimeout(()=>{
      this.drawContinueCursor(this.systemAH.fetchImage('continueCursor'),this.drawMenu);
      this.currState = 'level-next';
    },1000);

    this.drawMenu();
  }

  /**------------------------------------------------------------------------
   * GO TO NEXT LEVEL UP
   * ------------------------------------------------------------------------
   * Sets the current DGMN Level up to the next one, and then reloads the
   *   Level Up Menu
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  gotoNextLevelUp = () => {
    this.levelUpIndex++;
    this.gotoLevelUp();
  }

  setLevelUpList = dgmnDataList => {
    for(let dgmn of dgmnDataList){
      this.levelUpDgmn.push(dgmn);
    }
  }

  /**------------------------------------------------------------------------
   * GO TO EVOLUTION
   * ------------------------------------------------------------------------
   * Sets up a DGMN's Evolution Screen
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  gotoEvolution = dgmnData => {
    this.continueCursor.remove();
    this.currState = 'evolution';
    this.menuCanvas.paintImage(this.systemAH.fetchImage('battleEvolutionOverlay'),0,0);
    this.menuCanvas.clearBottomSection();
    // this.menuCanvas.setTopMessage('Press A to Confirm or B to Skip')

    this.removeSubMenu('level');
    this.addSubMenu('evolution',new EvolutionMenu([1,13],[],'evolution'));
    this.subMenus.evolution.isVisible = true;
    this.subMenus.evolution.isActive = true;
    this.subMenus.evolution.fetchImgCB = img => { return this.systemAH.fetchImage(img) }
    this.subMenus.evolution.redrawParentCB = () => { this.drawMenu() }
    this.subMenus.evolution.buildEvolutionScreen(dgmnData,this.parentAH.drawBattleCanvas);

    setTimeout(()=>{
      this.drawContinueCursor(this.systemAH.fetchImage('continueCursor'),this.drawMenu);
      this.currState = 'evolution-choice';
    },1000);
  }

  /**------------------------------------------------------------------------
   * GO TO BOSS REWARDS
   * ------------------------------------------------------------------------
   * Sets up a DGMN's Rewards Screen After Beating a Boss
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  gotoBossRewards = (floorNumber,onDone) => { // TODO - onDone breaks the AH model   
    this.continueCursor?.remove();
    this.removeSubMenu('rewards');
    this.currState = 'boss-reward';
    this.menuCanvas.paintImage(this.systemAH.fetchImage('bossRewardMenu'),0,0);
    this.drawTopText('Choose an Upgrade!');
    this.addSubMenu('boss',new BossVictoryMenu(floorNumber,[1,2],3,18,2,['FP','EN','XP'],this.systemAH.fetchImage('miniCursor'),null,'bossReward'));
    
    // TODO - WAY too many direct Callbacks to not just send in an AH (which exists...)
    this.subMenus.boss.onDone = () => onDone();
    this.subMenus.boss.fetchImageCB = img => { return this.systemAH.fetchImage(img) }
    this.subMenus.boss.redrawParentCB = () => { this.drawMenu() }
    this.subMenus.boss.drawMenu();
    this.subMenus.boss.isVisible = true;
    this.subMenus.boss.isActive = true; // TODO - I'm not entirely sure I'm using this
    let dgmnList = this.levelUpDgmn.length > 0 ? this.levelUpDgmn : this.bossRewardsDgmn;
    this.drawBossRewardBottomSection(dgmnList[this.bossRewardIndex].speciesName);
    this.drawAttackLearned(dgmnList[this.bossRewardIndex].speciesName,floorNumber,dgmnList[this.bossRewardIndex].permAttacks);
    this.drawMenu();
  }

  /**------------------------------------------------------------------------
   * NEXT BOSS REWARD
   * ------------------------------------------------------------------------
   * This is ONLY used when there are no Level Ups and you need to go directly
   * to the next Boss Reward
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  nextBossReward = floorNumber => {
    this.subMenus.boss.inFPSelection = false;
    this.removeSubMenu('rewardFP');
    this.menuCanvas.paintImage(this.systemAH.fetchImage('bossRewardMenu'),0,0);
    this.bossRewardIndex++;
    this.subMenus.boss.currIndex = 0;
    let dgmnList = this.levelUpDgmn.length > 0 ? this.levelUpDgmn : this.bossRewardsDgmn;
    this.drawBossRewardBottomSection(dgmnList[this.bossRewardIndex].speciesName);
    this.drawAttackLearned(dgmnList[this.bossRewardIndex].speciesName,floorNumber,dgmnList[this.bossRewardIndex].permAttacks);
    this.subMenus.boss.drawMenu();
    this.drawMenu();
  }

  drawBossRewardBottomSection = speciesName => {
    this.menuCanvas.paintImage(this.systemAH.fetchImage(speciesName.toLowerCase()+'Portrait'),0,14*config.tileSize);
    this.drawUpgradeDescription();
    this.drawMenu();
  }

  drawUpgradeDescription = () => {
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(4*config.tileSize,14*config.tileSize,16*config.tileSize,4*config.tileSize);
    let messages = ['Increase 1 FP','Gain 1 XP on each Level Up','Raise your Max   EN by 5'];
    this.descriptionTxt.instantText(this.menuCanvas.ctx,messages[this.subMenus.boss.currIndex],'white');
    this.drawMenu();
  }

  /**------------------------------------------------------------------------
   * LAUNCH BOSS REWARD FP SELECTION
   * ------------------------------------------------------------------------
   * Launches the Popup for FP Selection when choosing FP Boost after defeating
   *   a Boss Battle
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
   launchBossRewardFPSelection = () => {
    this.subMenus.boss.inFPSelection = true;
    this.addSubMenu('rewardFP',new ListMenu([7,3],8,10,1,['DR','NS','DS','JT','NA','ME','WG','VB'],this.systemAH.fetchImage('miniCursor'),null,'rewardFP'));
    this.subMenus.rewardFP.cursorOffset = 2;
    this.subMenus.rewardFP.isVisible = true;
    this.subMenus.rewardFP.isActive = true;
    this.subMenus.rewardFP.drawMenu();
    this.drawMenu();
  }

  /**------------------------------------------------------------------------
   * DRAW ATTACK LEARNED
   * ------------------------------------------------------------------------
   * When a DGMN learns an Attack after winning a Battle, draw the message
   * TODO - This doesn't check against the Attack learned at the correct Stage
   *        only the Attack of the Current DGMN (I need to store each learned
   *        Attack during a run so I can grab THAT instead of the current one)
   * ------------------------------------------------------------------------
   * @param {String}        speciesName Name of the DGMN
   * @param {Number}        floorNumber Current Floor of the Boss Battle
   * @param {Array:String}  permAttacks List of Attacks already known
   * ----------------------------------------------------------------------*/
  drawAttackLearned = (speciesName,floorNumber,permAttacks = []) => {
    let stage = this.dgmnUtility.getStage(speciesName);
    if(stage > 2 && stage === this.mapUtility.getBossAttackLevel(floorNumber)){ // Check if Reward CAN be given, based on Stage and Floor
      let attackName = this.attackUtility.getDisplayName(this.dgmnUtility.getAttack(speciesName));
      if(permAttacks.indexOf(attackName) === -1) this.subMenus.boss.learnedAttackTxt.instantText(this.menuCanvas.ctx,`ATK+ ${attackName}`,'white');
    }
  }
  
  /**------------------------------------------------------------------------
   * NEXT EVOLUTION
   * ------------------------------------------------------------------------
   * Moves to the Next Evolution
   * TODO - Write this
   * ----------------------------------------------------------------------*/
     nextEvolution = () => {
      console.log("NEXT ICON");
    }
  
    /**------------------------------------------------------------------------
     * PREVIOUS EVOLUTION
     * ------------------------------------------------------------------------
     * Moves to the Previous Evolution
     * TODO - Write this
     * ----------------------------------------------------------------------*/
    prevEvolution = () => {
      console.log("PREV ICON");
    }

  /**------------------------------------------------------------------------
   * SELECT EVOLUTION
   * ------------------------------------------------------------------------
   * Chooses the current Evolution
   * TODO - Write this
   * ----------------------------------------------------------------------*/
  selectIcon = () => {
    this.subMenus.evolution.chooseEvolution(this.levelUpDgmn[this.levelUpIndex]);
  }

  /**------------------------------------------------------------------------
   * DRAW MENU
   * ------------------------------------------------------------------------
   * Draws all of the currently Visible Menus' Canvases
   * ----------------------------------------------------------------------*/
   drawMenu = () => {
    for(let key in this.subMenus){
      if(this.subMenus[key].isVisible){
        if(this.subMenus.boss?.inFPSelection){
          this.menuCanvas.paintImage(this.systemAH.fetchImage('bossRewardFieldChoice'),0,0);
        }

        this.menuCanvas.paintCanvas(this.subMenus[key].menuCanvas);
      } 
    }

    this.parentAH.drawBattleCanvas(); // TODO - this has to switch to a generic-named class
  }

  /**------------------------------------------------------------------------
   * DRAW DGMN PORTRAIT
   * ------------------------------------------------------------------------
   * Draws the Portrait of the Dgmn in the Bottom Section
   * ------------------------------------------------------------------------
   * @param {Image} portraitImg Portrait Image Elem for the Dgmn
   * ----------------------------------------------------------------------*/
   drawDgmnPortrait = portraitImg => {
    this.menuCanvas.ctx.drawImage(portraitImg,0,0,256,248,
                                  0, 112 * config.screenSize,32*config.screenSize,(32-1)*config.screenSize);
  }

  drawTopText = message => { 
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(0,0,20*config.tileSize,7*config.screenSize); 
    this.topTxt.instantText(this.menuCanvas.ctx,message,'white');
  }

  /**------------------------------------------------------------------------
   * UPDATE REWARDS LIST                                      [[PASSTHROUGH]]
   * ------------------------------------------------------------------------
   * Instigates the Rewards Menu's update
   * ----------------------------------------------------------------------*/
  updateRewardsList = (rewards,onDone) => { this.subMenus.rewards.updateRewardsList(rewards,onDone) }

  navUp = () => {
    if(this.currState === 'boss-reward'){
      if(this.subMenus.boss.inFPSelection){
        this.subMenus.rewardFP.prevListItem();
      } else{
        this.subMenus.boss.moveUp();
        this.drawUpgradeDescription();
      }
    }
    this.drawMenu();
  }

  navRight = () => {

  }

  navDown = () => {
    if(this.currState === 'boss-reward'){
      if(this.subMenus.boss.inFPSelection){
        this.subMenus.rewardFP.nextListItem();
      } else{
        this.subMenus.boss.moveDown();
        this.drawUpgradeDescription();
      }
    }
    this.drawMenu();
  }

  navLeft = () => {

  }

  selectBossReward = () => {
    // TODO - Send on to Level Up
  }

  /**------------------------------------------------------------------------
   * ------------------------------------------------------------------------
   * GETTERS AND SETTERS                                        [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * ------------------------------------------------------------------------
   * All of the following methods are passed into the AH, to allow other
   * Classes to use them
   * ------------------------------------------------------------------------
   * ----------------------------------------------------------------------*/
  getCurrState = () => { return this.currState }
  getCurrMenuType = () => { return 'icon' }
}

export default VictoryMenu;
