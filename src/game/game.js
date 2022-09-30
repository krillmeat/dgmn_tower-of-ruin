import { debugLog } from "../utils/log-utils";
import DgmnManager from "../classes/dgmn/dgmn-manager";
import DigiBeetle from "../classes/digibeetle";
import Battle from "../classes/battle/battle";
import Dungeon from "../classes/dungeon/dungeon";
import GameCanvas from "../classes/canvas";

import config from "../config";
import GameAH from "./game.ah";
import TitleMenu from "../classes/title/title-menu";

/**------------------------------------------------------------------------
 * GAME
 * ------------------------------------------------------------------------
 * Manager for all Game Elements
 * ------------------------------------------------------------------------
 * @param {SystemAH}  systemAH
 * ----------------------------------------------------------------------*/
class Game{
  constructor(systemAH){
    debugLog('Game Created...');

    // TODO - Split this into a cbObj
    this.gameAH = new GameAH(this.addToObjectList,this.drawGameScreen,this.startBattle,this.getDgmnParty,this.endBattle,this.buildDungeon,this.startNewGame);
    this.systemAH = systemAH;                                   // Action Handlers used by this Class

    this.yourDgmn = new DgmnManager(this.systemAH);             // All of your Dgmn (party, reserves, etc.)
    this.yourParty = this.yourDgmn.party;                       // Your current Party of Dgmn (possible to be empty)

    this.titleMenu = new TitleMenu(this.systemAH,this.gameAH);  // Initial Menu at the Boot of the Game
    this.atTitle = true;                                        // TODO - Find a way to not have this here (move to Title Menu)
    this.battle; this.dungeon;                                  // Major Components inside of the Game

    this.gameCanvas = new GameCanvas('game-canvas',160,144);    // Everything inside of the Game is drawn here  
    this.objectList = [];                                       // All of the Canvases inside of the Game that should be drawn at a given time

    this.keyState = {};                                         // Sent in from System, holds true/false value for all Keys Pressed
    this.keyTimers = {                                          // Keeps track of how many MS each action has been held
      action: 0, cancel: 0,
      up: 0, right: 0, down: 0, left: 0,
      start: 0, select: 0
    }
  }

  /**------------------------------------------------------------------------
   * BOOT GAME
   * ------------------------------------------------------------------------
   * Start the Game
   * Runs all functionality that would boot a game up (load screen, company, etc.)
   * ----------------------------------------------------------------------*/
  bootGame = () => {
    // TODO - Don's skip straight to Title, show some fanfare
    this.buildTitleScreen();
  }

  /**------------------------------------------------------------------------
   * BUILD TITLE SCREEN
   * ------------------------------------------------------------------------
   * Builds the initial Title Screen (Main Menu)
   * ----------------------------------------------------------------------*/
  buildTitleScreen = () => {
    this.titleMenu.init();
    this.addToObjectList(this.titleMenu.menuCanvas);
    this.drawGameScreen();
  }

  /**------------------------------------------------------------------------
   * START NEW GAME
   * ------------------------------------------------------------------------
   * Starts the sequence for creating a New Game File
   * ----------------------------------------------------------------------*/
  startNewGame = () => {
    this.atTitle = false;
    setTimeout(()=>{ this.buildDungeon() },500);
  }

  /**------------------------------------------------------------------------
   * START BATTLE                                               [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Gathers up needed data and starts a battle.
   * ----------------------------------------------------------------------*/
  startBattle = () => {
    debugLog("Starting Battle...");
    this.battle = new Battle(this.dungeon.floor.isBossFloor,this.dungeon.floor.number);
    this.battle.initAH(this.systemAH,this.gameAH,this.yourDgmn.dgmnAH,this.dungeon?.dungeonAH,()=>{}); // TODO - Missing BeetleAH
    this.battle.init();
  }

