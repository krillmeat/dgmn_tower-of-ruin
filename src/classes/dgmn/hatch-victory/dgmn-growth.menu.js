import Menu from "../../menu";
import RewardsMenu from "../../menu/rewards-menu";
import TextArea from "../../text-area";
import DgmnGrowthMenuAH from "./dgmn-growth-menu.ah";
import config from "../../../config";
import DgmnUtility from "../utility/dgmn.util";
import HatchingEggMenu from "./hatching-egg-menu";
import { debugLog } from "../../../utils/log-utils";
import EvoMenu from "./evo.menu";

class DgmnGrowthMenu extends Menu{
  constructor(origin,dgmnAH,...args){
    super(...args);

    this.origin = origin; // Where the Menu is launched from [hatch|victory]
    this.hatchingIndex = 0;

    // Text Areas
    this.topTxt = new TextArea(0,0,20,1);
    this.subTopTxt = new TextArea(0,1,20,1);
    this.actionTxt = new TextArea(2,15,16,2);

    this.dgmnUtility = new DgmnUtility();

    this.dgmnAH = dgmnAH;
    this.dgmnGrowthMenuAH = new DgmnGrowthMenuAH({
      getStateCB: this.getState,
      giveCurrRewardCB: this.giveCurrReward
    });
  }

  /**------------------------------------------------------------------------
   * GO TO REWARDS
   * ------------------------------------------------------------------------
   * Sets up the Giving Rewards Screen
   * -------------------------------------------*/ /* istanbul ignore next */
   gotoRewards = rewards => {
    this.currState = 'loading';

    // Prep Screen
    this.drawBackground('battleVictoryRewardsOverlay');
    this.topTxt.instantText(this.menuCanvas.ctx,'Use D Pad to choose','white');
    this.actionTxt.timedText(this.menuCanvas.ctx,
      this.origin === 'hatch' ? 'Choose DGMN Egg to get Rewards!' : 'Choose DGMN to get Rewards!',
      this.drawMenu);

    // Add Reward SubMenu
    this.addSubMenu('rewards', new RewardsMenu('rewards'));
    this.subMenus.rewards.isVisible = true;
    this.attachImageCallbacks('rewards');

    // Draw Elements
    this.origin === 'hatch' ? this.drawEggs() : this.drawDgmn(); // Draw Eggs or DGMN, depending on Origin
    this.subMenus.rewards.drawRewardsList(rewards); // TODO - Can this be in the constructor?

    this.drawMenu();
    setTimeout(()=>{ this.currState = 'rewards' },500); // Wait before allowing Input
  }

  /**------------------------------------------------------------------------
   * GO TO HATCH
   * ------------------------------------------------------------------------
   * Sets up the Hatching Screen
   * -------------------------------------------*/ /* istanbul ignore next */
  gotoHatch = dgmnData => {
    this.currState = 'loading';

    // Prep Screen
    this.drawBackground('hatchingEggOverlay');
    this.topTxt.instantText(this.menuCanvas.ctx,'Choose DGMN to hatch','white');

    // Add Hatch SubMenu
    this.addSubMenu('hatch', new EvoMenu('hatch',[1,13],[],'hatching'));
    this.subMenus.hatch.isVisible = true;
    this.attachImageCallbacks('hatch');
    this.subMenus.hatch.buildHatchingScreen(dgmnData,this.parentAH.drawDungeon);

    this.drawMenu();
    setTimeout(()=>{
      this.drawContinueCursor(this.systemAH.fetchImage('continueCursor'),this.drawMenu);
      this.currState = 'hatch-choice';
    },500);
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

    this.origin === 'hatch' ? this.parentAH.drawDungeon() : this.parentAH.drawBattle();
  }

  /**------------------------------------------------------------------------
   * DRAW EGGS
   * ------------------------------------------------------------------------
   * Draws the 3 Sprites of the Eggs onto the Screen
   * TODO - Hard coded right now, eventually need to send in the three
   *        Eggs and draw those specifically
   * ----------------------------------------------------------------------*/
  drawEggs = () => {
    this.menuCanvas.paintImage(this.systemAH.fetchImage('eggDR'),2*config.tileSize,8*config.tileSize);
    this.menuCanvas.paintImage(this.systemAH.fetchImage('eggJT'),8*config.tileSize,8*config.tileSize);
    this.menuCanvas.paintImage(this.systemAH.fetchImage('eggME'),14*config.tileSize,8*config.tileSize);
  }

  drawDgmn = () => {}

  /**------------------------------------------------------------------------
   * UPDATE REWARDS LIST
   * ------------------------------------------------------------------------
   * Handles what happens when you give a reward, and the list should be
   *   updated, OR moved onto the next Screen
   * TODO - Right now, not handling actually updating the reward list
   * ----------------------------------------------------------------------*/
  updateRewardsList = () => {
    let currDgmn = this.dgmnAH.getParty()[this.hatchingIndex];
    let currDgmnData = this.dgmnAH.getDgmnData(currDgmn,['eggField','currentFP'],false);
        currDgmnData.dgmnId = currDgmn;
    let hatchImages = this.dgmnUtility.getAllHatchImages(currDgmnData.eggField);
    this.systemAH.loadImages(hatchImages,()=>{
      this.removeSubMenu('rewards');
      this.gotoHatch(currDgmnData);
    })
  }

  /**------------------------------------------------------------------------
   * GIVE CURRENT REWARD                                           [EXPORTED]
   * ------------------------------------------------------------------------
   * Handles giving the Currently Selected Reward to the correct DGMN
   * ----------------------------------------------------------------------*/
  giveCurrReward = dir => {
    let dgmnParty = this.dgmnAH.getParty();
    let dirMap = { // TODO - Move this to a CONST or UTIL file
      left: dgmnParty[0],
      up: dgmnParty[1],
      right: dgmnParty[2]
    }
    let dgmnId = dirMap[dir];
    let reward = ['DR']; // TODO - Pull from Data

    this.dgmnAH.giveDgmnReward(dgmnId,'DR'); // TODO - Pull from curr spot
    this.updateRewardsList()
  }
}

export default DgmnGrowthMenu;
