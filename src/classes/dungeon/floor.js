import Room from '../room';
import MapUtility from '../utility/map.util';
import FloorCanvas from '../canvas/floor-canvas';
import config from '../../config';

class Floor{
  constructor(floorNumber){
    this.number = floorNumber || 1;

    // ACTION HANDLERS
    this.systemAH;
    this.dungeonAH;

    // UTILITIES
    this.mapUtility = new MapUtility();

    this.floorCanvas;

    this.roomMatrix = [];               // Matrix of all of the Room Objects
    this.floorEventMod = 'none';        // Changes the likelyhood of Events on a Floor
    this.start = {room: [], tile: []}   // Location of the Start of the Floor
    this.end = {room: [], tile: []}     // Location of the End of the Floor
    this.encounters = [null];

    this.currentTile = {room: [], tile: []} // Current Location of the DigiBeetle
  }

  /**------------------------------------------------------------------------
   * ACTION HANDLER INITIALIZERS
   * ------------------------------------------------------------------------
   * The Initializers for the different Action Handlers for other Classes
   * ----------------------------------------------------------------------*/
    initAH = (systemAH,gameAH,dungeonAH) => {
      this.initSystemAH(systemAH);
      this.initGameAH(gameAH);
      this.initDungeonAH(dungeonAH);
    }
    initSystemAH = actionHandler =>{ this.systemAH = actionHandler; }
    initGameAH = actionHandler =>{ this.gameAH = actionHandler; }
    initDungeonAH = actionHandler =>{ this.dungeonAH = actionHandler; }

  /**------------------------------------------------------------------------
   * INITIALIZE CANVAS
   * ------------------------------------------------------------------------
   * Sets up the Floor Canvas
   * ----------------------------------------------------------------------*/
    initCanvas = () => { 
      this.floorCanvas = new FloorCanvas('floor-canvas',this.roomMatrix.length*128,this.roomMatrix[0].length*128);
    }

  /**------------------------------------------------------------------------
   * GENERATE FLOOR
   * ------------------------------------------------------------------------
   * Creates the Floor.
   *   Includes Building the Room Matrix
   *   Populates Events (Start, End, etc.)
   * ----------------------------------------------------------------------*/
    generateFloor = () => {
      this.roomMatrix = this.buildRoomMatrix(this.number);
      this.start = this.generateStart();
      this.end = this.generateEnd();

      this.generateEvents();

      this.currentTile = this.start;
      this.initCanvas();
    }

  /**------------------------------------------------------------------------
   * BUILD ROOM MATRIX
   * ------------------------------------------------------------------------
   * Creates a Matrix of Rooms based on the current floor
   * ------------------------------------------------------------------------
   * @param {Number} floorNumber    Current Number of the floor you're on
   * @return Matrix of Rooms
   * ----------------------------------------------------------------------*/
    buildRoomMatrix = floorNumber => {
      let buildMatrix = [];
      let floorDimensions = this.mapUtility.calculateDungeonDimensions(floorNumber);
      let roomNumbers = this.mapUtility.getFloorLayout(floorDimensions);

      for(let r = 0; r < roomNumbers.length; r++){
        let row = [];
        for(let c = 0; c < roomNumbers[r].length; c++){
          let newRoom =  new Room(roomNumbers[r][c],[r,c]);
            newRoom.setupTiles();
          row.push( newRoom );
        }
        buildMatrix.push(row);
      }

      return buildMatrix;
    }

  /**------------------------------------------------------------------------
   * GENERATE START
   * ------------------------------------------------------------------------
   * Picks a tile to be the Start and change the Tile on the Matrix
   *   Potential Tiles = 2
   * ------------------------------------------------------------------------
   * @returns Object with Room and Tile positions for the Start Tile
   * ----------------------------------------------------------------------*/
    generateStart = () => {
      let start = {room: [], tile: []}
      
      let possibleTiles = this.findAllTilesOnFloor([2,4,12,13,14,15,16]);
      let randomChoice = Math.floor(Math.random() * possibleTiles.length);

      start.room = possibleTiles[randomChoice].room;
      start.tile = possibleTiles[randomChoice].tile;

      this.roomMatrix[start.room[0]][start.room[1]].changeTile([start.tile[0],start.tile[1]],101);

      return start;
    }

