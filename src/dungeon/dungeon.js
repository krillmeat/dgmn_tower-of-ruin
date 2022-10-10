import { debugLog } from "../utils/log-utils";

import GameCanvas from "../classes/canvas";
import { dungeonImages, fieldIcons } from "../data/images.db";

import Floor from "./components/floor";
import DungeonAH from "./dungeon.ah";
import DungeonIO from "./dungeon.io";
import TreasureUtility from "./utils/treasure.util";

import DgmnUtility from "../classes/dgmn/utility/dgmn.util";
import DungeonTextCanvas from "./canvas/dungeon-text-canvas";
import PauseMenu from "../classes/menu/pause-menu";
import DgmnGrowthMenu from "../classes/dgmn/hatch-victory/dgmn-growth.menu";

class Dungeon{
  constructor(isNewDungeon,loadedCallback){
    
    // ACTION HANDLERS
    this.digiBeetleAH; this.gameAH; this.systemAH; this.dgmnAH; // this.battleAH;

    this.dungeonAH = new DungeonAH({
      getCurrentDirectionCB: this.getCurrentDirection,
      setCurrentDirectionCB: this.setCurrentDirection,
      drawDungeonCB: this.drawDungeon,
      paintFloorCanvasCB: this.paintFloorCanvas,
      getDungeonStateCB: this.getDungeonState,
      getMovingCB: this.getMoving,
      setMovingCB: this.setMoving,
      getCollisionCB: this.getCollision,
      setCollisionCB: this.setCollision,
      moveFloorCB: this.moveFloor,
      goUpFloorCB: this.goUpFloor,
      startBattleCB: this.startBattle,
      getCurrentFloorCB: this.getCurrentFloor,
      giveCurrRewardCB: this.giveCurrReward,
      closeGrowthMenuCB: this.closeGrowthMenu,
      getTreasureCB: this.getTreasure,
      closeTextBoxCB: this.closeTextBox,
      bringUpMenuCB: this.handleMenu
    });

    this.dungeonCanvas = new GameCanvas('dungeon-canvas',160,144);  // Holds the Floor Canvas and is what gets painted to the screen
    this.dungeonIO = new DungeonIO(this.dungeonAH);                 // Key Manager

    this.dgmnUtility = new DgmnUtility();
    this.treasureUtility = new TreasureUtility();

    this.yourParty = [];

    this.floor;                               // Object for Floor
    this.floorNumber = isNewDungeon ? 1 : 0;  // TODO - Right now, set to zero when not a new dungeon, but otherwise, needs to pull from save data
    this.dungeonState = 'hatch';              // Current State of Dungeon [free|hatch|menu|textbox|ascending]
    this.facing = 'down';                     // Currently Facing Direction [up | right | down | left]
    this.moving = 'none';                     // Currently Moving Direction [up | right | down | left]
    this.collision = {                        // Lets the game know which direction has collision
      up: false,
      right: false,
      down: false,
      left: false
    };

    this.hatchingMenu;
    this.dgmnGrowthMenu;
    this.pauseMenu;

    this.textBoxCanvas = new DungeonTextCanvas('dungeon-text',160,144);

    this.onLoaded = () => {loadedCallback()}
  }

  /**------------------------------------------------------------------------
   * INITIALIZE
   * ------------------------------------------------------------------------
   * Kicks things off
   * ----------------------------------------------------------------------*/
  init = () => {
    this.yourParty = this.gameAH.getDgmnParty();

    this.systemAH.startLoading(()=>{
      this.gameAH.addCanvasObject(this.dungeonCanvas);
      
      this.dgmnGrowthMenu = new DgmnGrowthMenu('hatch',this.dgmnAH,this.systemAH,this.gameAH,this.dungeonAH,'hatching');
        this.dungeonIO.setMenuAH(this.dgmnGrowthMenu.dgmnGrowthMenuAH);
      this.pauseMenu = new PauseMenu(this.yourParty,this.dgmnAH,this.digiBeetleAH,this.systemAH,this.gameAH,this.dungeonAH);

      this.systemAH.loadImages(fieldIcons, ()=>{
        // this.hatchingMenu.gotoRewards(['DR']); // TODO - temporary permanent Reward (needs to grab from game data)
        this.dgmnGrowthMenu.gotoRewards(['DR']);
        this.drawDungeon();
        this.systemAH.stopLoading();
      });
    })
  }

  
  /**------------------------------------------------------------------------
   * ACTION HANDLER INITIALIZERS
   * ------------------------------------------------------------------------
   * The Initializers for the different Action Handlers for other Classes
   * ----------------------------------------------------------------------*/
   initAH = (system,game,beetle,dgmn) => {
    this.systemAH = system;
    this.gameAH = game;
    this.digiBeetleAH = beetle;
    this.dgmnAH = dgmn;
  }

