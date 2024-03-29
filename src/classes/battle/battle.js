import { debugLog } from "../../utils/log-utils";

import DgmnUtility from "../dgmn/utility/dgmn.util";
import BattleAH from "../action-handlers/battle.ah";
import BattleUtility from "./utility/battle.util";
import BattleIO from "../input-output/battle.io";
import BattleCanvas from "./canvas/battle-canvas";
import BattleMenu from "./menus/battle-menu";
import AttackManager from "./attack-manager";
import BattleDgmnStatusCanvas from "./canvas/battle-dgmn-status-canvas";
import AttackUtility from "../dgmn/utility/attack.util";
import CFG from "../../config";
import DgmnGrowthMenu from "../dgmn/hatch-victory/dgmn-growth.menu";
import CannonManager from "../../battle/components/cannon-manager";

// TODO - Do I have too many "pass-throughs"? Functions in here that only serve to call a Child Class function

class Battle {
  constructor(isBoss,isDebug){ // TODO - Needs floor and mods to determine enemies
   this.isDebug = isDebug;                        // Used so I can test specific battles
    this.battleActive = true;
    this.turn = 0;                               // Which Turn it currently is
    this.yourParty;                              // Your Dgmn : TODO - gameAH Reference to fetch this
    this.enemyParty = ['edId0','edId1','edId2']; // Enemies for the Battle (Always these three IDs)
    this.isBoss = isBoss;

    this.battleState = 'loading';
    this.battleRewards = [];
    this.battleBaseXP = 0;
    this.attackChoice;

    // ACTION HANDLERS
    this.systemAH; this.gameAH; this.digiBeetleAH; this.dgmnAH;
    this.dungeonAH; // TODO - We'll see if I need this, probably not

    this.battleAH = new BattleAH({
      getBattleStateCB: this.getBattleState,
      drawBattleCanvasCB: this.drawBattleCanvas,
      getDgmnDataByIndexCB: this.getDgmnDataByIndex,
      addActionCB: this.addAction,
      getDgmnAttackDataCB: this.getDgmnAttackData,        // TODO - Passthrough for DGMN Manager <-> Battle Menu
      beginCombatCB: this.beginCombat,
      drawActionTextCB: this.drawActionText,              // TODO - Passthrough for Attack Manager <-> Battle Menu
      drawAllStatusesCB: this.drawAllStatuses,            // TODO - Rename
      newTurnCB: this.newTurn,
      checkBattleConditionCB: this.checkBattleCondition,  // TODO - Rename to be a Getter
      battleWinCB: this.battleWin,                        // TODO - Combine to lower the number of CBs in this AH
      battleLoseCB: this.battleLose,
      addRewardsCB: this.addRewards,
      gotoRewardsCB: this.gotoRewards,
      closeGrowthMenuCB: this.closeGrowthMenu,
      shootCannonCB: this.shootCannon
    });

    this.battleIO = new BattleIO(this.battleAH);  // Key Manager

    // UTILITIES
    this.battleUtility = new BattleUtility();
    this.dgmnUtility = new DgmnUtility();
    this.attackUtility = new AttackUtility();

    this.attackManager = new AttackManager();
    this.cannonManager = new CannonManager();

    this.battleCanvas;
    this.dgmnStatusCanvas;
    this.battleMenu;
    this.victoryMenu;
    this.dgmnGrowthMenu;
  }