  /**------------------------------------------------------------------------
   * GENERATE END
   * ------------------------------------------------------------------------
   * Picks a tile to be the End and change the Tile on the Matrix
   *    Potential Tiles = 3
   * ------------------------------------------------------------------------
   * @returns Object with Room and Tile positions for the End Tile
   * ----------------------------------------------------------------------*/
     generateEnd = () => {
      let end = {room: [], tile: []}
      
      let possibleTiles = this.findAllTilesOnFloor([3,4,13,15,16]); // TODO - More than this
      let randomChoice = Math.floor(Math.random() * possibleTiles.length);

      end.room = possibleTiles[randomChoice].room;
      end.tile = possibleTiles[randomChoice].tile;

      this.roomMatrix[end.room[0]][end.room[1]].changeTile([end.tile[0],end.tile[1]],102);

      return end;
    }

  /**------------------------------------------------------------------------
   * GENERATE EVENTS
   * ------------------------------------------------------------------------
   * Goes through the rooms and determines if a tile should become an event
   * ------------------------------------------------------------------------
   * @param {Arrray} eventOrder Determines which is most likely to happen
   * ----------------------------------------------------------------------*/
  generateEvents = (eventOrder = ["enemy","trap","treasure"]) => {
    for(let i = 0; i < eventOrder.length; i++){
      if(eventOrder[i] === 'enemy'){ this.generateEnemies()
      } else if(eventOrder[i] === 'trap'){ //this.generateTraps()
      } else if(eventOrder[i] === 'treasure'){ /*this.generateTreasure()*/ }
    }
  }

  /**------------------------------------------------------------------------
   * GENERATE ENEMIES
   * ------------------------------------------------------------------------
   * Goes through the rooms and determines what should be an enemy tile.
   *  Potential Tiles = 6,8,10,11,12,14,15
   * ----------------------------------------------------------------------*/
    generateEnemies = () => {
      let potentialSpots = this.findAllTilesOnFloor([6,8,10,11,12,14,15]);
      let enemyChance = this.floorEventMod === 'enemy' ? 30 : 60; // TODO - There's a chance that a Floor Mod will make enemies more likely
      let encounterId = 1;
      for(let i = 0; i < potentialSpots.length; i++){
        let rando = Math.floor( Math.random() * 100 );
        if(rando <= enemyChance){ 
          this.addEncounter(potentialSpots[i],encounterId)
          encounterId++;
        }
      }
    }

  /**------------------------------------------------------------------------
   * ADD ENEMY
   * ------------------------------------------------------------------------
   * Changes a tile to have an Enemy Encounter.
   * Then, it builds the range Matrix around it
   * ----------------------------------------------------------------------*/
    addEncounter = (tile,encounterId) => {
      let tileNumber = 105 + (encounterId/100);
      this.roomMatrix[tile.room[0]][tile.room[1]].changeTile([tile.tile[0],tile.tile[1]],tileNumber);
      this.encounters.push({id:encounterId})
      this.createEncounterRange(tile,encounterId);
    }

