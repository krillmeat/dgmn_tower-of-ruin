import Menu from "../../menu";
import MenuCanvas from "../../menu/menu-canvas";
import TextArea from "../../text-area";
import RewardsMenu from "../../menu/rewards-menu";
import CFG from "../../../config";
import HatchingEggMenu from "./hatching-egg-menu";
import HatchMenuAH from "../../dungeon/hatch-menu.ah";

class HatchingMenu extends Menu{
  constructor(...args){
    super(...args);
    this.currState = '';

    this.hatchingIndex = 0;

    this.topTxt = new TextArea(0,0,20,1);
    this.subTopTxt = new TextArea(0,1,20,1);
    this.actionTxt = new TextArea(2,15,16,2); // Text Area at the Bottom of the Screen
    this.menuCanvas = new MenuCanvas('hatching',160,144);

    this.hatchMenuAH = new HatchMenuAH({
      getStateCB: () => { return this.getState() },
      nextHatchCB: () => this.nextIcon(),
      prevHatchCB: () => this.prevIcon()
    })
  }

  /**------------------------------------------------------------------------
   * GO TO REWARDS
   * ------------------------------------------------------------------------
   * Sets up the Giving Rewards Screen
   * TODO - I do this exact thing on the Victory Menu, see if I can fix any overlap
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
   gotoRewards = (rewards) => {
    this.currState = 'loading';
    this.menuCanvas.paintImage(this.systemAH.fetchImage('battleVictoryRewardsOverlay'),0,0);
    this.topTxt.instantText(this.menuCanvas.ctx,'Use D Pad to choose','white');
    this.actionTxt.timedText(this.menuCanvas.ctx,'Choose DGMN Egg to get Rewards!',this.drawMenu);

    this.addSubMenu('rewards', new RewardsMenu('rewards'));
    this.subMenus.rewards.isVisible = true;
    this.subMenus.rewards.isActive = true;
    this.attachImageCallbacks('rewards')

    this.drawEggs();

    this.subMenus.rewards.drawRewardsList(rewards);
    setTimeout(()=>{ 
      this.drawContinueCursor(this.systemAH.fetchImage('continueCursor'),this.drawMenu);
      this.currState = 'rewards' 
    },1500);
    this.drawMenu();
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

    this.parentAH.drawDungeon(); // TODO - This seems kind of janky
  }

  /**------------------------------------------------------------------------
   * DRAW EGGS
   * ------------------------------------------------------------------------
   * Draws the 3 Sprites of the Eggs onto the Screen
   * TODO - Hard coded right now, eventually need to send in the three
   *        Eggs and draw those specifically
   * ----------------------------------------------------------------------*/
  drawEggs = () => {
    this.menuCanvas.paintImage(this.systemAH.fetchImage('eggDR'),2*CFG.tileSize,8*CFG.tileSize);
    this.menuCanvas.paintImage(this.systemAH.fetchImage('eggJT'),8*CFG.tileSize,8*CFG.tileSize);
    this.menuCanvas.paintImage(this.systemAH.fetchImage('eggME'),14*CFG.tileSize,8*CFG.tileSize);
  }

  /**------------------------------------------------------------------------
   * UPDATE REWARDS LIST
   * ------------------------------------------------------------------------
   * TODO - I'm not sure...
   * ----------------------------------------------------------------------*/
  updateRewardsList = (rewards,callback) => {
    callback();
  }

  /**------------------------------------------------------------------------
   * GO TO HATCH EGGS
   * ------------------------------------------------------------------------
   * Sets up the Hatching Egg Screen
   * ----------------------------------------------------------------------*/
  gotoHatchEggs = eggData => {
    this.removeSubMenu('rewards');
    this.currState = 'loading';
    
    this.menuCanvas.paintImage(this.systemAH.fetchImage('hatchingEggOverlay'),0,0);
    this.topTxt.instantText(this.menuCanvas.ctx,'Choose a DGMN!','white');
    this.menuCanvas.clearBottomSection();

    this.addSubMenu('hatchEgg',new HatchingEggMenu([1,13],[],'hatching-egg'))
    this.subMenus.hatchEgg.isVisible = true;
    this.subMenus.hatchEgg.isActive = true;
    this.attachImageCallbacks('hatchEgg');
    this.subMenus.hatchEgg.buildHatchingScreen(eggData,this.parentAH.drawDungeon);

    // TODO - This isn't working...
    setTimeout(()=>{
      this.drawContinueCursor(this.systemAH.fetchImage('continueCursor'),this.drawMenu);
      this.currState = 'hatch-choice';
    },500);

    this.drawMenu();
  }

  nextIcon = () => { this.subMenus.hatchEgg.nextHatch() }
  prevIcon = () => { this.subMenus.hatchEgg.prevHatch() }
  getState = () => { return this.currState }

}

export default HatchingMenu;
