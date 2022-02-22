import 'jest-canvas-mock';

import Dungeon from "../../src/classes/dungeon";
import Room from "../../src/classes/room";
import DungeonIO from "../../src/classes/input-output/dungeon.io"

jest.mock('../../src/classes/dungeon/floor',()=>{
  return jest.fn().mockImplementation(()=>{
    return {generateFloor: jest.fn(), initAH: jest.fn()}
  })
})

import { dungeonImages } from "../../src/data/images.db";

const emptyFn = () => {}

describe("Dungeon",()=>{
  afterEach(()=>{
    jest.clearAllMocks();
  })
  describe('Building',()=>{
    test('Make sure SystemAH is called when Loading Images',()=>{
      let mockImageLoad = jest.fn();
      let mockDungeon = new Dungeon(true,()=>{});
          mockDungeon.roomMatrix = [[new Room(0,[0,0])]]
          mockDungeon.systemAH = { loadImages: mockImageLoad }
          mockDungeon.loadDungeonImages(mockDungeon.roomMatrix);
          expect(mockImageLoad).toHaveBeenCalled();
    })

    test('Make sure Proper images are called when loading in Rooms',()=>{
      let mockImageList = ['./sprites/Dungeon/Rooms/room0.png'].concat(dungeonImages);
      let mockImageLoad = jest.fn();
      let mockDungeon = new Dungeon(true,emptyFn);
          mockDungeon.roomMatrix = [[new Room(0,[0,0])]]
          mockDungeon.systemAH = {
            loadImages: mockImageLoad
          }
          mockDungeon.loadDungeonImages(mockDungeon.roomMatrix);
          expect(mockImageLoad).toHaveBeenCalledWith(mockImageList,expect.any(Function));
    })

    test('After Building Floor, dungeon.floor will become defined',()=>{
      let mockDungeon = new Dungeon(true,emptyFn);
      jest.spyOn(mockDungeon,'loadDungeonImages').mockImplementation(emptyFn)
      expect(mockDungeon.floor).toBe(undefined);
      mockDungeon.buildFloor();
      expect(mockDungeon.floor).not.toBe(undefined);
    })
  })

  describe("Dungeon IO",()=>{
    describe("Free State",()=>{
      let mockAH, mockDungeonIO, spyMovingInDirection;
      beforeEach(()=>{
        mockAH = {getDungeonState: () => {return 'free'}, getMoving: jest.fn(), getCollision: jest.fn() }
        mockDungeonIO = new DungeonIO(mockAH);
        spyMovingInDirection = jest.spyOn(mockDungeonIO,'movingInDirection').mockImplementation(()=>{});
      })
      test('When in free state, pressing the UP key will trigger moving the map up',()=>{
        mockDungeonIO.upKeyHandler('down');
        expect(spyMovingInDirection).toHaveBeenCalledWith('up','down');
      });
      test('When in free state, pressing the RIGHT key will trigger moving the map right',()=>{
        mockDungeonIO.rightKeyHandler('down');
        expect(spyMovingInDirection).toHaveBeenCalledWith('right','down');
      });
      test('When in free state, pressing the DOWN key will trigger moving the map down',()=>{
        mockDungeonIO.downKeyHandler('down');
        expect(spyMovingInDirection).toHaveBeenCalledWith('down','down');
      });
      test('When in free state, pressing the LEFT key will trigger moving the map left',()=>{
        mockDungeonIO.leftKeyHandler('down');
        expect(spyMovingInDirection).toHaveBeenCalledWith('left','down');
      });
    })
  })
})