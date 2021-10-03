import { beforeEach, expect, test } from "@jest/globals";
import System from "../../src/classes/system";
import DebugMenu from '../../src/classes/debug-menu';

describe('System Class',()=>{
  test('Plugging in a controller increases the number of the total controllers',()=>{
    let mockSystem = new System();
    expect(mockSystem.controllers.length).toEqual(0);
    mockSystem.pluginController();
    expect(mockSystem.controllers.length).toEqual(1);
  });

  test('Passing in a key and value to setKeyState will update the objects Key State', () => {
    let mockSystem = new System();
    expect(mockSystem.keyState).toEqual({});
    mockSystem.setKeyState('a',true);
    expect(mockSystem.keyState).not.toEqual({});
  });

  test('Starting System while in debug should create instance of Debug Menu',()=>{
    window.history.pushState({}, 'Fake Title', '/test.html?debug=true' );
    let mockSystem = new System();
    expect(mockSystem.debugMenu).toBe(undefined);
    mockSystem.start();
    expect(mockSystem.debugMenu).toBeInstanceOf(DebugMenu);
  });

  test('Starting System while not in debug should not create instance of Debug Menu',()=>{
    window.history.pushState({}, 'Fake Title', '/test.html' );
    let mockSystem = new System();
    mockSystem.start();
    expect(mockSystem.debugMenu).toBe(undefined);
  })
})