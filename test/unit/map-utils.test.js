import MapUtility from '../../src/classes/utility/map.util';

describe("Map Utilities",()=>{
  let mockMapUtility = new MapUtility();

  // MOVING THIS TO RESPECTIVE CLASSES
  // describe("Finding Tiles",()=>{
  //   test('List of all tiles in a Room will be empty if there are no matches',()=>{
  //     let mockRoom = [[0,0],[0,0]];
  //     let mockTileList = mockMapUtility.getAllTilesInRoom(mockRoom,[1]);
  //     expect(mockTileList.length).toEqual(0);
  //   })
  //   test('List of all tiles in a Room will be 1 if there is 1 match',()=>{
  //     let mockRoom = [[0,0],[1,0]];
  //     let mockTileList = mockMapUtility.getAllTilesInRoom(mockRoom,[1]);
  //     expect(mockTileList.length).toEqual(1);
  //   })
  //   test('List of all tiles in a Room will be 3 if there are 3 matches',()=>{
  //     let mockRoom = [[1,1],[1,0]];
  //     let mockTileList = mockMapUtility.getAllTilesInRoom(mockRoom,[1]);
  //     expect(mockTileList.length).toEqual(3);
  //   })
  //   test('Sending in multiple potential values will get all of those tiles',()=>{
  //     let mockRoom = [[1,1],[2,0]];
  //     let mockTileList = mockMapUtility.getAllTilesInRoom(mockRoom,[1,2]);
  //     expect(mockTileList.length).toEqual(3);
  //   })

  //   test('List of all of the tiles on a Floor will be empty if there are no matches', ()=>{
  //     // let mockRoomMatrix
  //   })
  // })
})