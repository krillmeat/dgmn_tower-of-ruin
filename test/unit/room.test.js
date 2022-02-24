import Room from '../../src/classes/dungeon/room';

describe('Dungeon Room',()=>{
  describe('Finding Tiles',()=>{
    test('List of all tiles in a Room will be empty if there are no matches',()=>{
      let mockRoom = new Room(0,[0,0]);
      mockRoom.tileMatrix = [[0,0],[0,0]];
      let mockTileList = mockRoom.findAllTilesInRoom([1]);
      expect(mockTileList.length).toEqual(0);
    });
    test('List of all tiles in a Room will have 1 option if there is 1 match',()=>{
      let mockRoom = new Room(0,[0,0]);
      mockRoom.tileMatrix = [[0,0],[0,1]];
      let mockTileList = mockRoom.findAllTilesInRoom([1]);
      expect(mockTileList.length).toEqual(1);
    });
    test('List of all tiles in a Room will have 3 options if there are 3 matches',()=>{
      let mockRoom = new Room(0,[0,0]);
      mockRoom.tileMatrix = [[0,1],[1,1]];
      let mockTileList = mockRoom.findAllTilesInRoom([1]);
      expect(mockTileList.length).toEqual(3);
    });
    test('List of all tiles in a Room will have 2 options if there is 1 match of two values',()=>{
      let mockRoom = new Room(0,[0,0]);
      mockRoom.tileMatrix = [[0,2],[0,1]];
      let mockTileList = mockRoom.findAllTilesInRoom([1,2]);
      expect(mockTileList.length).toEqual(2);
    });

    test('Returned tile options should match tile locations',()=>{
      let mockRoom = new Room(0,[0,0]);
      mockRoom.tileMatrix = [[0,1],[0,1]];
      let mockTileList = mockRoom.findAllTilesInRoom([1]);
      expect(mockTileList[0]).toEqual([0,1]);
      expect(mockTileList[1]).toEqual([1,1]);
    })
  })
})