  /**------------------------------------------------------------------------
   * END BATTLE                                                 [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Ends a Battle and gets things back to the proper Dungeon State
   * ----------------------------------------------------------------------*/
   endBattle = () => {
    debugLog("Ending Battle...");
    this.removeFromObjectList(this.battle.battleCanvas);
    this.battle = null;

    setTimeout(()=>{ this.systemAH.stopLoading(); },1000);
    setTimeout(()=>{ this.dungeon.dungeonState = 'free' },2000)
  }
  
  /**------------------------------------------------------------------------
   * BUILD DUNGEON                                              [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Gathers up needed data and creates a new Dungeon
   *   TODO - Also creates a new DigiBeetle, but this should move to on boot up
   * ----------------------------------------------------------------------*/
  buildDungeon = () => {
    debugLog("Building Dungeon...");
    // TODO - ALL OF THIS IS TEMP RIGHT NOW
    this.atTitle = false;

    this.setupPartyDgmn();

    // CREATE EVERYTHING
    this.dungeon = new Dungeon(true,this.onDungeonLoad);
    this.digiBeetle = new DigiBeetle();

    // CONNECT EVERYTHING - TODO - Split these into 1 function apiece
    this.digiBeetle.initDungeonAH(this.dungeon.dungeonAH);
    this.digiBeetle.initGameAH(this.gameAH);
    this.digiBeetle.initSystemAH(this.systemAH);
    this.dungeon.initAH(this.systemAH,this.gameAH,this.digiBeetle.digiBeetleAH,this.yourDgmn.dgmnAH);

    // START EVERYTHING
    this.dungeon.init();
  }

  /**------------------------------------------------------------------------
   * SETUP PARTY DGMN
   * ------------------------------------------------------------------------
   * When the Dungeon Loads, I need to set up the DGMN Party properly
   * TODO - When I implement the Hatching Screen, a lot of this logic will move
   * ----------------------------------------------------------------------*/
  setupPartyDgmn = () => { this.yourDgmn.buildPartyEggs() }

  /**------------------------------------------------------------------------
   * ON BATTLE LOAD
   * ------------------------------------------------------------------------
   * Sent into the Battle as a Callback.
   * Runs whenever the Battle returns that it has been fully loaded
   * -------------------------------------------*/ /* istanbul ignore next */
  onBattleLoad = () => {
    debugLog("Battle Loaded...");
    this.drawGameScreen();
  }

  /**------------------------------------------------------------------------
   * ON DUNGEON LOAD
   * ------------------------------------------------------------------------
   * Sent into the Dungeon as a Callback.
   * Runs whenever the Dungeon returns that it has been fully loaded
   * -------------------------------------------*/ /* istanbul ignore next */
  onDungeonLoad = () => {
    debugLog("Dungeon Loaded...");
    this.drawGameScreen();
  }

  /**------------------------------------------------------------------------
   * ADD TO OBJECT LIST                                         [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Sent into parts of the Game as a Callback.
   * Adds an object to the draw array, so that it will paint on the Screen
   * ------------------------------------------------------------------------
   * @param {Object} newObject  New item to add to the list
   * ----------------------------------------------------------------------*/
  addToObjectList = newObject => {
    if(this.objectList.indexOf(newObject) === -1){
      this.objectList.push(newObject);
    }
  }

  /**------------------------------------------------------------------------
   * REMOVE FROM OBJECT LIST
   * ------------------------------------------------------------------------
   * Removes an Object from the List used to Draw Canvases
   * ------------------------------------------------------------------------
   * @param {Object} removeObject  Object to remove from the list
   * ----------------------------------------------------------------------*/
  removeFromObjectList = removeObject => {
    if(this.objectList.indexOf(removeObject) !== -1){
      this.objectList.splice(this.objectList.indexOf(removeObject),1);
    }
  }

