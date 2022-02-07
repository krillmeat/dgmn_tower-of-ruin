import { dungeonFloorsDB } from "../data/dungeon.db";
import { calculateDungeonDimensions } from "../utils/dungeon-utils";
import GameCanvas from "./canvas";
import { debugLog } from "../utils/log-utils";
import Room from "./room";
import config from "../config";
import { dungeonImages } from "../data/images.db";
import DigiBeetle from "./digibeetle";

class Dungeon{
  constructor(isNewDungeon,loadedCallback,addObjectCallback,gameScreenRedrawCallback, loadImageCallback, fetchImageCallback){
    this.floor = isNewDungeon ? 1 : 0; // TODO - Right now, set to zero when not a new dungeon, but otherwise, needs to pull from save data
    this.roomMatrix = this.buildFloor(calculateDungeonDimensions(this.floor));

    this.triggerGameScreenRedraw = () => { gameScreenRedrawCallback() }

    this.digiBeetle = new DigiBeetle(this.sendCurrentDirection, this.triggerGameScreenRedraw);

    this.dungeonCanvas = new GameCanvas('dungeon-canvas',160,144);
    this.floorCanvas = new GameCanvas('floor-canvas',this.roomMatrix.length*128,this.roomMatrix[0].length*128);

    this.start = {
      room: [0,0],
      tile: [0,0]
    }

    this.end = {
      room: [0,0],
      tile: [0,0]
    }

    this.dungeonState = 'free';

    this.moveTimer;
    this.currentTile;
    this.mapX = 0;
    this.mapY = 0;
    this.facing = 'down';
    this.moving = 'none'; // up | right | down | left
    this.collision = {
      up: false,
      right: false,
      down: false,
      left: false
    };

    this.addObject = newObject => { addObjectCallback(newObject) }

    this.loadImages = (imageList,callback) => { loadImageCallback(imageList,callback) }
    this.onLoaded = () => {loadedCallback()}
    this.fetchImage = image => {return fetchImageCallback(image)}

    this.populateFloor(this.roomMatrix);
    this.loadDungeonImages(this.roomMatrix);
  }

  /**------------------------------------------------------------------------
   * BULD FLOOR
   * ------------------------------------------------------------------------
   * Gets everything ready for a new Floor
   * ------------------------------------------------------------------------
   * @param {String} floorDimensions Dimensions of the floor | "twoByTwo"
   * @return Dungeon Floor Matrix
   * ----------------------------------------------------------------------*/
  buildFloor = (floorDimensions) => {
    let buildMatrix = [];

    // Randomly Select a Floor
    let floorOptions = dungeonFloorsDB[floorDimensions];
    let selectedFloor = Math.floor(Math.random() * (floorOptions.length - 0));

    let roomNumberMatrix = floorOptions[selectedFloor];

    // Run through the floor matrix and replace each single Number with Room Object
    for(let r = 0; r < roomNumberMatrix.length; r++){
      let matrixRow = [];
      for(let c = 0; c < roomNumberMatrix[r].length; c++){
        matrixRow.push(this.buildRoom(roomNumberMatrix[r][c],[r,c]));
      }
      buildMatrix.push(matrixRow);
    }

    return buildMatrix;
  }

  populateFloor = roomMatrix => {
    debugLog("FULL DUNGEON = ",this.roomMatrix);
    // Start
    this.start = this.generateStart(roomMatrix);
    let startRoom = roomMatrix[this.start.room[0]][this.start.room[1]];
        startRoom.changeTile([this.start.tile[0],this.start.tile[1]],101);

    // End
    this.end = this.generateEnd(roomMatrix);
    let endRoom = roomMatrix[this.end.room[0]][this.end.room[1]];
        endRoom.changeTile([this.end.tile[0],this.end.tile[1]],102);

    // Enemies

    // Traps

    // Treasure

    // "Events" (Heal, Toilet, etc.)

    this.currentTile = this.start;
  }

  loadDungeonImages = roomMatrix => {
    let rooms = [];
    let allImages = [];
    for(let r = 0; r < roomMatrix.length; r++){
      for(let c = 0; c < roomMatrix[r].length; c++){
        if(rooms.indexOf(roomMatrix[r][c].roomId) === -1){
          rooms.push(roomMatrix[r][c].roomId)
        }
      }
    }

    for(let img = 0; img < dungeonImages.length; img++){
      allImages.push(dungeonImages[img])
    }

    for(let i = 0; i < rooms.length; i++){
      allImages.push(`./sprites/Dungeon/Rooms/room${rooms[i]}.png`);
    }

    this.loadImages(allImages, ()=>{
      this.drawDungeon();
      this.drawDigiBeetle();
      this.onDungeonImagesLoaded();
    });
  }

