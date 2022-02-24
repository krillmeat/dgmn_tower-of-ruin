import { debugLog } from './log-utils';

/**------------------------------------------------------------------------
 * CALCULATE DUNGEON DIMENSIONS
 * ------------------------------------------------------------------------
 * Figures out the proper Room Dimensions for a Dungeon floor
 * ------------------------------------------------------------------------
 * @param {Number}  floor Current Floor Number for the Dungeon
 * ----------------------------------------------------------------------*/
export const calculateDungeonDimensions = floor => {
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