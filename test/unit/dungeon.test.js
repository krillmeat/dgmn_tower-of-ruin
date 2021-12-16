import Dungeon from "../../src/classes/dungeon";
import Room from "../../src/classes/room";

describe("Dungeon",()=>{
  describe("Building",()=>{
    test("When Starting a new Dungeon, the floor should be set to 1",()=>{
      let mockDungeon = new Dungeon(true);
      expect(mockDungeon.floor).toEqual(1);
    });

    test("A dungeon with room dimensions 2x2 should produce a Matrix with 2 rows and 2 columns",()=>{
      let mockDungeon = new Dungeon(true);
      let mockRoomMatrix = mockDungeon.buildFloor("twoByTwo");

      expect(mockRoomMatrix.length).toEqual(2);
      expect(mockRoomMatrix[0].length).toEqual(2);
    });

    test("Building a Room should return a Room Object",()=>{
      let mockDungeon = new Dungeon(true);
      let mockRoom = mockDungeon.buildRoom(0);

      expect(mockRoom instanceof Room).toBe(true);
    })
  })
})