  /**------------------------------------------------------------------------
   * INITIALIZE
   * ------------------------------------------------------------------------
   * Kicks things off
   *   TODO - Will I need this, or would I rather the Game directly call generateBattle?
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  init = () => {
    debugLog("Building New Battle...");

    this.battleMenu = new BattleMenu(this.digiBeetleAH,this.systemAH,this.gameAH,this.battleAH);
    this.battleIO.setMenuAH(this.battleMenu.battleMenuAH);
    this.attackManager.battleMenuAH = this.battleMenu.battleMenuAH;

    this.yourParty = this.gameAH.getDgmnParty();
    this.generateEnemyParty(); // TODO - Mocked for now, needs actual params for calculations
    this.initCanvas();
    this.loadBattleImages();

    // debugger; // TODO - Here to make battle Boss to test menus
  }

  /**------------------------------------------------------------------------
   * INITIALIZE CANVAS
   * ------------------------------------------------------------------------
   * Sets up the Battle Canvas
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  initCanvas = () => { 
    this.battleCanvas = new BattleCanvas('battle-canvas',160,144);
  }

  /**------------------------------------------------------------------------
   * ACTION HANDLER INITIALIZERS
   * ------------------------------------------------------------------------
   * The Initializers for the different Action Handlers for other Classes
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  initAH = (systemAH,gameAH,dgmnAH,dungeonAH,digiBeetleAH) => {
    this.systemAH = systemAH; this.gameAH = gameAH;
    this.dgmnAH = dgmnAH;
    this.dungeonAH = dungeonAH; this.digiBeetleAH = digiBeetleAH;
    this.attackManager.initAH(this.systemAH,this.battleAH,this.dgmnAH);
    this.cannonManager.initAH(this.dgmnAH,this.battleAH);
  }

  /**------------------------------------------------------------------------
   * LOAD BATTLE IMAGES
   * ------------------------------------------------------------------------
   * Goes through and loads the essential images for the Battle
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  loadBattleImages = () => {
    let allImages = [];
    let defaultImages = this.battleUtility.getDefaultBattleImages();
    for(let img of defaultImages){
      allImages.push(img);
    }

    let allDgmn = this.yourParty.concat(this.enemyParty);

    for(let dgmnId of allDgmn){
      let dgmnData = this.dgmnAH.getDgmnData(dgmnId,['speciesName'],dgmnId.charAt(0) === 'e');
      let allDgmnImages = this.dgmnUtility.getAllDgmnImages(dgmnData.speciesName);
      for(let dgmnImage of allDgmnImages){
        allImages.push(dgmnImage);
      }
    }

    this.systemAH.loadImages(allImages, ()=>{
      this.onBattleImagesLoaded();
      setTimeout(()=>{ this.systemAH.stopLoading(); this.battleState = 'battle' },2000);
    });
  }
      /**------------------------------------------------------------------------
       * ON BATTLE IMAGES LOADED
       * ------------------------------------------------------------------------
       * After all of the images have been loaded, runs a lot of setup
       * TODO - The battleMenu.init needs to be split up so that it's reusable
       * ----------------------------------------------------------------------*/ /* istanbul ignore next */
      onBattleImagesLoaded = () => {
        this.dgmnStatusCanvas = new BattleDgmnStatusCanvas('battle-dgmn-status',160,144);
        this.gameAH.addCanvasObject(this.battleCanvas);
        this.buildDgmnCanvases();
        this.battleMenu.init();
        this.drawAllStatuses(); // TODO - Move to BattleMenu
        this.drawBattleCanvas();
        this.gameAH.refreshScreen();
      }

  /**------------------------------------------------------------------------
   * NEW TURN                                      
   * ------------------------------------------------------------------------
   * Sets the Battle up for a new turn
   * ----------------------------------------------------------------------*/
  newTurn = () => {
    this.turn++;
    this.effectDecay(this.yourParty);
    this.effectDecay(this.enemyParty);
    this.drawAllStatuses();
    this.battleMenu.newTurn();
  }

  /**------------------------------------------------------------------------
   * EFFECT DECAY                                        
   * ------------------------------------------------------------------------
   * Goes throug a Party and decays Combo, WEAK, and Status Cond.
   * ------------------------------------------------------------------------
   * @param {Array} party Which Party to Decay Effects for [yourParty|energyParty]
   * ----------------------------------------------------------------------*/
  effectDecay = party => {
    for(let i = 0; i < party.length; i++){
      let dgmnWeak = this.getDgmnDataByIndex(i,['weak'],party[i].charAt(0) === 'e').weak;
      this.dgmnAH.modifyWeak(party[i],-1);
      this.dgmnAH.modifyCombo(party[i],-2 + dgmnWeak); // Combo goes down less for each WEAK stage
    }
  }

