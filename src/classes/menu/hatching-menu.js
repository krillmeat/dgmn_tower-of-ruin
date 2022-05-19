import Menu from "../menu";

class HatchingMenu extends Menu{
  constructor(...args){
    super(...args);
  }

  /**------------------------------------------------------------------------
   * GO TO REWARDS
   * ------------------------------------------------------------------------
   * Sets up the Giving Rewards Screen
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
  
}

export default HatchingMenu;