import { dungeonRoomsDB } from "../data/dungeon.db";

class Room{
  constructor(roomId){
    this.roomId = roomId;
    this.roomMatrix = dungeonRoomsDB[roomId];
  }

  generateStart = roomMatrix => {

  }

  generateEnd = roomMatrix => {

  }
}

export default Room;