  /**------------------------------------------------------------------------
   * GENERATE ENEMY PARTY
   * ------------------------------------------------------------------------
   * Determines and creates the Enemy DGMN
   *  TODO - Replace with actual calculation
   *  TODO - Move to DgmnParty Class?
   * ----------------------------------------------------------------------*/
  generateEnemyParty = () => {
    // TODO - I need to save/get max floor (but for now, set to 3)
  let currentFloor = !this.isDebug ? this.dungeonAH.getCurrentFloor() : 0;
  this.dgmnAH.generateEnemies(currentFloor,3);
  }

  /**------------------------------------------------------------------------
   * CALCULATE TURN ORDER
   * ------------------------------------------------------------------------
   * Organizes the Battle Order for Dgmn based on their Speed
   * TODO - MOVE/MERGE WITH UTILITIES
   * ----------------------------------------------------------------------*/
  calcTurnOrder = () => {
    let order = this.yourParty.concat(this.enemyParty);

    for(let i = 0; i < order.length; i++){
      for(let r = 0; r < order.length - 1; r++){
        let temp = order[r];
        let currSPD = this.dgmnAH.getDgmnData(order[r],['currentStats'],order[r].charAt(0) === 'e').currentStats.SPD *
                      this.dgmnAH.getDgmnData(order[r],['statMods'],order[r].charAt(0) === 'e').statMods.SPD;
        let nextSPD = this.dgmnAH.getDgmnData(order[r+1],['currentStats'],order[r+1].charAt(0) === 'e').currentStats.SPD *
                      this.dgmnAH.getDgmnData(order[r+1],['statMods'],order[r+1].charAt(0) === 'e').statMods.SPD;
        if(currSPD < nextSPD){
          order[r] = order[r+1];
          order[r+1] = temp;
        }
      }
    }

    return order;
  }

  /**------------------------------------------------------------------------
   * DRAW ALL STATUSES                                           
   * ------------------------------------------------------------------------
   * When you need to draw all of the Dgmn Status fresh
   * TODO - Why is this in Battle?
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  drawAllStatuses = () => {
    for(let i = 0; i < 3; i++){
      this.updateDgmnStatus(false,i);
      this.updateDgmnStatus(true,i);
    }
  }

  /**------------------------------------------------------------------------
   * UPDATE DGMN STATUS
   * ------------------------------------------------------------------------
   * Changes the DGMN status in the display
   * TODO - Can this be passed through and controlled by the Status Object
   * ------------------------------------------------------------------------
   * @param {Boolean} isEnemy   Whether the DGMN is an Enemy
   * @param {Number}  dgmnIndex Spot in the DGMN Array
   * ----------------------------------------------------------------------*/
  updateDgmnStatus = (isEnemy,dgmnIndex) => {
    let dgmnData = isEnemy ? this.dgmnAH.getDgmnData(this.enemyParty[dgmnIndex],['combo','weak','isDead','statMods','condition'],true) :
                             this.dgmnAH.getDgmnData(this.yourParty[dgmnIndex],['combo','weak','isDead','statMods','condition'],false);
                              
      this.drawDgmnStatusMeter(isEnemy,dgmnIndex,'hp');
      this.drawDgmnStatusMeter(isEnemy,dgmnIndex,'en');
      this.drawDgmnStatusCombo(isEnemy,dgmnIndex,dgmnData.combo);
      this.drawDgmnStatusWeak(isEnemy,dgmnIndex,dgmnData.weak);

      if(!dgmnData.isDead){
        this.drawDgmnStatBuff(isEnemy,dgmnIndex,dgmnData.statMods);
        this.drawDgmnCondition(isEnemy,dgmnIndex,dgmnData.condition?.type);
      }
  }

