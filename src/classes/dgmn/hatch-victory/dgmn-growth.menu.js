import Menu from "../../menu";
import RewardsMenu from "../../menu/rewards-menu";
import TextArea from "../../text-area";
import DgmnGrowthMenuAH from "./dgmn-growth-menu.ah";
import CFG from "../../../config";
import DgmnUtility from "../utility/dgmn.util";
import { debugLog } from "../../../utils/log-utils";
import EvoMenu from "./evo.menu";
import LevelUpMenu from "./level-up.menu";
import BossVictoryMenu from "../../menu/boss-victory-menu";
import { FIELD_LABELS } from "../../../data/fields.db";

class DgmnGrowthMenu extends Menu{
  constructor(origin,dgmnAH,isBoss,...args){
    super(...args);

    this.origin = origin;   // Where the Menu is launched from [hatch|victory]
    this.currDgmnIndex = 0; // Which DGMN in the Party is Currently in-menu
    this.rewards = [];
    // this.isBoss = isBoss;
    this.isBoss = true; // TEMP

    this.levelUps = {};

    // Text Areas
    this.topTxt = new TextArea(0,0,20,1);
    this.subTopTxt = new TextArea(0,1,20,1);
    this.actionTxt = new TextArea(2,15,16,2);
    this.bossRewardActionTxt = new TextArea(4,14,14,4);

    this.dgmnUtility = new DgmnUtility();

    this.dgmnAH = dgmnAH;
    this.dgmnGrowthMenuAH = new DgmnGrowthMenuAH({
      getStateCB: this.getState,
      giveCurrRewardCB: this.giveCurrReward,
      nextHatchCB: this.nextHatch,
      prevHatchCB: this.prevHatch,
      prevEvoCB: this.prevEvo,
      nextEvoCB: this.nextEvo,
      prevBossRewardCB: this.prevBossReward,
      nextBossRewardCB: this.nextBossReward,
      selectBossRewardCB: this.selectBossReward,
      selectHatchCB: this.selectHatch,
      selectEvoCB: this.selectEvo,
      confirmLevelUpCB: this.confirmLevelUp,
      skipEvoCB: this.skipEvo
    });
  }