  /**------------------------------------------------------------------------
   * DRAW DUNGEON
   * ------------------------------------------------------------------------
   * Determines which Canvases to paint onto the Dungeon Canvas, depending
   *   on what the current Dungeon State is 
   *   [hatch|text-box|text-box-next|main-menu]
   * ----------------------------------------------------------------------*/
  drawDungeon = () => {
    if(this.dungeonState === 'hatch'){
      this.dungeonCanvas.paintCanvas(this.dgmnGrowthMenu.menuCanvas);
    } else if(this.dungeonState === 'text-box' || this.dungeonState === 'text-box-next'){
      this.dungeonCanvas.paintCanvas(this.textBoxCanvas);
    } else if(this.dungeonState === 'main-menu'){
      this.dungeonCanvas.paintCanvas(this.pauseMenu.menuCanvas);
    }else{
      // TODO - Why is nothing here?
    }

    this.gameAH.refreshScreen();
  }

  /**------------------------------------------------------------------------
   * GIVE CURRENT REWARD                                        [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * When in the Reward Menu, gives the left-most Reward to the DGMN in the
   * specified Direction
   * TODO - Why is this here, and not in a shared location w/Battle
   * ------------------------------------------------------------------------
   * @param {String}  dir Direction of Input [left|up|right]
   * ----------------------------------------------------------------------*/
   giveCurrReward = dir => {
    let dgmnId;
    let reward = ['DR']; // TODO - Pull from data

    if(dir === 'left'){ dgmnId = this.yourParty[0]
    } else if(dir === 'up'){ dgmnId = this.yourParty[1]
    } else if(dir === 'right'){ dgmnId = this.yourParty[2] }

    this.dgmnAH.giveDgmnReward(dgmnId,reward);
    // this.hatchingMenu.updateRewardsList(['DR'],this.rewardWrapUp)
    this.dgmnGrowthMenu.updateRewardsList(['DR'],this.rewardWrapUp);
  }

  /**------------------------------------------------------------------------
   * REWARD WRAP UP
   * ------------------------------------------------------------------------
   * After rewards are given...
   * TODO - I need to follow a convention here. Something like rewardOnDone
   * TODO - ALSO, this isn't just done on Reward done
   * ----------------------------------------------------------------------*/
  rewardWrapUp = () => {
    // let currDgmn = this.yourParty[this.hatchingMenu.hatchingIndex];
    let currDgmn = this.yourParty[this.dgmnGrowthMenu.hatchingIndex]
    let currDgmnData = this.dgmnAH.getDgmnData(currDgmn,['eggField','currentFP'],false);
        currDgmnData.dgmnId = currDgmn;
    let hatchImages = this.dgmnUtility.getAllHatchImages(currDgmnData.eggField);
    this.systemAH.loadImages(hatchImages, ()=>{
      this.dgmnGrowthMenu.gotoHatchEggs(currDgmnData);
    });
  }
  
  /**------------------------------------------------------------------------
   * CLOSE GRWOTH MENU
   * ------------------------------------------------------------------------
   * Closes the Hatching Growth Menu and starts loading the Dungeon
   * ----------------------------------------------------------------------*/
   closeGrowthMenu = () => {
    this.dungeonState = 'loading';
    this.systemAH.startLoading(()=>{
      this.buildFloor();
      this.loadDungeonImages(this.floor.roomMatrix);
    })
  }