  onDungeonImagesLoaded = () => {
    this.addObject(this.dungeonCanvas);
    this.addObject(this.digiBeetle.digiBeetleCanvas);
    this.onLoaded();
  }

  /**------------------------------------------------------------------------
   * DRAW DUNGEON
   * ------------------------------------------------------------------------
   * Draws the initial canvases for the Dungeon and Floor
   * ----------------------------------------------------------------------*/
  drawDungeon = () => {
    for(let r = 0; r < this.roomMatrix.length; r++){
      for(let c = 0; c < this.roomMatrix[r].length; c++){
        let roomName = `room${this.roomMatrix[r][c].roomId}`;
        let roomX = c * 16 * (8 * config.screenSize);
        let roomY = r * 16 * (8 * config.screenSize);
        this.floorCanvas.paintImage(this.fetchImage(roomName),roomX,roomY);
      }
    }

    // this.drawTile(this.fetchImage('startTile'),this.start.room,this.start.tile);
    this.drawTile(this.fetchImage('endTile'),this.end.room,this.end.tile);

    // Set the Start
    let roomXOffset = this.start.room[1] * 16 * 8;
    let roomYOffset = this.start.room[0] * 16 * 8;

    let tileXOffset = this.start.tile[1] * 16;
    let tileYOffset = this.start.tile[0] * 16;

    this.mapX = 64 - (roomXOffset + tileXOffset);
    this.mapY = 64 - (roomYOffset + tileYOffset);

    this.floorCanvas.x = this.mapX * config.screenSize;
    this.floorCanvas.y = this.mapY * config.screenSize;

    

    this.dungeonCanvas.blackFill();
    this.dungeonCanvas.paintCanvas(this.floorCanvas);
    this.triggerGameScreenRedraw();
  }

  drawTile = (image, room,tile) => {
    let roomXOffset = room[1] * 16 * 8;
    let roomYOffset = room[0] * 16 * 8;
    let tileXOffset = tile[1] * 16;
    let tileYOffset = tile[0] * 16;
    this.floorCanvas.paintImage(image,(roomXOffset+tileXOffset)*config.screenSize,(roomYOffset+tileYOffset)*config.screenSize);
  }

  drawDigiBeetle = () => {
    this.digiBeetle.digiBeetleCanvas.frames.down = [this.fetchImage('digiBeetleDown0'),this.fetchImage('digiBeetleDown1')];
    this.digiBeetle.digiBeetleCanvas.frames.up = [this.fetchImage('digiBeetleUp0'),this.fetchImage('digiBeetleUp1')];
    this.digiBeetle.digiBeetleCanvas.frames.right = [this.fetchImage('digiBeetleRight0'),this.fetchImage('digiBeetleRight1')];
    this.digiBeetle.digiBeetleCanvas.frames.left = [this.fetchImage('digiBeetleLeft0'),this.fetchImage('digiBeetleLeft1')];
    this.digiBeetle.digiBeetleCanvas.animateBeetle('down');
  }

  /**------------------------------------------------------------------------
   * BUILD ROOM
   * ------------------------------------------------------------------------
   * Builds all of the components for a room.
   * Pulls from a database.
   * ------------------------------------------------------------------------
   * @param 
   * ----------------------------------------------------------------------*/
  buildRoom = (roomId, position) => {
    let room = new Room(roomId,position);
    
    return room;
  }

  generateStart = roomMatrix => {
    let data = {
      room: [0,0],
      tile: [0,0]
    }

    let potentialSpots = this.findAllTilesByNumber(roomMatrix, 2); // TODO - This is bad, start is not only 2
    let randomChoice = Math.floor(Math.random() * potentialSpots.length);

    data.room = potentialSpots[randomChoice].roomPosition;
    data.tile = potentialSpots[randomChoice].tilePosition;

    return data;
  }

  generateEnd = roomMatrix => {
    let data = {
      room: [0,0],
      tile: [0,0]
    }

    let potentialSpots = this.findAllTilesByNumber(roomMatrix, 3); // TODO - This is bad, start is not only 2
    let randomChoice = Math.floor(Math.random() * potentialSpots.length);

    data.room = potentialSpots[randomChoice].roomPosition;
    data.tile = potentialSpots[randomChoice].tilePosition;

    return data;
  }

  findAllTilesByNumber = (roomMatrix, tileNumber) => {
    let allTiles = [];

    for(let r = 0; r < roomMatrix.length; r++){
      for(let c = 0; c < roomMatrix[r].length; c++){
        let add = roomMatrix[r][c].findTilesByNumber(roomMatrix[r][c].tileMatrix,tileNumber);
        for(let i = 0; i < add.length; i++){
          if(add[i].length > 0){ 
            allTiles.push({
              roomPosition: [r,c], 
              tilePosition: add[i] })
          }
        }
      }
    }

    return allTiles;
  }

