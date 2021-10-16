import { debugLog } from "../utils/log-utils";
import Battle from "./battle";
import GameCanvas from "./canvas";
import Dgmn from "./dgmn";

import config from "../config";

// TODO - There has to be a better way to mock this stuff up...
const mockDgmn = [
  new Dgmn(0, 'FLARE', 'Agu',5,0),
  new Dgmn(1, 'BLITZ', 'Grey',10,1),
  new Dgmn(2, 'FROST', 'Gabu',5,2),
];
const mockEnemyDgmn = [new Dgmn(0,'ENEMY','Agu',5,0,true)];

/**------------------------------------------------------------------------
 * GAME
 * ------------------------------------------------------------------------
 * Manager for all Game Elements, which includes most things
 * ------------------------------------------------------------------------
 * @param {Function} loadImageCallback  Callback used by the System to load Images
 * @param {Function} fetchImageCallback Gets an image from the System
 * ----------------------------------------------------------------------*/
class Game{
  constructor(loadImageCallback,fetchImageCallback){
    debugLog('Game Created...');
    this.battle;                              // Init Battle (cleared and created by Game Logic)

    this.gameCanvas =                         // Canvas Every in-game Element is drawn on
      new GameCanvas('game-canvas',160,144);  

    this.keyState = {};                      // Sent in from System, holds true/false value for all Keys Pressed
    this.keyTimers = {                       // Keeps track of how many ms each action has been held
      action: 0, cancel: 0,
      up: 0, right: 0, down: 0, left: 0,
      start: 0, select: 0
    }

    this.objectList = [];                    // All of the Images to be drawn on the Game Canvas

    this.loadImages = (imageList,callback) => { loadImageCallback(imageList,callback) }
    this.fetchImage = imageName => { return fetchImageCallback(imageName) }
  }

  /**------------------------------------------------------------------------
   * BOOT GAME
   * ------------------------------------------------------------------------
   * Start the Game
   * Runs all functionality that would boot a game up (load screen, company, etc.)
   * ----------------------------------------------------------------------*/
  bootGame = () => {
    // TODO - Once the game is more fleshed-out, run through this, rather than debuggers
  }

  /**------------------------------------------------------------------------
   * KEY HANDLER
   * ------------------------------------------------------------------------
   * Run by the Game Timer, sends all needed key inputs into the Manager
   * ------------------------------------------------------------------------
   * @param {Object} keyState The true/false values for all pressed keys
   * ----------------------------------------------------------------------*/
  keyHandler = keyState => {

    if(keyState[config.keyBindings.action]){ this.keyManager('action')
    } else { this.keyTimers.action = 0 }

    if(keyState[config.keyBindings.cancel]){ this.keyManager('cancel')
    } else { this.keyTimers.cancel = 0 }

    if(keyState[config.keyBindings.up]){
      console.log("UP");
    }
    
    if(keyState[config.keyBindings.right]){ this.keyManager('right')
    } else { this.keyTimers.right = 0 }
    
    if(keyState[config.keyBindings.down]){
      console.log("DOWN");
    }
    
    if(keyState[config.keyBindings.left]){ this.keyManager('left')
    } else { this.keyTimers.left = 0 }
  }

  /**------------------------------------------------------------------------
   * KEY MANAGER
   * ------------------------------------------------------------------------
   * Takes the action from a key and takes the proper action, depending on
   *   current Game state
   * ------------------------------------------------------------------------
   * @param {String} key  Not the event listener Key, but the System Action Key
   * ----------------------------------------------------------------------*/
  keyManager = key => {
    this.keyTimers[key]++;
    // DGMN MENU
    if(this.battle.battleActive){
        if(this.keyTimers[key] === 2){ // Prevent instant tap from taking action
          this.battle.keyTriage(key);
        }
        if((key === 'right' || key === 'left' || key === 'down' || key === 'up') && this.keyTimers[key] > 15){ // Only directions can be held to take action
          this.keyTimers[key] = 0;
        }
    }
  }

  /**------------------------------------------------------------------------
   * START BATTLE
   * ------------------------------------------------------------------------
   * Gathers up needed data and starts a battle.
   * TODO - Currently, a lot of this is mocked up and will eventually
   *        need to pull from the proper sources
   * ----------------------------------------------------------------------*/
  startBattle = () => {
    debugLog("Starting Battle...");
    // TODO - ALL OF THIS IS TEMP RIGHT NOW
    this.battle = new Battle(mockDgmn,mockEnemyDgmn,this.onBattleLoad,this.addToObjectList,this.drawGameScreen,this.loadImages,this.fetchImage);
  }

  /**------------------------------------------------------------------------
   * ON BATTLE LOAD
   * ------------------------------------------------------------------------
   * Sent into the Battle as a Callback.
   * Runs whenever the Battle returns that it has been fully loaded
   * ----------------------------------------------------------------------*/
  onBattleLoad = () => {
    console.log("Battle Loaded...");
    this.drawGameScreen();
  }

  /**------------------------------------------------------------------------
   * ADD TO OBJECT LIST
   * ------------------------------------------------------------------------
   * Sent into parts of the Game as a Callback.
   * Adds an object to the draw array, so that it will paint on the Screen
   * ------------------------------------------------------------------------
   * @param {Object} newObject  New item to add to the list
   * ----------------------------------------------------------------------*/
  addToObjectList = newObject => {
    this.objectList.push(newObject);
  }

  /**------------------------------------------------------------------------
   * DRAW GAME SCREEN
   * ------------------------------------------------------------------------
   * Sent into parts of the Game as a Callback.
   * Triggers a Canvas Paint of every object in the Object List
   * ----------------------------------------------------------------------*/
  drawGameScreen = () => {
    this.gameCanvas.clearCanvas();
    for(let obj of this.objectList){
      this.gameCanvas.paintCanvas(obj);
    }
  }
}

export default Game;