  /**------------------------------------------------------------------------
   * CREATE ENCOUNTER RANGE
   * ------------------------------------------------------------------------
   * An encounter is not just the square the enemy is in, it is often the entire
   * area around it
   * ------------------------------------------------------------------------
   * @param {Object}  encounterTile   Object with data on exact tile {room: [0,0], tile:[0,0]}
   * @param {Number}  encounterId     Number of the encounter (more encounters, higher number)
   * @param {Number}  encounterRange  How far out the encounter reaches from the center
   * ----------------------------------------------------------------------*/
    createEncounterRange = (encounterTile,encounterId,encounterRange=1) => {
      let tileNumber = 106 + (encounterId/100);
      let range = encounterRange; // TODO - make this a calculation based on floor/mods/blah blah
      let tile = encounterTile.tile;
      let rMin = tile[0] - range < 0 ? 0 - tile[0] : -range;
      let rMax = range+1;
      let cMin = tile[1] - range < 0 ? 0 - tile[1] : -range;
      let cMax = range+1;

      for(let r = rMin; r < rMax; r++){
        for(let c = cMin; c < cMax; c++){
          let delta = Math.abs(r) + Math.abs(c);
          if(delta <= range && delta !== 0){
            if(this.mapUtility.isOpenTile(this.roomMatrix[encounterTile.room[0]][encounterTile.room[1]].tileMatrix[tile[0]+r][tile[1]+c])){
              this.roomMatrix[encounterTile.room[0]][encounterTile.room[1]].changeTile([tile[0]+r,tile[1]+c],tileNumber);
            }
          }
        }
      }
    }

  /**------------------------------------------------------------------------
   * GET ALL TILES ON FLOOR
   * ------------------------------------------------------------------------
   * Goes through all of the Rooms on a Floor to find specific tiles
   * ------------------------------------------------------------------------
   * @param {Matrix}    roomMatrix  Room Matrix for the Floor
   * @param {Array}     tileValues  All of the values to search for
   * @return List of Tile Locations
   * ----------------------------------------------------------------------*/
    findAllTilesOnFloor = tileValues => {
      let allTiles = [];
      for(let r = 0; r < this.roomMatrix.length; r++){
        for(let c = 0; c < this.roomMatrix[r].length; c++){
          let tilesInRoom = this.roomMatrix[r][c].findAllTilesInRoom(tileValues);
          for(let t = 0; t < tilesInRoom.length; t++){
            allTiles.push({
              room: [r,c],
              tile: tilesInRoom[t]
            })
          }
        }
      }
      return allTiles;
    }

    moveInDirection = dir => {
      let delta = (dir === 'down' || dir === 'right') ? -1 : 1;
      let moveX = (dir === 'down' || dir === 'up') ? null : this.floorCanvas.x + (delta * config.screenSize);
      let moveY = (dir === 'right' || dir === 'left') ? null : this.floorCanvas.y + (delta * config.screenSize);
      this.moveFloorCanvas(moveX,moveY);
    }

  /**------------------------------------------------------------------------
   * MOVE
   * ------------------------------------------------------------------------
   * Handles moving around the Floor
   * ------------------------------------------------------------------------
   * @param {String}  dir     Direction of movement [up | right | down | left]
   * @param {String}  upDown  Whether the key is up or down [up | down]
   * ----------------------------------------------------------------------*/
    move = (dir,upDown) => {
      this.dungeonAH.setCurrentDirection(dir);
      this.dungeonAH.setMoving(dir);
      this.moveInDirection(dir);

      if(this.mapUtility.isOnExactTile(dir,this.floorCanvas.x,this.floorCanvas.y)){
        if(dir === 'up'){ this.currentTile.tile[0]--
        } else if(dir === 'right'){ this.currentTile.tile[1]++ 
        } else if(dir === 'down'){this.currentTile.tile[0]++
        } else if(dir === 'left'){ this.currentTile.tile[1]-- }
        if(this.shouldMoveRoom(dir)){ this.moveIntoRoom(dir); }
        this.checkCollision();
        if(this.checkCurrentTile()){ this.dungeonAH.setMoving('none'); return }; // Stop Running if Tile Stops the movement
        if(upDown === 'up'){
          this.dungeonAH.setMoving('none');
        }
      }
    }