  redrawDungeon = () => {
    this.dungeonCanvas.blackFill();
    this.dungeonCanvas.paintCanvas(this.floorCanvas)
    this.triggerGameScreenRedraw();
  }

  sendCurrentDirection = () => {
    return this.facing;
  }


  /**------------------------------------------------------------------------
   * ------------------------------------------------------------------------
   * MOVEMENT
   * ------------------------------------------------------------------------
   * ------------------------------------------------------------------------
   * This conrols moving the map around, including:
   *   Directional Movement
   *   Collision
   *   Directional Interaction
   *   Event Triggers
   * ------------------------------------------------------------------------
   * ----------------------------------------------------------------------*/
   
  moveUp = upDown => {
    this.facing = 'up';
    this.moving = 'up';
    this.mapY++;
    this.floorCanvas.y = this.mapY * config.screenSize;

    if(this.mapY % 16 === 0){ // Tile Cycle
      this.currentTile.tile[0]--;
      if(this.moveRoomCheck('up')){
        this.currentTile.room[0]--;
        this.currentTile.tile[0] = 7;
      }
      this.collisionCheck();
      if(this.checkEnd()){ 
        this.goUpFloor(); return }
      if(upDown === 'up'){ // If the key is lifted up, stop the movement
        this.moving = 'none';
      }
    }

    this.redrawDungeon();
  }

  moveRight = upDown => {
    this.facing = 'right';
    this.moving = 'right';
    this.mapX--;
    this.floorCanvas.x = this.mapX * config.screenSize;

    if(this.mapX % 16 === 0){ // Tile Cycle
      this.currentTile.tile[1]++;
      if(this.moveRoomCheck('right')){
        this.currentTile.room[1]++;
        this.currentTile.tile[1] = 0;
      }
      this.collisionCheck();
      if(this.checkEnd()){ 
        this.goUpFloor(); return }
      if(upDown === 'up'){ // If the key is lifted up, stop the movement
        this.moving = 'none';
      }
    }

    this.redrawDungeon();
  }

  moveDown = upDown => {
    this.facing = 'down';
    this.moving = 'down';
    this.mapY--;
    this.floorCanvas.y = this.mapY * config.screenSize;

    if(this.mapY % 16 === 0){ // Tile Cycle
      this.currentTile.tile[0]++;
      if(this.moveRoomCheck('down')){
        this.currentTile.room[0]++;
        this.currentTile.tile[0] = 0;
      }
      this.collisionCheck();
      if(this.checkEnd()){ 
        this.goUpFloor(); return }
      if(upDown === 'up'){ // If the key is lifted up, stop the movement
        this.moving = 'none';
      }
    }

    this.redrawDungeon();
  }

  moveLeft = upDown => {
    this.facing = 'left';
    this.moving = 'left';
    this.mapX++;
    this.floorCanvas.x = this.mapX * config.screenSize;

    if(this.mapX % 16 === 0){ // Tile Cycle
      this.currentTile.tile[1]--;
      if(this.moveRoomCheck('left')){
        this.currentTile.room[1]--;
        this.currentTile.tile[1] = 7;
      }
      this.collisionCheck();
      if(this.checkEnd()){ 
        this.goUpFloor(); return }
      if(upDown === 'up'){ // If the key is lifted up, stop the movement
        this.moving = 'none';
      }
    }

    this.redrawDungeon();
  }

  // RETURNS FALSE IF NO COLLISION
  collisionCheck = () => {
    let room = this.roomMatrix[this.currentTile.room[0]][this.currentTile.room[1]];
    let tile = this.currentTile.tile;
    
    // TODO - Needed else ifs : checking room above if at the top
    if(tile[0] !== 0 && room.tileMatrix[tile[0]-1][tile[1]] === 0){
      this.collision.up = true;
    } else if(tile[0] === 0 && this.currentTile.room[0] === 0){
      this.collision.up = true;
    } else{ // TODO - There needs to be lots more else if
      this.collision.up = false;
    }

    if(tile[1] !== 7 && room.tileMatrix[tile[0]][tile[1]+1] === 0){
      this.collision.right = true;
    } else if(tile[1] === 7 && this.currentTile.room[1] >= this.roomMatrix[this.currentTile.room[0]].length){
      this.collision.right = true;
    } else {
      this.collision.right = false;
    }

    if(tile[0] !== 7 && room.tileMatrix[tile[0]+1][tile[1]] === 0){
      this.collision.down = true;
    } else if(tile[0] === 7 && this.currentTile.room[0] >= this.roomMatrix.length){
      this.collision.down = true;
    } else {
      this.collision.down = false;
    }

    if(tile[1] !== 0 && room.tileMatrix[tile[0]][tile[1]-1] === 0){
      this.collision.left = true;
    } else if(tile[1] === 0  && this.currentTile.room[1] === 0){
      this.collision.left = true;
    } else {
      this.collision.left = false;
    }

  }