  /**------------------------------------------------------------------------
   * DRAW GAME SCREEN                                           [[EXPORTED ]]
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

    if(keyState[config.keyBindings.start]){ this.keyManager('start')
    } else { this.keyTimers.start = 0 }

    if(keyState[config.keyBindings.up]){ this.keyManager('up','down')
    } else { this.keyTimers.up = 0; this.keyManager('up','up') }
    
    if(keyState[config.keyBindings.right]){ this.keyManager('right','down')
    } else { this.keyTimers.right = 0; this.keyManager('right','up') }
    
    if(keyState[config.keyBindings.down]){ this.keyManager('down','down')
    } else { this.keyTimers.down = 0; this.keyManager('down','up') }
    
    if(keyState[config.keyBindings.left]){ this.keyManager('left','down')
    } else { this.keyTimers.left = 0; this.keyManager('left','up') }
  }

  /**------------------------------------------------------------------------
   * KEY MANAGER
   * ------------------------------------------------------------------------
   * Takes the action from a key and takes the proper action, depending on
   *   current Game state
   * ------------------------------------------------------------------------
   * @param {String} key    Not the event listener Key, but the System Action Key
   * @param {String} upDown Picking up or putting down - up|down
   * ----------------------------------------------------------------------*/
  keyManager = (key, upDown) => {
    this.keyTimers[key]++;

    if(this.atTitle){ this.titleKeyManager(key,upDown) }
    if(this.battle?.battleActive){ this.battleKeyManager(key,upDown); }
    if(this.dungeon?.dungeonState !== 'loading'){ this.dungeonKeyManager(key,upDown) } // TODO - Probably need to set the Dungeon state to not loading during battle and other events
  }
    
    /**------------------------------------------------------------------------
     * TITLE KEY MANAGER
     * ------------------------------------------------------------------------
     * Key Manager for the Title Screen
     * ------------------------------------------------------------------------
     * @param {String} key    Not the event listener Key, but the System Action Key
     * @param {String} upDown Picking up or putting down - up|down
     * ----------------------------------------------------------------------*/
    titleKeyManager = (key,upDown) => {
      if(this.keyTimers[key] === 2){ this.titleMenu.titleMenuIO.keyTriage(key,upDown) }
    }

    
    /**------------------------------------------------------------------------
     * BATTLE KEY MANAGER
     * ------------------------------------------------------------------------
     * Key Manager for during a Battle
     * ------------------------------------------------------------------------
     * @param {String} key    Not the event listener Key, but the System Action Key
     * @param {String} upDown Picking up or putting down - up|down
     * ----------------------------------------------------------------------*/
    battleKeyManager = (key,upDown) => {
      if(this.keyTimers[key] === 2){
        this.battle.battleIO.keyTriage(key,upDown);
      }
      if((key === 'right' || key === 'left' || key === 'down' || key === 'up') && this.keyTimers[key] > 15){ // Only directions can be held to take action
        this.keyTimers[key] = 0;
      }
    }
    
    /**------------------------------------------------------------------------
     * DUNGEON KEY MANAGER
     * ------------------------------------------------------------------------
     * Key Manager for during the Dungeon
     * TODO - This seems mildly inneficient
     * ------------------------------------------------------------------------
     * @param {String} key    Not the event listener Key, but the System Action Key
     * @param {String} upDown Picking up or putting down - up|down
     * ----------------------------------------------------------------------*/
    dungeonKeyManager = (key,upDown) => {
      if(this.dungeon?.dungeonState === 'free'){ // TODO - Probably should be a more specific check
        // TODO - Logic that checks things like "held down" or "tapped" go here
        if(key === 'start' || key === 'select'){ // Start and Select shouldn't be able to be "held down"
          if(this.keyTimers[key] === 2){ this.dungeon.dungeonIO.keyTriage(key,upDown) }
        } else {
          this.dungeon.dungeonIO.keyTriage(key,upDown);
        }
      } else if(this.dungeon?.dungeonState === 'hatch' || this.dungeon?.dungeonState === 'text-box-next' || this.dungeon?.dungeonState === 'main-menu'){
        if(this.keyTimers[key] === 2){
          this.dungeon.dungeonIO.keyTriage(key,upDown);
        }
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
  getDgmnParty = () => {
    /*
      Is this an anti-pattern? I've worked hard to pass down references and not actual objects
      Is there a clean way to avoid actually passing in a list of Objects?
      Could I pass in a 
    */
    return this.yourParty;
  }
}

export default Game;
