import { debugLog } from "../../utils/log-utils";
import config from "../../config";
import DgmnUtility from "../dgmn/utility/dgmn.util";

import BattleAH from "../action-handlers/battle.ah";
import BattleUtility from "./utility/battle.util";
import BattleIO from "../input-output/battle.io";
import BattleCanvas from "./canvas/battle-canvas";
import BattleMenu from "./menus/battle-menu";
import AttackManager from "./attack-manager";
import TextArea from "../text-area";

import DgmnParty from "../dgmn/dgmn-party";
import BattleDgmnStatusCanvas from "./canvas/battle-dgmn-status-canvas";
import Dgmn from "../dgmn/dgmn";

class Battle {
  constructor(){ // TODO - Needs floor and mods to determine enemies
    this.battleActive = true;
    this.turn = 0;                               // Which Turn it currently is
    this.yourParty;                              // Your Dgmn : TODO - gameAH Reference to fetch this
    this.enemyParty = ['edId0','edId1','edId2']; // Enemies for the Battle TODO - Should be generated

    this.menuState = 'battle';
    this.currDgmnChoice = 0;
    this.attackChoice;

    // ACTION HANDLERS
    this.systemAH; this.gameAH; this.digiBeetleAH;
    this.dungeonAH; // TODO - We'll see if I need this, probably not

    // TODO - Make sure all of these are used and can't be moved elsewhere
    this.battleAH = new BattleAH({
      drawBattleCanvasCB: this.drawBattleCanvas,
      paintToBattleCanvasCB: this.paintToBattleCanvas,
      getDgmnDataByIndexCB: this.getDgmnDataByIndex,
      selectAttackCB: this.selectAttack,
      addActionCB: this.addAction,
      setCurrentAttackTargetCB: this.setCurrentAttackTarget,
      getDgmnAttackDataCB: this.getDgmnAttackData,
      getCurrDgmnChoiceCB: this.getCurrDgmnChoice,
      beginCombatCB: this.beginCombat,
      drawActionTextCB: this.drawActionText,
      drawDgmnStatusMeterCB: this.drawDgmnStatusMeter,
      drawAllStatusesCB: this.drawAllStatuses,
      newTurnCB: this.newTurn,
      checkBattleConditionCB: this.checkBattleCondition,
      battleWinCB: this.battleWin,
      battleLoseCB: this.battleLose
    });

    this.battleIO = new BattleIO(this.battleAH);  // Key Manager
    this.battleUtility = new BattleUtility();
    this.dgmnUtility = new DgmnUtility();

    this.attackManager = new AttackManager();

    this.battleCanvas;
    this.dgmnStatusCanvas;
    this.battleMenu;
  }

  /**------------------------------------------------------------------------
   * INITIALIZE
   * ------------------------------------------------------------------------
   * Kicks things off
   *   TODO - Will I need this, or would I rather the Game directly call generateBattle?
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  init = () => {
    debugLog("Building New Battle...");

    this.battleMenu = new BattleMenu(this.systemAH,this.gameAH,this.battleAH);
    this.battleIO.setMenuAH(this.battleMenu.battleMenuAH);
    this.attackManager.battleMenuAH = this.battleMenu.battleMenuAH;

    this.yourParty = this.gameAH.getDgmnParty();
    this.generateEnemyParty(); // TODO - Mocked for now, needs actual params for calculations
    this.initCanvas();
    this.loadBattleImages();

    debugLog("Your Party = ",this.yourParty);
  }

  /**------------------------------------------------------------------------
   * INITIALIZE CANVAS
   * ------------------------------------------------------------------------
   * Sets up the Floor Canvas
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
    this.DungeonAH = dungeonAH; this.digiBeetleAH = digiBeetleAH;
    this.attackManager.initAH(this.systemAH,this.battleAH,this.dgmnAH);
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
   * INITIALIZE DGMN CHOICE
   * ------------------------------------------------------------------------
   * Sets up everything for a certain Dgmn's "Choice".
   *  Choice refers to when it's their turn to choose an Action
   * ----------------------------------------------------------------------*/
  initDgmnChoice = () => {
    this.battleMenu.setCurrentDgmn(this.currDgmnChoice);
  }

  newTurn = () => {
    this.turn++;
    this.battleMenu.newTurn();
  }

