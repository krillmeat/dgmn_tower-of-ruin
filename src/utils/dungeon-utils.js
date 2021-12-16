/**------------------------------------------------------------------------
 * CALCULATE DUNGEON DIMENSIONS
 * ------------------------------------------------------------------------
 * Figures out the proper Room Dimensions for a Dungeon floor
 * ------------------------------------------------------------------------
 * @param {Number}  floor Current Floor Number for the Dungeon
 * ----------------------------------------------------------------------*/
export const calculateDungeonDimensions = floor => {
  let dimensions = [];
  switch(floor){
    case floor < 5:
      dimensions = "twoByTwo";
      break;
    default:
      dimensions = "twoByTwo";
      break;
  }

  return dimensions;
}