  /**------------------------------------------------------------------------
   * BUILD FLOOR
   * ------------------------------------------------------------------------
   * Sets up the Floor Object
   * ----------------------------------------------------------------------*/
  buildFloor = () => {
    debugLog('Building Floor : ',this.floorNumber);
    this.floor = new Floor(this.floorNumber);
    this.floor.initAH(this.systemAH,this.gameAH,this.dungeonAH);
    this.floor.generateFloor();
    this.pauseMenu.floorRedraw = () => {
      this.floor.redrawFloor();
    }
  }

  /**------------------------------------------------------------------------
   * LOAD DUNGEON IMAGES
   * ------------------------------------------------------------------------
   * Goes through and loads the essential images and related Room Images
   * ------------------------------------------------------------------------
   * @param {Matrix} roomMatrix Dungeon's Room Matrix
   * ----------------------------------------------------------------------*/
  loadDungeonImages = roomMatrix => {
    let allImages = this.getRoomImages(roomMatrix);

    // Adds all Base Dungeon Images to the Load List
    for(let img = 0; img < dungeonImages.length; img++){
      allImages.push(dungeonImages[img])
    }

    this.systemAH.loadImages(allImages, ()=>{
      this.onDungeonImagesLoaded();
    });
  }

  /**------------------------------------------------------------------------
   * GET ROOM IMAGES
   * ------------------------------------------------------------------------
   * Fetches images for specifically the Room Backgrounds
   * ------------------------------------------------------------------------
   * @param {Matrix} roomMatrix Dungeon's Room Matrix
   * ----------------------------------------------------------------------*/
  getRoomImages = roomMatrix => {
    let rooms = [];
    let allImages = [];
    for(let r = 0; r < roomMatrix.length; r++){
      for(let c = 0; c < roomMatrix[r].length; c++){
        if(rooms.indexOf(roomMatrix[r][c].roomId) === -1){
          allImages.push(`Dungeon/Rooms/room${roomMatrix[r][c].roomId}`);
        }
      }
    }
    return allImages;
  }

      /**------------------------------------------------------------------------
       * ON DUNGEON IMAGES LOADED
       * ------------------------------------------------------------------------
       * After all of the images have been loaded, runs a lot of setup
       * ----------------------------------------------------------------------*/ /* istanbul ignore next */
      onDungeonImagesLoaded = () => {
        // this.hatchingMenu = null;
        this.dgmnGrowthMenu = null; // Clear out the Growth Menu (it will never be called again)
        this.gameAH.addCanvasObject(this.dungeonCanvas);
        this.floor.drawFloor();
        this.floor.checkCollision(); // Otherwise, if you start on an edge, you'll ignore it
        this.floor.setFloorToStart();
        this.digiBeetleAH.init();

        setTimeout(()=>{
          this.systemAH.stopLoading();
          this.dungeonState = 'free';
        },1000);
        
        this.onLoaded();
      }

  /**------------------------------------------------------------------------
   * PAINT FLOOR CANVAS                                         [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Paints the Floor Canvas on the Dungeon Canvas
   *  Black Fills -> Paint New Floor -> Refresh Screen
   * ------------------------------------------------------------------------
   * @param {Canvas}  canvas  Floor Canvas to paint on the Dungeon
   * ----------------------------------------------------------------------*/ /* istanbul ignore next */
  paintFloorCanvas = canvas => {
    this.dungeonCanvas.blackFill();
    this.dungeonCanvas.paintCanvas(canvas);
    this.gameAH.refreshScreen();
  }

  /**------------------------------------------------------------------------
   * MOVE FLOOR                                                 [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Called by the Dungeon IO in order to move the Floor around
   * ------------------------------------------------------------------------
   * @param {String}  dir     Direction of movement [up | right | down | left]
   * @param {String}  upDown  Whether the key is up or down [up | down]
   * ----------------------------------------------------------------------*/
  moveFloor = (dir,upDown) => { this.floor.move(dir,upDown) }