  /**------------------------------------------------------------------------
   * CHECK CURRENT TILE
   * ------------------------------------------------------------------------
   * Looks at the current tile to see if it has an Event (trap, treasure, etc.)
   * ------------------------------------------------------------------------
   * @returns True if event found that stops movement
   * ----------------------------------------------------------------------*/
  checkCurrentTile = () => {
    let room = this.roomMatrix[this.currentTile.room[0]][this.currentTile.room[1]];
    let tile = room.tileMatrix[this.currentTile.tile[0]][this.currentTile.tile[1]];
    if(tile === 102){
      this.dungeonAH.goUpFloor();
      return true;
    } else if(Math.floor(tile) === 105 || Math.floor(tile) === 106){
      this.dungeonAH.startBattle();
      return true;
    }
    return false;
  }

  /**------------------------------------------------------------------------
   * COLLISION CHECK
   * ------------------------------------------------------------------------
   * Checks all surrounding tiles and sets the correct collision values
   * ----------------------------------------------------------------------*/
    checkCollision = () => {
      
      let room = this.roomMatrix[this.currentTile.room[0]][this.currentTile.room[1]];
      let tile = this.currentTile.tile;
      
      if(tile[0] !== 0 && room.tileMatrix[tile[0]-1][tile[1]] === 0){
        this.dungeonAH.setCollision('up',true);
      } else if(tile[0] === 0 && this.currentTile.room[0] >= this.roomMatrix.length){
        this.dungeonAH.setCollision('up',true);
      } else { this.dungeonAH.setCollision('up',false); }
      
      if(tile[1] !== 7 && room.tileMatrix[tile[0]][tile[1]+1] === 0){
        this.dungeonAH.setCollision('right',true);
      } else if(tile[1] === 7 && this.currentTile.room[1] >= this.roomMatrix[this.currentTile.room[0]].length){
        this.dungeonAH.setCollision('right',true);
      } else { this.dungeonAH.setCollision('right',false); }

      if(tile[0] !== 7 && room.tileMatrix[tile[0]+1][tile[1]] === 0){
        this.dungeonAH.setCollision('down',true);
      } else if(tile[0] === 7 && this.currentTile.room[0] >= this.roomMatrix.length){
        this.dungeonAH.setCollision('down',true);
      } else { this.dungeonAH.setCollision('down',false); }

      if(tile[1] !== 0 && room.tileMatrix[tile[0]][tile[1]-1] === 0){
        this.dungeonAH.setCollision('left',true);
      } else if(tile[1] === 0  && this.currentTile.room[1] === 0){
        this.dungeonAH.setCollision('left',true);
      } else { this.dungeonAH.setCollision('left',false); }
    }

