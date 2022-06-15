import Menu from "../menu";
import MenuCanvas from "./menu-canvas";
import TextArea from "../text-area";
import RewardsMenu from "./rewards-menu";
import config from "../../config";
import HatchingEggMenu from "./hatching-egg-menu";
import HatchMenuAH from "../dungeon/hatch-menu.ah";

class HatchingMenu extends Menu{
  constructor(...args){
    super(...args);
    this.currState = '';

    this.hatchMenuAH = new HatchMenuAH({
      getStateCB: () => { return this.getState() },
      nextHatchCB: () => this.nextIcon(),
      prevHatchCB: () => this.prevIcon()
    })

    this.hatchingIndex = 0;

    this.actionTxt = new TextArea(2,14,16,4); // Text Area at the Bottom of the Screen
    this.menuCanvas = new MenuCanvas('hatching',160,144);
  }

  /**------------------------------------------------------------------------
   * GO TO REWARDS
   * ------------------------------------------------------------------------
   * Sets up the Giving Rewards Screen
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
   gotoRewards = (rewards) => {
    this.currState = 'loading';
    this.menuCanvas.paintImage(this.systemAH.fetchImage('battleVictoryRewardsOverlay'),0,0);
    this.actionTxt.timedText(this.menuCanvas.ctx,'Choose DGMN Egg to get Rewards!',this.drawMenu);

    this.addSubMenu('rewards', new RewardsMenu('rewards'));
    this.subMenus.rewards.isVisible = true;
    this.subMenus.rewards.isActive = true;
    this.subMenus.rewards.fetchImageCB = img => { return this.systemAH.fetchImage(img) }
    this.subMenus.rewards.redrawParentCB = () => { this.drawMenu() }

    this.drawEggs();

    this.subMenus.rewards.drawRewardsList(rewards);
    setTimeout(()=>{ this.currState = 'rewards' },1500);
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

    this.parentAH.drawDungeon();
  }

  drawEggs = () => {
    this.menuCanvas.paintImage(this.systemAH.fetchImage('eggDR'),2*config.tileSize,8*config.tileSize);
    this.menuCanvas.paintImage(this.systemAH.fetchImage('eggJT'),8*config.tileSize,8*config.tileSize);
    this.menuCanvas.paintImage(this.systemAH.fetchImage('eggME'),14*config.tileSize,8*config.tileSize);
  }

  updateRewardsList = (rewards,callback) => {
    callback();
  }

  gotoHatchEggs = eggData => {
    // TODO - Animate hatch and everything
    this.removeSubMenu('rewards');
    this.currState = 'loading';
    
    this.menuCanvas.paintImage(this.systemAH.fetchImage('hatchingEggOverlay'),0,0);
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(0,14*config.tileSize,20*config.tileSize,4*config.tileSize)

    this.addSubMenu('hatchEgg',new HatchingEggMenu([1,13],[],'hatching-egg'))
    this.subMenus.hatchEgg.isVisible = true;
    this.subMenus.hatchEgg.isActive = true;
    this.subMenus.hatchEgg.fetchImgCB = img => { return this.systemAH.fetchImage(img) }
    this.subMenus.hatchEgg.redrawParentCB = () => { this.drawMenu() }
    this.subMenus.hatchEgg.buildHatchingScreen(eggData,this.parentAH.drawDungeon);

    setTimeout(()=>{
      this.drawContinueCursor(this.systemAH.fetchImage('continueCursor'),this.drawMenu);
      this.currState = 'hatch-choice';
    },1000);

    this.drawMenu();
  }

  nextIcon = () => {
    this.subMenus.hatchEgg.nextHatch();
  }

  prevIcon = () => {
    this.subMenus.hatchEgg.prevHatch();
  }

  getState = () => { return this.currState }

}

export default HatchingMenu;