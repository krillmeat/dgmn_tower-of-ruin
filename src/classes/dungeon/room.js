import MapUtility from "./utility/map.util";

class Room{
  constructor(roomId, position){
    this.roomId = roomId;
    this.position = position;
    this.tileMatrix = [];

    this.mapUtility = new MapUtility();
  }

  /**------------------------------------------------------------------------
   * FIND ALL TILES IN ROOM
   * ------------------------------------------------------------------------
   * Searches the Room for tiles of certain values
   * ------------------------------------------------------------------------
   * @param {Array} tileValues  Array of Number values to search for
   * @returns Array of all tile coordinates
   * ----------------------------------------------------------------------*/
  findAllTilesInRoom = tileValues => {
    let allTiles = [];
    for(let r = 0; r < this.tileMatrix.length; r++){
      for(let c = 0; c < this.tileMatrix[r].length; c++){
        for(let v = 0; v < tileValues.length; v++){
          if(this.tileMatrix[r][c] === tileValues[v]) allTiles.push([r,c])
        }
      }
    }

    return allTiles;
  }

  /**------------------------------------------------------------------------
   * SETUP TILES
   * ------------------------------------------------------------------------
   * Builds the Tile Matrix for the Room
   * ----------------------------------------------------------------------*/
  setupTiles = () => {
    let arrayRef = this.mapUtility.getTileLayout(this.roomId);
    
    for(let r = 0; r < arrayRef.length; r++){
      let row = [];
      for(let c = 0; c < arrayRef[r].length; c++){
        row.push(arrayRef[r][c]);
      }
      this.tileMatrix.push(row);
    }
  }

  /**------------------------------------------------------------------------
   * CHANGE TILE
   * ------------------------------------------------------------------------
   * Swaps the Tile Value of a specific Tile with a new Value
   * ------------------------------------------------------------------------
   * @param {Array}   position  r and c coordinates of Tile
   * @param {Number}  value     newValue for Tile
   * ----------------------------------------------------------------------*/
  changeTile = (position, value) => {
    this.tileMatrix[position[0]][position[1]] = value;
  }
}

export default Room;