  /**------------------------------------------------------------------------
   * DRAW DGMN STATUS - METER                                     
   * ------------------------------------------------------------------------
   * Updates the HP or EN meter for a specific DGMN
   * TODO - Why is this in Battle?
   *        and why am I sending in the coordinates and not an offset?
   * ------------------------------------------------------------------------
   * @param {Boolean} isEnemy   True if Dgmn is an Enemy
   * @param {Number}  dgmnIndex Spot the Dgmn is in
   * @param {String}  stat      Which meter [hp|en]
   * ----------------------------------------------------------------------*/
    drawDgmnStatusMeter = (isEnemy,dgmnIndex,stat) => {
      let dgmnData = !isEnemy ? this.dgmnAH.getDgmnData(this.yourParty[dgmnIndex],[`current${stat.toUpperCase()}`,'currentStats']) :
                                this.dgmnAH.getDgmnData(this.enemyParty[dgmnIndex],[`current${stat.toUpperCase()}`,'currentStats'],true);
      let coord = [];
          coord[0] = (isEnemy ? 1 : 18);
          coord[1] = ((dgmnIndex * 4) + 2) + (stat === 'hp' ? 0 : 1);
      let currStat = dgmnData[`current${stat.toUpperCase()}`];
      let maxStat = stat === 'hp' ? dgmnData.currentStats.HP : 100;

      this.dgmnStatusCanvas.drawDgmnStatusMeter(coord,
                                                [this.systemAH.fetchImage('dgmnBarLightGreen'),this.systemAH.fetchImage('dgmnBarDarkGreen')],
                                                this.battleUtility.calculateMeterLength(currStat,maxStat));
    }

  /**------------------------------------------------------------------------
   * DRAW DGMN STATUS - COMBO                                        
   * ------------------------------------------------------------------------
   * Draws the Combo in the Status Bar for a Dgmn
   * ----------------------------------------------------------------------*/
  drawDgmnStatusCombo = (isEnemy,dgmnIndex,combo) => {
    let comboLetter = this.attackUtility.getComboLetter(combo);
    let comboImg = comboLetter === 'F' ? this.systemAH.fetchImage('comboFIcon') : this.systemAH.fetchImage(`pwr${comboLetter}Icon`);
    let partyOffset = isEnemy ? 0 : 17;
    let coord = [1+partyOffset,(4+(dgmnIndex * 4))];
    this.dgmnStatusCanvas.drawDgmnCombo(coord,comboImg);
  }

  /**------------------------------------------------------------------------
   * DRAW DGMN STATUS - WEAK                                       
   * ------------------------------------------------------------------------
   * Draws the WEAK state in the Status Bar for a Dgmn
   * ----------------------------------------------------------------------*/
  drawDgmnStatusWeak = (isEnemy,dgmnIndex,weak) => {
    let partyOffset = isEnemy ? 0 : 17;
    let coord = [2+partyOffset,(4+(dgmnIndex * 4))];
    this.dgmnStatusCanvas.drawDgmnWeak(coord,this.systemAH.fetchImage('weak'+weak));
  }

  /**------------------------------------------------------------------------
   * DRAW DGMN STATUS - STAT BUFF                                      
   * ------------------------------------------------------------------------
   * Draws an Icon if the DGMN has a stat Buffed
   * ----------------------------------------------------------------------*/
   drawDgmnStatBuff = (isEnemy,dgmnIndex,statMods) => {
    if(!this.battleUtility.hasBuffedStat(statMods)) return;
    this.dgmnStatusCanvas.drawDgmnStatBuff(isEnemy,dgmnIndex,this.systemAH.fetchImage('statBuff'));
  }

  
  /**------------------------------------------------------------------------
   * DRAW DGMN STATUS - STAT DEBUFF                                      
   * ------------------------------------------------------------------------
   * Draws an Icon if the DGMN has a stat Debuffed
   * ----------------------------------------------------------------------*/
   drawDgmnStatDebuff = (isEnemy,dgmnIndex,statMods) => {
    if(!this.battleUtility.hasdeBuffedStat(statMods)) return;
    this.dgmnStatusCanvas.drawDgmnStatDebuff(isEnemy,dgmnIndex,this.systemAH.fetchImage('statDebuff'));
  }

  /**------------------------------------------------------------------------
   * DRAW DGMN STATUS - CONDITION                                     
   * ------------------------------------------------------------------------
   * Draws an Icon if the DGMN has a stat Debuffed
   * ----------------------------------------------------------------------*/
   drawDgmnCondition = (isEnemy,dgmnIndex,condition) => {
    if(!condition) return;
    this.dgmnStatusCanvas.drawDgmnCondition(isEnemy,dgmnIndex,this.systemAH.fetchImage(condition+'Condition'));
  }