  moveRoomCheck = dir => {
    if(dir === 'up'){  
      if(this.currentTile.tile[0] === -1 && this.currentTile.room[0] > 0){
        return true;
      }
    }else if(dir === 'right'){
      if(this.currentTile.tile[1] === 8 && this.currentTile.room[1] < this.roomMatrix[this.currentTile.room[1]].length){
        return true;
      }
    } else if(dir === 'down'){
      if(this.currentTile.tile[0] === 8 && this.currentTile.room[0] < this.roomMatrix.length){
        return true;
      }
    } else if(dir === 'left'){
      if(this.currentTile.tile[1] === -1 && this.currentTile.room[1] > 0){
        return true;
      }
    }

    return false;
  }

  checkEnd = () => {
    let currentTileValue = this.roomMatrix[this.currentTile.room[0]][this.currentTile.room[1]].tileMatrix[this.currentTile.tile[0]][this.currentTile.tile[1]];
    if(currentTileValue === 102){
      return true;
    }

    return false;
  }

  goUpFloor = () => {
    this.moving = 'none';
    console.log("LOGIC FOR GOING UP A FLOOR");
  }

  /**------------------------------------------------------------------------
   * ------------------------------------------------------------------------
   * KEY HANDLERS
   * ------------------------------------------------------------------------
   * ------------------------------------------------------------------------
   * Once all of the Attacks have been chosen, and the Enemy Attacks have
   *   been generated, run through the Attacks
   * ------------------------------------------------------------------------
   * ----------------------------------------------------------------------*/

    /**------------------------------------------------------------------------
   * KEY TRIAGE
   * ------------------------------------------------------------------------
   * Switch that calls the proper function when a button is pressed
   * ------------------------------------------------------------------------
   * @param {String} key  The Key that's being pressed (NOT Event Key)
   * @param {String} upDown Picking up or putting down - up|down
   * ----------------------------------------------------------------------*/
     keyTriage = (key, upDown) => {
      if(key === 'action'){
        this.actionKeyHandler();
      } else if(key === 'cancel'){
        this.cancelKeyHandler();
      } else if(key === 'up'){
        this.upKeyHandler(upDown);
      } else if(key === 'right'){
        this.rightKeyHandler(upDown);
      } else if(key === 'down'){
        this.downKeyHandler(upDown);
      } else if(key === 'left'){
        this.leftKeyHandler(upDown);
      }
    }

    actionKeyHandler = () => {
      
    }

    cancelKeyHandler = () => {
      console.log("CURRENT TILE = ",this.currentTile);
    }

    upKeyHandler = upDown => {
      if(this.dungeonState === 'free'){
        if(this.moving !== 'down' && this.moving !== 'right' && this.moving !== 'left'){
          if(!this.collision.up && (upDown === 'down' || ( upDown === 'up' && this.moving === 'up' ))){
            this.moveUp(upDown);
          } else if(this.collision.up && this.moving === 'up'){ this.moving = 'none' 
        } else if(this.collision.up && upDown === 'down'){this.facing = 'up'}
        }
      } // TODO - not just Dungeon free roam
    }

    rightKeyHandler = upDown => {
      if(this.dungeonState === 'free'){
        if(this.moving !== 'down' && this.moving !== 'up' && this.moving !== 'left'){
          if(!this.collision.right && (upDown === 'down' || ( upDown === 'up' && this.moving === 'right' ))){
            this.moveRight(upDown);
          } else if(this.collision.right && this.moving === 'right'){ this.moving = 'none'  
        } else if(this.collision.right && upDown === 'down'){this.facing = 'right'}
        }
      } // TODO - not just Dungeon free roam
    }

    downKeyHandler = upDown => {
      if(this.dungeonState === 'free'){
        if(this.moving !== 'up' && this.moving !== 'right' && this.moving !== 'left'){
          if(!this.collision.down && (upDown === 'down' || ( upDown === 'up' && this.moving === 'down' ))){
            this.moveDown(upDown);
          } else if(this.collision.down && this.moving === 'down'){ this.moving = 'none'  
        } else if(this.collision.down && upDown === 'down'){this.facing = 'down'}
        }
      }  // TODO - not just Dungeon free roam
    }

    leftKeyHandler = upDown => {
      if(this.dungeonState === 'free'){
        if(this.moving !== 'down' && this.moving !== 'up' && this.moving !== 'right'){
          if(!this.collision.left && (upDown === 'down' || ( upDown === 'up' && this.moving === 'left' ))){
            this.moveLeft(upDown);
          } else if(this.collision.left && this.moving === 'left'){ this.moving = 'none'  
        } else if(this.collision.left && upDown === 'down'){this.facing = 'left'}
        }
      }  // TODO - not just Dungeon free roam
    }
  
}

export default Dungeon;