  /**------------------------------------------------------------------------
   * GOTO NEXT CHOICE
   * ------------------------------------------------------------------------
   * Sets things up for the next Dgmn to choose their Action
   * ----------------------------------------------------------------------*/
  gotoNextChoice = () => {
    this.currDgmnChoice++;
    if(this.currDgmnChoice >= 3){
      console.log("BEGIN ACTIONS");
    } else{
      this.initDgmnChoice();
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
    this.dgmnAH.generateEnemies();
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
        let currSPD = this.dgmnAH.getDgmnData(order[r],['currentStats'],order[r].charAt(0) === 'e').currentStats.SPD;
        let nextSPD = this.dgmnAH.getDgmnData(order[r+1],['currentStats'],order[r+1].charAt(0) === 'e').currentStats.SPD;
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
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
    drawAllStatuses = () => {
      for(let i = 0; i < 3; i++){
        this.drawDgmnStatusMeter(false,i,'hp');
        this.drawDgmnStatusMeter(false,i,'en');
        this.drawDgmnStatusMeter(true,i,'hp');
        this.drawDgmnStatusMeter(true,i,'en');
      }
    }

  /**------------------------------------------------------------------------
   * DRAW DGMN STATUS METER                                     
   * ------------------------------------------------------------------------
   * Updates the HP or EN meter for a specific DGMN
   * ------------------------------------------------------------------------
   * @param {Boolean} isEnemy   True if Dgmn is an Enemy
   * @param {Number}  dgmnIndex Spot the Dgmn is in
   * @param {String}  stat      Which meter [hp|en]
   * ----------------------------------------------------------------------*/
    drawDgmnStatusMeter = (isEnemy,dgmnIndex,stat) => {
      let dgmnData = !isEnemy ? this.dgmnAH.getDgmnData(this.yourParty[dgmnIndex],[`current${stat.toUpperCase()}`,'currentStats']) :
                                this.dgmnAH.getDgmnData(this.enemyParty[dgmnIndex],[`current${stat.toUpperCase()}`,'currentStats'],true);
      let coord = [];
          coord[0] = (isEnemy ? 1 : 17);
          coord[1] = ((dgmnIndex * 4) + 2) + (stat === 'hp' ? 0 : 1);
      let currStat = dgmnData[`current${stat.toUpperCase()}`];
      let maxStat = stat === 'hp' ? dgmnData.currentStats.HP : 100;
      this.dgmnStatusCanvas.drawDgmnStatusMeter(coord,
                                                [this.systemAH.fetchImage('dgmnBarLightGreen'),this.systemAH.fetchImage('dgmnBarDarkGreen')],
                                                this.battleUtility.calculateMeterLength(currStat,maxStat));
    }

  /**------------------------------------------------------------------------
   * PAINT TO BATTLE CANVS                                      [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Paints an Image on the Battle Canvas. Used as a Callback
   * TODO - Check if this gets used
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  paintToBattleCanvas = (image,x,y) => {
    this.battleCanvas.paintImage(image,x,y);
  }

  drawActionText = (species,message) => {
    this.battleMenu.drawActionText(species,message);
  }

  /**------------------------------------------------------------------------
   * REDRAW BATTLE CANVAS                                       [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Redraws all of the Battle Canvas Elements
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  drawBattleCanvas = () => {
    this.battleCanvas.drawBattleBase(this.systemAH.fetchImage('battleBackground'));
    this.battleCanvas.paintCanvas(this.dgmnStatusCanvas);
    // TODO - Should definitely check for KO/Null before drawing a Dgmn Canvas
    for(let i = 0; i < 3; i++){
      this.battleCanvas.drawDgmnCanvas(this.dgmnAH.getCanvas(this.yourParty[i]));
      this.battleCanvas.drawDgmnCanvas(this.dgmnAH.getCanvas(this.enemyParty[i]));
    }

    this.battleCanvas.paintCanvas(this.battleMenu.menuCanvas);
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
   * LAUNCH TARGET SELECT                                       [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Puts the target cursor at an enemy target
   * ----------------------------------------------------------------------*/
   setCurrentAttackTarget = dir => {
     if(dir){
      this.battleMenu.setCurrentAttackTarget(this.attackChoice.targets,dir);
     }else{
      this.battleMenu.setCurrentAttackTarget(this.attackChoice.targets);
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

   battleWin = () => {
     debugLog("BATTLE WON!");
     this.battleMenu.endBattle(); // TODO - Don't bypass the Victory Screen
     this.end();
   }

   battleLose = () => {
     debugLog("BATTLE LOST...");
     this.battleMenu.endBattle(); // TODO - Don't bypass the Dungeon End Screen
   }

   end = () => {
     this.gameAH.endBattle();
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

  getCurrDgmnChoice = () => { return this.currDgmnChoice }
 
  selectAttack = () => { this.attackMenu.selectAttack() } // TODO - Likely don't need


  addAction = (dgmnIndex,attackName,attackTargets,attackPower,isEnemy) => {
    let convertedTargets;
    let attacker = isEnemy ? this.enemyParty[dgmnIndex] : this.yourParty[dgmnIndex];

    if(isEnemy){
      convertedTargets = attackTargets.length === 1 ? [this.yourParty[attackTargets[0]]] : this.yourParty;
    } else{
      convertedTargets = attackTargets.length === 1 ? [this.enemyParty[attackTargets[0]]] : this.enemyParty;
    }

    this.attackManager.addAction(attacker,attackName,attackTargets,convertedTargets,attackPower);
  }

  beginCombat = () => {
    debugLog("+ Begin Combat...");
    debugLog("++ Action List = ",this.attackManager.attackActions);
    this.attackManager.attackLoop(this.calcTurnOrder()); // TODO - Callback function
  }

}

export default Battle;
