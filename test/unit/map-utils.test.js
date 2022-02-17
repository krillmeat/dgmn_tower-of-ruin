import MapUtility from '../../src/classes/utility/map.util';
import config from '../../src/config';

describe("Map Utilities",()=>{
  let mockMapUtility = new MapUtility();

  describe('Offset Calculation',()=>{
    test('A room offset should be 128 times the number of rooms',()=>{
      let offset = mockMapUtility.getRoomOffset(2);
      let expected = 128 * 2 * config.screenSize;
      expect(offset).toEqual(expected);
    });
    test('A tile offset shuld be 16 times the number of tiles',()=>{
      let offset = mockMapUtility.getTileOffset(4);
      let expected = 16 * 4 * config.screenSize;
      expect(offset).toEqual(expected);
    })
    test('A total offset should handle the calculation correctly',()=>{
      let offset = mockMapUtility.getTotalOffset(1,4);
      let expected = (16 * 4 * config.screenSize) + (128 * 1 * config.screenSize);
      expect(offset).toEqual(expected);
    })
  })
  
})