import config from "../config";
import { debugLog } from "../utils/log-utils";
import { inDebug } from "../utils/url-utils";
import BackgroundCanvas from "./background-canvas";
import GameCanvas from "./canvas";
import Controller from "./controller";
import DebugMenu from "./debug-menu";

/**------------------------------------------------------------------------
 * SYSTEM CLASS
 * ------------------------------------------------------------------------
 * A Virtual System, which handles things like Memory, Display, and Input
 * ----------------------------------------------------------------------*/
class System{
  constructor(){
    debugLog("Loading System...");
    this.controllers = [];
    this.keyState = {};

    this.systemScreen = document.getElementById('game-screen');
    this.systemScreen.style.width = (160 * config.screenSize)+'px';
    this.systemScreen.style.height = (144 * config.screenSize)+'px';
    this.debugMenu;

    this.gameTimer;
    this.systemCount = 0;
    this.actionQueue = [];

    this.screenCanvas = new GameCanvas('screen-canvas',160,144);
    this.backgroundCanvas = new BackgroundCanvas('background-canvas',160,144); // TODO - this should be loaded and then built

    this.subCanvases = [this.backgroundCanvas]; // TODO - this should be loaded
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
      this.debugMenu = new DebugMenu();
    }

    // Draw Canvases
    this.systemScreen.appendChild(this.screenCanvas.elem);
    
    this.backgroundCanvas.loadImages(images => {
      this.backgroundCanvas.imageStack = images;
      this.backgroundCanvas.animate(1000);
    });

    setTimeout(()=>{
      this.startGameTimer();
    },1000);
  }

  /**------------------------------------------------------------------------
   * START GAME TIMER
   * ------------------------------------------------------------------------
   * Handles all of the initial actions and starts the game timer
   * ----------------------------------------------------------------------*/
  startGameTimer = () => {
    this.gameTimer = setInterval( () => {
      this.systemCount++;
      this.screenCanvas.paintCanvas(this.backgroundCanvas.elem); // TODO - Should be a full compiler of all other canvases
      if(this.actionQueue.length > 0){
        if(this.actionQueue[0] === null){ /* SPACER */ } else{
          debugLog("Taking Action ",this.actionQueue[0]);
        }
        this.actionQueue.shift();
      }
    }, 20);
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
}

export default System;