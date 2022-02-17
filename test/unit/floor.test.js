import 'jest-canvas-mock';

import Floor from '../../src/classes/dungeon/floor';
import Room from '../../src/classes/room';

import config from '../../src/config';

jest.mock('../../src/classes/action-handlers/game.ah',()=>{})

describe('Dungeon Floor',()=>{

  describe('Generating Floor',()=>{
    afterEach(() => {
      jest.clearAllMocks();
    });
    test('roomMatrix after Generating Floor will not be []',()=>{
      let mockFloor = new Floor();
          mockFloor.gameAH = { addCanvasObject: () => {} }
      jest.spyOn(mockFloor,'generateStart').mockImplementation(()=>{});
      jest.spyOn(mockFloor,'generateEnd').mockImplementation(()=>{});
      expect(mockFloor.roomMatrix.length).toEqual(0);
      mockFloor.generateFloor();
      expect(mockFloor.roomMatrix.length).not.toEqual(0);
    })
  })

  describe('Building Matrix',() => {
    test('The first floor will always be a 2x2', ()=> {
      let mockFloor = new Floor();
      let mockRoomMatrix = mockFloor.buildRoomMatrix(1);

      expect(mockRoomMatrix.length).toEqual(2);
      expect(mockRoomMatrix[0].length).toEqual(2);
    })

    test('Sending in an invalid floor number will cause the floor to be a 2x2',()=>{
      let mockFloor = new Floor();
      let mockRoomMatrix = mockFloor.buildRoomMatrix(-1);

      expect(mockRoomMatrix.length).toEqual(2);
      expect(mockRoomMatrix[0].length).toEqual(2);
    })
  })

  describe('Generating Events',()=>{
    describe('Start Event',()=>{
      test('Start produced by Room Matrix with 1 possible Start Tile will always return that tile',()=>{
        let mockFloor = new Floor();
            mockFloor.roomMatrix = [[new Room(0,[0,0]),new Room(0,[0,1])]]
            mockFloor.roomMatrix[0][0].tileMatrix = [[0,0],[0,0]];
            mockFloor.roomMatrix[0][1].tileMatrix = [[0,0],[2,0]];

        expect(mockFloor.generateStart()).toEqual({room: [0,1], tile: [1,0]});
      })
    })
    describe('End Event',()=>{
      test('End Event produced by Room Matrix with 1 possible End Tile will always return that tile',()=>{
        let mockFloor = new Floor();
            mockFloor.roomMatrix = [[new Room(0,[0,0]),new Room(0,[0,1])]]
            mockFloor.roomMatrix[0][0].tileMatrix = [[0,0],[0,0]];
            mockFloor.roomMatrix[0][1].tileMatrix = [[0,0],[3,0]];

        expect(mockFloor.generateEnd()).toEqual({room: [0,1], tile: [1,0]});
      })
    })
  })

  describe('Finding Tiles',()=>{
    let mockFloor, mockRoomOne, mockRoomTwo;
    beforeEach(()=>{
      mockFloor = new Floor();
      mockRoomOne = new Room(0,[0,0]);
      mockRoomTwo = new Room(0, [0,1]);
    })
    test('List of all tiles on a Floor will be empty if there are no matches', ()=>{
          mockRoomOne.tileMatrix = [[0,0],[0,0]];
          mockRoomTwo.tileMatrix = [[0,0],[0,0]];
          mockFloor.roomMatrix = [[mockRoomOne],[mockRoomTwo]];

      let mockTileList = mockFloor.findAllTilesOnFloor([1]);
      expect(mockTileList.length).toEqual(0);
    });
    test('List of all tiles on a Floor will be 1 if there is 1 match',()=>{
      mockRoomOne.tileMatrix = [[0,0],[0,0]];
      mockRoomTwo.tileMatrix = [[0,0],[0,1]];
      mockFloor.roomMatrix = [[mockRoomOne],[mockRoomTwo]];

      let mockTileList = mockFloor.findAllTilesOnFloor([1]);
      expect(mockTileList.length).toEqual(1);
    })
    test('List of all tiles on a Floor will match the room layout',()=>{
      mockRoomOne.tileMatrix = [[0,0],[0,0]];
      mockRoomTwo.tileMatrix = [[0,0],[0,1]];
      mockFloor.roomMatrix = [[mockRoomOne],[mockRoomTwo]];

      let mockTileList = mockFloor.findAllTilesOnFloor([1]);
      expect(mockTileList[0].room).toEqual([1,0]);
      expect(mockTileList[0].tile).toEqual([1,1]);
    })

  })

  describe('Canvas Manipulation',()=>{
    let mockRoomOne, mockRoomTwo;
    beforeEach(()=>{
      mockRoomOne = new Room(0,[0,0]);
      mockRoomTwo = new Room(0, [0,1]);
    })
    test('Can set Canvas to correct starting point',()=>{
      let mockFloor = new Floor(1);
          mockFloor.gameAH = { addCanvasObject: () => {} }
          // mockRoomOne.tileMatrix = [[0,0],[0,0]];
          // mockRoomTwo.tileMatrix = [[0,1],[0,0]];
          mockFloor.start = {room: [1,0], tile: [0,1]}
          mockFloor.roomMatrix = [[mockRoomOne],[mockRoomTwo]];
          mockFloor.initCanvas();

      expect(mockFloor.floorCanvas.x).toEqual(0);
      expect(mockFloor.floorCanvas.y).toEqual(0);

      mockFloor.setFloorToStart();

      // Start X = 0 + 16
      let mockX = 16 * config.screenSize;
      let mockY = 128 * config.screenSize;
      expect(mockFloor.floorCanvas.x).toEqual(mockX);
      expect(mockFlow.floorCanvas.y).toEqual(mockY);
    })
  })
})