  /**------------------------------------------------------------------------
   * DRAW ACTION TEXT                                     
   * ------------------------------------------------------------------------
   * Passthrough to the Battle Menu to draw a message
   * TODO - This seems like the wrong place for this
   * ----------------------------------------------------------------------*/
  drawActionText = (species,messages) => {
    this.battleMenu.drawActionText(species,messages);
  }

  /**------------------------------------------------------------------------
   * REDRAW BATTLE CANVAS                                       [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Redraws all of the Battle Canvas Elements
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  drawBattleCanvas = () => {
    this.battleCanvas.drawBattleBase(this.systemAH.fetchImage('battleBackground'));
    this.battleCanvas.paintCanvas(this.dgmnStatusCanvas);

    if(this.battleMenu){ // Only Draw the DGMN here when the Battle Menu is Active and Battle isn't loading
      for(let i = 0; i < 3; i++){
        // Without the conditionals, it tries to draw all of the DGMN Canvases before they have loaded,
        //   so only draw the DGMN that have been loaded
        if(this.dgmnAH.getCanvas(this.yourParty[i])) this.battleCanvas.drawDgmnCanvas(this.dgmnAH.getCanvas(this.yourParty[i]));
        if(this.dgmnAH.getCanvas(this.enemyParty[i])) this.battleCanvas.drawDgmnCanvas(this.dgmnAH.getCanvas(this.enemyParty[i]));
      }

      this.battleCanvas.paintCanvas(this.battleMenu.menuCanvas);
  
    // } else if(this.victoryMenu){
    } else if(this.dgmnGrowthMenu){
      // this.battleCanvas.paintCanvas(this.victoryMenu.menuCanvas);
      this.battleCanvas.paintCanvas(this.dgmnGrowthMenu.menuCanvas);
      
      for(let i = 0; i < 3; i++){
        this.battleCanvas.drawDgmnCanvas(this.dgmnAH.getCanvas(this.yourParty[i]));
      }
    }
    
    if(this.attackManager.attackCanvas) this.battleCanvas.paintCanvas(this.attackManager.attackCanvas);

    this.gameAH.refreshScreen();
  }

  /**------------------------------------------------------------------------
   * BUILD DGMN CANVASES
   * ------------------------------------------------------------------------
   * Creates all of the Cnavases for the Dgmn
   * These do not get added to the Object List
   * ------------------------------------------------------------------------
   * @param {Func}  fetchImageCB  Callback to fetch an image from the Img Handler
   * @param {Func}  drawBattleCanvasCB  Callback to draw Battle Canvas
   * ----------------------------------------------------------------------*/
   buildDgmnCanvases = () => {
     let dgmnList = this.yourParty.concat(this.enemyParty);
    for(let i = 0; i < dgmnList.length; i++){
      let isEnemy = dgmnList[i].charAt(0) === 'e';
      let dgmnData = this.dgmnAH.getDgmnData(dgmnList[i],['speciesName'],isEnemy);
      let battleLocation = !isEnemy ? i : i - 3;
      let dgmnImageList = [this.systemAH.fetchImage(`${dgmnData.speciesName.toLowerCase()}Idle0`),this.systemAH.fetchImage(`${dgmnData.speciesName.toLowerCase()}Idle1`)];
      this.dgmnAH.initDgmnCanvas(dgmnList[i],this.drawBattleCanvas,dgmnImageList,battleLocation);
      this.dgmnAH.startDgmnIdleAnimation(dgmnList[i]);
    }
  }

  /**------------------------------------------------------------------------
   * CHECK BATTLE CONDITIONS                                    [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Checks to see if the Battle is Over or not
   * ----------------------------------------------------------------------*/
   checkBattleCondition = () => {
     if(this.dgmnAH.checkAllDead(true)){
       return 'win';
     } else if(this.dgmnAH.checkAllDead(false)){
       return 'lose';
     } return 'ongoing'
   }

  /**------------------------------------------------------------------------
   * BATTLE WIN                                       
   * ------------------------------------------------------------------------
   * Handles the Events Triggered by Winning a Battle
   * ----------------------------------------------------------------------*/
  battleWin = () => {
    debugLog("BATTLE WON!");
    this.giveDgmnBaseXP();
    this.battleMenu.drawVictoryMessage();
    this.battleMenu.endBattle(this.battleRewards,this.battleBaseXP);
    // this.battleMenu = null;
  }
  
