import Game from '../../src/game/game';
import 'jest-canvas-mock';

const emptyFn = () => {}

/*
jest.mock('../../src/utils/url-utils',()=>{
    return {
      ...jest.requireActual('../../src/utils/url-utils'),
      inDebug: jest.fn()
    }
});
*/

jest.mock('../../src/classes/battle/battle',()=>{
  return jest.fn().mockImplementation(()=>{
    return {initAH: emptyFn, init: emptyFn}
  })
})

describe('Game Class',()=>{
  let mockGame;
  beforeEach(()=>{ 
    mockGame = new Game({fetchImage: jest.fn()})
  })
  describe('Title Screen',()=>{
    test('Building the Title will increase the Objects to Draw by 1',()=>{
      mockGame.titleMenu = { init: emptyFn };
      mockGame.drawGameScreen = emptyFn;
      expect(mockGame.objectList.length).toBe(0);
      mockGame.buildTitleScreen();
      expect(mockGame.objectList.length).toBe(1);
    });
    test('Starting a New Game will take you away from the Title Screen',()=>{
      expect(mockGame.atTitle).toBeTruthy();
      mockGame.startNewGame();
      expect(mockGame.atTitle).toBeFalsy();
    });
  });

  // describe('Dungeon',()=>{
    
  // });

  describe('Battle',()=>{
    beforeEach(()=>{
      mockGame.dungeon = {};
      mockGame.dungeon.floor = {isBossFloor: false, number: 1}
    })
    test('Starting a Battle will create a new Battle Instance',()=>{
      expect(mockGame.battle).not.toBeDefined();
      mockGame.startBattle();
      expect(mockGame.battle).toBeDefined();
    });
    test('Ending a Battle will nullify the existing Battle Instance',()=>{
      mockGame.startBattle();
      expect(mockGame.battle).toBeDefined();
      mockGame.endBattle();
      expect(mockGame.battle).toBeNull();
    });
  });
});