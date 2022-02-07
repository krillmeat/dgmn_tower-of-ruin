import 'jest-canvas-mock';

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

      expect(mockDungeon.roomMatrix).toEqual(2);
      expect(mockDungeon.roomMatrix).toEqual(2);
    });

    test("Any given index inside a Dungeon's Room Matrix should be a Room Object",()=>{
      let mockDungeon = new Dungeon(true);
      
      expect(mockDungeon.roomMatrix[0][0] instanceof Room).toBe(true);
    })

    test("Building a Room should return a Room Object",()=>{
      let mockDungeon = new Dungeon(true);
      let mockRoom = mockDungeon.buildRoom(0);

      expect(mockRoom instanceof Room).toBe(true);
    });

    test("Generate Start should return an object with two arrays, both of length of 2",()=>{
      let mockDungeon = new Dungeon(true);
      let mockStart = mockDungeon.generateStart(mockDungeon.roomMatrix)
      expect(typeof mockStart).toBe('object');
      expect(mockStart.room.length).toBe(2);
      expect(mockStart.tile.length).toBe(2);
    });

    test("Generate Start should return a room coordinate with a correctly matching value",()=>{
      let mockDungeon = new Dungeon(true);
      let mockRoomMatrix = [[new Room(0,[0,0]), new Room(1,[0,1])],[new Room(0,[1,0]),new Room(0,[1,1])]];
      let mockStart = mockDungeon.generateStart(mockRoomMatrix);
      expect(mockStart.room).toEqual([0,1]);
    })

    test("Generate Start should return a tile coordinate with a correctly matching value",()=>{
      let mockDungeon = new Dungeon(true);
      let mockRoomMatrix = [[new Room(0,[0,0]), new Room(1,[0,1])],[new Room(0,[1,0]),new Room(0,[1,1])]];
      let mockStart = mockDungeon.generateStart(mockRoomMatrix);
      expect(mockStart.tile).toEqual([2,2]);
    })

    test("Using findAllTilesByNumber on a room matrix with 1 match should return Array of one item",()=>{
      let mockDungeon = new Dungeon(true);
      let mockRoomMatrix = [[new Room(0,[0,0]), new Room(1,[0,1])],[new Room(0,[1,0]),new Room(0,[1,1])]]; // This only has one 2 tile
      expect(mockDungeon.findAllTilesByNumber(mockRoomMatrix,2).length).toBe(1);
    })

    test("Using findAllTilesByNumber on a room matrix with 3 matches should return Array of 3 items",()=>{
      let mockDungeon = new Dungeon(true);
      let mockRoomMatrix = [[new Room(1,[0,0]), new Room(1,[0,1])],[new Room(1,[1,0]),new Room(0,[1,1])]]; // This has three 2 tiles
      expect(mockDungeon.findAllTilesByNumber(mockRoomMatrix,2).length).toBe(3);
    })

    test("Using findAllTilesByNumber on a Room Matrix with only 1 match in the 0,1 position should return a room of 0,1",()=>{
      let mockDungeon = new Dungeon(true);
      let mockRoomMatrix = [[new Room(0,[0,0]), new Room(1,[0,1])],[new Room(0,[1,0]),new Room(0,[1,1])]]; // This only has one 2 tile
      expect(mockDungeon.findAllTilesByNumber(mockRoomMatrix,2)[0].roomPosition).toEqual([0,1]);
    })

    test("Using findAllTilesByNumber on a Room Matrix with only 1 match in the 2,2 position should return a tile of 2,2",()=>{
      let mockDungeon = new Dungeon(true);
      let mockRoomMatrix = [[new Room(0,[0,0]), new Room(1,[0,1])],[new Room(0,[1,0]),new Room(0,[1,1])]]; // This only has one 2 tile
      expect(mockDungeon.findAllTilesByNumber(mockRoomMatrix,2)[0].tilePosition).toEqual([2,2]);
    })
  });

  describe("Room",()=>{
    test("When Room has one matching tile when searching with findTilesByNumber, the array should have a length of 1",()=>{
      let mockRoom = new Room(1,[0,0]);
      expect(mockRoom.findTilesByNumber(mockRoom.tileMatrix,2).length).toBe(1);
    });

    test("When Room has three matching tile when searching with findTilesByNumber, the array should have a length of 3",()=>{
      let mockRoom = new Room(1,[0,0]);
      let mockTileMatrix = [[0,0,2],[0,0,0],[0,0,2],[0,2,0]]
      expect(mockRoom.findTilesByNumber(mockTileMatrix,2).length).toBe(3);
    });

    test("When Room has one matching tile when searching with findTilesByNumber, the array should match the expected value",()=>{
      let mockRoom = new Room(1,[0,0]);
      let mockTileMatrix = [[0,0,0],[0,2,0],[0,0,1],[0,1,0]];
      expect(mockRoom.findTilesByNumber(mockTileMatrix,2)[0]).toEqual([1,1]);
    })

    test("Changing a tile to a value will change the tile matrix as expected",()=>{
      let mockRoom = new Room(1,[0,0]);
      mockRoom.tileMatrix = [[0,0,0],[0,2,0],[0,0,1],[0,1,0]];
      expect(mockRoom.tileMatrix[1][1]).toBe(2);
      mockRoom.changeTile([1,1],101);
      expect(mockRoom.tileMatrix[1][1]).toBe(101);
    })
  })

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