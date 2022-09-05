import { beforeEach, expect, test } from "@jest/globals";
import System from "../../src/system/system";

import 'jest-canvas-mock';

describe('System Class',()=>{
  beforeEach(()=>{
    document.body.innerHTML = "<div id='game-screen'></div>";
  })
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
})