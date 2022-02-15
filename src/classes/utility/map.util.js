import {dungeonFloorsDB,dungeonRoomsDB} from '../../data/dungeon.db';
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

  getFloorLayout = dimensions => {
    let floorOptions = dungeonFloorsDB[dimensions];
    let selectedFloor = Math.floor(Math.random() * (floorOptions.length - 0));

    let roomNumberMatrix = floorOptions[selectedFloor];

    return roomNumberMatrix;
  }

  getTileLayout = roomId => {
    return dungeonRoomsDB[roomId];
  }
}

export default MapUtility;