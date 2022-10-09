import Menu from "../../menu";
import RewardsMenu from "../../menu/rewards-menu";
import TextArea from "../../text-area";
import DgmnGrowthMenuAH from "./dgmn-growth-menu.ah";
import config from "../../../config";
import DgmnUtility from "../utility/dgmn.util";
import HatchingEggMenu from "./hatching-egg-menu";
import { debugLog } from "../../../utils/log-utils";
import EvoMenu from "./evo.menu";
import LevelUpMenu from "../../menu/levelup-menu";

class DgmnGrowthMenu extends Menu{
  constructor(origin,dgmnAH,...args){
    super(...args);

    this.origin = origin; // Where the Menu is launched from [hatch|victory]
    this.currDgmnIndex = 0; // TODO - This shouldn't be named "hatching"
    this.rewards = [];

    // Text Areas
    this.topTxt = new TextArea(0,0,20,1);
    this.subTopTxt = new TextArea(0,1,20,1);
    this.actionTxt = new TextArea(2,15,16,2);

    this.dgmnUtility = new DgmnUtility();

    this.dgmnAH = dgmnAH;
    this.dgmnGrowthMenuAH = new DgmnGrowthMenuAH({
      getStateCB: this.getState,
      giveCurrRewardCB: this.giveCurrReward,
      nextHatchCB: this.nextHatch,
      prevHatchCB: this.prevHatch,
      selectHatchCB: this.selectHatch,
      selectEvoCB: this.selectEvo
    });
  }

