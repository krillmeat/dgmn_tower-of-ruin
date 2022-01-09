import Dungeon from "../../src/classes/dungeon";
import Room from "../../src/classes/room";
import { calculateDungeonDimensions } from "../../src/utils/dungeon-utils";

import * as logs from "../../src/utils/log-utils";

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
  });

  describe("Utilities",()=>{
    test('Dungeon floor dimensions should be 2x2 when floor is 1',()=>{
      expect(calculateDungeonDimensions(1)).toBe("twoByTwo");
    });

    test('Dungeon floor dimensions should be 2x3 when floor is 6',()=>{
      expect(calculateDungeonDimensions(6)).toBe("twoByThree");
    });

    test('Dungeon floor dimensions should be 3x3 when floor is 14',()=>{
      expect(calculateDungeonDimensions(14)).toBe("threeByThree");
    });

    test('Dungeon floor dimensions should default to 2x2 when floor is of impossible value',()=>{
      expect(calculateDungeonDimensions(-1)).toBe("twoByTwo");
    });

    test('Should log error when floor is of impossible value',()=>{
      let spy = jest.spyOn(logs,'debugLog');
      calculateDungeonDimensions(-1);
      expect(spy).toHaveBeenCalled();
    })
  })
})