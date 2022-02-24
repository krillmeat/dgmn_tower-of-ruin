import 'jest-canvas-mock';
import FloorCanvas from '../../src/classes/dungeon/canvas/floor-canvas';

import Floor from '../../src/classes/dungeon/floor';
import Room from '../../src/classes/dungeon/room';

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

  describe('Moving',()=>{
    let mockFloor;
    let spyMoveInDirection, spyCheckCollision, spyCheckCurrentTile;
    beforeEach(()=>{
      mockFloor = new Floor(1);
      mockFloor.floorCanvas = {x:0,y:0}
      mockFloor.dungeonAH = { setCurrentDirection: emptyFn, setMoving: emptyFn }
      spyMoveInDirection = jest.spyOn(mockFloor,'moveInDirection').mockImplementation(emptyFn);
    })
    afterEach(()=>{
      jest.clearAllMocks();
    })

    test('If checkCurrentTile tells you to stop, should set moving to "none"',()=>{
      mockFloor.dungeonAH.setMoving = jest.fn();
      spyCheckCollision = jest.spyOn(mockFloor,'checkCollision').mockImplementation(emptyFn);
      spyCheckCurrentTile = jest.spyOn(mockFloor,'checkCurrentTile').mockReturnValue(true);
      mockFloor.move('up','down');
      let spySetMoving = jest.spyOn(mockFloor.dungeonAH,'setMoving');
      expect(spySetMoving).toHaveBeenCalledWith('none');
    })

    test('If key is up, it will set moving to "none"',()=>{
      mockFloor.dungeonAH.setMoving = jest.fn();
      spyCheckCollision = jest.spyOn(mockFloor,'checkCollision').mockImplementation(emptyFn);
      spyCheckCurrentTile = jest.spyOn(mockFloor,'checkCurrentTile').mockImplementation(emptyFn);
      mockFloor.move('up','up');
      let spySetMoving = jest.spyOn(mockFloor.dungeonAH,'setMoving');
      expect(spySetMoving).toHaveBeenCalledWith('none');
    })

    describe('Checking Tile',()=>{
      beforeEach(()=>{
        mockFloor.roomMatrix = [[new Room(0,[0,0]),new Room(0,[0,1])]];
        mockFloor.roomMatrix[0][0].tileMatrix = [[0,0],[0,102],[0,103],[0,105.01],[0,106.01]];
      })
      test('If current tile is a 102, should call the Go Up Floor Callback',()=>{
        mockFloor.dungeonAH.goUpFloor = jest.fn();
        mockFloor.currentTile = {room: [0,0], tile: [1,1]};
        let spyGoUpFloor = jest.spyOn(mockFloor.dungeonAH,'goUpFloor');
        mockFloor.checkCurrentTile();
        expect(spyGoUpFloor).toHaveBeenCalled();
      })
      test('If current tile is a 105, should initiate a Battle',()=>{
        mockFloor.dungeonAH.startBattle = jest.fn();
        mockFloor.currentTile = {room: [0,0], tile: [3,1]};
        let spyStartBattle = jest.spyOn(mockFloor.dungeonAH,'startBattle');
        mockFloor.checkCurrentTile();
        expect(spyStartBattle).toHaveBeenCalled();
      })
      test('If current tile is not an event, should return false',()=>{
        mockFloor.currentTile = {room: [0,0], tile: [0,1]};
        expect(mockFloor.checkCurrentTile()).toBeFalsy();
      })

      describe('Moving Rooms',()=>{
        // TODO - If I ever update the shouldMoveRoom function to be more advanced, will need to update this
        test('Move room up if in the correct spot',()=>{
          mockFloor.currentTile = {room:[1,0], tile:[-1,1]}
          expect(mockFloor.shouldMoveRoom('up')).toBeTruthy();
        });
        test('Move room right if in the correct spot',()=>{
          mockFloor.roomMatrix = [[new Room(0,[0,0]),new Room(0,[0,1])]];
          mockFloor.currentTile = {room:[0,0], tile:[0,8]}
          expect(mockFloor.shouldMoveRoom('right')).toBeTruthy();
        });
        test('Move room down if in the correct spot',()=>{
          mockFloor.roomMatrix = [[new Room(0,[0,0])],[new Room(0,[0,1])]];
          mockFloor.currentTile = {room:[0,0], tile:[8,1]}
          expect(mockFloor.shouldMoveRoom('down')).toBeTruthy();
        });
        test('Move room left if in the correct spot',()=>{
          mockFloor.currentTile = {room:[0,1], tile:[1,-1]}
          expect(mockFloor.shouldMoveRoom('left')).toBeTruthy();
        });

        test('Moving into the room above will update the current room and tile correctly',()=>{
          mockFloor.currentTile = {room:[1,0], tile:[0,0]}
          mockFloor.moveIntoRoom('up');
          expect(mockFloor.currentTile.room).toEqual([0,0]);
          expect(mockFloor.currentTile.tile).toEqual([7,0]);
        })
        test('Moving into the room to the right will update the current room and tile correctly',()=>{
          mockFloor.currentTile = {room:[0,0], tile:[0,7]}
          mockFloor.moveIntoRoom('right');
          expect(mockFloor.currentTile.room).toEqual([0,1]);
          expect(mockFloor.currentTile.tile).toEqual([0,0]);
        })
        test('Moving into the room below will update the current room and tile correctly',()=>{
          mockFloor.currentTile = {room:[0,0], tile:[7,0]}
          mockFloor.moveIntoRoom('down');
          expect(mockFloor.currentTile.room).toEqual([1,0]);
          expect(mockFloor.currentTile.tile).toEqual([0,0]);
        })
        test('Moving into the room to the left will update the current room and tile correctly',()=>{
          mockFloor.currentTile = {room:[0,1], tile:[0,0]}
          mockFloor.moveIntoRoom('left');
          expect(mockFloor.currentTile.room).toEqual([0,0]);
          expect(mockFloor.currentTile.tile).toEqual([0,7]);
        })
      })

      describe('Check Collision',()=>{
        let mockCollision = {
          up: false, right: false, down: false, left: false
        }
        beforeEach(()=>{
          mockFloor.dungeonAH.getCollision = dir => { return mockCollision[dir] }
          mockFloor.dungeonAH.setCollision = (dir,value) => { mockCollision[dir] = value }
          mockFloor.roomMatrix = [[new Room(0,[0,0])]];
          mockFloor.roomMatrix[0][0].tileMatrix = [[0,0,0,0,0],[0,1,1,1,0],[0,1,1,1,0],[0,1,1,1,0],[0,0,0,0,0]];
        })
        test('When a spot has no collision tiles around it, all collision will be set to false',()=>{
          mockFloor.currentTile = {room: [0,0], tile: [2,2]};
          mockFloor.checkCollision();
          expect(mockCollision.up).toBeFalsy();
          expect(mockCollision.right).toBeFalsy();
          expect(mockCollision.down).toBeFalsy();
          expect(mockCollision.left).toBeFalsy();
        })
        test('When a spot has 1 collision tile above it, only up collision will be set to true',()=>{
          mockFloor.currentTile = {room: [0,0], tile: [1,2]};
          mockFloor.checkCollision();
          expect(mockCollision.up).toBeTruthy();
          expect(mockCollision.right).toBeFalsy();
          expect(mockCollision.down).toBeFalsy();
          expect(mockCollision.left).toBeFalsy();
        })
        test('When a spot has 1 collision tile to the right of it, only right collision will be set to true',()=>{
          mockFloor.currentTile = {room: [0,0], tile: [2,3]};
          mockFloor.checkCollision();
          expect(mockCollision.up).toBeFalsy();
          expect(mockCollision.right).toBeTruthy();
          expect(mockCollision.down).toBeFalsy();
          expect(mockCollision.left).toBeFalsy();
        })
        test('When a spot has 1 collision tile below it, only down collision will be set to true',()=>{
          mockFloor.currentTile = {room: [0,0], tile: [3,2]};
          mockFloor.checkCollision();
          expect(mockCollision.up).toBeFalsy();
          expect(mockCollision.right).toBeFalsy();
          expect(mockCollision.down).toBeTruthy();
          expect(mockCollision.left).toBeFalsy();
        })
        test('When a spot has 1 collision tile to the left of it, only left collision will be set to true',()=>{
          mockFloor.currentTile = {room: [0,0], tile: [2,1]};
          mockFloor.checkCollision();
          expect(mockCollision.up).toBeFalsy();
          expect(mockCollision.right).toBeFalsy();
          expect(mockCollision.down).toBeFalsy();
          expect(mockCollision.left).toBeTruthy();
        })
        test('When you are all the way up, up collision will be set to true',()=>{
          mockFloor.currentTile = {room: [0,0], tile: [0,2]};
          mockFloor.checkCollision();
          expect(mockCollision.up).toBeTruthy();
        })
        test('When you are all the way to the right, right collision will be set to true',()=>{
          mockFloor.roomMatrix[0][0].tileMatrix = [[0,0,0,0,0],[0,1,1,1,0],[0,1,1,1,1,1,1,0],[0,1,1,1,0],[0,0,0,0,0]];
          mockFloor.currentTile = {room: [0,0], tile: [2,7]};
          mockFloor.checkCollision();
          expect(mockCollision.right).toBeTruthy();
        })
        test('When you are all the way down, down collision will be set to true',()=>{
          mockFloor.roomMatrix[0][0].tileMatrix = [[0,0,0,0,0],[0,1,1,1,0],[0,1,1,1,0],[0,1,1,1,0],[0,1,1,1,0],[0,1,1,1,0],[0,1,1,1,0],[0,1,1,1,0]];
          mockFloor.currentTile = {room: [0,0], tile: [7,2]};
          mockFloor.checkCollision();
          expect(mockCollision.down).toBeTruthy();
        })
        test('When you are all the way to the left, left collision will be set to true',()=>{
          mockFloor.currentTile = {room: [0,0], tile: [2,0]};
          mockFloor.checkCollision();
          expect(mockCollision.left).toBeTruthy();
        })
      })
    })

    describe('Moving the map',()=>{
      beforeEach(()=>{
        spyCheckCollision = jest.spyOn(mockFloor,'checkCollision').mockImplementation(emptyFn);
        spyCheckCurrentTile = jest.spyOn(mockFloor,'checkCurrentTile').mockImplementation(emptyFn);
      });
      test('Moving up will call the map mover in the correct direction',()=>{
        mockFloor.roomMatrix = [[new Room(0,[0,0]),new Room(0,[0,1])]]
        mockFloor.move('up','down');
        expect(spyMoveInDirection).toHaveBeenCalledWith('up');
      })
      test('Moving right will call the map mover in the correct direction',()=>{
        mockFloor.roomMatrix = [[new Room(0,[0,0]),new Room(0,[0,1])]]
        mockFloor.move('right','down');
        expect(spyMoveInDirection).toHaveBeenCalledWith('right');
      })
      test('Moving down will call the map mover in the correct direction',()=>{
        mockFloor.roomMatrix = [[new Room(0,[0,0]),new Room(0,[0,1])]]
        mockFloor.move('down','down');
        expect(spyMoveInDirection).toHaveBeenCalledWith('down');
      })
      test('Moving left will call the map mover in the correct direction',()=>{
        mockFloor.roomMatrix = [[new Room(0,[0,0]),new Room(0,[0,1])]]
        mockFloor.move('left','down');
        expect(spyMoveInDirection).toHaveBeenCalledWith('left');
      })
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

    test('Moving up will move the map to the new location',()=>{
      let mockFloor = new Floor(1);
          mockFloor.dungeonAH = { paintFloorCanvas: emptyFn }
          mockFloor.floorCanvas = new FloorCanvas();
          
          expect(mockFloor.floorCanvas.x).toEqual(0);
          expect(mockFloor.floorCanvas.y).toEqual(0);

          mockFloor.moveInDirection('up');

          expect(mockFloor.floorCanvas.x).toEqual(0);
          expect(mockFloor.floorCanvas.y).toEqual(1*config.screenSize);
    })

    test('Moving right will move the map to the new location',()=>{
      let mockFloor = new Floor(1);
          mockFloor.dungeonAH = { paintFloorCanvas: emptyFn }
          mockFloor.floorCanvas = new FloorCanvas();
          
          expect(mockFloor.floorCanvas.x).toEqual(0);
          expect(mockFloor.floorCanvas.y).toEqual(0);

          mockFloor.moveInDirection('right');

          expect(mockFloor.floorCanvas.x).toEqual(-1*config.screenSize);
          expect(mockFloor.floorCanvas.y).toEqual(0);
    })

    test('Moving down will move the map to the new location',()=>{
      let mockFloor = new Floor(1);
          mockFloor.dungeonAH = { paintFloorCanvas: emptyFn }
          mockFloor.floorCanvas = new FloorCanvas();
          
          expect(mockFloor.floorCanvas.x).toEqual(0);
          expect(mockFloor.floorCanvas.y).toEqual(0);

          mockFloor.moveInDirection('down');

          expect(mockFloor.floorCanvas.x).toEqual(0);
          expect(mockFloor.floorCanvas.y).toEqual(-1*config.screenSize);
    })

    test('Moving left will move the map to the new location',()=>{
      let mockFloor = new Floor(1);
          mockFloor.dungeonAH = { paintFloorCanvas: emptyFn }
          mockFloor.floorCanvas = new FloorCanvas();
          
          expect(mockFloor.floorCanvas.x).toEqual(0);
          expect(mockFloor.floorCanvas.y).toEqual(0);

          mockFloor.moveInDirection('left');

          expect(mockFloor.floorCanvas.x).toEqual(1*config.screenSize);
          expect(mockFloor.floorCanvas.y).toEqual(0);
    })
  })
})