  /**------------------------------------------------------------------------
   * GO TO REWARDS
   * ------------------------------------------------------------------------
   * Sets up the Giving Rewards Screen
   * TODO - Figure out how to make this modular, so each goto isn't so long
   * -------------------------------------------*/ /* istanbul ignore next */
   gotoRewards = rewards => {
    this.currState = 'loading';
    this.rewards = rewards;

    // Prep Screen
    this.drawBackground('battleVictoryRewardsOverlay');
    if(this.origin === 'hatch') this.topTxt.instantText(this.menuCanvas.ctx,'Use D Pad to choose','white');
    this.actionTxt.timedText(this.menuCanvas.ctx,
      this.origin === 'hatch' ? 'Choose DGMN Egg to get Rewards!' : 'Choose DGMN to get Rewards!',
      this.drawMenu);

    // Add Reward SubMenu
    this.addSubMenu('rewards', new RewardsMenu('rewards'));
    this.subMenus.rewards.isVisible = true;
    this.attachImageCallbacks('rewards');

    // Draw Elements
    this.origin === 'hatch' ? this.drawEggs() : this.drawDgmn(); // Draw Eggs or DGMN, depending on Origin
    this.subMenus.rewards.drawRewardsList(rewards);

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
    this.addSubMenu('level',new LevelUpMenu('level'));
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
  gotoBossRewards = (dgmnData) => {
    this.currState = 'boss-reward';

    // Prep Screen
    this.drawBackground('bossRewardMenu');
    this.topTxt.instantText(this.menuCanvas.ctx,'Choose Boss Reward!');

    // Add Boss Reward SubMenu
    this.addSubMenu('bossReward', 
      new BossVictoryMenu(5,[0,0],3,8,2,['fp','xp','en'],this.systemAH.fetchImage('miniCursor'),null,'bossReward')); // TODO - The 5 is temporary

    this.subMenus.bossReward.isVisible = true;
    this.attachImageCallbacks('bossReward');
    this.subMenus.bossReward.drawList();
    this.subMenus.bossReward.drawDgmnPortrait( this.systemAH.fetchImage(`${dgmnData.speciesName.toLowerCase()}Portrait`) );
    
    this.drawMenu();
  }

  /**------------------------------------------------------------------------
   * UPDATE REWARDS LIST
   * ------------------------------------------------------------------------
   * Handles what happens when you give a reward, and the list should be
   *   updated, OR moved onto the next Screen
   * ----------------------------------------------------------------------*/
  updateRewardsList = () => {
    const currDgmnData = this.getCurrDgmnData();
    const nextImages = this.origin === 'hatch' ? this.dgmnUtility.getAllHatchImages(currDgmnData.eggField) : []; // TODO - Why?

    this.drawBackground('battleVictoryRewardsOverlay');
    this.origin === 'hatch' ? this.drawEggs() : this.drawDgmn(); // Draw Eggs or DGMN, depending on Origin

    this.subMenus.rewards.updateRewardsList(this.rewards, () => {
      if(nextImages.length === 0){
        this.gotoNextScreen()
        return;
      } else{
        this.systemAH.loadImages(nextImages,()=>{
          this.gotoNextScreen();
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

    this.dgmnAH.giveDgmnReward(dgmnId,this.rewards[this.subMenus.rewards.currIndex]);
    this.updateRewardsList()
  }

  /**------------------------------------------------------------------------
   * WRAP UP REWARDS
   * ------------------------------------------------------------------------
   * When the Rewards Menu is done, determines where to go
   * ----------------------------------------------------------------------*/
  wrapUpRewards = () => {
    this.removeSubMenu('rewards');
    let currDgmn = this.dgmnAH.getDgmnParty()[this.currDgmnIndex];
    let currDgmnData = this.getCurrDgmnData();
    this.checkAllLevelUps();

    if(this.origin === 'victory' && this.isBoss){ // BOSS VICTORY
      this.gotoBossRewards(currDgmnData);
    } else if(this.origin === 'hatch'){ // Hatch Menu should always go straight to Hatch
      this.gotoHatch(currDgmnData);
    } else if(this.levelUps[currDgmn]){ // If the First DGMN Leveled Up, go to Level Up Screen
      this.gotoLevelUp(currDgmnData);
     } else{ this.wrapUpLevelUp(true) } // Skip the Level Up altogether
  }

  /**------------------------------------------------------------------------
   * WRAP UP LEVEL UP
   * ------------------------------------------------------------------------
   * When the Level Up Menu is done, determines where to go
   * ----------------------------------------------------------------------*/
   wrapUpLevelUp = (skipEvolve = false) => {
    this.continueCursor?.remove();
    this.removeSubMenu('level');
    let currDgmnData = this.getCurrDgmnData();
    let canEvolve = !skipEvolve ? 
      this.dgmnUtility.canEvolveIntoAny(currDgmnData.currentFP,currDgmnData.speciesName) : 
      false;

    const direction = canEvolve ? 'evolve' : 'level';
    if(!canEvolve) this.currDgmnIndex++;
    let nextDgmn = this.dgmnAH.getDgmnParty()[this.currDgmnIndex];

    if(this.currDgmnIndex > 2){ this.parentAH.closeGrowthMenu()
    } else {
      if(direction === 'level'){
        const nextDgmnData = this.getCurrDgmnData();
        if(this.origin === 'victory' && this.isBoss){
          this.gotoBossRewards(nextDgmnData);
        } else if(this.levelUps[nextDgmn]){ // If the next DGMN Leveled Up
          this.gotoLevelUp(nextDgmnData)
        } else { this.wrapUpLevelUp() } // If they can't evolve OR level up, just run this again on the next DGMN
      } else { // Going to the Evolution Screen, get things ready
        const evoImages = this.dgmnUtility.getAllEvoImages(currDgmnData.speciesName);
        this.systemAH.loadImages(evoImages, () => { this.gotoEvolution(currDgmnData)});
      }
    }
   }

  /**------------------------------------------------------------------------
   * WRAP UP HATCH
   * ------------------------------------------------------------------------
   * Clears out the Hatch Screen
   * -------------------------------------------*/ /* istanbul ignore next */
   wrapUpHatch = () => {
    this.continueCursor?.remove();
    let currDgmnData = this.getCurrDgmnData();
    const canEvolve = this.dgmnUtility.canEvolveIntoAny(currDgmnData.currentFP,currDgmnData.speciesName);
    let direction = canEvolve ? 'evolve' : 'hatch';
    if(!canEvolve){
      this.currDgmnIndex++;
      currDgmnData = this.currDgmnIndex <= 2 ? this.getCurrDgmnData() : currDgmnData; // TODO - Refactor like wrapUpLevelUp so I don't need this...
    } 

    if(this.currDgmnIndex > 2){ // If that was the last DGMN
      this.parentAH.closeGrowthMenu();
    } else{
      // Get ready for the next screen
      const nextImages = direction === 'hatch' ? 
        this.dgmnUtility.getAllHatchImages(currDgmnData.eggField) : 
        this.dgmnUtility.getAllEvoImages(currDgmnData.speciesName);

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
   * TODO - Need to check potential Double Evolution
   * -------------------------------------------*/ /* istanbul ignore next */
   wrapUpEvolution = () => {
      // TODO - Check if Can Evolve Again...

      this.currDgmnIndex++;
      if(this.currDgmnIndex > 2) { // If that was the last DGMN
        this.parentAH.closeGrowthMenu();
      } else{
        const currDgmnData = this.getCurrDgmnData();
        // This shouldn't be happening for Evo
        const nextImages = this.dgmnUtility.getAllHatchImages(currDgmnData.eggField);
        this.systemAH.loadImages(nextImages,()=>{
          this.removeSubMenu('evolve');
          if(this.origin === 'hatch') this.gotoHatch(currDgmnData);
          if(this.origin === 'victory'){
            if(this.isBoss){ 
              this.gotoBossRewards(currDgmnData);
            } else{ // TODO - Why is this -- here?
              this.currDgmnIndex--;
              this.wrapUpLevelUp();
            }            
          }
        })
      }
   }

   /**------------------------------------------------------------------------
   * WRAP UP BOSS REWARD
   * ------------------------------------------------------------------------
   * Clears out the Boss Reward Screen
   * -------------------------------------------*/ /* istanbul ignore next */
   wrapUpBossReward = () => {
    this.removeSubMenu('bossReward');
    let currDgmn = this.dgmnAH.getDgmnParty()[this.currDgmnIndex];
    let currDgmnData = this.getCurrDgmnData();

    console.log("All Level Ups ? ",this.levelUps);
    console.log("Can Level Up ? ",this.levelUps[currDgmn]);
    
    if(this.levelUps[currDgmn]){ this.gotoLevelUp(currDgmnData) } 
      else{ this.wrapUpLevelUp(false) }
   }

  /**------------------------------------------------------------------------
   * GO TO NEXT SCREEN
   * ------------------------------------------------------------------------
   * Figures out the next place the Menu should go when done with the
   *   current actions
   * ----------------------------------------------------------------------*/
  gotoNextScreen = () => {
    if(this.origin === 'hatch'){
      if(this.subMenus.rewards){
        this.wrapUpRewards();
      }else if(this.subMenus.hatch){
        this.wrapUpHatch();
      } else if(this.subMenus.evolve){
        this.wrapUpEvolution();
      }
    } else if(this.origin === 'victory'){
      if(this.subMenus.rewards){
        this.wrapUpRewards();
      } else if(this.subMenus.level){
        this.wrapUpLevelUp();
      } else if(this.subMenus.evolve){
        this.wrapUpEvolution();
      }
    }
  }

  
  /**------------------------------------------------------------------------
   * CHECK ALL LEVEL UPS
   * ------------------------------------------------------------------------
   * Loops through all of the DGMN and sees who can level up
   * TODO - Add this to a helper file instead
   * ----------------------------------------------------------------------*/
  checkAllLevelUps = () => {
    for(let dgmn of this.dgmnAH.getDgmnParty()){
      if( this.dgmnAH.checkLevelUp(dgmn) ) this.levelUps[dgmn] = true
    }
  }

  /**------------------------------------------------------------------------
   * GET CURR DGMN DATA
   * ------------------------------------------------------------------------
   * Gets the DGMN Data for the current DGMN in the Menu
   * ----------------------------------------------------------------------*/
  getCurrDgmnData = () => {
    let currDgmn = this.dgmnAH.getDgmnParty()[this.currDgmnIndex];
    let currDgmnData = this.dgmnAH.getDgmnData(currDgmn,['eggField','currentFP','nickname','speciesName','currentStats','currentLevel','currentXP'],false);
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
      this.menuCanvas.paintImage(this.systemAH.fetchImage('eggDR'),2*CFG.tileSize,8*CFG.tileSize);
      this.menuCanvas.paintImage(this.systemAH.fetchImage('eggJT'),8*CFG.tileSize,8*CFG.tileSize);
      this.menuCanvas.paintImage(this.systemAH.fetchImage('eggME'),14*CFG.tileSize,8*CFG.tileSize);
    }
  
    drawDgmn = () => {
      let i = 0;
      for(let dgmn of this.dgmnAH.getDgmnParty()){
        let species = this.dgmnAH.getDgmnData(dgmn,['speciesName']).speciesName;
        this.menuCanvas.paintImage(this.systemAH.fetchImage(`${species.toLowerCase()}Idle0`),((2+(i*6)))*CFG.tileSize,8*CFG.tileSize);
        i++;
      }
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
    if(this.subMenus.evolve.canEvolve()){
      this.evolveIntoDgmn();
      this.gotoNextScreen()
    }
  }

  /**------------------------------------------------------------------------
   * SKIP EVO
   * ------------------------------------------------------------------------
   * Go straight to the next Screen
   * ----------------------------------------------------------------------*/
  skipEvo = () => { this.gotoNextScreen() }

  /**------------------------------------------------------------------------
   * UPDATE BOSS REWARD TEXT
   * ------------------------------------------------------------------------
   * On the Boss Reward screen, there is a Text Area that is often rewritten,
   * this helps handle that
   * TODO - Move to a Util?
   * @param {String}  message Text to display
   * @param {String}  timing  Timing of the Message [instant|timed]
   * ----------------------------------------------------------------------*/
  updateBossRewardText = (message,timing) => {
    if(timing === 'instant'){
      this.bossRewardActionTxt.instantText(this.menuCanvas.ctx,message);
    }else{
      this.bossRewardActionTxt.instantText(this.menuCanvas.ctx,message,this.drawMenu);
    }
  }

  /**------------------------------------------------------------------------
   * NEXT/PREV BOSS REWARD                                         [EXPORTED]
   * ------------------------------------------------------------------------
   * Change current selection on the Boss Reward Screen
   * ----------------------------------------------------------------------*/
  prevBossReward = () => { this.subMenus.bossReward.prevChoice(this.updateBossRewardText) }
  nextBossReward = () => { this.subMenus.bossReward.nextChoice(this.updateBossRewardText) }

  /**------------------------------------------------------------------------
   * SELECT BOSS REWARD                                            [EXPORTED]
   * ------------------------------------------------------------------------
   * Select the currently chosen Reward
   * ----------------------------------------------------------------------*/
  selectBossReward = () => {
    if(this.currState === 'loading') return;

    let currBossReward = this.subMenus.bossReward.listItems[this.subMenus.bossReward.currIndex];
    let currDgmn = this.dgmnAH.getDgmnParty()[this.currDgmnIndex];

    // Each of the Upgrades have different actions to run when things are done.
    const onDoneCallbacks = {
      fp: () => {
        if(this.subMenus.bossReward.inFPSelection){
          this.dgmnAH.giveUpgrade(currDgmn,'FP',FIELD_LABELS[this.subMenus.bossReward.FPIndex]);
          this.wrapUpBossReward();
        }
      },
      xp: () => { this.dgmnAH.giveUpgrade(currDgmn,'XP'); this.wrapUpBossReward() },
      en: () => { this.dgmnAH.giveUpgrade(currDgmn,'EN'); this.wrapUpBossReward() }
    }

    // Only move forward if you're not launching the FP Menu
    let isMovingForward = currBossReward === 'xp' || 
                          currBossReward === 'en' || 
                          (currBossReward === 'fp' && this.subMenus.bossReward.inFPSelection);

    if(isMovingForward) this.currState = 'loading';

    this.subMenus.bossReward.selectChoice(onDoneCallbacks[currBossReward]);
   }

  /**------------------------------------------------------------------------
   * CONFIRM LEVEL UP                                              [EXPORTED]
   * ------------------------------------------------------------------------
   * Runs when player hits Action on the Level Up Screen
   * ----------------------------------------------------------------------*/
  confirmLevelUp = () => {
    // do some stuff
    this.gotoNextScreen();
  }

}

export default DgmnGrowthMenu;
