import config from "../config";
import { debugLog } from "../utils/log-utils";
import { inDebug } from "../utils/url-utils";
import Game from "./game";
import BackgroundCanvas from "./background-canvas";
import Battle from './battle/battle';
import GameCanvas from "./canvas";
import Controller from "./controller";
import DebugMenu from "./debug-menu";
import ImageHandler from "./image-handler";
import { fontImages, genericImages, loadingImages } from "../data/images.db";
import { fontImages as globalFontImages} from "../data/font.db";
import SystemAH from "./action-handlers/system.ah";
import LoadManager from "./load-manager";

/**------------------------------------------------------------------------
 * SYSTEM CLASS
 * ------------------------------------------------------------------------
 * A Virtual System, which handles things like Memory, Display, and Input
 * ----------------------------------------------------------------------*/
class System{
  constructor(){
    debugLog("Loading System...");

    this.systemAH = new SystemAH(this.loadImage,this.fetchImage,this.startLoading,this.stopLoading)

    this.controllers = [];
    this.keyState = {};

    this.systemScreen = document.getElementById('game-screen');
    this.systemScreen.style.width = (160 * config.screenSize)+'px';
    this.systemScreen.style.height = (144 * config.screenSize)+'px';
    this.debugMenu;

    this.imageHandler = new ImageHandler();
    this.loadManager = new LoadManager(this.systemAH);

    this.gameTimer;
    this.systemCount = 0;
    this.actionQueue = [];

    this.screenCanvas = new GameCanvas('screen-canvas',160,144);
    this.game = new Game(this.systemAH);
    this.subCanvases = [this.backgroundCanvas]; // TODO - this should be loaded

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