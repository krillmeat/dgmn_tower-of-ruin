import { dungeonFloorsDB } from "../data/dungeon.db";
import { calculateDungeonDimensions } from "../utils/dungeon-utils";
import { debugLog } from "../utils/log-utils";
import Room from "./room";

class Dungeon{
  constructor(isNewDungeon){
    this.floor = isNewDungeon ? 1 : 0; // TODO - Right now, set to zero when not a new dungeon, but otherwise, needs to pull from save data
    this.roomMatrix = this.buildFloor(calculateDungeonDimensions(this.floor));
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

    buildMatrix = floorOptions[selectedFloor];

    // Run through the floor matrix and replace each single Number with Room Object
    for(let r = 0; r < buildMatrix.length; r++){
      for(let c = 0; c < buildMatrix[r].length; c++){
        this.buildRoom(buildMatrix[r][c]);
      }
    }

    return buildMatrix;
  }

  /**------------------------------------------------------------------------
   * BULD ROOM
   * ------------------------------------------------------------------------
   * Builds all of the components for a room.
   * Pulls from a database.
   * ------------------------------------------------------------------------
   * @param 
   * ----------------------------------------------------------------------*/
  buildRoom = roomId => {
    let room = new Room(roomId);

    room.generateStart(room.roomMatrix);
    
    return room;
  }
}

export default Dungeon;