  /**------------------------------------------------------------------------
   * GIVE DGMN BASE XP                                  
   * ------------------------------------------------------------------------
   * Gives all of the DGMN in your Party (still alive) the XP earned from the
   * Battle
   * ----------------------------------------------------------------------*/
  giveDgmnBaseXP = () => {
    for(let i = 0; i < 3; i++){
      if(!this.getDgmnDataByIndex(i,['isDead'],false).isDead){ // If DGMN is Dead, do not reward
        this.dgmnAH.giveDgmnXP(this.yourParty[i],this.battleBaseXP);
      }
    }
  }

  /**------------------------------------------------------------------------
   * BATTLE LOSE                                       
   * ------------------------------------------------------------------------
   * Handles the Events Triggered by Losing a Battle
   * ----------------------------------------------------------------------*/
  battleLose = () => {
    debugLog("BATTLE LOST...");
    this.battleMenu.endBattle(); // TODO - Don't bypass the Dungeon End Screen
  }

  /**------------------------------------------------------------------------
   * END                                    
   * ------------------------------------------------------------------------
   * Ends the Battle
   * ----------------------------------------------------------------------*/
  end = () => {
    this.battleState = 'loading'
    this.systemAH.startLoading(()=>{
      this.gameAH.endBattle();
    })
  }

  stopDgmnBattleCanvas = () => {
    for(let i =0; i < 3; i++){
      this.dgmnAH.stopDgmnCanvas(this.yourParty[i])
    }
  }

    
  /**------------------------------------------------------------------------
   * CLOSE GROWTH MENU                                          [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Closes the Hatching Growth Menu and starts loading the Dungeon
   * ----------------------------------------------------------------------*/
  closeGrowthMenu = () => { this.end() }

  gotoRewards = () => {
    this.battleState = 'victory';
    this.battleMenu.menuCanvas.clearCanvas();
    this.battleMenu = null;
    this.stopDgmnBattleCanvas();  // Get rid of the Animating DGMN Party

    this.dgmnGrowthMenu = new DgmnGrowthMenu('victory',this.dgmnAH,this.isBoss,this.dungeonAH.getCurrentFloor(),this.systemAH,this.gameAH,this.battleAH,'victory');
        this.battleIO.setMenuAH(this.dgmnGrowthMenu.dgmnGrowthMenuAH);
    this.dgmnGrowthMenu.gotoRewards(this.battleRewards);
    // }
  }

  shootCannon = (item,target) => {this.cannonManager.shoot(item,'party',target,this.battleMenu.selectBeetleIcon)} // TODO - Fix

  /**------------------------------------------------------------------------
   * SELECT BOSS REWARD                              
   * ------------------------------------------------------------------------
   * When you press Action on a Boss Reward, this handles the action of 
   * giving the Reward to the DGMN and determining where to go next
   * ----------------------------------------------------------------------*/
  // selectBossReward = () => {
  //   // TODO - Move to a Const File
  //   let upgrades = ['FP','XP','EN'];
  //   let FPList = ['DR','NS','DS','JT','NA','ME','WG','VB']; // TODO - I need this list order normalized

  //   if(this.victoryMenu.bossRewardIndex === 2 && this.victoryMenu.levelUpDgmn.length === 0){ this.end()  // If you're on the last Reward, and there's no Level Ups, end the Battle
  //   } else{
  //     // If the Boss Reward is not FP OR if it is FP, the FP Selection Menu is Open...
  //     if(this.victoryMenu.subMenus.boss.currIndex !== 0 || (this.victoryMenu.subMenus.boss.currIndex === 0 && this.victoryMenu.subMenus.boss.inFPSelection)){
  //       let FP = this.victoryMenu.subMenus.boss.inFPSelection ? FPList[this.victoryMenu.subMenus.rewardFP.currIndex] : undefined;
  //       this.dgmnAH.giveUpgrade(this.yourParty[this.victoryMenu.bossRewardIndex],upgrades[this.victoryMenu.subMenus.boss.currIndex],FP);

