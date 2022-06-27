import config from "../../config";
import GameCanvas from "../canvas";
import SubMenu from "./sub-menu";

class RewardsMenu extends SubMenu{
  constructor(...args){
    super(...args);

    this.fetchImageCB;
    this.redrawParentCB;
    this.currIndex = 0;

    this.menuCanvas = new GameCanvas('rewards-menu',160,144);
  }

    /**------------------------------------------------------------------------
   * DRAW REWARDS LIST
   * ------------------------------------------------------------------------
   * Draws all of the Reward Icons in a Queue
   * ------------------------------------------------------------------------
   * @param {Array:String}  rewards List of Rewards [DR|NS|XP|etc.]
   * @param {Number}        index   Spot in the Reward List to draw from
   * ----------------------------------------------------------------------*/
     drawRewardsList = (rewards) => {
      this.menuCanvas.paintImage(this.fetchImageCB(`field${rewards[this.currIndex]}Icon`),1*config.tileSize,2*config.tileSize);
      for(let i = this.currIndex+1; i < rewards.length; i++){
        let img = rewards[i] === 'XP' ? 'xpIconSmall' : `field${rewards[i]}Icon`;
        this.menuCanvas.paintImage(this.fetchImageCB(img),(2 + (i-this.currIndex))*config.tileSize,2*config.tileSize);
      }
    }

  /**------------------------------------------------------------------------
   * UPDATE REWARDS LIST
   * ------------------------------------------------------------------------
   * After selecting a reward, sets up the list to be ready for the next one
   * ------------------------------------------------------------------------
   * @param {Array:String}  rewards   List of Rewards [DR|NS|XP|etc.]
   * @param {Function}      onDoneCB  Callback to run after complete
   * ----------------------------------------------------------------------*/
    updateRewardsList = (rewards,onDoneCB) => {
      let backImg = this.fetchImageCB('battleVictoryRewardsOverlay')
      this.currIndex++;
  
      if(this.currIndex >= rewards.length){
        this.menuCanvas.paintImage(backImg,0,0);
        this.redrawParentCB()
        onDoneCB();
      } else{
        // Have to redraw the Back IMG to delete the previous FP
        this.menuCanvas.paintImage(backImg,0,0);
        this.drawRewardsList(rewards);
        this.redrawParentCB()
      }
    }
}

export default RewardsMenu;