import { debugLog } from "../../utils/log-utils";
import config from "../../config";
import DgmnUtility from "../dgmn/utility/dgmn.util";

import BattleAH from "../action-handlers/battle.ah";
import BattleUtility from "./utility/battle.util";
import BattleIO from "../input-output/battle.io";
import BattleCanvas from "./canvas/battle-canvas";

import DgmnParty from "../dgmn/dgmn-party";

class Battle {
  constructor(){
    this.turn = 0;                      // Which Turn it currently is
    this.attackActions = {};            // The Attacks for Each DGMN for the turn
    this.yourParty;                     // Your Dgmn : TODO - gameAH Reference to fetch this
    this.enemyParty = new DgmnParty();  // Enemies for the Battle

    // ACTION HANDLERS
    this.systemAH; this.gameAH; this.digiBeetleAH;
    this.dungeonAH; // TODO - We'll see if I need this, probably not
    this.battleAH = new BattleAH(this.drawBattleCanvas);

    this.battleIO = new BattleIO(this.battleAH);  // Key Manager
    this.battleUtility = new BattleUtility();
    this.dgmnUtility = new DgmnUtility();

    this.battleCanvas;
  }

  /**------------------------------------------------------------------------
   * INITIALIZE
   * ------------------------------------------------------------------------
   * Kicks things off
   *   TODO - Will I need this, or would I rather the Game directly call generateBattle?
   * ----------------------------------------------------------------------*/
  init = () => {
    debugLog("Building New Battle...");

    this.yourParty = this.gameAH.getDgmnParty(); // TODO - Maybe don't call this, just call the Game AH?
    this.initCanvas();
    this.buildDgmnCanvases();
    this.loadBattleImages();

    debugLog("Your Party = ",this.yourParty);
  }

  /**------------------------------------------------------------------------
   * INITIALIZE CANVAS
   * ------------------------------------------------------------------------
   * Sets up the Floor Canvas
   * ----------------------------------------------------------------------*/
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

    for(let dgmn of this.yourParty){ // TODO - For now, this is an array
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
        this.gameAH.addCanvasObject(this.battleCanvas);
        this.startDgmnAnimations();
        // this.battleCanvas.drawBattleBase(this.systemAH.fetchImage('battleBackground'));
        this.drawBattleCanvas();
        this.gameAH.refreshScreen();
      }

  /**------------------------------------------------------------------------
   * BUILD DGMN CANVASES
   * ------------------------------------------------------------------------
   * Creates all of the Cnavases for the Dgmn
   * These do not get added to the Object List
   * ----------------------------------------------------------------------*/
  buildDgmnCanvases = () => {
    for(let dgmn of this.yourParty){
      dgmn.initCanvas(this.gameAH.refreshScreen);
    }
  }

  startDgmnAnimations = () => {
    for(let dgmn of this.yourParty){
      // TODO - These should not be at this level, but in the Dgmn Class
      // dgmn.dgmnCanvas.
      dgmn.dgmnCanvas.animate(2000); // TODO - Based on DGMN SPD Stat
    }
  }

  /**------------------------------------------------------------------------
   * GENERATE ENEMY PARTY
   * ------------------------------------------------------------------------
   * Determines and creates the Enemy DGMN
   * ----------------------------------------------------------------------*/
  generateEnemyParty = () => {

  }

  /**------------------------------------------------------------------------
   * REDRAW BATTLE CANVAS                                       [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Redraws all of the Battle Canvas Elements
   * ----------------------------------------------------------------------*/
  drawBattleCanvas = () => {
    this.battleCanvas.drawBattleBase(this.systemAH.fetchImage('battleBackground'));
    this.battleCanvas.drawDgmnCanvas(this.yourParty[0].dgmnCanvas);
  }


}

export default Battle;