  //       // Figure out where to go next: Boss Reward, First Level Up, Next Level Up
  //       if(this.victoryMenu.levelUpDgmn.length !== 0){
  //         if(this.victoryMenu.bossRewardIndex === 0){
  //           this.victoryMenu.gotoLevelUp();
  //         } else{ this.victoryMenu.gotoNextLevelUp(); }
  //         this.victoryMenu.bossRewardIndex++;
  //       } else { this.victoryMenu.nextBossReward(this.dungeonAH.getCurrentFloor()) }
  //     } else{ this.victoryMenu.launchBossRewardFPSelection() } // If the Boss Reward is FP, and the FP Selection Menu is NOT open
  //   }
  // }

  /**------------------------------------------------------------------------
   * ------------------------------------------------------------------------
   * GETTERS AND SETTERS                                        [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * ------------------------------------------------------------------------
   * All of the following methods are passed into the AH, to allow other
   * Classes to use them
   * ------------------------------------------------------------------------
   * ----------------------------------------------------------------------*/
  getDgmnValueByIndex = (isEnemy,dgmnIndex,value) => {
    let returnValue;
    if(!isEnemy){
      returnValue = this.yourParty[dgmnIndex][value];
    }

    return returnValue;
  }

  /**------------------------------------------------------------------------
   * GET DGMN DATA BY INDEX                                     [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Creates a Dgmn Data Object of only the properties you need
   * ----------------------------------------------------------------------*/
  getDgmnDataByIndex = (dgmnIndex,data,isEnemy = false) => {
    let dgmnId = isEnemy ? this.enemyParty[dgmnIndex] : this.yourParty[dgmnIndex];
    return this.dgmnAH.getDgmnData(dgmnId,data,isEnemy);
  }

  getDgmnAttackData = (dgmnIndex,data) => { return this.dgmnAH.getDgmnAttackData(this.yourParty[dgmnIndex],data) }

  // TODO - MIX THIS WITH PARTY CHOICE SHOULD CALL FROM DATA (And move to Utility)
  buildEnemyActions = () => {
    for(let enemy in this.enemyParty){
      // Randomly Select an Attack the Enemy Has
      let possibleAttacks = this.dgmnAH.getDgmnData(this.enemyParty[enemy],['attacks'],true).attacks;
      let attackChoice = possibleAttacks[Math.floor(Math.random() * possibleAttacks.length)].attackName;
      
      let action = this.attackUtility.getAttackData(attackChoice,['type','hits','targets','power','type','maxCost']);
        action.attackName = attackChoice;
        action.targetIndex = [Math.floor(Math.random() * 3)];
        action.attacker = enemy;
      
      this.addAction(enemy,true,action);
    }
  }

  /**------------------------------------------------------------------------
   * ADD ACTION                                                 [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Adds an Action to the Attack Manager, so it can be run during the combat
   * ----------------------------------------------------------------------*/
  addAction = (dgmnIndex,isEnemy,actionData) => {
    let convertedTargets;
    let actor = isEnemy ? this.enemyParty[dgmnIndex] : this.yourParty[dgmnIndex];
    let tempAction = actionData;
 
    if(!actionData.isDefend){
      if(isEnemy){
        convertedTargets = actionData.targetIndex.length === 1 ? [this.yourParty[actionData.targetIndex[0]]] : this.yourParty;
      } else{
        convertedTargets = actionData.targetIndex.length === 1 ? [this.enemyParty[actionData.targetIndex[0]]] : this.enemyParty;
      }

      tempAction.targets = convertedTargets;
    }

    this.attackManager.addAction(actor,tempAction);
  }

  // TODO - Might want to split out XP that comes directly from kills
  addRewards = speciesName => {
    this.battleRewards = this.battleRewards.concat(this.battleUtility.getRewards(speciesName));
    this.battleBaseXP += this.battleUtility.getXP(speciesName);
  }

  beginCombat = () => {
    debugLog("+ Begin Combat...");
    this.buildEnemyActions(); // TODO - Utility?
    debugLog("++ Action List = ",this.attackManager.attackActions);
    this.attackManager.attackLoop(this.calcTurnOrder()); // TODO - Callback function
  }

  getBattleState = () => { return this.battleState }
  
  getIsBoss = () => this.isBoss;

}

export default Battle;
