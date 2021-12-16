import Battle from "../../src/classes/battle";
import Dgmn from "../../src/classes/dgmn";
import 'jest-canvas-mock';

const fakeDgmn = new Dgmn(0,'FLARE','Agu',0);
const emptyFunc = () => {}

describe('Battle System',() => {
  describe('Dealing Damage',()=>{
    test('All Dgmn are added to Object List',()=>{
      let mockBattle = new Battle([fakeDgmn],[],emptyFunc,emptyFunc,emptyFunc,emptyFunc,emptyFunc);
      let spy = jest.spyOn(mockBattle, 'addObject');

      mockBattle.addDgmnToObjectList(mockBattle.dgmnList);
      expect(mockBattle.addObject).toHaveBeenCalledTimes(1)
    })
  });
});