  /**------------------------------------------------------------------------
   * GO UP FLOOR                                                [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * When the Floor is cleared (for any reason), go up to the next one
   * TODO - Unfinished
   * ----------------------------------------------------------------------*/
  goUpFloor = () => {
    if(this.floorNumber === 5){ // TODO - This number should change
      debugLog("Dungeon Clear!");
    } else{
      debugLog("Ascending Floor...");
      this.moving = 'none';
      this.dungeonState = 'ascending';
      this.systemAH.startLoading(()=>{
        this.floorNumber++;
        this.floor = null;
        this.buildFloor();
        // TODO - This is duplicate code, find a way to take the Callback out of the original function
        this.systemAH.loadImages(this.getRoomImages(this.floor.roomMatrix), ()=>{
          this.floor.drawFloor();
          this.floor.checkCollision(); // Otherwise, if you start on an edge, you'll ignore it
          this.floor.setFloorToStart();
          setTimeout(()=>{
            this.systemAH.stopLoading();
            this.dungeonState = 'free';
          },1000);
          
          this.onLoaded();
        });
      })
    }
    
  }

  /**------------------------------------------------------------------------
   * START BATTLE                                               [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Sets up a Battle
   * ----------------------------------------------------------------------*/
  startBattle = () => {
    debugLog("Starting Battle...");
    this.moving = 'none';
    this.dungeonState = 'loading';
    setTimeout(()=>{
      this.systemAH.startLoading(()=>{
        this.gameAH.startBattle();
      })
    },500);
  }

  /**------------------------------------------------------------------------
   * GET TREASURE                                               [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Launches a Text Box to receive an Item
   * ----------------------------------------------------------------------*/
  getTreasure = treasure => {
    debugLog("Getting Treasure : ",treasure);
    this.moving = 'none';
    this.dungeonState = 'text-box';
    this.textBoxCanvas.paintImage(this.systemAH.fetchImage('textBox'));
    let isToolBoxFull = this.digiBeetleAH.isToolBoxFull()
    let message = isToolBoxFull ? 'Found '+this.treasureUtility.getTreasureName(treasure)+'... But your Item Box is full.' : 'Found '+this.treasureUtility.getTreasureName(treasure)+'!';
    this.textBoxCanvas.dungeonTxt.instantText(this.textBoxCanvas.ctx,message,'white');
    setTimeout(()=>{
      if(!isToolBoxFull) this.digiBeetleAH.addItemToToolBox(treasure);
      this.dungeonState = 'text-box-next';
      this.textBoxCanvas.drawContinueCursor(this.systemAH.fetchImage('continueCursor'),()=>{});
      this.drawDungeon();
    },800);
  }

  closeTextBox = () => {
    this.textBoxCanvas.clearCanvas();
    this.dungeonState = 'free';
    this.floor.redrawFloor();
    this.drawDungeon();
  }

  handleMenu = () => {
    this.dungeonState = this.dungeonState === 'main-menu' ? 'free' : 'main-menu';
    
    if(this.dungeonState === 'main-menu'){
      this.launchMainMenu();
    } else if(this.dungeonState === 'free'){
      this.closeMainMenu();
    }
  }

  launchMainMenu = () => {
    this.pauseMenu.launchMenu();
    this.dungeonIO.setMenuAH(this.pauseMenu.pauseMenuAH);
  }

  closeMainMenu = () => {
    this.pauseMenu.closeMenu();
    this.floor.redrawFloor();
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

  getCurrentFloor = () => { return this.floorNumber }
  getCurrentDirection = () => { return this.facing; }
  setCurrentDirection = newValue => { this.facing = newValue }
  
  getDungeonState = () => { return this.dungeonState; }

  getMoving = () => { return this.moving }
  setMoving = newValue => { this.moving = newValue }

  getCollision = () => { return this.collision }
  setCollision = (dir,value) => { this.collision[dir] = value; }
  
}

export default Dungeon;