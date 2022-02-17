import { debugLog } from "../utils/log-utils";

import GameCanvas from "./canvas";
import Floor from "./dungeon/floor";
import { dungeonImages } from "../data/images.db";

import DungeonAH from "./action-handlers/dungeon.ah";
import DungeonIO from "./input-output/dungeon.io";

class Dungeon{
  constructor(isNewDungeon,loadedCallback){
    
    // ACTION HANDLERS
    this.digiBeetleAH; this.gameAH; this.systemAH; // this.battleAH;
    this.dungeonAH = new DungeonAH(
      this.getCurrentDirection,this.setCurrentDirection,
      this.paintFloorCanvas,
      this.getDungeonState,
      this.getMoving,this.setMoving,
      this.getCollision,this.setCollision,
      this.moveFloor);

    this.dungeonCanvas = new GameCanvas('dungeon-canvas',160,144);  // Holds the Floor Canvas and is what gets painted to the screen
    this.dungeonIO = new DungeonIO(this.dungeonAH);                 // Key Manager

    this.floor;                               // Object for Floor
    this.floorNumber = isNewDungeon ? 1 : 0;  // TODO - Right now, set to zero when not a new dungeon, but otherwise, needs to pull from save data
    this.dungeonState = 'free';               // Current State of Dungeon [free|menu|textbox]
    this.facing = 'down';                     // Currently Facing Direction [up | right | down | left]
    this.moving = 'none';                     // Currently Moving Direction [up | right | down | left]
    this.collision = {                        // Lets the game know which direction has collision
      up: false,
      right: false,
      down: false,
      left: false
    };

    this.onLoaded = () => {loadedCallback()}
  }

  /**------------------------------------------------------------------------
   * INITIALIZE
   * ------------------------------------------------------------------------
   * Kicks things off
   * ----------------------------------------------------------------------*/
  init = () => {
    this.buildFloor();
  }

  /**------------------------------------------------------------------------
   * ACTION HANDLER INITIALIZERS
   * ------------------------------------------------------------------------
   * The Initializers for the different Action Handlers for other Classes
   * ----------------------------------------------------------------------*/
  initDigiBeetleAH = actionHandler => { this.digiBeetleAH = actionHandler; }
  initGameAH = actionHandler => { this.gameAH = actionHandler; }
  initSystemAH = actionHandler =>{ this.systemAH = actionHandler; }

  /**------------------------------------------------------------------------
   * BUILD FLOOR
   * ------------------------------------------------------------------------
   * Sets up the Floor Object
   * ----------------------------------------------------------------------*/
  buildFloor = () => {
    debugLog('Building Floor...')
    this.floor = new Floor(this.floorNumber);
    this.floor.initAH(this.systemAH,this.gameAH,this.dungeonAH);
    this.floor.generateFloor();

    this.loadDungeonImages(this.floor.roomMatrix);
  }

  /**------------------------------------------------------------------------
   * LOAD DUNGEON IMAGES
   * ------------------------------------------------------------------------
   * Goes through and loads the essential images and related Room Images
   * ------------------------------------------------------------------------
   * @param {Matrix} roomMatrix Dungeon's Room Matrix
   * ----------------------------------------------------------------------*/
  loadDungeonImages = roomMatrix => {
    let rooms = [];
    let allImages = [];

    // Add all Room Images to the Load List
    for(let r = 0; r < roomMatrix.length; r++){
      for(let c = 0; c < roomMatrix[r].length; c++){
        if(rooms.indexOf(roomMatrix[r][c].roomId) === -1){
          allImages.push(`./sprites/Dungeon/Rooms/room${roomMatrix[r][c].roomId}.png`);
        }
      }
    }

    // Adds all Base Dungeon Images to the Load List
    for(let img = 0; img < dungeonImages.length; img++){
      allImages.push(dungeonImages[img])
    }

    this.systemAH.loadImages(allImages, ()=>{
      this.onDungeonImagesLoaded();
    });
  }

      /**------------------------------------------------------------------------
       * ON DUNGEON IMAGES LOADED
       * ------------------------------------------------------------------------
       * After all of the images have been loaded, runs a lot of setup
       * ----------------------------------------------------------------------*/
      onDungeonImagesLoaded = () => {
        this.gameAH.addCanvasObject(this.dungeonCanvas);
        
        this.floor.drawFloor();
        this.floor.checkCollision(); // Otherwise, if you start on an edge, you'll ignore it
        this.floor.setFloorToStart();
        
        this.onLoaded();
      }

  /**------------------------------------------------------------------------
   * PAINT FLOOR CANVAS                                         [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Paints the Floor Canvas on the Dungeon Canvas
   *  Black Fills -> Paint New Floor -> Refresh Screen
   * ------------------------------------------------------------------------
   * @param {Canvas}  canvas  Floor Canvas to paint on the Dungeon
   * ----------------------------------------------------------------------*/
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
    this.moving = 'none';
    console.log("LOGIC FOR GOING UP A FLOOR");
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

  getCurrentDirection = () => { return this.facing; }
  setCurrentDirection = newValue => { this.facing = newValue }
  
  getDungeonState = () => { return this.dungeonState; }

  getMoving = () => { return this.moving }
  setMoving = newValue => { this.moving = newValue }

  getCollision = () => { return this.collision }
  setCollision = (dir,value) => { this.collision[dir] = value; }
  
}

export default Dungeon;