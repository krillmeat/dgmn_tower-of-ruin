import config from "../../../config";
import { debugLog } from "../../../utils/log-utils";

import DgmnUtility from "../../dgmn/utility/dgmn.util";
import Menu from "../../menu";
import MenuUtility from "../../menu/menu.util";
import MenuCanvas from "../../menu/menu-canvas";
import TextArea from "../../text-area";
import VictoryMenuAH from "./victory-menu.ah";
import RewardsMenu from "../../menu/rewards-menu";
import SubMenu from "../../menu/sub-menu";
import LevelUpMenu from "../../menu/levelup-menu";
import EvolutionMenu from "../../menu/evolution-menu";
import BossVictoryMenu from "../../menu/boss-victory-menu";

/**------------------------------------------------------------------------
 * VICTORY MENU
 * ------------------------------------------------------------------------
 * After the Battle is Complete, launch this Menu instead of Battle Menu
 * to handle things like Rewards, Level Up, and Evolution
 * ----------------------------------------------------------------------*/
class VictoryMenu extends Menu{
  constructor(isBoss,battleXP,battleRewards,...args){
    super(...args);
    this.currState = '';
    this.topTxt = new TextArea(0,0,20,1);     // Text Area at the Top of the Screen
    this.actionTxt = new TextArea(4,14,16,4); // Text Area at the Bottom of the Screen

    this.battleRewards = battleRewards;       // Rewards earned from the launching Battle
    this.battleXP = battleXP;                 // Base XP gained from the launching Battle

    this.currRewardIndex = 0;
    this.levelUpIndex = 0;
    this.levelUpDgmn = [];
    this.isBoss = isBoss;

    this.victoryMenuAH = new VictoryMenuAH({
      getCurrStateCB: this.getCurrState,
      getCurrMenuTypeCB: this.getCurrMenuType,
      nextEvolutionCB: this.nextEvolution,
      prevEvolutionCB: this.prevEvolution
    });

    this.menuUtility = new MenuUtility();
    this.dgmnUtility = new DgmnUtility();

    this.menuCanvas = new MenuCanvas('victory',160,144); 
  }

  /**------------------------------------------------------------------------
   * GO TO REWARDS
   * ------------------------------------------------------------------------
   * Sets up the Giving Rewards Screen
   * TODO - This is getting WAY too long
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  gotoRewards = (rewards) => {
    this.currState = 'loading';
    this.menuCanvas.paintImage(this.systemAH.fetchImage('battleVictoryRewardsOverlay'),0,0);
    this.actionTxt.timedText(this.menuCanvas.ctx,'Choose DGMN to get Rewards!',this.drawMenu);

    this.addSubMenu('rewards', new RewardsMenu('rewards'));
    this.subMenus.rewards.isVisible = true;
    this.subMenus.rewards.isActive = true;
    this.subMenus.rewards.fetchImageCB = img => { return this.systemAH.fetchImage(img) }
    this.subMenus.rewards.redrawParentCB = () => { this.drawMenu() }

    this.subMenus.rewards.drawRewardsList(rewards);
    setTimeout(()=>{ this.currState = 'rewards' },1500);
    this.drawMenu();
  }

  /**------------------------------------------------------------------------
   * GO TO LEVEL UP
   * ------------------------------------------------------------------------
   * Sets up a DGMN's Level Up Screen
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  gotoLevelUp = () => {
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
    this.subMenus.level.fetchImgCB = img => { return this.systemAH.fetchImage(img) }
    this.subMenus.level.buildLevelUpScreen(dgmn,this.parentAH.drawBattleCanvas);

    setTimeout(()=>{
      this.drawContinueCursor(this.systemAH.fetchImage('continueCursor'),this.drawMenu);
      this.currState = 'level-next';
    },1000);

    this.drawMenu();
  }

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
  gotoBossRewards = floorNumber => {
    this.continueCursor.remove();
    this.removeSubMenu('evolution');
    
    this.currState = 'boss-reward';
    this.menuCanvas.paintImage(this.systemAH.fetchImage('bossRewardMenu'),0,0);
    this.drawTopText('Choose a Reward!');
    this.addSubMenu('boss',new BossVictoryMenu(floorNumber,[0,0],12,12,[],this.systemAH.fetchImage('miniCursor'),null,'bossReward'));
    this.subMenus.boss.isVisible = true;
    this.subMenus.boss.isActive = true;
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
