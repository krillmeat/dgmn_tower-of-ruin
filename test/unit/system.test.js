import { beforeEach, expect, test } from "@jest/globals";
import System from "../../src/system/system";
import 'jest-canvas-mock';

import {inDebug} from '../../src/utils/url-utils';
jest.mock('../../src/utils/url-utils',()=>{
    return {
      ...jest.requireActual('../../src/utils/url-utils'),
      inDebug: jest.fn()
    }
});

jest.mock('../../src/classes/debug-menu');

describe('System Class',()=>{
  let mockSystem;
  
  beforeEach(()=>{
    document.body.innerHTML = "<div id='game-screen'></div>";
    mockSystem = new System();
  })
  test('Plugging in a controller increases the number of the total controllers',()=>{
    expect(mockSystem.controllers.length).toEqual(0);
    mockSystem.pluginController();
    expect(mockSystem.controllers.length).toEqual(1);
  });

  test('Passing in a key and value to setKeyState will update the objects Key State', () => {
    expect(mockSystem.keyState).toEqual({});
    mockSystem.setKeyState('a',true);
    expect(mockSystem.keyState).not.toEqual({});
  });

  describe('Starting the System',()=>{
    beforeEach(()=>{ mockSystem.game = { bootGame: jest.fn() } })

    test('Starting the System will increase the total controllers by 1',()=>{
      expect(mockSystem.controllers.length).toEqual(0);
      mockSystem.start();
      expect(mockSystem.controllers.length).toEqual(1);
    });
  
    test('Starting the System will load images into the cache',()=>{
      mockSystem.imageHandler = {
        addToQueue: jest.fn()
      }
      mockSystem.start();
      expect(mockSystem.imageHandler.addToQueue).toHaveBeenCalled();
    });

    test('Once the System has loaded the Images, should boot the Game',()=>{
      mockSystem.onGenericImagesLoaded();
      expect(mockSystem.game.bootGame).toHaveBeenCalled();
    });
  
    test('If Debug Mode is active, should create Debug Menu',()=>{
      inDebug.mockReturnValue(true);
      expect(mockSystem.debugMenu).not.toBeDefined();
      mockSystem.start();
      expect(mockSystem.debugMenu).toBeDefined();
      inDebug.mockReset();
    });
  });
})