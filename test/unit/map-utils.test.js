import MapUtility from '../../src/classes/dungeon/utility/map.util';
import CFG from '../../src/config';

describe("Map Utilities",()=>{
  let mockMapUtility = new MapUtility();

  describe('Offset Calculation',()=>{
    test('A room offset should be 128 times the number of rooms',()=>{
      let offset = mockMapUtility.getRoomOffset(2);
      let expected = 128 * 2 * CFG.screenSize;
      expect(offset).toEqual(expected);
    });
    test('A tile offset shuld be 16 times the number of tiles',()=>{
      let offset = mockMapUtility.getTileOffset(4);
      let expected = 16 * 4 * CFG.screenSize;
      expect(offset).toEqual(expected);
    })
    test('A total offset should handle the calculation correctly',()=>{
      let offset = mockMapUtility.getTotalOffset(1,4);
      let expected = (16 * 4 * CFG.screenSize) + (128 * 1 * CFG.screenSize);
      expect(offset).toEqual(expected);
    })
  })
  
})