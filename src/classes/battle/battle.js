import { debugLog } from "../../utils/log-utils";
import config from "../../config";
import DgmnUtility from "../dgmn/utility/dgmn.util";

import BattleAH from "../action-handlers/battle.ah";
import BattleUtility from "./utility/battle.util";
import BattleIO from "../input-output/battle.io";
import BattleCanvas from "./canvas/battle-canvas";
import BattleMenu from "./battle-menu";

import DgmnParty from "../dgmn/dgmn-party";
import BattleDgmnStatusCanvas from "./canvas/battle-dgmn-status-canvas";
import Dgmn from "../dgmn/dgmn";

class Battle {
  constructor(){ // TODO - Needs floor and mods to determine enemies
    this.battleActive = true;
    this.turn = 0;                            // Which Turn it currently is
    this.attackActions = {};                  // The Attacks for Each DGMN for the turn
    this.yourParty;                           // Your Dgmn : TODO - gameAH Reference to fetch this
    this.enemyParty = new DgmnParty([],true); // Enemies for the Battle

    // ACTION HANDLERS
    this.systemAH; this.gameAH; this.digiBeetleAH;
    this.dungeonAH; // TODO - We'll see if I need this, probably not
    this.battleAH = new BattleAH(this.drawBattleCanvas,this.paintToBattleCanvas,this.getDgmnDataByIndex,this.setCurrentMenuButton,this.getMenuChart);

    this.battleIO = new BattleIO(this.battleAH);  // Key Manager
    this.battleUtility = new BattleUtility();
    this.dgmnUtility = new DgmnUtility();

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

    this.yourParty = this.gameAH.getDgmnParty(); // TODO - Maybe don't call this, just call the Game AH?
    this.generateEnemyParty(); // TODO - Mocked for now, needs actual params for calculations
    this.initCanvas();
    this.loadBattleImages();

    debugLog("Your Party = ",this.yourParty.dgmnList);
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
  initAH = (systemAH,gameAH,dungeonAH,digiBeetleAH) => {
    this.systemAH = systemAH; this.gameAH = gameAH;
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

    let allDgmn = this.yourParty.dgmnList.concat(this.enemyParty.dgmnList);

    for(let dgmn of allDgmn){
      let allDgmnImages = this.dgmnUtility.getAllDgmnImages(dgmn.speciesName);
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
       * ----------------------------------------------------------------------*/ /* istanbul ignore next */
      onBattleImagesLoaded = () => {
        this.dgmnStatusCanvas = new BattleDgmnStatusCanvas('battle-dgmn-status',160,144);
        this.gameAH.addCanvasObject(this.battleCanvas);
        this.yourParty.buildDgmnCanvases(this.systemAH.fetchImage,this.drawBattleCanvas);
        this.enemyParty.buildDgmnCanvases(this.systemAH.fetchImage,this.drawBattleCanvas);
        this.battleMenu.init();
        this.drawAllStatuses();
        this.drawBattleCanvas();
        this.gameAH.refreshScreen();
      }

  /**------------------------------------------------------------------------
   * GENERATE ENEMY PARTY
   * ------------------------------------------------------------------------
   * Determines and creates the Enemy DGMN
   *  TODO - Replace with actual calculation
   * ----------------------------------------------------------------------*/
  generateEnemyParty = () => {
    // MOCK DATA
    this.enemyParty.dgmnList.push(new Dgmn('edId0','enemy','gabu'))
    this.enemyParty.dgmnList.push(new Dgmn('edId1','enemy','picoDevi'))
    this.enemyParty.dgmnList.push(new Dgmn('edId2','enemy','pulse'))
    this.enemyParty.dgmnList[0].isEnemy = true;
    this.enemyParty.dgmnList[1].isEnemy = true;
    this.enemyParty.dgmnList[2].isEnemy = true;
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
      let coord = [];
          coord[0] = (isEnemy ? 1 : 17);
          coord[1] = ((dgmnIndex * 4) + 2) + (stat === 'hp' ? 0 : 1);
      let currStat = !isEnemy ? this.yourParty.dgmnList[dgmnIndex][`current${stat.toUpperCase()}`] : 
                                this.enemyParty.dgmnList[dgmnIndex][`current${stat.toUpperCase()}`]; // TODO - Handle Enemy Calculation
      let maxStat = !isEnemy ? (stat === 'hp' ? this.yourParty.dgmnList[dgmnIndex].getMaxHP() : 100) : 
                               (stat === 'hp' ? this.enemyParty.dgmnList[dgmnIndex].getMaxHP() : 100);
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
   * ----------------------------------------------------------------------*/
  drawBattleCanvas = () => {
    this.battleCanvas.drawBattleBase(this.systemAH.fetchImage('battleBackground'));
    this.battleCanvas.paintCanvas(this.dgmnStatusCanvas);
    // TODO - Should definitely check for KO/Null before drawing a Dgmn Canvas
    for(let i = 0; i < 3; i++){
      this.battleCanvas.drawDgmnCanvas(this.yourParty.dgmnList[i].dgmnCanvas);
      this.battleCanvas.drawDgmnCanvas(this.enemyParty.dgmnList[i].dgmnCanvas);
    }

    this.battleCanvas.paintCanvas(this.battleMenu.menuCanvas);

    this.gameAH.refreshScreen();
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
      returnValue = this.yourParty.dgmnList[dgmnIndex][value];
    }

    return returnValue;
  }

  /**------------------------------------------------------------------------
   * GET DGMN DATA BY INDEX                                     [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Creates a Dgmn Data Object of only the properties you need
   * ----------------------------------------------------------------------*/
  getDgmnDataByIndex = (dgmnIndex,data) => {
    let dgmnData = {}
    let dgmn = this.yourParty.dgmnList[dgmnIndex];

    for(let attr of data){
      if(attr === 'portrait'){
        dgmnData.portrait = this.systemAH.fetchImage(`${dgmn.speciesName.toLowerCase()}Portrait`);
      } else { dgmnData[attr] = dgmn[attr]; }
      
    }

    return dgmnData;
  }

  setCurrentMenuButton = label => { this.battleMenu.setCurrentButton(label) }
  getMenuChart = () => { return this.battleMenu.menuChart }

}

export default Battle;
