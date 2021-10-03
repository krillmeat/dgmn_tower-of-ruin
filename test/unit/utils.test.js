import { getAllQueryParams, inDebug } from "../../src/utils/url-utils";
import {gameLog, debugLog} from "../../src/utils/log-utils";
import { beforeEach, expect, test } from "@jest/globals";

describe('Utilities',() => {
  describe('Log Utils',() => {
    beforeEach(()=>{
      console.log = jest.fn();
    })

    test('Game log with message and object creates console log',() => {
      let mockArray = ['a','b','c'];
      gameLog('Hello',mockArray);
      expect(console.log).toBeCalled();
    });

    test('Game log with only message creates console log with message and color',() => {
      gameLog('Hello');
      expect(console.log).toBeCalledWith('%cHello','color:#75715E');
    })

    test('Game log with message and object creates console log with message, color, and object',() => {
      let mockArray = ['a','b','c'];
      gameLog('Hello',mockArray);
      expect(console.log).toBeCalledWith('%cHello','color:#75715E',['a','b','c']);
    });

    test('Debug log when debug is not active will not create a console log',()=>{
      window.history.pushState({}, 'Fake Title', '/test.html' );
      debugLog('Hi');
      expect(console.log).not.toBeCalled();
    });

    test('Debug log when debug is active will create a console log',()=>{
      window.history.pushState({}, 'Fake Title', '/test.html?debug=true' );
      debugLog('Hi');
      expect(console.log).toBeCalled();
    });

    test('Debug log when debig is active and including an object will create a console log with message, color, and object',() => {
      window.history.pushState({}, 'Fake Title', '/test.html?debug=true' );
      let mockArray = ['a','b','c'];
      debugLog('Hi',mockArray);
      expect(console.log).toBeCalledWith('%cHi','color:#A6E22E',['a','b','c']);
    })

    test('Debug log when debug is active and no object will create a console log with message and color',()=>{
      window.history.pushState({}, 'Fake Title', '/test.html?debug=true' );
      debugLog('Hi');
      expect(console.log).toBeCalledWith('%cHi','color:#A6E22E');
    })
  });

  describe('URL Utils',() => {
    test('URL with 1 param will split into an Object with one value',()=>{
      window.history.pushState({}, 'Fake Title', '/test.html?debug=true' );
      let mockParams = getAllQueryParams();
      expect(Object.keys(mockParams).length).toBe(1);
    });

    test('URL with 2 params will split into an Object with two values',()=>{
      window.history.pushState({}, 'Fake Title', '/test.html?debug=true&something=nope' );
      let mockParams = getAllQueryParams();
      expect(Object.keys(mockParams).length).toBe(2);
    });
    
    test('URL with 0 params will split into an Empty Object',()=>{
      window.history.pushState({}, 'Fake Title', '/test.html' );
      let mockParams = getAllQueryParams();
      expect(mockParams).toEqual({});
    });

    test('If URL contains debug=true, inDebug should be true',()=>{
      window.history.pushState({}, 'Fake Title', '/test.html?debug=true' );
      expect(inDebug()).toBeTruthy();
    });

    test('If URL does not contain debug=true, inDebug should be false',()=>{
      window.history.pushState({}, 'Fake Title', '/test.html' );
      expect(inDebug()).toBeFalsy();
    });
  });
});