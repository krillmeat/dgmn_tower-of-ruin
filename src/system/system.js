import config from "../config";
import { debugLog } from "../utils/log-utils";
import { inDebug } from "../utils/url-utils";
import Game from "../classes/game";
import GameCanvas from "../classes/canvas";
import Controller from "../classes/controller";
import DebugMenu from "../classes/debug-menu";
import ImageHandler from "../classes/image-handler";
import { fontImages, genericImages, loadingImages } from "../data/images.db";
import { fontImages as globalFontImages} from "../data/font.db";
import SystemAH from "../classes/action-handlers/system.ah";
import LoadManager from "../classes/load-manager";

/**------------------------------------------------------------------------
 * SYSTEM CLASS
 * ------------------------------------------------------------------------
 * A Virtual System, which handles things like Memory, Display, and Input
 * ----------------------------------------------------------------------*/
class System{
  constructor(){
    this.systemAH = new SystemAH(this.loadImage,this.fetchImage,this.startLoading,this.stopLoading); // TODO -Switch to Callback Object

    this.controllers = [];                                            // Controllers Handle Inputs
    this.keyState = {};                                               // Key-Value Pairs for all Active and Inactive Pairs

    this.systemScreen = document.getElementById('game-screen');       // Screen Element
    this.systemScreen.style.width = (160 * config.screenSize)+'px';   //
    this.systemScreen.style.height = (144 * config.screenSize)+'px';  // 
    this.debugMenu;                                                   // Menu Used for running things in Debug

    this.imageHandler = new ImageHandler();                           // Handles Image Loading and Fetching | TODO - Rename to Manager
    this.loadManager = new LoadManager(this.systemAH);                // Handles Load Screens

    this.gameTimer;                                                   // Interval that handles everything
    this.systemCount = 0;                                             // Used by the Interval
    this.actionQueue = [];                                            // TODO - I'm not sure I'm using this method anymore

    this.screenCanvas = new GameCanvas('screen-canvas',160,144);      // Root Canvas Instance (this is the only true Canvas we see)
    this.game = new Game(this.systemAH);                              // Game Being Loaded | TODO - In the future, should be dynamic
    this.subCanvases = [this.backgroundCanvas];                       // All of the Canvases being rendered currently | TODO - Backgorund Canvas should be loaded

    this.buildFontImages();
  }

  /**------------------------------------------------------------------------
   * START
   * ------------------------------------------------------------------------
   * Starts the System
   * ----------------------------------------------------------------------*/
  start = () => {
    debugLog("Starting System...");
    this.pluginController();
    if(inDebug()){
      this.debugMenu = new DebugMenu(this.game.startBattle,this.game.buildDungeon);
    }

    // Load Base Images - Run game once that is all done
    this.imageHandler.addToQueue(genericImages.concat(fontImages).concat(loadingImages),()=>{ 
      this.game.bootGame(); // TODO - Eventually, this needs to wait until loaded to take actions

      this.systemScreen.appendChild(this.screenCanvas.elem);

      setTimeout(()=>{ this.startGameTimer();
      },1000);
    })
  }

  /**------------------------------------------------------------------------
   * PAINT TO SCREEN
   * ------------------------------------------------------------------------
   * Draw a Canvas to the System Screen
   * ------------------------------------------------------------------------
   * @param {Canvas}  canvas  Canvas Elem to be painted
   * ----------------------------------------------------------------------*/
  paintToScreen = canvas => {
    this.screenCanvas.clearCanvas();
    this.screenCanvas.paintCanvas(canvas);
  }

  startLoading = callback => {
    this.loadManager.load(callback);
  }

  stopLoading = () => {
    this.loadManager.stop();
  }

  /**------------------------------------------------------------------------
   * START GAME TIMER
   * ------------------------------------------------------------------------
   * Handles all of the initial actions and starts the game timer
   * ----------------------------------------------------------------------*/
  startGameTimer = () => {
    this.gameTimer = setInterval( () => {
      
      // try{
        this.systemCount++;
        this.game.keyHandler(this.keyState);
        this.screenCanvas.paintCanvas(this.game.gameCanvas); // TODO - Should be a full compiler of all other canvases
        if(this.loadManager.isLoading) this.screenCanvas.paintCanvas(this.loadManager.loadCanvas);
        if(this.actionQueue.length > 0){
          if(this.actionQueue[0] === null){ /* SPACER */ } else{
            debugLog("Taking Action ",this.actionQueue[0]);
          }
          this.actionQueue.shift();
        }
      // } catch(e){ console.log("GAME ERROR! - ",e.message); clearInterval(this.gameTimer) }

    }, 33);
  }

  addToActionQueue = action => {
    this.actionQueue.push(action);
  }

  buildFontImages = () => {
    for(let imgURL of fontImages){
      let image = new Image();
          image.src = `./sprites/${config.pixelKidMode}/${imgURL}.png`;
      globalFontImages.push(image);
    }
  }

  /**------------------------------------------------------------------------
   * SET KEY STATE
   * ------------------------------------------------------------------------
   * The System Listens for Inputs from the Controller and sets the overall
   *   Key State for the Game
   * TODO - This should not be taking in a "Key", but rather an action that
   *        is mapped to a key by the Config file
   * ------------------------------------------------------------------------
   * @param {String} key    The Key that was pressed
   * @param {Boolean} value Whether the key is down or not
   * ----------------------------------------------------------------------*/
  setKeyState = (key, value) => {
    this.keyState[key] = value;
  }

  /**------------------------------------------------------------------------
   * PLUG IN CONTROLLER
   * ------------------------------------------------------------------------
   * Plugs a Virtual Controller into the System
   * For now, there's only one player at a time
   * ----------------------------------------------------------------------*/
  pluginController = () => {
    this.controllers.push(new Controller(this.setKeyState.bind(this)));
  }

  // this.imageHandler.addToQueue.bind(this), imageName => { return this.imageHandler.fetchImage(imageName) }
  loadImage = (images,callback) => {
    this.imageHandler.addToQueue(images,callback);
  }

  fetchImage = imageName => {
    return this.imageHandler.fetchImage(imageName);
  }
}

export default System;