  /**------------------------------------------------------------------------
   * GO TO REWARDS
   * ------------------------------------------------------------------------
   * Sets up the Giving Rewards Screen
   * -------------------------------------------*/ /* istanbul ignore next */
   gotoRewards = rewards => {
    this.currState = 'loading';
    this.rewards = rewards;

    // Prep Screen
    this.drawBackground('battleVictoryRewardsOverlay');
    if(this.origin === 'hatch') this.topTxt.instantText(this.menuCanvas.ctx,'Use D Pad to choose','white'); // TODO - Probably should exist
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
   * GO TO LEVEL UP
   * ------------------------------------------------------------------------
   * Sets up the Level Up Screen
   * -------------------------------------------*/ /* istanbul ignore next */
  gotoLevelUp = dgmnData => {
   this.currState = 'loading';

   // Prep Screen
   this.drawBackground('battleLevelUpOverlay');
    //  this.topTxt.instantTxt
    this.actionTxt.timedText(this.menuCanvas.ctx,`${dgmnData.nickname} Leveled Up!`,this.drawMenu);

    // Add Level Up SubMenu
    this.addSubMenu('level',new LevelUpMenu('level')); // TODO - Check on this Menu, make sure it's legit
    this.subMenus.level.isVisible = true;
    this.attachImageCallbacks('level');
    this.subMenus.level.buildLevelUpScreen(dgmnData,this.parentAH.drawBattleCanvas); // TODO - Shoudn't be called this

    this.drawMenu();
    setTimeout(()=>{
      this.drawContinueCursor(this.systemAH.fetchImage('continueCursor'),this.drawMenu);
      this.currState = 'level-next';
    },500);
  }

  /**------------------------------------------------------------------------
   * GO TO EVOLUTION
   * ------------------------------------------------------------------------
   * Sets up the Evolution Screen
   * -------------------------------------------*/ /* istanbul ignore next */
  gotoEvolution = (dgmnData) => {
    this.currState = 'loading';

    // Prep Screen
    this.drawBackground('battleEvolutionOverlay'); // TODO - Move this image out of Battle
    this.topTxt.instantText(this.menuCanvas.ctx,'Choose Evolution');

    // Add Evolve SubMenu
    this.addSubMenu('evolve', new EvoMenu('evolve',[1,13],[],'evolving'));
    this.subMenus.evolve.isVisible = true;
    this.attachImageCallbacks('evolve');
    this.subMenus.evolve.buildEvoScreen(dgmnData);

    this.drawMenu();
    setTimeout(()=>{
      this.drawContinueCursor(this.systemAH.fetchImage('continueCursor'),this.drawMenu);
      this.currState = 'evo-choice';
    },500);
  }

  /**------------------------------------------------------------------------
   * GO TO BOSS REWARDS
   * ------------------------------------------------------------------------
   * Sets up the Boss Rewards Screen
   * -------------------------------------------*/ /* istanbul ignore next */
  gotoBossRewards = dgmnData => {
    console.log("BOSS REWARDS SCREEN");
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

    this.origin === 'hatch' ? this.parentAH.drawDungeon() : this.parentAH.drawBattleCanvas();
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

  drawDgmn = () => {
    for(let dgmn of this.dgmnAH.getDgmnParty()){
      console.log("DGMN ? ",dgmn);
    }
    // this.menuCanvas.paintImage(this.systemAH.fetchImage('eggDR'),2*config.tileSize,8*config.tileSize);
    /*
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(coord[0]*config.tileSize,coord[1]*config.tileSize,4*config.tileSize,4*config.tileSize);
    this.menuCanvas.paintImage(this.fetchImageCB(`${species.toLowerCase()}Idle0`),
      coord[0]*config.tileSize,coord[1]*config.tileSize);
    */
  }

  /**------------------------------------------------------------------------
   * UPDATE REWARDS LIST
   * ------------------------------------------------------------------------
   * Handles what happens when you give a reward, and the list should be
   *   updated, OR moved onto the next Screen
   * ----------------------------------------------------------------------*/
  updateRewardsList = () => {
    const currDgmnData = this.getCurrDgmnData();
    const nextImages = this.origin === 'hatch' ? this.dgmnUtility.getAllHatchImages(currDgmnData.eggField) : [];

    this.subMenus.rewards.updateRewardsList(this.rewards, () => {
      if(nextImages.length === 0){
        this.removeSubMenu('rewards');
        this.gotoLevelUp(currDgmnData);
        return;
      } else{
        this.systemAH.loadImages(nextImages,()=>{
          this.removeSubMenu('rewards');
          this.gotoHatch(currDgmnData);
        })
      }
    });
  }

  /**------------------------------------------------------------------------
   * GIVE CURRENT REWARD                                           [EXPORTED]
   * ------------------------------------------------------------------------
   * Handles giving the Currently Selected Reward to the correct DGMN
   * ----------------------------------------------------------------------*/
  giveCurrReward = dir => {
    let dgmnParty = this.dgmnAH.getDgmnParty();
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

  /**------------------------------------------------------------------------
   * WRAP UP HATCH
   * ------------------------------------------------------------------------
   * Clears out the Hatch Screen
   * -------------------------------------------*/ /* istanbul ignore next */
   wrapUpHatch = () => {
    // TODO - You can also go to Level Up first...
    // Check if Evolution is Possible and determine next screen
    const canEvolve = this.dgmnUtility.canEvolveIntoAny( this.dgmnAH.getDgmnData(
      this.dgmnAH.getDgmnParty()[this.currDgmnIndex],['currentFP']).currentFP, // DGMN FP
      this.subMenus.hatch.choices[this.subMenus.hatch.currChoice]);  // Hatch Into DGMN
    let direction = canEvolve ? 'evolve' : 'hatch';
    if(!canEvolve) this.currDgmnIndex++;

    if(this.currDgmnIndex > 2){ // If that was the last DGMN
      this.parentAH.closeGrowthMenu();
    } else{
      // Get ready for the next screen
      const currDgmnData = {
        ...this.getCurrDgmnData(),
        species: this.subMenus.hatch.choices[this.subMenus.hatch.currChoice] }
      const nextImages = direction === 'hatch' ? 
        this.dgmnUtility.getAllHatchImages(currDgmnData.eggField) : 
        this.dgmnUtility.getAllEvoImages(currDgmnData.species);

      // Load Images, then go to next screen
      this.systemAH.loadImages(nextImages, () =>{
        if(direction === 'evolve'){
          this.removeSubMenu('hatch');
          this.gotoEvolution(currDgmnData);
        } else{
          this.removeSubMenu('hatch');
          this.gotoHatch(currDgmnData);
        }
      })
    }
  }

    /**------------------------------------------------------------------------
   * WRAP UP EVOLUTION
   * ------------------------------------------------------------------------
   * Clears out the Evolution Screen
   * -------------------------------------------*/ /* istanbul ignore next */
   wrapUpEvolution = () => {
      // TODO - Check if Can Evolve Again...
      // TODO - Need to consider Boss Reward
      // TODO - The gotoHatch only happens on the hatch origin, and needs to switch
      //        when I move onto the Victory Menu, which might go to Level Up

      this.currDgmnIndex++;
      if(this.currDgmnIndex > 2) { // If that was the last DGMN
        console.log("CLOSE HATCH");
      } else{
        const currDgmnData = this.getCurrDgmnData();
        const nextImages = this.dgmnUtility.getAllHatchImages(currDgmnData.eggField);
        this.systemAH.loadImages(nextImages,()=>{
          this.removeSubMenu('evolve');
          this.gotoHatch(currDgmnData);
        })
      }
   }

  /**------------------------------------------------------------------------
   * GO TO NEXT SCREEN
   * ------------------------------------------------------------------------
   * Figures out the next place the Menu should go when done with the
   *   current actions
   * TODO - Mother of God, this is awful...
   * ----------------------------------------------------------------------*/
  gotoNextScreen = () => {
    if(this.origin === 'hatch'){
      if(this.subMenus.hatch){
        this.wrapUpHatch();
      } else if(this.subMenus.evolve){
        this.wrapUpEvolution();
      }
    } else if(this.origin === 'victory'){
      // TODO - This
    }
  }

  /**------------------------------------------------------------------------
   * GET CURR DGMN DATA
   * ------------------------------------------------------------------------
   * Gets the DGMN Data for the current DGMN in the Menu
   * ----------------------------------------------------------------------*/
  getCurrDgmnData = () => {
    let currDgmn = this.dgmnAH.getDgmnParty()[this.currDgmnIndex];
    let currDgmnData = this.dgmnAH.getDgmnData(currDgmn,['eggField','currentFP','nickname','speciesName','currentStats'],false);
        currDgmnData.dgmnId = currDgmn;
    return currDgmnData;
  }

  /**------------------------------------------------------------------------
   * HATCH DGMN
   * ------------------------------------------------------------------------
   * Hatch the Current DGMN into the currently selected Choice
   * ----------------------------------------------------------------------*/
  hatchDgmn = () => {
    const hatchIntoDgmn = this.subMenus.hatch.selectedDgmn;
    this.dgmnAH.hatchEgg(this.dgmnAH.getDgmnParty()[this.currDgmnIndex],hatchIntoDgmn);
  }

  /**------------------------------------------------------------------------
   * EVOLVE INTO DGMN
   * ------------------------------------------------------------------------
   * Evolve the Current DGMN into the currently selected Choice
   * ----------------------------------------------------------------------*/
  evolveIntoDgmn = () => {
    const evolution = this.subMenus.evolve.selectedDgmn;
    this.dgmnAH.evolve(this.dgmnAH.getDgmnParty()[this.currDgmnIndex],evolution)
  }
  
  /**------------------------------------------------------------------------
   * NEXT/PREV HATCH                                               [EXPORTED]
   * ------------------------------------------------------------------------
   * Change current selection on the Hatch Screen
   * ----------------------------------------------------------------------*/
  nextHatch = () => { this.subMenus.hatch.nextChoice() }
  prevHatch = () => { this.subMenus.hatch.prevChoice() }
  
  /**------------------------------------------------------------------------
   * SELECT HATCH                                                  [EXPORTED]
   * ------------------------------------------------------------------------
   * Select the currently chosen DGMN to Hatch into
   * ----------------------------------------------------------------------*/
  selectHatch = () => {
    if(this.subMenus.hatch.canHatch()){
      this.hatchDgmn();
      this.gotoNextScreen();
    } else{ debugLog('Cannot Hatch That One') }
  }
  
  /**------------------------------------------------------------------------
   * NEXT/PREV EVO                                                 [EXPORTED]
   * ------------------------------------------------------------------------
   * Change current selection on the Evolution Screen
   * ----------------------------------------------------------------------*/
   nextEvo = () => { this.subMenus.evolve.nextChoice() }
   prevEvo = () => { this.subMenus.evolve.prevChoice() }

  /**------------------------------------------------------------------------
   * SELECT EVOLUTION                                              [EXPORTED]
   * ------------------------------------------------------------------------
   * Select the currently chosen DGMN to Evolve into
   * ----------------------------------------------------------------------*/
  selectEvo = () => {
    // TODO - Check to make sure Evo is allowed
    this.evolveIntoDgmn();
    this.gotoNextScreen()
  }

}

export default DgmnGrowthMenu;
