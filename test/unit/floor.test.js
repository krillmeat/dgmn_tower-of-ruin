import 'jest-canvas-mock';

import Floor from '../../src/classes/dungeon/floor';
import Room from '../../src/classes/room';

import config from '../../src/config';

jest.mock('../../src/classes/action-handlers/game.ah',()=>{})

const emptyFn = () => {}

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
    describe('Main Events',()=>{
      let mockFloor;
      beforeEach(()=>{
        mockFloor = new Floor();
      })
      afterEach(()=>{
        jest.spyOn(global.Math, 'random').mockRestore();
      })
      describe('Enemy',()=>{
        beforeEach(() => {
          jest.spyOn(mockFloor,'createEncounterRange').mockImplementation(emptyFn);
          mockFloor.roomMatrix = [[new Room(0,[0,0]),new Room(0,[0,1])]]
          mockFloor.roomMatrix[0][0].tileMatrix = [[0,0],[0,0]];
          mockFloor.roomMatrix[0][1].tileMatrix = [[0,0],[6,0]];
        })

        test('When enemy event is picked, should call generateEnemies',()=>{
          let spyGenerateEnemies = jest.spyOn(mockFloor,'generateEnemies');
          mockFloor.generateEvents(["enemy"]);
          expect(spyGenerateEnemies).toHaveBeenCalled();
        })

        test('Each enemy spot has a 15% chance to have an enemy if nothing is modified',()=>{
          jest.spyOn(global.Math, 'random').mockReturnValue(0.14);
          let spyAddEncounter = jest.spyOn(mockFloor,'addEncounter');
          mockFloor.generateEnemies();
          expect(spyAddEncounter).toHaveBeenCalled();
        })

        test('Each enemy spot has a 85% chance to NOT have an enemy if nothing is modified',()=>{
          jest.spyOn(global.Math, 'random').mockReturnValue(0.16);
          let spyAddEncounter = jest.spyOn(mockFloor,'addEncounter');
          mockFloor.generateEnemies();
          expect(spyAddEncounter).not.toHaveBeenCalled();
        })

        test('Each enemy spot has a 30% chance to have an enemy if enemy mod is on the floor',()=>{
          jest.spyOn(global.Math, 'random').mockReturnValue(0.29);
          let spyAddEncounter = jest.spyOn(mockFloor,'addEncounter');
          mockFloor.floorEventMod = 'enemy';
          mockFloor.generateEnemies();
          expect(spyAddEncounter).toHaveBeenCalled();
        })

        test('After adding enemy to a tile, the Tile Matrix will reflect the update',()=>{
          expect(mockFloor.roomMatrix[0][1].tileMatrix[1][0]).toEqual(6);
          let mockTile = {room:[0,1],tile:[1,0]}
          mockFloor.addEncounter(mockTile,1);
          expect(mockFloor.roomMatrix[0][1].tileMatrix[1][0]).toEqual(105.01);
        })

        test('Adding an enemy to a tile will increase the encounter list',()=>{
          expect(mockFloor.encounters.length).toEqual(1);
          let mockTile = {room:[0,1],tile:[1,0]}
          mockFloor.addEncounter(mockTile,1);
          expect(mockFloor.encounters.length).toEqual(2);
        })

        describe('Encounter Range',()=>{
          let mockTile;
          beforeEach(()=>{
            jest.spyOn(mockFloor,'createEncounterRange').mockRestore();
            mockTile = {room:[0,1],tile:[3,3]};
            mockFloor.roomMatrix[0][1].tileMatrix = [[0,0,0,0,0,0,0],[0,1,1,1,1,1,0],[0,1,1,1,1,1,0],[0,1,1,1,1,1,0],[0,1,1,1,1,1,0],[0,1,1,1,1,1,0],[0,0,0,0,0,0,0]] // 7x7
          });

          test('Center encounter with range of 1 will produce the correct range',()=>{
            mockFloor.roomMatrix[0][1].tileMatrix[3][3] = 105.01;
            
            let expectedMatrix = [[0,0,0,0,0,0,0],[0,1,1,1,1,1,0],[0,1,1,106.01,1,1,0],[0,1,106.01,105.01,106.01,1,0],[0,1,1,106.01,1,1,0],[0,1,1,1,1,1,0],[0,0,0,0,0,0,0]]
            mockFloor.createEncounterRange(mockTile,1);
            expect(mockFloor.roomMatrix[0][1].tileMatrix).toEqual(expectedMatrix);
          })

          test('Center encounter with range of 2 will produce the correct range',()=>{
            mockFloor.roomMatrix[0][1].tileMatrix[3][3] = 105.01;
            
            let expectedMatrix = [[0,0,0,0,0,0,0],[0,1,1,106.01,1,1,0],[0,1,106.01,106.01,106.01,1,0],[0,106.01,106.01,105.01,106.01,106.01,0],[0,1,106.01,106.01,106.01,1,0],[0,1,1,106.01,1,1,0],[0,0,0,0,0,0,0]]
            mockFloor.createEncounterRange(mockTile,1,2);
            expect(mockFloor.roomMatrix[0][1].tileMatrix).toEqual(expectedMatrix);
          })

          test('Center encounter with range of 3 will produce the correct range',()=>{
            mockFloor.roomMatrix[0][1].tileMatrix[3][3] = 105.01;
            
            let expectedMatrix = [[0,0,0,0,0,0,0],[0,1,106.01,106.01,106.01,1,0],[0,106.01,106.01,106.01,106.01,106.01,0],[0,106.01,106.01,105.01,106.01,106.01,0],[0,106.01,106.01,106.01,106.01,106.01,0],[0,1,106.01,106.01,106.01,1,0],[0,0,0,0,0,0,0]]
            mockFloor.createEncounterRange(mockTile,1,3);
            expect(mockFloor.roomMatrix[0][1].tileMatrix).toEqual(expectedMatrix);
          })

          test('Off center encounter with range of 2 will produce the correct range',()=>{
            mockFloor.roomMatrix[0][1].tileMatrix[1][1] = 105.01;

            let expectedMatrix = [[0,0,0,0,0,0,0],[0,105.01,106.01,106.01,1,1,0],[0,106.01,106.01,1,1,1,0],[0,106.01,1,1,1,1,0],[0,1,1,1,1,1,0],[0,1,1,1,1,1,0],[0,0,0,0,0,0,0]];
            mockFloor.createEncounterRange({room:[0,1],tile:[1,1]},1,2);
            expect(mockFloor.roomMatrix[0][1].tileMatrix).toEqual(expectedMatrix);
          })
        })
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
          mockFloor.gameAH = { addCanvasObject: emptyFn }
          mockFloor.dungeonAH = { paintFloorCanvas: emptyFn }
          // mockRoomOne.tileMatrix = [[0,0],[0,0]];
          // mockRoomTwo.tileMatrix = [[0,1],[0,0]];
          mockFloor.start = {room: [1,0], tile: [0,1]}
          mockFloor.roomMatrix = [[mockRoomOne],[mockRoomTwo]];
          mockFloor.initCanvas();

      expect(mockFloor.floorCanvas.x).toEqual(0);
      expect(mockFloor.floorCanvas.y).toEqual(0);

      mockFloor.setFloorToStart();

      let mockX = 48 * config.screenSize;   // 64 - ( (0 x 128) + (1 * 16) ) = 48
      let mockY = -64 * config.screenSize;  // 64 - ( (1 x 128) + (0 * 16) ) = -64
      expect(mockFloor.floorCanvas.x).toEqual(mockX);
      expect(mockFloor.floorCanvas.y).toEqual(mockY);
    })
  })
})