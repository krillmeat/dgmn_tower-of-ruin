import { debugLog } from "../../utils/log-utils";
import config from "../../config";
import DgmnUtility from "../dgmn/utility/dgmn.util";

import BattleAH from "../action-handlers/battle.ah";
import BattleUtility from "./utility/battle.util";
import BattleIO from "../input-output/battle.io";
import BattleCanvas from "./canvas/battle-canvas";
import BattleMenu from "./menus/battle-menu";
import AttackMenu from "../menu/attack-menu";
import AttackManager from "./attack-manager";

import DgmnParty from "../dgmn/dgmn-party";
import BattleDgmnStatusCanvas from "./canvas/battle-dgmn-status-canvas";
import Dgmn from "../dgmn/dgmn";

class Battle {
  constructor(){ // TODO - Needs floor and mods to determine enemies
    this.battleActive = true;
    this.turn = 0;                            // Which Turn it currently is
    this.yourParty;                           // Your Dgmn : TODO - gameAH Reference to fetch this
    this.enemyParty = ['edId0','edId1','edId2']; // Enemies for the Battle TODO - Should be generated

    this.menuState = 'battle';
    this.currDgmnChoice = 0;
    this.attackChoice;

    // ACTION HANDLERS
    this.systemAH; this.gameAH; this.digiBeetleAH;
    this.dungeonAH; // TODO - We'll see if I need this, probably not

    this.battleAH = new BattleAH({
      drawBattleCanvasCB: this.drawBattleCanvas,
      paintToBattleCanvasCB: this.paintToBattleCanvas,
      getDgmnDataByIndexCB: this.getDgmnDataByIndex,
      selectAttackCB: this.selectAttack,
      selectTargetCB: this.selectTarget,
      setCurrentAttackTargetCB: this.setCurrentAttackTarget,
      getDgmnAttackDataCB: this.getDgmnAttackData,
      getCurrDgmnChoiceCB: this.getCurrDgmnChoice
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
    // this.enemyParty.dgmnAH = this.dgmnAH;
    // MOCK DATA
    // this.enemyDgmn.allDgmn.edId0.isEnemy = true;
    // this.enemyDgmn.allDgmn.edId1.isEnemy = true;
    // this.enemyDgmn.allDgmn.edId2.isEnemy = true;
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
   * LAUNCH ATTACK SELECT                                       [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Creates the Attack Select Menu
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  // launchAttackSelect = () => {
  //   this.menuState = 'attack-list';
  //   this.attackMenu = new AttackMenu(2,this.systemAH,this.gameAH,this.battleAH);
  //   this.attackMenu.init(this.dgmnAH.getDgmnAttackData(this.yourParty[this.currDgmnChoice],['displayName','currCost','maxCost','type','power','hits','targets']));
  //   this.battleMenu.menuChart.level = 'attack-select';
  // }

  /**------------------------------------------------------------------------
   * LAUNCH TARGET SELECT                                       [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * After choosing your attack, launches the selector for Attack target
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
   launchTargetSelect = attackData => {
     console.log("Launch Target Select for ",attackData.displayName);
     this.attackChoice = attackData;
     this.attackMenu = undefined;
     this.menuState = 'target-select';
     this.setCurrentAttackTarget();
     this.drawBattleCanvas();
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
  getDgmnDataByIndex = (dgmnIndex,data) => {
    return this.dgmnAH.getDgmnData(this.yourParty[dgmnIndex],data);
  }

  getDgmnAttackData = (dgmnIndex,data) => { return this.dgmnAH.getDgmnAttackData(this.yourParty[dgmnIndex],data) }

  getCurrDgmnChoice = () => { return this.currDgmnChoice }
 
  selectAttack = () => { this.attackMenu.selectAttack() }
  selectTarget = () => { 
    this.attackManager.addAction(); 
    this.gotoNextChoice();
  }

  menuInput = dir => {
    console.log("MENU INPUT = ",dir);
  }

}

export default Battle;
