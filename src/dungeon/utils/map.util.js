import CFG from "../../config";
import {dungeonFloorsBossMapDB, dungeonFloorsDB,dungeonRoomsDB} from '../../data/dungeon.db';
import { bossEncountersDB, bossEncoutnersMapDB } from '../../data/encounters.db';
import {debugLog} from '../../utils/log-utils';


/**------------------------------------------------------------------------
 * MAP UTILITY
 * ------------------------------------------------------------------------
 * Handles the utilities of the Map, which includes Dungeon, Room, and Floors
 * ------
 * A Utility is an action that always returns a value
 * It should never need to access more than a couple of params from the parent
 * This Class should handle the DB, and no other Class should import the DB directly
 * ----------------------------------------------------------------------*/
class MapUtility{
  constructor(){ /* Utilities Have No Constructors */ }

  calculateDungeonDimensions = floor => {
    let dimensions = "";
    switch(true){
      case (floor < 5 && floor > 0):
        dimensions = "twoByTwo";
        break;
      case (floor >= 5 && floor < 10):
        dimensions = "twoByThree";
        break;
      case (floor >= 10 && floor < 16):
        dimensions = "threeByThree";
        break;
      default:
        debugLog('ERROR - Floor is incorrect value!');
        dimensions = "twoByTwo";
        break;
    }
  
    return dimensions;
  }

  getFloorLayout = (dimensions,floorNumber = 1) => {
    let floorOptions = dimensions === 'boss' ? dungeonFloorsDB.boss : dungeonFloorsDB[dimensions];
    let selectedFloor = dimensions === 'boss' ? dungeonFloorsBossMapDB.indexOf(floorNumber) : Math.floor(Math.random() * (floorOptions.length));

    let roomNumberMatrix = floorOptions[selectedFloor];

    return roomNumberMatrix;
  }

  getTileLayout = roomId => {
    return dungeonRoomsDB[roomId];
  }

  getTotalOffset = (roomCount, tileCount) => {
    return this.getRoomOffset(roomCount) + this.getTileOffset(tileCount);
  }

  getRoomOffset = roomCount => {
    return roomCount * 128 * CFG.screenSize;
  }

  getTileOffset = tileCount => {
    return tileCount * 16 * CFG.screenSize;
  }

  /**------------------------------------------------------------------------
   * IS ON EXACT TILE
   * ------------------------------------------------------------------------
   * When moving, returns true if you are exactly on a tile
   *   All checks happen when this occurs
   * ------------------------------------------------------------------------
   * @param {String}  dir     Direction of movement [up | right | down | left]
   * @return True if exactly on a Tile
   * ----------------------------------------------------------------------*/
   isOnExactTile = (dir,canvasX,canvasY) => {
    let coord = (dir === 'down' || dir === 'up') ? canvasY : canvasX;
    return coord % (16 * CFG.screenSize) === 0 || coord === 0;
  }

  /**------------------------------------------------------------------------
   * IS OPEN TILE
   * ------------------------------------------------------------------------
   * Checks tile to see if it's possible to overwrite it with an event
   *  Used mostly by the enemy range / trap range selectors
   * ------------------------------------------------------------------------
   * @param {Number}  tileValue Value of the tile 
   * @return True if matches an overwrite-able tile
   * ----------------------------------------------------------------------*/
  isOpenTile = tileValue => {
    let possibleValues = [1]
    return (possibleValues.indexOf(tileValue) !== -1)
  }

  // TODO - Add more floors
  isBossFloor = floorNumber => {
    return floorNumber === 5;
  }

  getBossRewardLevel = floorNumber =>{
    if(floorNumber === 10){
      return 1;
    }
    return 0;
  }

  getBossAttackLevel = floorNumber => {
    switch(floorNumber){
      case 5:
        return 3;
      case 10:
        return 4;
      default:
        return 1;
    }
  }
}

export default MapUtility;