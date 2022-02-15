import MapUtility from "./utility/map.util";

class Room{
  constructor(roomId, position){
    this.roomId = roomId;
    this.position = position;
    this.tileMatrix = [];

    this.mapUtility = new MapUtility();
  }

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

  setupTiles = () => {
    this.tileMatrix = this.mapUtility.getTileLayout(this.roomId);
  }

  changeTile = (position, value) => {
    this.tileMatrix[position[0]][position[1]] = value;
  }
}

export default Room;