import { dungeonRoomsDB } from "../data/dungeon.db";

class Room{
  constructor(roomId, position){
    this.roomId = roomId;
    this.position = position;
    this.tileMatrix = dungeonRoomsDB[roomId];
  }

  findTilesByNumber = (roomMatrix,tileNumber) => {
    let allTiles = [];
    for(let r = 0; r < roomMatrix.length; r++){
      for(let c = 0; c < roomMatrix[r].length; c++){
        if(roomMatrix[r][c] === tileNumber) allTiles.push([r,c])
      }
    }

    return allTiles;
  }

  changeTile = (position, value) => {
    this.tileMatrix[position[0]][position[1]] = value;
  }
}

export default Room;