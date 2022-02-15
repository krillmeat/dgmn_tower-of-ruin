import Room from '../room';
import MapUtility from '../utility/map.util';
import GameCanvas from '../canvas';

class Floor{
    constructor(floorNumber){
        this.number = floorNumber || 1;

        // ACTION HANDLERS
        this.systemAH;
        this.dungeonAH;

        // UTILITIES
        this.mapUtility = new MapUtility();

        // this.floorCanvas = new GameCanvas('floor-canvas',this.roomMatrix.length*128,this.roomMatrix[0].length*128);

        this.roomMatrix = [];               // Matrix of all of the Room Objects
        this.start = {room: [], tile: []}   // Location of the Start of the Floor
        this.end = {room: [], tile: []}     // Location of the End of the Floor
    }

  /**------------------------------------------------------------------------
   * GENERATE FLOOR
   * ------------------------------------------------------------------------
   * Creates the Floor.
   *   Includes Building the Room Matrix
   *   Populates Events (Start, End, etc.)
   * ----------------------------------------------------------------------*/
    generateFloor = () => {
        this.roomMatrix = this.buildRoomMatrix();
        this.start = this.generateStart();
        this.end = this.generateEnd();
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
        
        let possibleTiles = this.findAllTilesOnFloor([2]); // TODO - More than this
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
        
        let possibleTiles = this.findAllTilesOnFloor([3]); // TODO - More than this
        let randomChoice = Math.floor(Math.random() * possibleTiles.length);

        end.room = possibleTiles[randomChoice].room;
        end.tile = possibleTiles[randomChoice].tile;

        this.roomMatrix[end.room[0]][end.room[1]].changeTile([end.tile[0],end.tile[1]],102);

        return end;
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
}

export default Floor;