  /**------------------------------------------------------------------------
   * SHOULD MOVE ROOM
   * ------------------------------------------------------------------------
   * Checks the position and sees if you should move from one room to another
   * ------------------------------------------------------------------------
   * @param {String}  dir Direction you are moving in
   * @returns True if you should move
   * ----------------------------------------------------------------------*/
    shouldMoveRoom = dir => {
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
          console.log("MOVE LEFT ROOM")
          return true;
        }
      }
  
      return false;
    }

  /**------------------------------------------------------------------------
   * MOVE INTO ROOM
   * ------------------------------------------------------------------------
   * Based on the direction, moves you into the next room
   * ------------------------------------------------------------------------
   * @param {String}  dir Direction you are moving in
   * ----------------------------------------------------------------------*/
    moveIntoRoom = dir => {
      if(dir === 'up'){
        this.currentTile.room[0]--;
        this.currentTile.tile[0] = 7;
      } else if(dir === 'right'){
        this.currentTile.room[1]++;
        this.currentTile.tile[1] = 0;
      } else if(dir === 'down'){
        this.currentTile.room[0]++;
        this.currentTile.tile[0] = 0;
      } else if(dir === 'left'){
        this.currentTile.room[1]--;
        this.currentTile.tile[1] = 7;
      }
    }

  /**------------------------------------------------------------------------
   * DRAW FLOOR
   * ------------------------------------------------------------------------
   * Draws the Floor image, including:
   *  The Base Floor Plan
   *  The Event Tiles
   * ----------------------------------------------------------------------*/
    drawFloor = () => {
      this.drawFloorBase();
      this.floorCanvas.drawTile(this.systemAH.fetchImage('endTile'),this.end.room,this.end.tile);
      // TODO - Eventually, draw the event tiles that you can see
      this.dungeonAH.paintFloorCanvas(this.floorCanvas);
      this.gameAH.refreshScreen();
    }

    redrawFloor = () => {
      this.dungeonAH.paintFloorCanvas(this.floorCanvas);
    }

  /**------------------------------------------------------------------------
   * DRAW FLOOR BASE
   * ------------------------------------------------------------------------
   * Draws the initial, unedited Room images in their respective places
   * ----------------------------------------------------------------------*/
    drawFloorBase = () => {
      for(let r = 0; r < this.roomMatrix.length; r++){
        for(let c = 0; c < this.roomMatrix[r].length; c++){
          let room = this.roomMatrix[r][c];
          this.floorCanvas.drawRoom(this.systemAH.fetchImage(`room${room.roomId}`),[room.position[0],room.position[1]]);
        }
      }
    }

  /**------------------------------------------------------------------------
   * SET FLOOR AT START
   * ------------------------------------------------------------------------
   * Moves the Floor Canvas to the starting point
   * ----------------------------------------------------------------------*/
    setFloorToStart = () => {
      let xOffset = (64 * config.screenSize) - this.mapUtility.getTotalOffset(this.start.room[1],this.start.tile[1]);
      let yOffset = (64 * config.screenSize) - this.mapUtility.getTotalOffset(this.start.room[0],this.start.tile[0]);
      this.moveFloorCanvas(xOffset,yOffset);
      this.redrawFloor();
    }

  /**------------------------------------------------------------------------
   * MOVE FLOOR CANVAS
   * ------------------------------------------------------------------------
   * Moves the location of the Floor Canvas
   * ----------------------------------------------------------------------*/
    moveFloorCanvas = (newX, newY) => {
      this.floorCanvas.x = newX !== null ? newX : this.floorCanvas.x;
      this.floorCanvas.y = newY !== null ? newY : this.floorCanvas.y;
      this.redrawFloor();
    }
}

export default Floor;



  // generateEvents = () => {
  //   let tempEventOrder = ['treasure','enemy']; // TODO - This should be generated by the game, not decided in code

  //   for(let e = 0; e < tempEventOrder.length; e++){
  //     let spots = this.findAllTilesByNumber(this.roomMatrix, [5]);
  //     for(let i = 0; i < spots.length; i++){
  //       if(tempEventOrder[e] === 'treasure'){
  //         this.generateTreasure(spots[i]);
  //       }
  //     }
  //   }
  // }

  // generateTreasure = tileCoord => {
  //   let room = tileCoord.room;
  //   let tile = tileCoord.tile;
  //   let tempTreasureRate = 80; // TODO - this should be generated by the game

  //   if(Math.floor(Math.random() * 100) <= tempTreasureRate){ // Generate Treasure
  //     console.log("GENERATE TREASURE AT ",tileCoord);
  //     this.roomMatrix[room[0]][room[1]].tileMatrix[tile[0]][tile[1]] = parseFloat(`103.${this.treasureList.length}`);
  //     // this.treasureList.push('generatedTreasure') //TODO - Actually pick out a treasure
  //     let rarity = this.treasureUtility.getRarity(this.floorNumber);
  //     let itemType = this.treasureUtility.getItemType();
  //     let item = '';
  //     if(itemType === 'booster'){
  //       item = this.treasureUtility.getBoosterItemType(rarity);
  //     }
  //   }
  // }